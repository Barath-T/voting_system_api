import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
});

userSchema.set("toJSON", {
    transform: function (doc, retObj) {
        delete retObj.passwordHash;
    }
})

export default mongoose.model("User", userSchema);