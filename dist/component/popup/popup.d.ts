import { default as React, CSSProperties, ReactNode } from 'react';
interface PopupState {
    readonly open?: boolean;
    heading?: ReactNode;
    body?: ReactNode;
    content?: ReactNode;
    footer?: ReactNode;
    clickOverlayClosePopup?: boolean;
    style?: CSSProperties;
    className?: string;
    hideOverlay?: boolean;
}
export declare const showPopup: (props: {
    ref: React.RefObject<Popup | undefined>;
    heading?: ReactNode;
    content?: ReactNode;
    body?: ReactNode;
    footer?: ReactNode;
    clickOverlayClosePopup?: boolean;
    style?: CSSProperties;
    className?: string;
    hideOverlay?: boolean;
}) => void;
export declare const closePopup: (ref: React.RefObject<Popup>) => void;
export declare class Popup extends React.Component<Object, PopupState> {
    constructor(props: Object | Readonly<Object>);
    state: Readonly<PopupState>;
    onOpen(data: PopupState): void;
    onClose(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export declare function PopupOverlay({ children, onClose, className, style, onOpen }: {
    children?: ReactNode;
    className?: string;
    onClose?: (ev: MouseEvent) => void;
    style?: CSSProperties;
    onOpen?: (ev: HTMLDivElement) => void;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=popup.d.ts.map