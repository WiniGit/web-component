import { forwardRef, MouseEventHandler, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { BaseDA, Select1Form, SelectMultipleForm, randomGID, Util, Button, closePopup, ComponentStatus, DialogAlignment, showDialog, Text, ToastMessage, Winicon, DataController, TableController, AccountController } from "../../index";
import { useTranslation } from 'react-i18next';
import { regexGetVariableByThis, RenderComponentByType, validateForm } from "../form/config";
import { ConfigData } from "../../controller/config";
import { ComponentType, FEDataType } from "../da";

interface AddEditElementFormProps {
    tbName: string;
    title?: string;
    activeColumns: { [p: string]: any }[];
    id?: string;
    onSuccess?: Function;
}

const AddEditElementForm = forwardRef(({ tbName = "", title, activeColumns = [], id, onSuccess, ...props }: AddEditElementFormProps, ref: any) => {
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
        _colController.getListSimple({
            page: 1,
            size: 100,
            query: `@TableName:{${tbName}} @Name:{${activeCols.join(" | ")}}`,
            returns: ["Id", "Name", "DataType", "Query", "Form"],
            sortby: { BY: "DateCreated" }
        }).then(res => {
            if (res.totalCount) setColumn(res.data.map((e: any) => {
                const tmp = { ...e, Form: e.Form ? JSON.parse(e.Form) : {} }
                tmp.Form.Sort = activeColumns.findIndex(el => el.Name === e.Name)
                return tmp
            }))
        })
        _relController.getListSimple({
            page: 1,
            size: 100,
            query: `@TableFK:{${tbName}} @Column:{${activeRels.join(" | ")}}`,
            returns: ["Id", "Column", "Form", "TablePK", "Query"]
        }).then((res: any) => {
            if (res.totalCount) setRelative(res.data.map((e: any) => {
                const tmp = { ...e, Form: e.Form ? JSON.parse(e.Form) : {} }
                tmp.Form.Sort = activeColumns.findIndex(el => el.Name.split(".")[0] === e.Column)
                return tmp
            }))
        })
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

    return <div className="col" style={{ flex: 1, width: '100dvw', maxWidth: 680, height: '80dvh' }}>
        <div className='popup-header row' style={{ gap: '0.8rem' }}>
            <Text className="heading-7" style={{ flex: 1 }}>{id ? `${t("edit")} ${title ?? tbName}` : `${t("add")} ${title ?? tbName}`}</Text>
            <Winicon src={"fill/user interface/e-remove"} className="icon-button size24" onClick={() => { closePopup(ref) }} />
        </div>
        {!!column.length && (!id || item) && <FormView
            cols={column.filter(e => !e.Query?.length)}
            rels={relative}
            item={item ?? props}
            tbName={tbName}
            onCancel={() => {
                showDialog({
                    alignment: DialogAlignment.center,
                    status: ComponentStatus.WARNING,
                    submitTitle: t("submit"),
                    title: `${t("confirm")} ${t("cancel").toLowerCase()} ` + (id ? t("edit") : t("add")),
                    onSubmit: () => { closePopup(ref) }
                })
            }}
            onSuccess={() => {
                closePopup(ref)
                ToastMessage.success(`${id ? t("edit") : t("add")} ${title ?? tbName} ${t("successfully").toLowerCase()}!`)
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
    onSuccess?: () => void
}

const FormView = ({ cols = [], rels = [], item, tbName, onCancel, onSuccess }: FormViewProps) => {
    const _dataController = new DataController(tbName)
    const methods = useForm<any>({ shouldFocusError: false, defaultValues: { Id: randomGID() } })
    const watchRel = useMemo(() => rels.filter(e => e.Query && e.Query.match(regexGetVariableByThis)?.length), [rels.length])
    const staticRel = useMemo(() => rels.filter(e => !e.Query || !e.Query.match(regexGetVariableByThis)?.length), [rels.length])
    const watchVariables = useMemo(() => {
        return watchRel.map((e: any) => {
            const tmp = e.Query?.match(regexGetVariableByThis)![0]
            return methods.watch(tmp!.replace(regexGetVariableByThis, (_: any, k: string) => k));
        })
    }, [watchRel.length])
    const methodsOptions = useForm<any>({ shouldFocusError: false })

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
                            const intergrationController = new AccountController()
                            const getHashPassword = await intergrationController.hashPassword(dataItem[_col.Name])
                            dataItem[_col.Name] = getHashPassword.data
                            break;
                        case FEDataType.FILE:
                            if (ev[_col.Name] && Array.isArray(ev[_col.Name])) {
                                const uploadFiles = ev[_col.Name].filter((e: any) => e instanceof File)
                                if (uploadFiles.length) {
                                    const res = await BaseDA.uploadFiles(uploadFiles)
                                    if (res?.length) dataItem[_col.Name] = ev[_col.Name].map((e: any) => e instanceof File ? res.find((f: any) => f.Name === e.name)?.Id : e.Id).filter((id: string) => !!id?.length).join(",")
                                } else {
                                    dataItem[_col.Name] = ev[_col.Name].map((e: any) => e.Id).join(",")
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
        const res = await _dataController.add([dataItem])
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
                                methods.setValue(prop, item[prop])
                                break;
                            case FEDataType.STRING:
                                if (_col.Form.Options?.length) {
                                    methods.setValue(prop, (item[prop] ?? "").split(","))
                                } else {
                                    methods.setValue(prop, item[prop])
                                }
                                break;
                            case FEDataType.HTML:
                                methods.setValue(prop, item[prop])
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
                            case FEDataType.PASSWORD:
                                methods.setValue(prop, item[prop])
                                break;
                            case FEDataType.FILE:
                                if (item[prop]) _fileIds.push({ id: item[prop], name: prop, multiple: _col.Form.Multiple })
                                break;
                            default:
                                break;
                        }
                    } else if (_rel) {
                        const _tmpParse = item[prop]?.length ? item[prop].split(",") : []
                        methods.setValue(prop, _rel.Form.ComponentType === ComponentType.selectMultiple ? _tmpParse : _tmpParse[0])
                    } else {
                        methods.setValue(prop, item[prop])
                    }
                })
                if (_fileIds.length) {
                    BaseDA.getFilesInfor(_fileIds.map(e => e.id.split(",")).flat(Infinity)).then(res => {
                        if (res.code === 200) _fileIds.forEach(e => {
                            const _file = res.data.filter((_file: any) => _file !== undefined && _file !== null && e.id.includes(_file.Id))
                            if (_file.length) methods.setValue(e.name, _file.map((f: any) => ({ ...f, name: f.Name, size: f.Size, type: f.Type, url: ConfigData.imgUrlId + f.Id })))
                        })
                    })
                }
            } else {
                cols.filter((e) => e.Form?.DefaultValue != undefined && e.Form?.DefaultValue !== "").forEach((_col) => {
                    switch (_col.DataType) {
                        case FEDataType.GID:
                            methods.setValue(_col.Name, _col.Form.DefaultValue)
                            break;
                        case FEDataType.STRING:
                            if (_col.Form.Options?.length) {
                                methods.setValue(_col.Name, _col.Form.DefaultValue.split(","))
                            } else {
                                methods.setValue(_col.Name, _col.Form.DefaultValue)
                            }
                            break;
                        case FEDataType.HTML:
                            methods.setValue(_col.Name, _col.Form.DefaultValue)
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
                        case FEDataType.PASSWORD:
                            methods.setValue(_col.Name, _col.Form.DefaultValue)
                            break;
                        default:
                            break;
                    }
                })
            }
        }
    }, [item, cols.length])

    useEffect(() => {
        if (staticRel.length) getOptions({ relatives: staticRel })
    }, [staticRel])

    const getOptions = ({ relatives = [], isWatch = false }: { relatives?: Array<{ [p: string]: any }>, page?: number, isWatch?: boolean }) => {
        relatives.forEach((_rel) => {
            const _dataPKController = new DataController(_rel.TablePK)
            if (_rel.TablePK === tbName) {
                _dataPKController.aggregateList({
                    page: 1, size: 500, searchRaw: `@ParentId:{empty} ${isWatch ? _rel.Query?.replace(regexGetVariableByThis, (m: string) => methods.getValues((regexGetVariableByThis.exec(m) ?? [])[1])) : _rel.Query}`, returns: ["Id", "Name"]
                }).then(async (res) => {
                    if (res.code === 200) methodsOptions.setValue(`${_rel.Column}_Options`, res.data ?? [])
                })
            } else {
                _dataPKController.getListSimple({
                    page: 1, size: 1000, query: isWatch ? _rel.Query?.replace(regexGetVariableByThis, (m: string) => methods.getValues((regexGetVariableByThis.exec(m) ?? [])[1])) : _rel.Query, returns: ["Id", "Name", "ParentId"]
                }).then((res) => {
                    if (res.code === 200) methodsOptions.setValue(`${_rel.Column}_Options`, res.data ?? [])
                })
            }
        })
    }

    useEffect(() => {
        getOptions({
            relatives: watchRel,
            isWatch: true
        })
    }, [...watchVariables])

    return <form className="col" style={{ flex: 1, width: '100%', height: '100%' }}>
        <div className="col" style={{ flex: 1, width: '100%', height: '100%', padding: '1.6rem 2.4rem', gap: '1.6rem', overflow: 'hidden auto' }}>
            {cols.map((e) => <RenderComponentByType key={e.Id} fieldItem={e} methods={methods} style={{ order: e.Form.Sort }} />)}
            {rels.map((_rel, _) => {
                const _options = methodsOptions.watch(`${_rel.Column}_Options`) ?? []
                let _mapOptions = _options.map((e: any) => { return { id: e.Id, name: e.Name, parentId: e.ParentId } })
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
                        />
                }
            })}
        </div>
        <div className="row popup-footer">
            <Button
                label="Cancel"
                className="button-text-3 button-grey"
                onClick={onCancel}
            />
            <Button
                label="Save"
                className="button-primary button-text-3"
                onClick={methods.handleSubmit(onSubmit, onError)}
            />
        </div>
    </form>
}