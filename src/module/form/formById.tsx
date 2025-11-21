import { CSSProperties, forwardRef, ReactNode, useDeferredValue, useEffect, useImperativeHandle, useMemo, useState } from "react"
import { FieldValues, useForm, UseFormReturn } from "react-hook-form"
import { CustomHTMLProps, getValidLink, RenderLayerElement } from "../page/pageById"
import { AccountController, BaseDA, DataController, OptionsItem, randomGID, SettingDataController, urlToFileType, useLocation, Util } from "../../index"
import { regexGetVariableByThis } from "../card/config"
import { ComponentType, FEDataType } from "../da"
import { validateForm } from "./config"
import { TableController } from "../../controller/setting"
import { ConfigData } from "../../controller/config"
import { CustomerAvatar } from "../table/config"

interface FormByIdProps {
    id: string;
    style?: CSSProperties;
    className?: string;
    propsData?: { [p: string]: CustomHTMLProps };
    childrenData?: { [p: string]: ReactNode };
    itemData?: { [p: string]: ReactNode };
    data?: { [p: string]: any };
    customOptions?: { [p: string]: Array<OptionsItem> };
    onSubmit?: (e?: { [p: string]: any }) => void;
    onError?: (e?: { [p: string]: any }) => void;
    autoBcrypt?: boolean
}

interface FormByIdRef {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>,
    methods: UseFormReturn<FieldValues, any, FieldValues>
}

