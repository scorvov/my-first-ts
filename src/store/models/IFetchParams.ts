export interface IFetchParams {
    perPage: number;
    currentPage: number;
    order?: "desc" | "asc";
    orderBy?: string;
}