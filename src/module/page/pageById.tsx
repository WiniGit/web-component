import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react"
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

interface Props {
    /**
     * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    childrenData?: { [p: string]: ReactNode },
    /**
     * custom style layer by id. Ex: { "gid": { width: "60rem", backgroundColor: "red" } }
     * */
    styleData?: { [p: string]: CSSProperties },
    /**
     * replace layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    itemData?: { [p: string]: ReactNode }
}

interface RenderPageProps extends Props {
    layers: Array<{ [p: string]: any }>,
    children?: ReactNode
}

const RenderPageView = ({ childrenData, styleData, itemData, layers = [], children }: RenderPageProps) => {
    const renderPageView = (item: { [p: string]: any }, list: Array<{ [p: string]: any }> = []) => {
        if (itemData?.[item.Id]) return itemData[item.Id]
        const childrenLayers = list.filter(e => e.ParentId === item.Id)
        let _props = { ...item.Setting }
        _props.style ??= {}
        if (styleData && styleData[item.Id]) _props.style = { ..._props.style, ...styleData[item.Id] }
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
                                                const navLink = document.createElement("a")
                                                navLink.href = `/${actItem.To}`
                                                navLink.click()
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
        switch (item.Type) {
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
                _props.id = item.Id
                return <ChartById key={item.Id} {..._props} />
            case ComponentType.form:
                _props.id = item.Id
                return <FormById key={item.Id} {..._props} />
            case ComponentType.card:
                _props.id = item.Id
                return <CardById key={item.Id} {..._props} />
            case ComponentType.popup:
                _props.id = item.Id
                return <ActionPopup key={item.Id} {..._props} >
                    {childrenLayers.map(e => renderPageView(e, list))}
                </ActionPopup>
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
    const [data, setData] = useState<{ layout: Array<{ [p: string]: any }>, layers: Array<{ [p: string]: any }> }>()

    useEffect(() => {
        const pageController = new TableController("page")
        pageController.getByListId([props.id]).then(res => {
            if (res.code === 200) setPageItem(res.data[0])
            else setPageItem(undefined)
        })
    }, [props.id])

    const getData = async () => {
        const layoutId = pageItem!.LayoutId
        const layerController = new TableController("layer")
        const res = await Promise.all([
            layerController.getListSimple({ page: 1, size: 2000, query: `(@Id:{${layoutId}}) | (@LayoutId:{${layoutId}})` }),
            layerController.getListSimple({ page: 1, size: 5000, query: `@PageId:{${pageItem!.Id}}` })
        ])
        if (res[0].code === 200 && res[1].code === 200) setData({
            layout: res[0].data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting) })),
            layers: res[1].data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting) })),
        })
    }

    useEffect(() => {
        if (pageItem) getData()
        else if (data) setData(undefined)
    }, [pageItem])

    return pageItem && data ? <RenderPageView
        key={pageItem.LayoutId}
        layers={data.layout}
        {...props}
    >
        <RenderPageView layers={data.layers} {...props} />
    </RenderPageView> : null
}

interface PageByUrlProps extends Props {
    url: string
}

export const PageByUrl = (props: PageByUrlProps) => {
    const [pageItem, setPageItem] = useState<{ [p: string]: any }>()
    const [data, setData] = useState<{ layout: Array<{ [p: string]: any }>, layers: Array<{ [p: string]: any }> }>()

    useEffect(() => {
        const pageController = new TableController("page")
        pageController.getListSimple({ page: 1, size: 1, query: `@Url:{${props.url.length && props.url !== "/" ? props.url : "\\/"}}` }).then(res => {
            if (res.code === 200) setPageItem(res.data[0])
            else setPageItem(undefined)
        })
    }, [props.url])

    const getData = async () => {
        const layoutId = pageItem!.LayoutId
        const layerController = new TableController("layer")
        const res = await Promise.all([
            layerController.getListSimple({ page: 1, size: 2000, query: `(@Id:{${layoutId}}) | (@LayoutId:{${layoutId}})` }),
            layerController.getListSimple({ page: 1, size: 1000, query: `@PageId:{${pageItem!.Id}}` })
        ])
        if (res[0].code === 200 && res[1].code === 200) setData({
            layout: res[0].data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting) })),
            layers: res[1].data.map((e: any) => ({ ...e, Setting: JSON.parse(e.Setting) })),
        })
    }

    useEffect(() => {
        if (pageItem) getData()
        else if (data) setData(undefined)
    }, [pageItem])

    return pageItem && data ? <RenderPageView
        key={pageItem.LayoutId}
        layers={data.layout}
        {...props}
    >
        <RenderPageView layers={data.layers} {...props} />
    </RenderPageView> : null
}