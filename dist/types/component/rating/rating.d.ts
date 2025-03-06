import { default as React, CSSProperties } from 'react';
interface RatingProps {
    id?: string;
    /**
    value: 0-5
    */
    value?: number;
    size?: number | string;
    onChange?: (e: number) => void;
    className?: string;
    style?: CSSProperties;
    strokeColor?: string;
    fillColor?: string;
}
interface RatingState {
    value: number;
}
export declare class Rating extends React.Component<RatingProps, RatingState> {
    state: Readonly<RatingState>;
    componentDidUpdate(prevProps: Readonly<RatingProps>): void;
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=rating.d.ts.map