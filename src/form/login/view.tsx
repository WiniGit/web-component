import React, { CSSProperties } from 'react'
import { Button, Text, TextField, Winicon } from '../../index'
import styles from './view.module.css'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    logo: React.ReactNode | string,
    formData: {
        "username": { label: string, name: string, prefix?: React.ReactNode, onValidate?: React.FocusEventHandler<HTMLInputElement>, maxLength?: number },
        "password": { label: string, name: string, prefix?: React.ReactNode, onValidate?: React.FocusEventHandler<HTMLInputElement>, maxLength?: number },
    },
    onSubmit?: (data: FieldValues, methods?: UseFormReturn<any>) => void,
    title?: string,
    orText?: string,
    methods?: UseFormReturn<any>,
    buttonLoginLabel?: string,
    loginWithGoogle?: React.MouseEventHandler<HTMLButtonElement>,
    loginWithFacebook?: React.MouseEventHandler<HTMLButtonElement>,
    loginWithApple?: React.MouseEventHandler<HTMLButtonElement>,
    loginWithMicrosoft?: React.MouseEventHandler<HTMLButtonElement>,
    onRegister?: React.MouseEventHandler<HTMLDivElement>,
    registerPrefixText?: string,
    registerText?: string,
    forgotPasswordText?: string,
    onForgotPassword?: React.MouseEventHandler<HTMLDivElement>,
    style?: CSSProperties,
    className?: string,
    id?: string
}

export function WLoginView(props: Props) {
    const methods = useForm<any>({ shouldFocusError: false })
    const [isShowPass, setShowPass] = useState(false)
    const { t } = useTranslation()

    const _onSubmit = (ev: FieldValues) => {
        if (props.onSubmit) props.onSubmit(ev, methods)
    }

    return <form id={props.id} className={`col login-view-container ${styles['login-view-container']} ${props.className ?? ''}`} style={props.style}>
        {typeof props.logo === "string" ? <img alt='logo' src={props.logo} height={"36rem"} /> : props.logo}
        <div className={`col login-view-form-container ${styles['login-view-form-container']}`}>
            <Text className='heading-4'>{props.title ?? `${t("loginTo")} Wini`}</Text>
            <div className='col'>
                <div className='col' style={{ gap: "0.8rem", overflow: "visible" }}>
                    <Text className='label-3'>{props.formData.username.label ?? t("username")}</Text>
                    <TextField
                        autoComplete='username'
                        className="placeholder-2"
                        placeholder={props.formData.username.label}
                        style={{ height: "4.8rem" }}
                        prefix={props.formData.username.prefix}
                        register={(props.methods ?? methods).register(props.formData.username.name, {
                            onChange: (ev) => { ev.target.value = ev.target.value.trim() },
                            onBlur: props.formData.username.onValidate
                        }) as any}
                        onComplete={(ev: any) => { ev.target.blur() }}
                        helperText={(props.methods ?? methods).formState.errors?.[props.formData.username.name]?.message as any}
                    />
                </div>
                <div className='col' style={{ gap: "0.8rem", overflow: "visible" }}>
                    <Text className='label-3'>{props.formData.password.label ?? t("password")}</Text>
                    <TextField
                        autoComplete='current-password'
                        className="placeholder-2"
                        placeholder={props.formData.password.label}
                        style={{ height: "4.8rem" }}
                        prefix={props.formData.password.prefix}
                        suffix={<button type='button' onClick={() => { setShowPass(!isShowPass) }}><Winicon src={`outline/user interface/${isShowPass ? "view" : "hide"}`} size={"1.6rem"} /></button>}
                        type={isShowPass ? "text" : "password"}
                        register={(props.methods ?? methods).register(props.formData.password.name, {
                            onChange: (ev) => { ev.target.value = ev.target.value.trim() },
                            onBlur: props.formData.password.onValidate
                        }) as any}
                        onComplete={(ev: any) => {
                            if ((props.methods ?? methods).watch(props.formData.password.name)?.length) {
                                ev.target.blur()
                                if (!props.formData.password.onValidate && props.onSubmit) _onSubmit((props.methods ?? methods).getValues())
                            } else ev.target.blur()
                        }}
                        helperText={(props.methods ?? methods).formState.errors?.[props.formData.password.name]?.message as any}
                    />
                </div>
                <Text className={`button-text-3 ${styles['forgot-password-btn']}`} onClick={props.onForgotPassword}>{props.forgotPasswordText ?? t("forgotPassword")}</Text>
                <div className='col' style={{ gap: "1.6rem" }}>
                    <Button
                        disabled={(props.methods ?? methods).watch(props.formData.username.name)?.length && (props.methods ?? methods).watch(props.formData.password.name)?.length ? false : true}
                        className={`button-text-1 ${styles['login-btn']}`}
                        onClick={props.onSubmit && (props.methods ?? methods).handleSubmit(_onSubmit)}
                        label={props.buttonLoginLabel ?? t("login")}
                    />
                    <div className='row' style={{ justifyContent: "center", gap: 4 }}>
                        <Text className='label-4'>{props.registerPrefixText ?? t("dontHaveAccount")}</Text>
                        <Text className={`button-text-3 ${styles['register-btn']}`} onClick={props.onRegister}>{props.registerText ?? `${t("signupFor")} Wini`}</Text>
                    </div>
                </div>
                {(props.loginWithGoogle || props.loginWithFacebook || props.loginWithApple || props.loginWithMicrosoft) ?
                    <>
                        <div className={`row ${styles['or-spacing']}`}>
                            <div />
                            <Text className="label-4">{props.orText ?? t("or")}</Text>
                            <div />
                        </div>
                        <div className={`row ${styles['login-social-media']}`}>
                            {props.loginWithGoogle && <Button
                                className={`label-1`}
                                onClick={props.loginWithGoogle}
                                prefix={<Winicon src='color/social media/google' size={"2rem"} />}
                                label="Google"
                            />}
                            {props.loginWithFacebook && <Button
                                className={`label-1`}
                                onClick={props.loginWithFacebook}
                                prefix={<Winicon src='color/social media/logo-facebook' size={"2rem"} />}
                                label="Facebook"
                            />}
                            {props.loginWithApple && <Button
                                className={`label-1`}
                                onClick={props.loginWithApple}
                                prefix={<Winicon src='color/development/apple' size={"2rem"} />}
                                label="Apple"
                            />}
                            {props.loginWithMicrosoft && <Button
                                className={`label-1`}
                                onClick={props.loginWithMicrosoft}
                                prefix={<Winicon src='color/development/microsoft' size={"2rem"} />}
                                label="Microsoft"
                            />}
                        </div>
                    </> : null}
            </div>
        </div>
    </form>
}