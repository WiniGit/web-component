import { CSSProperties } from 'react';
import './progress-circle.css';
import React from 'react';
export declare function ProgressCircle({ id, percent, style, fillColor, percentColor, strokeWidth, strokeColor, textStyle }: {
    id?: string;
    /** value:  0 - 100 (%)*/
    percent?: number;
    style?: CSSProperties;
    fillColor?: string;
    percentColor?: string;
    strokeWidth?: number;
    strokeColor?: string;
    textStyle?: CSSProperties;
}): React.JSX.Element;
