import mongoose from "mongoose";
import { userModel } from "./models/userModel";
import { tokenLaunchModel } from "./models/tokenLaunchModel";

export class DBServices {
  static async initialized() {
    try {
      await mongoose
        .connect(
          process.env.MONGO_URI || "mongodb://localhost:27017/tokenlaunchpad"
        )
        .then(() => {
          console.log("MongoDB is connected...!");
        })
        .catch((error: any) => {
          console.log("Error while connecting mongoDB");
        });
    } catch (error) {}
  }

  static async getUserWithTokenLaunches(walletAddress: string) {
    try {
      let user = await userModel
        .findOne({ walletAddress })
        .populate("tokenLaunch");
      if (!user) {
        user = await userModel.create({
          walletAddress: walletAddress,
          tokenLaunch: [],
        });
      }
      return user;
    } catch (error) {
      console.error("Error fetching user with token launches:", error);
      throw error;
    }
  }

  static async storeUserAndTokenLaunch(
    walletAddress: string,
    tokenLaunchData: any
  ) {
    try {
      // Check if the user already exists
      let user = await userModel.findOne({ walletAddress });

      // If user exists, push the new token launch pad reference
      if (user) {
        const tokenLaunchPad = await tokenLaunchModel.create(tokenLaunchData);
        user.tokenLaunch.push(tokenLaunchPad._id); // Push the new token launch pad ID
        await user.save(); // Save the updated user
      } else {
        // If user does not exist, create a new user and token launch pad
        const newTokenLaunchPad = await tokenLaunchModel.create(
          tokenLaunchData
        );
        user = await userModel.create({
          walletAddress,
          tokenLaunch: [newTokenLaunchPad._id], // Associate the new token launch pad
        });
      }

      return user; // Return the user with updated token launches
    } catch (error) {
      console.error("Error storing user and token launch pad:", error);
      throw error; // Rethrow the error for further handling
    }
  }
}
