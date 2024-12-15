import React from 'react';
import { ComponentStatus } from '../../index';
import { WithTranslation } from 'react-i18next';
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
    cancelTitle?: string;
    alignment?: DialogAlignment;
}
export declare const showDialog: ({ ref, title, status, content, onSubmit, submitTitle, cancelTitle, alignment }: {
    ref: React.MutableRefObject<TDialog>;
    title?: string | undefined;
    status?: ComponentStatus | undefined;
    content?: string | undefined;
    onSubmit?: Function | undefined;
    submitTitle?: string | undefined;
    cancelTitle?: string | undefined;
    alignment?: DialogAlignment | undefined;
}) => void;
declare class TDialog extends React.Component<WithTranslation, DialogState> {
    constructor(props: WithTranslation);
    showDialogNoti(data: DialogState): void;
    closeDialog(): void;
    render(): React.JSX.Element;
}
export declare const Dialog: React.ComponentType<Omit<import("react-i18next/helpers").$Subtract<WithTranslation<undefined, undefined>, import("react-i18next").WithTranslationProps>, keyof WithTranslation<Ns, undefined>> & import("react-i18next").WithTranslationProps>;
export {};
