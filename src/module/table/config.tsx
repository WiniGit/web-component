import ReactDOM from 'react-dom'
import { CSSProperties, useMemo, useRef, useState } from "react";
import styles from "./table.module.css";
import { Util } from "../../controller/utils";
import { Rating } from "../../component/rating/rating";
import { ColDataType, ComponentType, FEDataType } from "../da";
import { Text } from "../../component/text/text";
import { ConfigData } from "../../controller/config";
import { showTooltipElement } from "../../component/wini-icon/winicon";
import { NavLink } from 'react-router-dom';

export function getTableConfig(item: { [p: string]: any }, data: { [p: string]: any }) {
    let _value: any;
    let _minW: any;
    switch (item.DataType) {
        case FEDataType.GID:
            _minW = '8rem'
            if (data) _value = data[item.Name]
            break;
        case FEDataType.STRING:
            _minW = '20rem'
            if (data) _value = data[item.Name]
            break;
        case FEDataType.BOOLEAN:
            _minW = '12rem'
            if (data) _value = data[item.Name] ? "true" : "false"
            break;
        case FEDataType.NUMBER:
            _minW = '12rem'
            if (data) _value = data[item.Name] ? typeof data[item.Name] === 'string' ? parseFloat(data[item.Name]) : data[item.Name] : undefined
            if (item.Form?.ComponentType === ComponentType.rate) {
                _minW = '8rem'
                _value = <Rating value={_value} />
            } else if (item.Form?.Options?.length) {
                _minW = "20rem"
            }
            break;
        case FEDataType.DATE:
            _minW = '14rem'
            if (data) _value = data[item.Name] ? Util.datetoString(new Date(typeof data[item.Name] === 'string' ? parseInt(data[item.Name]) : data[item.Name])) : undefined
            break;
        case FEDataType.DATETIME:
            _minW = '22rem'
            if (data) _value = data[item.Name] ? Util.datetoString(new Date(typeof data[item.Name] === 'string' ? parseInt(data[item.Name]) : data[item.Name]), "dd/MM/yyyy hh:mm") : undefined
            break;
        case FEDataType.MONEY:
            _minW = '20rem'
            if (data) _value = data[item.Name] ? Util.money(data[item.Name] === 'string' ? parseInt(data[item.Name]) : data[item.Name]) : undefined
            break;
        case FEDataType.PASSWORD:
            _minW = '8rem'
            if (data) _value = data[item.Name] ? "************" : undefined
            break;
        case FEDataType.HTML:
            _minW = '28rem'
            if (data) _value = <Text className={`body-3 ${styles['html-value-cell']}`} style={{ '--max-line': 2, width: "100%", height: "100%" } as any} html={data[item.Name]} />
            break;
        case FEDataType.FILE:
            _minW = '6rem'
            break;
        default:
            break;
    }
    if (item.Form?.Options?.length && data) {
        if (item.Form.ComponentType === ComponentType.select1) {
            _value = item.Form.Options.find((e: any) => e.id === data[item.Name])?.name ?? _value
        } else {
            _value = item.Form.Options.filter((e: any) => {
                switch (item.DataType) {
                    case FEDataType.BOOLEAN:
                        return data[item.Name] === e.id || `${data[item.Name]}` === `${e.id}`
                    default:
                        return data[item.Name]?.includes(e?.id ?? "");
                }
            }).map((e: any) => e.name).join(",")
        }
    }
    return { "_minW": _minW, "_value": _value }
}

interface AutoCellContentProps {
    colItem: { [p: string]: any };
    data?: any;
    fields: { [p: string]: any }[];
    files: { [p: string]: any }[];
    style?: CSSProperties;
}

