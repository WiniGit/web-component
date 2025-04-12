import React, { createRef, CSSProperties, ReactNode } from "react";
import styles from './text-area.module.css'
import { UseFormRegister } from "react-hook-form";

interface TextAreaProps {
    id?: string,
    value?: string,
    maxLength?: number,
    defaultValue?: string,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>,
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>,
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>,
    placeholder?: string,
    disabled?: boolean,
    readOnly?: boolean,
    autoFocus?: boolean,
    className?: string,
    helperText?: string,
    name?: string,
    helperTextColor?: string,
    style?: CSSProperties,
    register?: UseFormRegister<{}>,
    simpleStyle?: boolean,
    suffix?: ReactNode,
    prefix?: ReactNode,
}

export class TextArea extends React.Component<TextAreaProps> {
    private containerRef = createRef<HTMLLabelElement>()

    getTextarea = () => {
        return this.containerRef.current?.querySelector("textarea")
    }

    render(): React.ReactNode {
        const _style = this.props.style ?? {}
        return <label
            id={this.props.id}
            ref={this.containerRef}
            className={`${this.props.simpleStyle ? styles['simple-text-area'] : styles['text-area-container']} row ${this.props.className ?? (this.props.simpleStyle ? "" : 'body-3')} ${this.props.helperText?.length ? styles['helper-text'] : ""}`}
            helper-text={this.props.helperText}
            style={{ '--helper-text-color': this.props.helperTextColor ?? '#e14337', ..._style } as CSSProperties}
        >
            {this.props.prefix}
            {this.props.register ?
                <textarea
                    name={this.props.name}
                    autoFocus={this.props.autoFocus}
                    {...this.props.register}
                    maxLength={this.props.maxLength}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
                    onFocus={this.props.onFocus}
                /> : <textarea
                    autoFocus={this.props.autoFocus}
                    maxLength={this.props.maxLength}
                    name={this.props.name}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                />}
            {this.props.suffix}
        </label>
    }
}