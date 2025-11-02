import React, { CSSProperties, ReactNode } from "react"
import styles from './calendar.module.css'
import { differenceInCalendarDays } from "date-fns"
import { WithTranslation, withTranslation } from 'react-i18next';
import { Winicon } from "../wini-icon/winicon";

export const today = new Date()
export const startDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
)
export const endDate = new Date(
    today.getFullYear() + 100,
    today.getMonth(),
    today.getDate()
)

export const inRangeTime = (date: Date, startDate: Date, endDate: Date) => (differenceInCalendarDays(date, startDate) > -1 && differenceInCalendarDays(endDate, date) > -1)

enum CalendarTab {
    DATE = 0,
    MONTH = 1,
    YEAR = 2,
}

interface CalendarProps extends WithTranslation {
    id?: string,
    value?: Date | { sTime: Date, eTime: Date },
    range?: boolean,
    min?: Date,
    max?: Date,
    onSelect?: (props: Date | { sTime: Date, eTime: Date }) => void,
    disabled?: boolean,
    className?: string,
    style?: CSSProperties,
    header?: ReactNode,
    footer?: ReactNode,
}

interface CalendarState {
    value?: Date | { sTime: Date, eTime: Date },
    selectMonth: number,
    selectYear: number,
    tab: CalendarTab,
}

const stateValue = (minDate: Date, maxDate: Date, value?: Date | { sTime: Date, eTime: Date }, range?: boolean) => {
    let defaultValue: Date | { sTime: Date, eTime: Date }
    if (value) {
        if (range) {
            if (value instanceof Date) defaultValue = { sTime: value, eTime: value }
            else defaultValue = value
            if (defaultValue.sTime.getTime() < minDate.getTime()) defaultValue.sTime = minDate
            if (defaultValue.eTime.getTime() > maxDate.getTime()) defaultValue.eTime = maxDate
        } else {
            if (value instanceof Date) defaultValue = value
            else defaultValue = value.sTime
            if (defaultValue.getTime() < minDate.getTime()) defaultValue = minDate
            if (defaultValue.getTime() > maxDate.getTime()) defaultValue = maxDate
        }
    } else {
        defaultValue = range ? { sTime: today, eTime: today } : today
    }
    const defaultMonth = defaultValue instanceof Date ? defaultValue.getMonth() : defaultValue.sTime.getMonth()
    const defaultYear = defaultValue instanceof Date ? defaultValue.getFullYear() : defaultValue.sTime.getFullYear()
    return {
        value: value ? defaultValue : undefined,
        selectMonth: defaultMonth,
        selectYear: defaultYear,
        tab: CalendarTab.DATE,
    }
}

class TCalendar extends React.Component<CalendarProps, CalendarState> {
    private minDate: Date;
    private maxDate: Date;
    constructor(props: CalendarProps) {
        super(props);
        this.minDate = !props.min || props.min.getTime() < startDate.getTime() ? startDate : props.min
        this.maxDate = !props.max || props.max.getTime() > endDate.getTime() ? endDate : props.max
        this.state = stateValue(this.minDate, this.maxDate, props.value, props.range)
        this.showDateInMonth = this.showDateInMonth.bind(this)
        this.showMonthInYear = this.showMonthInYear.bind(this)
        this.showYearInRange = this.showYearInRange.bind(this)
        this.getTitle = this.getTitle.bind(this)
    }

    componentDidUpdate(prevProps: Readonly<CalendarProps>): void {
        if (prevProps.value !== this.props.value) {
            this.setState(stateValue(this.minDate, this.maxDate, this.props.value, this.props.range))
        }
    }

