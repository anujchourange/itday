const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [255, "Name length should not exceed 255"],
      required: [true, "Please enter client name"],
    },
    email: {
      type: String,
      maxlength: [255, "Name length should not exceed 255"],
      required: [true, "Please enter client email address"],
    },
    retainer_fee: {
      type: Number,
      required: [true, "Please enter retainer fee of client"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
