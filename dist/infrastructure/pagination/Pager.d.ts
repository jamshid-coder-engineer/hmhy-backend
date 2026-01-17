import { IResponsePagination } from './successResponse';
export declare class Pager<T> {
    private statusCode;
    private message;
    private data;
    private totalElements;
    private totalPages;
    private pageSize;
    private currentPage;
    private from;
    private to;
    static of<T>(statusCode: number, message: {
        uz: string;
        ru: string;
        en: string;
    }, data: Array<T>, totalElements: number, pageSize: number, currentPage: number): IResponsePagination;
    private constructor();
    toPage(): IResponsePagination;
}
