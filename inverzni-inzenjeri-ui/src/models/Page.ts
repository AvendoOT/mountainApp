export type Page<T> = {
    content: T[];
    totalElements: number;
    pageable: {
        pageNumber: number;
        pageSize: number;
        onPageChange: (page: number) => void
    }
}