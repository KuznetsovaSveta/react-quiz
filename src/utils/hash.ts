import CryptoJS from 'crypto-js';

// Тот же ключ, что использовали при подготовке данных!
const SECRET_KEY = 'my-secret-key-for-quiz-2024';

export function hashIndex(index: number): string {
  return CryptoJS
    .HmacSHA256(index.toString(), SECRET_KEY)
    .toString(CryptoJS.enc.Hex)
    .substring(0, 16);
}