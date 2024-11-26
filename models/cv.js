const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
    {
        titre: { type: String, required: true },
        adresse: String,
        description: String,
        techSkills: { type: [String], required: true },
        softSkills: { type: [String], required: true },
        certifications: { type: [String], required: true },
        expPro: {
            entreprise: { type: String},
            poste: { type: String},
            description: { type: String},
        },
        visible: { type: Boolean, required: true },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cv", cvSchema);
