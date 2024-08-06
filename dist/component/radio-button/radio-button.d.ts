import React, { CSSProperties } from 'react';
import './radio-button.css';
import { UseFormRegister } from 'react-hook-form';
interface RadioButtonProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string | number | readonly string[];
    disabled?: boolean;
    style: CSSProperties;
    size?: number | string;
    defaultChecked?: boolean;
    name?: string;
    activeColor?: string;
    offColor?: string;
    className?: string;
    register?: UseFormRegister<{}>;
}
export declare class RadioButton extends React.Component<RadioButtonProps> {
    render(): React.ReactNode;
}
export {};
