import React, { CSSProperties } from 'react';
import styles from './radio-button.module.css';
import { UseFormRegister } from 'react-hook-form';

interface RadioButtonProps {
    id?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    value?: string | number | readonly string[],
    disabled?: boolean,
    style?: CSSProperties,
    size?: number | string,
    defaultChecked?: boolean,
    name?: string,
    activeColor?: string,
    offColor?: string,
    className?: string,
    register?: UseFormRegister<{}>,
}


export class RadioButton extends React.Component<RadioButtonProps> {
    render(): React.ReactNode {
        let convertStyle: CSSProperties = {
            '--off-color': this.props.offColor ?? 'var(--neutral-bolder-border-color)',
            '--active-color': this.props.activeColor ?? 'var(--primary-main-color)',
            '--size': this.props.size ? (typeof this.props.size === 'number') ? `${this.props.size}px` : this.props.size : '20px'
        } as CSSProperties
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

        return <label id={this.props.id} className={`row ${styles['radio-btn-container']} ${this.props.className ?? ''}`} style={convertStyle} >
            {this.props.register ?
                <input
                    {...this.props.register}
                    type="radio"
                    value={this.props.value}
                    disabled={this.props.disabled}
                /> :
                <input type="radio"
                    name={this.props.name}
                    value={this.props.value}
                    defaultChecked={this.props.defaultChecked}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                />
            }
            <span className={styles['checkmark']}></span>
        </label>
    }
}