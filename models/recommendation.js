const mongoose = require("mongoose");

const recomSchema = new mongoose.Schema(
    {
        message: { type: String, required: true },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        cv: {
            type: mongoose.Schema.ObjectId,
            ref: "Cv",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Recommendation", recomSchema);
