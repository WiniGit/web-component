import { CSSProperties, ReactNode } from 'react';
import './progress-bar.css';
import React from 'react';
import { ComponentStatus } from '../../index';
export declare function ProgressBar({ status, percent, titleText, title, hideTitle, progressBarOnly, fullColor, percentColor, style, progressBarStyle }: {
    percent: number;
    titleText?: string;
    title?: ReactNode;
    hideTitle: boolean;
    progressBarOnly: boolean;
    fullColor: string;
    percentColor: string;
    style?: CSSProperties;
    status: ComponentStatus;
    progressBarStyle?: CSSProperties;
}): React.JSX.Element;