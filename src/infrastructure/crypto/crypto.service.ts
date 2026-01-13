import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import * as bcrypt from 'bcrypt'
@Injectable()
export class CryptoService {
  async encrypt(data: string): Promise<string> {
    return hash(data, 7);
  }


  async compare(raw: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(raw, hashed)
  }

  async decrypt(data: string, encryptedData: string): Promise<boolean> {
    return compare(data, encryptedData);
  }
}
