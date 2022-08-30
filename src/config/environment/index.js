import dotenv from 'dotenv';

dotenv.config();

// Boolean value
const nodeEnv = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV === 'staging',
  production: process.env.NODE_ENV === 'production',
};

const serverPort = process.env.SERVER_PORT || 3000;

const jwtSecret = process.env.JWT_SECRET;

export { nodeEnv, serverPort, jwtSecret };
