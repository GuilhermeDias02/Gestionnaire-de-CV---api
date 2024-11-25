const mongoose = require("mongoose");

const recomSchema = new mangoose.Schema(
    {
        message: {type: String, required: true},
        author: {
            type: mangoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        cv: {
            type: mangoose.Schema.ObjectId,
            ref: "Cv",
            required: true,
        }
    }
)