    private showDateInMonth() {
        let firstDayOfMonth = new Date(this.state.selectYear, this.state.selectMonth, 1)
        return <>
            {Array.from({ length: 7 }).map((_, i) => {
                switch (i) {
                    case 0:
                        var weekdayTitle = this.props.t("su")
                        break
                    case 1:
                        weekdayTitle = this.props.t("mo")
                        break
                    case 2:
                        weekdayTitle = this.props.t("tu")
                        break
                    case 3:
                        weekdayTitle = this.props.t("we")
                        break
                    case 4:
                        weekdayTitle = this.props.t("th")
                        break
                    case 5:
                        weekdayTitle = this.props.t("fr")
                        break
                    case 6:
                        weekdayTitle = this.props.t("sa")
                        break
                    default:
                        weekdayTitle = ''
                        break
                }
                return <div key={'dtwk-' + i} className={`${styles['date-picker-circle']} date-picker-circle`}><span className="label-4 row">{weekdayTitle}</span></div>
            })}
            {Array.from({ length: 42 }).map((_, i) => {
                let dateNumber = (i % 7) + (Math.floor(i / 7) * 7) - firstDayOfMonth.getDay()
                const timeValue = new Date(this.state.selectYear, this.state.selectMonth, dateNumber + 1)
                let className = `${styles['date-picker-circle']} date-picker-circle`
                let typoClassName = "body-3"
                if (dateNumber + 1 === today.getDate() && this.state.selectMonth === today.getMonth() && this.state.selectYear === today.getFullYear()) {
                    className += ` ${styles['today']}`
                }
                let style: CSSProperties | undefined;
                if (!inRangeTime(timeValue, this.minDate, this.maxDate)) {
                    className += ` ${styles['invalid']}`
                } else if (this.state.value instanceof Date) {
                    if (this.state.value.getTime() === timeValue.getTime()) className += ` ${styles['selected']}`
                } else if ((this.state.value?.sTime.getDate() === timeValue.getDate() && (Math.abs(differenceInCalendarDays(timeValue, this.state.value.sTime))) < 1) || (this.state.value?.eTime.getDate() === timeValue.getDate() && (Math.abs(differenceInCalendarDays(timeValue, this.state.value.eTime))) < 1)) {
                    className += ` ${styles['selected']} ${styles[`${this.state.value?.sTime.getDate() === timeValue.getDate() && (Math.abs(differenceInCalendarDays(timeValue, this.state.value.sTime))) < 1 ? "start" : "end"}-range`]}`
                } else if (this.state.value && inRangeTime(timeValue, this.state.value.sTime, this.state.value.eTime)) {
                    className += ` ${styles['in-range']}`
                }
                if (timeValue.getMonth() !== this.state.selectMonth) {
                    typoClassName = "placeholder-2"
                }
                return <div key={timeValue.toString()} className={className} style={style}>
                    <button type="button" className={`${typoClassName} row`}
                        onClick={() => {
                            const currentValue = this.state.value as any
                            if (this.props.range) {
                                const newValue = (!currentValue || timeValue.getTime() < currentValue.sTime.getTime()) ? { sTime: timeValue, eTime: timeValue } : { sTime: currentValue.sTime, eTime: timeValue }
                                this.setState({ ...this.state, value: newValue })
                                if (this.props.onSelect) this.props.onSelect(newValue)
                            } else {
                                this.setState({ ...this.state, value: timeValue })
                                if (this.props.onSelect) this.props.onSelect(timeValue)
                            }
                        }} >
                        {timeValue.getDate()}
                    </button>
                </div>
            })}
        </>
    }

