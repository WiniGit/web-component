import { CSSProperties } from 'react';
interface SliderProps {
    formatter?: (value: number) => string;
    style?: CSSProperties;
    className?: string;
    min?: number;
    max?: number;
    /**
     * Dual thumb mode
     * */
    range?: boolean;
    /**
     * The default value of slider. When range is false, use number, otherwise, use [number, number]
     * */
    defaultValue?: number | [number, number];
    /**
     * Reverse the component
     * */
    disabled?: boolean;
    /**
     * default value: 6px
     * */
    rangeBarWidth?: number | string;
    marks?: Array<{
        value: number;
        label?: string;
    }>;
    tooltip?: boolean;
    step?: number;
    onChange?: (value: number | [number, number]) => void;
    onChangeComplete?: (value: number | [number, number]) => void;
}
export declare function Slider({ min, max, formatter, className, rangeBarWidth, defaultValue, disabled, marks, onChange, onChangeComplete, range, step, style, tooltip }: SliderProps): import("react/jsx-runtime").JSX.Element;
export declare const TooltipElement: ({ rect, tooltip }: {
    rect: any;
    tooltip: {
        message: string;
        position?: "top" | "bottom" | "left" | "right";
    };
}) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=slider.d.ts.map