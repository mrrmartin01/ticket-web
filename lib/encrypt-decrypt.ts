import CryptoJS from "crypto-js";

const DEFAULT_KEY = process.env.NEXT_PUBLIC_HASHING_KEY ;
function requireKey(key?: string) {
  const k = key ?? DEFAULT_KEY;
  if (!k) throw new Error("HASHING_KEY not defined. Set HASHING_KEY (server)");
  return k;
}

export const encryptToken = (token: string, key?: string): string => {
  const k = requireKey(key);
  return CryptoJS.AES.encrypt(token, k).toString();
};

export const decryptToken = (encryptedToken: string, key?: string): string => {
  const k = requireKey(key);
  const bytes = CryptoJS.AES.decrypt(encryptedToken, k);
  return bytes.toString(CryptoJS.enc.Utf8);
};
