import { AuthService } from './auth.service';
import { AdminSignInDto } from './dto/admin-signIn.dto';
import type { Response } from 'express';
import { TeacherSignInDto } from './dto/teacher-signIn.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    adminSignIn(dto: AdminSignInDto, res: Response): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    teacherSignIn(dto: TeacherSignInDto, res: Response): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    loginTelegram(initData: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    devLogin(studentId: string, res: Response): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    newToken(token: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    signOut(token: string, res: Response): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
}
