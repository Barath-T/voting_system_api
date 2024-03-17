import dotenv from "dotenv";
dotenv.config();

const PORT = 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;

export { PORT, MONGODB_URI, SECRET };