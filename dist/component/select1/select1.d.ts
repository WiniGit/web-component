import React, { CSSProperties, ReactNode } from 'react';
export interface OptionsItem {
    id: string | number;
    parentId?: string;
    name: string | ReactNode;
    title?: string | ((onSelect: (e: OptionsItem) => void) => ReactNode);
    disabled?: boolean;
}
interface Select1Props {
    id?: string;
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
    handleLoadmore?: (onLoadMore: boolean, ev: React.UIEvent<HTMLDivElement, UIEvent>) => void;
    handleLoadChildren?: () => {};
    readOnly?: boolean;
    popupClassName?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    onOpenOptions?: (popupRef: HTMLDivElement) => void;
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
    private onKeyDown;
    componentDidUpdate(prevProps: Select1Props, prevState: Select1State): void;
    componentDidMount(): void;
    render(): React.JSX.Element;
}
export {};
