import React, { CSSProperties } from 'react';
import styles from './switch.module.css';

interface SwitchProps {
    id?: string,
    onChange?: (value: boolean) => void,
    value?: boolean,
    disabled?: boolean,
    className?: string,
    style?: CSSProperties,
    size?: number | string,
    dotColor?: string,
    onBackground?: string,
    offBackground?: string,
    name?: string,
}

interface SwitchState {
    value?: boolean,
}

export class Switch extends React.Component<SwitchProps, SwitchState> {
    state: Readonly<SwitchState> = {
        value: this.props.value ?? false
    }

    componentDidUpdate(prevProps: Readonly<SwitchProps>): void {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value })
        }
    }

    render() {
        const propStyle = {
            '--off-bg': this.props.offBackground ?? 'var(--neutral-main-background-color)',
            '--on-bg': this.props.onBackground ?? 'var(--primary-main-color)',
            '--dot-color': this.props.dotColor ?? '#ffffff',
            '--size': this.props.size ? (typeof this.props.size === 'number') ? `${this.props.size}px` : this.props.size : '2rem'
        }
        let convertStyle: CSSProperties = {
            height: this.props.size ?? '2rem',
            width: `calc(${this.props.size ? (typeof this.props.size === 'number') ? `${this.props.size}px` : this.props.size : '2rem'} * 9 / 5)`,
            ...propStyle
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
                ...convertStyle,
            }
        }
        return <label id={this.props.id} className={`${styles['switch-container']} row ${this.props.className ?? ''}`} style={convertStyle} >
            <input type="checkbox" checked={this.state.value} name={this.props.name} disabled={this.props.disabled}
                onChange={() => {
                    const newValue = !this.state.value
                    this.setState({ value: newValue })
                    if (this.props.onChange) this.props.onChange(newValue)
                }}
            />
            <span className={styles['slider']}></span>
        </label>
    }
}