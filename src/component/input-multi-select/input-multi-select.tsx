import React, { createRef, CSSProperties, useEffect, useMemo, useState } from 'react'
import styles from './input-multi-select.module.css'
import { OptionsItem } from '../select1/select1'
import { Checkbox } from '../checkbox/checkbox'
import { Text } from '../text/text'
import { Winicon } from '../wini-icon/winicon'
import { WithTranslation, withTranslation } from 'react-i18next';
import { PopupOverlay } from '../popup/popup'

interface SelectMultipleProps extends WithTranslation {
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
    handleLoadmore?: (onLoadMore: boolean, ev: React.UIEvent<HTMLDivElement, UIEvent>) => void,
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

class TSelectMultiple extends React.Component<SelectMultipleProps, SelectMultipleState> {
    private containerRef = createRef<HTMLDivElement>()
    private inputRef = createRef<HTMLInputElement>()
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
                    search: this.props.options.filter((e, _, arr) => {
                        return typeof e.name === "string" && (e.name.toLowerCase().includes(ev.target.value.trim().toLowerCase()) || arr.filter(el => el.parentId === e.id).some(el => typeof el.name === "string" && el.name.toLowerCase().includes(ev.target.value.trim().toLowerCase())))
                    })
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

    componentDidUpdate(prevProps: SelectMultipleProps, prevState: SelectMultipleState) {
        if (prevProps.options !== this.props.options) this.setState({ ...this.state, options: this.props.options })
        if (prevProps.value !== this.props.value) this.setState({ ...this.state, value: this.props.value ?? [] })
        //
        if (this.state.isOpen && (prevState.isOpen !== this.state.isOpen || prevState.value.length !== this.state.value.length)) {
            const thisPopupRect = this.containerRef.current!.querySelector(`.select-multi-popup`)?.getBoundingClientRect()
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
        const { t } = this.props;
        return <div
            id={this.props.id}
            ref={this.containerRef}
            className={`${styles['select-multi-container']} row ${this.props.disabled ? styles['disabled'] : ''} ${this.props.helperText?.length && styles['helper-text']} ${this.props.className ?? 'body-3'}`}
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
                    return <div key={item} className={`row ${styles['selected-item-value']}`} onClick={optionItem?.disabled ? undefined : (ev) => this.onClickItem(ev, item)}>
                        <Text style={{ color: "var(--neutral-text-title-color)", fontSize: '1.2rem', lineHeight: '1.4rem' }} >{optionItem?.name}</Text>
                        <Winicon src={"outline/user interface/e-remove"} size={'1.2rem'} />
                    </div>
                })}
                {(!this.state.value.length || this.state.isOpen) && <input ref={this.inputRef} autoFocus={this.state.value.length > 0} onChange={this.search} placeholder={this.state.value.length ? undefined : this.props.placeholder}
                    onBlur={ev => {
                        if (this.state.isOpen) ev.target.focus()
                    }}
                />}
            </div>
            {this.props.showClearValueButton && this.state.value.length ? <button type='button' className='row' style={{ padding: '0.4rem' }} onClick={(ev) => {
                ev.stopPropagation()
                if (this.state.value.length) this.setState({ ...this.state, isOpen: true, value: [] })
            }}>
                <Winicon src={"outline/user interface/c-remove"} size={'1.6rem'} />
            </button> : <div ref={iconRef => {
                if (iconRef?.parentElement && iconRef.parentElement.getBoundingClientRect().width < 100) iconRef.style.display = "none"
            }} className='row' >
                <Winicon src={this.state.isOpen ? "fill/arrows/up-arrow" : "fill/arrows/down-arrow"} size={'1.2rem'} />
            </div>}
            {this.state.isOpen && <PopupOverlay
                className={`hidden-overlay`}
                onClose={(ev) => {
                    if (ev.target !== this.inputRef.current) this.setState({ ...this.state, isOpen: false })
                }}
            >
                <div className={`${styles['select-multi-popup']} select-multi-popup col ${this.props.popupClassName ?? ""}`}
                    style={this.state.style ?? {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        left: this.state.offset.x + 'px',
                        width: this.state.offset.width,
                    }}>
                    <div style={{ padding: '1.2rem 1.6rem', width: '100%', borderBottom: "var(--neutral-main-border)" }}>
                        {(() => {
                            const _list = (this.state.search ?? this.props.options ?? [])
                            const isSelectedAll = _list.every(item => this.state.value.some(vl => vl === item.id))
                            return <Text onClick={() => {
                                let newValue: Array<string | number> = []
                                if (_list.length) {
                                    if (isSelectedAll) {
                                        newValue = this.state.value.filter(vl => _list.every(item => vl !== item.id || item.disabled))
                                    } else {
                                        newValue = [...this.state.value, ..._list.filter(item => this.state.value.every(vl => vl !== item.id) && !item.disabled).map(e => e.id)]
                                    }
                                }
                                this.setState({ ...this.state, value: newValue })
                                if (this.props.onChange) this.props.onChange(newValue)
                            }} className='button-text-3' style={{ color: _list.length ? undefined : 'var(--neutral-text-title-color)' }}>{_list.length && isSelectedAll ? `${t("remove")} ${t("all").toLowerCase()}` : `${t("select")} ${t("all").toLowerCase()}`}</Text>
                        })()}
                    </div>
                    <div className={`col ${styles['select-body']}`} onScroll={this.props.handleLoadmore ? (ev) => {
                        if (this.props.handleLoadmore) {
                            let scrollElement = ev.target as HTMLDivElement
                            this.props.handleLoadmore(Math.round(scrollElement.offsetHeight + scrollElement.scrollTop) >= (scrollElement.scrollHeight - 1), ev)
                        }
                    } : undefined}>
                        {(this.state.search ?? this.state.options).filter(e => !e.parentId).map(item => {
                            return <RenderOptions key={item.id} item={item} onCheck={this.onCheck} value={this.state.value} listOptions={this.state.search ?? this.state.options} />
                        })}
                        {(!this.state.search?.length && !this.props.options?.length) && (
                            <div className={styles['no-results-found']}>{t("noResultFound")}</div>
                        )}
                    </div>
                </div>
            </PopupOverlay>}
        </div>
    }
}

