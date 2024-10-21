import React, { CSSProperties, ReactNode } from 'react';
import './slider.css';
interface SliderProps {
    id?: string;
    children?: Array<ReactNode>;
    autoPlay?: boolean;
    /** default: 2000ms */
    duration?: number;
    className?: string;
    iconSize?: number | string;
    iconColor?: string;
    prevButton?: ReactNode;
    nextButton?: ReactNode;
    style?: CSSProperties;
    buttons?: boolean;
    onChage?: (i: number) => void;
}
interface SliderState {
    page: number;
}
export declare class CustomSlider extends React.Component<SliderProps, SliderState> {
    private intervalPlay;
    constructor(props: SliderProps);
    nextPage: () => void;
    previousPage: () => void;
    private autoPlay;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<SliderProps>, prevState: Readonly<SliderState>): void;
    render(): React.JSX.Element;
}
export {};
