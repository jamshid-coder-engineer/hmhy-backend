import { OnModuleInit } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { BaseService } from 'src/infrastructure/base/base-service';
import { Admin } from 'src/core/entity/admin.entity';
import type { AdminRepository } from 'src/core/repository/admin.repository';
import { CryptoService } from 'src/infrastructure/crypto/crypto.service';
import { ISuccess } from 'src/infrastructure/pagination/successResponse';
import { ChangePasswordDto } from '../teacher/dto/change-password.dto';
import type { StudentRepository } from 'src/core/repository/student.repository';
import type { LessonRepository } from 'src/core/repository/lesson.repository';
import type { TeacherRepository } from 'src/core/repository/teacher.repository';
import type { TeacherPaymentRepository } from 'src/core/repository/teacherPayment.repository';
export declare class AdminService extends BaseService<CreateAdminDto, UpdateAdminDto, Admin> implements OnModuleInit {
    private readonly adminRepo;
    private readonly studentRepo;
    private readonly lessonRepo;
    private readonly teacherRepo;
    private readonly paymentRepo;
    private readonly crypto;
    constructor(adminRepo: AdminRepository, studentRepo: StudentRepository, lessonRepo: LessonRepository, teacherRepo: TeacherRepository, paymentRepo: TeacherPaymentRepository, crypto: CryptoService);
    onModuleInit(): Promise<void>;
    createAdmin(dto: CreateAdminDto): Promise<ISuccess>;
    updateAdmin(dto: UpdateAdminDto, id: string): Promise<ISuccess>;
    updateAdminMe(id: string, dto: UpdateAdminDto): Promise<ISuccess>;
    changePassword(id: string, dto: ChangePasswordDto): Promise<ISuccess>;
    getStats(): Promise<ISuccess>;
}
