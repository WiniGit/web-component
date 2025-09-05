import React, { CSSProperties, Dispatch, forwardRef, ReactNode, SetStateAction, useEffect, useImperativeHandle, useRef, useState } from 'react'
import styles from './input-multi-select.module.css'
import { OptionsItem } from '../select1/select1'
import { useTranslation } from 'react-i18next';
import { Winicon } from '../wini-icon/winicon';
import { TextField } from '../text-field/text-field';
import { Checkbox } from '../checkbox/checkbox';

interface SelectMultipleProps {
    id?: string,
    value?: Array<string | number>,
    options: Required<Array<OptionsItem>>,
    getOptions?: (params: { length: number, search?: string, parentId?: string | number }) => Promise<{ data: Array<OptionsItem>, totalCount: number }>,
    onChange?: (value?: Array<string | number>) => void,
    placeholder?: string,
    disabled?: boolean,
    readOnly?: boolean,
    /** 
     * default: size40: body-3
     * recommend: size48: body-3 | size32: body-3
     *  */
    className?: string,
    helperText?: string,
    helperTextColor?: string,
    style?: CSSProperties,
    showClearValueButton?: boolean,
    popupClassName?: string,
    prefix?: ReactNode,
    suffix?: ReactNode,
    simpleStyle?: boolean,
    customOptionsList?: ReactNode,
    previewMaxLength?: number
}

interface SelectMultipleRef {
    element: HTMLDivElement
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    options: OptionsItem[]
    setOptions: Dispatch<SetStateAction<OptionsItem[]>>
    onOpenOptions: () => void
}

export const SelectMultiple = forwardRef<SelectMultipleRef, SelectMultipleProps>(({ style = {}, previewMaxLength = 2, ...props }, ref) => {
    const containerRef = useRef<any>(null)
    const offsetRef = useRef<{ [p: string]: any }>(null)
    const [options, setOptions] = useState<Array<OptionsItem>>([])
    const [value, setValue] = useState<Array<string | number>>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const onClickItem = (ev: React.MouseEvent<HTMLDivElement>, item: string | number) => {
        ev.stopPropagation()
        let newValue = value.filter(vl => vl !== item)
        setValue(newValue)
        props.onChange?.(newValue)
    }

    useEffect(() => { setValue(props.value ?? []) }, [props.value])
    useEffect(() => { setOptions(props.options ?? []) }, [props.options])

    const clearValue = (ev: any) => {
        ev.stopPropagation()
        setValue([])
        props.onChange?.([])
    }

    const onOpenOptions = () => {
        if (isOpen) return null;
        const rect = containerRef.current.getBoundingClientRect()
        const tmp = document.createElement("div")
        tmp.style.position = "fixed"
        containerRef.current.after(tmp)
        let tmpRect = tmp.getBoundingClientRect()
        let offset: any = { width: rect.width }
        if (rect.bottom + 240 >= document.body.offsetHeight) offset.bottom = `calc(100dvh - ${rect.y}px + 2px)`
        else offset.top = rect.bottom + 2
        if (Math.abs(tmpRect.x - rect.x) > 2) {
            tmp.style.left = `${containerRef.current.offsetLeft}px`
            tmpRect = tmp.getBoundingClientRect()
            if (Math.abs(tmpRect.x - rect.x) > 2) {
                offset.left = rect.x
            } else offset.left = containerRef.current.offsetLeft
        }
        tmp.remove()
        if (rect.right + 16 >= document.body.offsetWidth) {
            offset.right = `calc(100dvw - ${rect.right}px)`
            delete offset.left
        }
        offsetRef.current = offset
        setIsOpen(true)
    }

    useImperativeHandle(ref, () => ({
        element: containerRef.current,
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        options: options,
        setOptions: setOptions,
        onOpenOptions: onOpenOptions
    }), [isOpen, options, containerRef]);

    return <>
        <div
            id={props.id}
            ref={containerRef}
            className={`${props.simpleStyle ? styles['select-multi-simple-style'] : styles['select-multi-container']} ${isOpen ? styles["focus"] : ""} row ${props.helperText?.length ? styles['helper-text'] : ""} ${props.disabled ? styles['disabled'] : ""} ${props.className ?? (props.simpleStyle ? "" : 'body-3')}`}
            helper-text={props.helperText}
            style={{ '--helper-text-color': props.helperTextColor ?? '#e14337', ...style } as CSSProperties}
            onClick={props.disabled || props.readOnly ? undefined : onOpenOptions}
        >
            {props.prefix}
            <div className={`row ${styles["preview-container"]}`}>
                {!value.length && <span style={{ opacity: 0.5, font: "inherit" }}>{props.placeholder}</span>}
                {value.slice(0, previewMaxLength).map(item => {
                    const optionItem = options.find(e => e.id === item)
                    return <div key={item} className={`row ${styles['selected-item-value']}`}>
                        <span>{optionItem?.name}</span>
                        <Winicon src={"outline/user interface/e-remove"} className={`${styles['remove-icon']}`} size={12} onClick={optionItem?.disabled ? undefined : (ev) => onClickItem(ev, item)} />
                    </div>
                })}
                {value.length > previewMaxLength && <div className={`row ${styles['selected-item-value']}`}>
                    <span>+{value.length - previewMaxLength}</span>
                </div>}
            </div>
            {props.suffix ||
                (
                    (props.showClearValueButton && value.length) ?
                        <Winicon src={"outline/user interface/c-remove"} size={14} onClick={clearValue} /> :
                        <div ref={iconRef => {
                            if (iconRef?.parentElement && iconRef.parentElement.getBoundingClientRect().width < 88) iconRef.style.display = "none"
                        }} className='row'>
                            <Winicon src={`fill/arrows/${isOpen ? "up" : "down"}-arrow`} size={12} />
                        </div>
                )
            }
        </div>
        {isOpen && (props.customOptionsList ?? <OptionDropList
            onClose={(ev) => {
                const removeBtn = ev.target.closest(`div[class*="selected-item-value"] > div:last-child`)
                if (removeBtn) {
                    removeBtn.click()
                } else {
                    setTimeout(() => setIsOpen(false), 150)
                }
            }}
            getOptions={props.getOptions ?? (async ({ search }) => {
                if (search?.length) {
                    const filter = options.filter(e => search.toLowerCase().includes(`${e.id}`.toLowerCase()) || `${e.id}`.toLowerCase().includes(search.toLowerCase()) || search.toLowerCase().includes(`${e.name}`.toLowerCase()) || `${e.name}`.toLowerCase().includes(search.toLowerCase()))
                    return { data: filter, totalCount: filter.length }
                }
                return { data: options, totalCount: options.length }
            })}
            selected={options.filter(e => value.includes(e.id))}
            style={offsetRef.current!}
            onChange={(ev, optList) => {
                const newOList: OptionsItem[] = []
                optList.forEach(newO => {
                    if (options.every(o => o.id !== newO.id)) newOList.push(newO)
                })
                if (newOList.length) setOptions([...options, ...newOList])
                const tmp = value.filter(s => !optList.some(c => s === c.id)) ?? []
                if (ev) tmp.push(...optList.filter((e, _, arr) => arr.every(c => e.id !== c.parentId)).map(e => e.id))
                setValue(tmp)
                props.onChange?.(tmp)
            }}
        />)}
    </>
})

