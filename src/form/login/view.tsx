import React, { CSSProperties } from 'react'
import { Button, Text, TextField, Winicon } from '../../index'
import styles from './view.module.css'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'

interface Props {
    logo: React.ReactNode | string,
    formData: {
        "username": { label: string, name: string, prefix?: React.ReactNode, onValidate?: React.FocusEventHandler<HTMLInputElement>, maxLength?: number },
        "password": { label: string, name: string, prefix?: React.ReactNode, onValidate?: React.FocusEventHandler<HTMLInputElement>, maxLength?: number },
    },
    onSubmit?: SubmitHandler<FieldValues>,
    title?: string,
    orText?: string,
    buttonLoginLabel?: string,
    loginWithGoogle?: React.MouseEventHandler<HTMLButtonElement>,
    loginWithFacebook?: React.MouseEventHandler<HTMLButtonElement>,
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

    return <div id={props.id} className={`col login-view-container ${styles['login-view-container']} ${props.className ?? ''}`} style={props.style}>
        {typeof props.logo === "string" ? <img alt='logo' src={props.logo} height={"36rem"} /> : props.logo}
        <div className={`col login-view-form-container ${styles['login-view-form-container']}`}>
            <Text className='heading-4'>{props.title ?? "Log in to Wini"}</Text>
            <div className='col'>
                <div className='col' style={{ gap: "0.8rem" }}>
                    <Text className='label-3'>Email</Text>
                    <TextField
                        className="placeholder-2"
                        placeholder={props.formData.username.label}
                        style={{ height: "4.8rem" }}
                        prefix={props.formData.username.prefix}
                        name={props.formData.username.name}
                        register={methods.register(props.formData.username.name, {
                            onChange: (ev) => { ev.target.value = ev.target.value.trim() },
                            onBlur: props.formData.username.onValidate
                        }) as any}
                        onComplete={(ev: any) => { ev.target.blur() }}
                        helperText={methods.formState.errors?.[props.formData.username.name]?.message as any}
                    />
                </div>
                <div className='col' style={{ gap: "0.8rem" }}>
                    <Text className='label-3'>Email</Text>
                    <TextField
                        className="placeholder-2"
                        placeholder={props.formData.password.label}
                        style={{ height: "4.8rem" }}
                        prefix={props.formData.password.prefix}
                        suffix={<button type='button' onClick={() => { setShowPass(!isShowPass) }}><Winicon src={`outline/user interface/${isShowPass ? "view" : "hide"}`} size={"1.6rem"} /></button>}
                        name={props.formData.password.name}
                        type={isShowPass ? "text" : "password"}
                        register={methods.register(props.formData.password.name, {
                            onChange: (ev) => { ev.target.value = ev.target.value.trim() },
                            onBlur: props.formData.password.onValidate
                        }) as any}
                        onComplete={(ev: any) => {
                            if (methods.watch(props.formData.password.name)?.length) {
                                ev.target.blur()
                                if (!props.formData.password.onValidate && props.onSubmit) props.onSubmit(methods.getValues())
                            } else ev.target.blur()
                        }}
                        helperText={methods.formState.errors?.[props.formData.password.name]?.message as any}
                    />
                </div>
                <Text className={`button-text-3 ${styles['forgot-password-btn']}`} onClick={props.onForgotPassword}>{props.forgotPasswordText ?? "Forgot your password?"}</Text>
                <div className='col' style={{ gap: "1.6rem" }}>
                    <Button
                        disabled={methods.watch(props.formData.username.name)?.length && methods.watch(props.formData.password.name)?.length ? false : true}
                        className={`button-text-1 ${styles['login-btn']}`}
                        onClick={props.onSubmit && methods.handleSubmit(props.onSubmit)}
                        label={props.buttonLoginLabel ?? "Log In"}
                    />
                    <div className='row' style={{ justifyContent: "center", gap: "0.4rem" }}>
                        <Text className='label-4'>{props.registerPrefixText ?? "Don't have an account?"}</Text>
                        <Text className={`button-text-3 ${styles['register-btn']}`} onClick={props.onRegister}>{props.registerText ?? "Sign up for Wini"}</Text>
                    </div>
                </div>
                <div className={`row ${styles['or-spacing']}`}>
                    <div />
                    <Text className="label-4">{props.orText ?? "Or"}</Text>
                    <div />
                </div>
                <div className={`row ${styles['login-social-media']}`}>
                    <Button
                        className={`label-1`}
                        onClick={props.loginWithGoogle}
                        prefix={<Winicon src='color/social media/google' size={"2rem"} />}
                        label="Google"
                    />
                    <Button
                        className={`label-1`}
                        onClick={props.loginWithFacebook}
                        prefix={<Winicon src='color/social media/logo-facebook' size={"2rem"} />}
                        label="Facebook"
                    />
                </div>
            </div>
        </div>
    </div>
}