const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [255, "Name length should not exceed 255"],
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      maxlength: [255, "Name length should not exceed 255"],
      required: [true, "Please enter your email address"],
      unique: [true, "Email address already exists"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be of minimum 6 characters"],
    },
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    next(error);
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
