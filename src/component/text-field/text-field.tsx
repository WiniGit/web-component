import React, { createRef, CSSProperties, ReactNode } from "react";
import styles from './text-field.module.css'
import { UseFormRegister } from "react-hook-form";

interface TextFieldProps {
    id?: string,
    value?: string,
    maxLength?: number,
    defaultValue?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onComplete?: React.KeyboardEventHandler<HTMLInputElement>,
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>,
    onFocus?: React.FocusEventHandler<HTMLInputElement>,
    placeholder?: string,
    disabled?: boolean,
    readOnly?: boolean,
    /** 
     * default: size40: body-3
     * recommend: size48: body-3 | size32: body-3 | size24: body-3
     *  */
    className?: string,
    helperText?: string,
    name?: string,
    suffix?: ReactNode,
    prefix?: ReactNode,
    helperTextColor?: string,
    style?: CSSProperties,
    type?: React.HTMLInputTypeAttribute,
    autoFocus?: boolean,
    autoComplete?: React.HTMLInputAutoCompleteAttribute,
    register?: UseFormRegister<{}>,
    simpleStyle?: boolean
}

export class TextField extends React.Component<TextFieldProps> {
    private containerRef = createRef<HTMLLabelElement>()

    getInput = () => {
        return this.containerRef.current?.querySelector("input")
    }

    render(): React.ReactNode {
        const _style = this.props.style ?? {}
        return <label
            id={this.props.id}
            ref={this.containerRef}
            className={`${this.props.simpleStyle ? styles['simple-text-field'] : styles['text-field-container']} row ${this.props.className ?? (this.props.simpleStyle ? "" : 'body-3')} ${this.props.helperText?.length ? styles['helper-text'] : ""}`}
            helper-text={this.props.helperText}
            style={{ '--helper-text-color': this.props.helperTextColor ?? '#e14337', ..._style } as CSSProperties}
        >
            {this.props.prefix}
            {this.props.register ?
                <input
                    name={this.props.name}
                    {...this.props.register}
                    autoComplete={this.props.autoComplete}
                    autoFocus={this.props.autoFocus}
                    maxLength={this.props.maxLength}
                    type={this.props.type ?? 'text'}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
                    onFocus={this.props.onFocus}
                    onKeyDown={this.props.onKeyDown ?? (this.props.onComplete ? (ev) => {
                        if (this.props.onComplete) {
                            switch (ev.key.toLowerCase()) {
                                case "enter":
                                    this.props.onComplete(ev)
                                    break;
                                default:
                                    break;
                            }
                        }
                    } : undefined)}
                /> : <input
                    autoComplete={this.props.autoComplete}
                    autoFocus={this.props.autoFocus}
                    maxLength={this.props.maxLength}
                    name={this.props.name}
                    type={this.props.type ?? 'text'}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    onKeyDown={this.props.onKeyDown ?? (this.props.onComplete ? (ev) => {
                        if (this.props.onComplete) {
                            switch (ev.key.toLowerCase()) {
                                case "enter":
                                    this.props.onComplete(ev)
                                    break;
                                default:
                                    break;
                            }
                        }
                    } : undefined)}
                />}
            {this.props.suffix}
        </label>
    }
}