import { BaseDA, Button, DataController, DialogAlignment, imgFileTypes, Pagination, Popup, SettingDataController, showDialog, showPopup, TableController, Text, ToastMessage, Winicon } from "../../index";
import styles from "./table.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { TableHeader, TableRow } from "./tableElement";
import ExportXlsx from "./exportXlsx";
import { ButtonImportData, SearchFilterData } from "./featureElement";
import { ColDataType, FEDataType } from "../da";
import { cellValue } from "./config";
import AddEditElementForm from "./addEditElement";
import { getValidLink } from "../page/pageById";

export function TableById({ id }: { id: string }) {
    const [reportItem, setReportItem] = useState<{ [p: string]: any }>()
    const settingDataController = new SettingDataController("report")
    const columns = useMemo(() => reportItem?.Props ?? [], [reportItem])

    useEffect(() => {
        if (id) {
            settingDataController.getByIds([id]).then((res: any) => {
                if (res.code === 200 && res.data[0]) {
                    let tmp = res.data[0]
                    if (tmp.Props && typeof tmp.Props === "string") tmp.Props = JSON.parse(tmp.Props)
                    setReportItem(tmp)
                }
            })
        }
    }, [id])

    return reportItem && <DataTable key={reportItem.Id} tbName={reportItem.TbName} columns={columns} />
}

interface DataTableProps {
    tbName: string;
    staticSearch?: string;
    title?: string;
    columns: Array<{ [p: string]: any }>,
    onChangeConfigData?: (params: Array<{ [p: string]: any }>) => void;
    filterData?: {
        searchRaw: string,
        sortby: Array<{ prop: string, direction: string }>,
        /** requred searchRaw */
        required?: string
    };
    filterList?: Array<string>;
    onChangeFilterList?: (filterList: Array<string>) => void;
    onChangeFilterData?: (params: { searchRaw: string; sortby: Array<{ prop: string, direction: string }> }) => void;
    showIndex?: boolean;
    hideCheckbox?: boolean;
    enableEdit?: boolean;
    actions?: Array<{ [p: string]: any }>;
    onChangeActions?: () => void;
    onEditColumn?: (params: { [p: string]: any }) => void;
    [p: string]: any
}

