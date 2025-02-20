"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = exports.CalendarType = exports.inRangeTime = exports.endDate = exports.startDate = exports.today = void 0;
const react_1 = __importDefault(require("react"));
const calendar_module_css_1 = __importDefault(require("./calendar.module.css"));
const date_fns_1 = require("date-fns");
const react_i18next_1 = require("react-i18next");
const winicon_1 = require("../wini-icon/winicon");
exports.today = new Date();
exports.startDate = new Date(exports.today.getFullYear() - 100, exports.today.getMonth(), exports.today.getDate());
exports.endDate = new Date(exports.today.getFullYear() + 100, exports.today.getMonth(), exports.today.getDate());
const inRangeTime = (date, startDate, endDate) => ((0, date_fns_1.differenceInCalendarDays)(date, startDate) > -1 && (0, date_fns_1.differenceInCalendarDays)(endDate, date) > -1);
exports.inRangeTime = inRangeTime;
var CalendarType;
(function (CalendarType) {
    CalendarType[CalendarType["DATE"] = 0] = "DATE";
    CalendarType[CalendarType["MONTH"] = 1] = "MONTH";
    CalendarType[CalendarType["YEAR"] = 2] = "YEAR";
    CalendarType[CalendarType["DATETIME"] = 3] = "DATETIME";
})(CalendarType || (exports.CalendarType = CalendarType = {}));
var CalendarTab;
(function (CalendarTab) {
    CalendarTab[CalendarTab["DATE"] = 0] = "DATE";
    CalendarTab[CalendarTab["MONTH"] = 1] = "MONTH";
    CalendarTab[CalendarTab["YEAR"] = 2] = "YEAR";
})(CalendarTab || (CalendarTab = {}));
const stateValue = (minDate, maxDate, value, range) => {
    let defaultValue;
    if (value) {
        if (range) {
            if (value instanceof Date)
                defaultValue = { sTime: value, eTime: value };
            else
                defaultValue = value;
            if (defaultValue.sTime.getTime() < minDate.getTime())
                defaultValue.sTime = minDate;
            if (defaultValue.eTime.getTime() > maxDate.getTime())
                defaultValue.eTime = maxDate;
        }
        else {
            if (value instanceof Date)
                defaultValue = value;
            else
                defaultValue = value.sTime;
            if (defaultValue.getTime() < minDate.getTime())
                defaultValue = minDate;
            if (defaultValue.getTime() > maxDate.getTime())
                defaultValue = maxDate;
        }
    }
    else {
        defaultValue = range ? { sTime: exports.today, eTime: exports.today } : exports.today;
    }
    const defaultMonth = defaultValue instanceof Date ? defaultValue.getMonth() : defaultValue.sTime.getMonth();
    const defaultYear = defaultValue instanceof Date ? defaultValue.getFullYear() : defaultValue.sTime.getFullYear();
    return {
        value: value ? defaultValue : undefined,
        selectMonth: defaultMonth,
        selectYear: defaultYear,
        tab: CalendarTab.DATE,
    };
};
class TCalendar extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.minDate = !this.props.min || this.props.min.getTime() < exports.startDate.getTime() ? exports.startDate : this.props.min;
        this.maxDate = !this.props.max || this.props.max.getTime() > exports.endDate.getTime() ? exports.endDate : this.props.max;
        this.state = stateValue(this.minDate, this.maxDate, this.props.value, this.props.range);
        this.showDateInMonth = this.showDateInMonth.bind(this);
        this.showMonthInYear = this.showMonthInYear.bind(this);
        this.showYearInRange = this.showYearInRange.bind(this);
        this.getTitle = this.getTitle.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
            this.setState(stateValue(this.minDate, this.maxDate, this.props.value, this.props.range));
        }
    }
    showDateInMonth() {
        let firstDayOfMonth = new Date(this.state.selectYear, this.state.selectMonth, 1);
        return react_1.default.createElement(react_1.default.Fragment, null,
            Array.from({ length: 7 }).map((_, i) => {
                switch (i) {
                    case 0:
                        var weekdayTitle = this.props.t("su");
                        break;
                    case 1:
                        weekdayTitle = this.props.t("mo");
                        break;
                    case 2:
                        weekdayTitle = this.props.t("tu");
                        break;
                    case 3:
                        weekdayTitle = this.props.t("we");
                        break;
                    case 4:
                        weekdayTitle = this.props.t("th");
                        break;
                    case 5:
                        weekdayTitle = this.props.t("fr");
                        break;
                    case 6:
                        weekdayTitle = this.props.t("sa");
                        break;
                    default:
                        weekdayTitle = '';
                        break;
                }
                return react_1.default.createElement("div", { key: 'dtwk-' + i, className: `${calendar_module_css_1.default['date-picker-circle']} date-picker-circle` },
                    react_1.default.createElement("span", { className: "label-4 row" }, weekdayTitle));
            }),
            Array.from({ length: 42 }).map((_, i) => {
                var _a, _b, _c;
                let dateNumber = (i % 7) + (Math.floor(i / 7) * 7) - firstDayOfMonth.getDay();
                const timeValue = new Date(this.state.selectYear, this.state.selectMonth, dateNumber + 1);
                let className = `${calendar_module_css_1.default['date-picker-circle']} date-picker-circle`;
                let typoClassName = "body-3";
                if (dateNumber + 1 === exports.today.getDate() && this.state.selectMonth === exports.today.getMonth() && this.state.selectYear === exports.today.getFullYear()) {
                    className += ` ${calendar_module_css_1.default['today']}`;
                }
                let style;
                if (!(0, exports.inRangeTime)(timeValue, this.minDate, this.maxDate)) {
                    className += ` ${calendar_module_css_1.default['invalid']}`;
                }
                else if (this.state.value instanceof Date) {
                    if (this.state.value.getTime() === timeValue.getTime())
                        className += ` ${calendar_module_css_1.default['selected']}`;
                }
                else if ((((_a = this.state.value) === null || _a === void 0 ? void 0 : _a.sTime.getDate()) === timeValue.getDate() && (Math.abs((0, date_fns_1.differenceInCalendarDays)(timeValue, this.state.value.sTime))) < 1) || (((_b = this.state.value) === null || _b === void 0 ? void 0 : _b.eTime.getDate()) === timeValue.getDate() && (Math.abs((0, date_fns_1.differenceInCalendarDays)(timeValue, this.state.value.eTime))) < 1)) {
                    className += ` ${calendar_module_css_1.default['selected']} ${calendar_module_css_1.default[`${((_c = this.state.value) === null || _c === void 0 ? void 0 : _c.sTime.getDate()) === timeValue.getDate() && (Math.abs((0, date_fns_1.differenceInCalendarDays)(timeValue, this.state.value.sTime))) < 1 ? "start" : "end"}-range`]}`;
                }
                else if (this.state.value && (0, exports.inRangeTime)(timeValue, this.state.value.sTime, this.state.value.eTime)) {
                    className += ` ${calendar_module_css_1.default['in-range']}`;
                }
                if (timeValue.getMonth() !== this.state.selectMonth) {
                    typoClassName = "placeholder-2";
                }
                return react_1.default.createElement("div", { key: timeValue.toString(), className: className, style: style },
                    react_1.default.createElement("button", { type: "button", className: `${typoClassName} row`, onClick: () => {
                            const currentValue = this.state.value;
                            if (this.props.range) {
                                const newValue = (!currentValue || timeValue.getTime() < currentValue.sTime.getTime()) ? { sTime: timeValue, eTime: timeValue } : { sTime: currentValue.sTime, eTime: timeValue };
                                this.setState(Object.assign(Object.assign({}, this.state), { value: newValue }));
                                if (this.props.onSelect)
                                    this.props.onSelect(newValue);
                            }
                            else {
                                this.setState(Object.assign(Object.assign({}, this.state), { value: timeValue }));
                                if (this.props.onSelect)
                                    this.props.onSelect(timeValue);
                            }
                        } }, timeValue.getDate()));
            }));
    }
    showMonthInYear() {
        return react_1.default.createElement(react_1.default.Fragment, null, Array.from({ length: 12 }).map((_, i) => {
            switch (i) {
                case 0:
                    var monthTitle = this.props.i18n.language === "en" ? "Jan" : this.props.t('january');
                    break;
                case 1:
                    monthTitle = this.props.i18n.language === "en" ? "Feb" : this.props.t('february');
                    break;
                case 2:
                    monthTitle = this.props.i18n.language === "en" ? "Mar" : this.props.t('march');
                    break;
                case 3:
                    monthTitle = this.props.i18n.language === "en" ? "Apr" : this.props.t('april');
                    break;
                case 4:
                    monthTitle = this.props.i18n.language === "en" ? "May" : this.props.t('may');
                    break;
                case 5:
                    monthTitle = this.props.i18n.language === "en" ? "Jun" : this.props.t('june');
                    break;
                case 6:
                    monthTitle = this.props.i18n.language === "en" ? "Jul" : this.props.t('july');
                    break;
                case 7:
                    monthTitle = this.props.i18n.language === "en" ? "Aug" : this.props.t('august');
                    break;
                case 8:
                    monthTitle = this.props.i18n.language === "en" ? "Sep" : this.props.t('september');
                    break;
                case 9:
                    monthTitle = this.props.i18n.language === "en" ? "Oct" : this.props.t('october');
                    break;
                case 10:
                    monthTitle = this.props.i18n.language === "en" ? "Nov" : this.props.t('november');
                    break;
                case 11:
                    monthTitle = this.props.i18n.language === "en" ? "Dec" : this.props.t('december');
                    break;
                default:
                    monthTitle = '';
                    break;
            }
            const timeValue = new Date(this.state.selectYear, i);
            let className = `${calendar_module_css_1.default['month-picker-circle']} month-picker-circle`;
            if (this.state.selectYear === exports.today.getFullYear() && exports.today.getMonth() === i) {
                className += ` ${calendar_module_css_1.default['today']}`;
            }
            if (!(0, exports.inRangeTime)(timeValue, this.minDate, this.maxDate)) {
                className += ` ${calendar_module_css_1.default['invalid']}`;
            }
            else if (this.state.value instanceof Date) {
                if (this.state.selectYear === this.state.value.getFullYear() && i === this.state.value.getMonth())
                    className += ` ${calendar_module_css_1.default['selected']}`;
            }
            else if (this.state.value && ((i === this.state.value.sTime.getMonth() && this.state.value.sTime.getFullYear() === this.state.selectYear) || (i === this.state.value.eTime.getMonth() && this.state.value.eTime.getFullYear() === this.state.selectYear))) {
                className += ` ${calendar_module_css_1.default['selected']} ${calendar_module_css_1.default[`${i === this.state.value.sTime.getMonth() && this.state.value.sTime.getFullYear() === this.state.selectYear ? "start" : "end"}-range`]}`;
            }
            else if (this.state.value && (0, exports.inRangeTime)(timeValue, this.state.value.sTime, this.state.value.eTime)) {
                className += ` ${calendar_module_css_1.default['in-range']}`;
            }
            return react_1.default.createElement("div", { key: timeValue.toString(), className: className },
                react_1.default.createElement("button", { type: "button", className: "body-3 row", onClick: () => { this.setState(Object.assign(Object.assign({}, this.state), { selectMonth: i, tab: CalendarTab.DATE })); } }, monthTitle));
        }));
    }
    showYearInRange() {
        return Array.from({ length: 12 }).map((_, i) => {
            var _a, _b, _c;
            let firstYearInTable = this.state.selectYear - ((this.state.selectYear - exports.startDate.getFullYear()) % 12);
            let yearNumber = i + firstYearInTable;
            let className = `${calendar_module_css_1.default['year-picker-circle']} year-picker-circle`;
            if (yearNumber === exports.today.getFullYear()) {
                className += ` ${calendar_module_css_1.default['today']}`;
            }
            if (yearNumber < this.minDate.getFullYear() || yearNumber > this.maxDate.getFullYear()) {
                className += ` ${calendar_module_css_1.default['invalid']}`;
            }
            else if (this.state.value instanceof Date) {
                if (yearNumber === this.state.value.getFullYear())
                    className += ` ${calendar_module_css_1.default['selected']}`;
            }
            else if (yearNumber === ((_a = this.state.value) === null || _a === void 0 ? void 0 : _a.sTime.getFullYear()) || yearNumber === ((_b = this.state.value) === null || _b === void 0 ? void 0 : _b.eTime.getFullYear())) {
                className += ` ${calendar_module_css_1.default['selected']} ${calendar_module_css_1.default[`${yearNumber === ((_c = this.state.value) === null || _c === void 0 ? void 0 : _c.sTime.getFullYear()) ? "start" : "end"}-range`]}`;
            }
            else if (this.state.value && yearNumber > this.state.value.sTime.getFullYear() && yearNumber < this.state.value.eTime.getFullYear()) {
                className += ` ${calendar_module_css_1.default['in-range']}`;
            }
            return react_1.default.createElement("div", { key: yearNumber.toString(), className: className },
                react_1.default.createElement("button", { type: "button", className: "body-3 row", onClick: () => { this.setState(Object.assign(Object.assign({}, this.state), { tab: CalendarTab.MONTH, selectYear: yearNumber })); } }, yearNumber));
        });
    }
    getTitle() {
        switch (this.state.tab) {
            case CalendarTab.YEAR:
                let firstYearInTable = this.state.selectYear - ((this.state.selectYear - exports.startDate.getFullYear()) % 12);
                return `${firstYearInTable}-${firstYearInTable + 11}`;
            case CalendarTab.MONTH:
                return this.state.selectYear;
            default:
                switch (this.state.selectMonth) {
                    case 0:
                        var monthName = this.props.t('january');
                        break;
                    case 1:
                        monthName = this.props.t('february');
                        break;
                    case 2:
                        monthName = this.props.t('march');
                        break;
                    case 3:
                        monthName = this.props.t('april');
                        break;
                    case 4:
                        monthName = this.props.t('may');
                        break;
                    case 5:
                        monthName = this.props.t('june');
                        break;
                    case 6:
                        monthName = this.props.t('july');
                        break;
                    case 7:
                        monthName = this.props.t('august');
                        break;
                    case 8:
                        monthName = this.props.t('september');
                        break;
                    case 9:
                        monthName = this.props.t('october');
                        break;
                    case 10:
                        monthName = this.props.t('november');
                        break;
                    case 11:
                        monthName = this.props.t('december');
                        break;
                    default:
                        monthName = '';
                        break;
                }
                return `${monthName}${this.props.i18n.language === 'en' ? ' ' : '/'}${this.state.selectYear}`;
        }
    }
    render() {
        var _a;
        return react_1.default.createElement("div", { className: `${calendar_module_css_1.default['calendar-container']} col ${(_a = this.props.className) !== null && _a !== void 0 ? _a : ""}`, style: this.props.style },
            this.props.header,
            react_1.default.createElement("div", { className: `${calendar_module_css_1.default['picker-date-header']} row` },
                react_1.default.createElement("button", { type: 'button', onClick: () => {
                        switch (this.state.tab) {
                            case CalendarTab.YEAR:
                                if (this.state.selectYear - 10 < exports.startDate.getFullYear()) {
                                    this.setState(Object.assign(Object.assign({}, this.state), { selectYear: exports.startDate.getFullYear() }));
                                }
                                else {
                                    this.setState(Object.assign(Object.assign({}, this.state), { selectYear: this.state.selectYear - 10 }));
                                }
                                break;
                            case CalendarTab.MONTH:
                                const newTime = new Date(this.state.selectYear, this.state.selectMonth - 1);
                                if (newTime.getTime() >= exports.startDate.getTime()) {
                                    this.setState(Object.assign(Object.assign({}, this.state), { selectYear: this.state.selectYear - 1 }));
                                }
                                break;
                            default:
                                const newDataVl = new Date(this.state.selectYear, this.state.selectMonth - 1);
                                if (newDataVl.getTime() >= exports.startDate.getTime()) {
                                    this.setState(Object.assign(Object.assign({}, this.state), { selectMonth: newDataVl.getMonth(), selectYear: newDataVl.getFullYear() }));
                                }
                                break;
                        }
                    } },
                    react_1.default.createElement(winicon_1.Winicon, { src: "fill/arrows/left-arrow", size: '1.4rem' })),
                react_1.default.createElement("span", { className: "heading-7", onClick: () => {
                        if (this.state.tab !== CalendarTab.YEAR)
                            this.setState(Object.assign(Object.assign({}, this.state), { tab: this.state.tab === CalendarTab.DATE ? CalendarTab.MONTH : CalendarTab.YEAR }));
                    } }, this.getTitle()),
                react_1.default.createElement("button", { type: 'button', onClick: () => {
                        switch (this.state.tab) {
                            case CalendarTab.YEAR:
                                if (this.state.selectYear + 10 > exports.endDate.getFullYear()) {
                                    this.setState(Object.assign(Object.assign({}, this.state), { selectYear: exports.endDate.getFullYear() }));
                                }
                                else {
                                    this.setState(Object.assign(Object.assign({}, this.state), { selectYear: this.state.selectYear + 10 }));
                                }
                                break;
                            case CalendarTab.MONTH:
                                const newTime = new Date(this.state.selectYear, this.state.selectMonth + 1);
                                if (newTime.getTime() <= exports.endDate.getTime()) {
                                    this.setState(Object.assign(Object.assign({}, this.state), { selectYear: this.state.selectYear + 1 }));
                                }
                                break;
                            default:
                                const newDataVl = new Date(this.state.selectYear, this.state.selectMonth + 1);
                                if (newDataVl.getTime() <= exports.endDate.getTime()) {
                                    this.setState(Object.assign(Object.assign({}, this.state), { selectMonth: newDataVl.getMonth(), selectYear: newDataVl.getFullYear() }));
                                }
                                break;
                        }
                    } },
                    react_1.default.createElement(winicon_1.Winicon, { src: "fill/arrows/right-arrow", size: '1.4rem' }))),
            react_1.default.createElement("div", { className: `${calendar_module_css_1.default['picker-date-body']} row` }, this.state.tab === CalendarTab.YEAR ? this.showYearInRange() : this.state.tab === CalendarTab.MONTH ? this.showMonthInYear() : this.showDateInMonth()),
            this.props.footer);
    }
}
exports.Calendar = (0, react_i18next_1.withTranslation)()(TCalendar);
