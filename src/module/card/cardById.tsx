import { CSSProperties, MouseEventHandler, ReactNode, useEffect, useMemo, useState } from "react"
import { DataController, SettingDataController } from "../../controller/data"
import { useForm, UseFormReturn } from "react-hook-form"
import { TableController } from "../../controller/setting"
import { EmptyPage } from "../../component/empty-page"
import { RenderLayerElement } from "../page/pageById"
import { regexEmptyKeyController, regexGetVariableByThis, replaceEmptyKeyController } from "./config"
import { ComponentType } from "../da"

interface Props {
    /**
    * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
    * */
    childrenData?: { [p: string]: (itemData: { [p: string]: any }, index: number) => ReactNode },
    /**
     * custom props of layer by id. Ex: { "gid": { style: { width: "60rem", backgroundColor: "red" }, className: "my-class" } }
     * */
    propsData?: { [p: string]: (itemData: { [p: string]: any }, index: number) => { style?: CSSProperties, className?: string, onCLick?: (ev: MouseEventHandler) => void, [p: string]: any } },
    /**
     * replace layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    itemData?: { [p: string]: (indexItem: { [p: string]: any }, index: number) => ReactNode },
    /**
     * list json object data. Ex: {Id: 1, Name: "Example", ...}
     * */
    cardData?: Array<{ [p: string]: any }>,
    style?: CSSProperties,
    className?: string,
    controller?: "all" | { page: number, size: number, searchRaw?: string, filter?: string, sortby?: Array<{ prop: string, direction?: "ASC" | "DESC" }> } | { ids: string, maxLength?: number | "none" },
    loadMore?: boolean,
    methods?: UseFormReturn,
    emptyLink?: string
}

interface RenderCardProps extends Props {
    layers: Array<{ [p: string]: any }>,
    cardItem: { [p: string]: any },
    indexItem: { [p: string]: any },
    index: number,
}

interface CardProps extends Props {
    id: string,
    methods?: UseFormReturn,
    data: { [p: string]: any },
    onLoaded?: (ev: { data: Array<{ [p: string]: any }>, totalCount: number }) => void
}

