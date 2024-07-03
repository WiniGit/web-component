import React, { CSSProperties, ReactNode } from 'react';
import './select1.css';
interface OptionsItem {
    id: string | number;
    name: string | ReactNode;
    title?: string | ReactNode;
}
interface Select1Props {
    value?: any;
    options: Required<Array<OptionsItem>>;
    onChange?: (value?: OptionsItem) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    style?: CSSProperties;
    searchPlaceholder?: string;
    hideSearch?: boolean;
    handleSearch?: (e: string) => Promise<Array<OptionsItem>>;
}
interface Select1State {
    value?: string | number;
    offset: DOMRect;
    isOpen: boolean;
    onSelect: any;
    search?: Array<OptionsItem>;
    style?: Object;
}
export declare class Select1 extends React.Component<Select1Props, Select1State> {
    constructor(props: Select1Props);
    private parseValue;
    componentDidUpdate(prevProps: Select1Props, prevState: Select1State): void;
    private onChangeValue;
    private search;
    render(): React.JSX.Element;
}
export {};
