import { CSSProperties, MouseEventHandler, ReactNode, useEffect, useMemo, useState } from "react"
import { DataController, SettingDataController } from "../../controller/data"
import { useForm, UseFormReturn } from "react-hook-form"
import { TableController } from "../../controller/setting"
import { EmptyPage } from "../../component/empty-page"
import { RenderLayerElement } from "../page/pageById"
import { useLocation, useParams } from "react-router-dom"
import { regexEmptyKeyController, regexGetVariables, regexWatchDoubleQuote, regexWatchSingleQuote, replaceEmptyKeyController, replaceVariables } from "./config"

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
    const location = useLocation()
    const params = useParams()
    const query = new URLSearchParams(location.search)
    const keyNames = useMemo<Array<string>>(() => layers.filter((e: any) => e.NameField?.length).map((e: any) => e.NameField), [layers.length])
    const controller = useMemo(() => {
        if (!props.controller) return { page: 1, size: 8, searchRaw: "*" }
        if (props.controller === "all") return props.controller
        let newController = { ...props.controller } as any
        if (newController.searchRaw) {
            if (regexGetVariables.test(newController.searchRaw)) {
                const newSearchRaw = newController.searchRaw.replace(replaceVariables, (m: string) => {
                    const execRegex = regexGetVariables.exec(m)
                    if (!execRegex?.[1]) return m
                    const variable = execRegex[1].split(".")
                    switch (variable[0]) {
                        case "query":
                            return query.get(variable[1])
                        case "params":
                            return params[variable[1]]
                        default:
                            if (regexWatchSingleQuote.test(execRegex[1])) {
                                return (props.methods ?? methods).watch(execRegex[1].match(regexWatchSingleQuote)![1])
                            } else if (regexWatchDoubleQuote.test(execRegex[1])) {
                                return (props.methods ?? methods).watch(execRegex[1].match(regexWatchDoubleQuote)![1])
                            } else return m
                    }
                })
                newController.searchRaw = newSearchRaw
            }
            if (regexGetVariables.test(`${newController.page}`)) {
                const newPageIndex = `${newController.page}`.replace(replaceVariables, (m: string) => {
                    const execRegex = regexGetVariables.exec(m)
                    if (!execRegex?.[1]) return m
                    const variable = execRegex[1].split(".")
                    switch (variable[0]) {
                        case "query":
                            return query.get(variable[1])
                        case "params":
                            return params[variable[1]]
                        default:
                            if (regexWatchSingleQuote.test(execRegex[1])) {
                                return (props.methods ?? methods).watch(execRegex[1].match(regexWatchSingleQuote)![1])
                            } else if (regexWatchDoubleQuote.test(execRegex[1])) {
                                return (props.methods ?? methods).watch(execRegex[1].match(regexWatchDoubleQuote)![1])
                            } else return m
                    }
                })
                newController.page = parseInt(newPageIndex)
            }
            if (regexGetVariables.test(`${newController.size}`)) {
                const newPageSize = `${newController.size}`.replace(replaceVariables, (m: string) => {
                    const execRegex = regexGetVariables.exec(m)
                    if (!execRegex?.[1]) return m
                    const variable = execRegex[1].split(".")
                    switch (variable[0]) {
                        case "query":
                            return query.get(variable[1])
                        case "params":
                            return params[variable[1]]
                        default:
                            if (regexWatchSingleQuote.test(execRegex[1])) {
                                return (props.methods ?? methods).watch(execRegex[1].match(regexWatchSingleQuote)![1])
                            } else if (regexWatchDoubleQuote.test(execRegex[1])) {
                                return (props.methods ?? methods).watch(execRegex[1].match(regexWatchDoubleQuote)![1])
                            } else return m
                    }
                })
                newController.page = parseInt(newPageSize)
            }
        } else if (newController.ids) {
            if (regexGetVariables.test(newController.ids)) {
                const newIds = newController.ids.replace(replaceVariables, (m: string) => {
                    const execRegex = regexGetVariables.exec(m)
                    if (!execRegex?.[1]) return m
                    const variable = execRegex[1].split(".")
                    switch (variable[0]) {
                        case "query":
                            return query.get(variable[1])
                        case "params":
                            return params[variable[1]]
                        default:
                            if (regexWatchSingleQuote.test(execRegex[1])) {
                                return (props.methods ?? methods).watch(execRegex[1].match(regexWatchSingleQuote)![1])
                            } else if (regexWatchDoubleQuote.test(execRegex[1])) {
                                return (props.methods ?? methods).watch(execRegex[1].match(regexWatchDoubleQuote)![1])
                            } else return m
                    }
                })
                newController.ids = newIds
            }
        }
        return newController
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
            if (regexEmptyKeyController.test(tmpController.searchRaw)) {
                const firstEmptyKey = regexEmptyKeyController.exec(tmpController.searchRaw)!
                if (firstEmptyKey[0].includes("notempty")) tmpController.notEmpty = true
                tmpController.key = firstEmptyKey[1]
                tmpController.searchRaw = tmpController.searchRaw.replace(replaceEmptyKeyController, "").trim()
                if (!tmpController.searchRaw.length) tmpController.searchRaw = `*`
                var res = await dataController.filterByEmptyKey(tmpController)
            } else {
                res = await dataController.aggregateList(tmpController)
            }
            if (res.code === 200) tmp = { data: page ? [...data.data, ...res.data] : res.data, totalCount: res.totalCount }
        } else { // get by ids
            let listIds = controller.ids.split(",")
            if (controller.maxLength && controller.maxLength !== "none") listIds = listIds.slice(0, controller.maxLength)
            const res = await dataController.getByListId(listIds)
            const listData = res.data.filter((e: any) => e !== undefined && e !== null)
            if (res.code === 200) tmp = { data: listData, totalCount: listData.length }
        }
        if (!tmp) return undefined
        const relKeys = keyNames.filter((e: string) => e.split(".").length > 1).map((e: string) => e.split(".")[0]).filter((e, i, arr) => arr.indexOf(e) === i)
        if (relKeys.length) {
            for (const k of relKeys) {
                const currentTmp = methods.getValues(`_${k}`) ?? []
                const dataController = new DataController(k.replace("Id", ""))
                const relDataIds = tmp.data.map((e: any) => e[k]?.split(",")).flat(Infinity).filter((e: string | undefined, i: number, arr: Array<string>) => e?.length && currentTmp.every((el: any) => el.Id !== e) && arr.indexOf(e) === i)
                dataController.getByListId(relDataIds).then(relRes => {
                    if (relRes.code === 200) methods.setValue(`_${k}`, relRes.data)
                })
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
        if (cardItem && controller) getData()
    }, [cardItem, controller])

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