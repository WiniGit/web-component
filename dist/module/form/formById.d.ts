import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
interface FormByIdProps {
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
    customOptions?: {
        [p: string]: Array<{
            [k: string]: any;
        }>;
    };
    onSubmit?: (ev: {
        [p: string]: any;
    }) => void;
}
export declare const FormById: import('react').ForwardRefExoticComponent<FormByIdProps & import('react').RefAttributes<unknown>>;
export {};
//# sourceMappingURL=formById.d.ts.map