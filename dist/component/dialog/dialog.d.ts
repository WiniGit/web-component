import React from 'react';
import { ComponentStatus } from '../../index';
export declare enum DialogAlignment {
    start = "start",
    center = "center",
    end = "end"
}
export declare const Dialog: () => React.JSX.Element;
export declare const showDialog: (props: {
    title?: string;
    status?: ComponentStatus;
    content?: string;
    onSubmit?: Function;
    submitTitle?: string;
    cancelTitle?: string;
    alignment?: DialogAlignment;
}) => void;
