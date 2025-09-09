import ReactDOM from 'react-dom'
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import styles from "./table.module.css";
import { Util } from "../../controller/utils";
import { ColDataType, FEDataType } from "../da";
import { Text } from "../../component/text/text";
import { ConfigData } from "../../controller/config";
import { showTooltipElement } from "../../component/wini-icon/winicon";
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { i18n } from '../../language/i18n';
import { regexGetVariables, replaceVariables } from '../card/config';
import { Tag } from '../../component/tag/tag';

interface AutoCellContentProps {
    colItem: { [p: string]: any };
    data?: any;
    fields: { [p: string]: any }[];
    files: { [p: string]: any }[];
    style?: CSSProperties;
}

export const AutoCellContent = ({ colItem, data, fields = [], files = [], style = {} }: AutoCellContentProps) => {
    const { t } = useTranslation()
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const params = useParams()
    const mapValue = useMemo<any>(() => {
        if (!data || colItem.Column || (Array.isArray(data) && !data.length)) return undefined // data undefined or this is relative key
        const fieldItem = fields.find(e => e.Name === colItem.Name.split(".").pop())
        if (!fieldItem) return undefined
        const listData = Array.isArray(data) ? data : [data]
        switch (colItem.Type) {
            case ColDataType.people:
                return listData.filter(e => !!e);
            // @ts-ignore
            case ColDataType.label:
                if (fieldItem.Form?.Options?.length) {
                    return listData.map(item => {
                        let tmp = item[fieldItem.Name]
                        if (!!tmp) {
                            switch (fieldItem.DataType) {
                                case FEDataType.BOOLEAN:
                                    if (typeof tmp === "string") tmp = tmp === "true"
                                    else if (typeof tmp === "number") tmp = tmp === 1
                                    else tmp = tmp ? true : false
                                    break;
                                default:
                                    break;
                            }
                            if (typeof tmp === "string") tmp = tmp.split(",").map(id => fieldItem.Form.Options.find((e: any) => e.id === id)).filter(n => !!n)
                            else tmp = fieldItem.Form.Options.filter((e: any) => e.id === tmp)
                        }
                        return tmp
                    }).filter(e => !!e).flat(Infinity)
                }
            default:
                const joinValue = listData.map(item => {
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
                                    switch (colItem.Format?.toLowerCase()) {
                                        case "date month year":
                                        case "day date month year":
                                            const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
                                            const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
                                            const date = new Date(tmp);
                                            const dayName = t(days[date.getDay()]);
                                            const day = date.getDate();
                                            const month = t(months[date.getMonth()]);
                                            const year = date.getFullYear();
                                            if (colItem.Format.toLowerCase().includes("day")) tmp = `${dayName}, ${day} ${month} ${year}`;
                                            else tmp = `${day} ${month} ${year}`;
                                            break;
                                        default:
                                            if (tmp) tmp = Util.datetoString(new Date(tmp), colItem.Format?.toLowerCase() ?? "dd/mm/yyyy hh:mm")
                                            break;
                                    }
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
                if (fieldItem.DataType === FEDataType.HTML) return <ContentView content={joinValue} />
                return joinValue
        }
    }, [colItem, data])

    const replaceThisVariables = (content: string, dataItem: any) => {
        return content.replace(replaceVariables, (m) => {
            const execRegex = regexGetVariables.exec(m)
            if (!execRegex?.[1]) return m
            const variable = execRegex[1].split(".")
            let getValue: any = m
            switch (variable[0]) {
                case "this":
                    getValue = dataItem?.[variable[1]]
                    break;
                case "location":
                    getValue = (location as any)[variable[1]]
                    break;
                case "query":
                    getValue = query.get(variable[1])
                    break;
                case "params":
                    getValue = params[variable[1]]
                    break;
                case "cookie":
                    getValue = Util.getCookie(variable[1])
                    break;
                case "storage":
                    getValue = Util.getStorage(variable[1])
                    break;
                case "session":
                    getValue = Util.getSession(variable[1])
                    break;
                default:
                    break;
            }
            return getValue
        })
    }

    switch (colItem.Type) {
        case ColDataType.text:
            if (typeof mapValue === "string")
                return <p className="comp-text body-3" style={{ "--max-line": 2, margin: 0, flex: 1, ...style } as any}>{mapValue}</p>
            else return mapValue
        case ColDataType.label:
            if (typeof mapValue === "string")
                return <p className="comp-text body-3" style={{ "--max-line": 2, margin: 0, flex: 1, ...style } as any}>{mapValue}</p>
            else
                return mapValue?.map((item: any, i: number) => {
                    return <Tag key={item.id + "-" + i} title={item.name} className="size24 label-5" style={{ borderRadius: 8, border: "none", backgroundColor: item.color }} />;
                })
        case ColDataType.website:
            const listData = Array.isArray(data) ? data : [data]
            return listData.map((item, i) => {
                if (!item) return null
                if (item && regexGetVariables.test(colItem.Link)) {
                    var url = replaceThisVariables(colItem.Link, item)
                    if (!url.includes("https")) url = (url.startsWith("/") ? "/" : "") + url.split("/").filter((e) => !!e.trim()).join("/")
                } else if (colItem.Link.includes("https")) {
                    url = colItem.Link
                } else {
                    url = colItem.Link.startsWith("/") ? colItem.Link : `/${colItem.Link}`
                }
                return <NavLink key={item.Id + "-" + i} to={url} target="_blank" className={`body-3 ${styles["link-hover"]}`} style={{ "--max-line": 2, margin: 0, flex: 1, ...style } as any}>{mapValue}</NavLink>
            })
        case ColDataType.people:
            return mapValue?.map((item: any) => <div key={item.Id} className="row" style={{ gap: "0.8rem", flex: 1, ...style }}>
                <CustomerAvatar data={item} style={{ width: "3.2rem", height: "3.2rem" }} />
                <Text className="label-4" style={{ flex: 1 }}>{item.Name}</Text>
            </div>)
        case ColDataType.files:
            const sliceList = files.filter(f => mapValue.includes(f.Id)).slice(0, 2)
            return <>
                {sliceList.map((f, fIndex, arr) => {
                    const tmp: any = {}
                    if (arr.length - 1 === fIndex && mapValue.split(",").length > 2 && f.Type?.includes("image")) tmp["img-length"] = `+${mapValue.split(",").length - 2}`
                    return <NavLink key={f.Id + "-" + fIndex} to={f.Url.startsWith("https") ? f.Url : (ConfigData.fileUrl + f.Url)} target='_blank' className={styles["table-img"]} style={style} {...tmp}>
                        {f.Type?.includes("image") ?
                            <img alt={f.Name} src={f.Url.startsWith("https") ? f.Url : f.Id.startsWith("http") ? f.Id : (ConfigData.imgUrlId + f.Id)} /> :
                            <Text className='body-3' maxLine={2} style={{ color: "var(--primary-main-color)", flex: 1 }}>{f.Name},</Text>}
                    </NavLink>
                })}
                {sliceList[1] && !sliceList[1].Type?.includes("image") && mapValue.split(",").length > 2 && <Text className='body-3' maxLine={1}>{`+${mapValue.split(",").length - 2}...`}</Text>}
            </>
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


export const cellValue = (colItem: { [p: string]: any }, data: any, fields: { [p: string]: any }[] = [], files: { [p: string]: any }[] = []) => {
    const mapValue = () => {
        if (!data || colItem.Column || (Array.isArray(data) && !data.length)) return undefined // data undefined or this is relative key
        const fieldItem = fields.find(e => e.Name === colItem.Name.split(".").pop())
        if (!fieldItem) return undefined
        const listData = Array.isArray(data) ? data : [data]
        return listData.filter(e => e !== undefined && e !== null).map(item => {
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
                            switch (colItem.Format?.toLowerCase()) {
                                case "date month year":
                                case "day date month year":
                                    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
                                    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
                                    const date = new Date(tmp);
                                    const dayName = i18n.t(days[date.getDay()]);
                                    const day = date.getDate();
                                    const month = i18n.t(months[date.getMonth()]);
                                    const year = date.getFullYear();
                                    if (colItem.Format.toLowerCase().includes("day")) tmp = `${dayName}, ${day} ${month} ${year}`;
                                    else tmp = `${day} ${month} ${year}`;
                                    break;
                                default:
                                    if (tmp) tmp = Util.datetoString(new Date(tmp), colItem.Format ?? "dd/mm/yyyy hh:mm")
                                    break;
                            }
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
    }

    const tmp: any = mapValue()

    switch (colItem.Type) {
        case ColDataType.files:
            return files.filter(f => tmp.includes(f.Id)).map((f) => ConfigData.fileUrl + f.Url).join(", ")
        default:
            return tmp
    }
}

function ContentView({ content, maxLength = 100 }: { content: string, maxLength?: number }) {
    const divRef = useRef<any>(null)
    const [contentInnerText, setContentInnerText] = useState("")

    useEffect(() => {
        if (divRef.current && maxLength) {
            setContentInnerText(divRef.current.innerText.slice(0, maxLength) + "...")
        }
    }, [content])

    return (!!content?.length && !!contentInnerText.length) ?
        <p className="comp-text body-3" style={{ "--max-line": 2, margin: 0, flex: 1 } as any}>{contentInnerText}</p> :
        <div
            ref={divRef}
            className="body-3"
            dangerouslySetInnerHTML={{ __html: content }}
        />
}