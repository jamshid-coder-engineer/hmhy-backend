import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class AuthGuard implements CanActivate {
    private readonly jwt;
    constructor(jwt: JwtService);
    canActivate(context: ExecutionContext): boolean;
}
