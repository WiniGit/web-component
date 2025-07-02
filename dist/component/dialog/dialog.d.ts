import { ReactNode } from 'react';
import { ComponentStatus } from '../../index';
export declare enum DialogAlignment {
    start = "start",
    center = "center",
    end = "end"
}
export declare const Dialog: () => import("react/jsx-runtime").JSX.Element;
export declare const showDialog: (props: {
    title?: string;
    status?: ComponentStatus;
    content?: string | ReactNode;
    onSubmit?: Function;
    onCancel?: Function;
    submitTitle?: string;
    cancelTitle?: string;
    alignment?: DialogAlignment;
}) => void;
//# sourceMappingURL=dialog.d.ts.map