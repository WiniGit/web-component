import { CSSProperties } from 'react';
type ChangeFileFunction = (a?: Array<File> | Array<{
    [k: string]: any;
}>) => void;
interface ImportFileProps {
    id?: string;
    value?: File | Array<File> | {
        [k: string]: any;
    } | Array<{
        [k: string]: any;
    }>;
    buttonOnly?: boolean;
    onChange?: ChangeFileFunction;
    label?: string;
    className?: string;
    style?: CSSProperties;
    allowType?: Array<string>;
    subTitle?: string;
    multiple?: boolean;
    helperText?: string;
    helperTextColor?: string;
    disabled?: boolean;
    fileTagStyle?: CSSProperties;
    /**
    * maxSize unit: kb (kilobytes)
    */
    maxSize?: number;
    simpleStyle?: boolean;
}
export declare const ImportFile: import('react').ForwardRefExoticComponent<ImportFileProps & import('react').RefAttributes<unknown>>;
export {};
//# sourceMappingURL=import-file.d.ts.map