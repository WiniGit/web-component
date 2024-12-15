import styles from './select1.module.css'
import React, { createRef, CSSProperties, ReactNode, useState } from 'react'
import ReactDOM from 'react-dom'
import { Winicon } from '../wini-icon/winicon'
import { Text } from '../text/text'
import { WithTranslation, withTranslation } from 'react-i18next';

export interface OptionsItem {
    id: string | number,
    parentId?: string,
    name: string | ReactNode,
    title?: string | ((onSelect: (e: OptionsItem) => void) => ReactNode),
    disabled?: boolean
}

interface Select1Props extends WithTranslation {
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
    handleLoadmore?: (onLoadMore: boolean, ev: React.UIEvent<HTMLDivElement, UIEvent>) => void,
    handleLoadChildren?: () => {}
    readOnly?: boolean,
    popupClassName?: string,
    prefix?: ReactNode,
    suffix?: ReactNode,
    onOpenOptions?: (popupRef: HTMLDivElement) => void
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

class TSelect1 extends React.Component<Select1Props, Select1State> {
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
        this.onSelect = this.onSelect.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
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
            let newState = { ...this.state, isOpen: false, value: item.id, onSelect: undefined, selected: undefined }
            if (!newState.options.some(e => e.id === item.id)) newState.options.push(item)
            this.setState(newState)
            this.inputRef.current?.blur()
        }
        if (this.props.onChange) this.props.onChange(item)
    }

    private onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
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
            const thisPopupRect = document.body.querySelector(`:scope > .select1-popup`)?.getBoundingClientRect()
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
        const { t } = this.props;
        const _value = this.state.options.find(e => e.id === this.state.value)
        return <div
            id={this.props.id}
            ref={this.containerRef}
            className={`${styles['select1-container']} row ${this.props.disabled ? styles['disabled'] : ''} ${this.props.helperText?.length && styles['helper-text']} ${this.props.className ?? 'body-3'}`}
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
            {this.props.prefix}
            {(!_value || typeof _value.name === "string" || typeof _value.name === "number") ? <input ref={this.inputRef} readOnly={this.props.readOnly} onChange={this.search} placeholder={this.props.placeholder}
                onKeyDown={this.onKeyDown}
                onBlur={ev => {
                    if (this.state.onSelect && !this.props.readOnly) ev.target.focus()
                    else if (!this.state.onSelect) this.setState({ ...this.state, isOpen: false, onSelect: null })
                }}
            /> : _value.name}
            {this.props.suffix ?? <div ref={iconRef => {
                if (iconRef?.parentElement && iconRef.parentElement.getBoundingClientRect().width < 88) iconRef.style.display = "none"
            }} className='row' >
                <Winicon src={this.state.isOpen ? "fill/arrows/up-arrow" : "fill/arrows/down-arrow"} size={"1.2rem"} />
            </div>}
            {this.state.isOpen &&
                ReactDOM.createPortal(
                    <div ref={(popupRef) => {
                        if (popupRef && this.props.onOpenOptions) this.props.onOpenOptions(popupRef)
                    }} className={`${styles['select1-popup']} select1-popup col ${this.props.popupClassName ?? ""}`}
                        style={this.state.style ?? {
                            top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                            left: this.state.offset.x + 'px',
                            width: this.state.offset.width,
                        }}
                        onMouseOver={ev => this.setState({ ...this.state, onSelect: ev.target })}
                        onMouseOut={() => this.setState({ ...this.state, onSelect: null })}
                    >
                        <div className={`col ${styles['select-body']}`} onScroll={this.props.handleLoadmore ? (ev) => {
                            if (this.props.handleLoadmore) {
                                let scrollElement = ev.target as HTMLDivElement
                                this.props.handleLoadmore(Math.round(scrollElement.offsetHeight + scrollElement.scrollTop) >= (scrollElement.scrollHeight - 1), ev)
                            }
                        } : undefined}>
                            {(this.state.search ?? this.state.options).filter(e => !e.parentId).map(item => {
                                return <OptionsItemTile
                                    key={item.id}
                                    item={item}
                                    children={(this.state.search ?? this.state.options).filter(e => e.parentId === item.id)}
                                    selected={this.state.selected === item.id}
                                    onClick={this.onSelect}
                                    treeData={(this.state.search ?? this.state.options).some(e => e.parentId)}
                                />
                            })}
                            {(this.state.search?.length === 0 || this.props.options?.length === 0) && (
                                <div className={styles['no-results-found']}>{t("noResultFound")}</div>
                            )}
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    }
}

interface OptionTileProps {
    item: OptionsItem,
    children?: Array<OptionsItem>,
    selected?: boolean,
    onClick: (e: OptionsItem) => void,
    treeData?: boolean
}

function OptionsItemTile({ item, children, selected, onClick, treeData }: OptionTileProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return item.title && typeof item.title !== "string" ? <>{item.title(onClick)}</> : <div className='col' style={{ width: '100%' }}>
        <div className={`${styles['select-tile']} row ${item.disabled ? styles["disabled"] : ""}`} style={{ paddingLeft: item.parentId ? '4.4rem' : undefined, backgroundColor: selected ? "var(--neutral-selected-background-color)" : undefined }} onClick={() => {
            if (children?.length) {
                setIsOpen(!isOpen)
            } else onClick(item)
        }}>
            {treeData ? <div className='row' style={{ width: '1.4rem', height: '1.4rem' }}>
                {children?.length ? <Winicon src={isOpen ? "fill/arrows/triangle-down" : "fill/arrows/triangle-right"} size={"1.2rem"} /> : null}
            </div> : undefined}
            <Text className='body-3'>{item.title && typeof item.title === "string" ? item.title : item.name}</Text>
        </div>
        {children?.length ? <div className='col' style={{ display: isOpen ? "flex" : "none", width: '100%' }}>{children.map(e => <OptionsItemTile key={e.id} item={e} onClick={onClick} />)}</div> : undefined}
    </div>
}

export const Select1 = withTranslation()(TSelect1)
