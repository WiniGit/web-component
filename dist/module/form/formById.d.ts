import { CSSProperties, ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { CustomHTMLProps } from '../page/pageById';
interface FormByIdProps {
    id: string;
    style?: CSSProperties;
    className?: string;
    propsData?: {
        [p: string]: CustomHTMLProps;
    };
    childrenData?: {
        [p: string]: ReactNode;
    };
    itemData?: {
        [p: string]: ReactNode;
    };
    data?: {
        [p: string]: any;
    };
    customOptions?: {
        [p: string]: Array<{
            [k: string]: any;
        }>;
    };
    onSubmit?: (e?: {
        [p: string]: any;
    }) => void;
    onError?: (e?: {
        [p: string]: any;
    }) => void;
}
interface FormByIdRef {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    methods: UseFormReturn<FieldValues, any, FieldValues>;
}
export declare const FormById: import('react').ForwardRefExoticComponent<FormByIdProps & import('react').RefAttributes<FormByIdRef>>;
export {};
//# sourceMappingURL=formById.d.ts.map