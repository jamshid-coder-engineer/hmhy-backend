import { AdminSignInDto } from './dto/admin-signIn.dto';
import { TeacherSignInDto } from './dto/teacher-signIn.dto';
import { CryptoService } from 'src/infrastructure/crypto/crypto.service';
import { TokenService } from 'src/infrastructure/token/Token';
import { Response } from 'express';
import type { AdminRepository } from 'src/core/repository/admin.repository';
import type { TeacherRepository } from 'src/core/repository/teacher.repository';
import type { StudentRepository } from 'src/core/repository/student.repository';
export declare class AuthService {
    private readonly adminRepo;
    private readonly teacherRepo;
    private readonly studentRepo;
    private readonly crypto;
    private readonly token;
    constructor(adminRepo: AdminRepository, teacherRepo: TeacherRepository, studentRepo: StudentRepository, crypto: CryptoService, token: TokenService);
    adminSignIn(dto: AdminSignInDto, res: Response): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    teacherSignIn(dto: TeacherSignInDto, res: Response): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    telegramLogin(initData: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    devLogin(studentId: string, res: Response): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    newToken(token: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    signOut(token: string, res: Response, tokenKey: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
}
