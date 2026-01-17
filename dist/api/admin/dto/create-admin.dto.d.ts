import { Roles } from 'src/common/enum/index.enum';
export declare class CreateAdminDto {
    username: string;
    password: string;
    phoneNumber: string;
    role?: Roles;
}
