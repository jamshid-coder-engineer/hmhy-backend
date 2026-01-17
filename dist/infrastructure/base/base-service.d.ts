import { Repository } from 'typeorm';
import { IFindOptions, IResponsePagination, ISuccess } from '../pagination/successResponse';
import { SoftDeleteDto } from 'src/api/teacher/dto/soft-delete.dto';
export declare class BaseService<CreateDto, UpdateDto, Entity> {
    private readonly repository;
    constructor(repository: Repository<any>);
    get getRepository(): Repository<any>;
    create(dto: CreateDto): Promise<ISuccess>;
    findAll(options?: IFindOptions<Entity>): Promise<ISuccess>;
    softDelete(id: string, dto: SoftDeleteDto, adminId: string): Promise<ISuccess>;
    findAllWithPagination(options: IFindOptions<Entity> & {
        search?: string;
    }): Promise<IResponsePagination>;
    findOneBy(options: IFindOptions<Entity>): Promise<ISuccess>;
    findOneById(id: string, options?: IFindOptions<Entity>): Promise<ISuccess>;
    update(id: string, dto: UpdateDto): Promise<ISuccess>;
    delete(id: string): Promise<ISuccess>;
    restoreTeacher(id: string): Promise<ISuccess>;
    updateStatus(id: string): Promise<ISuccess>;
}
