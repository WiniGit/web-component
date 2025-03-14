import { CSSProperties, ReactNode, useEffect, useMemo, useState } from "react"
import { DataController, SettingDataController } from "../../controller/data"
import { useForm, UseFormReturn } from "react-hook-form"
import { TableController } from "../../controller/setting"
import { ActionType, ComponentType, FEDataType, TriggerType } from "../da"
import { BaseDA, ConfigData } from "../../controller/config"
import { regexGetVariableByThis, regexUrlWithVariables } from "./config"
import { Util } from "../../controller/utils"
import { Text } from "../../component/text/text"
import { Winicon } from "../../component/wini-icon/winicon"

interface Props {
    /**
    * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
    * */
    childrenData?: { [p: string]: (itemData: { [p: string]: any }, index: number) => ReactNode },
    /**
     * custom style layer by id. Ex: { "gid": { width: "60rem", backgroundColor: "red" } }
     * */
    styleData?: { [p: string]: CSSProperties },
    /**
     * replace layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    itemData?: { [p: string]: (indexItem: { [p: string]: any }, index: number) => ReactNode },
    /**
     * json object data. Ex: {Id: 1, Name: "Example", ...}
     * */
    cardData?: { [p: string]: any },
    style?: CSSProperties,
    className?: string,
    controller?: "all" | { page: number, size: number, searchRaw?: string, filter?: string, sortby?: Array<{ prop: string, direction?: "ASC" | "DESC" }>, loadmore?: boolean },
}

interface RenderCardProps extends Props {
    layers: Array<{ [p: string]: any }>,
    cardItem: { [p: string]: any },
}

function RenderCard({ layers = [], cardItem, style, className, cardData, controller = "all", childrenData, styleData, itemData }: RenderCardProps) {
    const methods = useForm({ shouldFocusError: false })
    const [data, setData] = useState<{ data: Array<{ [p: string]: any }>, totalCount?: number }>({ data: [], totalCount: undefined })
    const [_rels, setRels] = useState<Array<{ [p: string]: any }>>([])
    const [_cols, setCols] = useState<Array<{ [p: string]: any }>>([])

    const mapRelativeData = async () => {
        const _relController = new TableController("rel")
        const _rels = await _relController.getListSimple({ page: 1, size: 100, query: `@TableFK:{${cardItem.TbName}}` })
        if (_rels.code === 200) setRels(_rels.data)
    }

    const mapColumnData = async () => {
        const _colController = new TableController("column")
        const _colRes = await _colController.getListSimple({ page: 1, size: 200, query: `@TableName:{${cardItem.TbName}}` })
        if (_colRes.code === 200) setCols(_colRes.data)
    }

    useEffect(() => {
        if (cardItem?.TbName) {
            mapRelativeData()
            mapColumnData()
        } else {
            if (_cols.length) setCols([])
            if (_rels.length) setRels([])
        }
    }, [cardItem?.TbName])

    const getData = async () => {
        const dataController = new DataController(cardItem.TbName)
        let tmp;
        if (cardData) {
            tmp = { data: [cardData], totalCount: 1 }
        } else if (controller === "all") {
            const res = await dataController.getAll()
            if (res.code === 200) tmp = { data: res.data, totalCount: res.data.length }
        } else {
            const res = await dataController.aggregateList({ page: controller.page, size: controller.size, searchRaw: controller.searchRaw ?? "*", filter: controller.filter, sortby: controller.sortby })
            if (res.code === 200) tmp = { data: res.data, totalCount: res.totalCount }
        }
        if (!tmp) return undefined
        const colFiles = _cols.filter(e => e.DataType === FEDataType.FILE).map(e => e.Name)
        if (colFiles.length) {
            if (typeof controller !== "string" && controller.loadmore) {
                const currentFiles = methods.getValues("_files") ?? []
                const _tmpFileIds = tmp.data.map((e: any) => colFiles.map(c => e[c]?.split(","))).flat(Infinity).filter((id: string) => id?.length && currentFiles.every((f: any) => f.Id !== id) && !id.startsWith("http"))
                BaseDA.getFilesInfor(_tmpFileIds).then(f => {
                    if (f.code === 200) methods.setValue("_files", [...currentFiles, ...f.data.filter((e: any) => !!e)])
                })
            } else {
                const _tmpFileIds = tmp.data.map((e: any) => colFiles.map(c => e[c]?.split(","))).flat(Infinity).filter((id: string) => id?.length && !id.startsWith("http"))
                BaseDA.getFilesInfor(_tmpFileIds).then(f => {
                    if (f.code === 200) methods.setValue("_files", f.data.filter((e: any) => !!e))
                })
            }
        }
        setData(tmp)
    }

    useEffect(() => {
        if (_cols.length) getData()
        else if (data.totalCount) setData({ data: [], totalCount: 0 })
    }, [cardData, cardItem?.TbName, _cols.length, controller])

    return !!data.totalCount && data.data.map((item, i) => {
        return <RenderCardByLayers
            key={item.Id}
            index={i}
            indexItem={item}
            layers={layers}
            cols={_cols}
            className={className}
            style={style}
            methods={methods}
            childrenData={childrenData}
            itemData={itemData}
            styleData={styleData}
        />
    })
}

interface RenderDetailProps {
    layers: Array<{ [p: string]: any }>,
    cols?: Array<{ [p: string]: any }>,
    className?: string,
    style?: CSSProperties,
    methods: UseFormReturn<any>,
    childrenData?: { [p: string]: (itemData: { [p: string]: any }, index: number) => ReactNode },
    styleData?: { [p: string]: CSSProperties },
    itemData?: { [p: string]: (indexItem: { [p: string]: any }, index: number) => ReactNode },
    indexItem: { [p: string]: any },
    index: number,
}

