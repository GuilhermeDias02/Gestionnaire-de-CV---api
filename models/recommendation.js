const mongoose = require('mongoose');


const recommSchema = new mongoose.Schema(
    {
      message: { type: String, required: true },
      rating: { type: Number, min: 0, max: 5 },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      cv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cv",
        required: true,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('Recommendation', recommSchema);  