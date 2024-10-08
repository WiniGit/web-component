import { faCaretDown, faCaretRight, faClose, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { createRef, CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import './input-multi-select.css'
import { OptionsItem } from '../select1/select1'
import { Checkbox } from '../checkbox/checkbox'
import { Text } from '../text/text'

interface SelectMultipleProps {
    id?: string,
    value?: Array<string | number>,
    options: Required<Array<OptionsItem>>,
    onChange?: (value?: Array<string | number>) => void,
    placeholder?: string,
    disabled?: boolean,
    className?: string,
    helperText?: string,
    helperTextColor?: string,
    style?: CSSProperties,
    handleSearch?: (e: string) => Promise<Array<OptionsItem>>,
    showClearValueButton?: boolean,
    popupClassName?: string
}

interface SelectMultipleState {
    value: Array<string | number>,
    options: Required<Array<OptionsItem>>,
    offset: DOMRect,
    isOpen: boolean,
    onSelect: any,
    search?: Array<OptionsItem>,
    style?: Object
};

export class SelectMultiple extends React.Component<SelectMultipleProps, SelectMultipleState> {
    private containerRef = createRef<HTMLDivElement>()
    constructor(props: SelectMultipleProps) {
        super(props)
        this.state = {
            value: props.value ?? [],
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
        this.onCheck = this.onCheck.bind(this)
        this.search = this.search.bind(this)
        this.onClickItem = this.onClickItem.bind(this)
    }

    private onCheck(value: boolean, list: Array<OptionsItem>) {
        let newValue: Array<string | number> = []
        if (value) {
            newValue = [...this.state.value, ...list.map(e => e.id)]
        } else {
            newValue = this.state.value.filter(vl => list.every(e => vl !== e.id))
        }
        this.setState({ ...this.state, value: newValue })
        if (this.props.onChange) this.props.onChange(newValue)
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

    private onClickItem(ev: React.MouseEvent<HTMLDivElement>, item: string | number) {
        ev.stopPropagation()
        let newValue = this.state.value.filter(vl => vl !== item)
        this.setState({
            ...this.state,
            value: newValue,
            ...(this.state.isOpen ? {} : {
                isOpen: true,
                style: undefined,
                offset: this.containerRef?.current?.getBoundingClientRect() as any,
            })
        })
        if (this.props.onChange) this.props.onChange(newValue)
    }

    private renderOptions(item: OptionsItem) {
        let children: Array<OptionsItem> = []
        if (!item.parentId) children = (this.state.search ?? this.state.options).filter(e => e.parentId === item.id)
        // 
        return <div key={item.id} className='col' style={{ width: '100%' }}>
            <div className={`select-tile row ${item.disabled ? "disabled" : ""}`} style={{ paddingLeft: item.parentId ? '4.4rem' : undefined }} onClick={children.length ? () => {
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
            } : undefined}>
                {(this.state.search ?? this.state.options).some(e => e.parentId) && <div className='row' style={{ width: '1.4rem', height: '1.4rem' }}>
                    {children.length ? <FontAwesomeIcon icon={(item as any).isOpen ? faCaretDown : faCaretRight} style={{ fontSize: '1.2rem', color: '#161C2499' }} /> : null}
                </div>}
                <Checkbox disabled={item.disabled} value={children.length ? (children.every((e) => this.state.value.includes(e.id)) ? true : children.some((e) => this.state.value.includes(e.id)) ? undefined : false) : this.state.value.includes(item.id)} onChange={(v) => { this.onCheck(v, [item, ...children]) }} size={'2rem'} />
                <Text className='body-3'>{item.name}</Text>
            </div>
            <div className='col' style={{ display: (item as any).isOpen ? "flex" : "none", width: '100%' }}>{children.map(e => this.renderOptions(e))}</div>
        </div>
    }

    componentDidUpdate(prevProps: SelectMultipleProps, prevState: SelectMultipleState) {
        if (prevProps.options !== this.props.options) this.setState({ ...this.state, options: this.props.options })
        if (prevProps.value !== this.props.value) this.setState({ ...this.state, value: this.props.value ?? [] })
        //
        if (this.state.isOpen && (prevState.isOpen !== this.state.isOpen || prevState.value.length !== this.state.value.length)) {
            const thisPopupRect = document.body.querySelector('.select-multi-popup')?.getBoundingClientRect()
            if (thisPopupRect) {
                let style: { top?: string, left?: string, right?: string, bottom?: string, width?: string, height?: string } | undefined;
                if (prevState.isOpen !== this.state.isOpen && thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        right: document.body.offsetWidth - this.state.offset.right + 'px'
                    }
                }
                let _bottom = thisPopupRect.bottom - 8
                const thisContainerRect = this.containerRef.current?.getBoundingClientRect()
                if (thisContainerRect) {
                    if (prevState.value.length !== this.state.value.length) {
                        _bottom = thisContainerRect.bottom + 2 + thisPopupRect.height
                        style = { ...(style ?? {}), top: `${thisContainerRect.bottom + 2}px` }
                    }
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

    render() {
        return <div
            id={this.props.id}
            ref={this.containerRef}
            className={`select-multi-container row ${this.props.disabled ? 'disabled' : ''} ${this.props.helperText?.length && 'helper-text'} ${this.props.className ?? 'body-3'}`}
            helper-text={this.props.helperText}
            style={this.props.style ? { ...({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties), ...this.props.style } : ({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties)}
            onClick={() => {
                if (!this.state.isOpen) this.setState({
                    ...this.state,
                    isOpen: true,
                    style: undefined,
                    offset: this.containerRef?.current?.getBoundingClientRect() as any,
                })
            }}
        >
            <div className='row' style={{ flexWrap: 'wrap', flex: 1, width: '100%', gap: '0.6rem 0.4rem' }}>
                {this.state.value.map(item => {
                    const optionItem = this.props.options.find(e => e.id === item)
                    return <div key={item} className='selected-item-value row' onClick={(ev) => this.onClickItem(ev, item)}>
                        <Text style={{ color: '#161D24E5', fontSize: '1.2rem', lineHeight: '1.4rem' }} >{optionItem?.name}</Text>
                        <FontAwesomeIcon icon={faClose} style={{ color: '#161D24E5', fontSize: '1.2rem' }} />
                    </div>
                })}
                {(!this.state.value.length || this.state.isOpen) && <input autoFocus={this.state.isOpen} onChange={this.search} placeholder={this.state.value.length ? undefined : this.props.placeholder}
                    onBlur={ev => {
                        if (this.state.onSelect) ev.target.focus()
                        else this.setState({ ...this.state, isOpen: false, onSelect: null })
                    }}
                />}
            </div>
            {this.props.showClearValueButton && <button type='button' className='row' style={{ padding: '0.4rem' }} onClick={(ev) => {
                ev.stopPropagation()
                if (this.state.value.length) this.setState({ ...this.state, isOpen: true, value: [] })
            }}>
                <FontAwesomeIcon icon={faXmarkCircle} style={{ fontSize: '1.6rem', color: '#161C24' }} />
            </button>}
            {this.state.isOpen &&
                ReactDOM.createPortal(
                    <div className={`select-multi-popup col ${this.props.popupClassName ?? ""}`}
                        style={this.state.style ?? {
                            top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                            left: this.state.offset.x + 'px',
                            width: this.state.offset.width,
                        }}
                        onMouseOver={ev => this.setState({ ...this.state, onSelect: ev.target })}
                        onMouseOut={() => this.setState({ ...this.state, onSelect: null })}
                    >
                        <div style={{ padding: '1.2rem 1.6rem', width: '100%', borderBottom: '1px solid #161D2414' }}>
                            {(() => {
                                const _list = (this.state.search ?? this.props.options ?? [])
                                const isSelectedAll = _list.every(item => this.state.value.some(vl => vl === item.id))
                                return <Text onClick={() => {
                                    let newValue: Array<string | number> = []
                                    if (_list.length) {
                                        if (isSelectedAll) {
                                            newValue = this.state.value.filter(vl => _list.every(item => vl !== item.id))
                                        } else {
                                            newValue = [...this.state.value, ..._list.filter(item => this.state.value.every(vl => vl !== item.id)).map(e => e.id)]
                                        }
                                    }
                                    this.setState({ ...this.state, value: newValue })
                                    if (this.props.onChange) this.props.onChange(newValue)
                                }} className='button-text-3' style={{ color: _list.length ? 'var(--infor-color)' : '#00204D99', }}>{_list.length && isSelectedAll ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}</Text>
                            })()}
                        </div>
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
