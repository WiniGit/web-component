import React, { CSSProperties, ReactNode } from 'react';
import './card.css';
interface cardInfoProps {
    avatar?: ReactNode;
    heading?: ReactNode;
    subHeading?: ReactNode;
    content?: ReactNode;
    action?: ReactNode;
    style?: CSSProperties;
    className?: string;
}
export declare function CardSimple({ avatar, heading, subHeading, content, action, style, className }: cardInfoProps): React.JSX.Element;
export {};
