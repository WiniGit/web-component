import React, { CSSProperties } from 'react';
import { ComponentStatus } from '../component-status';
import { WithTranslation } from 'react-i18next';
type ChangeFileFunction = (a?: Array<File> | Array<{
    [k: string]: any;
}>) => void;
interface ImportFileProps extends WithTranslation {
    id?: string;
    status?: ComponentStatus;
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
}
export declare const ImportFile: React.ComponentType<Omit<import("react-i18next/helpers").$Subtract<ImportFileProps | Readonly<ImportFileProps>, import("react-i18next").WithTranslationProps>, keyof WithTranslation<Ns, undefined>> & import("react-i18next").WithTranslationProps>;
export {};
