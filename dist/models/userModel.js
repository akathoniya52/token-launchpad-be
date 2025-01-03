"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchem = new mongoose_1.default.Schema({
    walletAddress: { type: String, unique: true, required: true },
    tokenLaunch: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "TokenLaunchPad" },
    ],
});
exports.userModel = mongoose_1.default.model("User", userSchem);
