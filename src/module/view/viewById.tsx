import { CSSProperties, ReactNode, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { CustomHTMLProps, RenderLayerElement } from "../page/pageById"
import { DataController, SettingDataController } from "../../controller/data"
import { TableController } from "../../controller/setting"
import { ComponentType, FEDataType } from "../da"
import { ConfigData } from "../../controller/config"
import { BaseDA } from "../../controller/config"
import { regexGetVariableByThis } from "../card/config"

interface Props {
    id: string,
    style?: CSSProperties,
    className?: string,
    data?: { [p: string]: any },
    propsData?: { [p: string]: CustomHTMLProps },
    childrenData?: { [p: string]: ReactNode },
    itemData?: { [p: string]: ReactNode },
    onUnMount?: () => void
    onGetViewError?: (e: { [p: string]: any }) => void;
    controller?: { searchRaw?: string, filter?: string, sortby?: Array<{ prop: string, direction?: "ASC" | "DESC" }>, pattern?: { returns: Array<string>, [p: string]: Array<string> | { searchRaw?: string, reducers: string } } },
}

export const ViewById = (props: Props) => {
    const methods = useForm({ shouldFocusError: false })
    const [viewItem, setViewItem] = useState<{ [p: string]: any }>()
    const layers = useMemo(() => viewItem?.Props ?? [], [viewItem])
    const _colController = new TableController("column")
    const _relController = new TableController("rel")
    const keyNames = useMemo<Array<string>>(() => layers.filter((e: any) => e.NameField?.length).map((e: any) => e.NameField), [layers.length])
    const [indexItem, setIndexItem] = useState<{ [p: string]: any } | undefined>(props.data)

    useEffect(() => {
        if (props.id) {
            const controller = new SettingDataController("view")
            controller.getByIds([props.id]).then(async (res) => {
                if (res.code === 200 && res.data[0]) {
                    let _viewItem = res.data[0]
                    if (_viewItem.Props && typeof _viewItem.Props === "string") _viewItem.Props = JSON.parse(_viewItem.Props)
                    setViewItem(_viewItem)
                } else if (props.onGetViewError) props.onGetViewError(res)
            })
        }
        return () => props.onUnMount?.()
    }, [props.id])

    const mapRelativeData = async () => {
        const relKeys = keyNames.filter((e: string) => e.split(".").length > 1)
        if (!relKeys.length) return methods.setValue("_rels", [])
        const _rels = await _relController.getListSimple({
            page: 1, size: 100,
            query: `@TableFK:{${viewItem!.TbName}} @Column:{${relKeys.map((e: any) => e.split(".")[0]).filter((k: string, i: number, arr: Array<string>) => arr.indexOf(k) === i).join(" | ")}}`,
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
        const _colRes = await _colController.getListSimple({ page: 1, size: 200, query: `@TableName:{${viewItem!.TbName}} @Name:{${keyNames.filter((e: string) => e.split(".").length === 1).join(" | ")}}` })
        if (_colRes.code === 200) methods.setValue("_cols", _colRes.data.map((c: any) => ({ ...c, Form: JSON.parse(c.Form) })))
    }

    useEffect(() => {
        if (keyNames.length) {
            mapColumnData()
            mapRelativeData()
        }
    }, [keyNames])

    useEffect(() => {
        if (props.data) setIndexItem(props.data)
        else if (props.controller && viewItem?.TbName) {
            const dataController = new DataController(viewItem.TbName)
            dataController.patternList({ ...props.controller, page: 1, size: 1 }).then(res => {
                if (res.code === 200 && res.data[0]) setIndexItem(res.data[0])
            })
        }
    }, [props.data, props.controller, viewItem?.TbName])

    useEffect(() => {
        const fileCols = methods.getValues("_cols")?.filter((e: any) => e.DataType === FEDataType.FILE && keyNames.includes(e.Name)) ?? []
        if (fileCols.length && indexItem && keyNames.length) {
            const currentFiles = methods.watch("_files") ?? []
            const fileIds = fileCols.map((col: any) => indexItem![col.Name]?.split(",")).flat(Infinity).filter((e: string | undefined, i: number, arr: Array<string>) => e?.length && ConfigData.regexGuid.test(e) && currentFiles.every((el: any) => el.Id !== e) && arr.indexOf(e) === i)
            if (fileIds.length) {
                BaseDA.getFilesInfor(fileIds).then(fileRes => {
                    if (fileRes.code === 200) methods.setValue("_files", [...currentFiles, ...fileRes.data.filter((e: any) => !!e)])
                })
            }
        }
    }, [indexItem, methods.watch("_cols"), keyNames])

    const extendData = useMemo(() => methods.watch(), [JSON.stringify(methods.watch())])

    useEffect(() => {
        if (layers.length && indexItem && keyNames.length) {
            let relKeys = layers.filter((e: any) => e.Type === ComponentType.card && e.Setting.controller?.ids && regexGetVariableByThis.test(e.Setting.controller.ids)).map((e: any) => regexGetVariableByThis.exec(e.Setting.controller.ids)![1])
            relKeys.push(...keyNames.filter((e: string) => e.split(".").length > 1).map((e: string) => e.split(".")[0]))
            relKeys = relKeys.filter((e: string, i: number, arr: Array<string>) => arr.indexOf(e) === i)
            for (const k of relKeys) {
                const currentTmp = methods.getValues(`_${k}`) ?? []
                const dataController = new DataController(k.replace("Id", ""))
                const relDataIds = indexItem![k]?.split(",").flat(Infinity).filter((e: string | undefined, i: number, arr: Array<string>) => e?.length && currentTmp.every((el: any) => el.Id !== e) && arr.indexOf(e) === i)
                if (relDataIds.length) {
                    dataController.getByListId(relDataIds).then(relRes => {
                        if (relRes.code === 200) methods.setValue(`_${k}`, [...currentTmp, ...relRes.data.filter((e: any) => !!e)])
                    })
                }
            }
        }
    }, [indexItem, layers, keyNames.length])

    return viewItem ? <RenderView
        key={viewItem.Id}
        {...props}
        layers={layers}
        indexItem={indexItem}
        extendData={extendData}
    /> : null
}

interface RenderViewProps extends Props {
    layers: Array<{ [p: string]: any }>,
    indexItem?: { [p: string]: any },
    extendData: { [p: string]: any }
}

const RenderView = (props: RenderViewProps) => {
    const methods = useForm({ shouldFocusError: false })

    return props.layers.filter((e: any) => !e.ParentId).map((e: any) => {
        return <RenderLayerElement
            key={e.Id}
            item={e}
            list={props.layers}
            style={props.style}
            className={props.className}
            type={"view"}
            methods={methods}
            indexItem={props.data}
            propsData={props.propsData}
            childrenData={props.childrenData}
            itemData={props.itemData}
            options={props.extendData}
        />
    })
}