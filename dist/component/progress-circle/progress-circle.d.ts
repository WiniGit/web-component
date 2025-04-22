import { CSSProperties } from 'react';
interface ProgressCircleProps {
    id?: string;
    /** value:  0 - 100 (%)*/
    percent?: number;
    size?: string | number;
    style?: CSSProperties;
    className?: string;
    fillColor?: string;
    percentColor?: string;
    strokeWidth?: number;
    strokeColor?: string;
    textStyle?: CSSProperties;
    title?: string;
}
export declare function ProgressCircle({ strokeWidth, percent, style, textStyle, ...props }: ProgressCircleProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=progress-circle.d.ts.map