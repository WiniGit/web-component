"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePicker = void 0;
/* eslint-disable react-hooks/exhaustive-deps */
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
require("./date-picker.css");
const index_1 = require("../../index");
const calendar_1 = require("../calendar/calendar");
const date_fns_1 = require("date-fns");
const react_i18next_1 = require("react-i18next");
const dateToString = (x, y = "dd/mm/yyyy") => {
    let splitDateTime = y.split(" ");
    let dateFormat = splitDateTime[0];
    let timeFormat = splitDateTime[1];
    if (dateFormat.includes('hh')) {
        dateFormat = splitDateTime[1];
        timeFormat = splitDateTime[0];
    }
    let dateConvert = dateFormat.split(y.includes("/") ? "/" : "-").map(type => {
        switch (type.toLowerCase()) {
            case "dd":
                return x.getDate() < 10 ? `0${x.getDate()}` : `${x.getDate()}`;
            case "mm":
                return (x.getMonth() + 1) < 10 ? `0${(x.getMonth() + 1)}` : `${(x.getMonth() + 1)}`;
            case "yyyy":
                return `${x.getFullYear()}`;
            default:
                return '';
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
                    return 'D';
            }
        }).join(":");
        return dateConvert + " " + timeConvert;
    }
    return dateConvert;
};
const stringToDate = (_date, _format = "dd/MM/yyyy", _delimiter = "/") => {
    var _a, _b, _c, _d, _e;
    let dayformat = _format;
    let hourformat = '';
    let day = _date;
    let hours = '';
    let isHour = false;
    if (_format.trim().indexOf(" ") > -1) {
        dayformat = _format.trim().split(" ")[0];
        hourformat = _format.trim().split(" ")[1];
        day = _date.trim().split(" ")[0];
        hours = (_a = _date.trim().split(" ")[1]) !== null && _a !== void 0 ? _a : '00:00:00';
        isHour = true;
    }
    let formatLowerCase = dayformat.toLowerCase();
    let formatItems = formatLowerCase.split(_delimiter);
    let dateItems = day.split(_delimiter);
    let monthIndex = formatItems.indexOf("mm");
    let dayIndex = formatItems.indexOf("dd");
    let yearIndex = formatItems.indexOf("yyyy");
    let hour = 0;
    let min = 0;
    let sec = 0;
    if (isHour) {
        let tmpHour = hourformat.split(":");
        let hourindex = tmpHour.indexOf("HH");
        if (hourindex < 0) {
            hourindex = tmpHour.indexOf("hh");
        }
        let mmindex = tmpHour.indexOf("mm");
        let ssindex = tmpHour.indexOf("ss");
        let time = hours.split(":");
        hour = parseInt((_b = time[hourindex]) !== null && _b !== void 0 ? _b : '0');
        min = parseInt((_c = time[mmindex]) !== null && _c !== void 0 ? _c : '0');
        sec = parseInt((_d = time[ssindex]) !== null && _d !== void 0 ? _d : '0');
    }
    let month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(parseInt(dateItems[yearIndex]), month, parseInt((_e = dateItems[dayIndex]) !== null && _e !== void 0 ? _e : '0'), hour, min, sec);
    return formatedDate;
};
class TDatePicker extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.getNewValue = (value) => {
            var _a, _b, _c, _d, _e, _f;
            const params = (_b = value !== null && value !== void 0 ? value : (_a = this.state) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
            if ((_c = params.trim()) === null || _c === void 0 ? void 0 : _c.length) {
                switch (this.props.pickerType) {
                    case index_1.CalendarType.YEAR:
                        return new Date(parseInt(params), 1, 1);
                    case index_1.CalendarType.MONTH:
                        let splitParams = params.includes('/') ? params.split('/') : params.split('-');
                        return new Date(parseInt((_d = splitParams[1]) !== null && _d !== void 0 ? _d : `${calendar_1.today.getFullYear()}`), parseInt((_e = splitParams[0]) !== null && _e !== void 0 ? _e : `${calendar_1.today.getMonth()}`), 1);
                    case index_1.CalendarType.DATETIME:
                        return stringToDate(params, (_f = this.props.formatDate) !== null && _f !== void 0 ? _f : 'dd/mm/yyyy hh:mm');
                    default:
                        return stringToDate(params);
                }
            }
            return undefined;
        };
        this.onOpenCalendar = (ev) => {
            if (!this.state.isOpen) {
                this.setState(Object.assign(Object.assign({}, this.state), { isOpen: true, style: undefined, offset: ev.target.closest('.date-picker-container').getBoundingClientRect() }));
            }
        };
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
                    throw new Error('Function not implemented.');
                }
            },
            isOpen: false,
        };
        this.getNewValue = this.getNewValue.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        var _a;
        if (prevProps.value !== this.props.value) {
            this.setState(Object.assign(Object.assign({}, this.state), { value: this.props.value }));
        }
        if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
            const thisPopupRect = (_a = document.body.querySelector('.date-picker-popup-container')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            if (thisPopupRect) {
                let style;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        right: document.body.offsetWidth - this.state.offset.left + 'px'
                    };
                }
                if ((thisPopupRect.bottom - 12) > document.body.offsetHeight) {
                    style = style ? Object.assign(Object.assign({}, style), { top: undefined, bottom: document.body.offsetHeight - this.state.offset.top + 'px' }) : {
                        left: this.state.offset.x + 'px',
                        bottom: document.body.offsetHeight - this.state.offset.top + 'px'
                    };
                }
                if (style)
                    this.setState(Object.assign(Object.assign({}, this.state), { style: style }));
            }
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        const { t } = this.props;
        let maxLength = 10;
        switch (this.props.pickerType) {
            case index_1.CalendarType.YEAR:
                maxLength = 4;
                break;
            case index_1.CalendarType.MONTH:
                maxLength = 7;
                break;
            case index_1.CalendarType.DATETIME:
                maxLength = 19;
                break;
            default:
                break;
        }
        return react_1.default.createElement("div", { id: this.props.id, className: `date-picker-container row ${(_a = this.props.className) !== null && _a !== void 0 ? _a : 'body-3'} ${this.props.disabled ? 'disabled' : ''} ${((_b = this.props.helperText) === null || _b === void 0 ? void 0 : _b.length) && 'helper-text'}`, "helper-text": this.props.helperText, style: this.props.style ? Object.assign(Object.assign({}, { '--helper-text-color': (_c = this.props.helperTextColor) !== null && _c !== void 0 ? _c : '#e14337' }), this.props.style) : { '--helper-text-color': (_d = this.props.helperTextColor) !== null && _d !== void 0 ? _d : '#e14337' } },
            react_1.default.createElement("div", { className: 'input-field-value row', style: { height: '4rem' } },
                react_1.default.createElement("input", { autoComplete: 'off', value: (_e = this.state.value) !== null && _e !== void 0 ? _e : '', onChange: (ev) => this.setState(Object.assign(Object.assign({}, this.state), { value: ev.target.value })), placeholder: this.props.placeholder, maxLength: maxLength, readOnly: this.props.pickOnly, onFocus: this.props.pickOnly ? (ev) => {
                        this.onOpenCalendar(ev);
                        if (this.props.onFocus)
                            this.props.onFocus(ev);
                    } : this.props.onFocus, onKeyDown: this.props.onComplete ? (ev) => {
                        if (this.props.onComplete) {
                            switch (ev.key.toLowerCase()) {
                                case "enter":
                                    this.props.onComplete(ev);
                                    break;
                                default:
                                    break;
                            }
                        }
                    } : undefined, onBlur: this.props.pickOnly ? undefined : (ev) => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
                        const inputValue = ev.target.value.trim();
                        switch (this.props.pickerType) {
                            case index_1.CalendarType.YEAR:
                                let minYear = ((_a = this.props.min) !== null && _a !== void 0 ? _a : calendar_1.startDate).getFullYear();
                                let maxYear = ((_b = this.props.min) !== null && _b !== void 0 ? _b : calendar_1.endDate).getFullYear();
                                if (!isNaN(parseInt(inputValue)) && parseInt(inputValue) <= maxYear && parseInt(inputValue) >= minYear) {
                                    this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false, value: inputValue }));
                                    if (this.props.onChange)
                                        this.props.onChange(inputValue);
                                }
                                else {
                                    this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false, value: undefined }));
                                    if (this.props.onChange)
                                        this.props.onChange(undefined);
                                }
                                break;
                            case index_1.CalendarType.MONTH:
                                if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                    let dateValue = stringToDate(`1/${inputValue}`, 'dd/MM/yyyy', '/');
                                    if ((0, calendar_1.inRangeTime)(dateValue, (_d = (_c = this.props.min) !== null && _c !== void 0 ? _c : calendar_1.startDate) !== null && _d !== void 0 ? _d : calendar_1.startDate, (_f = (_e = this.props.min) !== null && _e !== void 0 ? _e : calendar_1.endDate) !== null && _f !== void 0 ? _f : calendar_1.endDate)) {
                                        this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false, value: dateToString(dateValue) }));
                                        if (this.props.onChange)
                                            this.props.onChange(dateToString(dateValue));
                                    }
                                    else {
                                        this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false, value: undefined }));
                                        if (this.props.onChange)
                                            this.props.onChange(undefined);
                                    }
                                }
                                else {
                                    this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false, value: undefined }));
                                    if (this.props.onChange)
                                        this.props.onChange(undefined);
                                }
                                break;
                            case index_1.CalendarType.DATETIME:
                                let dateTimeValue = undefined;
                                if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                    dateTimeValue = stringToDate(inputValue, (_g = this.props.formatDate) !== null && _g !== void 0 ? _g : 'dd/mm/yyyy hh:mm', '/');
                                    if ((0, calendar_1.inRangeTime)(dateTimeValue, (_h = this.props.min) !== null && _h !== void 0 ? _h : calendar_1.startDate, (_j = this.props.min) !== null && _j !== void 0 ? _j : calendar_1.endDate)) {
                                    }
                                    else if ((0, date_fns_1.differenceInCalendarDays)((_k = this.props.min) !== null && _k !== void 0 ? _k : calendar_1.startDate, dateTimeValue) > -1) {
                                        dateTimeValue = (_l = this.props.min) !== null && _l !== void 0 ? _l : calendar_1.startDate;
                                    }
                                    else if ((0, date_fns_1.differenceInCalendarDays)(dateTimeValue, (_m = this.props.min) !== null && _m !== void 0 ? _m : calendar_1.endDate) > -1) {
                                        dateTimeValue = (_o = this.props.min) !== null && _o !== void 0 ? _o : calendar_1.startDate;
                                    }
                                    else {
                                        dateTimeValue = undefined;
                                    }
                                }
                                const stateDateTimeValue = dateTimeValue ? dateToString(dateTimeValue, (_p = this.props.formatDate) !== null && _p !== void 0 ? _p : 'dd/mm/yyyy hh:mm') : dateTimeValue;
                                this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false, value: stateDateTimeValue }));
                                if (this.props.onChange)
                                    this.props.onChange(stateDateTimeValue);
                                break;
                            default:
                                let dateValue = undefined;
                                if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                    dateValue = stringToDate(inputValue, 'dd/MM/yyyy', '/');
                                    if ((0, calendar_1.inRangeTime)(dateValue, (_q = this.props.min) !== null && _q !== void 0 ? _q : calendar_1.startDate, (_r = this.props.min) !== null && _r !== void 0 ? _r : calendar_1.endDate)) {
                                    }
                                    else if ((0, date_fns_1.differenceInCalendarDays)((_s = this.props.min) !== null && _s !== void 0 ? _s : calendar_1.startDate, dateValue) > -1) {
                                        dateValue = (_t = this.props.min) !== null && _t !== void 0 ? _t : calendar_1.startDate;
                                    }
                                    else if ((0, date_fns_1.differenceInCalendarDays)(dateValue, (_u = this.props.min) !== null && _u !== void 0 ? _u : calendar_1.endDate) > -1) {
                                        dateValue = (_v = this.props.max) !== null && _v !== void 0 ? _v : calendar_1.endDate;
                                    }
                                    else {
                                        dateValue = undefined;
                                    }
                                }
                                const stateDateValue = dateValue ? dateToString(dateValue) : dateValue;
                                this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false, value: stateDateValue }));
                                if (this.props.onChange)
                                    this.props.onChange(stateDateValue);
                                break;
                        }
                    } })),
            react_1.default.createElement(index_1.Winicon, { src: `outline/user interface/${this.props.pickerType === index_1.CalendarType.DATETIME ? "opening-times" : "calendar-date-2"}`, size: '1.6rem', onClick: this.onOpenCalendar }),
            this.state.isOpen &&
                react_dom_1.default.createPortal(react_1.default.createElement("div", { className: `popup-overlay hidden-overlay`, onClick: (ev) => {
                        if (ev.target.classList.contains('popup-overlay'))
                            this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false }));
                    } },
                    react_1.default.createElement(index_1.Calendar, { min: this.props.min, max: this.props.max, value: this.getNewValue(), className: 'date-picker-popup-container', style: (_f = this.state.style) !== null && _f !== void 0 ? _f : { top: this.state.offset.y + this.state.offset.height + 2 + 'px', left: this.state.offset.x + 'px', border: 'none', boxShadow: '-20px 20px 40px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)' }, onSelect: (dateValue) => {
                            var _a;
                            switch (this.props.pickerType) {
                                case index_1.CalendarType.YEAR:
                                    this.setState(Object.assign(Object.assign({}, this.state), { value: dateValue.getFullYear().toString(), isOpen: false }));
                                    if (this.props.onChange)
                                        this.props.onChange(dateValue.getFullYear().toString());
                                    break;
                                case index_1.CalendarType.MONTH:
                                    var newValue = dateToString(dateValue);
                                    this.setState(Object.assign(Object.assign({}, this.state), { value: newValue.split('/').slice(1).join('/'), isOpen: false }));
                                    if (this.props.onChange)
                                        this.props.onChange(newValue.split('/').slice(1).join('/'));
                                    break;
                                case index_1.CalendarType.DATETIME:
                                    var newValue = dateToString(dateValue, (_a = this.props.formatDate) !== null && _a !== void 0 ? _a : 'dd/mm/yyyy hh:mm');
                                    this.setState(Object.assign(Object.assign({}, this.state), { value: newValue }));
                                    break;
                                default:
                                    var newValue = dateToString(dateValue);
                                    this.setState(Object.assign(Object.assign({}, this.state), { value: newValue, isOpen: false }));
                                    if (this.props.onChange)
                                        this.props.onChange(newValue);
                                    break;
                            }
                        }, footer: (this.props.pickerType === index_1.CalendarType.DATETIME || !this.props.hideButtonToday) && react_1.default.createElement("div", { className: 'row picker-popup-footer' },
                            this.props.pickerType === undefined || this.props.pickerType === index_1.CalendarType.DATE || this.props.pickerType === index_1.CalendarType.DATETIME ?
                                react_1.default.createElement("button", { type: 'button', className: 'row button-text-3', style: { color: 'var(--infor-main-color)', width: 'fit-content' }, onClick: () => {
                                        var _a;
                                        let format = (_a = this.props.formatDate) !== null && _a !== void 0 ? _a : (this.props.pickerType === index_1.CalendarType.DATETIME ? 'dd/mm/yyyy hh:mm' : 'dd/mm/yyyy');
                                        this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false, value: dateToString(calendar_1.today, format) }));
                                        if (this.props.onChange)
                                            this.props.onChange(dateToString(calendar_1.today, format));
                                    } }, this.props.t('today')) : null,
                            this.props.pickerType === index_1.CalendarType.DATETIME ? react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("div", { style: { flex: 1 } }),
                                react_1.default.createElement("button", { type: 'button', className: 'row', style: { padding: '0.6rem 1.2rem', backgroundColor: "var(--primary-main-color)", borderRadius: "0.8rem" }, onClick: () => {
                                        this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false }));
                                        if (this.props.onChange)
                                            this.props.onChange(this.state.value);
                                    } },
                                    react_1.default.createElement(index_1.Text, { className: 'button-text-3', style: { color: "var(--neutral-text-stable-color)" } }, t("apply")))) : null) })), document.body));
    }
}
exports.DatePicker = (0, react_i18next_1.withTranslation)()(TDatePicker);
