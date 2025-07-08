import { CSSProperties, ReactNode } from 'react';
import { CustomHTMLProps } from '../page/pageById';
interface ViewByIdProps {
    id: string;
    style?: CSSProperties;
    className?: string;
    data?: {
        [p: string]: any;
    };
    propsData?: {
        [p: string]: CustomHTMLProps;
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