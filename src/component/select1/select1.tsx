import styles from './select1.module.css'
import { CSSProperties, Dispatch, forwardRef, ReactNode, SetStateAction, useDeferredValue, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Winicon } from '../wini-icon/winicon';
import { TextField } from '../text-field/text-field';
import { Util } from '../../controller/utils';

export interface OptionsItem {
    prefix?: ReactNode,
    id: string | number,
    parentId?: string | number,
    name: string | ReactNode,
    disabled?: boolean,
    totalChild?: number,
}

interface Select1Props {
    id?: string,
    value?: string | number,
    options: Required<Array<OptionsItem>>,
    getOptions?: (params: { length: number, search?: string, parentId?: string | number }) => Promise<{ data: Array<OptionsItem>, totalCount: number }>,
    onChange?: (v?: OptionsItem) => void,
    placeholder?: string,
    disabled?: boolean,
    readOnly?: boolean,
    /** 
     * default: size40: body-3
     * recommend: size48: body-3 | size32: body-3 | size24: body-3
     *  */
    className?: string,
    helperText?: string,
    helperTextColor?: string,
    style?: CSSProperties,
    prefix?: ReactNode,
    suffix?: ReactNode,
    hideAutoSuffix?: boolean,
    simpleStyle?: boolean
    customOptionsList?: ReactNode,
    dropdownClassName?: string,
    dropdownStyle?: CSSProperties,
    hiddenSearchOptions?: boolean,
}

interface Select1Ref {
    element: HTMLDivElement,
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    options: OptionsItem[],
    setOptions: Dispatch<SetStateAction<OptionsItem[]>>,
    onOpenOptions: () => void
}

