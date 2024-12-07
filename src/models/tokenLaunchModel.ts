import mongoose from "mongoose";

const tokenLaunchPadSchem = new mongoose.Schema({
  mintAddress: { type: String, required: true },
  supply: { type: String, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  img: { type: String, required: true },
  decimal: { type: Number, required: true },
  associatedTokenAddress: { type: String, required: true },
  network: {
    type: String,
    enum: ["solana-mainnet", "solana-devnet"],
    default: "solana-devnet",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
export const tokenLaunchModel = mongoose.model(
  "TokenLaunchPad",
  tokenLaunchPadSchem
);
