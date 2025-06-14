import { CSSProperties } from 'react';
interface IconLibraryProps {
    onSelect: (src: {
        [p: string]: any;
    }) => void;
    style?: CSSProperties;
    onClose?: () => void;
    className?: string;
}
export declare function IconLibrary({ onSelect, style, onClose, className }: IconLibraryProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=iconLibrary.d.ts.map