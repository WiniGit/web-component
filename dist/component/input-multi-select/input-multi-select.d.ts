import React, { CSSProperties } from 'react';
import './input-multi-select.css';
interface SelectMultipleProps {
    value?: Array<string | number>;
    options: Required<Array<{
        id: string | number;
        name: string;
    }>>;
    onChange?: (value?: Array<string | number>) => void;
    placeholder?: string;
    disabled: boolean;
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    style?: CSSProperties;
    handleSearch?: (e: string) => Promise<Array<{
        id: string | number;
        name: string;
    }>>;
}
interface SelectMultipleState {
    value: Array<string | number>;
    offset: DOMRect;
    isOpen: boolean;
    onSelect: any;
    search?: Array<{
        id: string | number;
        name: string;
    }>;
    style?: Object;
}
export declare class SelectMultiple extends React.Component<SelectMultipleProps, SelectMultipleState> {
    constructor(props: SelectMultipleProps);
    private onCheck;
    private search;
    componentDidUpdate(prevProps: SelectMultipleProps, prevState: SelectMultipleState): void;
    render(): React.JSX.Element;
}
export {};
