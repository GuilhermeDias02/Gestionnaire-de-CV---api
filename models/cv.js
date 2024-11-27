const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
    {
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        titre: { type: String, required: true },
        adresse: String,
        description: String,
        techSkills: { type: [String], required: true },
        softSkills: { type: [String], required: true },
        certifications: { type: [String], required: true },
        expPro: [
            {
                entreprise: { type: String, required: true },
                poste: { type: String, required: true },
                description: { type: String, required: true },
            },
        ],
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
