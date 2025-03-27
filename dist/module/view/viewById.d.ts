import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
interface ViewByIdProps {
    id: string;
    style?: CSSProperties;
    className?: string;
    data?: {
        [p: string]: any;
    };
    propsData?: {
        [p: string]: {
            style?: CSSProperties;
            className?: string;
            onClick?: (ev: MouseEventHandler) => void;
            [p: string]: any;
        };
    };
    childrenData?: {
        [p: string]: ReactNode;
    };
    itemData?: {
        [p: string]: ReactNode;
    };
}
export declare const ViewById: (props: ViewByIdProps) => any;
export {};
//# sourceMappingURL=viewById.d.ts.map