import React, { CSSProperties, ReactNode } from 'react';
import { ComponentStatus } from '../component-status';
interface TagProps {
    id?: string;
    title: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    disabled?: boolean;
    style?: CSSProperties;
    /**
     * default: size24: button-text-6 \
     * recommend: size24: button-text-6 | size32: button-text-4 \
     * status tag: tag-primary | tag-infor | tag-warning | tag-error | tag-success | tag-grey | tag-neutral | tag-infor-main | tag-warning-main | tag-error-main | tag-success-main
     * */
    className?: string;
    status?: ComponentStatus;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export declare class Tag extends React.Component<TagProps> {
    render(): React.JSX.Element;
}
export {};
