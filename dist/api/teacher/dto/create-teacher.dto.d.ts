import { TeacherSpecification } from 'src/common/enum/index.enum';
export declare class CreateTeacherDto {
    email?: string;
    phoneNumber?: string;
    fullName: string;
    password: string;
    cardNumber?: string;
    isActive?: boolean;
    specification?: TeacherSpecification;
    level?: string;
    description?: string;
    hourPrice?: number;
    portfolioLink?: string;
    imageUrl?: string;
    experience?: string;
}
