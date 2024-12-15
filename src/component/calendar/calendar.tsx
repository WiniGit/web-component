import React, { CSSProperties, ReactNode } from "react"
import styles from './calendar.module.css'
import { differenceInCalendarDays } from "date-fns"
import { Winicon } from "../wini-icon/winicon"
import { WithTranslation, withTranslation } from 'react-i18next';

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

export enum CalendarType {
    DATE = 0,
    MONTH = 1,
    YEAR = 2,
    DATETIME = 3
}
interface CalendarProps extends WithTranslation {
    id?: string,
    value?: Date,
    min?: Date,
    max?: Date,
    onSelect?: (props: Date) => void,
    disabled?: boolean,
    helperText?: string,
    helperTextColor?: string,
    placeholder?: string,
    className?: string,
    style?: CSSProperties,
    type: CalendarType,
    showSidebar?: boolean,
    footer?: ReactNode
}

interface CalendarState {
    value: Date,
    selectDate?: Date,
    selectMonth: number,
    selectYear: number,
    selectHours: number,
    selectMinutes: number,
    selectSeconds: number,
    type: CalendarType,
}

class TCalendar extends React.Component<CalendarProps, CalendarState> {

    constructor(props: CalendarProps) {
        super(props);
        this.state = {
            value: this.props.value ?? today,
            selectDate: this.props.value ?? today,
            selectMonth: (this.props.value ?? today).getMonth(),
            selectYear: (this.props.value ?? today).getFullYear(),
            type: CalendarType.DATE,
            selectHours: this.props.value?.getHours() ?? 0,
            selectMinutes: this.props.value?.getMinutes() ?? 0,
            selectSeconds: this.props.value?.getSeconds() ?? 0,
        }
        this.showDateInMonth = this.showDateInMonth.bind(this)
        this.showMonthInYear = this.showMonthInYear.bind(this)
        this.showYearInRange = this.showYearInRange.bind(this)
        this.getTitle = this.getTitle.bind(this)
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
                return <div key={'dtwk-' + i} className={`${styles['date-picker-circle']} label-4`} style={{ color: 'var(--neutral-text-title-color)' }}>
                    {weekdayTitle}
                </div>
            })}
            {Array.from({ length: 42 }).map((_, i) => {
                let dateNumber = (i % 7) + (Math.floor(i / 7) * 7) - firstDayOfMonth.getDay()
                const timeValue = new Date(this.state.selectYear, this.state.selectMonth, dateNumber + 1, this.state.selectHours, this.state.selectMinutes, this.state.selectSeconds)
                let style = {}
                let additionProps = {}
                let selected = false
                if (dateNumber + 1 === today.getDate() && this.state.selectMonth === today.getMonth() && this.state.selectYear === today.getFullYear()) {
                    style = { borderColor: 'var(--infor-main-color)' }
                }
                if (!inRangeTime(timeValue, startDate, endDate)) {
                    additionProps = { 'in-range': 'false' }
                } else if (!inRangeTime(timeValue, this.props.min ?? startDate, this.props.max ?? endDate)) {
                    style = {
                        ...style,
                        color: 'var(--neutral-text-disabled-color)',
                        pointerEvents: 'none'
                    }
                } else if (this.state.value.valueOf() === timeValue.valueOf()) {
                    additionProps = { ...additionProps }
                    selected = true
                } else if (timeValue.getMonth() !== this.state.selectMonth) {
                    style = { ...style, color: 'var(--neutral-text-subtitle-color)' }
                }
                return <button type="button" key={timeValue.toString()} className={`${styles['date-picker-circle']} date-picker-circle body-3 ${selected ? styles['selected'] : ''}`} style={style} {...additionProps}
                    onClick={() => {
                        this.setState({ ...this.state, value: timeValue })
                        if (this.props.onSelect) this.props.onSelect(timeValue)
                    }} >
                    {timeValue.getDate()}
                </button>
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
                const timeValue = new Date(this.state.selectYear, i, today.getDate())
                let additionProps = {}
                let style = {}
                let selected = false
                if (this.state.selectYear === today.getFullYear() && today.getMonth() === i) {
                    style = { borderColor: 'var(--infor-main-color)' }
                } if (!inRangeTime(timeValue, startDate, endDate)) {
                    additionProps = { 'in-range': 'false' }
                } else if (!inRangeTime(new Date(this.state.selectYear, this.state.selectMonth), this.props.min ?? startDate, this.props.max ?? endDate)) {
                    if (this.state.selectYear === this.state.selectDate?.getFullYear() && this.state.selectDate.getMonth() === i) {
                        style = {
                            color: 'var(--neutral-text-disabled-color)',
                            pointerEvents: 'none'
                        }
                    }
                }
                if (this.state.selectYear === this.state.value.getFullYear() && i === this.state.value.getMonth()) {
                    selected = true
                }
                return <button type="button" key={timeValue.toString()} className={`${styles['month-picker-circle']} month-picker-circle body-3 row ${selected ? styles['selected'] : ''}`} style={style} {...additionProps}
                    onClick={() => {
                        if (this.props.type === CalendarType.MONTH) {
                            this.setState({ ...this.state, value: timeValue })
                            if (this.props.onSelect) this.props.onSelect(timeValue)
                        } else {
                            this.setState({ ...this.state, selectMonth: i, type: CalendarType.DATE })
                        }
                    }}
                >
                    {monthTitle}
                </button>
            })}
        </>
    }

    private showYearInRange() {
        return <>
            {Array.from({ length: 12 }).map((_, i) => {
                let firstYearInTable = this.state.selectYear - ((this.state.selectYear - startDate.getFullYear()) % 12)
                let yearNumber = i + firstYearInTable
                let additionProps = {}
                let style = {}
                let selected = false
                if (yearNumber === today.getFullYear()) {
                    style = { borderColor: 'var(--infor-main-color)' }
                } else if (yearNumber < ((this.props.min ?? startDate).getFullYear()) || yearNumber > ((this.props.max ?? endDate).getFullYear())) {
                    additionProps = { 'in-range': 'false' }
                }
                if (yearNumber === this.state.value.getFullYear()) {
                    selected = true
                }
                return <button type="button" key={yearNumber.toString()} className={`${styles['year-picker-circle']} year-picker-circle body-3 row ${selected ? styles['selected'] : ''}`} style={style} {...additionProps}
                    onClick={() => {
                        if (this.props.type === CalendarType.YEAR) {
                            this.setState({ ...this.state, value: new Date(yearNumber) })
                            if (this.props.onSelect) this.props.onSelect(new Date(yearNumber))
                        } else {
                            this.setState({ ...this.state, type: CalendarType.MONTH, selectYear: yearNumber })
                        }
                    }}
                >
                    {yearNumber}
                </button>
            })}
        </>
    }

    private getTitle() {
        switch (this.state.type) {
            case CalendarType.YEAR:
                let firstYearInTable = this.state.selectYear - ((this.state.selectYear - startDate.getFullYear()) % 12)
                return `${firstYearInTable}-${firstYearInTable + 11}`
            case CalendarType.MONTH:
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
        const { t } = this.props;
        return <div id={this.props.id} className={`row ${styles['calendar-container']} ${this.props.className}`} style={this.props.style}>
            {this.props.showSidebar ? <div className={`${styles['calendar-sidebar-options']} col`}>
                <button type="button" onClick={() => { }} className={`label-4 ${styles['calendar-sidebar-option-buttton']}`}>{t("yesterday")}</button>
                <button type="button" className={`label-4 ${styles['calendar-sidebar-option-buttton']}`}>{t("lastWeek")}</button>
                <button type="button" className={`label-4 ${styles['calendar-sidebar-option-buttton']}`}>{t("lastMonth")}</button>
                <button type="button" className={`label-4 ${styles['calendar-sidebar-option-buttton']}`}>{t("lastYear")}</button>
            </div> : null}
            <div className={`${styles['calendar-body']} col`}>
                <div className="row" style={{ alignItems: 'start' }} >
                    <div className={`${styles['picker-date-container']} col`}>
                        <div className={`${styles['picker-date-header']} row`}>
                            <button type='button'
                                onClick={() => {
                                    switch (this.state.type) {
                                        case CalendarType.YEAR:
                                            if (this.state.selectYear - 20 < startDate.getFullYear()) {
                                                this.setState({ ...this.state, selectYear: startDate.getFullYear() })
                                            } else {
                                                this.setState({ ...this.state, selectYear: this.state.selectYear - 20 })
                                            }
                                            break
                                        case CalendarType.MONTH:
                                            if (this.state.selectYear - 10 < startDate.getFullYear()) {
                                                this.setState({ ...this.state, selectYear: startDate.getFullYear() })
                                            } else {
                                                this.setState({ ...this.state, selectYear: this.state.selectYear - 10 })
                                            }
                                            break
                                        default:
                                            this.setState({ ...this.state, selectYear: this.state.selectYear - 1 })
                                            break
                                    }
                                }}
                            >
                                <Winicon src={"fill/arrows/double-arrow-left"} size={'1.4rem'} />
                            </button>
                            <button type='button'
                                onClick={() => {
                                    switch (this.state.type) {
                                        case CalendarType.YEAR:
                                            if (this.state.selectYear - 10 < startDate.getFullYear()) {
                                                this.setState({ ...this.state, selectYear: startDate.getFullYear() })
                                            } else {
                                                this.setState({ ...this.state, selectYear: this.state.selectYear - 10 })
                                            }
                                            break
                                        case CalendarType.MONTH:
                                            if (this.state.selectYear - 1 >= startDate.getFullYear()) {
                                                this.setState({ ...this.state, selectYear: this.state.selectYear - 1 })
                                            }
                                            break
                                        default:
                                            const newDataVl = new Date(this.state.selectYear, this.state.selectMonth - 1, 1)
                                            this.setState({ ...this.state, selectMonth: newDataVl.getMonth(), selectYear: newDataVl.getFullYear() })
                                            break
                                    }
                                }}
                            >
                                <Winicon src={"fill/arrows/left-arrow"} size={'1.4rem'} />
                            </button>
                            <span className="heading-7" onClick={() => {
                                if (this.state.type !== CalendarType.YEAR)
                                    this.setState({ ...this.state, type: this.state.type === CalendarType.DATE ? CalendarType.MONTH : CalendarType.YEAR })
                            }} >
                                {this.getTitle()}
                            </span>
                            <button type='button'
                                onClick={() => {
                                    switch (this.state.type) {
                                        case CalendarType.YEAR:
                                            if (this.state.selectYear + 10 > endDate.getFullYear()) {
                                                this.setState({ ...this.state, selectYear: endDate.getFullYear() })
                                            } else {
                                                this.setState({ ...this.state, selectYear: this.state.selectYear + 10 })
                                            }
                                            break
                                        case CalendarType.MONTH:
                                            if (this.state.selectYear + 1 <= endDate.getFullYear()) {
                                                this.setState({ ...this.state, selectYear: this.state.selectYear + 1 })
                                            }
                                            break
                                        default:
                                            const newDataVl = new Date(this.state.selectYear, this.state.selectMonth + 1, 1)
                                            this.setState({ ...this.state, selectMonth: newDataVl.getMonth(), selectYear: newDataVl.getFullYear() })
                                            break
                                    }
                                }}
                            >
                                <Winicon src={"fill/arrows/right-arrow"} size={'1.4rem'} />
                            </button>
                            <button type='button'
                                onClick={() => {
                                    switch (this.state.type) {
                                        case CalendarType.YEAR:
                                            if (this.state.selectYear + 20 > endDate.getFullYear()) {
                                                this.setState({ ...this.state, selectYear: endDate.getFullYear() })
                                            } else {
                                                this.setState({ ...this.state, selectYear: this.state.selectYear + 20 })
                                            }
                                            break
                                        case CalendarType.MONTH:
                                            if (this.state.selectYear + 10 < endDate.getFullYear()) {
                                                this.setState({ ...this.state, selectYear: endDate.getFullYear() })
                                            } else {
                                                this.setState({ ...this.state, selectYear: this.state.selectYear + 10 })
                                            }
                                            break
                                        default:
                                            this.setState({ ...this.state, selectYear: this.state.selectYear + 1 })
                                            break
                                    }
                                }}
                            >
                                <Winicon src={"fill/arrows/double-arrow-right"} size={'1.4rem'} />
                            </button>
                        </div>
                        <div className={`${styles['picker-date-body']} row`} >
                            {this.state.type === CalendarType.YEAR ? this.showYearInRange() : this.state.type === CalendarType.MONTH ? this.showMonthInYear() : this.showDateInMonth()}
                        </div>
                    </div>
                    {this.props.type === CalendarType.DATETIME ? <div className={`${styles['picker-time-container']} col`}>
                        <div className="heading-7">{this.state.selectHours < 10 ? `0${this.state.selectHours}` : this.state.selectHours}:{this.state.selectMinutes < 10 ? `0${this.state.selectMinutes}` : this.state.selectMinutes}:{this.state.selectSeconds < 10 ? `0${this.state.selectSeconds}` : this.state.selectSeconds}</div>
                        <div className="row" style={{ alignItems: 'start', flex: 1, height: '100%' }}>
                            <div className={`${styles['scroll-picker-hours']} scroll-picker-hours col`}>{Array.from({ length: 24 }).map((_, i) => <button type="button" onClick={() => {
                                let newValue = this.state.value
                                newValue.setHours(i)
                                this.setState({ ...this.state, selectHours: i, value: newValue })
                                if (this.props.onSelect) this.props.onSelect(newValue)
                            }} key={`hours-${i}`} className={`label-4 ${this.state.selectHours === (i) ? styles['selected'] : ''}`} >{i < 10 ? `0${i}` : i}</button>)}</div>
                            <div className={`${styles['scroll-picker-minutes']} scroll-picker-minutes col`}>{Array.from({ length: 60 }).map((_, i) => <button type="button" onClick={() => {
                                let newValue = this.state.value
                                newValue.setMinutes(i)
                                this.setState({ ...this.state, selectMinutes: i, value: newValue })
                                if (this.props.onSelect) this.props.onSelect(newValue)
                            }} key={`hours-${i}`} className={`label-4 ${this.state.selectMinutes === (i) ? styles['selected'] : ''}`} >{i < 10 ? `0${i}` : i}</button>)}</div>
                            <div className={`${styles['scroll-picker-seconds']} scroll-picker-seconds col`}>{Array.from({ length: 60 }).map((_, i) => <button type="button" onClick={() => {
                                let newValue = this.state.value
                                newValue.setSeconds(i)
                                this.setState({ ...this.state, selectSeconds: i, value: newValue })
                                if (this.props.onSelect) this.props.onSelect(newValue)
                            }} key={`hours-${i}`} className={`label-4 ${this.state.selectSeconds === (i) ? styles['selected'] : ''}`} >{i < 10 ? `0${i}` : i}</button>)}</div>
                        </div>
                    </div> : null}
                </div>
                {this.props.footer}
            </div>
        </div>
    }
}

export const Calendar = withTranslation()(TCalendar)