import { CSSProperties } from 'react';
interface ColorPickerProps {
    id?: string;
    value?: string;
    type?: "input" | "select";
    onChange?: (v: string) => void;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    /**
     * default: size40: body-3
     * recommend: size48: body-3 | size32: body-3 | size24: body-3
     *  */
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    style?: CSSProperties;
    simpleStyle?: boolean;
}
export declare const ColorPicker: ({ style, type, ...props }: ColorPickerProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=color-picker.d.ts.map