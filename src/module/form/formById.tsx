import { CSSProperties, forwardRef, ReactNode, useEffect, useImperativeHandle, useMemo, useState } from "react"
import { FieldValues, useForm, UseFormReturn } from "react-hook-form"
import { CustomHTMLProps, RenderLayerElement } from "../page/pageById"
import { AccountController, BaseDA, DataController, SettingDataController, useLocation, Util } from "../../index"
import { regexGetVariableByThis } from "../card/config"
import { ComponentType, FEDataType } from "../da"
import { validateForm } from "./config"
import { TableController } from "../../controller/setting"
import { ConfigData } from "../../controller/config"

interface FormByIdProps {
    id: string;
    style?: CSSProperties;
    className?: string;
    propsData?: { [p: string]: CustomHTMLProps };
    childrenData?: { [p: string]: ReactNode };
    itemData?: { [p: string]: ReactNode };
    data?: { [p: string]: any };
    customOptions?: { [p: string]: Array<{ [k: string]: any }> };
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
    const watchRel = useMemo(() => rels.filter((e: any) => e.Query && e.Query.match(regexGetVariableByThis)?.length), [rels.length])
    const staticRel = useMemo(() => rels.filter((e: any) => !e.Query?.length || !e.Query.match(regexGetVariableByThis)?.length), [rels.length])
    const watchVariables = useMemo(() => {
        return watchRel.map((e: any) => {
            const tmp = e.Query?.match(regexGetVariableByThis)![0]
            return methods.watch(tmp!.replace(regexGetVariableByThis, (_: any, k: string) => k));
        })
    }, [watchRel.length])
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const accountController = new AccountController()

