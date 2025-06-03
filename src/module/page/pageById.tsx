import { CSSProperties, MouseEventHandler, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { ActionType, ComponentType, FEDataType, TriggerType, ValidateType } from "../da"
import { FormById } from "../form/formById"
import { CardById } from "../card/cardById"
import { ChartById } from "../chart/chartById"
import { TableController } from "../../controller/setting"
import { Text } from "../../component/text/text"
import { Winicon } from "../../component/wini-icon/winicon"
import { Popup } from "../../component/popup/popup"
import { showPopup } from "../../component/popup/popup"
import { closePopup } from "../../component/popup/popup"
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom"
import { SimpleButton } from "../../component/button/button"
import { useForm, UseFormReturn } from "react-hook-form"
import { Util } from "../../controller/utils"
import { ViewById } from "../view/viewById"
import { regexGetVariableByThis, regexGetVariables, regexWatchDoubleQuote, regexWatchSingleQuote, replaceVariables } from "../card/config"
import { CkEditorUploadAdapter, ConfigData } from "../../controller/config"
import { supportProperties } from "./config"
import { Rating } from "../../component/rating/rating"
import { ProgressBar } from "../../component/progress-bar/progress-bar"
import { ProgressCircle } from "../../component/progress-circle/progress-circle"
import { CustomCkEditor5 } from "../../component/ck-editor/ckeditor"
import { FCheckbox, FColorPicker, FDateTimePicker, FGroupCheckbox, FGroupRadioButton, FInputPassword, FNumberPicker, FRadioButton, FSelect1, FSelectMultiple, FSwitch, FTextArea, FTextField, FUploadFile } from "./component-form"

interface Props {
    methods?: UseFormReturn
}

interface RenderPageProps extends Props {
    layers: Array<{ [p: string]: any }>,
    bodyId?: string
    children?: ReactNode,
    /**
     * custom props of layer by id. Ex: { "gid": { style: { width: "60rem", backgroundColor: "red" }, className: "my-class" } }
     * */
    propsData?: { [p: string]: { style?: CSSProperties, className?: string, onClick?: (ev: MouseEventHandler) => void, [p: string]: any } },
    /**
     * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    childrenData?: { [p: string]: ReactNode },
    /**
     * replace layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    itemData?: { [p: string]: ReactNode },
}

const RenderPageView = ({ childrenData, propsData, itemData, layers = [], children, methods, bodyId }: RenderPageProps) => {

    return layers.filter(e => !e.ParentId || e.ParentId === bodyId).map(e => <RenderLayerElement
        key={e.Id}
        item={e}
        list={layers}
        methods={methods}
        bodyChildren={children}
        childrenData={childrenData}
        itemData={itemData}
        propsData={propsData}
        type="page"
    />)
}

interface RenderLayerElementProps extends Props {
    item: { [p: string]: any },
    list: Array<{ [p: string]: any }>,
    cols?: Array<{ [p: string]: any }>,
    rels?: Array<{ [p: string]: any }>,
    bodyChildren?: ReactNode,
    type?: "page" | "view" | "card" | "form",
    propsData?: { [p: string]: { style?: CSSProperties, className?: string, onClick?: (ev: MouseEventHandler) => void, [p: string]: any } } | { [p: string]: (itemData: { [p: string]: any }, index: number, methods: UseFormReturn) => { style?: CSSProperties, className?: string, onCLick?: (ev: MouseEventHandler) => void, [p: string]: any } },
    itemData?: { [p: string]: ReactNode } | { [p: string]: (indexItem: { [p: string]: any }, index: number, methods: UseFormReturn) => ReactNode },
    childrenData?: { [p: string]: ReactNode } | { [p: string]: (itemData: { [p: string]: any }, index: number, methods: UseFormReturn) => ReactNode },
    indexItem?: { [p: string]: any },
    index?: number,
    style?: CSSProperties,
    className?: string,
    options?: { [p: string]: Array<{ [p: string]: any }> }
}

export const pageAllRefs: { [p: string]: any } = {}
export const RenderLayerElement = (props: RenderLayerElementProps) => {
    const findId = props.item.Setting?.id ?? props.item.Id
    if (props.itemData && props.itemData[findId] && (props.type !== "card" || (props.itemData[findId] as any)(props.indexItem, props.index, props.methods))) {
        if (props.type === "card") return (props.itemData[findId] as any)(props.indexItem, props.index, props.methods)
        else return props.itemData[findId]
    } else return <CaculateLayer {...props} />
}

const CaculateLayer = (props: RenderLayerElementProps) => {
    const findId = props.item.Setting?.id ?? props.item.Id
    // init refs
    if (props.item.Type === ComponentType.form || props.item.Type === ComponentType.card)
        pageAllRefs[findId] = (props.propsData?.[findId] as any)?.ref ?? useRef(null)
    useEffect(() => {
        return () => { delete pageAllRefs[findId] }
    }, [])
    // 
    const location = useLocation() as any
    const params = useParams()
    const query = new URLSearchParams(location.search)
    const navigate = useNavigate()
    const children = useMemo(() => props.list.filter(e => e.ParentId === props.item.Id), [props.list, props.item])
    const replaceThisVariables = (content: string, isEval?: boolean) => {
        return content.replace(replaceVariables, (m: string) => {
            const execRegex = regexGetVariables.exec(m)
            if (!execRegex?.[1]) return m
            const variable = execRegex[1].split(".")
            let getValue: any = m
            switch (variable[0]) {
                case "this":
                    if (props.type === "card" && variable[1] === "index") getValue = props.index
                    else getValue = props.indexItem?.[variable[1]]
                    break;
                case "location":
                    getValue = location[variable[1]]
                    break;
                case "query":
                    getValue = query.get(variable[1])
                    break;
                case "params":
                    getValue = params[variable[1]]
                    break;
                case "cookie":
                    getValue = Util.getCookie(variable[1])
                    break;
                case "storage":
                    getValue = Util.getStorage(variable[1])
                    break;
                case "session":
                    getValue = Util.getSession(variable[1])
                    break;
                default:
                    if (regexWatchSingleQuote.test(execRegex[1])) {
                        getValue = props.methods!.watch(execRegex[1].match(regexWatchSingleQuote)![1])
                    } else if (regexWatchDoubleQuote.test(execRegex[1])) {
                        getValue = props.methods!.watch(execRegex[1].match(regexWatchDoubleQuote)![1])
                    }
                    break;
            }
            if (isEval && typeof getValue === "string") getValue = `"${getValue}"`
            return getValue
        })
    }
    const watchForCustomProps = useMemo(() => {
        if (!props.item.State) return undefined
        const tmp: { [p: string]: any } = {}
        const triggerState = props.item.State.filter((e: any) => e.Trigger?.length)
        if (!triggerState.length) return undefined
        for (const st of triggerState) {
            if (regexGetVariables.test(st.Trigger)) {
                var caculate = replaceThisVariables(st.Trigger, true)
            } else caculate = st.Trigger
            try {
                var checked = eval(caculate)
            } catch (error) {
                console.log(caculate, error)
            }
            if (checked) {
                for (const sp of supportProperties) {
                    if (st[sp]) {
                        Object.keys(st[sp]).forEach(k => {
                            if (st[sp][k]) {
                                tmp[k] ??= {}
                                tmp[k] = { ...tmp[k], ...st[sp][k] }
                            }
                        })
                    }
                }
            }
        }
        return tmp
    }, [props.methods!.watch(), props.item.State, location.pathname, location.search, params])
    const customProps = useMemo(() => {
        let _props = { ...props.item.Setting }
        _props.style ??= {}
        _props.className ??= ""
        if (_props.action?.length && Array.isArray(_props.action)) {
            Object.values(TriggerType).forEach(trigger => {
                const triggerActions = _props.action.filter((e: any) => e.Type === trigger)
                const handleEvent = async (acts = []) => {
                    for (const [_, act] of acts.entries()) {
                        const actItem = act as { [p: string]: any }
                        switch (actItem.Action) {
                            case ActionType.back:
                                navigate(-1)
                                break;
                            case ActionType.navigate:
                                if (actItem.To) {
                                    if (props.indexItem && regexGetVariables.test(actItem.To)) {
                                        const url = replaceThisVariables(actItem.To)
                                        if (url.includes("https")) window.open(url, "_blank")
                                        else navigate((url.startsWith("/") ? "/" : "") + url.split("/").filter((e: string) => !!e.trim()).join("/"))
                                    } else if (actItem.To.includes("https")) {
                                        window.open(actItem.To, "_blank")
                                    } else {
                                        navigate(actItem.To.startsWith("/") ? actItem.To : `/${actItem.To}`)
                                    }
                                }
                                break;
                            case ActionType.submit:
                                pageAllRefs[actItem.To]?.current?.onSubmit()
                                return;
                            case ActionType.showPopup:
                                const openPopupBtn = document.querySelector(`.open-${actItem.To}`) as any
                                if (openPopupBtn) openPopupBtn.click()
                                return;
                            case ActionType.closePopup:
                                const closePopupBtn = document.querySelector(`.close-${actItem.To}`) as any
                                if (closePopupBtn) closePopupBtn.click()
                                return;
                            case ActionType.setValue:
                                props.methods!.setValue(actItem.NameField, eval(actItem.CaculateValue))
                                return;
                            case ActionType.loadMore:
                                if (pageAllRefs[actItem.loadingId]) {
                                    const cardData = pageAllRefs[actItem.loadingId].current?.data
                                    if (cardData.totalCount && cardData.data.length < cardData.totalCount) {
                                        pageAllRefs[actItem.loadingId].current.getData(Math.floor(cardData.data.length / pageAllRefs[actItem.loadingId].current.controller.size) + 1)
                                    }
                                }
                                return;
                            default:
                                break;
                        }
                    }
                }
                switch (trigger) {
                    case TriggerType.click:
                        if (triggerActions.length) {
                            _props.onClick = () => handleEvent(triggerActions)
                            if (_props.style) _props.style = { ..._props.style, cursor: "pointer" }
                            else _props.style = { cursor: "pointer" }
                        }
                        break;
                    case TriggerType.scrollend:
                        if (triggerActions.length) {
                            _props.onScroll = (ev: any) => {
                                let scrollElement = ev.target as HTMLDivElement
                                if (scrollElement.scrollTop && Math.round(scrollElement.offsetHeight + scrollElement.scrollTop) >= (scrollElement.scrollHeight - 1)) handleEvent(triggerActions)
                            }
                        }
                        break;
                    default:
                        break;
                }
            })
        }
        if (props.style) _props.style = { ..._props.style, ...props.style }
        if (watchForCustomProps?.style) _props.style = { ..._props.style, ...watchForCustomProps.style }
        if (props.className) _props.className = [..._props.className.split(" "), ...props.className.split(" ")].filter((cls, i, arr) => cls.length && arr.indexOf(cls) === i).join(" ")
        if (watchForCustomProps?.className) _props.className = [..._props.className.split(" "), ...watchForCustomProps.className.split(" ")].filter((cls, i, arr) => cls.length && arr.indexOf(cls) === i).join(" ")
        delete _props.action
        if (props.propsData && props.propsData[findId]) var extendProps = props.type === "card" ? (props.propsData[findId] as any)(props.indexItem, props.index, props.methods) : props.propsData[findId]
        if (extendProps) {
            if (extendProps.style) _props.style = { ..._props.style, ...extendProps.style }
            delete extendProps.style
            _props = { ..._props, ...extendProps }
        }
        return _props
    }, [props.item, props.propsData, props.methods, watchForCustomProps])
    const watchForDataValue = useMemo(() => {
        const watchData = props.methods!.watch()
        const tmp: { [p: string]: any } = { rels: watchData["_rels"], cols: watchData["_cols"] }
        const keys = props.item.NameField?.split(".")
        if (keys && keys.length > 1) tmp[`${keys[0]}`] = watchData[`_${keys[0]}`]
        return tmp
    }, [JSON.stringify(props.methods!.watch()), props.item.NameField])
    const dataValue = useMemo(() => {
        if (props.type === "page" || !props.item.NameField?.length || !props.indexItem) return undefined
        const keys = props.item.NameField.split(".")
        if (keys.length > 1) {
            const _rel = watchForDataValue.rels?.find((e: any) => e.TableName === keys[0].replace("Id", "") && e.Name === keys[1])
            if (!_rel) return undefined
            let tmpValue = watchForDataValue[`${keys[0]}`]?.find((e: any) => e && props.indexItem![keys[0]]?.includes(e.Id))?.[keys[1]]
            switch (_rel.DataType) {
                case FEDataType.FILE:
                    tmpValue = tmpValue?.split(",")?.[0]
                    if (tmpValue && (props.item.Type === ComponentType.container || props.item.Type === ComponentType.navLink)) tmpValue = { backgroundImage: `url(${tmpValue.startsWith("http") ? tmpValue : (ConfigData.imgUrlId + tmpValue)})` }
                    break;
                case FEDataType.HTML:
                    tmpValue = { __html: tmpValue }
                    break;
                case FEDataType.MONEY:
                    tmpValue = tmpValue ? Util.money(tmpValue) : undefined
                    break;
                case FEDataType.DATE:
                    tmpValue = tmpValue ? Util.datetoString(new Date(typeof tmpValue === 'string' ? parseInt(tmpValue) : tmpValue)) : undefined
                    break;
                case FEDataType.DATETIME:
                    tmpValue = tmpValue ? Util.datetoString(new Date(typeof tmpValue === 'string' ? parseInt(tmpValue) : tmpValue), "dd/mm/yyyy hh:mm") : undefined
                    break;
                default:
                    if (_rel.Form?.Options?.length) {
                        if (_rel.Form.ComponentType === ComponentType.select1) {
                            tmpValue = _rel.Form.Options.find((e: any) => e.id === tmpValue)?.name ?? tmpValue
                        } else {
                            tmpValue = _rel.Form.Options.filter((e: any) => {
                                switch (_rel.DataType) {
                                    case FEDataType.BOOLEAN:
                                        return tmpValue === e.id || `${tmpValue}` === `${e.id}`
                                    default:
                                        return tmpValue?.includes(e.id);
                                }
                            }).map((e: any) => e.name).join(",")
                        }
                    }
                    break;
            }
            return tmpValue
        } else {
            const _col = watchForDataValue.cols?.find((e: any) => e.Name === props.item.NameField)
            if (!_col) return undefined
            let tmpValue = props.indexItem[props.item.NameField]
            switch (_col.DataType) {
                case FEDataType.FILE:
                    if (tmpValue) {
                        tmpValue = tmpValue?.split(",")?.[0]
                        if (props.item.Type === ComponentType.container || props.item.Type === ComponentType.navLink) tmpValue = { backgroundImage: `url(${tmpValue.startsWith("http") ? tmpValue : (ConfigData.imgUrlId + tmpValue)})` }
                    }
                    break;
                case FEDataType.HTML:
                    tmpValue = { __html: tmpValue }
                    break;
                case FEDataType.MONEY:
                    tmpValue = tmpValue ? Util.money(tmpValue) : undefined
                    break;
                case FEDataType.DATE:
                    tmpValue = tmpValue ? Util.datetoString(new Date(typeof tmpValue === 'string' ? parseInt(tmpValue) : tmpValue)) : undefined
                    break;
                case FEDataType.DATETIME:
                    tmpValue = tmpValue ? Util.datetoString(new Date(typeof tmpValue === 'string' ? parseInt(tmpValue) : tmpValue), "dd/mm/yyyy hh:mm") : undefined
                    break;
                default:
                    if (_col.Form?.Options?.length) {
                        if (_col.Form.ComponentType === ComponentType.select1) {
                            tmpValue = _col.Form.Options.find((e: any) => e.id === tmpValue)?.name ?? tmpValue
                        } else {
                            tmpValue = _col.Form.Options.filter((e: any) => {
                                switch (_col.DataType) {
                                    case FEDataType.BOOLEAN:
                                        return tmpValue === e.id || `${tmpValue}` === `${e.id}`
                                    default:
                                        return tmpValue?.includes(e.id);
                                }
                            }).map((e: any) => e.name).join(",")
                        }
                    }
                    break;
            }
            return tmpValue
        }
    }, [props.indexItem, props.item, watchForDataValue])
    const typeProps = useMemo(() => {
        let tmpProps = { ...customProps }
        if (props.item.NameField && tmpProps.validate?.some((v: any) => v.type === ValidateType.required)) tmpProps.required = true
        switch (props.item.Type) {
            case ComponentType.card:
                if (tmpProps.controller && tmpProps.controller !== "all") {
                    let newController = { ...tmpProps.controller }
                    if (newController.searchRaw && regexGetVariables.test(newController.searchRaw)) {
                        const newSearchRaw = replaceThisVariables(newController.searchRaw)
                        newController.searchRaw = newSearchRaw
                    }
                    if (newController.page && regexGetVariables.test(`${newController.page}`)) {
                        const newPageIndex = replaceThisVariables(`${newController.page}`)
                        newController.page = parseInt(newPageIndex)
                    }
                    if (newController.size && regexGetVariables.test(`${newController.size}`)) {
                        const newPageSize = replaceThisVariables(`${newController.size}`)
                        newController.page = parseInt(newPageSize)
                    }
                    if (newController.ids && regexGetVariables.test(newController.ids)) {
                        if (regexGetVariableByThis.test(newController.ids)) {
                            const relativeModule = regexGetVariableByThis.exec(newController.ids)![1]
                            tmpProps.cardData = (props.methods?.watch(`_${relativeModule}`) ?? []).filter((e: any) => props.indexItem?.[relativeModule]?.includes(e.Id))
                        } else {
                            const getByIds = replaceThisVariables(newController.ids)
                            newController.ids = getByIds
                        }
                    }
                    tmpProps.controller = newController
                }
                break;
            case ComponentType.navLink:
                if (dataValue && dataValue.backgroundImage) tmpProps = { ...customProps, style: { ...customProps.style, ...dataValue } }
                if (tmpProps.to) {
                    if (props.indexItem && regexGetVariables.test(tmpProps.to)) {
                        const url = replaceThisVariables(tmpProps.to)
                        if (url.includes("https")) tmpProps.target = "_blank"
                        tmpProps.to = (url.startsWith("/") ? "/" : "") + url.split("/").filter((e: string) => !!e.trim()).join("/")
                    } else if (tmpProps.to.includes("https")) {
                        tmpProps.target = "_blank"
                    } else {
                        tmpProps.to = tmpProps.to.startsWith("/") ? tmpProps.to : `/${tmpProps.to}`
                    }
                }
                break;
            case ComponentType.text:
                if (regexGetVariables.test(tmpProps.value)) tmpProps.value = replaceThisVariables(tmpProps.value)
                break;
            case ComponentType.button:
            case ComponentType.textField:
            case ComponentType.textArea:
            case ComponentType.select1:
            case ComponentType.selectMultiple:
                if (children.length) {
                    const iconPrefix = children.find(e => e.Setting.type === "prefix")
                    const iconSuffix = children.find(e => e.Setting.type === "suffix")
                    if (iconPrefix) tmpProps.prefix = <RenderLayerElement {...props} item={iconPrefix} style={undefined} className={undefined} />
                    if (iconSuffix) tmpProps.suffix = <RenderLayerElement {...props} item={iconSuffix} style={undefined} className={undefined} />
                }
                if (props.item.Type === ComponentType.textField && props.cols?.find(e => e.Name === props.item.NameField)?.DataType === FEDataType.PASSWORD) tmpProps.IsPassword = true
                break;
            default:
                break;
        }
        return tmpProps
    }, [customProps, props.item.Type, dataValue, children, JSON.stringify(props.methods!.watch()), location])
    const _options = useMemo(() => {
        if (props.item.NameField) {
            const tmpCol = props.cols?.find(e => e.Name === props.item.NameField)
            if (tmpCol) return tmpCol?.Form?.Options
            if (props.options?.[`${props.item.NameField}_Options`]) {
                const tmpRel = props.rels?.find(e => e.Column === props.item.NameField)
                if (tmpRel) return (props.options[`${props.item.NameField}_Options`] ?? []).map(e => ({ id: e.Id, name: e.Name }))
            }
        }
        return undefined
    }, [props.cols, props.rels, props.item.NameField, props.options?.[`${props.item.NameField}_Options`]])

    switch (props.item.Type) {
        case ComponentType.navLink:
            if (props.childrenData && props.childrenData[findId]) var childComponent = props.type === "card" ? (props.childrenData[findId] as any)(props.indexItem, props.index, props.methods) : props.childrenData[findId]
            if (Array.isArray(dataValue)) {
                return dataValue.map((dataValueItem, i) => {
                    const dataValueProps = { ...typeProps }
                    dataValueProps.indexItem = { ...props.indexItem, [props.item.NameField.split(".").length > 1 ? props.item.NameField.split(".")[1] : props.item.NameField]: dataValueItem }
                    return <NavLink key={`${dataValueItem}-${i}`} {...dataValueProps} >
                        {childComponent ??
                            (customProps.className?.includes("layout-body") ?
                                <>
                                    {children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)}
                                    {props.bodyChildren}
                                </> :
                                children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)
                            )}
                    </NavLink>
                })
            } else {
                return <NavLink {...typeProps}>
                    {childComponent ??
                        (customProps.className?.includes("layout-body") ?
                            <>
                                {children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)}
                                {props.bodyChildren}
                            </> :
                            children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)
                        )}
                </NavLink>
            }
        case ComponentType.container:
            if (props.childrenData && props.childrenData[findId]) var childComponent = props.type === "card" ? (props.childrenData[findId] as any)(props.indexItem, props.index, props.methods) : props.childrenData[findId]
            if (dataValue && dataValue.backgroundImage) var containerProps = { ...typeProps, style: { ...typeProps.style, ...dataValue } }
            const dataValueProps = { ...(containerProps ?? typeProps) }
            delete dataValueProps.emptyElement
            delete dataValueProps.onLoaded
            if (!props.item.ParentId && props.type === "form") {
                if (Array.isArray(dataValue)) {
                    return dataValue.map((dataValueItem, i) => {
                        dataValueProps.indexItem = { ...props.indexItem, [props.item.NameField.split(".").length > 1 ? props.item.NameField.split(".")[1] : props.item.NameField]: dataValueItem }
                        return <form key={`${dataValueItem}-${i}`} {...dataValueProps}>
                            {childComponent ??
                                (typeProps.className?.includes("layout-body") ?
                                    <>
                                        {children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)}
                                        {props.bodyChildren}
                                    </> :
                                    children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)
                                )}
                        </form>
                    })
                } else {
                    return <form {...dataValueProps}>
                        {childComponent ??
                            (typeProps.className?.includes("layout-body") ?
                                <>
                                    {children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)}
                                    {props.bodyChildren}
                                </> :
                                children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)
                            )}
                    </form>
                }
            } else if (Array.isArray(dataValue)) {
                return dataValue.map((dataValueItem, i) => {
                    dataValueProps.indexItem = { ...props.indexItem, [props.item.NameField.split(".").length > 1 ? props.item.NameField.split(".")[1] : props.item.NameField]: dataValueItem }
                    return <div key={`${dataValueItem}-${i}`} {...dataValueProps}>
                        {childComponent ??
                            (typeProps.className?.includes("layout-body") ?
                                <>
                                    {children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)}
                                    {props.bodyChildren}
                                </> :
                                children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)
                            )}
                    </div>
                })
            } else {
                return <div {...dataValueProps}>
                    {childComponent ??
                        (typeProps.className?.includes("layout-body") ?
                            <>
                                {children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)}
                                {props.bodyChildren}
                            </> :
                            children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)
                        )}
                </div>
            }
        case ComponentType.text:
            if (props.item.NameField) {
                if (typeof dataValue === "object") return <CustomText {...typeProps} html={dataValue["__html"]} />
                else return <CustomText {...typeProps} value={dataValue} />
            } else return <CustomText {...typeProps} />
        case ComponentType.img:
            if (props.item.NameField && dataValue) {
                return <img
                    key={dataValue}
                    alt=""
                    referrerPolicy="no-referrer"
                    onError={(ev) => { ev.currentTarget.src = "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/outline/development/image-2.svg" }}
                    {...typeProps}
                    src={dataValue.startsWith("http") ? dataValue : (ConfigData.imgUrlId + dataValue)}
                />
            } else return <img
                alt=""
                referrerPolicy="no-referrer"
                onError={(ev) => { ev.currentTarget.src = "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/outline/development/image-2.svg" }}
                {...typeProps}
            />
        case ComponentType.rate:
            if (props.item.NameField) return <Rating {...typeProps} value={dataValue} />
            else return <Rating {...typeProps} />
        case ComponentType.progressBar:
            if (props.item.NameField) return <ProgressBar {...typeProps} progressBarOnly percent={dataValue} />
            else return <ProgressBar {...typeProps} progressBarOnly />
        case ComponentType.progressCircle:
            if (props.item.NameField) return <ProgressCircle {...typeProps} percent={dataValue} />
            return <ProgressCircle {...typeProps} />
        case ComponentType.icon:
            if (dataValue) return <Winicon {...typeProps} src={dataValue} />
            else if (props.item.NameField) return null
            else return <Winicon {...typeProps} />
        case ComponentType.chart:
            return <ChartById {...typeProps} id={typeProps.chartId} />
        case ComponentType.form:
            if (props.itemData) typeProps.itemData = typeProps.itemData ? { ...props.itemData, ...typeProps.itemData } : props.itemData
            if (props.childrenData) typeProps.childrenData = typeProps.childrenData ? { ...props.childrenData, ...typeProps.childrenData } : props.childrenData
            if (props.propsData) typeProps.propsData = typeProps.propsData ? { ...props.propsData, ...typeProps.propsData } : props.propsData
            return <FormById {...typeProps} id={typeProps.formId} ref={pageAllRefs[findId]}
                onSubmit={(ev) => {
                    console.log("????????? ", ev)
                }} />
        case ComponentType.card:
            if (props.itemData) typeProps.itemData = typeProps.itemData ? { ...props.itemData, ...typeProps.itemData } : props.itemData
            if (props.childrenData) typeProps.childrenData = typeProps.childrenData ? { ...props.childrenData, ...typeProps.childrenData } : props.childrenData
            if (props.propsData) typeProps.propsData = typeProps.propsData ? { ...props.propsData, ...typeProps.propsData } : props.propsData
            return <CardById {...typeProps} id={typeProps.cardId} ref={pageAllRefs[findId]} />
        case ComponentType.view:
            if (props.itemData) typeProps.itemData = typeProps.itemData ? { ...props.itemData, ...typeProps.itemData } : props.itemData
            if (props.childrenData) typeProps.childrenData = typeProps.childrenData ? { ...props.childrenData, ...typeProps.childrenData } : props.childrenData
            if (props.propsData) typeProps.propsData = typeProps.propsData ? { ...props.propsData, ...typeProps.propsData } : props.propsData
            return <ViewById {...typeProps} id={typeProps.viewId} />
        case ComponentType.popup:
            typeProps.id = props.item.Id
            return <ActionPopup {...typeProps}>
                {children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)}
            </ActionPopup>
        case ComponentType.button:
            return <SimpleButton {...typeProps} />
        case ComponentType.textField:
            if (typeProps.IsPassword)
                return <FInputPassword
                    {...typeProps}
                    name={props.item.NameField}
                    methods={props.methods}
                />
            else
                return <FTextField
                    {...typeProps}
                    name={props.item.NameField}
                    methods={props.methods}
                />
        case ComponentType.textArea:
            return <FTextArea
                {...typeProps}
                name={props.item.NameField}
                methods={props.methods}
            />
        case ComponentType.radio:
            if (_options?.length) return <FGroupRadioButton {...typeProps} methods={props.methods} name={props.item.NameField} options={_options} />
            else return <FRadioButton {...typeProps} methods={props.methods} name={props.item.NameField} />
        case ComponentType.checkbox:
            if (_options?.length) return <FGroupCheckbox {...typeProps} methods={props.methods} name={props.item.NameField} options={_options} />
            else return <FCheckbox {...typeProps} methods={props.methods} name={props.item.NameField} />
        case ComponentType.switch:
            return <FSwitch {...typeProps} methods={props.methods} name={props.item.NameField} />
        case ComponentType.select1:
            return <FSelect1 {...typeProps} methods={props.methods} name={props.item.NameField} options={_options} />
        case ComponentType.selectMultiple:
            return <FSelectMultiple {...typeProps} methods={props.methods} name={props.item.NameField} options={_options} />
        case ComponentType.colorPicker:
            return <FColorPicker {...typeProps} methods={props.methods} name={props.item.NameField} />
        case ComponentType.numberPicker:
            return <FNumberPicker {...typeProps} methods={props.methods} name={props.item.NameField} />
        case ComponentType.datePicker:
            return <FDateTimePicker {...typeProps} methods={props.methods} name={props.item.NameField} />
        case ComponentType.upload:
            return <FUploadFile
                {...typeProps}
                methods={props.methods}
                name={props.item.NameField}
                simpleStyle
            />
        case ComponentType.ckEditor:
            return <CustomCkEditor5 {...typeProps}
                methods={props.methods}
                extraPlugins={params.ckEditorUploadPlugin ?? [function (editor: { plugins: { get: (arg0: string) => { (): any; new(): any; createUploadAdapter: (loader: any) => CkEditorUploadAdapter; }; }; }) {
                    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
                        return new CkEditorUploadAdapter(loader);
                    };
                }]}
                value={props.methods?.watch(props.item.NameField)}
                onBlur={(_: any, editor: any) => { props.methods?.setValue(props.item.NameField, editor.getData()) }}
            />
        default:
            return <div {...typeProps} />
    }
}

const ActionPopup = ({ id, children }: { id: string, children: ReactNode, className?: string }) => {
    const ref = useRef<any>(null)

    useEffect(() => {
        if (ref.current) ref.current.setState({ ...ref.current.state, content: children })
    }, [children])

    return <>
        <Popup ref={ref} />
        <button hidden type="button" className={`open-${id}`} onClick={() => {
            showPopup({
                ref: ref,
                content: children ?? <div />
            })
        }} />
        <button hidden type="button" className={`close-${id}`} onClick={() => { closePopup(ref) }} />
    </>
}

const CustomText = (props: { type?: "div" | "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6", html?: string, maxLine?: number, className?: string, style?: CSSProperties, value?: string }) => {
    const customProps = useMemo(() => {
        let _props: any = { ...props, style: { ...(props.style ?? {}) } }
        delete _props.value
        _props.style ??= {}
        if (props.maxLine) _props.style['--max-line'] = props.maxLine
        if (props.html) _props.dangerouslySetInnerHTML = { __html: props.html }
        if (props.type && props.type !== "div") _props.className = `comp-text${props.html ? "-innerhtml" : ""} ${props.className ?? ""}`
        else _props.className = props.className
        return _props
    }, [props.html, props.className, props])

    switch (props.type) {
        case "p":
            if (props.html) return <p {...customProps} />
            else return <p {...customProps}>{props.value}</p>
        case "span":
            if (props.html) return <span {...customProps} />
            else return <span {...customProps}>{props.value}</span>
        case "h1":
            if (props.html) return <h1 {...customProps} />
            else return <h1 {...customProps}>{props.value}</h1>
        case "h2":
            if (props.html) return <h2 {...customProps} />
            else return <h2 {...customProps}>{props.value}</h2>
        case "h3":
            if (props.html) return <h3 {...customProps} />
            else return <h3 {...customProps}>{props.value}</h3>
        case "h4":
            if (props.html) return <h4 {...customProps} />
            else return <h4 {...customProps}>{props.value}</h4>
        case "h5":
            if (props.html) return <h5 {...customProps} />
            else return <h5 {...customProps}>{props.value}</h5>
        case "h6":
            if (props.html) return <h6 {...customProps} />
            else return <h6 {...customProps}>{props.value}</h6>
        default:
            return <Text {...customProps}>{props.value}</Text>
    }
}

interface PageByIdProps extends Props {
    id: string,
    /**
     * custom props of layer by id. Ex: { "gid": { style: { width: "60rem", backgroundColor: "red" }, className: "my-class" } }
     * */
    propsData?: { [p: string]: { style?: CSSProperties, className?: string, onClick?: (ev: MouseEventHandler) => void, [p: string]: any } },
    /**
     * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    childrenData?: { [p: string]: ReactNode },
    itemData?: { [p: string]: ReactNode },
}

export const PageById = (props: PageByIdProps) => {
    const methods = useForm({ shouldFocusError: false })
    const [pageItem, setPageItem] = useState<{ [p: string]: any }>()
    const [layout, setLayout] = useState<Array<{ [p: string]: any }>>([])
    const [layers, setLayers] = useState<Array<{ [p: string]: any }>>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!loading) setLoading(true)
        const pageController = new TableController("page")
        pageController.getByListId([props.id]).then(async (res) => {
            if (res.code === 200 && res.data[0]) {
                const thisPage = res.data[0]
                setPageItem(thisPage)
                const layerController = new TableController("layer")
                if (thisPage.LayoutId !== pageItem?.LayoutId) {
                    const resLayer = await Promise.all([
                        layerController.getListSimple({ page: 1, size: 2000, query: `(@Id:{${thisPage.LayoutId}}) | (@LayoutId:{${thisPage.LayoutId}})` }),
                        layerController.getListSimple({ page: 1, size: 1000, query: `@PageId:{${thisPage!.Id}}` })
                    ])
                    if (resLayer[0].code === 200 && resLayer[1].code === 200) {
                        setLayout(resLayer[0].data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting), State: e.State ? JSON.parse(e.State) : undefined })))
                        setLayers(resLayer[1].data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting), State: e.State ? JSON.parse(e.State) : undefined })))
                    }
                } else {
                    const resLayer = await layerController.getListSimple({ page: 1, size: 1000, query: `@PageId:{${thisPage!.Id}}` })
                    if (resLayer.code === 200) setLayers(resLayer.data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting), State: e.State ? JSON.parse(e.State) : undefined })))
                }
                setLoading(false)
            } else setPageItem(undefined)
        })
    }, [props.id])

    return pageItem && !!layout.length ? <RenderPageView
        key={pageItem.LayoutId}
        layers={layout}
        {...props}
        methods={props.methods ?? methods}
    >
        {loading ? <LoadingView /> :
            <RenderPageView key={pageItem.Id} layers={layers} {...props} methods={props.methods ?? methods} bodyId={layout.find(e => e.Setting?.className?.includes("layout-body"))?.Id} />}
    </RenderPageView> : null
}

interface PageByUrlProps extends Props {
    url: string,
    /**
     * custom props of layer by id. Ex: { "gid": { style: { width: "60rem", backgroundColor: "red" }, className: "my-class" } }
     * */
    propsData?: { [p: string]: { ref: any, style?: CSSProperties, className?: string, onClick?: (ev: MouseEventHandler) => void, [p: string]: any } },
    /**
     * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    childrenData?: { [p: string]: ReactNode },
    itemData?: { [p: string]: ReactNode },
}

export const PageByUrl = (props: PageByUrlProps) => {
    const methods = useForm({ shouldFocusError: false })
    const [pageItem, setPageItem] = useState<{ [p: string]: any }>()
    const [layout, setLayout] = useState<Array<{ [p: string]: any }>>([])
    const [layers, setLayers] = useState<Array<{ [p: string]: any }>>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!loading) setLoading(true)
        const pageController = new TableController("page")
        pageController.getListSimple({ page: 1, size: 1, query: `@Url:{${props.url.length ? props.url.replace(/[\-\/]/g, m => ("\\" + m)) : "\\/"}}` }).then(async (res) => {
            if (res.code === 200 && res.data[0]) {
                const thisPage = res.data[0]
                setPageItem(thisPage)
                const layerController = new TableController("layer")
                if (thisPage.LayoutId !== pageItem?.LayoutId) {
                    const resLayer = await Promise.all([
                        layerController.getListSimple({ page: 1, size: 2000, query: `(@Id:{${thisPage.LayoutId}}) | (@LayoutId:{${thisPage.LayoutId}})` }),
                        layerController.getListSimple({ page: 1, size: 1000, query: `@PageId:{${thisPage!.Id}}` })
                    ])
                    if (resLayer[0].code === 200 && resLayer[1].code === 200) {
                        setLayout(resLayer[0].data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting), State: e.State ? JSON.parse(e.State) : undefined })))
                        setLayers(resLayer[1].data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting), State: e.State ? JSON.parse(e.State) : undefined })))
                    }
                } else {
                    const resLayer = await layerController.getListSimple({ page: 1, size: 1000, query: `@PageId:{${thisPage!.Id}}` })
                    if (resLayer.code === 200) setLayers(resLayer.data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting), State: e.State ? JSON.parse(e.State) : undefined })))
                }
                setLoading(false)
            } else setPageItem(undefined)
        })
    }, [props.url])

    return pageItem && !!layout.length ? <RenderPageView
        key={pageItem.LayoutId}
        layers={layout}
        {...props}
        methods={props.methods ?? methods}
    >
        {loading ? <LoadingView /> :
            <RenderPageView key={pageItem.Id} layers={layers} {...props} methods={props.methods ?? methods} bodyId={layout.find(e => e.Setting?.className?.includes("layout-body"))?.Id} />}
    </RenderPageView> : null
}

const LoadingView = () => {
    return <div className="col" style={{ width: "100%", gap: "2rem", padding: "2.4rem" }}>
        {Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton-loading" style={{ height: "16rem" }}></div>)}
    </div>
}