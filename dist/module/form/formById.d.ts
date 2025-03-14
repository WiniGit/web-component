import { ReactNode, CSSProperties } from 'react';
import { UseFormReturn } from 'react-hook-form';
interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
    data?: {
        [p: string]: any;
    };
    disabled?: boolean;
    readonly?: boolean;
    customFieldUI?: {
        [p: string]: (methods: UseFormReturn) => ReactNode;
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
interface FormByIdProps extends Props {
    formId: string;
}
export declare const FormById: (props: FormByIdProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=formById.d.ts.map