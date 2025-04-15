import { FieldValues, UseFormReturn } from 'react-hook-form';
import { CSSProperties } from 'react';
export declare function RenderComponentByType({ fieldItem, methods, className, style, labelStyle, label }: {
    fieldItem: any;
    methods: UseFormReturn<FieldValues, any, undefined>;
    className?: string;
    style?: CSSProperties;
    labelStyle?: CSSProperties;
    label?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function validateForm({ list, formdata }: {
    list?: Array<{
        [p: string]: any;
    }>;
    formdata?: {
        [p: string]: any;
    };
}): Promise<any>;
export declare const regexGetVariableByThis: RegExp;
//# sourceMappingURL=config.d.ts.map