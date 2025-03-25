import { CSSProperties, MouseEventHandler, ReactNode, useEffect, useMemo, useState } from "react"
import { DataController, SettingDataController } from "../../controller/data"
import { useForm, UseFormReturn } from "react-hook-form"
import { TableController } from "../../controller/setting"
import { EmptyPage } from "../../component/empty-page"
import { RenderLayerElement } from "../page/pageById"

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
     * json object data. Ex: {Id: 1, Name: "Example", ...}
     * */
    cardData?: { [p: string]: any },
    style?: CSSProperties,
    className?: string,
    controller?: "all" | { page: number, size: number, searchRaw?: string, filter?: string, sortby?: Array<{ prop: string, direction?: "ASC" | "DESC" }>, loadmore?: boolean },
    methods?: UseFormReturn
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
    data: { [p: string]: any }
}

export const CardById = (props: CardProps) => {
    const methods = useForm({ shouldFocusError: false })
    const [cardItem, setCardItem] = useState<{ [p: string]: any }>()
    const layers = useMemo(() => cardItem?.Props ?? [], [cardItem])
    const controller = useMemo(() => {
        if (!props.controller) return { page: 1, size: 8, searchRaw: "*" }
        else return props.controller
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
        const _relController = new TableController("rel")
        const _rels = await _relController.getListSimple({ page: 1, size: 100, query: `@TableFK:{${cardItem!.TbName}}`, returns: ["Id", "Name"] })
        if (_rels.code === 200) methods.setValue("_rels", _rels.data)
    }

    const mapColumnData = async () => {
        const _colController = new TableController("column")
        const _colRes = await _colController.getListSimple({ page: 1, size: 200, query: `@TableName:{${cardItem!.TbName}}` })
        if (_colRes.code === 200) methods.setValue("_cols", _colRes.data)
    }

    const getData = async () => {
        const dataController = new DataController(cardItem!.TbName)
        let tmp = undefined;
        if (props.data) {
            tmp = { data: [props.data], totalCount: 1 }
        } else if (controller === "all") {
            const res = await dataController.getAll()
            if (res.code === 200) tmp = { data: res.data, totalCount: res.data.length }
        } else {
            const res = await dataController.aggregateList({ ...controller, searchRaw: controller!.searchRaw ?? "*" })
            if (res.code === 200) tmp = { data: controller.loadmore ? [...data.data, ...res.data] : res.data, totalCount: res.totalCount }
        }
        if (!tmp) return undefined
        setData(tmp)
    }

    useEffect(() => {
        if (cardItem) {
            mapColumnData()
            mapRelativeData()
        }
    }, [cardItem])

    useEffect(() => {
        if (methods.watch("_cols")?.length) getData()
    }, [methods.watch("_cols")?.length])

    return cardItem ? data.totalCount === 0 ? <EmptyPage
        imgStyle={{ maxWidth: "16.4rem" }}
        title="There are no data found."
    /> : data.data.map((item, index) => {
        return <RenderCard
            key={item.Id}
            cardItem={cardItem}
            layers={layers}
            methods={methods}
            className={props.className}
            style={props.style}
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