import React, { CSSProperties } from "react";
import './pagination.css';
export declare function Pagination({ id, currentPage, itemPerPage, totalItem, onChangePage, hiddenPageSize, hiddenTotal, style }: {
    id?: string;
    currentPage: number;
    itemPerPage: number;
    totalItem: number;
    onChangePage: Function;
    hiddenPageSize: boolean;
    hiddenTotal: boolean;
    style: CSSProperties;
}): React.JSX.Element;
