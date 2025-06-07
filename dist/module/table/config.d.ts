import { CSSProperties } from 'react';
interface AutoCellContentProps {
    colItem: {
        [p: string]: any;
    };
    data?: any;
    fields: {
        [p: string]: any;
    }[];
    files: {
        [p: string]: any;
    }[];
    style?: CSSProperties;
}
export declare const AutoCellContent: ({ colItem, data, fields, files, style }: AutoCellContentProps) => any;
interface CustomerAvatarProps {
    data: {
        [p: string]: any;
    };
    style?: CSSProperties;
    onClick?: () => void;
    emableTooltip?: boolean;
}
export declare const CustomerAvatar: ({ data, style, onClick, emableTooltip }: CustomerAvatarProps) => import("react/jsx-runtime").JSX.Element | null;
export declare const cellValue: (colItem: {
    [p: string]: any;
}, data: any, fields?: {
    [p: string]: any;
}[], files?: {
    [p: string]: any;
}[]) => any;
export {};
//# sourceMappingURL=config.d.ts.map