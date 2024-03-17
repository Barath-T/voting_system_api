import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { SECRET } from "../utils/config.js";

const loginRouter = express.Router();

loginRouter.post("/",
    async (req, res) => {
        const { id, password } = req.body;

        const user = await User.findOne({ id });
        const correctPassword = (user === null)
            ? false
            : await bcrypt.compare(password, user.passwordHash);

        if (!correctPassword) {
            return res
                .status(401)
                .json({ error: "incorrect id or password" });
        }

        const toTokenize = {
            id: user.id,
            id: user._id
        };

        const token = await jwt.sign(toTokenize, SECRET, { expiresIn: 60 * 60 });

        return res
            .status(200)
            .send({ token, id: user.id });

    });

export default loginRouter;