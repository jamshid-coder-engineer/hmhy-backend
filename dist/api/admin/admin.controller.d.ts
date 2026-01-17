import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import type { IToken } from 'src/infrastructure/token/interface';
import { ChangePasswordDto } from '../teacher/dto/change-password.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    findAll(query: PaginationDto): Promise<import("../../infrastructure/pagination/successResponse").IResponsePagination>;
    updateMe(user: IToken, dto: UpdateAdminDto): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    changePassword(user: IToken, dto: ChangePasswordDto): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    getMe(user: IToken): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    getStats(): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    findOne(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
    remove(id: string): Promise<import("../../infrastructure/pagination/successResponse").ISuccess>;
}
