import express from "express";
import cors from "cors";
import votesRouter from "./router/votes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/votes", votesRouter);

export default app;