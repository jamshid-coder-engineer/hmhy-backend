import { TeacherSpecification } from 'src/common/enum/index.enum';
export declare class UpdateTeacherDto {
    phoneNumber?: string;
    fullName: string;
    cardNumber?: string;
    specification?: TeacherSpecification;
    level?: string;
    description?: string;
    hourPrice?: number;
    portfolioLink?: string;
    experience?: string;
}
