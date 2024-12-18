import * as jose from 'jose';
import type { JWTPayload, KeyLike } from 'jose';
// Internal app
import { RequestBody } from '@/interfaces';
import { audience, expiresIn, issuer, JweEnc, JwtAlg } from '@/utils/constans';

/**
 * Encodes a given string into a Uint8Array using UTF-8 encoding.
 * @param {string} input - The string to be encoded.
 * @returns {Uint8Array} - The encoded Uint8Array.
 */
export const encode = TextEncoder.prototype.encode.bind(new TextEncoder());

/**
 * Decodes a given Uint8Array into a string using UTF-8 encoding.
 * @param {Uint8Array} input - The Uint8Array to be decoded.
 * @returns {string} - The decoded string.
 */
export const decode = TextDecoder.prototype.decode.bind(new TextDecoder());

/**
 * Encrypts the given payload using JWE.
 * @param {RequestBody} payload - The data to be encrypted.
 * @param {KeyLike | Uint8Array} secret - The secret key used for encryption.
 * @param {string} JweAlg - The algorithm used for encryption.
 * @returns {Promise<string>} - The encrypted JWE string.
 * @throws {Error} - If encryption fails.
 */
export async function encryptData(payload: RequestBody, secret: KeyLike | Uint8Array, JweAlg: string): Promise<string> {
  try {
    const plaintext = encode(JSON.stringify(payload));
    const jwe = await new jose.CompactEncrypt(plaintext)
      .setProtectedHeader({ alg: JweAlg, enc: JweEnc, type: 'jwe' })
      .encrypt(secret);

    return jwe;
  } catch (error) {
    throw new Error(`encryptData: ${(error as Error).message}`);
  }
}

/**
 * Decrypts the given JWE string.
 * @param {string} jwe - The JWE string to be decrypted.
 * @param {KeyLike | Uint8Array} secret - The secret key used for decryption.
 * @returns {Promise<RequestBody>} - The decrypted data.
 * @throws {Error} - If decryption fails.
 */
export async function decryptData(jwe: string, secret: KeyLike | Uint8Array): Promise<RequestBody> {
  try {
    const { plaintext } = await jose.compactDecrypt(jwe, secret);
    const data = JSON.parse(decode(plaintext));

    return data;
  } catch (error) {
    throw new Error(`decryptData: ${(error as Error).message}`);
  }
}

/**
 * Signs the given JWE string using JWS.
 * @param {string} jwe - The JWE string to be signed.
 * @param {KeyLike | Uint8Array} secret - The secret key used for signing.
 * @param {string} jwsAlg - The algorithm used for signing.
 * @returns {Promise<string>} - The signed JWS string.
 * @throws {Error} - If signing fails.
 */
export async function signData(jwe: string, secret: KeyLike | Uint8Array, jwsAlg: string): Promise<string> {
  try {
    const jws = await new jose.CompactSign(encode(jwe)).setProtectedHeader({ alg: jwsAlg, type: 'jws' }).sign(secret);

    return jws;
  } catch (error) {
    throw new Error(`signData: ${(error as Error).message}`);
  }
}

/**
 * Verifies the given JWS string.
 * @param {string} jws - The JWS string to be verified.
 * @param {KeyLike | Uint8Array} secret - The secret key used for verification.
 * @returns {Promise<string>} - The verification result.
 * @throws {Error} - If verification fails.
 */
export async function verifySignature(jws: string, secret: KeyLike | Uint8Array): Promise<string> {
  try {
    const verifyResult = await jose.compactVerify(jws, secret);
    const payload = decode(verifyResult.payload);

    return payload;
  } catch (error) {
    throw new Error(`verifySignature: ${(error as Error).message}`);
  }
}

/**
 * Creates a JWT with the given payload.
 * @param {JWTPayload} payload - The payload to be included in the JWT.
 * @param {string} secret - The secret key used for signing the JWT.
 * @returns {Promise<string>} - The signed JWT string.
 * @throws {Error} - If JWT creation fails.
 */
export async function createJWT(payload: JWTPayload, secret: string): Promise<string> {
  try {
    const key = await jose.importPKCS8(secret, JwtAlg);
    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: JwtAlg, type: 'jwt' })
      .setIssuedAt()
      .setIssuer(issuer)
      .setAudience(audience)
      .setExpirationTime(expiresIn)
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
    const key = await jose.importSPKI(secret, JwtAlg);
    const { payload } = await jose.jwtVerify(jwt, key, {
      issuer: issuer,
      audience: audience,
    });

    return payload;
  } catch (error) {
    throw new Error(`verifyJwt: ${(error as Error).message}`);
  }
}

/**
 * Disassembles the given JWS string.
 * @param {string} jws - The JWS string to be disassembled.
 * @returns {string} - The disassembled JWS header and signature.
 * @throws {Error} - If disassembly fails.
 */
export function disassembleJWS(jws: string): string {
  try {
    const jwsParts = jws.split('.');
    const headerSignature = `${jwsParts[0]}..${jwsParts[2]}`;

    return headerSignature;
  } catch (error) {
    throw new Error(`disassembleJWS: ${(error as Error).message}`);
  }
}

/**
 * Assembles a JWS string with the given payload.
 * @param {string} jws - The JWS string to be assembled.
 * @param {string} payload - The payload to be included.
 * @returns {string} - The complete JWS string.
 * @throws {Error} - If assembly fails.
 */
export function assembleJWS(jws: string, payload: string): string {
  try {
    const jwe = jose.base64url.encode(payload);
    const jwsReplace = jws.replace('JWS ', '');
    const parts = jwsReplace.split('.');
    const completeJws = `${parts[0]}.${jwe}.${parts[2]}`;

    return completeJws;
  } catch (error) {
    throw new Error(`assembleJWS: ${(error as Error).message}`);
  }
}
