import request from 'supertest';
import { ServerServices } from './index'; // Adjust the import based on your file structure
import mongoose from 'mongoose';

describe('API Routes', () => {
  let app: any;

  beforeAll(async () => {
    await ServerServices.initialize(); // Initialize the server
    app = ServerServices.app; // Get the app instance
  });

  afterAll(async () => {
    // Close the server connection if needed
    await mongoose.connection.close();
  });

  describe('GET /', () => {
    it('should return a success message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Server is working..!", status: true });
    });
  });

  describe('GET /tokenslaunch', () => {
    it('should return 404 if walletAddress is not provided', async () => {
      const response = await request(app).get('/tokenslaunch').send({});
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "WalletAddress not found !", status: false });
    });

    it('should return token launches for a valid walletAddress', async () => {
      const response = await request(app).get('/tokenslaunch').send({ walletAddress: 'validWalletAddress' });
      expect(response.status).toBe(200);
      // Add more assertions based on expected response
    });
  });

  describe('POST /createtokenlaunch', () => {
    it('should return 400 if walletAddress or tokenLaunchData is missing', async () => {
      const response = await request(app).post('/createtokenlaunch').send({});
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Wallet address and token launch data are required!",
        status: false,
      });
    });

    it('should create a token launch and return success', async () => {
      const response = await request(app).post('/createtokenlaunch').send({
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
    });
  });
}); 