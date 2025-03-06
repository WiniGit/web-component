import { default as React, CSSProperties, MouseEventHandler, ReactNode } from 'react';
export declare enum CellAlignItems {
    start = "start",
    center = "center",
    end = "end"
}
type TbCellProps = {
    id?: string;
    fixed?: boolean;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    align?: CellAlignItems | string;
    onClick?: React.MouseEventHandler<HTMLTableDataCellElement>;
};
export declare class TbCell extends React.Component<TbCellProps> {
    render(): React.ReactNode;
}
interface TbRowProps {
    id?: string;
    children?: Array<TbCell>;
    className?: string;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLTableRowElement>;
}
export declare class TbRow extends React.Component<TbRowProps> {
    render(): React.ReactNode;
}
export declare class TbHeader extends React.Component<TbRowProps> {
    render(): import("react/jsx-runtime").JSX.Element;
}
interface TbBodyProps {
    id?: string;
    children?: Array<TbRow>;
    className?: string;
    style?: CSSProperties;
}
export declare class TbBody extends React.Component<TbBodyProps> {
    render(): React.ReactNode;
}
interface TableProps {
    id?: string;
    children?: Array<TbBody | TbHeader>;
    className?: string;
    style?: CSSProperties;
}
export declare class Table extends React.Component<TableProps> {
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=table.d.ts.map