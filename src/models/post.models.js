const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const postModels = mongoose.model("Post", postSchema);

module.exports = postModels;
