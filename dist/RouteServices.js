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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteServices = void 0;
const DBServices_1 = require("./DBServices");
const ValidatorServices_1 = require("./ValidatorServices");
class RouteServices {
    static initialized(app) {
        app.get("/", this.homeRoute);
        app.post("/createtokenlaunch", this.createTokenLaunch);
        app.get("/tokenslaunch/:walletAddress", this.getAllTokenLaunchByWalletAddress);
    }
    static homeRoute(req, res) {
        res.status(200).json({ message: "Server is working..!", status: true });
    }
    static getAllTokenLaunchByWalletAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { walletAddress } = req.params;
                if (!walletAddress) {
                    return res
                        .status(404)
                        .json({ message: "WalletAddress not found !", status: false });
                }
                if (!ValidatorServices_1.ValidatorServices.isSolanaAddress(walletAddress)) {
                    return res
                        .status(403)
                        .json({ message: "Invalid solana Wallet Address", status: false });
                }
                // Fetch user with token launches
                const user = yield DBServices_1.DBServices.getUserWithTokenLaunches(walletAddress);
                if (!user) {
                    return res
                        .status(404)
                        .json({ message: "User not found!", status: false });
                }
                // Return the token launches associated with the user
                return res.status(200).json({ tokens: user.tokenLaunch, status: true });
            }
            catch (error) {
                console.error("Error fetching token launches:", error);
                return res
                    .status(500)
                    .json({ message: "Internal server error", status: false });
            }
        });
    }
    static createTokenLaunch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { walletAddress, tokenLaunchData } = req.body;
                // Validate input
                if (!walletAddress || !tokenLaunchData) {
                    return res.status(400).json({
                        message: "Wallet address and token launch data are required!",
                        status: false,
                    });
                }
                // Store user and token launch
                const user = yield DBServices_1.DBServices.storeUserAndTokenLaunch(walletAddress, tokenLaunchData);
                return res.status(201).json({
                    message: "Token launch created successfully!",
                    user,
                    status: true,
                });
            }
            catch (error) {
                console.error("Error creating token launch:", error);
                return res
                    .status(500)
                    .json({ message: "Internal server error", status: false });
            }
        });
    }
}
exports.RouteServices = RouteServices;
