import dotenv from 'dotenv';

dotenv.config();

// Boolean value
export const nodeEnv = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV === 'staging',
  production: process.env.NODE_ENV === 'production',
};
export const serverPort = process.env.SERVER_PORT || 3000;
export const jwtSecret = process.env.JWT_SECRET;

// AWS
export const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
export const awsSecretAccessKeyId = process.env.AWS_SECRET_ACCESS_KEY;
export const awsSecretsManagerRegion = process.env.AWS_SECRETSMANAGER_REGION;
export const awsSecretsManagerSecretId = process.env.AWS_SECRETSMANAGER_SECRET_ID;

// E-mail
export const emailHost = process.env.EMAIL_HOST;
export const emailPort = process.env.EMAIL_PORT;
export const emailAuthUser = process.env.EMAIL_AUTH_USER;
export const emailAuthPassword = process.env.EMAIL_AUTH_PASSWORD;
