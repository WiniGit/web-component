import styles from "./date-time-picker.module.css"
import { CSSProperties, forwardRef, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { differenceInCalendarDays } from "date-fns"
import { closePopup, Popup, showPopup } from "../popup/popup"
import { Text } from "../text/text"
import { Winicon } from "../wini-icon/winicon"
import { TextField } from "../text-field/text-field"
import { Calendar } from "../calendar/calendar"
import { Button } from "../button/button"
import { Checkbox } from "../checkbox/checkbox"

const today = new Date()
const startDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
)
const endDate = new Date(
    today.getFullYear() + 100,
    today.getMonth(),
    today.getDate()
)

const dateToString = (x: Date, y: string = "dd/mm/yyyy") => {
    let splitDateTime: Array<string> = y.split(" ");
    let dateFormat = splitDateTime[0]
    let timeFormat = splitDateTime[1]
    if (dateFormat.includes('hh')) {
        dateFormat = splitDateTime[1]
        timeFormat = splitDateTime[0]
    }
    let dateConvert: string = dateFormat.split(y.includes("/") ? "/" : "-").map(type => {
        switch (type.toLowerCase()) {
            case "dd":
                return x.getDate() < 10 ? `0${x.getDate()}` : `${x.getDate()}`;
            case "mm":
                return (x.getMonth() + 1) < 10 ? `0${(x.getMonth() + 1)}` : `${(x.getMonth() + 1)}`;
            case "yyyy":
                return `${x.getFullYear()}`;
            default:
                return ''
        }
    }).join(y.includes("/") ? "/" : "-");
    if (timeFormat) {
        let timeConvert = timeFormat.split(":").map(type => {
            switch (type) {
                case "hh":
                    return x.getHours() < 10 ? `0${x.getHours()}` : `${x.getHours()}`;
                case "mm":
                    return x.getMinutes() < 10 ? `0${x.getMinutes()}` : `${x.getMinutes()}`;
                case "ss":
                    return x.getSeconds() < 10 ? `0${x.getSeconds()}` : `${x.getSeconds()}`;
                default:
                    return ''
            }
        }).join(":")
        return dateConvert + " " + timeConvert;
    }
    return dateConvert;
}

const stringToDate = (_date: string, _format: string = "dd/mm/yyyy", _delimiter: string = "/") => {
    let dayformat: string = _format;
    let hourformat: string = '';
    let day: string = _date;
    let hours: string = '';
    let isHour: boolean = false;
    if (_format.trim().indexOf(" ") > -1) {
        dayformat = _format.trim().split(" ")[0];
        hourformat = _format.trim().split(" ")[1];
        day = _date.trim().split(" ")[0];
        hours = _date.trim().split(" ")[1] ?? '00:00:00';
        isHour = true;
    }
    let formatLowerCase: string = dayformat.toLowerCase();
    let formatItems: Array<string> = formatLowerCase.split(_delimiter);
    let dateItems: Array<string> = day.split(_delimiter);
    let monthIndex: number = formatItems.indexOf("mm");
    let dayIndex: number = formatItems.indexOf("dd");
    let yearIndex: number = formatItems.indexOf("yyyy");
    let hour: number = 0;
    let min: number = 0;
    let sec: number = 0;
    if (isHour) {
        let tmpHour: Array<string> = hourformat.split(":");
        let hourindex: number = tmpHour.indexOf("HH");
        if (hourindex < 0) {
            hourindex = tmpHour.indexOf("hh");
        }
        let mmindex: number = tmpHour.indexOf("mm");
        let ssindex: number = tmpHour.indexOf("ss");
        let time: Array<string> = hours.split(":");
        hour = parseInt(time[hourindex] ?? '0'); min = parseInt(time[mmindex] ?? '0'); sec = parseInt(time[ssindex] ?? '0');
    }
    let month: number = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(parseInt(dateItems[yearIndex]), month, parseInt(dateItems[dayIndex] ?? '0'), hour, min, sec);
    return formatedDate;
}
const inRangeTime = (date: Date, startDate: Date, endDate: Date) => (differenceInCalendarDays(date, startDate) > -1 && differenceInCalendarDays(endDate, date) > -1)

interface ValueProps {
    start?: Date,
    end?: Date,
    /** type: 1: daily, 2: weekly, 3: monthly */
    repeatData?: { type: 1 | 2 | 3, value: Array<string | number> }
}

