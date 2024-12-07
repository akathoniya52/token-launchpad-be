import express from "express";
import "dotenv/config";
import cors from "cors";
import { RouteServices } from "./RouteServices";
import { DBServices } from "./DBServices";

export class ServerServices {
  static app: any = null;
  static async initialize() {
    await DBServices.initialized();
    this.app = express();
    this.initializedMiddleWares();
    RouteServices.initialized(this.app);
    this.startApp();
  }

  static initializedMiddleWares() {
    if (!this.app) {
      this.initialize();
    }
    this.app.use(express.json());
    this.app.use(cors({ origin: "*", credentials: true }));
  }

  static startApp() {
    if (!this.app) {
      this.initialize();
    }
    this.app.listen(process.env.PORT, () => {
      console.log(`Server is Running ${process.env.PORT}`);
    });
  }
}

ServerServices.initialize();
