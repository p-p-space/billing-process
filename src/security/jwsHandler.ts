import { CompactSign, compactVerify, base64url } from 'jose';
// Internal app
import { encode, decode } from './jweHandler';

/**
 * Signs the given JWE string using JWS.
 * @param {string} jwe - The JWE string to be signed.
 * @param {CryptoKey | Uint8Array} secret - The secret key used for signing.
 * @param {string} jwsAlg - The algorithm used for signing.
 * @returns {Promise<string>} - The signed JWS string.
 * @throws {Error} - If signing fails.
 */
export async function signData(jwe: string, secret: CryptoKey | Uint8Array, jwsAlg: string): Promise<string> {
  try {
    const jws = await new CompactSign(encode(jwe)).setProtectedHeader({ alg: jwsAlg, type: 'jws' }).sign(secret);

    return jws;
  } catch (error) {
    throw new Error(`signData: ${(error as Error).message}`);
  }
}

/**
 * Verifies the given JWS string.
 * @param {string} jws - The JWS string to be verified.
 * @param {CryptoKey | Uint8Array} secret - The secret key used for verification.
 * @returns {Promise<string>} - The verification result.
 * @throws {Error} - If verification fails.
 */
export async function verifySignature(jws: string, secret: CryptoKey | Uint8Array): Promise<string> {
  try {
    const verifyResult = await compactVerify(jws, secret);
    const payload = decode(verifyResult.payload);

    return payload;
  } catch (error) {
    throw new Error(`verifySignature: ${(error as Error).message}`);
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
    const jwe = base64url.encode(payload);
    const jwsReplace = jws.replace('JWS ', '');
    const parts = jwsReplace.split('.');
    const completeJws = `${parts[0]}.${jwe}.${parts[2]}`;

    return completeJws;
  } catch (error) {
    throw new Error(`assembleJWS: ${(error as Error).message}`);
  }
}
