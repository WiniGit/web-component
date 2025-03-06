import { default as React, CSSProperties } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
interface Props {
    logo: React.ReactNode | string;
    formData: {
        "username": {
            label: string;
            name: string;
            prefix?: React.ReactNode;
            onValidate?: React.FocusEventHandler<HTMLInputElement>;
            maxLength?: number;
        };
        "password": {
            label: string;
            name: string;
            prefix?: React.ReactNode;
            onValidate?: React.FocusEventHandler<HTMLInputElement>;
            maxLength?: number;
        };
    };
    onSubmit?: (data: FieldValues, methods?: UseFormReturn<any>) => void;
    title?: string;
    orText?: string;
    methods?: UseFormReturn<any>;
    buttonLoginLabel?: string;
    loginWithGoogle?: React.MouseEventHandler<HTMLButtonElement>;
    loginWithFacebook?: React.MouseEventHandler<HTMLButtonElement>;
    loginWithApple?: React.MouseEventHandler<HTMLButtonElement>;
    loginWithMicrosoft?: React.MouseEventHandler<HTMLButtonElement>;
    onRegister?: React.MouseEventHandler<HTMLDivElement>;
    registerPrefixText?: string;
    registerText?: string;
    forgotPasswordText?: string;
    onForgotPassword?: React.MouseEventHandler<HTMLDivElement>;
    style?: CSSProperties;
    className?: string;
    id?: string;
}
export declare function WLoginView(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=view.d.ts.map