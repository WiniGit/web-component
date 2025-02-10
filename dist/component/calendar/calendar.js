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
exports.Calendar = exports.CalendarType = exports.inRangeTime = exports.endDate = exports.startDate = exports.today = void 0;
var react_1 = __importDefault(require("react"));
var calendar_module_css_1 = __importDefault(require("./calendar.module.css"));
var date_fns_1 = require("date-fns");
var react_i18next_1 = require("react-i18next");
var winicon_1 = require("../wini-icon/winicon");
exports.today = new Date();
exports.startDate = new Date(exports.today.getFullYear() - 100, exports.today.getMonth(), exports.today.getDate());
exports.endDate = new Date(exports.today.getFullYear() + 100, exports.today.getMonth(), exports.today.getDate());
var inRangeTime = function (date, startDate, endDate) { return ((0, date_fns_1.differenceInCalendarDays)(date, startDate) > -1 && (0, date_fns_1.differenceInCalendarDays)(endDate, date) > -1); };
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
var stateValue = function (minDate, maxDate, value, range) {
    var defaultValue;
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
    var defaultMonth = defaultValue instanceof Date ? defaultValue.getMonth() : defaultValue.sTime.getMonth();
    var defaultYear = defaultValue instanceof Date ? defaultValue.getFullYear() : defaultValue.sTime.getFullYear();
    return {
        value: value ? defaultValue : undefined,
        selectMonth: defaultMonth,
        selectYear: defaultYear,
        tab: CalendarTab.DATE,
    };
};
var TCalendar = /** @class */ (function (_super) {
    __extends(TCalendar, _super);
    function TCalendar(props) {
        var _this = _super.call(this, props) || this;
        _this.minDate = !_this.props.min || _this.props.min.getTime() < exports.startDate.getTime() ? exports.startDate : _this.props.min;
        _this.maxDate = !_this.props.max || _this.props.max.getTime() > exports.endDate.getTime() ? exports.endDate : _this.props.max;
        _this.state = stateValue(_this.minDate, _this.maxDate, _this.props.value, _this.props.range);
        _this.showDateInMonth = _this.showDateInMonth.bind(_this);
        _this.showMonthInYear = _this.showMonthInYear.bind(_this);
        _this.showYearInRange = _this.showYearInRange.bind(_this);
        _this.getTitle = _this.getTitle.bind(_this);
        return _this;
    }
    TCalendar.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
            this.setState(stateValue(this.minDate, this.maxDate, this.props.value, this.props.range));
        }
    };
    TCalendar.prototype.showDateInMonth = function () {
        var _this = this;
        var firstDayOfMonth = new Date(this.state.selectYear, this.state.selectMonth, 1);
        return react_1.default.createElement(react_1.default.Fragment, null,
            Array.from({ length: 7 }).map(function (_, i) {
                switch (i) {
                    case 0:
                        var weekdayTitle = _this.props.t("su");
                        break;
                    case 1:
                        weekdayTitle = _this.props.t("mo");
                        break;
                    case 2:
                        weekdayTitle = _this.props.t("tu");
                        break;
                    case 3:
                        weekdayTitle = _this.props.t("we");
                        break;
                    case 4:
                        weekdayTitle = _this.props.t("th");
                        break;
                    case 5:
                        weekdayTitle = _this.props.t("fr");
                        break;
                    case 6:
                        weekdayTitle = _this.props.t("sa");
                        break;
                    default:
                        weekdayTitle = '';
                        break;
                }
                return react_1.default.createElement("div", { key: 'dtwk-' + i, className: "".concat(calendar_module_css_1.default['date-picker-circle'], " date-picker-circle") },
                    react_1.default.createElement("span", { className: "label-4 row" }, weekdayTitle));
            }),
            Array.from({ length: 42 }).map(function (_, i) {
                var _a, _b, _c;
                var dateNumber = (i % 7) + (Math.floor(i / 7) * 7) - firstDayOfMonth.getDay();
                var timeValue = new Date(_this.state.selectYear, _this.state.selectMonth, dateNumber + 1);
                var className = "".concat(calendar_module_css_1.default['date-picker-circle'], " date-picker-circle");
                var typoClassName = "body-3";
                if (dateNumber + 1 === exports.today.getDate() && _this.state.selectMonth === exports.today.getMonth() && _this.state.selectYear === exports.today.getFullYear()) {
                    className += " ".concat(calendar_module_css_1.default['today']);
                }
                var style;
                if (!(0, exports.inRangeTime)(timeValue, _this.minDate, _this.maxDate)) {
                    className += " ".concat(calendar_module_css_1.default['invalid']);
                }
                else if (_this.state.value instanceof Date) {
                    if (_this.state.value.getTime() === timeValue.getTime())
                        className += " ".concat(calendar_module_css_1.default['selected']);
                }
                else if (((_a = _this.state.value) === null || _a === void 0 ? void 0 : _a.sTime.getTime()) === timeValue.getTime() || ((_b = _this.state.value) === null || _b === void 0 ? void 0 : _b.eTime.getTime()) === timeValue.getTime()) {
                    className += " ".concat(calendar_module_css_1.default['selected'], " ").concat(calendar_module_css_1.default["".concat(((_c = _this.state.value) === null || _c === void 0 ? void 0 : _c.sTime.getTime()) === timeValue.getTime() ? "start" : "end", "-range")]);
                }
                else if (_this.state.value && (0, exports.inRangeTime)(timeValue, _this.state.value.sTime, _this.state.value.eTime)) {
                    className += " ".concat(calendar_module_css_1.default['in-range']);
                }
                if (timeValue.getMonth() !== _this.state.selectMonth) {
                    typoClassName = "placeholder-2";
                }
                return react_1.default.createElement("div", { key: timeValue.toString(), className: className, style: style },
                    react_1.default.createElement("button", { type: "button", className: "".concat(typoClassName, " row"), onClick: function () {
                            var currentValue = _this.state.value;
                            if (_this.props.range) {
                                var newValue = (!currentValue || timeValue.getTime() < currentValue.sTime.getTime()) ? { sTime: timeValue, eTime: timeValue } : { sTime: currentValue.sTime, eTime: timeValue };
                                _this.setState(__assign(__assign({}, _this.state), { value: newValue }));
                                if (_this.props.onSelect)
                                    _this.props.onSelect(newValue);
                            }
                            else {
                                _this.setState(__assign(__assign({}, _this.state), { value: timeValue }));
                                if (_this.props.onSelect)
                                    _this.props.onSelect(timeValue);
                            }
                        } }, timeValue.getDate()));
            }));
    };
    TCalendar.prototype.showMonthInYear = function () {
        var _this = this;
        return react_1.default.createElement(react_1.default.Fragment, null, Array.from({ length: 12 }).map(function (_, i) {
            switch (i) {
                case 0:
                    var monthTitle = _this.props.i18n.language === "en" ? "Jan" : _this.props.t('january');
                    break;
                case 1:
                    monthTitle = _this.props.i18n.language === "en" ? "Feb" : _this.props.t('february');
                    break;
                case 2:
                    monthTitle = _this.props.i18n.language === "en" ? "Mar" : _this.props.t('march');
                    break;
                case 3:
                    monthTitle = _this.props.i18n.language === "en" ? "Apr" : _this.props.t('april');
                    break;
                case 4:
                    monthTitle = _this.props.i18n.language === "en" ? "May" : _this.props.t('may');
                    break;
                case 5:
                    monthTitle = _this.props.i18n.language === "en" ? "Jun" : _this.props.t('june');
                    break;
                case 6:
                    monthTitle = _this.props.i18n.language === "en" ? "Jul" : _this.props.t('july');
                    break;
                case 7:
                    monthTitle = _this.props.i18n.language === "en" ? "Aug" : _this.props.t('august');
                    break;
                case 8:
                    monthTitle = _this.props.i18n.language === "en" ? "Sep" : _this.props.t('september');
                    break;
                case 9:
                    monthTitle = _this.props.i18n.language === "en" ? "Oct" : _this.props.t('october');
                    break;
                case 10:
                    monthTitle = _this.props.i18n.language === "en" ? "Nov" : _this.props.t('november');
                    break;
                case 11:
                    monthTitle = _this.props.i18n.language === "en" ? "Dec" : _this.props.t('december');
                    break;
                default:
                    monthTitle = '';
                    break;
            }
            var timeValue = new Date(_this.state.selectYear, i);
            var className = "".concat(calendar_module_css_1.default['month-picker-circle'], " month-picker-circle");
            if (_this.state.selectYear === exports.today.getFullYear() && exports.today.getMonth() === i) {
                className += " ".concat(calendar_module_css_1.default['today']);
            }
            if (!(0, exports.inRangeTime)(timeValue, _this.minDate, _this.maxDate)) {
                className += " ".concat(calendar_module_css_1.default['invalid']);
            }
            else if (_this.state.value instanceof Date) {
                if (_this.state.selectYear === _this.state.value.getFullYear() && i === _this.state.value.getMonth())
                    className += " ".concat(calendar_module_css_1.default['selected']);
            }
            else if (_this.state.value && ((i === _this.state.value.sTime.getMonth() && _this.state.value.sTime.getFullYear() === _this.state.selectYear) || (i === _this.state.value.eTime.getMonth() && _this.state.value.eTime.getFullYear() === _this.state.selectYear))) {
                className += " ".concat(calendar_module_css_1.default['selected'], " ").concat(calendar_module_css_1.default["".concat(i === _this.state.value.sTime.getMonth() && _this.state.value.sTime.getFullYear() === _this.state.selectYear ? "start" : "end", "-range")]);
            }
            else if (_this.state.value && (0, exports.inRangeTime)(timeValue, _this.state.value.sTime, _this.state.value.eTime)) {
                className += " ".concat(calendar_module_css_1.default['in-range']);
            }
            return react_1.default.createElement("div", { key: timeValue.toString(), className: className },
                react_1.default.createElement("button", { type: "button", className: "body-3 row", onClick: function () { _this.setState(__assign(__assign({}, _this.state), { selectMonth: i, tab: CalendarTab.DATE })); } }, monthTitle));
        }));
    };
    TCalendar.prototype.showYearInRange = function () {
        var _this = this;
        return Array.from({ length: 12 }).map(function (_, i) {
            var _a, _b, _c;
            var firstYearInTable = _this.state.selectYear - ((_this.state.selectYear - exports.startDate.getFullYear()) % 12);
            var yearNumber = i + firstYearInTable;
            var className = "".concat(calendar_module_css_1.default['year-picker-circle'], " year-picker-circle");
            if (yearNumber === exports.today.getFullYear()) {
                className += " ".concat(calendar_module_css_1.default['today']);
            }
            if (yearNumber < _this.minDate.getFullYear() || yearNumber > _this.maxDate.getFullYear()) {
                className += " ".concat(calendar_module_css_1.default['invalid']);
            }
            else if (_this.state.value instanceof Date) {
                if (yearNumber === _this.state.value.getFullYear())
                    className += " ".concat(calendar_module_css_1.default['selected']);
            }
            else if (yearNumber === ((_a = _this.state.value) === null || _a === void 0 ? void 0 : _a.sTime.getFullYear()) || yearNumber === ((_b = _this.state.value) === null || _b === void 0 ? void 0 : _b.eTime.getFullYear())) {
                className += " ".concat(calendar_module_css_1.default['selected'], " ").concat(calendar_module_css_1.default["".concat(yearNumber === ((_c = _this.state.value) === null || _c === void 0 ? void 0 : _c.sTime.getFullYear()) ? "start" : "end", "-range")]);
            }
            else if (_this.state.value && yearNumber > _this.state.value.sTime.getFullYear() && yearNumber < _this.state.value.eTime.getFullYear()) {
                className += " ".concat(calendar_module_css_1.default['in-range']);
            }
            return react_1.default.createElement("div", { key: yearNumber.toString(), className: className },
                react_1.default.createElement("button", { type: "button", className: "body-3 row", onClick: function () { _this.setState(__assign(__assign({}, _this.state), { tab: CalendarTab.MONTH, selectYear: yearNumber })); } }, yearNumber));
        });
    };
    TCalendar.prototype.getTitle = function () {
        switch (this.state.tab) {
            case CalendarTab.YEAR:
                var firstYearInTable = this.state.selectYear - ((this.state.selectYear - exports.startDate.getFullYear()) % 12);
                return "".concat(firstYearInTable, "-").concat(firstYearInTable + 11);
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
                return "".concat(monthName).concat(this.props.i18n.language === 'en' ? ' ' : '/').concat(this.state.selectYear);
        }
    };
    TCalendar.prototype.render = function () {
        var _this = this;
        return react_1.default.createElement("div", { className: "".concat(calendar_module_css_1.default['calendar-container'], " col") },
            this.props.header,
            react_1.default.createElement("div", { className: "".concat(calendar_module_css_1.default['picker-date-header'], " row") },
                react_1.default.createElement("button", { type: 'button', onClick: function () {
                        switch (_this.state.tab) {
                            case CalendarTab.YEAR:
                                if (_this.state.selectYear - 10 < exports.startDate.getFullYear()) {
                                    _this.setState(__assign(__assign({}, _this.state), { selectYear: exports.startDate.getFullYear() }));
                                }
                                else {
                                    _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear - 10 }));
                                }
                                break;
                            case CalendarTab.MONTH:
                                var newTime = new Date(_this.state.selectYear, _this.state.selectMonth - 1);
                                if (newTime.getTime() >= exports.startDate.getTime()) {
                                    _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear - 1 }));
                                }
                                break;
                            default:
                                var newDataVl = new Date(_this.state.selectYear, _this.state.selectMonth - 1);
                                if (newDataVl.getTime() >= exports.startDate.getTime()) {
                                    _this.setState(__assign(__assign({}, _this.state), { selectMonth: newDataVl.getMonth(), selectYear: newDataVl.getFullYear() }));
                                }
                                break;
                        }
                    } },
                    react_1.default.createElement(winicon_1.Winicon, { src: "fill/arrows/left-arrow", size: '1.4rem' })),
                react_1.default.createElement("span", { className: "heading-7", onClick: function () {
                        if (_this.state.tab !== CalendarTab.YEAR)
                            _this.setState(__assign(__assign({}, _this.state), { tab: _this.state.tab === CalendarTab.DATE ? CalendarTab.MONTH : CalendarTab.YEAR }));
                    } }, this.getTitle()),
                react_1.default.createElement("button", { type: 'button', onClick: function () {
                        switch (_this.state.tab) {
                            case CalendarTab.YEAR:
                                if (_this.state.selectYear + 10 > exports.endDate.getFullYear()) {
                                    _this.setState(__assign(__assign({}, _this.state), { selectYear: exports.endDate.getFullYear() }));
                                }
                                else {
                                    _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear + 10 }));
                                }
                                break;
                            case CalendarTab.MONTH:
                                var newTime = new Date(_this.state.selectYear, _this.state.selectMonth + 1);
                                if (newTime.getTime() <= exports.endDate.getTime()) {
                                    _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear + 1 }));
                                }
                                break;
                            default:
                                var newDataVl = new Date(_this.state.selectYear, _this.state.selectMonth + 1);
                                if (newDataVl.getTime() <= exports.endDate.getTime()) {
                                    _this.setState(__assign(__assign({}, _this.state), { selectMonth: newDataVl.getMonth(), selectYear: newDataVl.getFullYear() }));
                                }
                                break;
                        }
                    } },
                    react_1.default.createElement(winicon_1.Winicon, { src: "fill/arrows/right-arrow", size: '1.4rem' }))),
            react_1.default.createElement("div", { className: "".concat(calendar_module_css_1.default['picker-date-body'], " row") }, this.state.tab === CalendarTab.YEAR ? this.showYearInRange() : this.state.tab === CalendarTab.MONTH ? this.showMonthInYear() : this.showDateInMonth()),
            this.props.footer);
    };
    return TCalendar;
}(react_1.default.Component));
exports.Calendar = (0, react_i18next_1.withTranslation)()(TCalendar);
