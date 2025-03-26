import { CSSProperties, MouseEventHandler, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { ActionType, ComponentType, FEDataType, TriggerType } from "../da"
import { FormById } from "../form/formById"
import { CardById } from "../card/cardById"
import { ChartById } from "../chart/chartById"
import { TableController } from "../../controller/setting"
import { Text } from "../../component/text/text"
import { Winicon } from "../../component/wini-icon/winicon"
import { Popup } from "../../component/popup/popup"
import { showPopup } from "../../component/popup/popup"
import { closePopup } from "../../component/popup/popup"
import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "../../component/button/button"
import { useForm, UseFormReturn } from "react-hook-form"
import { Util } from "../../controller/utils"
import { ViewById } from "../view/viewById"
import { regexGetVariableByThis, regexUrlWithVariables } from "../card/config"
import { ConfigData } from "../../controller/config"

interface Props {
    /**
     * replace layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
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
    bodyChildren?: ReactNode,
    type?: "page" | "view" | "card",
    propsData?: { [p: string]: { style?: CSSProperties, className?: string, onClick?: (ev: MouseEventHandler) => void, [p: string]: any } } | { [p: string]: (itemData: { [p: string]: any }, index: number) => { style?: CSSProperties, className?: string, onCLick?: (ev: MouseEventHandler) => void, [p: string]: any } },
    itemData?: { [p: string]: ReactNode } | { [p: string]: (indexItem: { [p: string]: any }, index: number) => ReactNode },
    childrenData?: { [p: string]: ReactNode } | { [p: string]: (itemData: { [p: string]: any }, index: number) => ReactNode },
    indexItem?: { [p: string]: any },
    index?: number,
    style?: CSSProperties,
    className?: string
}

export const RenderLayerElement = (props: RenderLayerElementProps) => {
    const navigate = useNavigate()
    const children = useMemo(() => props.list.filter(e => e.ParentId === props.item.Id), [props.list, props.item])
    const customProps = useMemo(() => {
        let _props = { ...props.item.Setting }
        _props.style ??= {}
        _props.className ??= ""
        if (_props.action?.length && Array.isArray(_props.action)) {
            Object.values(TriggerType).forEach(trigger => {
                const triggerActions = _props.action.filter((e: any) => e.Type === trigger)
                switch (trigger) {
                    case TriggerType.click:
                        const _onClick = async (acts = []) => {
                            for (const [i, act] of acts.entries()) {
                                const actItem = act as { [p: string]: any }
                                switch (actItem.Action) {
                                    case ActionType.navigate:
                                        if (actItem.To) {
                                            if (props.indexItem && regexUrlWithVariables.test(actItem.To)) {
                                                const url = actItem.To.replace(regexGetVariableByThis, (m: string) => {
                                                    const execRegex = regexGetVariableByThis.exec(m)
                                                    return props.indexItem && execRegex?.[1] ? props.indexItem[execRegex[1]] : m
                                                })
                                                if (url.includes("https")) window.open(url, "_blank")
                                                else navigate(url.split("/").filter((e: string) => !!e.trim()).join("/"))
                                            } else if (actItem.To.includes("https")) {
                                                window.open(actItem.To, "_blank")
                                            } else {
                                                navigate(actItem.To.startsWith("/") ? actItem.To : `/${actItem.To}`)
                                            }
                                        }
                                        break;
                                    case ActionType.submit:
                                        const formElement = document.getElementById(actItem.To)
                                        const submitBtn = formElement?.querySelector(`:scope > button.submit-form`) as any
                                        const successBtn = formElement?.querySelector(`:scope > button.success-form`) as any
                                        if (submitBtn) {
                                            if (successBtn && triggerActions.slice(i + 1).length) successBtn.onclick = () => _onClick(triggerActions.slice(i + 1))
                                            submitBtn.click()
                                        }
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
                                    default:
                                        break;
                                }
                            }
                        }
                        if (triggerActions.length) {
                            _props.onClick = () => _onClick(triggerActions)
                            if (_props.style) _props.style = { ..._props.style, cursor: "pointer" }
                            else _props.style = { cursor: "pointer" }
                        }
                        break;
                    default:
                        break;
                }
            })
        }
        if (props.style) _props.style = { ..._props.style, ...props.style }
        if (props.className) _props.className = [..._props.className.split(" "), ...props.className.split(" ")].filter((cls, i, arr) => cls.length && arr.indexOf(cls) === i).join(" ")
        delete _props.action
        if (props.propsData && props.propsData[props.item.Id]) _props = props.type === "card" ? { ..._props, ...(props.propsData[props.item.Id] as any)(props.indexItem, props.index) } : { ..._props, ...props.propsData[props.item.Id] }
        return _props
    }, [props.item, props.propsData, props.methods])
    const dataValue = useMemo(() => {
        if (props.type === "page" || !props.item.NameField?.length || !props.indexItem) return undefined
        const keys = props.item.NameField.split(".")
        if (keys.length > 1) {
            const _rel = props.methods!.watch("_rels")?.find((e: any) => e.TableName === keys[0].replace("Id", "") && e.Name === keys[1])
            if (!_rel) return undefined
            let tmpValue = props.methods!.watch(`_${keys[0]}`)?.find((e: any) => props.indexItem![keys[0]]?.includes(e.Id))?.[keys[1]]
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
            const _col = props.methods!.watch("_cols")?.find((e: any) => e.Name === props.item.NameField)
            if (!_col) return undefined
            let tmpValue = props.indexItem[props.item.NameField]
            switch (_col.DataType) {
                case FEDataType.FILE:
                    tmpValue = tmpValue?.split(",")?.[0]
                    if (props.item.Type === ComponentType.container || props.item.Type === ComponentType.navLink) tmpValue = { backgroundImage: `url(${tmpValue.startsWith("http") ? tmpValue : (ConfigData.imgUrlId + tmpValue)})` }
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
    }, [props.indexItem, props.item, props.methods!.watch()])

    // renderUI
    if (props.itemData && props.itemData[props.item.Id]) {
        if (props.type === "card") return (props.itemData[props.item.Id] as any)(props.indexItem, props.index)
        else return props.itemData[props.item.Id]
    } else {
        switch (props.item.Type) {
            case ComponentType.navLink:
                if (props.childrenData) var childComponent = props.type === "card" ? (props.childrenData[props.item.Id] as any)(props.indexItem, props.index) : props.childrenData[props.item.Id]
                return <NavLink {...customProps}>
                    {childComponent ?? children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)}
                </NavLink>
            case ComponentType.container:
                if (props.childrenData) var childComponent = props.type === "card" ? (props.childrenData[props.item.Id] as any)(props.indexItem, props.index) : props.childrenData[props.item.Id]
                if (dataValue && dataValue.backgroundImage) var tmpProps = { ...customProps, style: { ...customProps.style, ...dataValue } }
                return <div {...(tmpProps ?? customProps)}>
                    {childComponent ??
                        (customProps.className?.includes("layout-body") ?
                            <>
                                {children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)}
                                {props.bodyChildren}
                            </> :
                            children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)
                        )}
                </div>
            case ComponentType.text:
                if (dataValue) {
                    if (typeof dataValue === "object") return <Text {...customProps} html={dataValue["__html"]} />
                    else return <Text {...customProps}>{dataValue}</Text>
                } else return <Text {...customProps}>{customProps.value ?? ""}</Text>
            case ComponentType.img:
                if (dataValue) {
                    return <img
                        key={dataValue}
                        alt=""
                        onError={(ev) => { ev.currentTarget.src = "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/outline/multimedia/image.svg" }}
                        {...customProps}
                        src={dataValue.startsWith("http") ? dataValue : (ConfigData.imgUrlId + dataValue)}
                    />
                } else return <img
                    alt=""
                    onError={(ev) => { ev.currentTarget.src = "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/outline/multimedia/image.svg" }}
                    {...customProps}
                />
            case ComponentType.icon:
                return <Winicon {...customProps} />
            case ComponentType.chart:
                return <ChartById {...customProps} id={customProps.chartId} />
            case ComponentType.form:
                return <FormById {...customProps} id={customProps.formId} />
            case ComponentType.card:
                return <CardById {...customProps} id={customProps.cardId} />
            case ComponentType.view:
                return <ViewById {...customProps} id={customProps.viewId} />
            case ComponentType.popup:
                customProps.id = props.item.Id
                return <ActionPopup {...customProps} >
                    {children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} style={undefined} className={undefined} />)}
                </ActionPopup>
            case ComponentType.button:
                let btnProps = { ...customProps }
                if (children.length) {
                    const iconPrefix = children.find(e => e.Setting.type === "prefix")
                    const iconSuffix = children.find(e => e.Setting.type === "suffix")
                    if (iconPrefix) btnProps.prefix = <RenderLayerElement {...props} item={iconPrefix} style={undefined} className={undefined} />
                    if (iconSuffix) btnProps.suffix = <RenderLayerElement {...props} item={iconSuffix} style={undefined} className={undefined} />
                }
                return <Button {...btnProps} />
            default:
                return <div {...customProps} />
        }
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

    useEffect(() => {
        const pageController = new TableController("page")
        pageController.getByListId([props.id]).then(res => {
            if (res.code === 200 && res.data[0]) {
                const thisPage = res.data[0]
                setPageItem(thisPage)
                const layerController = new TableController("layer")
                if (thisPage.LayoutId !== pageItem?.LayoutId) {
                    Promise.all([
                        layerController.getListSimple({ page: 1, size: 2000, query: `(@Id:{${thisPage.LayoutId}}) | (@LayoutId:{${thisPage.LayoutId}})` }),
                        layerController.getListSimple({ page: 1, size: 1000, query: `@PageId:{${thisPage!.Id}}` })
                    ]).then(resLayer => {
                        if (resLayer[0].code === 200 && resLayer[1].code === 200) {
                            setLayout(resLayer[0].data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting) })))
                            setLayers(resLayer[1].data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting) })))
                        }
                    })
                } else {
                    layerController.getListSimple({ page: 1, size: 1000, query: `@PageId:{${thisPage!.Id}}` }).then(resLayer => {
                        if (resLayer.code === 200) setLayers(resLayer.data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting) })))
                    })
                }
            } else setPageItem(undefined)
        })
    }, [props.id])

    return pageItem && !!layout.length ? <RenderPageView
        key={pageItem.LayoutId}
        layers={layout}
        {...props}
        methods={props.methods ?? methods}
    >
        <RenderPageView layers={layers} {...props} methods={props.methods ?? methods} bodyId={layout.find(e => e.Setting?.className?.includes("layout-body"))?.Id} />
    </RenderPageView> : null
}

interface PageByUrlProps extends Props {
    url: string,
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

export const PageByUrl = (props: PageByUrlProps) => {
    const methods = useForm({ shouldFocusError: false })
    const [pageItem, setPageItem] = useState<{ [p: string]: any }>()
    const [layout, setLayout] = useState<Array<{ [p: string]: any }>>([])
    const [layers, setLayers] = useState<Array<{ [p: string]: any }>>([])

    useEffect(() => {
        const pageController = new TableController("page")
        pageController.getListSimple({ page: 1, size: 1, query: `@Url:{${props.url.length ? props.url.replace(/\//g, "\\/") : "\\/"}}` }).then(res => {
            if (res.code === 200 && res.data[0]) {
                const thisPage = res.data[0]
                setPageItem(thisPage)
                const layerController = new TableController("layer")
                if (thisPage.LayoutId !== pageItem?.LayoutId) {
                    Promise.all([
                        layerController.getListSimple({ page: 1, size: 2000, query: `(@Id:{${thisPage.LayoutId}}) | (@LayoutId:{${thisPage.LayoutId}})` }),
                        layerController.getListSimple({ page: 1, size: 1000, query: `@PageId:{${thisPage!.Id}}` })
                    ]).then(resLayer => {
                        if (resLayer[0].code === 200 && resLayer[1].code === 200) {
                            setLayout(resLayer[0].data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting) })))
                            setLayers(resLayer[1].data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting) })))
                        }
                    })
                } else {
                    layerController.getListSimple({ page: 1, size: 1000, query: `@PageId:{${thisPage!.Id}}` }).then(resLayer => {
                        if (resLayer.code === 200) setLayers(resLayer.data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting) })))
                    })
                }
            } else setPageItem(undefined)
        })
    }, [props.url])

    return pageItem && !!layout.length ? <RenderPageView
        key={pageItem.LayoutId}
        layers={layout}
        {...props}
        methods={props.methods ?? methods}
    >
        <RenderPageView key={pageItem.Id} layers={layers} {...props} methods={props.methods ?? methods} bodyId={layout.find(e => e.Setting?.className?.includes("layout-body"))?.Id} />
    </RenderPageView> : null
}