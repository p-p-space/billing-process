import { ApiRespObj } from '@/interfaces';

export const defaultTenant = 'bt';
export const defaultLang = 'en';
export const timeZone = process.env.TIMEZONE;
const availableTenants = [defaultTenant, 'pm'] as const;
const allowedTenants = [...availableTenants] as const;
const availableLangs = ['en', 'es'] as const;

export const appSettings = {
  availableTenants,
  allowedTenants,
  availableLangs,
};

/**
 * Toggles for enabling/disabling features.
 */
export const toggles = {
  handleRefresh: process.env.NEXT_PUBLIC_HANDLE_REFRESH ?? 'OFF',
};

/**
 * JWT and JWE Algorithms used for encryption and signing
 */
export const jwtAlgs = {
  jweAlgRsa: 'RSA-OAEP-256', // RSA algorithm for JWE
  jweAlgSec: 'A256KW', // Key wrapping algorithm for JWE
  jweEnc: 'A256GCM', // Encryption algorithm for JWE
  jwsAlgRsa: 'RS512', // RSA algorithm for JWS
  jwsAlgSec: 'HS512', // HMAC algorithm for JWS
  jwtAlg: 'PS512', // Algorithm for JWT
};

/**
 * JWT Configuration settings
 */
export const jwtConfig = {
  audience: 'audience', // Audience for the JWT
  issuer: 'issuer', // Issuer of the JWT
  expiresIn: '2h', // Expiration time for the JWT
};

/**
 * Redis connection settings
 */
export const redisSettings = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB,
  ssl: process.env.REDIS_SSL,
  user: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
};

/**
 * credentials for the application
 */
export const credentials = {
  tenantId: process.env.TENANT_ID,
  tenantClientId: process.env.TENANT_CLIENT_ID,
  tenantClientSecret: process.env.TENANT_CLIENT_SECRET,
  cognitoRegion: process.env.COGNITO_REGION,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  cognitoClientId: process.env.COGNITO_CLIENT_ID,
  cognitoClientSecret: process.env.COGNITO_CLIENT_SECRET,
  cognitoAccessKeyId: process.env.COGNITO_ACCESS_KEY_ID,
  cognitoSecretAccessKey: process.env.COGNITO_SECRET_ACCESS_KEY,
};

export const apiRespObject: ApiRespObj = {
  code: '200.00.000',
  message: 'process ok',
};
