"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorServices = void 0;
const web3_js_1 = require("@solana/web3.js");
class ValidatorServices {
    static isSolanaAddress(walletAddress) {
        try {
            new web3_js_1.PublicKey(walletAddress);
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.ValidatorServices = ValidatorServices;
