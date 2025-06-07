import { CSSProperties } from 'react';
export declare function getTableConfig(item: {
    [p: string]: any;
}, data: {
    [p: string]: any;
}): {
    _minW: any;
    _value: any;
};
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
export {};
//# sourceMappingURL=config.d.ts.map