interface DateTimePickerProps {
    id?: string,
    value?: Date,
    endValue?: Date,
    min?: Date,
    max?: Date,
    pickOnly?: boolean,
    helperText?: string,
    helperTextColor?: string,
    placeholder?: string,
    className?: string,
    style?: CSSProperties,
    disabled?: boolean,
    pickerType?: "auto" | "date" | "datetime" | "daterange" | "datetimerange",
    enableRepeat?: boolean,
    /** type: 1: daily, 2: weekly, 3: monthly */
    repeatValue?: { type: 1 | 2 | 3, value: Array<"everyday" | "last" | number> },
    prefix?: ReactNode,
    suffix?: ReactNode,
    onChange?: (ev?: Date | ValueProps) => void,
    simpleStyle?: boolean
}

export function DateTimePicker({ style = {}, ...props }: DateTimePickerProps) {
    const popupRef = useRef<any>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState<Date | ValueProps>()
    const txtValue = useMemo(() => {
        if (!value) return <Text className={styles["value"]}>{props.placeholder ?? ""}</Text>
        if (value instanceof Date) return <Text className={styles["value"]}>{dateToString(value, `dd/mm/yyyy${props.pickerType?.includes("time") ? " hh:mm" : ""}`)}</Text>
        else return <>
            <Text className={styles["value"]} style={{ flex: "none", width: "fit-content" }}>{dateToString(value.start ?? new Date(), `dd/mm/yyyy${(props.pickerType?.includes("time") || props.pickerType === "auto") ? " hh:mm" : ""}`)} - {dateToString(value.end ?? new Date(), `dd/mm/yyyy${(props.pickerType?.includes("time") || props.pickerType === "auto") ? " hh:mm" : ""}`)}</Text>
            {value.repeatData && <Winicon src="outline/arrows/loop-2" size={"1.2rem"} />}
        </>
    }, [value])

    useEffect(() => {
        if (inputRef.current) {
            if (value && value instanceof Date) inputRef.current.value = dateToString(value, `dd/mm/yyyy`)
            else inputRef.current.value = ""
        }
    }, [value, inputRef.current])

    useEffect(() => {
        switch (props.pickerType) {
            case "date":
            case "datetime":
                setValue(props.value)
                break;
            default:
                setValue((!props.value || !props.endValue) ? undefined : { start: props.value, end: props.endValue, repeatData: props.pickerType === "auto" || !props.pickerType ? props.repeatValue : undefined })
                break;
        }
    }, [props.value, props.endValue, props.repeatValue, props.pickerType])

    const showCalendar = (rect: any, onClose?: () => void) => {
        const offset: any = { top: rect.bottom + 2, left: rect.left + 16 }
        if ((rect.bottom + 380) > document.body.offsetHeight) {
            delete offset.top
            offset.bottom = `calc(100dvh - ${rect.y}px + 2px)`
        }
        showPopup({
            ref: popupRef,
            hideOverlay: true,
            content: <PopupDateTimePicker
                ref={popupRef}
                max={props.max}
                min={props.min}
                onClose={onClose}
                value={value instanceof Date ? value : value?.start}
                endValue={value instanceof Date ? undefined : value?.end}
                pickerType={props.pickerType}
                enableRepeat={props.enableRepeat || !!(!(value instanceof Date) && value?.repeatData)}
                repeatValue={(value instanceof Date ? undefined : value?.repeatData) as any}
                style={offset}
                onApply={(ev) => {
                    setValue(ev)
                    closePopup(popupRef)
                    if (props.onChange) props.onChange(ev)
                    if (inputRef.current) inputRef.current.focus()
                }}
            />
        })
    }

    const returnUI = () => {
        switch (props.pickerType) {
            case "date":
                return <label
                    id={props.id}
                    className={`row ${props.simpleStyle ? styles['simple-date-time-picker'] : styles["date-time-picker"]} ${props.className ?? (props.simpleStyle ? "" : 'body-3')} ${props.helperText?.length ? styles['helper-text'] : ""}`}
                    helper-text={props.helperText}
                    style={{ '--helper-text-color': props.helperTextColor ?? '#e14337', ...style } as CSSProperties}
                    onClick={(ev: any) => {
                        const rect = ev.target.closest("label").getBoundingClientRect()
                        showCalendar(rect)
                    }}>
                    {props.prefix ?? <Winicon className={styles["prefix-icon"]} src="outline/user interface/calendar-date-2" size={"1.2rem"} />}
                    <input
                        className={styles["value"]}
                        ref={inputRef}
                        autoComplete='off'
                        disabled={props.disabled}
                        placeholder={props.placeholder}
                        readOnly={props.pickOnly}
                        onKeyDown={(ev: any) => {
                            switch (ev.key.toLowerCase()) {
                                case "enter":
                                    ev.target.blur()
                                    break;
                                default:
                                    break;
                            }
                        }}
                        onBlur={props.pickOnly ? undefined : (ev) => {
                            const inputValue = ev.target.value.trim()
                            let dateValue: Date | undefined = undefined
                            if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                dateValue = stringToDate(inputValue, 'dd/MM/yyyy', '/')
                                if (inRangeTime(dateValue, props.min ?? startDate, props.min ?? endDate)) {
                                } else if (differenceInCalendarDays(props.min ?? startDate, dateValue) > -1) {
                                    dateValue = props.min ?? startDate
                                } else if (differenceInCalendarDays(dateValue, props.min ?? endDate) > -1) {
                                    dateValue = props.max ?? endDate
                                } else {
                                    dateValue = undefined
                                }
                            }
                            setValue(dateValue)
                            if (props.onChange) props.onChange(dateValue)
                        }}
                    />
                    {props.suffix}
                </label>
            default:
                return <div id={props.id}
                    className={`row ${props.simpleStyle ? styles['simple-date-time-picker'] : styles["date-time-picker"]} ${props.disabled ? styles['disabled'] : ""} ${props.className ?? (props.simpleStyle ? "" : 'body-3')} ${props.helperText?.length ? styles['helper-text'] : ""}`}
                    helper-text={props.helperText}
                    style={{ '--helper-text-color': props.helperTextColor ?? '#e14337', cursor: props.disabled ? undefined : 'pointer', ...style } as CSSProperties}
                    onClick={(ev: any) => {
                        const divElement = ev.target.closest(`div[class*="${props.simpleStyle ? 'simple-date-time-picker' : 'date-time-picker'}"]`)
                        if (divElement.isOpen) return closePopup(popupRef)
                        const rect = divElement.getBoundingClientRect()
                        divElement.isOpen = true
                        showCalendar(rect, () => {
                            divElement.isOpen = false
                        })
                    }}>
                    {props.prefix ?? <Winicon className={styles["prefix-icon"]} src="outline/user interface/calendar-date-2" size={"1.2rem"} />}
                    {txtValue}
                    {props.suffix}
                </div>
        }
    }

    return <>
        <Popup ref={popupRef} />
        {returnUI()}
    </>

}

