import React, { CSSProperties } from "react";
interface Props {
    id?: string;
    currentPage: number;
    itemPerPage: number;
    totalItem: number;
    onChangePage: Function;
    hideGoToPage?: boolean;
    hidePageSize?: boolean;
    style: CSSProperties;
}
export declare function Pagination({ id, currentPage, itemPerPage, totalItem, onChangePage, hidePageSize, hideGoToPage, style }: Props): React.JSX.Element;
export {};