const RenderOptions = ({ item, listOptions = [], value = [], onCheck }: { item: OptionsItem, listOptions?: Array<OptionsItem>, value: Array<string | number>, onCheck: (value: boolean, list: Array<OptionsItem>) => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const children = useMemo(() => {
        if (!item.parentId) return listOptions.filter(e => e.parentId === item.id)
        return []
    }, [listOptions, item])

    useEffect(() => {
        if (!isOpen && children.some((e) => value.includes(e.id))) setIsOpen(true)
    }, [value, children.length])

    return <div className='col' style={{ width: '100%' }}>
        <div className={`${styles['select-tile']} row ${item.disabled ? styles["disabled"] : ""}`} style={{ paddingLeft: item.parentId ? '4.4rem' : undefined }} onClick={children.length ? () => { setIsOpen(!isOpen) } : undefined}>
            {listOptions.some(e => e.parentId) && <div className='row' style={{ width: '1.4rem', height: '1.4rem' }}>
                {children.length ? <Winicon src={(item as any).isOpen ? 'fill/arrows/triangle-down' : 'fill/arrows/triangle-right'} size={'1.2rem'} /> : null}
            </div>}
            <Checkbox disabled={item.disabled} value={children.length ? (children.every((e) => value.includes(e.id)) ? true : children.some((e) => value.includes(e.id)) ? undefined : false) : value.includes(item.id)} onChange={(v) => { onCheck(v, [item, ...children]) }} size={'2rem'} />
            <Text className='body-3'>{item.name}</Text>
        </div>
        <div className='col' style={{ display: (item as any).isOpen ? "flex" : "none", width: '100%' }}>
            {children.map(e => <RenderOptions key={e.id} item={e} onCheck={onCheck} value={value} listOptions={listOptions} />)}
        </div>
    </div>
}

export const SelectMultiple = withTranslation()(TSelectMultiple)

