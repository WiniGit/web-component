import { forwardRef, MouseEventHandler, ReactNode, useEffect, useMemo, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { BaseDA, Select1Form, SelectMultipleForm, randomGID, Util, Button, closePopup, ComponentStatus, DialogAlignment, showDialog, Text, ToastMessage, Winicon, DataController, TableController, AccountController, urlToFileType } from "../../index";
import { useTranslation } from 'react-i18next';
import { regexGetVariableByThis, RenderComponentByType, validateForm } from "../form/config";
import { ConfigData } from "../../controller/config";
import { ComponentType, FEDataType } from "../da";
import { CustomerAvatar } from "./config";
import { getValidLink } from "../page/pageById";

interface AddEditElementFormProps {
    tbName: string;
    title?: string;
    activeColumns: { [p: string]: any }[];
    id?: string;
    onSuccess?: Function;
    expandForm?: (methods: UseFormReturn) => ReactNode;
}

const AddEditElementForm = forwardRef(({ tbName = "", title, activeColumns = [], id, onSuccess, expandForm, ...props }: AddEditElementFormProps, ref: any) => {
    const dataController = new DataController(tbName)
    const [item, setItem] = useState<{ [p: string]: any }>()
    const [column, setColumn] = useState<{ [p: string]: any }[]>([])
    const [relative, setRelative] = useState<{ [p: string]: any }[]>([])
    const { t } = useTranslation()

    //#region getSetting
    const getSetting = async () => {
        const activeCols = activeColumns.filter(e => e.Name.split(".").length === 1).map(e => e.Name).filter((v, i, a) => v !== "DateCreated" && a.indexOf(v) === i)
        const activeRels = activeColumns.filter(e => e.Name.split(".").length > 1).map(e => e.Name.split(".").shift()).filter((v, i, a) => a.indexOf(v) === i)
        const _colController = new TableController("column")
        const _relController = new TableController("rel")
        const apiList: Array<Promise<any>> = [
            _colController.getListSimple({
                page: 1,
                size: 100,
                query: `@TableName:{${tbName}} @Name:{${activeCols.join(" | ")}}`,
                returns: ["Id", "Name", "DataType", "Query", "Form"],
                sortby: { BY: "DateCreated" }
            })
        ]
        if (activeRels.length) {
            apiList.push(_relController.getListSimple({
                page: 1,
                size: 100,
                query: `@TableFK:{${tbName}} @Column:{${activeRels.join(" | ")}}`,
                returns: ["Id", "Column", "Form", "TablePK", "Query"]
            }))
        }
        const res = await Promise.all(apiList)
        if (res.every(e => e.code === 200)) {
            const relRes = res[1]
            const colRes = res[0]
            if (relRes?.totalCount) setRelative(relRes.data.map((e: any) => {
                const tmp = { ...e, Form: e.Form ? JSON.parse(e.Form) : {} }
                tmp.Form.Sort = activeColumns.findIndex(el => el.Name.split(".")[0] === e.Column)
                return tmp
            }))
            if (colRes.totalCount) setColumn(colRes.data.map((e: any) => {
                const tmp = { ...e, Form: e.Form ? JSON.parse(e.Form) : {} }
                tmp.Form.Sort = activeColumns.findIndex(el => el.Name === e.Name)
                return tmp
            }))
        }
    }

    useEffect(() => {
        if (id) {
            dataController.getById(id).then(res => {
                if (res.code === 200) setItem(res.data)
                else ToastMessage.errors(res.message)
            })
        }
        getSetting()
    }, [])

    return <div className="col right-drawer" style={{ width: "100dvw", maxWidth: 680 }}>
        <div className='popup-header row' style={{ gap: '0.8rem' }}>
            <Text className="heading-7" style={{ flex: 1 }}>{id ? `${t("edit")} ${title ?? tbName}` : `${t("add")} ${title ?? tbName}`}</Text>
            <Winicon src={"fill/user interface/e-remove"} className="icon-button size24" onClick={() => { closePopup(ref) }} />
        </div>
        {!!column.length && (!id || item) && <FormView
            cols={column.filter(e => !e.Query?.length)}
            rels={relative}
            item={item ?? props}
            tbName={tbName}
            expandForm={expandForm}
            onCancel={() => {
                showDialog({
                    alignment: DialogAlignment.center,
                    status: ComponentStatus.WARNING,
                    submitTitle: t("submit"),
                    title: `${t("confirm")} ${t("cancel").toLowerCase()} ` + (id ? t('edit') : t('add')).toLowerCase(),
                    onSubmit: () => { closePopup(ref) }
                })
            }}
            onSuccess={() => {
                closePopup(ref)
                ToastMessage.success(`${id ? t('edit') : t('add')} ${title ?? tbName} successfully!`)
                onSuccess?.()
            }}
        />}
    </div>
})

export default AddEditElementForm

//#region form
interface FormViewProps {
    cols: { [key: string]: any }[];
    rels: { [key: string]: any }[];
    item: { [key: string]: any };
    tbName: string;
    onCancel?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onSuccess?: () => void;
    expandForm?: (methods: UseFormReturn) => ReactNode
}

const FormView = ({ cols = [], rels = [], item, tbName, onCancel, onSuccess, expandForm }: FormViewProps) => {
    const dataController = new DataController(tbName)
    const methods = useForm<any>({ shouldFocusError: false, defaultValues: { Id: randomGID() } })
    const watchRel = useMemo(() => rels.filter(e => e.Query && e.Query.match(regexGetVariableByThis)?.length), [rels.length])
    const methodsOptions = useForm<any>({ shouldFocusError: false })
    const { t } = useTranslation()
    const regexGuid = /^[0-9a-fA-F]{32}$/;

    const onSubmit = async (ev: any) => {
        let dataItem = { ...ev }
        dataItem.DateCreated ??= Date.now()
        let validateDataForm: any = {}
        Object.keys(dataItem).forEach((key) => {
            if (typeof dataItem[key] === "string") validateDataForm[key] = dataItem[key].trim()
        })
        const _val = await validateForm({
            list: cols.filter(e => e.Form.Validate?.length).map(e => {
                return {
                    Name: e.Name,
                    Validate: e.Form.Validate
                }
            }),
            formdata: validateDataForm
        })
        // Cập nhật lỗi vào React Hook Form
        if (_val && Object.keys(_val).length > 0) {
            Object.keys(_val).forEach((field) => {
                methods.setError(field, { message: _val[field].join(', ') });
            });
            return;
        }
        // Nếu có lỗi, dừng lại không thực hiện submit
        for (let _col of cols) {
            if (_col.Name === "DateCreated") {
                dataItem[_col.Name] ??= Date.now()
            } else if (dataItem[_col.Name] != undefined) {
                if (!_col.Query) {
                    switch (_col.DataType) {
                        case FEDataType.STRING:
                            if (Array.isArray(dataItem[_col.Name])) {
                                dataItem[_col.Name] = dataItem[_col.Name].join(",")
                            } else if (typeof dataItem[_col.Name] !== 'string') {
                                dataItem[_col.Name] = `${dataItem[_col.Name]}`
                            }
                            break;
                        case FEDataType.BOOLEAN:
                            dataItem[_col.Name] = [true, 1, "true"].includes(dataItem[_col.Name]) ? true : false
                            break;
                        case FEDataType.NUMBER:
                            dataItem[_col.Name] = typeof dataItem[_col.Name] === 'string' ? parseFloat(dataItem[_col.Name]) : dataItem[_col.Name]
                            if (isNaN(dataItem[_col.Name])) delete dataItem[_col.Name]
                            break;
                        case FEDataType.DATE:
                        case FEDataType.DATETIME:
                            dataItem[_col.Name] = dataItem[_col.Name].getTime()
                            break;
                        case FEDataType.MONEY:
                            dataItem[_col.Name] = dataItem[_col.Name] ? parseInt(dataItem[_col.Name].replaceAll(',', '')) : null
                            break;
                        case FEDataType.PASSWORD:
                            if (dataItem[_col.Name] !== item?.[_col.Name]) {
                                const intergrationController = new AccountController()
                                const getHashPassword = await intergrationController.hashPassword(dataItem[_col.Name])
                                dataItem[_col.Name] = getHashPassword.data
                            }
                            break;
                        case FEDataType.FILE:
                            if (ev[_col.Name] && Array.isArray(ev[_col.Name])) {
                                const uploadFiles = ev[_col.Name].filter((e: any) => !!e?.file)
                                if (uploadFiles.length) {
                                    const res = await BaseDA.uploadFiles(uploadFiles.map((e: any) => e.file))
                                    if (res?.length) dataItem[_col.Name] = ev[_col.Name].map((e: any) => e.file ? res.shift().Id : e.exactUrl).filter((id: string) => !!id?.length).join(",")
                                } else {
                                    dataItem[_col.Name] = ev[_col.Name].map((e: any) => e.exactUrl ?? e.id).join(",")
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        for (let _rel of rels) {
            if (dataItem[_rel.Column] && Array.isArray(dataItem[_rel.Column]))
                dataItem[_rel.Column] = dataItem[_rel.Column].join(",")
        }
        const res = await dataController.add([dataItem])
        if (res.code !== 200) return ToastMessage.errors(res.message)
        onSuccess?.()
    }

    const onError = () => { }

    useEffect(() => {
        if (cols.length) {
            if (item) {
                const _fileIds: Array<any> = []
                Object.keys(item).forEach(prop => {
                    const _col = cols.find(e => e.Name === prop)
                    const _rel = rels.find(e => e.Column === prop)
                    if (_col) {
                        switch (_col.DataType) {
                            case FEDataType.GID:
                            case FEDataType.HTML:
                            case FEDataType.PASSWORD:
                                methods.setValue(prop, item[prop])
                                break;
                            case FEDataType.STRING:
                                if (_col.Form.Options?.length) {
                                    methods.setValue(prop, (item[prop] ?? "").split(","))
                                } else {
                                    methods.setValue(prop, item[prop])
                                }
                                break;
                            case FEDataType.BOOLEAN:
                                methods.setValue(prop, item[prop])
                                if (_col.Form.ComponentType === ComponentType.radio) methods.setValue(prop, `${item[prop]}`)
                                break;
                            case FEDataType.NUMBER:
                                methods.setValue(prop, typeof item[prop] === 'string' ? parseFloat(item[prop]) : item[prop])
                                break;
                            case FEDataType.DATE:
                            case FEDataType.DATETIME:
                                methods.setValue(prop, new Date(typeof item[prop] === 'string' ? parseInt(item[prop]) : item[prop]))
                                break;
                            case FEDataType.MONEY:
                                methods.setValue(prop, Util.money(item[prop]))
                                break;
                            case FEDataType.FILE:
                                if (item[prop]) {
                                    if (_col.Form.ComponentType === ComponentType.upload) _fileIds.push({ id: item[prop], name: prop })
                                    else methods.setValue(prop, item[prop])
                                }
                                break;
                            default:
                                break;
                        }
                    } else if (_rel) {
                        const _tmpParse = item[prop]?.length ? item[prop].split(",") : []
                        const pkController = new DataController(_rel.TablePK)
                        pkController.getByListId(_tmpParse).then(pkRes => {
                            if (pkRes.code === 200) methodsOptions.setValue(`${_rel.Column}_Options`, pkRes.data?.filter((e: any) => !!e) ?? [])
                        })
                        methods.setValue(prop, _rel.Form.ComponentType === ComponentType.selectMultiple ? _tmpParse : _tmpParse[0])
                    } else {
                        methods.setValue(prop, item[prop])
                    }
                })
                if (_fileIds.length) {
                    let filesInfor = _fileIds.map(e => e.id?.split(",")).flat(Infinity)
                    const fileGuids = filesInfor.filter((id, i, arr) => !!id?.length && regexGuid.test(id) && arr.indexOf(id) === i)
                    filesInfor = filesInfor.filter((id, i, arr) => !!id?.length && !regexGuid.test(id) && arr.indexOf(id) === i).map((url) => ({ id: randomGID(), name: url.split(/[\\/]/).pop(), type: urlToFileType(url), exactUrl: url, url: url.startsWith("https") ? url : getValidLink(url) }))
                    if (fileGuids.length) {
                        BaseDA.getFilesInfor(fileGuids).then(res => {
                            if (res.code === 200) _fileIds.forEach(e => {
                                const tmpF = res.data.filter((f: any) => !!f && e.id.includes(f.Id)).map((f: any) => ({ id: f.Id, name: f.Name, size: f.Size, type: f.Type, url: ConfigData.url + f.Url }))
                                methods.setValue(e.name, [...filesInfor.filter((f: any) => e.id.includes(f.exactUrl)), ...tmpF])
                            })
                        })
                    } else {
                        _fileIds.forEach(e => {
                            const tmpF = filesInfor.filter((f: any) => e.id.includes(f.exactUrl))
                            methods.setValue(e.name, tmpF)
                        })
                    }
                }
            } else {
                cols.filter((e) => e.Form?.DefaultValue != undefined && e.Form?.DefaultValue !== "").forEach((_col) => {
                    switch (_col.DataType) {
                        case FEDataType.GID:
                        case FEDataType.HTML:
                        case FEDataType.PASSWORD:
                            methods.setValue(_col.Name, _col.Form.DefaultValue)
                            break;
                        case FEDataType.STRING:
                            if (_col.Form.Options?.length) {
                                methods.setValue(_col.Name, _col.Form.DefaultValue.split(","))
                            } else {
                                methods.setValue(_col.Name, _col.Form.DefaultValue)
                            }
                            break;
                        case FEDataType.BOOLEAN:
                            methods.setValue(_col.Name, _col.Form.DefaultValue)
                            break;
                        case FEDataType.NUMBER:
                            methods.setValue(_col.Name, typeof _col.Form.DefaultValue === 'string' ? parseFloat(_col.Form.DefaultValue) : _col.Form.DefaultValue)
                            break;
                        case FEDataType.DATE:
                        case FEDataType.DATETIME:
                            methods.setValue(_col.Name, new Date(typeof _col.Form.DefaultValue === 'string' ? parseInt(_col.Form.DefaultValue) : _col.Form.DefaultValue))
                            break;
                        case FEDataType.MONEY:
                            methods.setValue(_col.Name, Util.money(_col.Form.DefaultValue))
                            break;
                        default:
                            break;
                    }
                })
            }
        }
    }, [item, cols.length])

    const getOptions = async ({ length, search, parentId, _rel }: { length: number, search?: string, parentId?: string | number, _rel: { [p: string]: any } }) => {
        const pkTableController = new TableController("rel")
        let checkTree: any = await pkTableController.getListSimple({ page: 1, size: 1, query: `@Column:{ParentId} @TablePK:{${_rel.TablePK}} @TableFK:{${_rel.TablePK}}` })
        if (checkTree.data?.length) checkTree = true
        else checkTree = false
        let querySearch: string = _rel.Query?.replace(regexGetVariableByThis, (m: string) => methods.getValues((regexGetVariableByThis.exec(m) ?? [])[1])) ?? ""
        if (search?.length) querySearch += ` ((@Name:(*"${search}"*)) | (@Name:(*${search}*)))`
        else if (checkTree) querySearch += ` @ParentId:{${parentId ?? "empty"}}`
        querySearch = querySearch.trim().length ? querySearch : "*"
        const pkDataController = new DataController(_rel.TablePK)
        const pattern: any = { returns: ["Id", "Name"] }
        if (_rel.TablePK === "Customer" || _rel.TablePK === "User") pattern.returns.push("AvatarUrl")
        if (checkTree) {
            pattern.returns.push("ParentId")
            pattern.ParentId = ["Id", "Name"]
            pattern[_rel.TablePK] = { searchRaw: "*", reducers: "GROUPBY 1 @ParentId REDUCE COUNT 0 AS totalChild" }
        }
        const res = await pkDataController.patternList({
            page: Math.floor(length / 20) + 1, size: 20,
            searchRaw: querySearch,
            sortby: [{ prop: "DateCreated", direction: "DESC" }],
            pattern: pattern
        })
        if (res.code === 200) {
            const result: Array<any> = res.data
            if (res.Parent?.length && !parentId) result.push(...res.Parent)
            return {
                data: res.data.filter((e: any, i: number, arr: Array<any>) => !!e && arr.findIndex(f => f.Id === e.Id) === i).map((e: any) => {
                    return {
                        id: e.Id,
                        name: e.Name,
                        prefix: (_rel.TablePK === "Customer" || _rel.TablePK === "User") ? <CustomerAvatar data={e} /> : undefined,
                        parentId: e.ParentId,
                        totalChild: e.totalChild ? typeof e.totalChild === "string" ? parseInt(e.totalChild) : e.totalChild : undefined
                    }
                }),
                totalCount: res.totalCount
            }
        } else return { data: [], totalCount: 0 }
    }

    return <form className="col" style={{ flex: 1, width: '100%', height: '100%' }}>
        <div className="col" style={{ flex: 1, width: '100%', height: '100%', padding: '1.6rem 2.4rem', gap: '2.4rem', overflow: 'hidden auto' }}>
            {cols.map((e) => <RenderComponentByType key={e.Id} fieldItem={e} methods={methods} style={{ order: e.Form.Sort }} />)}
            {rels.map((_rel, _) => {
                const _options = methodsOptions.watch(`${_rel.Column}_Options`) ?? []
                let _mapOptions = _options.map((e: any) => {
                    return {
                        id: e.Id,
                        name: e.Name,
                        prefix: (_rel.TablePK === "Customer" || _rel.TablePK === "User") ? <CustomerAvatar data={e} /> : undefined,
                        parentId: e.ParentId,
                    }
                })
                switch (_rel.Form.ComponentType) {
                    case ComponentType.selectMultiple:
                        return <SelectMultipleForm
                            methods={methods}
                            key={_rel.Id}
                            required={_rel.Form.Required}
                            name={_rel.Column}
                            label={_rel.Form.Label ?? _rel.Column}
                            placeholder={_rel.Form.Placeholder}
                            style={{ order: _rel.Form.Sort }}
                            options={_mapOptions}
                            getOptions={(params) => getOptions({ ...params, _rel })}
                            onChange={() => {
                                watchRel.forEach((wRel) => {
                                    if (wRel.Id !== _rel.Id && wRel.Query.includes(`\${this.${_rel.Column}}`)) methods.setValue(wRel.Column, null)
                                })
                            }}
                        />
                    default:
                        return <Select1Form
                            methods={methods}
                            key={_rel.Id}
                            required={_rel.Form.Required}
                            name={_rel.Column}
                            label={_rel.Form.Label ?? _rel.Column}
                            placeholder={_rel.Form.Placeholder}
                            style={{ order: _rel.Form.Sort }}
                            options={_mapOptions}
                            getOptions={(params) => getOptions({ ...params, _rel })}
                            onChange={() => {
                                watchRel.forEach((wRel) => {
                                    if (wRel.Id !== _rel.Id && wRel.Query.includes(`\${this.${_rel.Column}}`)) methods.setValue(wRel.Column, null)
                                })
                            }}
                        />
                }
            })}
            {expandForm?.(methods)}
        </div>
        <div className="row popup-footer">
            <Button
                label={t("cancel")}
                className="button-text-3 button-grey"
                onClick={onCancel}
            />
            <Button
                label={t("save")}
                className="button-primary button-text-3"
                onClick={methods.handleSubmit(onSubmit, onError)}
            />
        </div>
    </form>
}