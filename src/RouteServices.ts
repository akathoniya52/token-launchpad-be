import { Request, Response } from "express";
import { DBServices } from "./DBServices";
import { ValidatorServices } from "./ValidatorServices";

export class RouteServices {
  static initialized(app: any) {
    app.get("/", this.homeRoute);
    app.post("/createtokenlaunch", this.createTokenLaunch);
    app.get(
      "/tokenslaunch/:walletAddress",
      this.getAllTokenLaunchByWalletAddress
    );
  }

  static homeRoute(req: Request, res: Response) {
    res.status(200).json({ message: "Server is working..!", status: true });
  }

  static async getAllTokenLaunchByWalletAddress(req: Request, res: Response) {
    try {
      const { walletAddress } = req.params;
      if (!walletAddress) {
        return res
          .status(404)
          .json({ message: "WalletAddress not found !", status: false });
      }

      if (!ValidatorServices.isSolanaAddress(walletAddress)) {
        return res
          .status(403)
          .json({ message: "Invalid solana Wallet Address", status: false });
      }

      // Fetch user with token launches
      const user = await DBServices.getUserWithTokenLaunches(walletAddress);
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found!", status: false });
      }

      // Return the token launches associated with the user
      return res.status(200).json({ tokens: user.tokenLaunch, status: true });
    } catch (error) {
      console.error("Error fetching token launches:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", status: false });
    }
  }

  static async createTokenLaunch(req: Request, res: Response) {
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
      const user = await DBServices.storeUserAndTokenLaunch(
        walletAddress,
        tokenLaunchData
      );
      return res.status(201).json({
        message: "Token launch created successfully!",
        user,
        status: true,
      });
    } catch (error) {
      console.error("Error creating token launch:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", status: false });
    }
  }
}
