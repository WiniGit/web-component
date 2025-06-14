import { CSSProperties } from 'react';
interface IconPickerProps {
    src?: string;
    style?: CSSProperties;
    onChange?: (src?: string) => void;
    size?: string | number;
    className?: string;
    color?: string;
    tooltip?: {
        message: string;
        position?: "top" | "bottom" | "left" | "right";
    };
}
export declare const IconPicker: (props: IconPickerProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=icon-picker.d.ts.map