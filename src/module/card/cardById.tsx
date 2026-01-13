import { CSSProperties, Dispatch, forwardRef, ReactNode, SetStateAction, useDeferredValue, useEffect, useImperativeHandle, useMemo, useState } from "react"
import { DataController, SettingDataController } from "../../controller/data"
import { useForm, UseFormReturn } from "react-hook-form"
import { TableController } from "../../controller/setting"
import { EmptyPage } from "../../component/empty-page"
import { CustomHTMLProps, RenderLayerElement } from "../page/pageById"
import { regexGetVariableByThis } from "./config"
import { ComponentType, FEDataType } from "../da"
import { useTranslation } from "react-i18next"
import { BaseDA, ConfigData } from "../../controller/config"

interface Props {
    style?: CSSProperties,
    className?: string,
    /**
    * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
    * */
    childrenData?: { [p: string]: (itemData: { [p: string]: any }, index: number, methods?: UseFormReturn) => ReactNode },
    /**
     * custom props of layer by id. Ex: { "gid": { style: { width: "60rem", backgroundColor: "red" }, className: "my-class" } }
     * */
    propsData?: { [p: string]: (itemData: { [p: string]: any }, index: number, methods?: UseFormReturn) => CustomHTMLProps },
    /**
     * replace layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    itemData?: { [p: string]: (indexItem: { [p: string]: any }, index: number, methods?: UseFormReturn) => ReactNode },
    /**
     * list json object data. Ex: {Id: 1, Name: "Example", ...}
     * */
    cardData?: Array<{ [p: string]: any }>,
    controller?: "all" | { page?: number, size?: number, searchRaw?: string, filter?: string, sortby?: Array<{ prop: string, direction?: "ASC" | "DESC" }>, pattern?: { returns: Array<string>, [p: string]: Array<string> | { searchRaw?: string, reducers: string } } } | { ids: string, maxLength?: number | "none" },
    emptyLink?: string,
    emptyMessage?: string,
    emptyElement?: ReactNode,
}

interface CardProps extends Props {
    id: string,
    methods?: UseFormReturn,
    onLoaded?: (ev: { data: Array<{ [p: string]: any }>, totalCount: number }) => void,
    onRelativeLoaded?: (ev: any) => void,
    onUnMount?: () => void,
    onGetCardError?: (e: { [p: string]: any }) => void;
    /** Listen card state */
    onChange?: (ev: { data: { data: Array<{ [p: string]: any }>, totalCount?: number }, state: { [p: string]: any } }) => void
}

interface CardRef {
    getData: (page?: number) => Promise<void>;
    data: { data: Array<{ [p: string]: any }>, totalCount?: number };
    controller: "all" | { page?: number, size?: number, searchRaw?: string, filter?: string, sortby?: Array<{ prop: string, direction?: "ASC" | "DESC" }>, pattern?: { returns: Array<string>, [p: string]: Array<string> | { searchRaw?: string, reducers: string } } } | { ids: string, maxLength?: number | "none" };
    setData: Dispatch<SetStateAction<{ data: Array<{ [p: string]: any }>, totalCount?: number }>>;
    relativeData?: { [p: string]: Array<{ [p: string]: any }> }
}

