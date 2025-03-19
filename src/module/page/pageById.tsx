import { CSSProperties, MouseEventHandler, ReactNode, useEffect, useRef, useState } from "react"
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
    itemData?: { [p: string]: ReactNode }
}

interface RenderPageProps extends Props {
    layers: Array<{ [p: string]: any }>,
    children?: ReactNode
}

const RenderPageView = ({ childrenData, propsData, itemData, layers = [], children }: RenderPageProps) => {
    const navigate = useNavigate()
    const renderPageView = (item: { [p: string]: any }, list: Array<{ [p: string]: any }> = []) => {
        if (itemData?.[item.Id]) return itemData[item.Id]
        const childrenLayers = list.filter(e => e.ParentId === item.Id)
        let _props = { ...item.Setting }
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
        if (propsData && propsData[item.Id]) _props = { ..._props, ...propsData[item.Id] }
        switch (item.Type) {
            case ComponentType.navLink:
                if (childrenData) var childComponent = childrenData[item.Id]
                return <NavLink key={item.Id} {..._props}>
                    {childComponent ??
                        (
                            item.Setting?.className?.includes("layout-body") ?
                                children :
                                childrenLayers.map(e => renderPageView(e, list))
                        )}
                </NavLink>
            case ComponentType.container:
                if (childrenData) var childComponent = childrenData[item.Id]
                return <div key={item.Id} {..._props}>
                    {childComponent ??
                        (
                            item.Setting?.className?.includes("layout-body") ?
                                children :
                                childrenLayers.map(e => renderPageView(e, list))
                        )}
                </div>
            case ComponentType.text:
                return <Text key={item.Id} {..._props}>{item.Setting?.value ?? ""}</Text>
            case ComponentType.img:
                return <img
                    key={item.Id}
                    alt=""
                    onError={(ev) => { ev.currentTarget.src = "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/color/multimedia/image.svg" }}
                    {..._props}
                />
            case ComponentType.icon:
                return <Winicon key={item.Id} {..._props} />
            case ComponentType.chart:
                return <ChartById key={item.Id} {..._props} id={_props.chartId} />
            case ComponentType.form:
                return <FormById key={item.Id} id={item.Id} {..._props} />
            case ComponentType.card:
                return <CardById key={item.Id} {..._props} id={_props.cardId} />
            case ComponentType.popup:
                _props.id = item.Id
                return <ActionPopup key={item.Id} {..._props} >
                    {childrenLayers.map(e => renderPageView(e, list))}
                </ActionPopup>
            case ComponentType.button:
                if (childrenLayers.length) {
                    const iconPrefix = childrenLayers.find(e => e.Setting.type === "prefix")
                    const iconSuffix = childrenLayers.find(e => e.Setting.type === "suffix")
                    if (iconPrefix) _props.prefix = renderPageView(iconPrefix, list)
                    if (iconSuffix) _props.suffix = renderPageView(iconSuffix, list)
                }
                return <Button key={item.Id} {..._props} />
            default:
                return <div key={item.Id} {..._props} />
        }
    }

    return layers.filter(e => !e.ParentId).map(e => renderPageView(e, layers))
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
    id: string
}

export const PageById = (props: PageByIdProps) => {
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
    >
        <RenderPageView layers={layers} {...props} />
    </RenderPageView> : null
}

interface PageByUrlProps extends Props {
    url: string
}

export const PageByUrl = (props: PageByUrlProps) => {
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
    >
        <RenderPageView key={pageItem.Id} layers={layers} {...props} />
    </RenderPageView> : null
}