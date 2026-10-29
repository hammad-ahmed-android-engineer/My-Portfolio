import CryptoJS from "crypto-js";
import { serverConfig } from "@/config/serverConfig";

/**
 * Server-side & client-compatible AES symmetric encryption using CryptoJS
 */
export function encryptPayload<T = unknown>(data: T): string {
  try {
    const jsonString = typeof data === "string" ? data : JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, serverConfig.encryptionKey).toString();
  } catch (error) {
    console.error("Encryption failure:", error);
    throw new Error("Cryptographic operation failed");
  }
}

/**
 * Server-side & client-compatible AES symmetric decryption using CryptoJS
 */
export function decryptPayload<T = unknown>(ciphertext: string): T {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, serverConfig.encryptionKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedString) {
      throw new Error("Invalid or corrupted ciphertext");
    }
    try {
      return JSON.parse(decryptedString) as T;
    } catch {
      return decryptedString as unknown as T;
    }
  } catch (error) {
    console.error("Decryption failure:", error);
    throw new Error("Decryption failed or invalid payload");
  }
}

