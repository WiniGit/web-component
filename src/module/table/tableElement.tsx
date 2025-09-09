import { CSSProperties, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useRef, useState } from "react"
import { BaseDA, Button, Checkbox, closePopup, DataController, Popup, showPopup, Text, ToastMessage, Winicon } from "../../index";
import styles from "./table.module.css";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ActionOptionsDropdown } from "./featureElement"
import { ColDataType, FEDataType } from "../da";
import { AutoCellContent } from "./config";
import AddEditElementForm from "./addEditElement";

interface TableHeaderProps {
    methods: UseFormReturn<FieldValues, any, undefined>;
    showIndex?: boolean;
    hideCheckbox?: boolean;
    selected?: boolean | null;
    onChangeSelected?: (v: boolean) => void;
    onChangeConfigData?: () => void;
    fields?: Array<{ [p: string]: any }>;
    onEditColumn?: (params: { [p: string]: any }) => void
}

export const TableHeader = ({ methods, onEditColumn, onChangeConfigData, showIndex = false, hideCheckbox = false, selected, onChangeSelected }: TableHeaderProps) => {
    const columns = useMemo<Array<{ [p: string]: any }>>(() => methods.watch("columns") ?? [], [methods.watch("columns")])
    const mountedColumns = useRef<Array<{ [p: string]: any }>>([])
    const popupRef = useRef(null)
    const { t } = useTranslation()

    const onMounted = () => {
        if (mountedColumns.current.length) {
            methods.setValue("columns", columns.map((e: any) => {
                return e.Width ? e : { ...e, Width: mountedColumns.current.find((el: any) => el.Id === e.Id)?.minWidth }
            }))
            mountedColumns.current = []
            onChangeConfigData?.()
        }
    }

    return <>
        <Popup ref={popupRef} />
        <div className={`row ${styles["header"]}`}>
            {!hideCheckbox && <div className={`row ${styles["header-cell"]}`}>
                <div className={`row ${styles["title"]}`}>
                    <Checkbox size={'1.6rem'} value={selected as any} onChange={onChangeSelected} />
                    {showIndex && <div style={{ flex: 1 }} />}
                </div>
            </div>}
            {columns.sort((a, b) => a.Sort - b.Sort).map((_col, i) => <HeaderCell
                key={_col.Id}
                colItem={_col}
                methods={methods}
                onChangeConfigData={onChangeConfigData}
                handleAddEditField={(onChangeConfigData && onEditColumn) ? (() => onEditColumn(_col)) : undefined}
                onMounted={onChangeConfigData ? ((colItem: any) => {
                    if (!colItem.Width) mountedColumns.current.push(colItem)
                    if ((i + 1) === columns.length) onMounted()
                }) : undefined}
            />)}
            <HeaderCell colItem={"last"} methods={methods} style={{ flex: 1, padding: "0 1.6rem", width: "12rem", justifyContent: columns.length >= 10 ? "center" : "start" }} onChangeConfigData={onChangeConfigData}>
                <Text className="heading-9">{t("action")}</Text>
            </HeaderCell>
        </div>
    </>
}

interface HeaderCellProps {
    colItem: any;
    methods: UseFormReturn<FieldValues, any, undefined>;
    style?: CSSProperties;
    children?: ReactNode;
    onMounted?: (colItem: { [p: string]: any } | string) => void;
    onChangeConfigData?: () => void
    handleAddEditField?: () => void;
}