export const AutoCellContent = ({ colItem, data, fields = [], files = [], style = {} }: AutoCellContentProps) => {
    const mapValue = useMemo<any>(() => {
        if (!data || colItem.Column || (Array.isArray(data) && !data.length)) return undefined // data undefined or this is relative key
        const fieldItem = fields.find(e => e.Name === colItem.Name.split(".").pop())
        if (!fieldItem) return undefined
        const listData = Array.isArray(data) ? data : [data]
        if (colItem.Type === ColDataType.people) return listData.filter(e => e !== undefined && e !== null)
        return listData.map(item => {
            let tmp = item[fieldItem.Name]
            switch (fieldItem.DataType) {
                case FEDataType.DATE:
                    if (tmp) tmp = Util.datetoString(new Date(tmp))
                    break;
                case FEDataType.DATETIME:
                    switch (colItem.Type) {
                        case ColDataType.text:
                            if (tmp) tmp = new Date(tmp).toLocaleString()
                            break;
                        default:
                            if (tmp) tmp = Util.datetoString(new Date(tmp), "dd/mm/yyyy hh:mm")
                            break;
                    }
                    break;
                case FEDataType.MONEY:
                    if (tmp) tmp = Util.money(tmp)
                    break;
                case FEDataType.PASSWORD:
                    if (tmp) tmp = "************"
                    break;
                case FEDataType.BOOLEAN:
                    if (typeof tmp === "string") tmp = tmp === "true"
                    else if (typeof tmp === "number") tmp = tmp === 1
                    else tmp = tmp ? true : false
                    break;
                default:
                    break;
            }
            if (fieldItem.Form?.Options?.length && tmp !== undefined) {
                if (typeof tmp === "string") tmp = tmp.split(",").map(id => fieldItem.Form.Options.find((e: any) => e.id === id)?.name).filter(n => n).join(", ")
                else tmp = fieldItem.Form.Options.find((e: any) => e.id === tmp)?.name
            }
            return `${tmp ?? ""}`
        }).join(", ")
    }, [colItem, data])

    switch (colItem.Type) {
        case ColDataType.text:
            return <p className="comp-text body-3" style={{ "--max-line": 2, margin: 0, flex: 1, ...style } as any}>{mapValue}</p>
        case ColDataType.people:
            return mapValue?.map((item: any) => <div key={item.Id} className="row" style={{ gap: "0.8rem", flex: 1, ...style }}>
                <CustomerAvatar data={item} style={{ width: "3.2rem", height: "3.2rem" }} />
                <Text className="label-4" style={{ flex: 1 }}>{item.Name}</Text>
            </div>)
        case ColDataType.files:
            return files.filter((f: any) => mapValue.includes(f.Id)).map((f: any, fIndex: number, arr: any[]) => {
                const tmp: any = {}
                if (arr.length - 1 === fIndex && mapValue.split(",").length > 2) tmp["img-length"] = `+${mapValue.split(",").length - 2}`
                return <NavLink key={f.Id + "-" + fIndex} to={ConfigData.fileUrl + f.Url} target='_blank' className={styles["table-img"]} style={style} {...tmp}>
                    {f.Type?.includes("image") ?
                        <img alt={f.Name} src={ConfigData.imgUrlId + f.Id} /> :
                        <Text className='body-3' maxLine={1} style={{ color: "var(--primary-main-color)" }}>{f.Name}</Text>}
                </NavLink>
            })
        default:
            return <p className="comp-text body-3" style={{ "--max-line": 2, margin: 0, flex: 1, ...style } as any}>{mapValue}</p>
    }
}

interface CustomerAvatarProps {
    data: { [p: string]: any }
    style?: CSSProperties
    onClick?: () => void
    emableTooltip?: boolean
}

export const CustomerAvatar = ({ data, style = {}, onClick, emableTooltip = false }: CustomerAvatarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const customer = useMemo<{ [p: string]: any } | null>(() => (data ? { ...data, bgColor: Util.generateDarkColorRgb(data.Id) } : null), [data])
    const [errorImg, setErrorImg] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false);

    const commonProps = useMemo<{ [p: string]: any }>(() => {
        if (!customer) return {}
        const tmp: any = {
            onClick: onClick,
            style: customer.AvatarUrl && !errorImg ?
                { cursor: onClick ? "pointer" : "auto", ...style } :
                { backgroundColor: customer.bgColor, color: "#fff", cursor: onClick ? "pointer" : "auto", ...style }
        }
        if (emableTooltip) {
            tmp.onMouseOver = () => { setShowTooltip(true) }
            tmp.onMouseOut = () => { setShowTooltip(false) }
        }
        return tmp
    }, [style, customer, onClick, errorImg])

    return customer && <div className={`row ${styles["customer-avatar"]}`} {...commonProps} ref={ref}>
        {customer.AvatarUrl && !errorImg ?
            <img
                src={customer.AvatarUrl.startsWith("https") ? customer.AvatarUrl : (ConfigData.imgUrlId + customer.AvatarUrl)}
                alt='' style={{ width: '100%', height: '100%', objectFit: "contain" }}
                onError={() => { setErrorImg(true) }}
            /> :
            <Text className="row" style={{ fontSize: "1em", fontWeight: 600, color: "#fff" }}>{customer?.Name?.substring(0, 1)}</Text>}
        {showTooltip && ReactDOM.createPortal(showTooltipElement({ element: ref.current, tooltip: { message: data.Name, position: "bottom" } }), document.body)}
    </div>
}