interface PopupPickerProps {
    value?: Date,
    endValue?: Date,
    min?: Date,
    style?: CSSProperties,
    max?: Date,
    pickerType?: "auto" | "date" | "datetime" | "daterange" | "datetimerange",
    repeatValue?: { type: 1 | 2 | 3, value: Array<"everyday" | "last" | number> },
    onApply?: (ev: Date | ValueProps) => void,
    enableRepeat?: boolean,
    onClose?: () => void
}

const PopupDateTimePicker = forwardRef(({ value, style, endValue, repeatValue, onApply, pickerType = "auto", enableRepeat = false, min, max, onClose }: PopupPickerProps, ref: any) => {
    const methods = useForm({ shouldFocusError: false })
    const [selectTime, setSelectTime] = useState(false)
    const [isRepeat, setIsRepeat] = useState(false)
    const today = new Date()
    const [repeatData, setRepeatData] = useState<{ type: 1 | 2 | 3, value: Array<string | number> }>({ type: 1, value: ["everyday"] }) // 1: daily, 2: weekly, 3: monthly
    const popupRef = useRef<any>(null)
    const inputStartRef = useRef<TextField>(null)
    const inputEndRef = useRef<TextField>(null)
    const { t } = useTranslation()
    const regexDate = /[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g
    const regexTime = /^(?:[01]\d|2[0-3]):[0-5]\d(?:[:][0-5]\d)?$/g

    useEffect(() => {
        return () => onClose?.()
    }, [])

    useEffect(() => {
        if (repeatValue && enableRepeat) {
            setIsRepeat(true)
            setRepeatData(repeatValue)
        } else setIsRepeat(false)
    }, [repeatValue])

    useEffect(() => {
        if (selectTime && pickerType !== "auto" && !pickerType.includes("time")) {
            setSelectTime(false)
            methods.setValue('time-start', null)
            methods.setValue('time-end', null)
        } else if (!selectTime && pickerType.includes("time")) {
            setSelectTime(true)
        }
    }, [pickerType])

    const initStartValue = () => {
        if (value) {
            const initStart = new Date(value)
            methods.setValue('date-start', initStart)
            inputStartRef.current!.getInput()!.value = dateToString(initStart)
            if (pickerType.includes("time") || initStart.getSeconds() === 1) {
                setSelectTime(true)
                methods.setValue('time-start', `${initStart.getHours() < 9 ? `0${initStart.getHours()}` : initStart.getHours()}:${initStart.getMinutes() < 9 ? `0${initStart.getMinutes()}` : initStart.getMinutes()}`)
            }
        } else inputStartRef.current!.getInput()!.value = ""
    }

    const initEndValue = () => {
        if ((pickerType?.includes("range") || pickerType === "auto") && inputEndRef.current) {
            if (endValue) {
                const initEnd = new Date(endValue)
                methods.setValue('date-end', initEnd)
                inputEndRef.current.getInput()!.value = dateToString(initEnd)
                if (pickerType.includes("time") || initEnd.getSeconds() === 59) methods.setValue('time-end', `${initEnd.getHours() < 9 ? `0${initEnd.getHours()}` : initEnd.getHours()}:${initEnd.getMinutes() < 9 ? `0${initEnd.getMinutes()}` : initEnd.getMinutes()}`)
            } else inputEndRef.current.getInput()!.value = ""
        }
    }

    useEffect(() => {
        if (value && inputStartRef.current) initStartValue()
    }, [value, inputStartRef])

    useEffect(() => {
        initEndValue()
    }, [endValue, inputEndRef, pickerType])

    return <div className="col dropdown-popup" style={{ padding: 0, border: "none", backgroundColor: "transparent", ...style }}>
        <Popup ref={popupRef} />
        <Calendar
            min={min}
            max={max}
            style={{ width: "31.2rem" }}
            range={pickerType.includes("range") || pickerType === "auto"}
            value={pickerType === "date" || pickerType === "datetime" ? methods.watch('date-start') : (methods.watch('date-start') && methods.watch('date-end') ? { sTime: methods.watch('date-start'), eTime: methods.watch('date-end') } : undefined)}
            header={pickerType !== "date" && <div className='row' style={{ flexWrap: "wrap", gap: "0.8rem 1.2rem", padding: "1.6rem", borderBottom: "var(--neutral-main-border,1px solid light-dark(#EAEAEC, #313135))" }}>
                <TextField
                    ref={inputStartRef}
                    autoComplete="off"
                    className='col12 body-3'
                    style={{ "--gutter": "1.2rem", padding: "0.4rem 1.2rem" } as any}
                    placeholder={pickerType.includes("range") || pickerType === "auto" ? t("start-date") : "dd/mm/yyyy"}
                    onComplete={(ev: any) => ev.target.blur()}
                    onBlur={(ev) => {
                        const inputValue = ev.target.value
                        if (regexDate.test(inputValue)) {
                            const dateValue = stringToDate(inputValue, 'dd/mm/yyyy', '/')
                            if ((pickerType.includes("range") || pickerType === "auto") && differenceInCalendarDays(methods.getValues('date-end'), dateValue) < 0) {
                                methods.setValue('date-end', dateValue)
                                inputEndRef.current!.getInput()!.value = dateToString(dateValue)
                            }
                            methods.setValue('date-start', dateValue)
                        } else ev.target.value = methods.getValues('date-start') ? dateToString(methods.getValues('date-start')) : ""
                    }}
                />
                {(pickerType.includes("range") || pickerType === "auto") &&
                    <TextField
                        ref={inputEndRef}
                        autoComplete="off"
                        className='col12 body-3'
                        style={{ "--gutter": "1.2rem", padding: "0.4rem 1.2rem" } as any}
                        placeholder={t("end-date")}
                        onComplete={(ev: any) => ev.target.blur()}
                        onBlur={(ev) => {
                            const inputValue = ev.target.value
                            if (regexDate.test(inputValue)) {
                                const dateValue = stringToDate(inputValue, 'dd/mm/yyyy', '/')
                                if (differenceInCalendarDays(dateValue, methods.getValues('date-start')) < 0) {
                                    methods.setValue('date-start', dateValue)
                                    inputStartRef.current!.getInput()!.value = dateToString(dateValue)
                                }
                                methods.setValue('date-end', dateValue)
                            } else ev.target.value = methods.getValues('date-end') ? dateToString(methods.getValues('date-end')) : ""
                        }}
                    />}
                {selectTime && <>
                    <TextField
                        autoComplete="off"
                        name='time-start'
                        style={{ "--gutter": "1.2rem", padding: "0.4rem 1.2rem" } as any}
                        onComplete={(ev: any) => { ev.target.blur() }}
                        register={methods.register("time-start", {
                            onChange: (ev) => ev.target.value = ev.target.value.trim(),
                            onBlur: (ev) => {
                                if (regexTime.test(ev.target.value)) {
                                    methods.setValue('time-start', ev.target.value)
                                } else ev.target.value = ""
                            }
                        }) as any}
                        className='col12 body-3'
                        placeholder={"hh:mm"}
                        onFocus={(ev) => {
                            const rect = ev.target.closest("div")!.getBoundingClientRect()
                            showPopup({
                                ref: popupRef,
                                hideOverlay: true,
                                content: <div className={`col ${styles['popup-actions']} dropdown-popup`} style={{ maxHeight: "24rem", top: rect.bottom + 2, right: document.body.offsetWidth - rect.right, width: rect.width, overflow: "hidden auto", border: "var(--neutral-main-border,1px solid light-dark(#EAEAEC, #313135))" }}>
                                    {Array.from({ length: 48 }).map((_, i) => {
                                        if (i % 2 === 0) var timeValue = `${(i / 2) < 9 ? `0${i / 2}` : (i / 2)}:00`
                                        else timeValue = `${((i - 1) / 2) < 9 ? `0${(i - 1) / 2}` : ((i - 1) / 2)}:30`
                                        return <button key={"time-" + i} type="button" className="row" onClick={() => {
                                            methods.setValue("time-start", timeValue)
                                            closePopup(popupRef)
                                        }}>
                                            <Text className="body-3">{timeValue}</Text>
                                        </button>
                                    })}
                                </div>
                            })
                        }}
                    />
                    {(pickerType.includes("range") || pickerType === "auto") &&
                        <TextField
                            autoComplete="off"
                            name='time-end'
                            style={{ "--gutter": "1.2rem", padding: "0.4rem 1.2rem" } as any}
                            onComplete={(ev: any) => { ev.target.blur() }}
                            register={methods.register("time-end", {
                                onChange: (ev) => ev.target.value = ev.target.value.trim(),
                                onBlur: (ev) => {
                                    if (regexTime.test(ev.target.value)) {
                                        methods.setValue('time-end', ev.target.value)
                                    } else ev.target.value = ""
                                }
                            }) as any}
                            className='col12 body-3'
                            placeholder={"hh:mm"}
                            onFocus={(ev) => {
                                const rect = ev.target.closest("div")!.getBoundingClientRect()
                                showPopup({
                                    ref: popupRef,
                                    hideOverlay: true,
                                    content: <div className={`col ${styles['popup-actions']}`} style={{ maxHeight: "24rem", top: rect.bottom + 2, right: document.body.offsetWidth - rect.right, width: rect.width, overflow: "hidden auto", border: "var(--neutral-main-border,1px solid light-dark(#EAEAEC, #313135))" }}>
                                        {Array.from({ length: 48 }).map((_, i) => {
                                            if (i % 2 === 0) var timeValue = `${(i / 2) < 9 ? `0${i / 2}` : (i / 2)}:00`
                                            else timeValue = `${((i - 1) / 2) < 9 ? `0${(i - 1) / 2}` : ((i - 1) / 2)}:30`
                                            return <button key={"time-" + i} type="button" className="row" onClick={() => {
                                                methods.setValue("time-end", timeValue)
                                                closePopup(popupRef)
                                            }}>
                                                <Text className="body-3">{timeValue}</Text>
                                            </button>
                                        })}
                                    </div>
                                })
                            }}
                        />}
                </>}
            </div>}
            footer={pickerType !== "date" && <>
                {isRepeat && <div className='col' style={{ borderTop: "var(--neutral-main-border,1px solid light-dark(#EAEAEC, #313135))" }}>
                    <div className='row' style={{ gap: 4, padding: "1.2rem 1.6rem" }}>
                        <Text className='heading-8' style={{ flex: 1 }}>Lặp lại</Text>
                        <Button
                            style={{ padding: 0 }}
                            label={(() => {
                                switch (repeatData.type) {
                                    case 1:
                                        return t("daily")
                                    case 2:
                                        return t("weekly")
                                    case 3:
                                        return t("monthly")
                                    default:
                                        return ""
                                }
                            })()}
                            suffix={<Winicon src='outline/arrows/down-arrow' size={"1.4rem"} style={{ padding: "0.2rem" }} />}
                            onClick={(ev: any) => {
                                const rect = ev.target.closest("button").getBoundingClientRect()
                                showPopup({
                                    ref: popupRef,
                                    hideOverlay: true,
                                    style: { position: "absolute", top: rect.bottom + 2, left: rect.x + 8 },
                                    body: <div className="col popup-actions">
                                        {Array.from({ length: 3 }).map((_, num) => {
                                            let label = ""
                                            switch (num) {
                                                case 0:
                                                    label = t("daily")
                                                    break;
                                                case 1:
                                                    label = t("weekly")
                                                    break;
                                                case 2:
                                                    label = t("monthly")
                                                    break;
                                                default:
                                                    break;
                                            }
                                            return <button key={"tStatus-" + num} type="button" className="row" onClick={() => {
                                                let newValue: any = ["everyday"]
                                                switch (num) {
                                                    case 0:
                                                        newValue = ["everyday"]
                                                        break;
                                                    case 1:
                                                        newValue = today.getDay()
                                                        break;
                                                    case 2:
                                                        newValue = today.getDate()
                                                        break;
                                                    default:
                                                        break;
                                                }
                                                setRepeatData({ type: (num + 1) as any, value: [newValue] })
                                                closePopup(popupRef)
                                            }}>
                                                <Text className="button-text-3">{label}</Text>
                                            </button>
                                        })}
                                    </div>
                                })
                            }}
                        />
                    </div>
                    {(() => {
                        switch (repeatData.type) {
                            case 2:
                                return <>
                                    <Text className='heading-8' style={{ padding: "0 1.6rem" }}>{t("on") + " " + t("date").toLowerCase()}</Text>
                                    <div className='row' style={{ justifyContent: "space-between", padding: "0.4rem 1.6rem" }}>
                                        {Array.from({ length: 7 }).map((_, i) => {
                                            switch (i) {
                                                case 0:
                                                    var weekdayTitle = t("su")
                                                    break
                                                case 1:
                                                    weekdayTitle = t("mo")
                                                    break
                                                case 2:
                                                    weekdayTitle = t("tu")
                                                    break
                                                case 3:
                                                    weekdayTitle = t("we")
                                                    break
                                                case 4:
                                                    weekdayTitle = t("th")
                                                    break
                                                case 5:
                                                    weekdayTitle = t("fr")
                                                    break
                                                case 6:
                                                    weekdayTitle = t("sa")
                                                    break
                                                default:
                                                    weekdayTitle = ''
                                                    break
                                            }
                                            return <div key={"weekday-" + i} className='col' style={{ gap: 4, alignItems: "center" }}>
                                                <Checkbox size={"1.8rem"} value={repeatData.value.includes(i)} disabled={repeatData.value.includes(i) && repeatData.value.length === 1} onChange={(v) => {
                                                    if (v) setRepeatData({ type: 2, value: [...repeatData.value, i] })
                                                    else setRepeatData({ type: 2, value: repeatData.value.filter(id => id !== i) })
                                                }} />
                                                <Text className='placeholder-2'>{weekdayTitle}</Text>
                                            </div>
                                        })}
                                    </div>
                                </>
                            case 3:
                                return <div className='row' style={{ justifyContent: "space-between", padding: "0.4rem 1.6rem", gap: "1.2rem" }}>
                                    <Text className='heading-8' style={{ flex: 1 }}>{t("on") + " " + t("date").toLowerCase()}</Text>
                                    <Button
                                        style={{ padding: 0 }}
                                        label={repeatData.value[0] === "last" ? t("Last") : `${repeatData.value[0]}`}
                                        suffix={<Winicon src='outline/arrows/down-arrow' size={"1.4rem"} style={{ padding: "0.2rem" }} />}
                                        onClick={(ev: any) => {
                                            const rect = ev.target.closest("button").getBoundingClientRect()
                                            showPopup({
                                                ref: popupRef,
                                                hideOverlay: true,
                                                style: { top: rect.bottom + 2, right: document.body.offsetWidth - rect.right, maxHeight: "30.4rem" },
                                                body: <div className="col popup-actions" style={{ flex: 1, overflow: "hidden auto" }}>
                                                    {Array.from({ length: 29 }).map((_, num) => {
                                                        switch (num) {
                                                            case 28:
                                                                var label = t("Last")
                                                                break;
                                                            default:
                                                                label = `${num + 1}`
                                                                break;
                                                        }
                                                        return <button key={"date-" + num} type="button" className="row" onClick={() => {
                                                            setRepeatData({ type: 3, value: [num === 28 ? "last" : (num + 1)] })
                                                            closePopup(popupRef)
                                                        }}>
                                                            <Text className="button-text-3">{label}</Text>
                                                        </button>
                                                    })}
                                                </div>
                                            })
                                        }}
                                    />
                                </div>
                            default:
                                return null
                        }
                    })()}
                </div>}
                {onApply && <div className='row' style={{ gap: "0.8rem", padding: "1.2rem 1.6rem", borderTop: "var(--neutral-main-border,1px solid light-dark(#EAEAEC, #313135))" }}>
                    {pickerType === "auto" && <div className='row' style={{ gap: 4 }}>
                        <Winicon
                            src='outline/user interface/time-alarm'
                            size={"1.6rem"}
                            style={{ padding: "0.7rem", borderRadius: "50%", backgroundColor: selectTime ? "var(--neutral-disable-background-color,light-dark(#F4F4F5, #494950))" : undefined }}
                            onClick={() => { setSelectTime(!selectTime) }}
                        />
                        {(enableRepeat || pickerType === "auto") && <Winicon
                            src='outline/arrows/loop-2'
                            size={"1.6rem"}
                            style={{ padding: "0.7rem", borderRadius: "50%", backgroundColor: isRepeat ? "var(--neutral-disable-background-color,light-dark(#F4F4F5, #494950))" : undefined }}
                            onClick={() => { setIsRepeat(!isRepeat) }}
                        />}
                    </div>}
                    <div style={{ flex: 1 }} />
                    <Button
                        label={t("reset")}
                        onClick={() => {
                            methods.setValue("date-start", null)
                            methods.setValue("date-end", null)
                            methods.setValue("time-start", null)
                            methods.setValue("time-end", null)
                            initStartValue()
                            initEndValue()
                        }}
                    />
                    <Button
                        label={t("apply")}
                        disabled={!methods.watch("date-start") || (!methods.watch("date-end") && (pickerType.includes("range") || pickerType === "auto"))}
                        className={`button-text-3 button-primary`}
                        onClick={() => {
                            let dateStartValue = methods.getValues("date-start")
                            let timeStartValue = selectTime ? (methods.getValues("time-start")?.length ? methods.getValues("time-start") : "00:00") : "00:00"
                            dateStartValue.setHours(parseInt(timeStartValue.split(':')[0]), parseInt(timeStartValue.split(':')[1]), selectTime ? 1 : 0, 0)
                            if (pickerType.includes("range") || pickerType === "auto") {
                                var dateEndValue = methods.getValues("date-end")
                                let timeEndValue = selectTime ? (methods.getValues("time-end")?.length ? methods.getValues("time-end") : "23:59") : "23:59"
                                dateEndValue.setHours(parseInt(timeEndValue.split(':')[0]), parseInt(timeEndValue.split(':')[1]), selectTime ? 59 : 0, 0)
                            }
                            onApply(!pickerType.includes("range") && pickerType !== "auto" ? dateStartValue : { start: dateStartValue, end: dateEndValue, repeatData: isRepeat ? repeatData : undefined })
                            closePopup(ref)
                        }}
                    />
                </div>}
            </>}
            onSelect={(ev: any) => {
                if (pickerType !== "date") {
                    if (ev instanceof Date) {
                        methods.setValue('date-start', ev)
                        if (inputStartRef.current) inputStartRef.current.getInput()!.value = dateToString(ev)
                    } else {
                        methods.setValue('date-start', ev.sTime)
                        if (inputStartRef.current) inputStartRef.current.getInput()!.value = dateToString(ev.sTime)
                        if (pickerType.includes("range") || pickerType === "auto") {
                            methods.setValue('date-end', ev.eTime)
                            if (inputEndRef.current) inputEndRef.current.getInput()!.value = dateToString(ev.eTime)
                        }
                    }
                } else if (onApply) {
                    onApply(ev)
                    closePopup(ref)
                }
            }}
        />
    </div>
})