export const CardById = (props: CardProps) => {
    const methods = useForm({ shouldFocusError: false })
    const [cardItem, setCardItem] = useState<{ [p: string]: any }>()
    const layers = useMemo(() => cardItem?.Props ?? [], [cardItem])
    const _colController = new TableController("column")
    const _relController = new TableController("rel")
    const keyNames = useMemo<Array<string>>(() => layers.filter((e: any) => e.NameField?.length).map((e: any) => e.NameField), [layers.length])
    const controller = useMemo<any>(() => {
        if (!props.controller) return { page: 1, size: 8, searchRaw: "*" }
        return props.controller
    }, [props.controller])
    const [data, setData] = useState<{ data: Array<{ [p: string]: any }>, totalCount?: number }>({ data: [], totalCount: undefined })

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

    const mapRelativeData = async () => {
        const relKeys = keyNames.filter((e: string) => e.split(".").length > 1)
        const _rels = await _relController.getListSimple({
            page: 1, size: 100,
            query: `@TableFK:{${cardItem!.TbName}} @Column:{${relKeys.map((e: any) => e.split(".")[0]).filter((k: string, i: number, arr: Array<string>) => arr.indexOf(k) === i).join(" | ")}}`,
            returns: ["Id", "Column", "TablePK"]
        })
        if (_rels.code === 200) {
            const relRes = await _colController.getListSimple({
                page: 1, size: _rels.data.length * 50,
                query: `@TableName:{${_rels.data.map((e: any) => e.TablePK).join(" | ")}} @Name:{${_rels.data.map((relItem: any) => {
                    const relKeyFilter = relKeys.filter((e: any) => e.split(".")[0] === relItem.Column).map((e: any) => e.split(".")[1])
                    return relKeyFilter
                }).flat(Infinity).join(" | ")}}`
            })
            if (relRes.code === 200) methods.setValue("_rels", relRes.data)
        }
    }

    const mapColumnData = async () => {
        const _colRes = await _colController.getListSimple({ page: 1, size: 200, query: `@TableName:{${cardItem!.TbName}} @Name:{${keyNames.filter((e: string) => e.split(".").length === 1).join(" | ")}}` })
        if (_colRes.code === 200) methods.setValue("_cols", _colRes.data)
    }

    const getData = async (page?: number) => {
        const dataController = new DataController(cardItem!.TbName)
        let tmp = undefined;
        if (props.data) {
            tmp = { data: [props.data], totalCount: 1 }
        } else if (controller === "all") {
            const res = await dataController.getAll()
            if (res.code === 200) tmp = { data: res.data, totalCount: res.data.length }
        } else if (controller.searchRaw) {
            const tmpController = { ...controller, searchRaw: controller!.searchRaw ?? "*" }
            if (page) tmpController.page = page
            const res = await dataController.aggregateList(tmpController)
            if (res.code === 200) tmp = { data: page ? [...data.data, ...res.data] : res.data, totalCount: res.totalCount }
        } else { // get by ids
            let listIds = controller.ids.split(",")
            if (controller.maxLength && controller.maxLength !== "none") listIds = listIds.slice(0, controller.maxLength)
            const res = await dataController.getByListId(listIds)
            const listData = res.data.filter((e: any) => e !== undefined && e !== null)
            if (res.code === 200) tmp = { data: listData, totalCount: listData.length }
        }
        if (!tmp) return undefined
        let relKeys = layers.filter((e: any) => e.Type === ComponentType.card && e.Setting.controller.ids && regexGetVariableByThis.test(e.Setting.controller.ids)).map((e: any) => regexGetVariableByThis.exec(e.Setting.controller.ids)![1])
        relKeys.push(...keyNames.filter((e: string) => e.split(".").length > 1).map((e: string) => e.split(".")[0]))
        relKeys = relKeys.filter((e: string, i: number, arr: Array<string>) => arr.indexOf(e) === i)
        if (relKeys.length) {
            for (const k of relKeys) {
                const currentTmp = methods.getValues(`_${k}`) ?? []
                const dataController = new DataController(k.replace("Id", ""))
                const relDataIds = tmp.data.map((e: any) => e[k]?.split(",")).flat(Infinity).filter((e: string | undefined, i: number, arr: Array<string>) => e?.length && currentTmp.every((el: any) => el.Id !== e) && arr.indexOf(e) === i)
                if (relDataIds.length) {
                    dataController.getByListId(relDataIds).then(relRes => {
                        if (relRes.code === 200) methods.setValue(`_${k}`, [...currentTmp, ...relRes.data.filter((e: any) => e !== undefined && e !== null)])
                    })
                }
            }
        }
        setData(tmp)
        if (props.onLoaded) props.onLoaded(tmp)
    }

    useEffect(() => {
        if (keyNames.length) {
            mapColumnData()
            mapRelativeData()
        }
    }, [keyNames])

    useEffect(() => {
        if (cardItem) {
            if (controller && !props.cardData) {
                getData()
            } else if (props.cardData) {
                setData({ data: props.cardData, totalCount: props.cardData.length })
            }
        }
    }, [cardItem, controller, props.cardData?.length])

    useEffect(() => {
        if (props.loadMore && controller && controller !== "all" && data.totalCount && data.data.length < data.totalCount) getData(Math.floor(data.data.length / controller.size) + 1)
    }, [props.loadMore, controller, data])

    return cardItem ? data.totalCount === 0 ?
        props.emptyLink ? <EmptyPage
            imgUrl={props.emptyLink}
            imgStyle={{ maxWidth: "16.4rem" }}
            style={props.style}
            title="There are no data found."
        /> : null :
        data.data.map((item, index) => {
            return <RenderCard
                key={item.Id}
                {...props}
                cardItem={cardItem}
                layers={layers}
                methods={methods}
                indexItem={item}
                index={index}
            />
        }) : null
}

const RenderCard = (props: RenderCardProps) => {
    return props.cardItem.Props.filter((e: any) => !e.ParentId).map((e: any) => {
        return <RenderLayerElement
            key={e.Id}
            item={e}
            list={props.layers}
            style={props.style}
            className={props.className}
            type={"card"}
            methods={props.methods}
            indexItem={props.indexItem}
            index={props.index}
            itemData={props.itemData}
            childrenData={props.childrenData}
        />
    })
}