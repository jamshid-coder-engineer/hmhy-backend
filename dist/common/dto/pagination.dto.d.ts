import { SearchFieldEnum } from '../enum/index.enum';
export declare class PaginationDto {
    query?: string;
    search?: SearchFieldEnum;
    page?: number;
    limit?: number;
}
