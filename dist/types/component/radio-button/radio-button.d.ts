import { default as React, CSSProperties } from 'react';
import { UseFormRegister } from 'react-hook-form';
interface RadioButtonProps {
    id?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string | number | readonly string[];
    disabled?: boolean;
    style?: CSSProperties;
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
//# sourceMappingURL=radio-button.d.ts.map