"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePicker = void 0;
/* eslint-disable react-hooks/exhaustive-deps */
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
require("./date-picker.css");
var index_1 = require("../../index");
var calendar_1 = require("../calendar/calendar");
var date_fns_1 = require("date-fns");
var react_i18next_1 = require("react-i18next");
var dateToString = function (x, y) {
    if (y === void 0) { y = "dd/mm/yyyy"; }
    var splitDateTime = y.split(" ");
    var dateFormat = splitDateTime[0];
    var timeFormat = splitDateTime[1];
    if (dateFormat.includes('hh')) {
        dateFormat = splitDateTime[1];
        timeFormat = splitDateTime[0];
    }
    var dateConvert = dateFormat.split(y.includes("/") ? "/" : "-").map(function (type) {
        switch (type.toLowerCase()) {
            case "dd":
                return x.getDate() < 10 ? "0".concat(x.getDate()) : "".concat(x.getDate());
            case "mm":
                return (x.getMonth() + 1) < 10 ? "0".concat((x.getMonth() + 1)) : "".concat((x.getMonth() + 1));
            case "yyyy":
                return "".concat(x.getFullYear());
            default:
                return '';
        }
    }).join(y.includes("/") ? "/" : "-");
    if (timeFormat) {
        var timeConvert = timeFormat.split(":").map(function (type) {
            switch (type) {
                case "hh":
                    return x.getHours() < 10 ? "0".concat(x.getHours()) : "".concat(x.getHours());
                case "mm":
                    return x.getMinutes() < 10 ? "0".concat(x.getMinutes()) : "".concat(x.getMinutes());
                case "ss":
                    return x.getSeconds() < 10 ? "0".concat(x.getSeconds()) : "".concat(x.getSeconds());
                default:
                    return 'D';
            }
        }).join(":");
        return dateConvert + " " + timeConvert;
    }
    return dateConvert;
};
var stringToDate = function (_date, _format, _delimiter) {
    var _a, _b, _c, _d, _e;
    if (_format === void 0) { _format = "dd/MM/yyyy"; }
    if (_delimiter === void 0) { _delimiter = "/"; }
    var dayformat = _format;
    var hourformat = '';
    var day = _date;
    var hours = '';
    var isHour = false;
    if (_format.trim().indexOf(" ") > -1) {
        dayformat = _format.trim().split(" ")[0];
        hourformat = _format.trim().split(" ")[1];
        day = _date.trim().split(" ")[0];
        hours = (_a = _date.trim().split(" ")[1]) !== null && _a !== void 0 ? _a : '00:00:00';
        isHour = true;
    }
    var formatLowerCase = dayformat.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = day.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var hour = 0;
    var min = 0;
    var sec = 0;
    if (isHour) {
        var tmpHour = hourformat.split(":");
        var hourindex = tmpHour.indexOf("HH");
        if (hourindex < 0) {
            hourindex = tmpHour.indexOf("hh");
        }
        var mmindex = tmpHour.indexOf("mm");
        var ssindex = tmpHour.indexOf("ss");
        var time = hours.split(":");
        hour = parseInt((_b = time[hourindex]) !== null && _b !== void 0 ? _b : '0');
        min = parseInt((_c = time[mmindex]) !== null && _c !== void 0 ? _c : '0');
        sec = parseInt((_d = time[ssindex]) !== null && _d !== void 0 ? _d : '0');
    }
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(parseInt(dateItems[yearIndex]), month, parseInt((_e = dateItems[dayIndex]) !== null && _e !== void 0 ? _e : '0'), hour, min, sec);
    return formatedDate;
};
var TDatePicker = /** @class */ (function (_super) {
    __extends(TDatePicker, _super);
    function TDatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.getNewValue = function (value) {
            var _a, _b, _c, _d, _e, _f;
            var params = (_b = value !== null && value !== void 0 ? value : (_a = _this.state) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
            if ((_c = params.trim()) === null || _c === void 0 ? void 0 : _c.length) {
                switch (_this.props.pickerType) {
                    case index_1.CalendarType.YEAR:
                        return new Date(parseInt(params), 1, 1);
                    case index_1.CalendarType.MONTH:
                        var splitParams = params.includes('/') ? params.split('/') : params.split('-');
                        return new Date(parseInt((_d = splitParams[1]) !== null && _d !== void 0 ? _d : "".concat(calendar_1.today.getFullYear())), parseInt((_e = splitParams[0]) !== null && _e !== void 0 ? _e : "".concat(calendar_1.today.getMonth())), 1);
                    case index_1.CalendarType.DATETIME:
                        return stringToDate(params, (_f = _this.props.formatDate) !== null && _f !== void 0 ? _f : 'dd/mm/yyyy hh:mm');
                    default:
                        return stringToDate(params);
                }
            }
            return undefined;
        };
        _this.onOpenCalendar = function (ev) {
            if (!_this.state.isOpen) {
                _this.setState(__assign(__assign({}, _this.state), { isOpen: true, style: undefined, offset: ev.target.closest('.date-picker-container').getBoundingClientRect() }));
            }
        };
        _this.state = {
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
        _this.getNewValue = _this.getNewValue.bind(_this);
        return _this;
    }
    TDatePicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a;
        if (prevProps.value !== this.props.value) {
            this.setState(__assign(__assign({}, this.state), { value: this.props.value }));
        }
        if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
            var thisPopupRect = (_a = document.body.querySelector('.date-picker-popup-container')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            if (thisPopupRect) {
                var style = void 0;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        right: document.body.offsetWidth - this.state.offset.left + 'px'
                    };
                }
                if ((thisPopupRect.bottom - 12) > document.body.offsetHeight) {
                    style = style ? __assign(__assign({}, style), { top: undefined, bottom: document.body.offsetHeight - this.state.offset.top + 'px' }) : {
                        left: this.state.offset.x + 'px',
                        bottom: document.body.offsetHeight - this.state.offset.top + 'px'
                    };
                }
                if (style)
                    this.setState(__assign(__assign({}, this.state), { style: style }));
            }
        }
    };
    TDatePicker.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        var t = this.props.t;
        var maxLength = 10;
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
        return react_1.default.createElement("div", { id: this.props.id, className: "date-picker-container row ".concat((_a = this.props.className) !== null && _a !== void 0 ? _a : 'body-3', " ").concat(this.props.disabled ? 'disabled' : '', " ").concat(((_b = this.props.helperText) === null || _b === void 0 ? void 0 : _b.length) && 'helper-text'), "helper-text": this.props.helperText, style: this.props.style ? __assign(__assign({}, { '--helper-text-color': (_c = this.props.helperTextColor) !== null && _c !== void 0 ? _c : '#e14337' }), this.props.style) : { '--helper-text-color': (_d = this.props.helperTextColor) !== null && _d !== void 0 ? _d : '#e14337' } },
            react_1.default.createElement("div", { className: 'input-field-value row', style: { height: '4rem' } },
                react_1.default.createElement("input", { autoComplete: 'off', value: (_e = this.state.value) !== null && _e !== void 0 ? _e : '', onChange: function (ev) { return _this.setState(__assign(__assign({}, _this.state), { value: ev.target.value })); }, placeholder: this.props.placeholder, maxLength: maxLength, readOnly: this.props.pickOnly, onFocus: this.props.pickOnly ? function (ev) {
                        _this.onOpenCalendar(ev);
                        if (_this.props.onFocus)
                            _this.props.onFocus(ev);
                    } : this.props.onFocus, onKeyDown: this.props.onComplete ? function (ev) {
                        if (_this.props.onComplete) {
                            switch (ev.key.toLowerCase()) {
                                case "enter":
                                    _this.props.onComplete(ev);
                                    break;
                                default:
                                    break;
                            }
                        }
                    } : undefined, onBlur: this.props.pickOnly ? undefined : function (ev) {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
                        var inputValue = ev.target.value.trim();
                        switch (_this.props.pickerType) {
                            case index_1.CalendarType.YEAR:
                                var minYear = ((_a = _this.props.min) !== null && _a !== void 0 ? _a : calendar_1.startDate).getFullYear();
                                var maxYear = ((_b = _this.props.min) !== null && _b !== void 0 ? _b : calendar_1.endDate).getFullYear();
                                if (!isNaN(parseInt(inputValue)) && parseInt(inputValue) <= maxYear && parseInt(inputValue) >= minYear) {
                                    _this.setState(__assign(__assign({}, _this.state), { isOpen: false, value: inputValue }));
                                    if (_this.props.onChange)
                                        _this.props.onChange(inputValue);
                                }
                                else {
                                    _this.setState(__assign(__assign({}, _this.state), { isOpen: false, value: undefined }));
                                    if (_this.props.onChange)
                                        _this.props.onChange(undefined);
                                }
                                break;
                            case index_1.CalendarType.MONTH:
                                if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                    var dateValue_1 = stringToDate("1/".concat(inputValue), 'dd/MM/yyyy', '/');
                                    if ((0, calendar_1.inRangeTime)(dateValue_1, (_d = (_c = _this.props.min) !== null && _c !== void 0 ? _c : calendar_1.startDate) !== null && _d !== void 0 ? _d : calendar_1.startDate, (_f = (_e = _this.props.min) !== null && _e !== void 0 ? _e : calendar_1.endDate) !== null && _f !== void 0 ? _f : calendar_1.endDate)) {
                                        _this.setState(__assign(__assign({}, _this.state), { isOpen: false, value: dateToString(dateValue_1) }));
                                        if (_this.props.onChange)
                                            _this.props.onChange(dateToString(dateValue_1));
                                    }
                                    else {
                                        _this.setState(__assign(__assign({}, _this.state), { isOpen: false, value: undefined }));
                                        if (_this.props.onChange)
                                            _this.props.onChange(undefined);
                                    }
                                }
                                else {
                                    _this.setState(__assign(__assign({}, _this.state), { isOpen: false, value: undefined }));
                                    if (_this.props.onChange)
                                        _this.props.onChange(undefined);
                                }
                                break;
                            case index_1.CalendarType.DATETIME:
                                var dateTimeValue = undefined;
                                if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                    dateTimeValue = stringToDate(inputValue, (_g = _this.props.formatDate) !== null && _g !== void 0 ? _g : 'dd/mm/yyyy hh:mm', '/');
                                    if ((0, calendar_1.inRangeTime)(dateTimeValue, (_h = _this.props.min) !== null && _h !== void 0 ? _h : calendar_1.startDate, (_j = _this.props.min) !== null && _j !== void 0 ? _j : calendar_1.endDate)) {
                                    }
                                    else if ((0, date_fns_1.differenceInCalendarDays)((_k = _this.props.min) !== null && _k !== void 0 ? _k : calendar_1.startDate, dateTimeValue) > -1) {
                                        dateTimeValue = (_l = _this.props.min) !== null && _l !== void 0 ? _l : calendar_1.startDate;
                                    }
                                    else if ((0, date_fns_1.differenceInCalendarDays)(dateTimeValue, (_m = _this.props.min) !== null && _m !== void 0 ? _m : calendar_1.endDate) > -1) {
                                        dateTimeValue = (_o = _this.props.min) !== null && _o !== void 0 ? _o : calendar_1.startDate;
                                    }
                                    else {
                                        dateTimeValue = undefined;
                                    }
                                }
                                var stateDateTimeValue = dateTimeValue ? dateToString(dateTimeValue, (_p = _this.props.formatDate) !== null && _p !== void 0 ? _p : 'dd/mm/yyyy hh:mm') : dateTimeValue;
                                _this.setState(__assign(__assign({}, _this.state), { isOpen: false, value: stateDateTimeValue }));
                                if (_this.props.onChange)
                                    _this.props.onChange(stateDateTimeValue);
                                break;
                            default:
                                var dateValue = undefined;
                                if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                    dateValue = stringToDate(inputValue, 'dd/MM/yyyy', '/');
                                    if ((0, calendar_1.inRangeTime)(dateValue, (_q = _this.props.min) !== null && _q !== void 0 ? _q : calendar_1.startDate, (_r = _this.props.min) !== null && _r !== void 0 ? _r : calendar_1.endDate)) {
                                    }
                                    else if ((0, date_fns_1.differenceInCalendarDays)((_s = _this.props.min) !== null && _s !== void 0 ? _s : calendar_1.startDate, dateValue) > -1) {
                                        dateValue = (_t = _this.props.min) !== null && _t !== void 0 ? _t : calendar_1.startDate;
                                    }
                                    else if ((0, date_fns_1.differenceInCalendarDays)(dateValue, (_u = _this.props.min) !== null && _u !== void 0 ? _u : calendar_1.endDate) > -1) {
                                        dateValue = (_v = _this.props.max) !== null && _v !== void 0 ? _v : calendar_1.endDate;
                                    }
                                    else {
                                        dateValue = undefined;
                                    }
                                }
                                var stateDateValue = dateValue ? dateToString(dateValue) : dateValue;
                                _this.setState(__assign(__assign({}, _this.state), { isOpen: false, value: stateDateValue }));
                                if (_this.props.onChange)
                                    _this.props.onChange(stateDateValue);
                                break;
                        }
                    } })),
            react_1.default.createElement(index_1.Winicon, { src: "outline/user interface/".concat(this.props.pickerType === index_1.CalendarType.DATETIME ? "opening-times" : "calendar-date-2"), size: '1.6rem', onClick: this.onOpenCalendar }),
            this.state.isOpen &&
                react_dom_1.default.createPortal(react_1.default.createElement("div", { className: "popup-overlay hidden-overlay", onClick: function (ev) {
                        if (ev.target.classList.contains('popup-overlay'))
                            _this.setState(__assign(__assign({}, _this.state), { isOpen: false }));
                    } },
                    react_1.default.createElement(index_1.Calendar, { min: this.props.min, max: this.props.max, value: this.getNewValue(), type: (_f = this.props.pickerType) !== null && _f !== void 0 ? _f : index_1.CalendarType.DATE, className: 'date-picker-popup-container', style: (_g = this.state.style) !== null && _g !== void 0 ? _g : { top: this.state.offset.y + this.state.offset.height + 2 + 'px', left: this.state.offset.x + 'px', border: 'none', boxShadow: '-20px 20px 40px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)' }, onSelect: function (dateValue) {
                            var _a;
                            switch (_this.props.pickerType) {
                                case index_1.CalendarType.YEAR:
                                    _this.setState(__assign(__assign({}, _this.state), { value: dateValue.getFullYear().toString(), isOpen: false }));
                                    if (_this.props.onChange)
                                        _this.props.onChange(dateValue.getFullYear().toString());
                                    break;
                                case index_1.CalendarType.MONTH:
                                    var newValue = dateToString(dateValue);
                                    _this.setState(__assign(__assign({}, _this.state), { value: newValue.split('/').slice(1).join('/'), isOpen: false }));
                                    if (_this.props.onChange)
                                        _this.props.onChange(newValue.split('/').slice(1).join('/'));
                                    break;
                                case index_1.CalendarType.DATETIME:
                                    var newValue = dateToString(dateValue, (_a = _this.props.formatDate) !== null && _a !== void 0 ? _a : 'dd/mm/yyyy hh:mm');
                                    _this.setState(__assign(__assign({}, _this.state), { value: newValue }));
                                    break;
                                default:
                                    var newValue = dateToString(dateValue);
                                    _this.setState(__assign(__assign({}, _this.state), { value: newValue, isOpen: false }));
                                    if (_this.props.onChange)
                                        _this.props.onChange(newValue);
                                    break;
                            }
                        }, footer: (this.props.pickerType === index_1.CalendarType.DATETIME || !this.props.hideButtonToday) && react_1.default.createElement("div", { className: 'row picker-popup-footer' },
                            this.props.pickerType === undefined || this.props.pickerType === index_1.CalendarType.DATE || this.props.pickerType === index_1.CalendarType.DATETIME ?
                                react_1.default.createElement("button", { type: 'button', className: 'row button-text-3', style: { color: 'var(--infor-main-color)', width: 'fit-content' }, onClick: function () {
                                        var _a;
                                        var format = (_a = _this.props.formatDate) !== null && _a !== void 0 ? _a : (_this.props.pickerType === index_1.CalendarType.DATETIME ? 'dd/mm/yyyy hh:mm' : 'dd/mm/yyyy');
                                        _this.setState(__assign(__assign({}, _this.state), { isOpen: false, value: dateToString(calendar_1.today, format) }));
                                        if (_this.props.onChange)
                                            _this.props.onChange(dateToString(calendar_1.today, format));
                                    } }, this.props.t('today')) : null,
                            this.props.pickerType === index_1.CalendarType.DATETIME ? react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("div", { style: { flex: 1 } }),
                                react_1.default.createElement("button", { type: 'button', className: 'row', style: { padding: '0.6rem 1.2rem', backgroundColor: "var(--primary-main-color)", borderRadius: "0.8rem" }, onClick: function () {
                                        _this.setState(__assign(__assign({}, _this.state), { isOpen: false }));
                                        if (_this.props.onChange)
                                            _this.props.onChange(_this.state.value);
                                    } },
                                    react_1.default.createElement(index_1.Text, { className: 'button-text-3', style: { color: "var(--neutral-text-stable-color)" } }, t("apply")))) : null) })), document.body));
    };
    return TDatePicker;
}(react_1.default.Component));
exports.DatePicker = (0, react_i18next_1.withTranslation)()(TDatePicker);
