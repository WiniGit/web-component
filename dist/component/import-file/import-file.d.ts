import React, { CSSProperties } from 'react';
import './import-file.css';
import { ComponentStatus } from '../component-status';
interface ObjWithKnownKeys {
    [k: string]: any;
}
interface ImportFileState {
    status?: ComponentStatus;
    preview: File | ObjWithKnownKeys | undefined | null;
}
type ChangeFileFunction = (a?: File) => void;
interface ImportFileProps {
    id?: string;
    status?: ComponentStatus;
    value?: File | ObjWithKnownKeys;
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