    private showMonthInYear() {
        return <>
            {Array.from({ length: 12 }).map((_, i) => {
                switch (i) {
                    case 0:
                        var monthTitle = this.props.i18n.language === "en" ? "Jan" : this.props.t('january')
                        break
                    case 1:
                        monthTitle = this.props.i18n.language === "en" ? "Feb" : this.props.t('february')
                        break
                    case 2:
                        monthTitle = this.props.i18n.language === "en" ? "Mar" : this.props.t('march')
                        break
                    case 3:
                        monthTitle = this.props.i18n.language === "en" ? "Apr" : this.props.t('april')
                        break
                    case 4:
                        monthTitle = this.props.i18n.language === "en" ? "May" : this.props.t('may')
                        break
                    case 5:
                        monthTitle = this.props.i18n.language === "en" ? "Jun" : this.props.t('june')
                        break
                    case 6:
                        monthTitle = this.props.i18n.language === "en" ? "Jul" : this.props.t('july')
                        break
                    case 7:
                        monthTitle = this.props.i18n.language === "en" ? "Aug" : this.props.t('august')
                        break
                    case 8:
                        monthTitle = this.props.i18n.language === "en" ? "Sep" : this.props.t('september')
                        break
                    case 9:
                        monthTitle = this.props.i18n.language === "en" ? "Oct" : this.props.t('october')
                        break
                    case 10:
                        monthTitle = this.props.i18n.language === "en" ? "Nov" : this.props.t('november')
                        break
                    case 11:
                        monthTitle = this.props.i18n.language === "en" ? "Dec" : this.props.t('december')
                        break
                    default:
                        monthTitle = ''
                        break
                }
                const timeValue = new Date(this.state.selectYear, i)
                let className = `${styles['month-picker-circle']} month-picker-circle`
                if (this.state.selectYear === today.getFullYear() && today.getMonth() === i) {
                    className += ` ${styles['today']}`
                }
                if (!inRangeTime(timeValue, this.minDate, this.maxDate)) {
                    className += ` ${styles['invalid']}`
                } else if (this.state.value instanceof Date) {
                    if (this.state.selectYear === this.state.value.getFullYear() && i === this.state.value.getMonth()) className += ` ${styles['selected']}`
                } else if (this.state.value && ((i === this.state.value.sTime.getMonth() && this.state.value.sTime.getFullYear() === this.state.selectYear) || (i === this.state.value.eTime.getMonth() && this.state.value.eTime.getFullYear() === this.state.selectYear))) {
                    className += ` ${styles['selected']} ${styles[`${i === this.state.value.sTime.getMonth() && this.state.value.sTime.getFullYear() === this.state.selectYear ? "start" : "end"}-range`]}`
                } else if (this.state.value && inRangeTime(timeValue, this.state.value.sTime, this.state.value.eTime)) {
                    className += ` ${styles['in-range']}`
                }
                return <div key={timeValue.toString()} className={className}>
                    <button type="button" className="body-3 row" onClick={() => { this.setState({ ...this.state, selectMonth: i, tab: CalendarTab.DATE }) }}>
                        {monthTitle}
                    </button>
                </div>
            })}
        </>
    }

    private showYearInRange() {
        return Array.from({ length: 12 }).map((_, i) => {
            let firstYearInTable = this.state.selectYear - ((this.state.selectYear - startDate.getFullYear()) % 12)
            let yearNumber = i + firstYearInTable
            let className = `${styles['year-picker-circle']} year-picker-circle`
            if (yearNumber === today.getFullYear()) {
                className += ` ${styles['today']}`
            }
            if (yearNumber < this.minDate.getFullYear() || yearNumber > this.maxDate.getFullYear()) {
                className += ` ${styles['invalid']}`
            } else if (this.state.value instanceof Date) {
                if (yearNumber === this.state.value.getFullYear()) className += ` ${styles['selected']}`
            } else if (yearNumber === this.state.value?.sTime.getFullYear() || yearNumber === this.state.value?.eTime.getFullYear()) {
                className += ` ${styles['selected']} ${styles[`${yearNumber === this.state.value?.sTime.getFullYear() ? "start" : "end"}-range`]}`
            } else if (this.state.value && yearNumber > this.state.value.sTime.getFullYear() && yearNumber < this.state.value.eTime.getFullYear()) {
                className += ` ${styles['in-range']}`
            }
            return <div key={yearNumber.toString()} className={className}>
                <button type="button" className="body-3 row" onClick={() => { this.setState({ ...this.state, tab: CalendarTab.MONTH, selectYear: yearNumber }) }}>
                    {yearNumber}
                </button>
            </div>
        })
    }

