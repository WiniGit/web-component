import { CSSProperties } from 'react';
import { ClassicEditor, EventInfo } from 'ckeditor5';
/**
 * Please update the following values with your tokens.
 * Instructions on how to obtain them: https://ckeditor.com/docs/trial/latest/guides/real-time/quick-start.html
 */
interface Props {
    style?: CSSProperties;
    className?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    menuBar?: boolean;
    onChange?: (event: EventInfo, editor: ClassicEditor) => void;
    onFocus?: (event: EventInfo, editor: ClassicEditor) => void;
    onBlur?: (event: EventInfo, editor: ClassicEditor) => void;
    onError?: (error: Error, details: any) => void;
    onReady?: (editor: ClassicEditor) => void;
    onAfterDestroy?: (editor: ClassicEditor) => void;
    extraPlugins?: Array<any>;
    fontFamily?: Array<string>;
    fontSize?: Array<number | "default">;
    fontColors?: Array<{
        color: string;
        label: string;
    }>;
    fontBgColors?: Array<{
        color: string;
        label: string;
    }>;
    helperText?: string;
    helperTextColor?: string;
    customConfig?: {
        [p: string]: any;
    };
}
export declare function CustomCkEditor5(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ckeditor.d.ts.map