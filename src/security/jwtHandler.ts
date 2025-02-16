import type { JWTPayload } from 'jose';
import { SignJWT, jwtVerify, importPKCS8, importSPKI } from 'jose';
// Internal app
import { jwtAlgs, jwtConfig } from '@/constans';

/**
 * Creates a JWT with the given payload.
 * @param {JWTPayload} payload - The payload to be included in the JWT.
 * @param {string} secret - The secret key used for signing the JWT.
 * @returns {Promise<string>} - The signed JWT string.
 * @throws {Error} - If JWT creation fails.
 */
export async function createJWT(payload: JWTPayload, secret: string): Promise<string> {
  try {
    const key = await importPKCS8(secret, jwtAlgs.jwtAlg);
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: jwtAlgs.jwtAlg, type: 'jwt' })
      .setIssuedAt()
      .setIssuer(jwtConfig.issuer)
      .setAudience(jwtConfig.audience)
      .setExpirationTime(jwtConfig.expiresIn)
      .sign(key);

    return jwt;
  } catch (error) {
    throw new Error(`createJWT: ${(error as Error).message}`);
  }
}

/**
 * Verifies the given JWT string.
 * @param {string} jwt - The JWT string to be verified.
 * @param {string} secret - The secret key used for JWT verification.
 * @returns {Promise<JWTPayload>} - The verified JWT payload.
 * @throws {Error} - If JWT verification fails.
 */
export async function verifyJwt(jwt: string, secret: string): Promise<JWTPayload> {
  try {
    const key = await importSPKI(secret, jwtAlgs.jwtAlg);
    const { payload } = await jwtVerify(jwt, key, {
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
    });

    return payload;
  } catch (error) {
    throw new Error(`verifyJwt: ${(error as Error).message}`);
  }
}
