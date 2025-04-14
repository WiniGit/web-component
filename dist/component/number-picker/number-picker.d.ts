import { CSSProperties } from 'react';
interface Props {
    id?: string;
    value?: number;
    onChange?: (ev: number) => void;
    disabled?: boolean;
    readOnly?: boolean;
    /**
     * default: size32: body-3 \
     * recommend: size40: body-2 | size24: body-3
     * */
    className?: string;
    helperText?: string;
    helperTextColor?: string;
    /** default: 1 */
    volume?: number;
    style?: CSSProperties;
    iconColor?: string;
    min?: number;
    max?: number;
    type?: "outline" | "icon-button";
    simpleStyle?: boolean;
}
export declare const NumberPicker: ({ type, volume, style, ...props }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=number-picker.d.ts.map