import { CSSProperties } from 'react';
interface SwitchProps {
    id?: string;
    onChange?: (value: boolean, target: HTMLInputElement) => void;
    value?: boolean;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    size?: number | string;
    dotColor?: string;
    onBackground?: string;
    offBackground?: string;
    name?: string;
    label?: string;
}
export declare const Switch: (props: SwitchProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=switch.d.ts.map