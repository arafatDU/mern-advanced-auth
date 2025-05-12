import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if(!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if(userAlreadyExists) {
      return res.status(400).json({success: false, message: "User already exists"});
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    })

    await user.save();
    
    // send verification email
    await sendVerificationEmail(user.email, verificationToken);

    // jwt token
    generateTokenAndSetCookie(res, user._id);

    

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    });

  } catch (error) {
    res.status(400).json({success: false, message: error.message});
  }
}



export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		await sendWelcomeEmail(user.email, user.name);

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if(!email || !password) {
      throw new Error("All fields are required");
    }
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({success: false, message: "User not found"});
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if(!isPasswordCorrect) {
      return res.status(400).json({success: false, message: "Invalid credentials"});
    }

    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    });
    
  } catch (error) {
    console.log("error in login ", error);
    res.status(400).json({success: false, message: error.message});
  }
}


export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};