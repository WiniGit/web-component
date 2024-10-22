import React, { CSSProperties } from 'react';
import './card-info.css';
interface CardData {
    Name: string;
    Image: string;
    Subtitle: string;
    DateCreated: string;
    Content: string;
    style?: CSSProperties;
    className?: string;
    direction?: "col" | "row";
    mediaType?: "contain" | "cover" | "hug";
}
export declare function CardInfo({ Name, Subtitle, Image, Content, className, style, direction }: CardData): React.JSX.Element;
export {};
