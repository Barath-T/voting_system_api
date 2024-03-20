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
votesRouter.post("/restart", async (req, res) => {
  try {
    const curr = await Votes.findOne({});

    if (curr.ended) {
      await Votes.updateOne({}, { voted: [], candidates: Array(10).fill(0), ended: false }, { runValidators: true });
      return res.status(200).end();
    } else {
      return res.status(204).send("end election to start a new election");
    }
  } catch (err) {
    return res.status(500).end();
  }
});
votesRouter.post("/end", async (req, res) => {
  try {
    await Votes.updateOne({}, { ended: true }, { runValidators: true });
    return res.status(200).end();
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});
votesRouter.post("/addvote", async (req, res) => {
  // console.log(req.body);
  const { voted_by, voted_for } = req.body;

  const curr = await Votes.findOne({});

  console.log(curr);
  if (!curr.ended) {

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
    return res.status(201).end();
  }
  else {
    return res.status(204).send("election has been ended");
  }
});

export default votesRouter;
