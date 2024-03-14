import express from "express";

const votesRouter = express.Router();

votesRouter.get("/", (_req, res) => res.send("hello"));
votesRouter.post("/addvote", (req, res) => {
    console.log(req.body);
    res.status(201).end();
});

export default votesRouter;
