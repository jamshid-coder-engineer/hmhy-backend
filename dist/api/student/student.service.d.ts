import { OnModuleDestroy } from '@nestjs/common';
import { Student } from 'src/core/entity/student.entity';
import { BaseService } from 'src/infrastructure/base/base-service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import type { StudentRepository } from 'src/core/repository/student.repository';
export declare class StudentService extends BaseService<CreateStudentDto, UpdateStudentDto, Student> implements OnModuleDestroy {
    private readonly studentRepo;
    private bot;
    private sessions;
    private readonly logger;
    constructor(studentRepo: StudentRepository);
    private assertFrom;
    private getWebAppUrl;
    private sendOpenAppButtons;
    private initializeBot;
    private handleRegistrationStep;
    private completeRegistration;
    onModuleDestroy(): Promise<void>;
    getStats(): Promise<{
        totalStudents: number;
        activeStudents: number;
        blockedStudents: number;
    }>;
    toggleStudentBlock(id: string, reason?: string): Promise<Student>;
    updateStudent(id: string, updateStudentDto: UpdateStudentDto): Promise<Student>;
}