interface OptionDropListProps {
    onClose: (ev: any) => void,
    style: CSSProperties,
    selected: Array<OptionsItem>,
    onChange: (value: boolean, e: OptionsItem[]) => void,
    getOptions: (params: { length: number, search?: string, parentId?: string | number }) => Promise<{ data: Array<OptionsItem>, totalCount: number }>
}

const OptionDropList = (props: OptionDropListProps) => {
    const divRef = useRef<HTMLDivElement>(null)
    const searchInput = useRef<TextField>(null)
    const initTotal = useRef<number>(null)
    const [options, setOptions] = useState<{ data: OptionsItem[], totalCount?: number }>({ data: [], totalCount: undefined })
    const { t } = useTranslation()
    const getData = async (length?: number) => {
        const res = await props.getOptions({ length: length ?? 0, search: searchInput.current?.getInput()?.value ?? "" })
        if (initTotal.current === null) initTotal.current = res.totalCount
        setOptions(length ? { data: [...options.data, ...res.data], totalCount: res.totalCount } : res)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (divRef.current) {
            const onClickDropDown = (ev: any) => {
                if (ev.target === divRef.current || !divRef.current!.contains(ev.target)) props.onClose(ev)
            }
            window.document.body.addEventListener("mousedown", onClickDropDown)
            return () => {
                window.document.body.removeEventListener("mousedown", onClickDropDown)
            }
        }
    }, [divRef.current])

    return <div
        ref={divRef}
        onScroll={(ev) => {
            let scrollElement = ev.target as HTMLDivElement
            const onLoadmore = Math.round(scrollElement.offsetHeight + scrollElement.scrollTop) >= (scrollElement.scrollHeight - 1)
            if (onLoadmore && options.totalCount && options.data.length < options.totalCount) getData(options.data.length)
        }}
        className={`col ${styles["select-multi-popup"]}`} style={props.style}>
        {options.totalCount === 0 && !initTotal.current ? <div className='col' style={{ alignItems: "center" }}>
            <Winicon src='color/files/archive-file' size={28} />
            <h6 className='heading-7' style={{ margin: "0.8rem" }}>{t("noResultFound")}</h6>
        </div> :
            <>
                {initTotal.current && initTotal.current > 10 && <div className={`col ${styles["search-options"]}`}>
                    <TextField
                        ref={searchInput}
                        className={`body-3 size32`}
                        placeholder={t("search")}
                        prefix={<Winicon src={"outline/development/zoom"} size={"1.4rem"} />}
                        onChange={(ev) => {
                            if (ev.target.value.trim().length % 2 === 0) getData()
                        }}
                        onComplete={(ev: any) => {
                            ev.target.blur()
                            getData()
                        }}
                    />
                </div>}
                {options.totalCount === 0 ?
                    <div className='col' style={{ alignItems: "center" }}>
                        <Winicon src='color/files/archive-file' size={28} />
                        <h6 className='heading-7' style={{ margin: "0.8rem" }}>{t("noResultFound")}</h6>
                    </div> :
                    options.data.filter(e => !e.parentId).map((opt, i, arr) => <OptionsItemTile
                        key={opt.id + "-" + i}
                        item={opt}
                        selected={props.selected}
                        children={options.data.filter(e => e.parentId === opt.id)}
                        getOptions={props.getOptions}
                        arr={arr}
                        onChange={props.onChange}
                    />)}
            </>
        }
    </div>
}

