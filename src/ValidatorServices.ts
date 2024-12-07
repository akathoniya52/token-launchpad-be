import { PublicKey } from "@solana/web3.js";

export class ValidatorServices {
  static isSolanaAddress(walletAddress: string): Boolean {
    try {
      new PublicKey(walletAddress);
      return true;
    } catch (error) {
      return false;
    }
  }
}
