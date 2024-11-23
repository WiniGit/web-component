/* eslint-disable react-hooks/exhaustive-deps */
import React, { CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import './date-picker.css'
import { CalendarType, Calendar, Winicon } from '../../index'
import { endDate, inRangeTime, startDate, today } from '../calendar/calendar'
import { differenceInCalendarDays } from 'date-fns'

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
                    return 'D'
            }
        }).join(":")
        return dateConvert + " " + timeConvert;
    }
    return dateConvert;
}

const stringToDate = (_date: string, _format: string = "dd/MM/yyyy", _delimiter: string = "/") => {
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

interface DatePickerProps {
    id?: string,
    value?: string,
    min?: Date,
    max?: Date,
    onChange?: (e?: string) => void,
    onComplete?: React.KeyboardEventHandler<HTMLInputElement>,
    onFocus?: React.FocusEventHandler<HTMLInputElement>,
    disabled?: boolean,
    pickOnly?: boolean,
    helperText?: string,
    helperTextColor?: string,
    placeholder?: string,
    className?: string,
    hideButtonToday?: boolean,
    style?: CSSProperties,
    /* default: DATE */
    pickerType?: CalendarType,
    /* y: dd/mm/yyy || dd/mm/yyyy hh:mm:ss || hh:mm:ss dd/mm/yyyy, default: dd/mm/yyyy */
    formatDate?: string
}

interface DatePickerState {
    value?: string,
    offset: DOMRect,
    isOpen: boolean,
    style?: Object
}


export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
    constructor(props: DatePickerProps) {
        super(props)
        this.state = {
            value: props.value,
            offset: {
                x: 0,
                y: 0,
                height: 0,
                width: 0,
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                toJSON: function () {
                    throw new Error('Function not implemented.')
                }
            },
            isOpen: false,
        }
    }

    getNewValue = (value?: string) => {
        const params: string = value ?? this.state?.value ?? ''
        if (params.trim()?.length) {
            switch (this.props.pickerType) {
                case CalendarType.YEAR:
                    return new Date(parseInt(params), 1, 1)
                case CalendarType.MONTH:
                    let splitParams: Array<string> = params.includes('/') ? params.split('/') : params.split('-')
                    return new Date(parseInt(splitParams[1] ?? `${today.getFullYear()}`), parseInt(splitParams[0] ?? `${today.getMonth()}`), 1)
                case CalendarType.DATETIME:
                    return stringToDate(params, this.props.formatDate ?? 'dd/mm/yyyy hh:mm')
                default:
                    return stringToDate(params)
            }
        }
        return undefined
    }

    componentDidUpdate(prevProps: DatePickerProps, prevState: DatePickerState) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                ...this.state,
                value: this.props.value,
            })
        }
        if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
            const thisPopupRect = document.body.querySelector('.date-picker-popup-container')?.getBoundingClientRect()
            if (thisPopupRect) {
                let style: { top?: string, left?: string, right?: string, bottom?: string, width?: string, height?: string } | undefined;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        right: document.body.offsetWidth - this.state.offset.left + 'px'
                    }
                }
                if ((thisPopupRect.bottom - 12) > document.body.offsetHeight) {
                    style = style ? {
                        ...style,
                        top: undefined,
                        bottom: document.body.offsetHeight - this.state.offset.top + 'px'
                    } : {
                        left: this.state.offset.x + 'px',
                        bottom: document.body.offsetHeight - this.state.offset.top + 'px'
                    }
                }
                if (style) this.setState({ ...this.state, style: style })
            }
        }
    }

    private onOpenCalendar = (ev: any) => {
        if (!this.state.isOpen) {
            this.setState({
                ...this.state,
                isOpen: true,
                style: undefined,
                offset: ev.target.closest('.date-picker-container').getBoundingClientRect()
            })
        }
    }

    render() {
        let maxLength = 10
        switch (this.props.pickerType) {
            case CalendarType.YEAR:
                maxLength = 4
                break;
            case CalendarType.MONTH:
                maxLength = 7
                break;
            case CalendarType.DATETIME:
                maxLength = 19
                break;
            default:
                break;
        }
        return <div id={this.props.id} className={`date-picker-container row ${this.props.className ?? 'body-3'} ${this.props.disabled ? 'disabled' : ''} ${this.props.helperText?.length && 'helper-text'}`}
            helper-text={this.props.helperText}
            style={this.props.style ? { ...({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties), ...this.props.style } : ({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties)}
        >
            <div className='input-field-value row' style={{ height: '4rem' }}>
                <input
                    autoComplete='off'
                    value={this.state.value ?? ''}
                    onChange={(ev) => this.setState({ ...this.state, value: ev.target.value })}
                    placeholder={this.props.placeholder}
                    maxLength={maxLength}
                    readOnly={this.props.pickOnly}
                    onFocus={this.props.pickOnly ? (ev) => {
                        this.onOpenCalendar(ev)
                        if (this.props.onFocus) this.props.onFocus(ev)
                    } : this.props.onFocus}
                    onKeyDown={this.props.onComplete ? (ev) => {
                        if (this.props.onComplete) {
                            switch (ev.key.toLowerCase()) {
                                case "enter":
                                    this.props.onComplete(ev)
                                    break;
                                default:
                                    break;
                            }
                        }
                    } : undefined}
                    onBlur={ev => {
                        const inputValue = ev.target.value.trim()
                        switch (this.props.pickerType) {
                            case CalendarType.YEAR:
                                let minYear = (this.props.min ?? startDate).getFullYear()
                                let maxYear = (this.props.min ?? endDate).getFullYear()
                                if (!isNaN(parseInt(inputValue)) && parseInt(inputValue) <= maxYear && parseInt(inputValue) >= minYear) {
                                    this.setState({ ...this.state, isOpen: false, value: inputValue })
                                    if (this.props.onChange) this.props.onChange(inputValue)
                                } else {
                                    this.setState({ ...this.state, isOpen: false, value: undefined })
                                    if (this.props.onChange) this.props.onChange(undefined)
                                }
                                break
                            case CalendarType.MONTH:
                                if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                    let dateValue = stringToDate(`1/${inputValue}`, 'dd/MM/yyyy', '/')
                                    if (inRangeTime(dateValue, this.props.min ?? startDate ?? startDate, this.props.min ?? endDate ?? endDate)) {
                                        this.setState({ ...this.state, isOpen: false, value: dateToString(dateValue) })
                                        if (this.props.onChange) this.props.onChange(dateToString(dateValue))
                                    } else {
                                        this.setState({ ...this.state, isOpen: false, value: undefined })
                                        if (this.props.onChange) this.props.onChange(undefined)
                                    }
                                } else {
                                    this.setState({ ...this.state, isOpen: false, value: undefined })
                                    if (this.props.onChange) this.props.onChange(undefined)
                                }
                                break
                            case CalendarType.DATETIME:
                                let dateTimeValue: Date | undefined = undefined
                                if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                    dateTimeValue = stringToDate(inputValue, this.props.formatDate ?? 'dd/mm/yyyy hh:mm', '/')
                                    if (inRangeTime(dateTimeValue, this.props.min ?? startDate, this.props.min ?? endDate)) {
                                    } else if (differenceInCalendarDays(this.props.min ?? startDate, dateTimeValue) > -1) {
                                        dateTimeValue = this.props.min ?? startDate
                                    } else if (differenceInCalendarDays(dateTimeValue, this.props.min ?? endDate) > -1) {
                                        dateTimeValue = this.props.min ?? startDate
                                    } else {
                                        dateTimeValue = undefined
                                    }
                                }
                                const stateDateTimeValue = dateTimeValue ? dateToString(dateTimeValue, this.props.formatDate ?? 'dd/mm/yyyy hh:mm') : dateTimeValue
                                this.setState({ ...this.state, isOpen: false, value: stateDateTimeValue })
                                if (this.props.onChange) this.props.onChange(stateDateTimeValue)
                                break;
                            default:
                                let dateValue: Date | undefined = undefined
                                if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                    dateValue = stringToDate(inputValue, 'dd/MM/yyyy', '/')
                                    if (inRangeTime(dateValue, this.props.min ?? startDate, this.props.min ?? endDate)) {
                                    } else if (differenceInCalendarDays(this.props.min ?? startDate, dateValue) > -1) {
                                        dateValue = this.props.min ?? startDate
                                    } else if (differenceInCalendarDays(dateValue, this.props.min ?? endDate) > -1) {
                                        dateValue = this.props.max ?? endDate
                                    } else {
                                        dateValue = undefined
                                    }
                                }
                                const stateDateValue = dateValue ? dateToString(dateValue) : dateValue
                                this.setState({ ...this.state, isOpen: false, value: stateDateValue })
                                if (this.props.onChange) this.props.onChange(stateDateValue)
                                break;
                        }
                    }}
                />
            </div>
            <Winicon
                src={`outline/user interface/${this.props.pickerType === CalendarType.DATETIME ? "opening-times" : "calendar-date-2"}`}
                size={'1.6rem'}
                onClick={this.onOpenCalendar}
            />
            {this.state.isOpen &&
                ReactDOM.createPortal(
                    <div className={`popup-overlay hidden-overlay`} onClick={(ev) => {
                        if ((ev.target as HTMLElement).classList.contains('popup-overlay'))
                            this.setState({ ...this.state, isOpen: false })
                    }}>
                        <Calendar
                            min={this.props.min}
                            max={this.props.max}
                            value={this.getNewValue()}
                            type={this.props.pickerType ?? CalendarType.DATE}
                            className='date-picker-popup-container'
                            style={this.state.style ?? { top: this.state.offset.y + this.state.offset.height + 2 + 'px', left: this.state.offset.x + 'px', border: 'none', boxShadow: '-20px 20px 40px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)' }}
                            onSelect={(dateValue: Date) => {
                                switch (this.props.pickerType) {
                                    case CalendarType.YEAR:
                                        this.setState({ ...this.state, value: dateValue.getFullYear().toString(), isOpen: false })
                                        if (this.props.onChange) this.props.onChange(dateValue.getFullYear().toString())
                                        break;
                                    case CalendarType.MONTH:
                                        var newValue = dateToString(dateValue)
                                        this.setState({ ...this.state, value: newValue.split('/').slice(1).join('/'), isOpen: false })
                                        if (this.props.onChange) this.props.onChange(newValue.split('/').slice(1).join('/'))
                                        break;
                                    case CalendarType.DATETIME:
                                        var newValue = dateToString(dateValue, this.props.formatDate ?? 'dd/mm/yyyy hh:mm')
                                        this.setState({ ...this.state, value: newValue })
                                        break;
                                    default:
                                        var newValue = dateToString(dateValue)
                                        this.setState({ ...this.state, value: newValue, isOpen: false })
                                        if (this.props.onChange) this.props.onChange(newValue)
                                        break;
                                }
                            }}
                            footer={(this.props.pickerType === CalendarType.DATETIME || !this.props.hideButtonToday) && <div className='row picker-popup-footer' >
                                {this.props.pickerType === undefined || this.props.pickerType === CalendarType.DATE || this.props.pickerType === CalendarType.DATETIME ?
                                    <button
                                        type='button'
                                        className='row button-text-3'
                                        style={{ color: 'var(--infor-main-color)', width: 'fit-content' }}
                                        onClick={() => {
                                            let format = this.props.formatDate ?? (this.props.pickerType === CalendarType.DATETIME ? 'dd/mm/yyyy hh:mm' : 'dd/mm/yyyy')
                                            this.setState({ ...this.state, isOpen: false, value: dateToString(today, format) })
                                            if (this.props.onChange) this.props.onChange(dateToString(today, format))
                                        }}
                                    >
                                        Today
                                    </button> : null}
                                {this.props.pickerType === CalendarType.DATETIME ? <>
                                    <div style={{ flex: 1 }}></div>
                                    <button type='button' className='row button-primary' style={{ padding: '0.6rem 0.8rem' }} onClick={() => {
                                        this.setState({ ...this.state, isOpen: false })
                                        if (this.props.onChange) this.props.onChange(this.state.value)
                                    }} >
                                        <div className='button-text-3'>Apply</div>
                                    </button>
                                </> : null}
                            </div>}
                        />
                    </div>,
                    document.body
                )}
        </div>
    }
}
