import { ObjectLiteral, Repository } from 'typeorm';
import { IResponsePagination } from './successResponse';
export interface IFindOptions<T> {
    relations?: string[];
    select?: any;
    where?: any;
    order?: any;
    page?: number;
    limit?: number;
    take?: number;
    skip?: number;
}
export declare class RepositoryPager {
    static readonly DEFAULT_PAGE = 1;
    static readonly DEFAULT_PAGE_SIZE = 10;
    static findAll<T extends ObjectLiteral>(repository: Repository<T>, options?: IFindOptions<T>): Promise<IResponsePagination>;
    private static normalizePagination;
}
