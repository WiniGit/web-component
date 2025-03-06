import { default as React, CSSProperties, ReactNode } from 'react';
interface CarouselProps {
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
    animation?: "scaleOut" | "cubeAnimation" | "foldOut" | "fall";
}
interface SliderState {
    page: number;
}
export declare class Carousel extends React.Component<CarouselProps, SliderState> {
    private intervalPlay;
    constructor(props: CarouselProps);
    nextPage: () => void;
    previousPage: () => void;
    private autoPlay;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<CarouselProps>): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
//# sourceMappingURL=carousel.d.ts.map