    private getTitle() {
        switch (this.state.tab) {
            case CalendarTab.YEAR:
                let firstYearInTable = this.state.selectYear - ((this.state.selectYear - startDate.getFullYear()) % 12)
                return `${firstYearInTable}-${firstYearInTable + 11}`
            case CalendarTab.MONTH:
                return this.state.selectYear
            default:
                switch (this.state.selectMonth) {
                    case 0:
                        var monthName = this.props.t('january')
                        break
                    case 1:
                        monthName = this.props.t('february')
                        break
                    case 2:
                        monthName = this.props.t('march')
                        break
                    case 3:
                        monthName = this.props.t('april')
                        break
                    case 4:
                        monthName = this.props.t('may')
                        break
                    case 5:
                        monthName = this.props.t('june')
                        break
                    case 6:
                        monthName = this.props.t('july')
                        break
                    case 7:
                        monthName = this.props.t('august')
                        break
                    case 8:
                        monthName = this.props.t('september')
                        break
                    case 9:
                        monthName = this.props.t('october')
                        break
                    case 10:
                        monthName = this.props.t('november')
                        break
                    case 11:
                        monthName = this.props.t('december')
                        break
                    default:
                        monthName = ''
                        break
                }
                return `${monthName}${this.props.i18n.language === 'en' ? ' ' : '/'}${this.state.selectYear}`
        }
    }

    render(): React.ReactNode {
        return <div className={`${styles['calendar-container']} col ${this.props.className ?? ""}`} style={this.props.style}>
            {this.props.header}
            <div className={`${styles['picker-date-header']} row`}>
                <button type='button'
                    onClick={() => {
                        switch (this.state.tab) {
                            case CalendarTab.YEAR:
                                if (this.state.selectYear - 10 < startDate.getFullYear()) {
                                    this.setState({ ...this.state, selectYear: startDate.getFullYear() })
                                } else {
                                    this.setState({ ...this.state, selectYear: this.state.selectYear - 10 })
                                }
                                break
                            case CalendarTab.MONTH:
                                const newTime = new Date(this.state.selectYear, this.state.selectMonth - 1)
                                if (newTime.getTime() >= startDate.getTime()) {
                                    this.setState({ ...this.state, selectYear: this.state.selectYear - 1 })
                                }
                                break
                            default:
                                const newDataVl = new Date(this.state.selectYear, this.state.selectMonth - 1)
                                if (newDataVl.getTime() >= startDate.getTime()) {
                                    this.setState({ ...this.state, selectMonth: newDataVl.getMonth(), selectYear: newDataVl.getFullYear() })
                                }
                                break
                        }
                    }}
                >
                    <Winicon src={"fill/arrows/left-arrow"} size={'1.4rem'} />
                </button>
                <span className="heading-7" onClick={() => {
                    if (this.state.tab !== CalendarTab.YEAR)
                        this.setState({ ...this.state, tab: this.state.tab === CalendarTab.DATE ? CalendarTab.MONTH : CalendarTab.YEAR })
                }}>
                    {this.getTitle()}
                </span>
                <button type='button'
                    onClick={() => {
                        switch (this.state.tab) {
                            case CalendarTab.YEAR:
                                if (this.state.selectYear + 10 > endDate.getFullYear()) {
                                    this.setState({ ...this.state, selectYear: endDate.getFullYear() })
                                } else {
                                    this.setState({ ...this.state, selectYear: this.state.selectYear + 10 })
                                }
                                break
                            case CalendarTab.MONTH:
                                const newTime = new Date(this.state.selectYear, this.state.selectMonth + 1)
                                if (newTime.getTime() <= endDate.getTime()) {
                                    this.setState({ ...this.state, selectYear: this.state.selectYear + 1 })
                                }
                                break
                            default:
                                const newDataVl = new Date(this.state.selectYear, this.state.selectMonth + 1)
                                if (newDataVl.getTime() <= endDate.getTime()) {
                                    this.setState({ ...this.state, selectMonth: newDataVl.getMonth(), selectYear: newDataVl.getFullYear() })
                                }
                                break
                        }
                    }}
                >
                    <Winicon src={"fill/arrows/right-arrow"} size={'1.4rem'} />
                </button>
            </div>
            <div className={`${styles['picker-date-body']} row`} >
                {this.state.tab === CalendarTab.YEAR ? this.showYearInRange() : this.state.tab === CalendarTab.MONTH ? this.showMonthInYear() : this.showDateInMonth()}
            </div>
            {this.props.footer}
        </div>
    }
}

export const Calendar = withTranslation()(TCalendar)