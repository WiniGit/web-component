import React, { CSSProperties } from 'react';
import './input-multi-select.css';
import { OptionsItem } from '../select1/select1';
interface SelectMultipleProps {
    value?: Array<string | number>;
    options: Required<Array<OptionsItem>>;
    onChange?: (value?: Array<string | number>) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    style?: CSSProperties;
    handleSearch?: (e: string) => Promise<Array<OptionsItem>>;
    hideClearValueButton?: boolean;
}
interface SelectMultipleState {
    value: Array<string | number>;
    options: Required<Array<OptionsItem>>;
    offset: DOMRect;
    isOpen: boolean;
    onSelect: any;
    search?: Array<OptionsItem>;
    style?: Object;
}
export declare class SelectMultiple extends React.Component<SelectMultipleProps, SelectMultipleState> {
    private containerRef;
    constructor(props: SelectMultipleProps);
    private onCheck;
    private search;
    private onClickItem;
    private renderOptions;
    componentDidUpdate(prevProps: SelectMultipleProps, prevState: SelectMultipleState): void;
    render(): React.JSX.Element;
}
export {};
