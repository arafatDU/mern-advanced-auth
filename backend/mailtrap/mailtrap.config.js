import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

export const mailtrapClient = new MailtrapClient({
  endpoint: ENDPOINT,
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "MERN_ADVANCED_AUTH",
};
