import { CSSProperties } from 'react';
import { ClassicEditor, EventInfo } from 'ckeditor5';
/**
 * Please update the following values with your tokens.
 * Instructions on how to obtain them: https://ckeditor.com/docs/trial/latest/guides/real-time/quick-start.html
 */
interface Props {
    id?: string;
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
    helperText?: string;
    helperTextColor?: string;
    customConfig?: {
        toolbar: {
            item?: Array<string>;
            shouldNotGroupWhenFull?: boolean;
            [p: string]: any;
        };
        balloonToolbar?: Array<string>;
        mediaEmbed?: {
            previewsInData?: boolean;
            providers?: Array<{
                [p: string]: any;
            }>;
            [p: string]: any;
        };
        fontFamily?: {
            options?: Array<string>;
            supportAllValues?: boolean;
        };
        fontSize?: {
            options?: Array<string>;
            supportAllValues?: boolean;
        };
        fontColor?: {
            columns?: number;
            colors?: Array<{
                color: string;
                label: string;
            }>;
        };
        fontBackgroundColor?: {
            columns?: number;
            colors?: Array<{
                color: string;
                label: string;
            }>;
        };
        [p: string]: any;
    };
}
export declare function CustomCkEditor5({ style, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ckeditor.d.ts.map