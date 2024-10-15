import { faCaretDown, faCaretRight, faChevronDown, faChevronUp, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { createRef, CSSProperties, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import './select1.css'
import { Text } from '../text/text'

export interface OptionsItem {
    id: string | number,
    parentId?: string,
    name: string | ReactNode,
    title?: string | ReactNode,
    disabled?: boolean
}

interface Select1Props {
    id?: string,
    value?: string | number,
    options: Required<Array<OptionsItem>>,
    onChange?: (v?: OptionsItem) => void,
    placeholder?: string,
    disabled?: boolean,
    className?: string,
    helperText?: string,
    helperTextColor?: string,
    style?: CSSProperties,
    handleSearch?: (e: string) => Promise<Array<OptionsItem>>,
    showClearValueButton?: boolean,
    readOnly?: boolean,
    popupClassName?: string
}

interface Select1State {
    value?: string | number,
    options: Required<Array<OptionsItem>>,
    offset: DOMRect,
    isOpen: boolean,
    onSelect: any,
    selected?: string | number,
    search?: Array<OptionsItem>,
    style?: Object
};

export class Select1 extends React.Component<Select1Props, Select1State> {
    private containerRef = createRef<HTMLDivElement>()
    private inputRef = createRef<HTMLInputElement>()
    constructor(props: Select1Props) {
        super(props)
        this.state = {
            value: props.value,
            options: props.options,
            offset: {
                x: 0,
                y: 0,
                height: 0,
                width: 0,
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                toJSON: function () {
                    throw new Error('Function not implemented.')
                }
            },
            isOpen: false,
            onSelect: null,
        }
        this.search = this.search.bind(this)
        if (this.inputRef.current) this.inputRef.current.value = `${this.state.options.find(e => e.id === this.state.value)?.name ?? ""}`
    }

    private async search(ev: React.ChangeEvent<HTMLInputElement>) {
        if (ev.target.value.trim().length) {
            if (this.props?.handleSearch) {
                const res = await this.props.handleSearch(ev.target.value.trim())
                this.setState({ ...this.state, search: res })
            } else {
                this.setState({
                    ...this.state,
                    search: this.props.options.filter(e => typeof e.name === "string" && e.name.toLowerCase().includes(ev.target.value.trim().toLowerCase()))
                })
            }
        } else {
            this.setState({ ...this.state, search: undefined })
        }
    }

    private onSelect(item: OptionsItem) {
        if (item.disabled) {
            this.setState({ ...this.state, isOpen: false, onSelect: undefined, selected: undefined })
            this.inputRef.current?.blur()
        } else {
            this.setState({ ...this.state, isOpen: false, value: item.id, onSelect: undefined, selected: undefined })
            this.inputRef.current?.blur()
        }
        if (this.props.onChange) this.props.onChange(item)
    }

    private renderOptions(item: OptionsItem) {
        let children: Array<OptionsItem> = []
        if (!item.parentId) children = (this.state.search ?? this.state.options).filter(e => e.parentId === item.id)
        // 
        return <div key={item.id} className='col' style={{ width: '100%' }}>
            <div className={`select-tile row ${item.disabled ? "disabled" : ""}`} style={{ paddingLeft: item.parentId ? '4.4rem' : undefined, backgroundColor: this.state.selected === item.id ? "var(--selected-background)" : undefined }} onClick={children.length ? () => {
                if (this.state.search) {
                    this.setState({
                        ...this.state, search: this.state.search.map(e => {
                            if (e.id === item.id) return { ...e, isOpen: !(item as any).isOpen } as any
                            else return e
                        })
                    })
                } else {
                    this.setState({
                        ...this.state, options: this.state.options.map(e => {
                            if (e.id === item.id) return { ...e, isOpen: !(item as any).isOpen } as any
                            else return e
                        })
                    })
                }
            } : () => {
                this.onSelect(item)
            }}>
                {(this.state.search ?? this.state.options).some(e => e.parentId) && <div className='row' style={{ width: '1.4rem', height: '1.4rem' }}>
                    {children.length ? <FontAwesomeIcon icon={(item as any).isOpen ? faCaretDown : faCaretRight} style={{ fontSize: '1.2rem', color: '#161C2499' }} /> : null}
                </div>}
                <Text className='body-3'>{item.name}</Text>
            </div>
            <div className='col' style={{ display: (item as any).isOpen ? "flex" : "none", width: '100%' }}>{children.map(e => this.renderOptions(e))}</div>
        </div>
    }

    private onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(ev.key)
        if ((this.state.options?.length || this.state.search?.length) && this.state.isOpen) {
            switch (ev.key.toLowerCase()) {
                case "enter":
                    ev.preventDefault()
                    const _selectItem = (this.state.search ?? this.state.options).find(e => e.id === this.state.selected)
                    if (_selectItem) this.onSelect(_selectItem)
                    break;
                case "arrowup":
                    ev.preventDefault()
                    if (this.state.selected) {
                        let _index = (this.state.search ?? this.state.options).findIndex((e) => e.id === this.state.selected)
                        _index = ((_index === 0) ? this.props.options.length : _index) - 1
                        this.setState({ ...this.state, selected: this.props.options[_index]?.id })
                    }
                    break;
                case "arrowdown":
                    ev.preventDefault()
                    if (this.state.selected) {
                        let _index = (this.state.search ?? this.state.options).findIndex((e) => e.id === this.state.selected)
                        _index = ((_index + 1 === this.props.options.length) ? -1 : _index) + 1
                        this.setState({ ...this.state, selected: this.props.options[_index]?.id })
                    }
                    break;
                default:
                    break;
            }
        }
    }

    componentDidUpdate(prevProps: Select1Props, prevState: Select1State) {
        if (prevProps.options !== this.props.options) {
            this.setState({ ...this.state, options: this.props.options })
            if (this.inputRef.current) this.inputRef.current.value = `${this.props.options.find(e => e.id === this.state.value)?.name ?? ""}`
        }
        if (prevProps.value !== this.props.value) this.setState({ ...this.state, value: this.props.value })
        if (prevState.value !== this.state.value && this.inputRef.current) this.inputRef.current.value = `${this.state.options.find(e => e.id === this.state.value)?.name ?? ""}`
        //
        if (this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
            const thisPopupRect = document.body.querySelector('.select1-popup')?.getBoundingClientRect()
            if (thisPopupRect) {
                let style: { top?: string, left?: string, right?: string, bottom?: string, width?: string, height?: string } | undefined;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        right: document.body.offsetWidth - this.state.offset.right + 'px'
                    }
                }
                let _bottom = thisPopupRect.bottom - 8
                const thisContainerRect = this.containerRef.current?.getBoundingClientRect()
                if (thisContainerRect) {
                    if (_bottom > document.body.offsetHeight) {
                        style = { ...(style ?? {}), top: `${thisContainerRect.y - 2 - thisPopupRect.height}px` }
                    }
                }
                if (style) {
                    style.left ??= (style.right ? undefined : `${this.state.offset.x}px`)
                    style.width ??= `${this.state.offset.width}px`
                    this.setState({ ...this.state, style: style })
                }
            }
        }
    }

    componentDidMount(): void {
        if (this.inputRef.current) this.inputRef.current.value = `${this.state.options.find(e => e.id === this.state.value)?.name ?? ""}`
    }

    render() {
        const _value = this.state.options.find(e => e.id === this.state.value)
        return <div
            id={this.props.id}
            ref={this.containerRef}
            className={`select1-container row ${this.props.disabled ? 'disabled' : ''} ${this.props.helperText?.length && 'helper-text'} ${this.props.className ?? 'body-3'}`}
            helper-text={this.props.helperText}
            style={this.props.style ? { ...({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties), ...this.props.style } : ({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties)}
            onClick={() => {
                if (!this.state.isOpen) {
                    this.setState({
                        ...this.state,
                        isOpen: true,
                        style: undefined,
                        offset: this.containerRef?.current?.getBoundingClientRect() as any,
                    })
                    this.inputRef.current?.focus()
                }
            }}
        >
            {(!_value || typeof _value.name === "string" || typeof _value.name === "number") ? <input ref={this.inputRef} readOnly={this.props.readOnly} onChange={this.search} placeholder={this.props.placeholder}
                onKeyDown={this.onKeyDown}
                onBlur={ev => {
                    if (this.state.onSelect && !this.props.readOnly) ev.target.focus()
                    else if (!this.state.onSelect) this.setState({ ...this.state, isOpen: false, onSelect: null })
                }}
            /> : _value.name}
            {this.props.showClearValueButton && _value ? <button type='button' className='row' style={{ padding: '0.4rem' }} onClick={(ev) => {
                ev.stopPropagation()
                if (this.state.value) this.setState({ ...this.state, isOpen: true, value: undefined })
            }}>
                <FontAwesomeIcon icon={faXmarkCircle} style={{ fontSize: '1.6rem', color: "var(--neutral-text-color-subtitle)" }} />
            </button> : <div className='row' style={{ display: (!this.containerRef.current || this.containerRef.current.getBoundingClientRect().width >= 120) ? "flex" : "none" }} >
                <FontAwesomeIcon icon={this.state.isOpen ? faChevronUp : faChevronDown} style={{ fontSize: '1.1rem', color: "var(--neutral-text-color-subtitle)" }} />
            </div>}
            {this.state.isOpen &&
                ReactDOM.createPortal(
                    <div className={`select1-popup col ${this.props.popupClassName ?? ""}`}
                        style={this.state.style ?? {
                            top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                            left: this.state.offset.x + 'px',
                            width: this.state.offset.width,
                        }}
                        onMouseOver={ev => this.setState({ ...this.state, onSelect: ev.target })}
                        onMouseOut={() => this.setState({ ...this.state, onSelect: null })}
                    >
                        <div className='col select-body'>
                            {(this.state.search ?? this.state.options).filter(e => !e.parentId).map(item => this.renderOptions(item))}
                            {(this.state.search?.length === 0 || this.props.options?.length === 0) && (
                                <div className='no-results-found'>No result found</div>
                            )}
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    }
}
