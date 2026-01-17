import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import type { IToken } from 'src/infrastructure/token/interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    findAll(query: PaginationDto): Promise<import("../../infrastructure/pagination/successResponse").IResponsePagination>;
    getMe(user: IToken): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    getStudentStats(): Promise<{
        totalStudents: number;
        activeStudents: number;
        blockedStudents: number;
    }>;
    blockStudent(id: string, reason: string): Promise<import("../../core/entity/student.entity").Student>;
    findOne(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    remove(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
}