const HeaderCell = ({ colItem, methods, style = {}, children, onMounted, onChangeConfigData, handleAddEditField }: HeaderCellProps) => {
    const divRef = useRef<HTMLDivElement>(null)
    const popupRef = useRef<Popup>(null)
    const resizeRef = useRef<HTMLDivElement | undefined | null>(null)
    const [onResize, setOnResize] = useState<{ [p: string]: any } | undefined | null>(null)
    const sortItem = useMemo<{ [p: string]: any } | undefined | null>(() => typeof colItem === "string" ? null : methods.watch("sortby").find((e: any) => e.prop === colItem.Name), [methods.watch("sortby")])
    const columns = useMemo<Array<{ [p: string]: any }>>(() => methods.watch("columns") ?? [], [methods.watch("columns")])

    const handleSort = () => {
        if (sortItem) methods.setValue("sortby", methods.getValues("sortby").filter((e: any) => e.prop !== colItem.Name))
        else methods.setValue("sortby", [...methods.getValues("sortby"), { prop: colItem.Name, direction: "ASC" }])
        closePopup(popupRef as any)
    }

    const handleColumnAction = (ev: any) => {
        const _tbCellRect = ev.target.closest(`div:has(>svg)`).getBoundingClientRect()
        const onEdit = () => {
            closePopup(popupRef as any)
            onChangeConfigData?.()
        }
        showPopup({
            ref: popupRef as any,
            hideOverlay: true,
            content: <div className='col popup-actions dropdown-popup' style={{ right: `calc(100vw - ${_tbCellRect.right}px)`, top: _tbCellRect.bottom + 10, minWidth: '16.8rem' }}>
                {handleAddEditField && <button type='button' className='row' onClick={() => {
                    closePopup(popupRef as any)
                    handleAddEditField()
                }}>
                    <Winicon src='outline/user interface/gear' size={"1.4rem"} />
                    <Text className="button-text-3">Edit field</Text>
                </button>}
                <button type='button' className='row' onClick={handleSort}>
                    <Winicon src='outline/user interface/enlarge' size={"1.4rem"} />
                    <Text className="button-text-3">{sortItem ? "Remove sort" : "Sort"}</Text>
                </button>
                {onChangeConfigData && <>
                    <button type='button' className='row'
                        onClick={() => {
                            methods.setValue("columns", [columns[0], { ...colItem, Sort: 1 }, ...columns.slice(1).filter(e => e.Id !== colItem.Id).sort((a, b) => a.Sort - b.Sort).map((e, i) => ({ ...e, Sort: i + 2 }))])
                            onEdit()
                        }}>
                        <Winicon src='outline/arrows/move-layer-left' size={"1.4rem"} />
                        <Text className="button-text-3">Move to start</Text>
                    </button>
                    <button type='button' className='row'
                        onClick={() => {
                            methods.setValue("columns", [...columns.filter(e => e.Id !== colItem.Id).sort((a, b) => a.Sort - b.Sort).map((e, i) => ({ ...e, Sort: i })), { ...colItem, Sort: columns.length - 1 }])
                            onEdit()
                        }}>
                        <Winicon src='outline/arrows/move-layer-right' size={"1.4rem"} />
                        <Text className="button-text-3">Move to end</Text>
                    </button>
                    <button type='button' className='row' onClick={() => {
                        methods.setValue("columns", columns.filter(e => e.Id !== colItem.Id))
                        onEdit()
                    }}>
                        <Winicon src='outline/layout/eye-slash' size={"1.4rem"} />
                        <Text className="button-text-3">Hide column</Text>
                    </button>
                </>}
            </div>
        })
    }

    useEffect(() => {
        if (onMounted) {
            const title = divRef.current!.querySelector(".heading-9") as HTMLDivElement
            if (title && !colItem.Width) {
                divRef.current!.style.width = `${title.offsetWidth + 92}px`
                onMounted({ ...colItem, minWidth: divRef.current!.offsetWidth })
            }
        }
    }, [])

    const onMouseOut = () => {
        if (resizeRef.current && !onResize) {
            resizeRef.current?.remove()
            resizeRef.current = null
        }
    }

    const onMouseMove = (ev: any) => {
        ev.preventDefault()
        if (onResize) return
        const cellRect = divRef.current!.getBoundingClientRect()
        if (typeof colItem === "string") {
            var checkResize = ev.pageX <= (cellRect.x + 8)
        } else if (!colItem.Sort) {
            checkResize = ev.pageX >= (cellRect.right - 8)
        } else {
            checkResize = ev.pageX >= (cellRect.right - 8) || ev.pageX <= (cellRect.x + 8)
        }
        if (checkResize) {
            if (!resizeRef.current) {
                resizeRef.current = document.createElement("div")
                resizeRef.current.className = "resize-cell-stick"
                divRef.current!.parentElement!.appendChild(resizeRef.current)
            }
            resizeRef.current.style.left = `${(ev.pageX <= cellRect.x + 8 ? divRef.current!.offsetLeft : (divRef.current!.offsetLeft + divRef.current!.offsetWidth)) - 4}px`
            resizeRef.current.setAttribute("position", ev.pageX <= cellRect.x + 8 ? "left" : "right")
        } else onMouseOut()
        if (ev.buttons === 1 && resizeRef.current)
            setOnResize({ pageX: ev.pageX, width: resizeRef.current.getAttribute("position") === "left" ? ev.currentTarget.previousSibling.offsetWidth : ev.currentTarget.offsetWidth })
    }

    useEffect(() => {
        if (onResize && resizeRef.current) {
            const handleResize = (ev: any) => {
                ev.preventDefault()
                if (resizeRef.current!.getAttribute("position") === "left") {
                    const prevSibling = (divRef.current!.previousSibling as HTMLDivElement);
                    prevSibling.style.width = `${onResize.width + ev.pageX - onResize.pageX}px`
                    resizeRef.current!.style.left = `${divRef.current!.offsetLeft - 4}px`
                    methods.setValue("columns", methods.getValues("columns").map((e: any) => e.Id === prevSibling.id ? { ...e, Width: prevSibling.offsetWidth } : e))
                } else {
                    divRef.current!.style.width = `${onResize.width + ev.pageX - onResize.pageX}px`
                    resizeRef.current!.style.left = `${divRef.current!.offsetLeft + divRef.current!.offsetWidth - 4}px`
                    methods.setValue("columns", methods.getValues("columns").map((e: any) => e.Id === colItem.Id ? { ...e, Width: divRef.current!.offsetWidth } : e))
                }
            }
            const handleOnMouseUp = () => {
                resizeRef.current?.remove()
                resizeRef.current = null
                setOnResize(null)
                onChangeConfigData?.()
            }
            document.body.addEventListener('mousemove', handleResize)
            document.body.addEventListener('mouseup', handleOnMouseUp)
            return () => {
                document.body.removeEventListener('mousemove', handleResize)
                document.body.removeEventListener('mouseup', handleOnMouseUp)
            }
        } else if (resizeRef.current) {
            resizeRef.current.remove()
            resizeRef.current = null
        } else if (onResize) setOnResize(null)
    }, [onResize])

    const editable = useMemo(() => {
        if (onChangeConfigData && !onResize) return { onMouseMove: onMouseMove, onMouseOut: onMouseOut }
        return {}
    }, [onChangeConfigData, onResize, resizeRef.current])

    switch (colItem) {
        case "last":
            return <div ref={divRef} className={`row ${styles["header-cell"]} ${styles["last-cell"]}`} style={style} {...editable}>
                {children}
            </div>
        default:
            return <div ref={divRef} id={colItem.Id} style={{ width: colItem.Width, ...style }} className={`row ${styles["header-cell"]}`} {...editable}>
                <Popup ref={popupRef} />
                <div className={`row ${styles["title"]}`}>
                    {children ?? <Text className='heading-9' maxLine={1} style={{ maxWidth: sortItem ? `calc(100% - 2.4rem)` : "100%" }}>{colItem.Title}</Text>}
                    {sortItem && <Winicon src={`outline/arrows/circle-arrow-${sortItem.direction === "ASC" ? "up" : "down"}`} className={styles["column-sort-icon"]}
                        onClick={() => {
                            methods.setValue("sortby", methods.getValues("sortby").map((e: any) => e.prop === colItem.Name ? { ...e, direction: e.direction === "ASC" ? "DESC" : "ASC" } : e))
                        }}
                    />}
                    {!onChangeConfigData && !sortItem && <Winicon src='outline/arrows/circle-arrow-up' size={"1.4rem"} className={styles["column-action-sort-icon"]} onClick={handleSort} />}
                </div>
                {onChangeConfigData && <Winicon src='fill/arrows/down-arrow' className={styles["column-action-icon"]} onClick={handleColumnAction} style={{ marginRight: "1.6rem" }} />}
            </div>
    }
}

