const mongoose = require("mongoose");

const ShareSchema = mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  access: {
    type: String,
    enum: ["H", "A"],
    default: "H",
  },
});

module.exports = mongoose.model("share", ShareSchema);
