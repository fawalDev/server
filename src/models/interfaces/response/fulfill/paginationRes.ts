
export default interface IPaginationRes {

    pagination: {
        currentPage: number;       // Current page number
        totalPages: number;        // Total number of pages
        totalItems: number;        // Total number of items
        itemsPerPage: number;      // Number of items per page
    };
}