interface OptionTileProps {
    item: OptionsItem,
    children?: Array<OptionsItem>,
    arr: Array<OptionsItem>,
    selected: Array<OptionsItem>,
    onChange: (ev: boolean, optList: OptionsItem[]) => void,
    getOptions?: (params: { length: number, search?: string, parentId?: string | number }) => Promise<{ data: Array<OptionsItem>, totalCount: number }>
}

function OptionsItemTile({ item, children, selected, onChange, getOptions }: OptionTileProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [options, setOptions] = useState<{ data: OptionsItem[], totalCount: number }>({ data: [], totalCount: 0 })
    const { t } = useTranslation()

    useEffect(() => {
        if (children && !options.totalCount) setOptions({ data: children, totalCount: children.length })
    }, [children])

    useEffect(() => {
        if (isOpen && !options.totalCount) getOptions?.({ length: 0, parentId: item.id }).then(res => setOptions(res))
    }, [isOpen])

    return <>
        {item.totalChild ?
            <div className={`row label-4 ${styles["select-tile"]} ${item.disabled ? styles["disabled"] : ""}`} onClick={() => setIsOpen(!isOpen)}>
                <div className='row' style={{ padding: 2 }}>
                    <Checkbox
                        size={16}
                        disabled={item.disabled}
                        value={(selected?.some(s => s.id === item.id) || (!!options.data.length && options.data.every(c => selected?.some(s => s.id === c.id)))) ? true : [...selected.filter(s => s.parentId === item.id), ...options.data].some(c => selected?.some(s => s.id === c.id)) ? null : false}
                        onChange={(ev) => {
                            onChange(ev, [item, ...options.data])
                        }}
                    />
                </div>
                {typeof item?.name === "object" ? item.name : <>
                    {item.totalChild !== undefined && <Winicon src={`fill/arrows/triangle-${isOpen ? "down" : "right"}`} size={12} />}
                    {item.prefix}
                    <span>{item.name}</span>
                </>}
            </div> :
            <label className={`row label-4 ${styles["select-tile"]} ${item.disabled ? styles["disabled"] : ""}`}>
                <div className='row' style={{ padding: 2 }}>
                    <Checkbox
                        size={16}
                        disabled={item.disabled}
                        value={selected?.some(s => s.id === item.id)}
                        onChange={(ev) => {
                            onChange(ev, [item])
                        }}
                    />
                </div>
                {typeof item?.name === "object" ? item.name : <>
                    {item.prefix}
                    <span>{item.name}</span>
                </>}
            </label>}
        {isOpen && <>
            {options.data.map((child, i) => {
                return <label key={child.id + "-" + i} style={{ paddingLeft: `calc(max(0.8rem, 5px) + max(0.8rem, 5px) + 20px)` }} className={`row label-4 ${styles["select-tile"]} ${child.disabled ? styles["disabled"] : ""}`}>
                    <div className='row' style={{ padding: 2 }}>
                        <Checkbox
                            size={16}
                            disabled={child.disabled}
                            value={selected?.some(s => s.id === child.id)}
                            onChange={(ev) => {
                                onChange(ev, [child])
                            }}
                        />
                    </div>
                    {typeof child?.name === "object" ? child.name : <>
                        {child.prefix}
                        <span>{child.name}</span>
                    </>}
                </label>
            })}
            {options.data.length < options.totalCount && <div className={`button-text-5 ${styles["see-more"]}`} onClick={() => {
                getOptions?.({ length: options.data.length, parentId: item.id }).then(res => setOptions(res))
            }}>{t("seemore")}</div>}
        </>}
    </>
}
