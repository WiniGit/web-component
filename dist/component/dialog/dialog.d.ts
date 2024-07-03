import React from 'react';
import './dialog.css';
import { ComponentStatus } from '../../index';
export declare enum DialogAlignment {
    start = "start",
    center = "center",
    end = "end"
}
interface DialogState {
    readonly open?: boolean;
    title: string;
    status: ComponentStatus;
    content: string;
    onSubmit: Function;
    submitTitle?: string;
    alignment?: DialogAlignment;
}
export declare const showDialog: ({ ref, title, status, content, onSubmit, submitTitle, alignment }: {
    ref: React.MutableRefObject<Dialog>;
    title?: string | undefined;
    status?: ComponentStatus | undefined;
    content?: string | undefined;
    onSubmit?: Function | undefined;
    submitTitle?: string | undefined;
    alignment?: DialogAlignment | undefined;
}) => void;
export declare class Dialog extends React.Component<Object, DialogState> {
    state: Readonly<DialogState>;
    showDialogNoti(data: DialogState): void;
    closeDialog(): void;
    render(): React.JSX.Element;
}
export {};
