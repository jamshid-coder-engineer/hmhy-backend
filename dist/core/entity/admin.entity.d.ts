import { BaseEntity } from './base.entity';
import { Roles } from 'src/common/enum/index.enum';
export declare class Admin extends BaseEntity {
    username: string;
    password: string;
    phoneNumber: string;
    role: Roles;
}
