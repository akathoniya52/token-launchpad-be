"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenLaunchModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tokenLaunchPadSchem = new mongoose_1.default.Schema({
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
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
});
exports.tokenLaunchModel = mongoose_1.default.model("TokenLaunchPad", tokenLaunchPadSchem);
