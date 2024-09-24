import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import './table.css'

export enum CellAlignItems {
    start = 'start',
    center = 'center',
    end = 'end',
}

type TbCellProps = {
    id?: string,
    fixed?: boolean,
    children?: ReactNode,
    className?: string,
    style?: CSSProperties,
    align?: CellAlignItems | string,
    onClick?: React.MouseEventHandler<HTMLTableDataCellElement>
}

export class TbCell extends React.Component<TbCellProps> {
    render(): React.ReactNode {
        return <td id={this.props.id} onClick={this.props.onClick} style={this.props.style} align-cell={this.props.align ?? CellAlignItems.start} className={`tb-cell ${this.props.className ?? ''} ${this.props.fixed ? 'tb-cell-fixed' : ''}`}>{this.props.children}</td>
    }
}

interface TbRowProps {
    id?: string,
    children?: Array<TbCell>,
    className?: string,
    style?: CSSProperties,
    onClick?: MouseEventHandler<HTMLTableRowElement>,
}


export class TbRow extends React.Component<TbRowProps> {
    render(): React.ReactNode {
        return <tr id={this.props.id} style={this.props.style} className={`tb-row ${this.props.className ?? ""}`} onClick={this.props.onClick}>
            {(this.props.children ?? []).map((e: TbCell, i: number) => {
                let ox: number | string = 0
                if (this.props.children && i > 0 && i < (this.props.children.length - 1)) {
                    ox = `calc(${this.props.children.slice(0, i).map(tb => {
                        const wValue = tb.props.style?.minWidth ?? tb.props.style?.width
                        return wValue ? typeof wValue === 'number' ? `${wValue}px` : wValue : '60px';
                    }).join(" + ")})`
                }
                return <TbCell
                    id={e.props.id}
                    key={`tb-cell-${i}`}
                    align={e.props.align}
                    children={e.props.children}
                    fixed={e.props.fixed}
                    onClick={e.props.onClick}
                    style={e.props.fixed ? (this.props.children && i === this.props.children.length - 1) ? { right: 0, ...(e.props.style ?? {}) } : { left: ox, ...(e.props.style ?? {}) } : e.props.style}
                    className={e.props.className} />;
            })}
        </tr>
    }
}

export class TbHeader extends React.Component<TbRowProps> {
    render() {
        return <thead style={this.props.style} className={`tb-header ${this.props.className ?? ""}`}>
            <tr>
                {(this.props.children ?? []).map((e: TbCell, i: number) => {
                    let ox: number | string = 0
                    if (this.props.children && i > 0 && i < (this.props.children.length - 1)) {
                        ox = `calc(${this.props.children.slice(0, i).map(tb => tb.props.style?.width ? typeof tb.props.style.width === 'number' ? `${tb.props.style.width}px` : tb.props.style.width : '60px').join(" + ")})`
                    }
                    return <TbCell
                        id={e.props.id}
                        key={`tb-cell-${i}`}
                        align={e.props.align}
                        children={e.props.children}
                        onClick={e.props.onClick}
                        fixed={e.props.fixed}
                        style={e.props.fixed ? (this.props.children && i === this.props.children.length - 1) ? { right: 0, ...(e.props.style ?? {}) } : { left: ox, ...(e.props.style ?? {}) } : e.props.style}
                        className={e.props.className} />;
                })}
            </tr>
        </thead>
    }
}

interface TbBodyProps {
    id?: string,
    children?: Array<TbRow>,
    className?: string,
    style?: CSSProperties,
}

export class TbBody extends React.Component<TbBodyProps> {
    render(): React.ReactNode {
        return <tbody id={this.props.id}>{this.props.children as ReactNode}</tbody>
    }
}

interface TableProps {
    id?: string,
    children?: Array<TbBody | TbHeader>,
    className?: string,
    style?: CSSProperties,
}

export class Table extends React.Component<TableProps> {
    render(): React.ReactNode {
        return <table id={this.props.id} className={`custom-table ${this.props.className}`} style={this.props.style}>{this.props.children as ReactNode}</table>
    }
}
