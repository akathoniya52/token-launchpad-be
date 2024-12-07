"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = require("./models/userModel");
const tokenLaunchModel_1 = require("./models/tokenLaunchModel");
class DBServices {
    static initialized() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default
                    .connect(process.env.MONGO_URI || "")
                    .then(() => {
                    console.log("MongoDB is connected...!");
                })
                    .catch((error) => {
                    console.log("Error while connecting mongoDB");
                });
            }
            catch (error) { }
        });
    }
    static getUserWithTokenLaunches(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield userModel_1.userModel
                    .findOne({ walletAddress })
                    .populate("tokenLaunch");
                if (!user) {
                    user = yield userModel_1.userModel.create({
                        walletAddress: walletAddress,
                        tokenLaunch: [],
                    });
                }
                return user;
            }
            catch (error) {
                console.error("Error fetching user with token launches:", error);
                throw error;
            }
        });
    }
    static storeUserAndTokenLaunch(walletAddress, tokenLaunchData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the user already exists
                let user = yield userModel_1.userModel.findOne({ walletAddress });
                // If user exists, push the new token launch pad reference
                if (user) {
                    const tokenLaunchPad = yield tokenLaunchModel_1.tokenLaunchModel.create(tokenLaunchData);
                    user.tokenLaunch.push(tokenLaunchPad._id); // Push the new token launch pad ID
                    yield user.save(); // Save the updated user
                }
                else {
                    // If user does not exist, create a new user and token launch pad
                    const newTokenLaunchPad = yield tokenLaunchModel_1.tokenLaunchModel.create(tokenLaunchData);
                    user = yield userModel_1.userModel.create({
                        walletAddress,
                        tokenLaunch: [newTokenLaunchPad._id], // Associate the new token launch pad
                    });
                }
                return user; // Return the user with updated token launches
            }
            catch (error) {
                console.error("Error storing user and token launch pad:", error);
                throw error; // Rethrow the error for further handling
            }
        });
    }
}
exports.DBServices = DBServices;