interface RenderCardByLayersProps extends RenderDetailProps {
    parentId?: string,
}

const RenderCardByLayers = (props: RenderCardByLayersProps) => {
    return props.layers.filter(e => e.ParentId === props.parentId).map(e => {
        return <RenderComponentByLayer
            {...props}
            key={e.Id}
            item={e}
        />
    })
}

interface RenderComponentByLayerProps extends RenderDetailProps {
    item: { [p: string]: any },
}

const RenderComponentByLayer = (props: RenderComponentByLayerProps) => {
    const customProps = useMemo(() => {
        let _props = { ...props.item.Setting }
        _props.style ??= {}
        if (props.styleData && props.styleData[props.item.Id]) _props.style = { ..._props.style, ...props.styleData[props.item.Id] }
        if (props.style && !props.item.ParentId) _props.style = { ..._props.style, ...props.style }
        if (props.className?.length && !props.item.ParentId) _props.className = [..._props.className.split(" "), ...props.className.split(" ")].filter(e => !!e.trim()).join(" ")
        if (_props.action && Array.isArray(_props.action)) {
            Object.values(TriggerType).forEach(trigger => {
                const triggerActions = _props.action.filter((e: any) => e.Type === trigger)
                switch (trigger) {
                    case TriggerType.click:
                        const _onClick = async (acts = []) => {
                            for (const [_, act] of acts.entries()) {
                                const actItem = act as { [p: string]: any }
                                switch (actItem.Action) {
                                    case ActionType.navigate:
                                        if (actItem.To) {
                                            if (regexUrlWithVariables.test(actItem.To)) {
                                                const url = actItem.To.replace(regexGetVariableByThis, (m: string) => props.indexItem ? props.indexItem[regexGetVariableByThis.exec(m)![1]] : m)
                                                if (url.includes("https")) window.open(url, "_blank")
                                                else {
                                                    const navLink = document.createElement("a")
                                                    navLink.href = url
                                                    navLink.click()
                                                }
                                            } if (actItem.To.includes("https")) window.open(actItem.To, "_blank")
                                            else {
                                                const navLink = document.createElement("a")
                                                navLink.href = `/${actItem.To}`
                                                navLink.click()
                                            }
                                        }
                                        break;
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
        return _props
    }, [props.style, props.className, props.indexItem, props.item])
    const dataValue: any = useMemo(() => {
        if (!props.indexItem || !props.cols?.length) return undefined
        const _col = props.cols?.find(e => e.Name === props.item.NameField || e.Column === props.item.NameField)
        if (!_col) return undefined
        if (_col.Column) {

        } else {
            let tmpValue = props.indexItem[props.item.NameField]
            switch (_col.DataType) {
                case FEDataType.FILE:
                    tmpValue = props.methods.watch("_files")?.filter((f: any) => tmpValue.includes(f.Id))
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
    }, [props.indexItem, props.item, props.cols, props.methods.watch("_files")])

    if (props.itemData && props.itemData[props.item.Id]) {
        return props.itemData[props.item.Id](props.indexItem, props.index)
    } else {
        switch (props.item.Type) {
            case ComponentType.container:
                return <div {...customProps}>
                    {(props.childrenData && props.childrenData[props.item.Id]) ?
                        props.childrenData[props.item.Id](props.indexItem, props.index) :
                        <RenderCardByLayers
                            {...props}
                            layers={props.layers}
                            parentId={props.item.Id}
                        />}
                </div>
            case ComponentType.text:
                if (dataValue && typeof dataValue !== "string" && dataValue?.["__html"]) return <Text {...customProps} html={dataValue["__html"]} />
                else {
                    return <Text {...customProps}>{dataValue ?? props.item.Setting?.value ?? ""}</Text>
                }
            case ComponentType.icon:
                return <Winicon {...({ ...customProps, src: dataValue ?? customProps.src })} />
            case ComponentType.img:
                return (dataValue && Array.isArray(dataValue)) ?
                    dataValue.map((e: any) => {
                        const eProps = { ...customProps, src: ConfigData.imgUrlId + e.Id }
                        return <img
                            key={e.Id}
                            alt=""
                            {...eProps}
                            onError={(ev) => { ev.currentTarget.src = "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/color/multimedia/image.svg" }}
                        />
                    }) :
                    <img alt="" {...customProps}
                        onError={(ev) => { ev.currentTarget.src = "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/color/multimedia/image.svg" }}
                    />
            default:
                return <div {...customProps} />
        }
    }

}

interface CardProps extends Props {
    id: string
}

export const CardById = (props: CardProps) => {
    const [cardItem, setCardItem] = useState<{ [p: string]: any }>()

    useEffect(() => {
        if (props.id) {
            const _settingDataController = new SettingDataController("card")
            _settingDataController.getByIds([props.id]).then(async (res) => {
                if (res.code === 200) {
                    let _cardItem = res.data[0]
                    if (_cardItem.Props && typeof _cardItem.Props === "string") _cardItem.Props = JSON.parse(_cardItem.Props)
                    setCardItem(_cardItem)
                }
            })
        } else if (cardItem) setCardItem(undefined)
    }, [props.id])

    return cardItem ? <RenderCard
        key={cardItem.Id}
        {...props}
        cardItem={cardItem}
        layers={cardItem.Props}
    /> : null
}