import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { MONGODB_URI } from "./utils/config.js";

import votesRouter from "./router/votes.js";
import usersRouter from "./router/users.js";
import loginRouter from "./router/login.js";

import "express-async-errors";

const app = express();
app.use(
    cors({ origin: '*' })
);

dotenv.config();
app.use(express.json());

const _mongoose = mongoose.set("strictQuery", false);
_mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

app.use("/api/votes", votesRouter);
app.use("/api/register", usersRouter);
app.use("/api/login", loginRouter);

export default app;