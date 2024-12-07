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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("./index"); // Adjust the import based on your file structure
const mongoose_1 = __importDefault(require("mongoose"));
describe('API Routes', () => {
    let app;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield index_1.ServerServices.initialize(); // Initialize the server
        app = index_1.ServerServices.app; // Get the app instance
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Close the server connection if needed
        yield mongoose_1.default.connection.close();
    }));
    describe('GET /', () => {
        it('should return a success message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "Server is working..!", status: true });
        }));
    });
    describe('GET /tokenslaunch', () => {
        it('should return 404 if walletAddress is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/tokenslaunch').send({});
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "WalletAddress not found !", status: false });
        }));
        it('should return token launches for a valid walletAddress', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/tokenslaunch').send({ walletAddress: 'validWalletAddress' });
            expect(response.status).toBe(200);
            // Add more assertions based on expected response
        }));
    });
    describe('POST /createtokenlaunch', () => {
        it('should return 400 if walletAddress or tokenLaunchData is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/createtokenlaunch').send({});
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                message: "Wallet address and token launch data are required!",
                status: false,
            });
        }));
        it('should create a token launch and return success', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/createtokenlaunch').send({
                walletAddress: 'validWalletAddress',
                tokenLaunchData: {
                    tokenAddress: '0x123',
                    tokenSupply: '1000',
                    tokenName: 'Test Token',
                    tokenSymbol: 'TTK',
                    imageUrl: 'http://example.com/image.png',
                    tokenDecimal: 18,
                    associatedTokenAddress: '0x456',
                },
            });
            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                message: "Token launch created successfully!",
                // Add more assertions based on expected response
            });
        }));
    });
});