export const Select1 = forwardRef<Select1Ref, Select1Props>(({ style = {}, ...props }, ref) => {
    const containerRef = useRef<any>(null)
    const offsetRef = useRef<{ [p: string]: any }>(null)
    const [options, setOptions] = useState<Array<OptionsItem>>([])
    const [value, setValue] = useState<string | number>()
    const valueItem = useMemo<OptionsItem | undefined>(() => options.find(e => e.id === value), [options.length, value])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        setValue(props.value)
    }, [props.value])
    useEffect(() => {
        setOptions(props.options ?? [])
    }, [props.options])

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
            className={`${props.simpleStyle ? styles['select1-simple-style'] : styles['select1-container']} ${isOpen ? styles["focus"] : ""} row ${props.helperText?.length ? styles['helper-text'] : ""} ${props.disabled ? styles['disabled'] : ""} ${props.className ?? (props.simpleStyle ? "" : 'body-3')}`}
            helper-text={props.helperText}
            style={{ '--helper-text-color': props.helperTextColor ?? '#e14337', ...style } as CSSProperties}
            onClick={(props.disabled || props.readOnly) ? undefined : onOpenOptions}
        >
            {valueItem?.prefix ?? props.prefix}
            {typeof valueItem?.name === "object" ? valueItem.name : <span style={{ flex: 1, textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", opacity: valueItem ? undefined : 0.5 }}>{valueItem?.name ?? props.placeholder}</span>}
            {props.suffix ?? (!props.hideAutoSuffix && <Winicon ref={iconRef => {
                if (iconRef?.element?.parentElement && iconRef.element.parentElement.getBoundingClientRect().width < 88) iconRef.element.style.display = "none"
            }} src={`fill/arrows/${isOpen ? "up" : "down"}-arrow`} size={12} />)}
        </div>
        {isOpen && (props.customOptionsList ?? <OptionDropList
            onClose={() => { setTimeout(() => { setIsOpen(false) }, 150) }}
            getOptions={props.getOptions ?? (async ({ search }) => {
                if (search?.length) {
                    const filter = options.filter(e => {
                        return Util.toSlug(search.toLowerCase()).includes(Util.toSlug(`${e.id}`.toLowerCase())) || Util.toSlug(`${e.id}`.toLowerCase()).includes(Util.toSlug(search.toLowerCase())) ||
                            (typeof e.name === "string" && (Util.toSlug(search.toLowerCase()).includes(Util.toSlug(`${e.name}`.toLowerCase())) || Util.toSlug(`${e.name}`.toLowerCase()).includes(Util.toSlug(search.toLowerCase())))) ||
                            // without slug
                            search.toLowerCase().includes(`${e.id}`.toLowerCase()) || `${e.id}`.toLowerCase().includes(search.toLowerCase()) ||
                            (typeof e.name === "string" && (search.toLowerCase().includes(`${e.name}`.toLowerCase()) || `${e.name}`.toLowerCase().includes(search.toLowerCase())));
                    })
                    return { data: filter, totalCount: filter.length }
                }
                return { data: options, totalCount: options.length }
            })}
            selected={value}
            style={{ ...offsetRef.current!, ...(props.dropdownStyle ?? {}) }}
            className={props.dropdownClassName}
            hiddenSearchOptions={props.hiddenSearchOptions}
            onSelect={(e) => {
                if (options.every(o => o.id !== e.id)) setOptions([e])
                setValue(e.id)
                if (props.onChange) props.onChange(e)
                setIsOpen(false)
            }}
        />)}
    </>
})

const OptionDropList = (props: { onClose: () => void, style: CSSProperties, className?: string, selected?: string | number, onSelect: (e: OptionsItem) => void, getOptions: (params: { length: number, search?: string, parentId?: string | number }) => Promise<{ data: Array<OptionsItem>, totalCount: number }>, hiddenSearchOptions?: boolean }) => {
    const divRef = useRef<HTMLDivElement>(null)
    const [searchInput, setSearchInput] = useState<string>("")
    const searchValue = useDeferredValue(searchInput)
    const initTotal = useRef<number>(null)
    const [options, setOptions] = useState<{ data: OptionsItem[], totalCount?: number }>({ data: [], totalCount: undefined })
    const { t } = useTranslation()
    const getData = async (length?: number) => {
        const res = await props.getOptions({ length: length ?? 0, search: searchValue })
        if (initTotal.current === null) initTotal.current = res.totalCount
        setOptions(length ? { data: [...options.data, ...res.data], totalCount: res.totalCount } : res)
    }

    useEffect(() => {
        getData()
    }, [searchValue])

    useEffect(() => {
        if (divRef.current) {
            const onClickDropDown = (ev: any) => {
                if (ev.target === divRef.current || !divRef.current!.contains(ev.target)) props.onClose()
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
        className={`col ${styles["select1-popup"]} ${props.className ?? ''}`} style={props.style}>
        {options.totalCount === 0 && !initTotal.current ? <div className='col' style={{ alignItems: "center" }}>
            <Winicon src='color/files/archive-file' size={28} />
            <h6 className='heading-7' style={{ margin: "0.8rem" }}>{t("noResultFound")}</h6>
        </div> :
            <>
                {!props.hiddenSearchOptions && initTotal.current && initTotal.current > 10 && <div className={`col ${styles["search-options"]}`}>
                    <TextField
                        autoFocus
                        className={`body-3 ${divRef.current!.offsetWidth > 88 ? "size32" : "size24"}`}
                        placeholder={t("search")}
                        prefix={<Winicon src={"outline/development/zoom"} size={14} />}
                        onChange={(ev) => {
                            setSearchInput(ev.target.value.trim())
                        }}
                        onComplete={(ev: any) => {
                            ev.target.blur()
                        }}
                    />
                </div>}
                {options.totalCount === 0 ?
                    <div className='col' style={{ alignItems: "center" }}>
                        <Winicon src='color/files/archive-file' size={28} />
                        <h6 className='heading-7' style={{ margin: "0.8rem" }}>{t("noResultFound")}</h6>
                    </div> :
                    options.data.filter(e => !e.parentId).map((opt, i) => <OptionsItemTile
                        key={opt.id + "-" + i}
                        item={opt}
                        selected={opt.id === props.selected}
                        children={options.data.filter(e => e.parentId === opt.id)}
                        onClick={props.onSelect}
                        getOptions={(params) => props.getOptions?.({ ...params, search: searchValue })}
                    />)}
            </>
        }
    </div>
}

interface OptionTileProps {
    item: OptionsItem,
    children?: Array<OptionsItem>,
    selected?: boolean,
    onClick: (e: OptionsItem) => void,
    getOptions?: (params: { length: number, search?: string, parentId?: string | number }) => Promise<{ data: Array<OptionsItem>, totalCount: number }>
}

function OptionsItemTile({ item, children, selected, onClick, getOptions }: OptionTileProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [options, setOptions] = useState<{ data: OptionsItem[], totalCount: number }>({ data: [], totalCount: 0 })
    const { t } = useTranslation()

    useEffect(() => {
        if (children) setOptions({ data: children, totalCount: children.length })
    }, [children])

    useEffect(() => {
        if (isOpen && !options.totalCount) getOptions?.({ length: 0, parentId: item.id }).then(res => setOptions(res))
    }, [isOpen])

    return <>
        {<button type='button' disabled={item.disabled} className={`row label-4 ${styles["select-tile"]} ${item.disabled ? styles["disabled"] : ""} ${selected ? styles["selected"] : ""}`} onClick={() => {
            if (item.totalChild) setIsOpen(!isOpen)
            else onClick(item)
        }}>
            {typeof item?.name === "object" ? item.name : <>
                {item.totalChild !== undefined && <Winicon src={`fill/arrows/triangle-${isOpen ? "down" : "right"}`} size={12} />}
                {item.prefix}
                <span>{item.name}</span>
            </>}
        </button>}
        {isOpen && <>
            {options.data.map((child, i) => {
                return <button key={child.id + "-" + i} type='button' style={{ paddingLeft: `calc(max(0.8rem, 5px) + max(0.8rem, 5px) + 16px)` }} className={`row label-4 ${styles["select-tile"]} ${child.disabled ? styles["disabled"] : ""} ${selected ? styles["selected"] : ""}`} onClick={() => onClick(child)}>
                    {typeof child?.name === "object" ? child.name : <>
                        {child.prefix}
                        <span>{child.name}</span>
                    </>}
                </button>
            })}
            {options.data.length < options.totalCount && <div className={`button-text-5 ${styles["see-more"]}`}
                onClick={() => {
                    getOptions?.({ length: options.data.length, parentId: item.id }).then(res => setOptions(res))
                }}>{t("seemore")}</div>}

        </>}
    </>
} 