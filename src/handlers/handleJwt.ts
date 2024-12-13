import {
  base64url,
  compactDecrypt,
  CompactEncrypt,
  CompactSign,
  compactVerify,
  type CompactVerifyResult,
  importPKCS8,
  importSPKI,
  type JWTPayload,
  jwtVerify,
  SignJWT,
} from 'jose';
// Internal app
import { RequestBody } from '@/interfaces';

const JWE_ALG = 'RSA-OAEP-256';
const JWE_ENC = 'A256GCM';
const JWS_ALG = 'RS512';
const JWT_ALG = 'PS512';
const AUDIENCE = 'Audience';
const ISSUER = 'Issuer';
const expiresIn = '2h';
const jwePrivateKey = process.env.NEXT_PUBLIC_WEB_JWE_PRIVATE_KEY ?? '';
const jwePublicKey = process.env.NEXT_PUBLIC_WEB_JWE_PUBLIC_KEY ?? '';
const jwsPrivateKey = process.env.NEXT_PUBLIC_WEB_JWS_PRIVATE_KEY ?? '';
const jwsPublicKey = process.env.NEXT_PUBLIC_WEB_JWS_PUBLIC_KEY ?? '';
const encode = TextEncoder.prototype.encode.bind(new TextEncoder());
const decode = TextDecoder.prototype.decode.bind(new TextDecoder());

/**
 * Encrypts the given payload using JWE.
 * @param {RequestBody} payload - The data to be encrypted.
 * @returns {Promise<string>} - The encrypted JWE string.
 * @throws {Error} - If encryption fails.
 */
export async function encryptData(payload: RequestBody): Promise<string> {
  try {
    const plaintext = encode(JSON.stringify(payload));
    const key = await importSPKI(jwePublicKey, JWE_ALG);
    const jwe = await new CompactEncrypt(plaintext)
      .setProtectedHeader({ alg: JWE_ALG, enc: JWE_ENC, type: 'jwe' })
      .encrypt(key);

    return jwe;
  } catch (error) {
    throw new Error(`encryptData error: ${(error as Error).message}`);
  }
}

/**
 * Decrypts the given JWE string.
 * @param {string} jwe - The JWE string to be decrypted.
 * @returns {Promise<RequestBody>} - The decrypted data.
 * @throws {Error} - If decryption fails.
 */
export async function decryptData(jwe: string): Promise<RequestBody> {
  try {
    const key = await importPKCS8(jwePrivateKey, JWE_ALG);
    const { plaintext } = await compactDecrypt(jwe, key);
    const data = JSON.parse(decode(plaintext));

    return data;
  } catch (error) {
    throw new Error(`decryptData error: ${(error as Error).message}`);
  }
}

/**
 * Signs the given JWE string using JWS.
 * @param {string} jwe - The JWE string to be signed.
 * @returns {Promise<string>} - The signed JWS string.
 * @throws {Error} - If signing fails.
 */
export async function signatureData(jwe: string): Promise<string> {
  try {
    const key = await importPKCS8(jwsPrivateKey, JWS_ALG);
    const jws = await new CompactSign(encode(jwe)).setProtectedHeader({ alg: JWS_ALG, type: 'jws' }).sign(key);

    return jws;
  } catch (error) {
    throw new Error(`signatureData error: ${(error as Error).message}`);
  }
}

/**
 * Disassembles the given JWS string.
 * @param {string} jws - The JWS string to be disassembled.
 * @returns {Promise<string>} - The disassembled JWS header and signature.
 * @throws {Error} - If disassembly fails.
 */
export async function disassembleJWS(jws: string): Promise<string> {
  try {
    const jwsParts = jws.split('.');
    const headerSignature = `${jwsParts[0]}..${jwsParts[2]}`;

    return headerSignature;
  } catch (error) {
    throw new Error(`disassembleJWS error: ${(error as Error).message}`);
  }
}

/**
 * Assembles a JWS string with the given payload.
 * @param {string} jws - The JWS string to be assembled.
 * @param {string} payload - The payload to be included.
 * @returns {Promise<string>} - The complete JWS string.
 * @throws {Error} - If assembly fails.
 */
export async function assembleJWS(jws: string, payload: string): Promise<string> {
  try {
    const base64UrlPayload = base64url.encode(payload);
    const jwsReplace = jws.replace('JWS ', '');
    const parts = jwsReplace.split('.');
    const completeJws = `${parts[0]}.${base64UrlPayload}.${parts[2]}`;

    return completeJws;
  } catch (error) {
    throw new Error(`assembleJWS error: ${(error as Error).message}`);
  }
}

/**
 * Verifies the given JWS string.
 * @param {string} jws - The JWS string to be verified.
 * @returns {Promise<CompactVerifyResult>} - The verification result.
 * @throws {Error} - If verification fails.
 */
export async function verifyJWE(jws: string): Promise<CompactVerifyResult> {
  try {
    const key = await importSPKI(jwsPublicKey, JWS_ALG);
    const verifyResult = await compactVerify(jws, key);

    return verifyResult;
  } catch (error) {
    throw new Error(`verifyJWE error: ${(error as Error).message}`);
  }
}

/**
 * Creates a JWT with the given payload.
 * @param {JWTPayload} payload - The payload to be included in the JWT.
 * @returns {Promise<string>} - The signed JWT string.
 * @throws {Error} - If JWT creation fails.
 */
export async function createJWT(payload: JWTPayload): Promise<string> {
  try {
    const key = await importPKCS8(jwsPrivateKey, JWT_ALG);
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: JWT_ALG, type: 'jwt' })
      .setIssuedAt()
      .setIssuer(ISSUER)
      .setAudience(AUDIENCE)
      .setExpirationTime(expiresIn)
      .sign(key);

    return jwt;
  } catch (error) {
    throw new Error(`createJWT error: ${(error as Error).message}`);
  }
}

/**
 * Verifies the given JWT string.
 * @param {string} jwt - The JWT string to be verified.
 * @returns {Promise<JWTPayload>} - The verified JWT payload.
 * @throws {Error} - If JWT verification fails.
 */
export async function verifyJwt(jwt: string): Promise<JWTPayload> {
  try {
    const key = await importSPKI(jwsPublicKey, JWT_ALG);
    const { payload } = await jwtVerify(jwt, key, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });

    return payload;
  } catch (error) {
    throw new Error(`verifyJwt error: ${(error as Error).message}`);
  }
}
