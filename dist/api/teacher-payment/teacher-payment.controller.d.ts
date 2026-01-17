import { TeacherPaymentService } from './teacher-payment.service';
import { CreateTeacherPaymentDto } from './dto/create-teacher-payment.dto';
import { UpdateTeacherPaymentDto } from './dto/update-teacher-payment.dto';
export declare class TeacherPaymentController {
    private readonly teacherPaymentService;
    constructor(teacherPaymentService: TeacherPaymentService);
    create(createTeacherPaymentDto: CreateTeacherPaymentDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTeacherPaymentDto: UpdateTeacherPaymentDto): string;
    remove(id: string): string;
}
