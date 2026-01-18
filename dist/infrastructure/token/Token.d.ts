import { IToken } from './interface';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
export declare class TokenService {
    private readonly jwt;
    constructor(jwt: JwtService);
    accessToken(payload: IToken): Promise<string>;
    refreshToken(payload: IToken): Promise<string>;
    writeCookie(res: Response, key: string, value: string, time: number): Promise<void>;
    verifyToken(token: string, secretKey: string): Promise<object>;
}