    const onSubmit = async (ev: any) => {
        let dataItem = { ...ev }
        delete dataItem.id
        switch (formItem!.Category) {
            case 1:
                for (const key in dataItem) {
                    if (key === "Id") continue;
                    if (dataItem[key] !== undefined && dataItem[key] !== null) {
                        let _col: any = rels.find((e: any) => e.Column === key) ?? cols.find((e: any) => e.Name === key.replace('_min', "").replace('_max', ""));
                        if (typeof dataItem[key] !== "string" || dataItem[key].length || _col) {
                            if (_col) {
                                switch (_col?.DataType) {
                                    case FEDataType.NUMBER:
                                        let convertValue = typeof dataItem[key] === 'string' ? dataItem[key].length ? parseFloat(dataItem[key].replace(/,/g, '')) : undefined : dataItem[key]
                                        if (isNaN(convertValue)) convertValue = undefined
                                        if (convertValue) {
                                            params.set(key, convertValue.toString())
                                            dataItem[key] = convertValue
                                        } else {
                                            params.delete(key)
                                            delete dataItem[key]
                                        }
                                        break;
                                    case FEDataType.DATE:
                                    case FEDataType.DATETIME:
                                        params.set(key, dataItem[key].getTime().toString())
                                        dataItem[key] = dataItem[key].getTime()
                                        break;
                                    case FEDataType.MONEY:
                                        const convertMoney = (typeof dataItem[key] === 'string' && dataItem[key].replace(/,/g, '').length) ? parseInt(dataItem[key].replace(/,/g, '')) : undefined
                                        if (convertMoney) {
                                            params.set(key, convertMoney.toString())
                                            dataItem[key] = convertMoney
                                        } else {
                                            params.delete(key)
                                            delete dataItem[key]
                                        }
                                        break;
                                    case FEDataType.BOOLEAN:
                                        if ([true, 1, "true"].includes(dataItem[_col.Name])) params.set(key, "true")
                                        else params.delete(key)
                                        dataItem[key] = [true, 1, "true"].includes(dataItem[_col.Name]) ? true : false
                                        break;
                                    default:
                                        if (_col.Column && Array.isArray(dataItem[_col.Column])) {
                                            params.set(key, dataItem[key].join(","))
                                            dataItem[key] = dataItem[key].join(",")
                                        } else {
                                            params.set(key, dataItem[key])
                                        }
                                        break;
                                }
                            } else params.set(key, dataItem[key])
                        } else {
                            params.delete(key)
                            delete dataItem[key]
                        }
                    } else if (params.has(key)) {
                        params.delete(key)
                        delete dataItem[key]
                    }
                }
                delete dataItem.Id
                if (props.onSubmit) props.onSubmit(dataItem)
                break;
            default:
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
                                    if (props.autoBcrypt) {
                                        const getHashPassword = await accountController.hashPassword(dataItem[_col.Name])
                                        dataItem[_col.Name] = getHashPassword.data
                                    }
                                    break;
                                case FEDataType.FILE:
                                    if (dataItem[_col.Name] && Array.isArray(dataItem[_col.Name])) {
                                        const uploadFiles = dataItem[_col.Name].filter((e: any) => e instanceof File)
                                        if (uploadFiles.length) {
                                            const res = await BaseDA.uploadFiles(uploadFiles)
                                            if (res?.length) dataItem[_col.Name] = dataItem[_col.Name].map((e: any) => e instanceof File ? res.find((f: any) => f.Name === e.name)?.Id : e.Id).filter((id: string, i: number, arr: Array<string>) => id?.length && arr.indexOf(id) === i).join(",")
                                        } else {
                                            dataItem[_col.Name] = dataItem[_col.Name].map((e: any) => e.Id).join(",")
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
                break;
        }
    }

    useImperativeHandle(ref, () => ({
        onSubmit: methods.handleSubmit(onSubmit, props.onError),
        methods: methods as any
    }), [methods.watch(), cols.length, rels.length]);

    useEffect(() => {
        if (cols.length) {
            methods.reset()
            if (formItem!.Category === 1) {
                const mapData = (key: string, value: any) => {
                    if (value === undefined || value === null) return
                    let _col = rels.find(e => e.Column === key)
                    _col ??= cols.find(e => e.Name === key.replace('_min', "").replace('_max', ""))
                    if (_col) {
                        switch (_col.DataType) {
                            case FEDataType.NUMBER:
                                methods.setValue(key, typeof value === 'string' ? parseFloat(value) : value)
                                break;
                            case FEDataType.DATE:
                            case FEDataType.DATETIME:
                                methods.setValue(key, new Date(typeof value === 'string' ? parseInt(value) : value))
                                break;
                            case FEDataType.MONEY:
                                methods.setValue(key, Util.money(value))
                                break;
                            case FEDataType.BOOLEAN:
                                if (_col.Form.ComponentType === ComponentType.radio) methods.setValue(key, `${value}`)
                                else methods.setValue(key, value === "true")
                                break;
                            default:
                                methods.setValue(key, _col.Form.ComponentType === ComponentType.selectMultiple ? value.split(",") : value)
                                break;
                        }
                    } else methods.setValue(key, value)
                }
                if (props.data) {
                    for (const key in props.data) mapData(key, props.data[key])
                }
                for (const [key, value] of params) mapData(key, value)
            } else if (props.data) {
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
                                    methods.setValue(prop, dataItem[prop])
                                    break;
                                case FEDataType.STRING:
                                    if (_col.Form.Options?.length) {
                                        methods.setValue(prop, (dataItem[prop] ?? "").split(","))
                                    } else {
                                        methods.setValue(prop, dataItem[prop])
                                    }
                                    break;
                                case FEDataType.HTML:
                                    methods.setValue(prop, dataItem[prop])
                                    break;
                                case FEDataType.BOOLEAN:
                                    methods.setValue(prop, dataItem[prop])
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
                                case FEDataType.PASSWORD:
                                    methods.setValue(prop, dataItem[prop])
                                    break;
                                case FEDataType.FILE:
                                    if (dataItem[prop]) _fileIds.push({ id: dataItem[prop], name: prop })
                                    break;
                                default:
                                    break;
                            }
                        } else if (_rel) {
                            const _tmpParse = dataItem[prop]?.length ? dataItem[prop].split(",") : []
                            methods.setValue(prop, tmpLayer.Type === ComponentType.checkbox || tmpLayer.Type === ComponentType.selectMultiple ? _tmpParse : _tmpParse[0])
                        } else {
                            methods.setValue(prop, dataItem[prop])
                        }
                    } else methods.setValue(prop, dataItem[prop])
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
                inputLayers.filter(e => e.Setting.default !== undefined && e.Setting.default !== null).forEach((tmpLayer) => {
                    const _col = cols.find(e => tmpLayer.NameField === e.Name)
                    if (_col) {
                        switch (_col.DataType) {
                            case FEDataType.GID:
                                methods.setValue(_col.Name, tmpLayer.Setting.default)
                                break;
                            case FEDataType.STRING:
                                if (_col.Form.Options?.length) {
                                    methods.setValue(_col.Name, tmpLayer.Setting.default.split(","))
                                } else {
                                    methods.setValue(_col.Name, tmpLayer.Setting.default)
                                }
                                break;
                            case FEDataType.HTML:
                                methods.setValue(_col.Name, tmpLayer.Setting.default)
                                break;
                            case FEDataType.BOOLEAN:
                                methods.setValue(_col.Name, tmpLayer.Setting.default)
                                break;
                            case FEDataType.NUMBER:
                                methods.setValue(_col.Name, typeof tmpLayer.Setting.default === 'string' ? parseFloat(tmpLayer.Setting.default) : tmpLayer.Setting.default)
                                break;
                            case FEDataType.DATE:
                            case FEDataType.DATETIME:
                                methods.setValue(_col.Name, new Date(typeof tmpLayer.Setting.default === 'string' ? parseInt(tmpLayer.Setting.default) : tmpLayer.Setting.default))
                                break;
                            case FEDataType.MONEY:
                                methods.setValue(_col.Name, Util.money(tmpLayer.Setting.default))
                                break;
                            case FEDataType.PASSWORD:
                                methods.setValue(_col.Name, tmpLayer.Setting.default)
                                break;
                            default:
                                break;
                        }
                    }
                })
            }
        }
    }, [props.data, cols.length, params.toString()])

    useEffect(() => {
        getOptions({
            relatives: watchRel,
            isWatch: true
        })
    }, [...watchVariables])

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

    useEffect(() => {
        if (staticRel.length) getOptions({ relatives: staticRel })
    }, [staticRel.length])

    const getOptions = ({ relatives = [], isWatch = false }: { relatives?: Array<{ [p: string]: any }>, page?: number, isWatch?: boolean }) => {
        relatives.forEach((_rel) => {
            let tmpOptions = undefined
            if (props.customOptions) {
                tmpOptions = props.customOptions[`${_rel.Column}`]
            }
            if (tmpOptions) methodsOptions.setValue(`${_rel.Column}_Options`, tmpOptions)
            else {
                const _dataPKController = new DataController(_rel.TablePK)
                if (_rel.TablePK === formItem!.TbName) {
                    _dataPKController.filterByEmptyKey({
                        page: 1, size: 500, searchRaw: _rel.Query?.length ? isWatch ? _rel.Query.replace(regexGetVariableByThis, (m: string) => methods.getValues((regexGetVariableByThis.exec(m) ?? [])[1])) : _rel.Query : "*", key: `ParentId`
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
            }
        })
    }

    return formItem ? layers.filter((e: any) => !e.ParentId).map((e: any) => {
        return <RenderLayerElement
            key={e.Id}
            item={e}
            list={layers}
            style={props.style}
            className={props.className}
            type={"form"}
            methods={methods}
            indexItem={props.data}
            propsData={props.propsData}
            childrenData={props.childrenData}
            itemData={props.itemData}
            cols={cols}
            rels={rels}
            options={methodsOptions.watch()}
        />
    }) : null
})