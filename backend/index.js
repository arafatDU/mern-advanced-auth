import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

