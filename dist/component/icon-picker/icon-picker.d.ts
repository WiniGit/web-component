import { CSSProperties } from 'react';
interface IconPickerProps {
    src?: string;
    style?: CSSProperties;
    onChange?: (src?: string) => void;
    size?: string | number;
    className?: string;
    color?: string;
    tooltip?: {
        message: string;
        position?: "top" | "bottom" | "left" | "right";
    };
}
interface IconPickerRef {
    value?: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    openIconLibrary: (ev?: CSSProperties) => void;
}
export declare const IconPicker: import('react').ForwardRefExoticComponent<IconPickerProps & import('react').RefAttributes<IconPickerRef>>;
export {};
//# sourceMappingURL=icon-picker.d.ts.map