export const FormById = forwardRef<FormByIdRef, FormByIdProps>((props, ref) => {
    const methods = useForm({ shouldFocusError: false })
    const methodsOptions = useForm({ shouldFocusError: false })
    const [formItem, setFormItem] = useState<{ [p: string]: any }>()
    const layers = useMemo(() => formItem?.Props ?? [], [formItem])
    const inputComponents = [ComponentType.textField, ComponentType.textArea, ComponentType.select1, ComponentType.selectMultiple, ComponentType.checkbox, ComponentType.switch, ComponentType.radio, ComponentType.colorPicker, ComponentType.ckEditor, ComponentType.datePicker, ComponentType.upload, ComponentType.numberPicker]
    const inputLayers = useMemo<Array<{ [p: string]: any }>>(() => layers.filter((e: any) => e.NameField?.length && inputComponents.includes(e.Type)), [layers])
    const _colController = new TableController("column")
    const _relController = new TableController("rel")
    const [cols, setCols] = useState<Array<{ [p: string]: any }>>([])
    const [rels, setRels] = useState<Array<{ [p: string]: any }>>([])
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const accountController = new AccountController()
    const regexGuid = /^[0-9a-fA-F]{32}$/;

    const onSubmit = async (ev: any) => {
        let dataItem = { ...ev }
        delete dataItem.id
        dataItem.DateCreated ??= Date.now()
        let validateDataForm: { [k: string]: any } = {}
        Object.keys(dataItem).forEach((key) => {
            if (typeof dataItem[key] === "string") validateDataForm[key] = dataItem[key].trim()
        })
        const _val = await validateForm({
            list: inputLayers.filter((e: any) => e.Setting.validate?.length).map((e: any) => {
                return {
                    Name: e.NameField,
                    Validate: e.Setting.validate
                }
            }) as any,
            formdata: validateDataForm
        })
        // Cập nhật lỗi vào React Hook Form
        if (_val && Object.keys(_val).length > 0) {
            Object.keys(_val).forEach((field: any) => {
                methods.setError(field, { message: _val[field]?.[0] });
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
                        case FEDataType.GID:
                            break;
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
                            break;
                        case FEDataType.DATE:
                        case FEDataType.DATETIME:
                            dataItem[_col.Name] = dataItem[_col.Name].getTime()
                            break;
                        case FEDataType.MONEY:
                            if (dataItem[_col.Name].replace(/,/g, '').length)
                                dataItem[_col.Name] = parseInt(dataItem[_col.Name].replace(/,/g, ''))
                            else delete dataItem[_col.Name]
                            break;
                        case FEDataType.PASSWORD:
                            if (props.autoBcrypt && dataItem[_col.Name]?.length && dataItem[_col.Name] !== props.data?.[_col.Name]) {
                                const getHashPassword = await accountController.hashPassword(dataItem[_col.Name])
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
        Object.keys(dataItem).forEach(p => {
            if (![...cols, ...rels].find(e => e.Name === p || e.Column === p)) delete dataItem[p]
        })
        props.onSubmit?.(dataItem)
    }

    useImperativeHandle(ref, () => ({
        onSubmit: methods.handleSubmit(onSubmit, props.onError),
        methods: methods as any
    }), [methods.watch(), cols.length, rels.length]);

    useEffect(() => {
        if (cols.length) {
            methods.reset()
            if (props.data) {
                const dataItem = props.data
                const _fileIds: Array<any> = []
                Object.keys(dataItem).forEach(prop => {
                    const tmpLayer = inputLayers.find(e => e.NameField === prop)
                    if (tmpLayer) {
                        const _col = cols.find(e => e.Name === prop)
                        const _rel = rels.find(e => e.Column === prop)
                        if (_col) {
                            switch (_col.DataType) {
                                case FEDataType.GID:
                                case FEDataType.HTML:
                                case FEDataType.PASSWORD:
                                    methods.setValue(prop, dataItem[prop])
                                    break;
                                case FEDataType.STRING:
                                    if (_col.Form.Options?.length) {
                                        methods.setValue(prop, (dataItem[prop] ?? "").split(","))
                                    } else {
                                        methods.setValue(prop, dataItem[prop])
                                    }
                                    break;
                                case FEDataType.BOOLEAN:
                                    methods.setValue(prop, dataItem[prop])
                                    if (_col.Form.ComponentType === ComponentType.radio) methods.setValue(prop, `${dataItem[prop]}`)
                                    break;
                                case FEDataType.NUMBER:
                                    methods.setValue(prop, typeof dataItem[prop] === 'string' ? parseFloat(dataItem[prop]) : dataItem[prop])
                                    break;
                                case FEDataType.DATE:
                                case FEDataType.DATETIME:
                                    methods.setValue(prop, new Date(typeof dataItem[prop] === 'string' ? parseInt(dataItem[prop]) : dataItem[prop]))
                                    break;
                                case FEDataType.MONEY:
                                    methods.setValue(prop, Util.money(dataItem[prop]))
                                    break;
                                case FEDataType.FILE:
                                    if (dataItem[prop]) {
                                        if (_col.Form.ComponentType === ComponentType.upload) _fileIds.push({ id: dataItem[prop], name: prop })
                                        else methods.setValue(prop, dataItem[prop])
                                    }
                                    break;
                                default:
                                    break;
                            }
                        } else if (_rel) {
                            const _tmpParse = dataItem[prop]?.length ? dataItem[prop].split(",") : []
                            if (props.customOptions?.[_rel.Column]) {
                                let _opt = props.customOptions?.[_rel.Column] ?? []
                                methodsOptions.setValue(`${_rel.Column}_Options`, _opt)
                            } else {
                                const pkController = new DataController(_rel.TablePK)
                                pkController.getByListId(_tmpParse).then(pkRes => {
                                    if (pkRes.code === 200) methodsOptions.setValue(`${_rel.Column}_Options`, pkRes.data?.filter((e: any) => !!e)?.map((e: any) => ({ id: e.Id, name: e.Name, prefix: (_rel.TablePK === "Customer" || _rel.TablePK === "User") ? <CustomerAvatar data={e} /> : undefined, })) ?? [])
                                })
                            }
                            methods.setValue(prop, _rel.Form.ComponentType === ComponentType.selectMultiple ? _tmpParse : _tmpParse[0])
                        } else {
                            methods.setValue(prop, dataItem[prop])
                        }
                    } else methods.setValue(prop, dataItem[prop])
                })
                if (_fileIds.length) {
                    let filesInfor = _fileIds.map(e => e.id?.split(",")).flat(Infinity)
                    const fileGuids = filesInfor.filter((id, i, arr) => !!id?.length && regexGuid.test(id) && arr.indexOf(id) === i)
                    filesInfor = filesInfor.filter((id, i, arr) => !!id?.length && !regexGuid.test(id) && arr.indexOf(id) === i).map((url) => ({ id: randomGID(), name: url.split(/[\\/]/).pop(), type: urlToFileType(url), exactUrl: url, url: url.startsWith("https") ? url : getValidLink(url) }))
                    if (fileGuids.length) {
                        BaseDA.getFilesInfor(fileGuids).then(res => {
                            if (res.code === 200) _fileIds.forEach(e => {
                                const tmpF = res.data.filter((f: any) => !!f && e.id.includes(f.Id)).map((f: any) => ({ id: f.Id, name: f.Name, size: f.Size, type: f.Type, url: ConfigData.fileUrl + f.Url }))
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
                inputLayers.filter(e => e.Setting.default !== undefined && e.Setting.default !== null).forEach((tmpLayer) => {
                    const _col = cols.find(e => tmpLayer.NameField === e.Name)
                    switch (_col?.DataType) {
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
    }, [props.data, cols.length, params.toString()])

    useEffect(() => {
        if (props.id) {
            const controller = new SettingDataController("form")
            controller.getByIds([props.id]).then(async (res) => {
                if (res.code === 200 && res.data[0]) {
                    let _formItem = res.data[0]
                    if (_formItem.Props && typeof _formItem.Props === "string") _formItem.Props = JSON.parse(_formItem.Props)
                    if (!Array.isArray(_formItem.Props)) _formItem.Props = []
                    setFormItem(_formItem)
                }
            })
        }
    }, [props.id])

    useEffect(() => {
        if (formItem) {
            _relController.getListSimple({ page: 1, size: 100, query: `@TableFK:{${formItem.TbName}}` }).then(res => {
                if (res.code === 200) setRels(res.data.map((e: any) => {
                    let _tmp = { ...e, Form: e.Form ? typeof e.Form === "string" ? JSON.parse(e.Form) : { ...e.Form } : { Required: true } }
                    _tmp.Form.Sort = (formItem.Props as any)[e.Column]
                    return _tmp
                }))
            })
            _colController.getListSimple({ page: 1, size: 100, query: `@TableName:{${formItem.TbName}}` }).then(res => {
                if (res.code === 200) {
                    setCols(res.data.map((e: any) => {
                        let _tmp = { ...e, Form: e.Form ? typeof e.Form === "string" ? JSON.parse(e.Form) : { ...e.Form } : { Required: true } }
                        _tmp.Form.Sort = (formItem.Props as any)[e.Name]
                        return _tmp
                    }))
                }
            })
        }
    }, [formItem])

    const getOptions = async ({ length, search, parentId, _rel }: { length: number, search?: string, parentId?: string | number, _rel: { [p: string]: any } }) => {
        if (props.customOptions?.[_rel.Column]) {
            let _opt = props.customOptions?.[_rel.Column] ?? []
            if (search?.length) _opt = _opt.filter(e => typeof e.name === "string" ? (e.name.toLowerCase().includes(search.toLowerCase()) || search.toLowerCase().includes(e.name.toLowerCase())) : true)
            return { data: _opt, totalCount: _opt.length }
        }
        const pkTableController = new TableController("rel")
        let checkTree: any = await pkTableController.getListSimple({ page: 1, size: 1, query: `@Column:{ParentId} @TablePK:{${_rel.TablePK}} @TableFK:{${_rel.TablePK}}` })
        if (checkTree.data?.length) checkTree = true
        else checkTree = false
        let querySearch: string = _rel.Query?.replace(regexGetVariableByThis, (m: string) => methods.getValues((regexGetVariableByThis.exec(m) ?? [])[1])) ?? ""
        if (search?.length) querySearch += ` ((@Name:("${search}")) | (@Name:("%${search}%")))`
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

    const mapColOptions = useMemo(() => {
        if (props.customOptions && Object.keys(props.customOptions).length) {
            return cols.map(e => (props.customOptions![e.Name] ? { ...e, Form: { ...e.Form, Options: props.customOptions![e.Name] } } : e))
        } else return cols
    }, [props.customOptions, cols])

    const formValues = useMemo(() => {
        const tmp = methods.getValues()
        const tmpValue: any = {};
        [...cols, ...rels].forEach(c => {
            tmpValue[c.Column ?? c.Name] = tmp[c.Column ?? c.Name]
        })
        return tmpValue
    }, [cols.length, rels.length, methods.watch()])
    const finalFormValues = useDeferredValue(formValues);

    return formItem && !!cols.length && layers.filter((e: any) => !e.ParentId).map((e: any) => {
        return <RenderLayerElement
            key={e.Id}
            item={e}
            list={layers}
            style={props.style}
            className={props.className}
            type={"form"}
            methods={methods}
            indexItem={finalFormValues}
            propsData={props.propsData}
            childrenData={props.childrenData}
            itemData={props.itemData}
            cols={mapColOptions}
            rels={rels.map((_rel => ({ ..._rel, getOptions: async (params: any) => await getOptions({ ...params, _rel }) })))}
            options={methodsOptions.watch()}
            onSubmit={methods.handleSubmit(onSubmit, props.onError)}
        />
    })
})