interface TableRowProps {
    item: { [p: string]: any };
    setItem: (params: { [p: string]: any }) => void;
    title?: string;
    index: number;
    methods: UseFormReturn<FieldValues, any, undefined>;
    fields?: Array<{ [p: string]: any }>;
    files?: Array<{ [p: string]: any }>;
    relativeData?: Array<{ [p: string]: any }>;
    relativeFields?: Array<{ [p: string]: any }>;
    showIndex?: boolean;
    hideCheckbox?: boolean;
    showAddEditPopup?: (id?: string) => void;
    onDelete?: () => void;
    actions?: Array<{ [p: string]: any }>;
    onChangeActions?: (actions: Array<{ [p: string]: any }>) => void;
    selected?: string[];
    setSelected?: Dispatch<SetStateAction<string[]>>;
    onDuplicate?: () => void;
    onEditActionColumn?: (params: { [p: string]: any }, actionItem: { [p: string]: any }) => void;
    customActions?: (params: { item: { [p: string]: any }, index: number }) => ReactNode;
    [p: string]: any
}

export const TableRow = ({ item, setItem, onEditActionColumn, title, index, methods, fields = [], files = [], relativeData, relativeFields = [], showIndex = false, hideCheckbox = false, showAddEditPopup, onDelete, actions = [], onChangeActions, selected, setSelected, onDuplicate, ...props }: TableRowProps) => {
    const popupRef = useRef<Popup>(null)
    const tbName = methods.getValues("TbName")
    const dataController = new DataController(tbName)
    const { t } = useTranslation()
    const enableEdit = !!showAddEditPopup
    const extendStaticProps: { [p: string]: any } = { methods, fields, relativeFields, actions, onChangeActions, setSelected, onEditActionColumn, ...props }
    const treeData = useMemo(() => fields.some(e => e.Column === 'ParentId'), [fields])
    const totalChild = useMemo<number | undefined>(() => item._totalChild ? parseInt(item._totalChild) : undefined, [item])
    // dynamic variables
    const localMethodsRelative = useForm<any>({ shouldFocusError: false })
    const columns = useMemo<Array<{ [p: string]: any }>>(() => methods.watch("columns") ?? [], [methods.watch("columns")])
    const localRelativeData = useMemo<{ [p: string]: any }>(() => localMethodsRelative.watch(), [JSON.stringify(localMethodsRelative.watch())])
    const [isOpen, setIsOpen] = useState(false)
    const [children, setChildren] = useState<Array<{ [p: string]: any }>>([])
    const [localFiles, setLocalFiles] = useState<Array<{ [p: string]: any }>>([])
    const checkValue = useMemo<boolean | undefined>(() => {
        if (!selected?.length) return false
        const _contains = selected.includes(item.Id)
        if (!totalChild) return _contains
        let tmp = false
        const _childrenContains = children.length && children.every(e => {
            const _check = selected.includes(e.Id)
            if (_check) tmp = true
            return _check
        })
        if (_childrenContains && children.length === totalChild && !_contains) {
            setSelected?.([...selected.filter(id => children.every(e => e.Id !== id)), item.Id])
        }
        return _contains ? true : tmp ? undefined : false
    }, [selected?.length, totalChild, children.length])

    const getData = async (page = 1) => {
        const pattern: any = {
            returns: ["Id", "ParentId", ...columns.map(e => e.Name.split(".").shift())],
        }
        const { searchRaw, sortby } = methods.getValues()
        const pkKeys = columns.filter(e => e.Name.split(".").length > 1);
        pkKeys.forEach((e) => {
            const tmp = e.Name.split(".")
            pattern[tmp[0]] ??= ["Id"]
            if (!pattern[tmp[0]].includes(tmp[1])) pattern[tmp[0]].push(tmp[1])
            if (e.Type === ColDataType.people) pattern[tmp[0]].push("AvatarUrl")
        });
        const res = await dataController.patternList({
            page: page, size: 20,
            searchRaw: `@ParentId:{${item.Id}} ${searchRaw !== "*" ? searchRaw : ""}`,
            sortby: sortby,
            pattern: pattern
        })
        if (res.code === 200) {
            setChildren(page > 1 ? [...children, ...res.data] : res.data)
            delete res.data
            delete res.totalCount
            delete res.code
            delete res.message
            if (Object.keys(res).length) {
                Object.keys(res).forEach((p: string) => localMethodsRelative.setValue(p, page > 1 ? [...(localRelativeData[p] ?? []), ...res[p]] : res[p]))
            } else localMethodsRelative.reset()
        }
    }

    useEffect(() => {
        if (isOpen && totalChild && columns.length) getData()
    }, [isOpen, JSON.stringify(methods.watch("sortby")), methods.watch("searchRaw"), totalChild, columns.length])

    const mapLocalRelativeData = useMemo(() => {
        const tmp: any = {}
        if (localRelativeData) {
            for (const childItem of children) {
                Object.keys(localRelativeData).forEach(p => {
                    if (childItem[`${p}Id`]?.length) {
                        const pData = localRelativeData[p].filter((e: any) => childItem[`${p}Id`].includes(e.Id))
                        if (pData) {
                            tmp[childItem.Id] ??= {}
                            tmp[childItem.Id][p] = pData
                        }
                    }
                })
            }
        }
        return tmp
    }, [localRelativeData, children])

    useEffect(() => {
        const dataFileIds: Array<string> = []
        columns.forEach(_col => {
            const tmp = _col.Name.split(".")
            if (tmp.length > 1) {
                if (relativeFields?.[tmp[0]]?.find((e: any) => e.Name === tmp[1] && e.DataType === FEDataType.FILE))
                    dataFileIds.push(...localRelativeData[tmp[0].substring(0, tmp[0].lastIndexOf("Id"))].map((e: any) => e[tmp[1]]?.split(",").slice(0, 2)).flat(Infinity).filter((id: string, i: number, arr: string[]) => !!id && arr.indexOf(id) === i))
            } else if (fields.find(e => e.Name === _col.Name && e.DataType === FEDataType.FILE)) {
                dataFileIds.push(...children.map(e => e[_col.Name]?.split(",").slice(0, 2)).flat(Infinity).filter((id, i, arr) => !!id && arr.indexOf(id) === i))
            }
        })
        if (dataFileIds.length) {
            BaseDA.getFilesInfor(dataFileIds.filter((id, i, arr) => arr.indexOf(id) === i)).then(res => {
                if (res.code === 200) setLocalFiles(res.data.filter((f: any) => f !== undefined && f !== null))
            })
        } else setLocalFiles([])
    }, [children, localRelativeData, relativeFields])

    const showAddEditChildPopup = (id?: string) => {
        showPopup({
            ref: popupRef as any,
            content: <AddEditElementForm
                ref={popupRef}
                tbName={tbName}
                id={id}
                title={title?.toLowerCase()}
                activeColumns={columns}
                onSuccess={() => {
                    if (id) getData(Math.max(Math.floor(children.length / 20), 1))
                    else getData()
                }}
                {...({ ...props, ParentId: item.Id })}
            />
        })
    }

    const showActions = (ev: any) => {
        const btn = ev.target.closest("div")
        if (btn.isOpen) return closePopup(popupRef as any)
        const rect = btn.getBoundingClientRect()
        btn.isOpen = true
        showPopup({
            ref: popupRef as any,
            hideOverlay: true,
            content: <ActionOptionsDropdown
                ref={popupRef}
                title={title}
                actions={actions}
                onChangeActions={onChangeActions}
                onEditActionColumn={onEditActionColumn}
                style={{ top: rect.bottom + 2, right: `calc(100dvw - ${rect.right}px)`, minWidth: "14rem" }}
                onClose={() => { setTimeout(() => { btn.isOpen = false }, 150) }}
                onEdit={enableEdit ? (() => showAddEditPopup(item.Id)) : undefined}
                onDuplicate={onDuplicate}
                onDelete={onDelete}
                item={item}
                tbName={tbName}
            />
        })
    }

    return <>
        <Popup ref={popupRef} />
        <div className={`row ${styles["table-row"]}`}>
            {!hideCheckbox && <div className={`row ${styles["cell"]}`}>
                <div className={`row ${styles["content"]}`}>
                    <Checkbox size={'1.6rem'} value={checkValue}
                        onChange={setSelected ? (v) => {
                            const newList = selected!.filter(id => id !== item.Id && id !== item.ParentId)
                            if (v) newList.push(item.Id)
                            setSelected!(newList)
                        } : undefined} />
                    {showIndex && <Text className='label-3' style={{ flex: 1 }}>{item.ParentId ? "" : index}</Text>}
                </div>
            </div>}
            {columns.sort((a, b) => a.Sort - b.Sort).map((_col, i) => {
                const tmp = _col.Name.split(".")
                const props = (tmp.length > 1 ? { data: relativeData?.[tmp[0].substring(0, tmp[0].lastIndexOf("Id"))], fields: relativeFields?.[tmp[0]] } : { data: item, fields: fields }) as any
                if (treeData && !i) {
                    return <Cell key={_col.Id} colItem={_col} style={{ gap: "0.8rem" }}>
                        {totalChild ? <Winicon src={`fill/arrows/triangle-${isOpen ? "down" : "right"}`} size={"1.2rem"} onClick={() => setIsOpen(!isOpen)} /> : <div style={{ width: "1.6rem" }} />}
                        <AutoCellContent colItem={_col} files={files} {...props} />
                        {enableEdit && <Winicon src="fill/user interface/c-add" className={styles["add-child-icon-btn"]} onClick={() => { showAddEditChildPopup() }} />}
                    </Cell>
                } else {
                    return <Cell key={_col.Id} colItem={_col}>
                        <AutoCellContent colItem={_col} files={files} {...props} />
                    </Cell>
                }
            })}
            <Cell colItem={"last"} style={{ flex: 1, padding: "0 1.6rem", minWidth: "12rem", justifyContent: columns.length >= 10 ? "center" : "start" }}>
                {props.customActions?.({ item, index }) ?? <>
                    {enableEdit && <Winicon src='outline/user interface/i-edit' className='icon-button size24 light' size={14} onClick={() => showAddEditPopup(item.Id)} />}
                    <Winicon src='outline/text/menu-dots' style={{ rotate: "90deg" }} size={14} className='icon-button size24 light' onClick={showActions} />
                </>}
            </Cell>
        </div>
        {isOpen && <>
            {children.map((childItem, j) => {
                return <TableRow
                    {...extendStaticProps as any}
                    selected={selected?.includes(item.Id) ? [...selected, ...children.map(e => e.Id)] : selected}
                    key={`${childItem.Id}-${j}`}
                    index={j + 1}
                    item={childItem}
                    files={localFiles}
                    relativeData={mapLocalRelativeData[childItem.Id]}
                    showIndex
                    hideCheckbox={hideCheckbox}
                    showAddEditPopup={enableEdit ? showAddEditChildPopup : undefined}
                    onDelete={enableEdit ? (() => {
                        dataController.delete([item.Id]).then(res => {
                            if (res.code === 200) {
                                getData(Math.max(Math.floor(children.length / 20), 1))
                                setItem({ ...item, _totalChild: item._totalChild - 1 })
                            }
                        })
                    }) : undefined}
                    onDuplicate={enableEdit ? () => {
                        dataController.duplicate([childItem.Id]).then(res => {
                            if (res.code !== 200) return ToastMessage.errors(res.message)
                            setItem({ ...item, _totalChild: item._totalChild + 1 })
                            getData(Math.max(Math.floor(children.length / 20), 1))
                            ToastMessage.success(`Duplicate this ${title?.toLowerCase()} successfully!`)
                        })
                    } : undefined}
                />
            })}
            {(enableEdit || (!!totalChild && !!children.length && totalChild > children.length)) && <div className={`row ${styles["add-child-table-row"]}`}>
                {enableEdit && <Button
                    prefix={<Winicon src="outline/user interface/e-add" size={12} />}
                    label={`${t("add")} ${t("new").toLowerCase()}`}
                    className="button-text-5"
                    onClick={() => { showAddEditChildPopup() }}
                />}
                {!!totalChild && !!children.length && totalChild > children.length &&
                    <Text className="button-text-5" onClick={() => { getData(Math.floor(children.length / 20) + 1) }}>See more</Text>}
            </div>}
        </>
        }
    </>
}

interface CellProps {
    colItem: any;
    style?: CSSProperties;
    children?: ReactNode
}

const Cell = ({ colItem, style, children }: CellProps) => {
    switch (colItem) {
        case "last":
            return <div className={`row ${styles["cell"]} ${styles["last-cell"]}`} style={style}>
                {children}
            </div>
        default:
            return <div style={{ width: colItem.Width, ...style }} className={`row ${styles["cell"]}`}>
                <div className={`row ${styles["content"]}`}>
                    {children}
                </div>
            </div>
    }
}