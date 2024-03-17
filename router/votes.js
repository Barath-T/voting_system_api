import express from "express";
import Votes from "../models/Votes.js";

const votesRouter = express.Router();

votesRouter.get("/voted", async (_req, res) => {
    const curr = await Votes.findOne({});
    res.status(200).send(curr.voted);

});
votesRouter.get("/candidates", async (_req, res) => {
    const curr = await Votes.findOne({});
    res.status(200).send(curr.candidates);

});
votesRouter.post("/addvote", async (req, res) => {
    // console.log(req.body);
    const { voted_by, voted_for } = req.body;

    const curr = await Votes.findOne({});

    console.log(curr);

    let already_voted = false;
    curr.voted.forEach((el) => {
        if (voted_by == el) already_voted = true;
    });
    if (already_voted) {
        return res.status(204).end();
    }
    curr.voted.push(voted_by);
    curr.candidates[voted_for] += 1;
    await Votes.updateOne({}, curr, { runValidators: true });
    res.status(201).end();
});

export default votesRouter;
