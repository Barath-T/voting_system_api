import mongoose from "mongoose";

const votesSchema = new mongoose.Schema({
    candidates: {
        type: [Number],
        required: true,
    },
    voted: {
        type: [Number],
        required: true,
    },
});


export default mongoose.model("votes", votesSchema);