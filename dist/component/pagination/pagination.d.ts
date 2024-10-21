import React, { CSSProperties } from "react";
export declare function Pagination({ id, currentPage, itemPerPage, totalItem, onChangePage, hidePageSize, hideGoToPage, style }: {
    id?: string;
    currentPage: number;
    itemPerPage: number;
    totalItem: number;
    onChangePage: Function;
    hideGoToPage?: boolean;
    hidePageSize?: boolean;
    style: CSSProperties;
}): React.JSX.Element;
