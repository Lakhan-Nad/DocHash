const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
  ipfsHash: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("file", FileSchema);
