import React from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
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
    onSubmit?: SubmitHandler<FieldValues>;
    title?: string;
    orText?: string;
    buttonLoginLabel?: string;
    loginWithGoogle?: React.MouseEventHandler<HTMLButtonElement>;
    loginWithFacebook: React.MouseEventHandler<HTMLButtonElement>;
    onRegister?: React.MouseEventHandler<HTMLDivElement>;
    registerPrefixText?: string;
    registerText?: string;
    forgotPasswordText?: string;
    onForgotPassword?: React.MouseEventHandler<HTMLDivElement>;
}
export declare function WLoginView(props: Props): React.JSX.Element;
export {};
