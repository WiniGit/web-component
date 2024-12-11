import React, { CSSProperties, ReactNode } from 'react';
import './popup.css';
interface PopupState {
    readonly open?: boolean;
    heading?: ReactNode;
    body?: ReactNode;
    content?: ReactNode;
    footer?: ReactNode;
    clickOverlayClosePopup?: boolean;
    style?: CSSProperties;
    hideButtonClose?: boolean;
}
export declare const showPopup: (props: {
    ref: React.MutableRefObject<Popup | undefined>;
    heading?: ReactNode;
    content?: ReactNode;
    body?: ReactNode;
    footer?: ReactNode;
    clickOverlayClosePopup?: boolean;
    style?: CSSProperties;
    hideButtonClose?: boolean;
}) => void;
export declare const closePopup: (ref: React.MutableRefObject<Popup>) => void;
export declare class Popup extends React.Component<Object, PopupState> {
    private ref;
    constructor(props: Object | Readonly<Object>);
    state: Readonly<PopupState>;
    onOpen(data: PopupState): void;
    onClose(): void;
    componentDidUpdate(prevProps: Readonly<Object>, prevState: Readonly<PopupState>): void;
    render(): React.JSX.Element;
}
export {};
