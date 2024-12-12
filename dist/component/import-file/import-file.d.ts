import React, { CSSProperties } from 'react';
import { ComponentStatus } from '../component-status';
interface ImportFileState {
    status?: ComponentStatus;
    preview: File | {
        [k: string]: any;
    } | undefined | null;
}
type ChangeFileFunction = (a?: File) => void;
interface ImportFileProps {
    id?: string;
    status?: ComponentStatus;
    value?: File | {
        [k: string]: any;
    };
    buttonOnly?: boolean;
    onChange?: ChangeFileFunction;
    label?: string;
    className?: string;
    style?: CSSProperties;
    allowType?: Array<string>;
    subTitle?: string;
    /**
    * maxSize unit: kb (kilobytes)
    */
    maxSize?: number;
}
export declare class ImportFile extends React.Component<ImportFileProps, ImportFileState> {
    private fileRef;
    constructor(props: ImportFileProps | Readonly<ImportFileProps>);
    state: Readonly<ImportFileState>;
    showFilePicker(): void;
    componentDidUpdate(prevProps: Readonly<ImportFileProps>, prevState: Readonly<ImportFileState>): void;
    render(): React.JSX.Element;
}
export {};