export const CardById = forwardRef<CardRef, CardProps>((props, ref) => {
    const methods = useForm({ shouldFocusError: false })
    const [cardItem, setCardItem] = useState<{ [p: string]: any }>()
    const layers = useMemo(() => cardItem?.Props ?? [], [cardItem])
    const _colController = new TableController("column")
    const _relController = new TableController("rel")
    const keyNames = useMemo<Array<string>>(() => layers.filter((e: any) => e.NameField?.length).map((e: any) => e.NameField), [layers.length])
    const [controller, setController] = useState<any>()
    const [data, setData] = useState<{ data: Array<{ [p: string]: any }>, totalCount?: number }>({ data: [], totalCount: undefined })
    const { t } = useTranslation()

    useEffect(() => {
        if (props.id) {
            const _settingDataController = new SettingDataController("card")
            _settingDataController.getByIds([props.id]).then(async (res) => {
                if (res.code === 200 && res.data[0]) {
                    let _cardItem = res.data[0]
                    if (_cardItem.Props && typeof _cardItem.Props === "string") _cardItem.Props = JSON.parse(_cardItem.Props)
                    setCardItem(_cardItem)
                } else if (props.onGetCardError) props.onGetCardError(res)
            })
        }
        return () => props.onUnMount?.()
    }, [props.id])

    useEffect(() => {
        if (!props.controller && !controller) setController({ page: 1, size: 8, searchRaw: "*" })
        else if (controller !== props.controller) {
            if (props.controller === "all" || !controller) setController(props.controller)
            else if (props.controller && Object.keys(props.controller as any).some((p: string) => `${controller[p]}` !== `${(props.controller as any)[p]}`)) setController(props.controller)
        }
    }, [props.controller])

    const mapRelativeData = async () => {
        const relKeys = keyNames.filter((e: string) => e.split(".").length > 1)
        if (!relKeys.length) return methods.setValue("_rels", [])
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
            if (relRes.code === 200) methods.setValue("_rels", relRes.data.map((r: any) => ({ ...r, Form: JSON.parse(r.Form) })))
        }
    }

    const mapColumnData = async () => {
        const _colRes = await _colController.getListSimple({ page: 1, size: 200, query: `@TableName:{${cardItem!.TbName}} @Name:{${keyNames.filter((e: string) => e.split(".").length === 1).join(" | ")}}` })
        if (_colRes.code === 200) methods.setValue("_cols", _colRes.data.map((c: any) => ({ ...c, Form: JSON.parse(c.Form) })))
    }

    const getData = async (page?: number) => {
        const dataController = new DataController(cardItem!.TbName)
        let tmp = undefined;
        if (controller === "all") {
            const res = await dataController.getAll()
            if (res.code === 200) tmp = { data: res.data, totalCount: res.data.length }
        } else if (controller.searchRaw) {
            const tmpController = { ...controller, searchRaw: controller!.searchRaw ?? "*" }
            if (page) tmpController.page = page
            const res = await dataController.patternList(tmpController)
            if (res.code === 200) tmp = { data: page ? [...data.data, ...res.data] : res.data, totalCount: res.totalCount }
            delete res.code
            delete res.message
            delete res.data
            delete res.totalCount
            Object.keys(res).forEach((k) => methods.setValue(k, res[k]))
        } else { // get by ids
            let listIds = controller.ids.split(",")
            if (controller.maxLength && controller.maxLength !== "none") listIds = listIds.slice(0, controller.maxLength)
            const res = await dataController.getByListId(listIds)
            const listData = res.data.filter((e: any) => !!e)
            if (res.code === 200) tmp = { data: listData, totalCount: listData.length }
        }
        if (!tmp) return undefined
        let relKeys = layers.filter((e: any) => e.Type === ComponentType.card && e.Setting.controller?.ids && regexGetVariableByThis.test(e.Setting.controller.ids)).map((e: any) => regexGetVariableByThis.exec(e.Setting.controller.ids)![1])
        relKeys.push(...keyNames.filter((e: string) => e.split(".").length > 1).map((e: string) => e.split(".")[0]))
        relKeys = relKeys.filter((e: string, i: number, arr: Array<string>) => arr.indexOf(e) === i)
        for (const k of relKeys) {
            const currentTmp = methods.getValues(`_${k}`) ?? []
            const dataController = new DataController(k.replace("Id", ""))
            const relDataIds = tmp.data.map((e: any) => e[k]?.split(",")).flat(Infinity).filter((e: string | undefined, i: number, arr: Array<string>) => e?.length && currentTmp.every((el: any) => el.Id !== e) && arr.indexOf(e) === i)
            if (relDataIds.length) {
                dataController.getByListId(relDataIds).then(relRes => {
                    if (relRes.code === 200) methods.setValue(`_${k}`, [...currentTmp, ...relRes.data.filter((e: any) => !!e)])
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
        const fileCols = methods.getValues("_cols")?.filter((e: any) => e.DataType === FEDataType.FILE && keyNames.includes(e.Name)) ?? []
        if (fileCols.length && data.data.length && keyNames.length) {
            const currentFiles = methods.watch("_files") ?? []
            const fileIds = data.data.map((e: any) => fileCols.map((col: any) => e[col.Name]?.split(","))).flat(Infinity).filter((e: string | undefined, i: number, arr: Array<string>) => e?.length && ConfigData.regexGuid.test(e) && currentFiles.every((el: any) => el.Id !== e) && arr.indexOf(e) === i)
            if (fileIds.length) {
                BaseDA.getFilesInfor(fileIds).then(fileRes => {
                    if (fileRes.code === 200) methods.setValue("_files", [...currentFiles, ...fileRes.data.filter((e: any) => !!e)])
                })
            }
        }
    }, [data.data, methods.watch("_cols"), keyNames])

    useEffect(() => {
        if (cardItem) {
            if (controller && !props.cardData) getData()
            else if (props.cardData) setData({ data: props.cardData, totalCount: props.cardData.length })
        }
    }, [cardItem, controller, props.cardData?.length])

    const extendData = useMemo(() => methods.watch(), [JSON.stringify(methods.watch())])
    const finalExtendData = useDeferredValue(extendData)
    const getRelativeData = useMemo(() => {
        if (finalExtendData) {
            const tmp = { ...finalExtendData }
            delete tmp._rels
            delete tmp._cols
            return tmp
        }
        return undefined
    }, [finalExtendData])

    useEffect(() => {
        props.onRelativeLoaded?.(getRelativeData)
    }, [getRelativeData])

    const stateMethods = useForm({ shouldFocusError: false })
    const cardStateData = useMemo(() => stateMethods.watch(), [JSON.stringify(stateMethods.watch())])
    const finalStateData = useDeferredValue(cardStateData)

    useEffect(() => {
        if (props.onChange) props.onChange({ data: data, state: finalStateData })
    }, [finalStateData, data])

    useImperativeHandle(ref, () => ({
        getData: getData,
        data: data,
        controller: controller,
        setData: setData,
        methods: stateMethods,
        relativeData: getRelativeData
    }), [data, cardItem, controller, getRelativeData, stateMethods]);

    return cardItem ? data.totalCount === 0 ?
        (props.emptyElement ?? (props.emptyLink && <EmptyPage
            imgUrl={props.emptyLink}
            imgStyle={{ maxWidth: "16.4rem" }}
            style={props.style}
            title={props.emptyMessage ?? t("noDataFound")}
        />)) : <StateCard
            key={cardItem.Id}
            {...props}
            methods={stateMethods}
            data={data.data}
            cardItem={cardItem}
            extendData={finalExtendData}
            layers={layers}
        />
        : null
})

const StateCard = ({ data, cardItem, layers, extendData, methods, ...props }: { methods: UseFormReturn, data: { [k: string]: any }[], cardItem: { [k: string]: any }, layers: { [k: string]: any }[], extendData: { [k: string]: any }, }) => {
    const [rels, setRels] = useState<Array<{ [p: string]: any }>>([])
    const [cols, setCols] = useState<Array<{ [p: string]: any }>>([])
    const [tmpExtendData, setTmpExtendData] = useState<{ [p: string]: any }>({})

    useEffect(() => {
        const tmp: { [p: string]: any } = {}
        Object.keys(extendData).forEach(p => {
            if (p === "_cols") setCols(extendData[p])
            else if (p === "_rels") setRels(extendData[p])
            else tmp[p] = extendData[p]
        })
        if (Object.keys(tmp).length) setTmpExtendData(tmp)
    }, [extendData])

    return data.map((item, index) => {
        return <RenderCard
            key={item.Id}
            {...props}
            cardItem={cardItem}
            layers={layers}
            indexItem={item}
            index={index}
            cols={cols}
            rels={rels}
            methods={methods}
            options={tmpExtendData}
        />
    })
}

interface RenderCardProps extends Props {
    layers: Array<{ [p: string]: any }>,
    cardItem: { [p: string]: any },
    indexItem: { [p: string]: any },
    index: number,
    methods: UseFormReturn,
    options: { [p: string]: any },
    cols: Array<{ [p: string]: any }>,
    rels: Array<{ [p: string]: any }>
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
            propsData={props.propsData}
            cols={props.cols}
            rels={props.rels}
            options={props.options}
            tbName={props.cardItem.TbName}
        />
    })
}