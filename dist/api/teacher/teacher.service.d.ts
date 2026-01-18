import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import type { TeacherRepository } from 'src/core/repository/teacher.repository';
import { BaseService } from 'src/infrastructure/base/base-service';
import { Teacher } from 'src/core/entity/teacher.entity';
import { CryptoService } from 'src/infrastructure/crypto/crypto.service';
import Redis from 'ioredis';
import { ISuccess } from 'src/infrastructure/pagination/successResponse';
import { ChangePasswordDto } from './dto/change-password.dto';
import { TeacherFilterDto } from './dto/teacher-filter.dto';
export declare class TeacherService extends BaseService<CreateTeacherDto, UpdateTeacherDto, Teacher> {
    private readonly teacherRepo;
    private readonly redis;
    private readonly crypto;
    constructor(teacherRepo: TeacherRepository, redis: Redis, crypto: CryptoService);
    createIncompleteGoogleTeacher(data: any): Promise<Teacher>;
    findTeacherByPhone(phoneNumber: string): Promise<Teacher | null>;
    validateTeacher(email: string, password: string): Promise<Teacher>;
    saveOtpToRedis(phoneNumber: string, data: any): Promise<void>;
    getOtpFromRedis(phoneNumber: string): Promise<any>;
    deleteOtpFromRedis(phoneNumber: string): Promise<void>;
    findCompleteGoogleTeacher(email: string): Promise<Teacher | null>;
    findByEmail(email: string): Promise<Teacher | null>;
    activateTeacher(email: string, phoneNumber: string, password: string): Promise<Teacher>;
    findFilteredTeachers(query: TeacherFilterDto): Promise<import("src/infrastructure/pagination/successResponse").IResponsePagination>;
    updateTeacher(id: string, dto: UpdateTeacherDto): Promise<ISuccess>;
    changePassword(id: string, dto: ChangePasswordDto): Promise<ISuccess>;
}
