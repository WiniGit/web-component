import { default as React, CSSProperties, ReactNode } from 'react';
interface TextProps {
    id?: string;
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
    maxLine?: number;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onHover?: React.MouseEventHandler<HTMLDivElement>;
    html?: string;
}
export declare class Text extends React.Component<TextProps> {
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=text.d.ts.map