import React, { createRef, CSSProperties } from 'react';
import styles from './checkbox.module.css';

interface CheckboxProps {
    id?: string,
    onChange?: (value: boolean, target: HTMLInputElement) => void,
    value?: boolean,
    checkColor?: string,
    disabled?: boolean,
    className?: string,
    style?: CSSProperties,
    /** default 2.4rem **/
    size?: number | string,
    onClick?: React.MouseEventHandler<HTMLLabelElement>
}

interface CheckboxState {
    value?: boolean,
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    private ref = createRef<HTMLLabelElement>()
    constructor(props: CheckboxProps) {
        super(props);
        this.state = {
            value: this.props.value ?? false
        }
    }

    componentDidUpdate(prevProps: Readonly<CheckboxProps>): void {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value })
        }
    }

    onChange = () => {
        const newValue = !this.state.value
        this.setState({ value: newValue })
        if (this.props.onChange && this.ref.current) this.props.onChange(newValue, this.ref.current.querySelector("input")!)
    }

    render() {
        let convertStyle: CSSProperties = {
            width: this.props.size ?? '2.4rem',
            height: this.props.size ?? '2.4rem',
        }
        if (this.props.style) {
            delete this.props.style.width
            delete this.props.style.minWidth
            delete this.props.style.maxWidth
            delete this.props.style.height
            delete this.props.style.minHeight
            delete this.props.style.maxHeight
            convertStyle = {
                ...this.props.style,
                ...convertStyle
            }
        }
        return <label ref={this.ref} id={this.props.id} className={`${styles['checkbox-container']} row ${this.props.className ?? ''}`} style={convertStyle} is-null-value={`${this.state.value == undefined}`} onClick={this.props.onClick}>
            <input type="checkbox" checked={this.state.value ? true : false} disabled={this.props.disabled}
                onChange={(ev) => {
                    ev.stopPropagation()
                    const newValue = !this.state.value
                    this.setState({ value: newValue })
                    if (this.props.onChange) this.props.onChange(newValue, ev.target)
                }}
            />
            <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ '--check-color': this.props.checkColor } as any}>
                {
                    this.state.value === undefined ?
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.79199 9.95298C4.79199 9.69148 5.00398 9.47949 5.26548 9.47949H14.7352C14.9967 9.47949 15.2087 9.69148 15.2087 9.95298C15.2087 10.2145 14.9967 10.4265 14.7352 10.4265H5.26548C5.00398 10.4265 4.79199 10.2145 4.79199 9.95298Z" /> :
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.07 6.49317C15.2549 6.67808 15.2549 6.97787 15.07 7.16278L8.91467 13.3181C8.72977 13.503 8.42997 13.503 8.24507 13.3181L4.93067 10.0037C4.74577 9.81878 4.74577 9.51899 4.93067 9.33408C5.11558 9.14917 5.41537 9.14917 5.60028 9.33408L8.57987 12.3137L14.4004 6.49317C14.5853 6.30827 14.8851 6.30827 15.07 6.49317Z" />
                }
            </svg>
        </label>
    }
}



