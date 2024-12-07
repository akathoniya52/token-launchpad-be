import mongoose from "mongoose";

const userSchem = new mongoose.Schema({
  walletAddress: { type: String, unique: true, required: true },
  tokenLaunch: [
    { type: mongoose.Schema.Types.ObjectId, ref: "TokenLaunchPad" },
  ],
});

export const userModel = mongoose.model("User", userSchem);