export const DataTable = ({ tbName, staticSearch = "", title = "", columns = [], onChangeConfigData, filterData = { searchRaw: "*", sortby: [] }, filterList = [], onChangeFilterList, onChangeFilterData, showIndex = false, hideCheckbox = false, enableEdit = false, actions = [], onChangeActions, onEditColumn, ...props }: DataTableProps) => {
    // static variables
    const configMethods = useForm<any>({ shouldFocusError: false, defaultValues: { columns: [], searchRaw: "*", sortby: [], TbName: tbName } })
    const dataController = new DataController(tbName)
    const relController = new TableController("rel")
    const colController = new TableController("column")
    const popupRef = useRef<Popup>(null)
    const { t } = useTranslation()
    // dynamic variables
    const [data, setData] = useState<{ data: Array<{ [p: string]: any }>, totalCount?: number }>({ data: [], totalCount: undefined })
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 20 })
    const methodsRelative = useForm<any>({ shouldFocusError: false })
    const relativeData = useMemo<{ [p: string]: any }>(() => methodsRelative.watch(), [JSON.stringify(methodsRelative.watch())])
    const methodsRelativeFields = useForm<any>({ shouldFocusError: false })
    const relativeFields = useMemo<{ [p: string]: any }[]>(() => methodsRelativeFields.watch(), [JSON.stringify(methodsRelativeFields.watch())])
    const [files, setFiles] = useState<{ [p: string]: any }[]>([])
    const [fields, setFields] = useState<{ [p: string]: any }[]>([])
    const [selected, setSelected] = useState<string[]>([])
    const treeData = useMemo(() => fields.some(e => e.Column === 'ParentId'), [fields])
    // initData
    const getFields = async () => {
        const res = await Promise.all([
            relController.getListSimple({ page: 1, size: 1000, query: `@TableFK:{${tbName}}`, returns: ["Id", "Column", "TablePK", "TableFK", "Query", "Form"] }),
            colController.getListSimple({ page: 1, size: 1000, query: `@TableName:{${tbName}} -@Name:{Id}`, returns: ["Id", "Name", "DataType", "Query", "Form", "TableName"], sortby: { BY: "DateCreated" } })
        ])
        if (res.every((e: any) => e.code === 200)) {
            setFields(res.map((e: any) => e.data).flat(Infinity).map((e: any) => {
                return { ...e, Form: e.Form ? typeof e.Form === "string" ? JSON.parse(e.Form) : e.Form : { Required: true } }
            }))
        }
    }

    useEffect(() => {
        if (tbName) {
            configMethods.setValue("TbName", tbName)
            getFields()
        }
    }, [tbName])
    useEffect(() => { configMethods.setValue("columns", columns) }, [columns])
    useEffect(() => { configMethods.setValue("searchRaw", filterData.searchRaw ?? "*") }, [filterData.searchRaw])
    useEffect(() => { configMethods.setValue("sortby", filterData.sortby ?? []) }, [JSON.stringify(filterData.sortby)])

    useEffect(() => {
        const { searchRaw, sortby } = configMethods.watch()
        if (onChangeFilterData && (searchRaw !== filterData.searchRaw || JSON.stringify(sortby) !== JSON.stringify(filterData.sortby)))
            onChangeFilterData({ searchRaw, sortby })
    }, [configMethods.watch("searchRaw"), JSON.stringify(configMethods.watch("sortby"))])

    // get data
    const getData = async (page = 1, size = 20, exportData = false) => {
        const pattern: any = {
            returns: ["Id", ...columns.map(e => e.Name.split(".").shift())],
        }
        if ((tbName === "User" || tbName === "Customer") && columns.some(e => e.Type === ColDataType.people) && !pattern.returns.includes("AvatarUrl")) pattern.returns.push("AvatarUrl")
        const { searchRaw, sortby } = configMethods.getValues()
        let querySearch = searchRaw
        if (staticSearch.length) querySearch = `${staticSearch} ${querySearch !== "*" ? querySearch : ""}`
        if (treeData) pattern[tbName] = { searchRaw: "*", reducers: "GROUPBY 1 @ParentId REDUCE COUNT 0 AS _totalChild" }
        const pkKeys = columns.filter(e => e.Name.split(".").length > 1);
        pkKeys.forEach((e) => {
            const tmp = e.Name.split(".")
            pattern[tmp[0]] ??= ["Id"]
            if (!pattern[tmp[0]].includes(tmp[1])) pattern[tmp[0]].push(tmp[1])
            if (e.Type === ColDataType.people) pattern[tmp[0]].push("AvatarUrl")
        });
        const finalSearchRaw = treeData ? `@ParentId:{empty} ${querySearch !== "*" ? querySearch : ""}` : querySearch
        const res = await dataController.patternList({
            page: page, size: size,
            searchRaw: filterData.required?.length ? `${filterData.required}${finalSearchRaw !== "*" ? finalSearchRaw : ""}` : finalSearchRaw,
            sortby: sortby?.length ? sortby : [{ prop: "DateCreated", direction: "DESC" }],
            pattern: pattern
        })
        if (res.code === 200) {
            if (exportData) return res
            setData({ data: res.data, totalCount: res.totalCount })
            delete res.data
            delete res.totalCount
            delete res.code
            delete res.message
            if (Object.keys(res).length) {
                Object.keys(res).forEach(p => methodsRelative.setValue(p, res[p]))
            } else methodsRelative.reset()
        }
    }

    useEffect(() => {
        if (columns.length && fields.length) getData(pageDetails.page, pageDetails.size)
    }, [columns, configMethods.watch("searchRaw"), configMethods.watch("sortby"), fields])

    useEffect(() => {
        if (selected.length) setSelected([])
    }, [configMethods.watch("searchRaw"), configMethods.watch("sortby"), data.totalCount])

    const relativeCols = useMemo(() => columns.filter(e => e.Name.split(".").length > 1), [columns.length])

    useEffect(() => {
        if (relativeCols.length) {
            const relativeTb = relativeCols.map(e => {
                const tmp = e.Name.split(".").shift()
                return tmp.substring(0, tmp.lastIndexOf("Id"))
            }).filter((e, i, a) => a.indexOf(e) === i)
            const relativeKeyNames = relativeCols.map(e => e.Name.split(".").pop()).filter((e, i, a) => a.indexOf(e) === i)
            colController.getListSimple({
                page: 1, size: 1000,
                query: `@TableName:{${relativeTb.join(" | ")}} @Name:{${relativeKeyNames.join(" | ")}}`,
                returns: ["Id", "Name", "DataType", "Query", "Form", "TableName"],
            }).then((res: any) => {
                if (res.code === 200) {
                    relativeTb.forEach((tb) => {
                        const relColItem = res.data.filter((e: any) => e.TableName === tb).map((e: any) => ({ ...e, Form: e.Form ? JSON.parse(e.Form) : e.Form }))
                        if (relColItem.length) methodsRelativeFields.setValue(`${tb}Id`, relColItem)
                    })
                }
            })
        }
    }, [relativeCols])

    const mapRelativeData = useMemo(() => {
        const tmp: any = {}
        if (relativeData) {
            for (const item of data.data) {
                Object.keys(relativeData).forEach(p => {
                    if (item[`${p}Id`]?.length) {
                        const pData = relativeData[p].filter((e: any) => item[`${p}Id`].includes(e.Id))
                        if (pData) {
                            tmp[item.Id] ??= {}
                            tmp[item.Id][p] = pData
                        }
                    }
                })
            }
        }
        return tmp
    }, [relativeData, data.data])

    const regexGuid = /^[0-9a-fA-F]{32}$/;
    useEffect(() => {
        const dataFileIds: Array<string> = []
        columns.forEach(_col => {
            const tmp = _col.Name.split(".")
            if (tmp.length > 1) {
                if (relativeFields?.[tmp[0]]?.find((e: any) => e.Name === tmp[1] && e.DataType === FEDataType.FILE))
                    dataFileIds.push(...relativeData[tmp[0].substring(0, tmp[0].lastIndexOf("Id"))].map((e: any) => e[tmp[1]]?.split(",")).flat(Infinity).filter((id: string, i: number, arr: Array<string>) => !!id && arr.indexOf(id) === i))
            } else if (fields.find(e => e.Name === _col.Name && e.DataType === FEDataType.FILE)) {
                dataFileIds.push(...data.data.map(e => e[_col.Name]?.split(",")).flat(Infinity).filter((id, i, arr) => !!id && arr.indexOf(id) === i))
            }
        })
        if (dataFileIds.length) {
            const listValidIds = dataFileIds.filter(id => regexGuid.test(id))
            const listFilesInfor = dataFileIds.filter(id => !regexGuid.test(id)).map(id => {
                const _url = getValidLink(id)
                const _type = id.split(".").pop()?.toLowerCase()
                return { Id: id, Name: id, Url: _url, Type: imgFileTypes.includes(`.${_type}`) ? `image/${_type}` : _type }
            })
            if (listValidIds.length) {
                BaseDA.getFilesInfor(dataFileIds.filter((id, i, arr) => arr.indexOf(id) === i)).then((res: any) => {
                    if (res.code === 200) setFiles([...listFilesInfor, ...res.data.filter((f: any) => !!f)])
                })
            } else setFiles(listFilesInfor)
        } else setFiles([])
    }, [data.data, relativeData, relativeFields])

    const showAddEditPopup = (id?: string) => {
        showPopup({
            ref: popupRef as any,
            content: <AddEditElementForm
                ref={popupRef}
                tbName={tbName}
                id={id}
                title={title.toLowerCase()}
                activeColumns={columns}
                onSuccess={() => {
                    if (id) getData(pageDetails.page, pageDetails.size)
                    else getData()
                }}
                {...props}
            />
        })
    }

    return <>
        <div className={`col ${styles["table-view"]}`} style={{ padding: !!data.totalCount && data.totalCount > 20 ? "0 2.4rem" : "0 2.4rem 1.6rem", flex: 1 }}>
            <Popup ref={popupRef} />
            <div className={`row ${styles["table-feature"]}`}>
                {enableEdit && <Button
                    label={`${t("add")} ${(title ?? tbName).toLowerCase()}`}
                    prefix={<Winicon src={"outline/user interface/e-add"} size={"1.2rem"} />}
                    className="button-text-3 button-neutral border"
                    onClick={() => showAddEditPopup()}
                />}
                <div style={{ flex: 1 }} />
                <SearchFilterData
                    columns={columns}
                    fields={fields}
                    initFilterList={filterList}
                    onChangeFilterData={enableEdit ? onChangeFilterList : undefined}
                    searchRaw={configMethods.watch("searchRaw")}
                    onChange={(searchValue: string) => {
                        configMethods.setValue("searchRaw", searchValue)
                        onChangeFilterData?.({ searchRaw: searchValue, sortby: configMethods.watch("sortby") })
                    }}
                />
                <div className='row divider' style={{ height: '1.2rem', margin: 0 }} />
                <ExportXlsx
                    label={t("export")}
                    disabled={!data.totalCount}
                    getData={async () => {
                        const res = await getData(1, 2000, true)
                        if (res.code === 200 && res.data.length) {
                            const dataFileIds: Array<string> = []
                            const activeColumns = configMethods.getValues("columns")
                            activeColumns.forEach((_col: any) => {
                                const tmp = _col.Name.split(".")
                                if (tmp.length > 1) {
                                    if (relativeFields?.[tmp[0]]?.find((e: any) => e.Name === tmp[1] && e.DataType === FEDataType.FILE))
                                        dataFileIds.push(...res[tmp[0].substring(0, tmp[0].lastIndexOf("Id"))].map((e: any) => e[tmp[1]]?.split(",").slice(0, 4)).flat(Infinity).filter((id: string, i: number, arr: Array<string>) => !!id && arr.indexOf(id) === i))
                                } else if (fields.find(e => e.Name === _col.Name && e.DataType === FEDataType.FILE)) {
                                    dataFileIds.push(...res.data.map((e: any) => e[_col.Name]?.split(",").slice(0, 2)).flat(Infinity).filter((id: string, i: number, arr: string[]) => !!id && arr.indexOf(id) === i))
                                }
                            })
                            let getFiles: any = []
                            if (dataFileIds.length) {
                                getFiles = await BaseDA.getFilesInfor(dataFileIds.filter((id, i, arr) => arr.indexOf(id) === i))
                                getFiles = getFiles.data.filter((f: any) => f !== undefined && f !== null)
                            }
                            return res.data.map((item: any) => {
                                let result: any = {}
                                activeColumns.sort((a: any, b: any) => a.Sort - b.Sort).forEach((_col: any) => {
                                    const tmp = _col.Name.split(".")
                                    const params = (tmp.length > 1 ? { data: res[tmp[0].substring(0, tmp[0].lastIndexOf("Id"))]?.filter((e: any) => item[tmp[0]].includes(e.Id)), fields: relativeFields?.[tmp[0]] } : { data: item, fields: fields }) as any
                                    result[_col.Title] = cellValue(_col, params.data, params.fields, getFiles)
                                })
                                return result
                            })
                        } else return []
                    }}
                    prefix={<Winicon src='outline/arrows/data-download' />}
                    config={{ title: configMethods.watch("columns").map((e: any) => e.Title) }}
                />
                {enableEdit && <>
                    <div className='row divider' style={{ height: '1.2rem', margin: 0 }} />
                    <ButtonImportData
                        onImport={async (result) => {
                            if (result.length) {
                                const response = await dataController.add(result.map(e => ({ ...e, ...props })))
                                if (response.code !== 200) return ToastMessage.errors(response.message)
                                getData()
                            }
                        }}
                    />
                </>}
            </div>
            {columns.length && fields.length ? <div className={`col ${styles["table"]}`}>
                <TableHeader
                    key={tbName}
                    onEditColumn={onEditColumn}
                    selected={selected.length ? (data.data.every(e => selected.includes(e.Id)) ? true : null) : false}
                    onChangeSelected={(v: boolean) => {
                        const _filter = selected.filter(id => data.data.every(e => id !== e.Id))
                        if (v) setSelected([..._filter, ...data.data.map(e => e.Id)])
                        else setSelected(_filter)
                    }}
                    methods={configMethods}
                    onChangeConfigData={onChangeConfigData ? (() => { onChangeConfigData?.(configMethods.getValues("columns")) }) : undefined}
                    showIndex={showIndex}
                    hideCheckbox={hideCheckbox}
                    fields={fields}
                />
                {
                    data.data.map((item, index) => {
                        return <TableRow
                            key={`${tbName}-${item.Id}-${index}`}
                            item={item}
                            setItem={(ev: { [key: string]: any }) => { setData(prev => ({ data: prev.data.map(e => e.Id === item.Id ? ev : e), totalCount: prev.totalCount })) }}
                            index={index + pageDetails.size * (pageDetails.page - 1) + 1}
                            onEditActionColumn={onEditColumn}
                            methods={configMethods}
                            fields={fields}
                            files={files}
                            relativeData={mapRelativeData[item.Id]}
                            relativeFields={relativeFields}
                            selected={selected}
                            setSelected={setSelected}
                            title={title}
                            showIndex={showIndex}
                            hideCheckbox={hideCheckbox}
                            onChangeActions={enableEdit ? onChangeActions : undefined}
                            showAddEditPopup={enableEdit ? showAddEditPopup : undefined}
                            actions={actions}
                            onDelete={enableEdit ? (() => {
                                dataController.delete([item.Id]).then((res: any) => {
                                    if (res.code === 200) getData(pageDetails.page, pageDetails.size)
                                })
                            }) : undefined}
                            onDuplicate={enableEdit ? (() => {
                                dataController.duplicate([item.Id]).then((res: any) => {
                                    if (res.code !== 200) return ToastMessage.errors(res.message)
                                    getData(pageDetails.page, pageDetails.size)
                                    ToastMessage.success(`Duplicate this ${title.toLowerCase()} successfully!`)
                                })
                            }) : undefined}
                            {...props}
                        />
                    })
                }
            </div> : null}
        </div>
        {!!data.totalCount && data.totalCount > 20 && <div style={{ padding: '1.2rem 2.4rem' }}>
            <Pagination
                currentPage={pageDetails.page}
                itemPerPage={pageDetails.size}
                totalItem={data.totalCount}
                onChangePage={(page: number, size: number) => {
                    if (pageDetails.page !== page || pageDetails.size !== size) {
                        setPageDetails({ page: page, size: size });
                        getData(page, size);
                    }
                }} />
        </div>}
        {!!selected.length && <div className={`row ${styles["selected-item-options"]}`}>
            <div className={`row ${styles["selected-item-total"]}`}>
                <Text className="button-text-5">{selected.length} items selected</Text>
                <Winicon src="outline/user interface/e-remove" size={12} onClick={() => setSelected([])} />
            </div>
            <div className={`row ${styles["selected-item-actions"]}`}>
                <Button
                    className="button-text-5 size24"
                    label={t("export")}
                    style={{ color: "var(--neutral-text-body-reverse-color)" }}
                    prefix={<Winicon src="outline/user interface/data-download" color="var(--neutral-text-body-reverse-color)" size={12} />}
                />
                <Button
                    className="button-text-5 size24"
                    label={t("duplicate")}
                    style={{ color: "var(--neutral-text-body-reverse-color)" }}
                    prefix={<Winicon src="outline/layout/copy-2" color="var(--neutral-text-body-reverse-color)" size={12} />}
                    onClick={() => {
                        dataController.duplicate(selected).then((res: any) => {
                            if (res.code !== 200) return ToastMessage.errors(res.message)
                            getData(pageDetails.page, pageDetails.size)
                            ToastMessage.success(`Duplicate these ${title.toLowerCase()} successfully!`)
                            setSelected([])
                        })
                    }}
                />
                <Button
                    className="button-text-5 size24"
                    label={t("delete")}
                    style={{ color: "var(--neutral-text-body-reverse-color)" }}
                    prefix={<Winicon src="outline/user interface/trash-can" color="var(--neutral-text-body-reverse-color)" size={12} />}
                    onClick={() => {
                        showDialog({
                            alignment: DialogAlignment.center,
                            title: "Confirm delete",
                            content: `Are you sure to delete these ${selected.length} ${title.toLowerCase()}?`,
                            submitTitle: t("delete"),
                            onSubmit: () => {
                                dataController.delete(selected).then((res: any) => {
                                    if (res.code !== 200) return ToastMessage.errors(res.message)
                                    getData(pageDetails.page, pageDetails.size)
                                    setSelected([])
                                })
                            }
                        })
                    }}
                />
                <Button
                    className="button-text-5 size24"
                    label={t("more")}
                    style={{ color: "var(--neutral-text-body-reverse-color)" }}
                    prefix={<Winicon src="fill/text/menu-dots" color="var(--neutral-text-body-reverse-color)" size={12} />}
                />
                <Button
                    className="button-text-5 size24"
                    label={t("close")}
                    style={{ color: "var(--error-lighter-color)" }}
                    prefix={<Winicon src="outline/user interface/e-remove" color="var(--error-lighter-color)" size={12} />}
                    onClick={() => setSelected([])}
                />
            </div>
        </div>}
    </>
}