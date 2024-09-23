import React, { CSSProperties, ReactNode } from 'react';
import './select1.css';
export interface OptionsItem {
    id: string | number;
    parentId?: string;
    name: string | ReactNode;
    title?: string | ReactNode;
    disabled?: boolean;
}
interface Select1Props {
    value?: string | number;
    options: Required<Array<OptionsItem>>;
    onChange?: (v?: OptionsItem) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    style?: CSSProperties;
    handleSearch?: (e: string) => Promise<Array<OptionsItem>>;
    showClearValueButton?: boolean;
    readOnly?: boolean;
}
interface Select1State {
    value?: string | number;
    options: Required<Array<OptionsItem>>;
    offset: DOMRect;
    isOpen: boolean;
    onSelect: any;
    selected?: string | number;
    search?: Array<OptionsItem>;
    style?: Object;
}
export declare class Select1 extends React.Component<Select1Props, Select1State> {
    private containerRef;
    private inputRef;
    constructor(props: Select1Props);
    private search;
    private onSelect;
    private renderOptions;
    private onKeyDown;
    componentDidUpdate(prevProps: Select1Props, prevState: Select1State): void;
    render(): React.JSX.Element;
}
export {};
