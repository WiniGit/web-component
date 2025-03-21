import { CSSProperties, MouseEventHandler, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { ActionType, ComponentType, TriggerType } from "../da"
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

interface Props {
    /**
     * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    childrenData?: { [p: string]: ReactNode },
    /**
     * custom props of layer by id. Ex: { "gid": { style: { width: "60rem", backgroundColor: "red" }, className: "my-class" } }
     * */
    propsData?: { [p: string]: { style?: CSSProperties, className?: string, onCLick?: (ev: MouseEventHandler) => void, [p: string]: any } },
    /**
     * replace layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    itemData?: { [p: string]: ReactNode },
    methods: UseFormReturn
}

interface RenderPageProps extends Props {
    layers: Array<{ [p: string]: any }>,
    bodyId?: string
    children?: ReactNode
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
    />)
}

interface RenderLayerElementProps extends Props {
    item: { [p: string]: any },
    list: Array<{ [p: string]: any }>,
    bodyChildren?: ReactNode,
}

const RenderLayerElement = (props: RenderLayerElementProps) => {
    const navigate = useNavigate()
    const children = useMemo(() => props.list.filter(e => e.ParentId === props.item.Id), [props.list, props.item])
    const customProps = useMemo(() => {
        let _props = { ...props.item.Setting }
        _props.style ??= {}
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
                                            if (actItem.To.includes("https")) window.open(actItem.To, "_blank")
                                            else {
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
                                        props.methods.setValue(actItem.NameField, eval(actItem.CaculateValue))
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
        delete _props.action
        if (props.propsData && props.propsData[props.item.Id]) _props = { ..._props, ...props.propsData[props.item.Id] }
        return _props
    }, [props.item, props.propsData, props.methods])

    // renderUI
    if (props.itemData?.[props.item.Id]) return props.itemData[props.item.Id]
    else {
        switch (props.item.Type) {
            case ComponentType.navLink:
                if (props.childrenData) var childComponent = props.childrenData[props.item.Id]
                return <NavLink {...customProps}>
                    {childComponent ?? children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} />)}
                </NavLink>
            case ComponentType.container:
                if (props.childrenData) var childComponent = props.childrenData[props.item.Id]
                return <div {...customProps}>
                    {childComponent ??
                        (
                            customProps.className?.includes("layout-body") ?
                                <>
                                    {children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} />)}
                                    {props.bodyChildren}
                                </> :
                                children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} />)
                        )}
                </div>
            case ComponentType.text:
                return <Text {...customProps}>{customProps.value ?? ""}</Text>
            case ComponentType.img:
                return <img
                    alt=""
                    onError={(ev) => { ev.currentTarget.src = "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/color/multimedia/image.svg" }}
                    {...customProps}
                />
            case ComponentType.icon:
                return <Winicon {...customProps} />
            case ComponentType.chart:
                return <ChartById {...customProps} id={customProps.chartId} />
            case ComponentType.form:
                return <FormById id={props.item.Id} {...customProps} />
            case ComponentType.card:
                return <CardById {...customProps} id={customProps.cardId} />
            case ComponentType.popup:
                customProps.id = props.item.Id
                return <ActionPopup {...customProps} >
                    {children.map(e => <RenderLayerElement key={e.Id} {...props} item={e} />)}
                </ActionPopup>
            case ComponentType.button:
                let btnProps = { ...customProps }
                if (children.length) {
                    const iconPrefix = children.find(e => e.Setting.type === "prefix")
                    const iconSuffix = children.find(e => e.Setting.type === "suffix")
                    if (iconPrefix) btnProps.prefix = <RenderLayerElement {...props} item={iconPrefix} />
                    if (iconSuffix) btnProps.suffix = <RenderLayerElement {...props} item={iconSuffix} />
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
    method?: UseFormReturn
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
        methods={props.method ?? methods}
    >
        <RenderPageView layers={layers} {...props} methods={props.method ?? methods} bodyId={layout.find(e => e.Setting?.className?.includes("layout-body"))?.Id} />
    </RenderPageView> : null
}

interface PageByUrlProps extends Props {
    url: string,
    method?: UseFormReturn
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
        methods={props.method ?? methods}
    >
        <RenderPageView key={pageItem.Id} layers={layers} {...props} methods={props.method ?? methods} bodyId={layout.find(e => e.Setting?.className?.includes("layout-body"))?.Id} />
    </RenderPageView> : null
}