import styles from './select1.module.css'
import React, { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Winicon } from '../wini-icon/winicon'
import { Text } from '../text/text'
import { useTranslation } from 'react-i18next';
import { PopupOverlay } from '../popup/popup'

export interface OptionsItem {
    id: string | number,
    parentId?: string,
    name: string | ReactNode,
    title?: string | ((onSelect: (e: OptionsItem) => void) => ReactNode),
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
    handleLoadmore?: (onLoadMore: boolean, ev: React.UIEvent<HTMLDivElement, UIEvent>) => void,
    handleLoadChildren?: () => {}
    readOnly?: boolean,
    popupClassName?: string,
    prefix?: ReactNode,
    suffix?: ReactNode,
    onOpenOptions?: (popupRef: HTMLDivElement) => void,
    simpleStyle?: boolean
}

export const Select1 = ({ style = {}, ...props }: Select1Props) => {
    const containerRef = useRef<HTMLLabelElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const { t } = useTranslation()
    const [options, setOptions] = useState<Array<OptionsItem>>([])
    const [search, setSearch] = useState<Array<OptionsItem> | undefined>(undefined)
    const [value, setValue] = useState<string | number>()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const valueItem = useMemo<OptionsItem | undefined>(() => options.find(e => e.id === value), [options.length, value])

    const onSelect = (item: OptionsItem) => {
        if (!item.disabled) setValue(item.id)
        setIsOpen(false)
        if (props.onChange) props.onChange(item)
    }

    useEffect(() => { setValue(props.value) }, [props.value])
    useEffect(() => { setOptions(props.options ?? []) }, [props.options])

    useEffect(() => {
        if (inputRef.current) inputRef.current.value = valueItem?.name && typeof valueItem.name === "string" ? valueItem.name : ""
    }, [valueItem, inputRef.current])

    return <label
        id={props.id}
        ref={containerRef}
        className={`${props.simpleStyle ? styles['select1-simple-style'] : styles['select1-container']} row ${props.disabled ? styles['disabled'] : ''} ${props.helperText?.length && styles['helper-text']} ${props.className ?? 'body-3'}`}
        helper-text={props.helperText}
        style={{ ...({ '--helper-text-color': props.helperTextColor ?? '#e14337' } as CSSProperties), ...style }}
       
    >
        {props.prefix}
        {(!valueItem || typeof valueItem.name === "string" || typeof valueItem.name === "number") ?
            <input ref={inputRef} readOnly={props.readOnly} placeholder={props.placeholder} disabled={props.disabled}
                onFocus={() => { setIsOpen(true) }}
                onChange={async (ev) => {
                    if (ev.target.value.trim().length) {
                        if (props?.handleSearch) {
                            const res = await props.handleSearch(ev.target.value.trim())
                            setSearch(res)
                        } else {
                            setSearch(props.options.filter(e => typeof e.name === "string" && e.name.toLowerCase().includes(ev.target.value.trim().toLowerCase())))
                        }
                    } else setSearch(undefined)
                }}
            /> : valueItem.name}
        {props.suffix ?? <div ref={iconRef => {
            if (iconRef?.parentElement && iconRef.parentElement.getBoundingClientRect().width < 88) iconRef.style.display = "none"
        }} className='row'>
            <Winicon src={isOpen ? "fill/arrows/up-arrow" : "fill/arrows/down-arrow"} size={"1.2rem"} />
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
                if (props.onOpenOptions) props.onOpenOptions(popupRef)
            }}
            className={`hidden-overlay`}
            onClose={() => { setIsOpen(false) }}
        >
            <div
                className={`${styles['select1-popup']} select1-popup dropdown-popup col ${props.popupClassName ?? ""}`}
                style={{
                    top: containerRef.current!.getBoundingClientRect().bottom + 2,
                    left: containerRef.current!.getBoundingClientRect().x,
                    width: containerRef.current!.offsetWidth,
                }}>
                <div className={`col ${styles['select-body']}`} onScroll={props.handleLoadmore ? (ev) => {
                    if (props.handleLoadmore) {
                        let scrollElement = ev.target as HTMLDivElement
                        props.handleLoadmore(Math.round(scrollElement.offsetHeight + scrollElement.scrollTop) >= (scrollElement.scrollHeight - 1), ev)
                    }
                } : undefined}>
                    {(search ?? options).filter(e => !e.parentId).map(item => {
                        return <OptionsItemTile
                            key={item.id}
                            item={item}
                            children={(search ?? options).filter(e => e.parentId === item.id)}
                            selected={value === item.id}
                            onClick={onSelect}
                            treeData={(search ?? options).some(e => e.parentId)}
                        />
                    })}
                    {(search?.length === 0 || !props.options?.length) && (
                        <div className={styles['no-results-found']}>{t("noResultFound")}</div>
                    )}
                </div>
            </div>
        </PopupOverlay>}
    </label>
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
            {((item.title && typeof item.title === "string") || typeof item.name === "string") ? <Text className='body-3'>{item.title && typeof item.title === "string" ? item.title : item.name}</Text> : item.name}
        </div>
        {children?.length ? <div className='col' style={{ display: isOpen ? "flex" : "none", width: '100%' }}>{children.map(e => <OptionsItemTile key={e.id} item={e} onClick={onClick} />)}</div> : undefined}
    </div>
}