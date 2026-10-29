import CryptoJS from "crypto-js";

/**
 * Master client encryption secret.
 * Stored in browser runtime and used to encrypt all local cached data.
 */
const STORAGE_CIPHER_SECRET =
  (typeof window !== "undefined" && (window as any).__SEC_SEED) ?
  (window as any).__SEC_SEED :
  "hammad_portfolio_client_vault_key_2026_aes256";

/**
 * Encrypt any data string or object with AES
 */
export function encryptClientPayload(data: any): string {
  try {
    const jsonStr = typeof data === "string" ? data : JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonStr, STORAGE_CIPHER_SECRET).toString();
  } catch (error) {
    console.error("Client encryption error:", error);
    return "";
  }
}

/**
 * Decrypt any ciphertext with AES
 */
export function decryptClientPayload<T = any>(ciphertext: string): T | null {
  try {
    if (!ciphertext) return null;
    const bytes = CryptoJS.AES.decrypt(ciphertext, STORAGE_CIPHER_SECRET);
    const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedStr) return null;
    try {
      return JSON.parse(decryptedStr) as T;
    } catch {
      return decryptedStr as unknown as T;
    }
  } catch (error) {
    console.error("Client decryption error:", error);
    return null;
  }
}

/**
 * SecureStorage API
 * Transparently encrypts all keys and values in localStorage and sessionStorage.
 * In browser DevTools Application tab, all stored keys and values appear as encrypted ciphertext.
 */
class SecureStorageManager {
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined";
  }

  private hashKey(key: string): string {
    return "__enc_" + CryptoJS.SHA256(key + STORAGE_CIPHER_SECRET).toString().substring(0, 16);
  }

  public setItem(key: string, value: any, sessionOnly = false): void {
    if (!this.isBrowser) return;
    try {
      const storage = sessionOnly ? window.sessionStorage : window.localStorage;
      const obfuscatedKey = this.hashKey(key);
      const encryptedValue = encryptClientPayload({
        val: value,
        t: Date.now(),
        v: 1,
      });
      storage.setItem(obfuscatedKey, encryptedValue);
    } catch (e) {
      console.warn("SecureStorage setItem failed:", e);
    }
  }

  public getItem<T = any>(key: string, sessionOnly = false): T | null {
    if (!this.isBrowser) return null;
    try {
      const storage = sessionOnly ? window.sessionStorage : window.localStorage;
      const obfuscatedKey = this.hashKey(key);
      const encryptedValue = storage.getItem(obfuscatedKey);
      if (!encryptedValue) return null;

      const payload = decryptClientPayload<{ val: T; t: number; v: number }>(encryptedValue);
      if (!payload || payload.val === undefined) return null;
      return payload.val;
    } catch (e) {
      console.warn("SecureStorage getItem failed:", e);
      return null;
    }
  }

  public removeItem(key: string, sessionOnly = false): void {
    if (!this.isBrowser) return;
    try {
      const storage = sessionOnly ? window.sessionStorage : window.localStorage;
      const obfuscatedKey = this.hashKey(key);
      storage.removeItem(obfuscatedKey);
    } catch (e) {
      // Ignore
    }
  }

  public clear(): void {
    if (!this.isBrowser) return;
    try {
      window.localStorage.clear();
      window.sessionStorage.clear();
    } catch (e) {
      // Ignore
    }
  }
}

export const secureStorage = new SecureStorageManager();

