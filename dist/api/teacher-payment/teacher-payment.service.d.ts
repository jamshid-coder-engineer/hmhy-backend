import { CreateTeacherPaymentDto } from './dto/create-teacher-payment.dto';
import { UpdateTeacherPaymentDto } from './dto/update-teacher-payment.dto';
export declare class TeacherPaymentService {
    create(createTeacherPaymentDto: CreateTeacherPaymentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTeacherPaymentDto: UpdateTeacherPaymentDto): string;
    remove(id: number): string;
}
