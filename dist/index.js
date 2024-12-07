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
exports.ServerServices = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const RouteServices_1 = require("./RouteServices");
const DBServices_1 = require("./DBServices");
class ServerServices {
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield DBServices_1.DBServices.initialized();
            this.app = (0, express_1.default)();
            this.initializedMiddleWares();
            RouteServices_1.RouteServices.initialized(this.app);
            this.startApp();
        });
    }
    static initializedMiddleWares() {
        if (!this.app) {
            this.initialize();
        }
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({ origin: "*", credentials: true }));
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
exports.ServerServices = ServerServices;
ServerServices.app = null;
ServerServices.initialize();
