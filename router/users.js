import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
const usersRouter = express.Router();


usersRouter.post("/", async (request, response) => {
    const { id, password } = request.body;

    if (await User.findOne({ id })) {
        return response.status(400).json({ error: "id must be unique" });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ id, passwordHash });

    const savedUser = await user.save();
    return response.status(201).json(savedUser);
});

export default usersRouter;