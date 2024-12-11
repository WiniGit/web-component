import { CSSProperties } from 'react';
import './progress-circle.css';
import React from 'react';
export declare function ProgressCircle(props: {
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
