import { CompactEncrypt, compactDecrypt } from 'jose';
// Internal app
import { jwtAlgs } from '@/constans';
import type { ReqResBody } from '@/interfaces';

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
 * @param {ReqResBody} payload - The data to be encrypted.
 * @param {CryptoKey | Uint8Array} secret - The secret key used for encryption.
 * @param {string} JweAlg - The algorithm used for encryption.
 * @returns {Promise<string>} - The encrypted JWE string.
 * @throws {Error} - If encryption fails.
 */
export async function encryptData(
  payload: ReqResBody,
  secret: CryptoKey | Uint8Array,
  JweAlg: string
): Promise<string> {
  try {
    const plaintext = encode(JSON.stringify(payload));
    const jwe = await new CompactEncrypt(plaintext)
      .setProtectedHeader({ alg: JweAlg, enc: jwtAlgs.jweEnc, type: 'jwe' })
      .encrypt(secret);

    return jwe;
  } catch (error) {
    throw new Error(`encryptData: ${(error as Error).message}`);
  }
}

/**
 * Decrypts the given JWE string.
 * @param {string} jwe - The JWE string to be decrypted.
 * @param {CryptoKey | Uint8Array} secret - The secret key used for decryption.
 * @returns {Promise<ReqResBody>} - The decrypted data.
 * @throws {Error} - If decryption fails.
 */
export async function decryptData(jwe: string, secret: CryptoKey | Uint8Array): Promise<ReqResBody> {
  try {
    const { plaintext } = await compactDecrypt(jwe, secret);
    const data = JSON.parse(decode(plaintext));

    return data;
  } catch (error) {
    throw new Error(`decryptData: ${(error as Error).message}`);
  }
}
