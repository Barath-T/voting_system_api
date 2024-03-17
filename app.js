import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { MONGODB_URI } from "./utils/config.js";

import votesRouter from "./router/votes.js";
import usersRouter from "./router/users.js";
import loginRouter from "./router/login.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const _mongoose = mongoose.set("strictQuery", false);
_mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

app.use("/votes", votesRouter);
app.use("/register", usersRouter);
app.use("/login", loginRouter);

export default app;