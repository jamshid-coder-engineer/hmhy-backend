export declare class CryptoService {
    encrypt(data: string): Promise<string>;
    compare(raw: string, hashed: string): Promise<boolean>;
    decrypt(data: string, encryptedData: string): Promise<boolean>;
}
