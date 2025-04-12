import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import styles from './input-multi-select.module.css'
import { OptionsItem } from '../select1/select1'
import { Checkbox } from '../checkbox/checkbox'
import { Text } from '../text/text'
import { Winicon } from '../wini-icon/winicon'
import { useTranslation } from 'react-i18next';
import { PopupOverlay } from '../popup/popup'

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
    handleLoadmore?: (onLoadMore: boolean, ev: React.UIEvent<HTMLDivElement, UIEvent>) => void,
    showClearValueButton?: boolean,
    popupClassName?: string
    simpleStyle?: boolean
}

export const SelectMultiple = ({ style = {}, ...props }: SelectMultipleProps) => {
    const containerRef = useRef<HTMLLabelElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const { t } = useTranslation();
    const [options, setOptions] = useState<Array<OptionsItem>>([])
    const [search, setSearch] = useState<Array<OptionsItem> | undefined>(undefined)
    const [value, setValue] = useState<Array<string | number>>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const onCheck = (ev: boolean, list: Array<OptionsItem>) => {
        let newValue: Array<string | number> = []
        if (ev) {
            newValue = [...value, ...list.map(e => e.id)]
        } else {
            newValue = value.filter(vl => list.every(e => vl !== e.id))
        }
        setValue(newValue)
        props.onChange?.(newValue)
        inputRef.current?.focus()
    }

    const onClickItem = (ev: React.MouseEvent<HTMLDivElement>, item: string | number) => {
        ev.stopPropagation()
        let newValue = value.filter(vl => vl !== item)
        setValue(newValue)
        props.onChange?.(newValue)
    }

    useEffect(() => { setValue(props.value ?? []) }, [props.value])
    useEffect(() => { setOptions(props.options ?? []) }, [props.options])

    return <label
        id={props.id}
        ref={containerRef}
        className={`${props.simpleStyle ? styles['select-multi-simple-style'] : styles['select-multi-container']} row ${props.disabled ? styles['disabled'] : ''} ${props.helperText?.length ? styles['helper-text'] : ""} ${props.className ?? (props.simpleStyle ? "" : 'body-3')}`}
        helper-text={props.helperText}
        style={{ '--helper-text-color': props.helperTextColor ?? '#e14337', ...style } as CSSProperties}
    >
        <label className='row' style={{ flexWrap: 'wrap', flex: 1, width: '100%', gap: '0.6rem 0.4rem' }}>
            {value.map(item => {
                const optionItem = options.find(e => e.id === item)
                return <div key={item} className={`row ${styles['selected-item-value']}`} onClick={optionItem?.disabled ? undefined : (ev) => onClickItem(ev, item)}>
                    <Text style={{ color: "var(--neutral-text-title-color)", fontSize: '1.2rem', lineHeight: '1.4rem' }} >{optionItem?.name}</Text>
                    <Winicon src={"outline/user interface/e-remove"} size={'1.2rem'} style={{ padding: "0.1rem" }} />
                </div>
            })}
            <input
                ref={inputRef}
                onFocus={() => { setIsOpen(true) }}
                placeholder={value.length ? undefined : props.placeholder}
                onChange={async (ev) => {
                    if (ev.target.value.trim().length) {
                        if (props?.handleSearch) {
                            const res = await props.handleSearch(ev.target.value.trim())
                            setSearch(res)
                        } else {
                            setSearch(options.filter((e, _, arr) => {
                                return typeof e.name === "string" && (e.name.toLowerCase().includes(ev.target.value.trim().toLowerCase()) || arr.filter(el => el.parentId === e.id).some(el => typeof el.name === "string" && el.name.toLowerCase().includes(ev.target.value.trim().toLowerCase())))
                            }))
                        }
                    } else setSearch(undefined)
                }}
            />
        </label>
        {props.showClearValueButton && value.length ? <button type='button' className='row' style={{ padding: '0.4rem' }} onClick={(ev) => {
            ev.stopPropagation()
            if (value.length) {
                setValue([])
                props.onChange?.([])
            }
        }}>
            <Winicon src={"outline/user interface/c-remove"} size={'1.6rem'} />
        </button> : <div ref={iconRef => {
            if (iconRef?.parentElement && iconRef.parentElement.getBoundingClientRect().width < 100) iconRef.style.display = "none"
        }} className='row' >
            <Winicon src={isOpen ? "fill/arrows/up-arrow" : "fill/arrows/down-arrow"} size={'1.2rem'} />
        </div>}
        {isOpen && <PopupOverlay
            onOpen={popupRef => {
                setTimeout(() => {
                    const select1Popup = popupRef.firstChild! as HTMLDivElement
                    const thisPopupRect = select1Popup.getBoundingClientRect()
                    const thisContainerRect = containerRef.current!.getBoundingClientRect()
                    if (thisPopupRect.right > document.body.offsetWidth) {
                        select1Popup.style.left = ""
                        select1Popup.style.right = `${document.body.offsetWidth - thisContainerRect.right}px`
                    }
                    let _bottom = thisPopupRect.bottom - 8
                    if (_bottom > document.body.offsetHeight) {
                        select1Popup.style.top = ""
                        select1Popup.style.bottom = `${document.body.offsetHeight - thisContainerRect.y + 2}px`
                    }
                }, 300)
            }}
            className={`hidden-overlay`}
            onClose={() => { setIsOpen(false) }}
        >
            <div className={`${styles['select-multi-popup']} select-multi-popup dropdown-popup col ${props.popupClassName ?? ""}`}
                style={{
                    top: containerRef.current!.getBoundingClientRect().bottom + 2,
                    left: containerRef.current!.getBoundingClientRect().x,
                    width: containerRef.current!.offsetWidth,
                }}>
                <div style={{ padding: '0 0.8rem 0.4rem', width: '100%', borderBottom: "var(--neutral-main-border)" }}>
                    {(() => {
                        const _list = (search ?? options ?? [])
                        const isSelectedAll = _list.every(item => value.some(vl => vl === item.id))
                        return <Text onClick={() => {
                            let newValue: Array<string | number> = []
                            if (_list.length) {
                                if (isSelectedAll) {
                                    newValue = value.filter(vl => _list.every(item => vl !== item.id || item.disabled))
                                } else {
                                    newValue = [...value, ..._list.filter(item => value.every(vl => vl !== item.id) && !item.disabled).map(e => e.id)]
                                }
                            }
                            setValue(newValue)
                            props.onChange?.(newValue)
                        }} className='button-text-3' style={{ color: _list.length ? undefined : 'var(--neutral-text-subtitle-color, #61616B)', width: "fit-content", padding: "0.4rem 0.8rem" }}>{_list.length && isSelectedAll ? `${t("remove")} ${t("all").toLowerCase()}` : `${t("select")} ${t("all").toLowerCase()}`}</Text>
                    })()}
                </div>
                <div className={`col ${styles['select-body']}`} onScroll={props.handleLoadmore ? (ev) => {
                    if (props.handleLoadmore) {
                        let scrollElement = ev.target as HTMLDivElement
                        props.handleLoadmore(Math.round(scrollElement.offsetHeight + scrollElement.scrollTop) >= (scrollElement.scrollHeight - 1), ev)
                    }
                } : undefined}>
                    {(search ?? options).filter(e => !e.parentId).map(item => {
                        return <RenderOptions key={item.id} item={item} onCheck={onCheck} value={value} listOptions={search ?? options} />
                    })}
                    {(search?.length === 0 || !options.length) && (
                        <div className={styles['no-results-found']}>{t("noResultFound")}</div>
                    )}
                </div>
            </div>
        </PopupOverlay>}
    </label>
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
            <label className='row' style={{ flex: 1, gap: "0.8rem" }}>
                <Checkbox disabled={item.disabled} value={children.length ? (children.every((e) => value.includes(e.id)) ? true : children.some((e) => value.includes(e.id)) ? undefined : false) : value.includes(item.id)} onChange={(v) => { onCheck(v, [item, ...children]) }} size={'2rem'} />
                <Text className='body-3' style={{ flex: 1 }} maxLine={2}>{item.name}</Text>
            </label>
        </div>
        <div className='col' style={{ display: (item as any).isOpen ? "flex" : "none", width: '100%' }}>
            {children.map(e => <RenderOptions key={e.id} item={e} onCheck={onCheck} value={value} listOptions={listOptions} />)}
        </div>
    </div>
}

