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
var winicon_1 = require("../wini-icon/winicon");
var react_i18next_1 = require("react-i18next");
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
var TCalendar = /** @class */ (function (_super) {
    __extends(TCalendar, _super);
    function TCalendar(props) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: (_a = _this.props.value) !== null && _a !== void 0 ? _a : exports.today,
            selectDate: (_b = _this.props.value) !== null && _b !== void 0 ? _b : exports.today,
            selectMonth: ((_c = _this.props.value) !== null && _c !== void 0 ? _c : exports.today).getMonth(),
            selectYear: ((_d = _this.props.value) !== null && _d !== void 0 ? _d : exports.today).getFullYear(),
            type: CalendarType.DATE,
            selectHours: (_f = (_e = _this.props.value) === null || _e === void 0 ? void 0 : _e.getHours()) !== null && _f !== void 0 ? _f : 0,
            selectMinutes: (_h = (_g = _this.props.value) === null || _g === void 0 ? void 0 : _g.getMinutes()) !== null && _h !== void 0 ? _h : 0,
            selectSeconds: (_k = (_j = _this.props.value) === null || _j === void 0 ? void 0 : _j.getSeconds()) !== null && _k !== void 0 ? _k : 0,
        };
        _this.showDateInMonth = _this.showDateInMonth.bind(_this);
        _this.showMonthInYear = _this.showMonthInYear.bind(_this);
        _this.showYearInRange = _this.showYearInRange.bind(_this);
        _this.getTitle = _this.getTitle.bind(_this);
        return _this;
    }
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
                return react_1.default.createElement("div", { key: 'dtwk-' + i, className: "".concat(calendar_module_css_1.default['date-picker-circle'], " label-4"), style: { color: 'var(--neutral-text-title-color)' } }, weekdayTitle);
            }),
            Array.from({ length: 42 }).map(function (_, i) {
                var _a, _b;
                var dateNumber = (i % 7) + (Math.floor(i / 7) * 7) - firstDayOfMonth.getDay();
                var timeValue = new Date(_this.state.selectYear, _this.state.selectMonth, dateNumber + 1, _this.state.selectHours, _this.state.selectMinutes, _this.state.selectSeconds);
                var style = {};
                var additionProps = {};
                var selected = false;
                if (dateNumber + 1 === exports.today.getDate() && _this.state.selectMonth === exports.today.getMonth() && _this.state.selectYear === exports.today.getFullYear()) {
                    style = { borderColor: 'var(--infor-main-color)' };
                }
                if (!(0, exports.inRangeTime)(timeValue, exports.startDate, exports.endDate)) {
                    additionProps = { 'in-range': 'false' };
                }
                else if (!(0, exports.inRangeTime)(timeValue, (_a = _this.props.min) !== null && _a !== void 0 ? _a : exports.startDate, (_b = _this.props.max) !== null && _b !== void 0 ? _b : exports.endDate)) {
                    style = __assign(__assign({}, style), { color: 'var(--neutral-text-disabled-color)', pointerEvents: 'none' });
                }
                else if (_this.state.value.valueOf() === timeValue.valueOf()) {
                    additionProps = __assign({}, additionProps);
                    selected = true;
                }
                else if (timeValue.getMonth() !== _this.state.selectMonth) {
                    style = __assign(__assign({}, style), { color: 'var(--neutral-text-subtitle-color)' });
                }
                return react_1.default.createElement("button", __assign({ type: "button", key: timeValue.toString(), className: "".concat(calendar_module_css_1.default['date-picker-circle'], " date-picker-circle body-3 ").concat(selected ? calendar_module_css_1.default['selected'] : ''), style: style }, additionProps, { onClick: function () {
                        _this.setState(__assign(__assign({}, _this.state), { value: timeValue }));
                        if (_this.props.onSelect)
                            _this.props.onSelect(timeValue);
                    } }), timeValue.getDate());
            }));
    };
    TCalendar.prototype.showMonthInYear = function () {
        var _this = this;
        return react_1.default.createElement(react_1.default.Fragment, null, Array.from({ length: 12 }).map(function (_, i) {
            var _a, _b, _c;
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
            var timeValue = new Date(_this.state.selectYear, i, exports.today.getDate());
            var additionProps = {};
            var style = {};
            var selected = false;
            if (_this.state.selectYear === exports.today.getFullYear() && exports.today.getMonth() === i) {
                style = { borderColor: 'var(--infor-main-color)' };
            }
            if (!(0, exports.inRangeTime)(timeValue, exports.startDate, exports.endDate)) {
                additionProps = { 'in-range': 'false' };
            }
            else if (!(0, exports.inRangeTime)(new Date(_this.state.selectYear, _this.state.selectMonth), (_a = _this.props.min) !== null && _a !== void 0 ? _a : exports.startDate, (_b = _this.props.max) !== null && _b !== void 0 ? _b : exports.endDate)) {
                if (_this.state.selectYear === ((_c = _this.state.selectDate) === null || _c === void 0 ? void 0 : _c.getFullYear()) && _this.state.selectDate.getMonth() === i) {
                    style = {
                        color: 'var(--neutral-text-disabled-color)',
                        pointerEvents: 'none'
                    };
                }
            }
            if (_this.state.selectYear === _this.state.value.getFullYear() && i === _this.state.value.getMonth()) {
                selected = true;
            }
            return react_1.default.createElement("button", __assign({ type: "button", key: timeValue.toString(), className: "".concat(calendar_module_css_1.default['month-picker-circle'], " month-picker-circle body-3 row ").concat(selected ? calendar_module_css_1.default['selected'] : ''), style: style }, additionProps, { onClick: function () {
                    if (_this.props.type === CalendarType.MONTH) {
                        _this.setState(__assign(__assign({}, _this.state), { value: timeValue }));
                        if (_this.props.onSelect)
                            _this.props.onSelect(timeValue);
                    }
                    else {
                        _this.setState(__assign(__assign({}, _this.state), { selectMonth: i, type: CalendarType.DATE }));
                    }
                } }), monthTitle);
        }));
    };
    TCalendar.prototype.showYearInRange = function () {
        var _this = this;
        return react_1.default.createElement(react_1.default.Fragment, null, Array.from({ length: 12 }).map(function (_, i) {
            var _a, _b;
            var firstYearInTable = _this.state.selectYear - ((_this.state.selectYear - exports.startDate.getFullYear()) % 12);
            var yearNumber = i + firstYearInTable;
            var additionProps = {};
            var style = {};
            var selected = false;
            if (yearNumber === exports.today.getFullYear()) {
                style = { borderColor: 'var(--infor-main-color)' };
            }
            else if (yearNumber < (((_a = _this.props.min) !== null && _a !== void 0 ? _a : exports.startDate).getFullYear()) || yearNumber > (((_b = _this.props.max) !== null && _b !== void 0 ? _b : exports.endDate).getFullYear())) {
                additionProps = { 'in-range': 'false' };
            }
            if (yearNumber === _this.state.value.getFullYear()) {
                selected = true;
            }
            return react_1.default.createElement("button", __assign({ type: "button", key: yearNumber.toString(), className: "".concat(calendar_module_css_1.default['year-picker-circle'], " year-picker-circle body-3 row ").concat(selected ? calendar_module_css_1.default['selected'] : ''), style: style }, additionProps, { onClick: function () {
                    if (_this.props.type === CalendarType.YEAR) {
                        _this.setState(__assign(__assign({}, _this.state), { value: new Date(yearNumber) }));
                        if (_this.props.onSelect)
                            _this.props.onSelect(new Date(yearNumber));
                    }
                    else {
                        _this.setState(__assign(__assign({}, _this.state), { type: CalendarType.MONTH, selectYear: yearNumber }));
                    }
                } }), yearNumber);
        }));
    };
    TCalendar.prototype.getTitle = function () {
        switch (this.state.type) {
            case CalendarType.YEAR:
                var firstYearInTable = this.state.selectYear - ((this.state.selectYear - exports.startDate.getFullYear()) % 12);
                return "".concat(firstYearInTable, "-").concat(firstYearInTable + 11);
            case CalendarType.MONTH:
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
        var t = this.props.t;
        return react_1.default.createElement("div", { id: this.props.id, className: "row ".concat(calendar_module_css_1.default['calendar-container'], " ").concat(this.props.className), style: this.props.style },
            this.props.showSidebar ? react_1.default.createElement("div", { className: "".concat(calendar_module_css_1.default['calendar-sidebar-options'], " col") },
                react_1.default.createElement("button", { type: "button", onClick: function () { }, className: "label-4 ".concat(calendar_module_css_1.default['calendar-sidebar-option-buttton']) }, t("yesterday")),
                react_1.default.createElement("button", { type: "button", className: "label-4 ".concat(calendar_module_css_1.default['calendar-sidebar-option-buttton']) }, t("lastWeek")),
                react_1.default.createElement("button", { type: "button", className: "label-4 ".concat(calendar_module_css_1.default['calendar-sidebar-option-buttton']) }, t("lastMonth")),
                react_1.default.createElement("button", { type: "button", className: "label-4 ".concat(calendar_module_css_1.default['calendar-sidebar-option-buttton']) }, t("lastYear"))) : null,
            react_1.default.createElement("div", { className: "".concat(calendar_module_css_1.default['calendar-body'], " col") },
                react_1.default.createElement("div", { className: "row", style: { alignItems: 'start' } },
                    react_1.default.createElement("div", { className: "".concat(calendar_module_css_1.default['picker-date-container'], " col") },
                        react_1.default.createElement("div", { className: "".concat(calendar_module_css_1.default['picker-date-header'], " row") },
                            react_1.default.createElement("button", { type: 'button', onClick: function () {
                                    switch (_this.state.type) {
                                        case CalendarType.YEAR:
                                            if (_this.state.selectYear - 20 < exports.startDate.getFullYear()) {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: exports.startDate.getFullYear() }));
                                            }
                                            else {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear - 20 }));
                                            }
                                            break;
                                        case CalendarType.MONTH:
                                            if (_this.state.selectYear - 10 < exports.startDate.getFullYear()) {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: exports.startDate.getFullYear() }));
                                            }
                                            else {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear - 10 }));
                                            }
                                            break;
                                        default:
                                            _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear - 1 }));
                                            break;
                                    }
                                } },
                                react_1.default.createElement(winicon_1.Winicon, { src: "fill/arrows/double-arrow-left", size: '1.4rem' })),
                            react_1.default.createElement("button", { type: 'button', onClick: function () {
                                    switch (_this.state.type) {
                                        case CalendarType.YEAR:
                                            if (_this.state.selectYear - 10 < exports.startDate.getFullYear()) {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: exports.startDate.getFullYear() }));
                                            }
                                            else {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear - 10 }));
                                            }
                                            break;
                                        case CalendarType.MONTH:
                                            if (_this.state.selectYear - 1 >= exports.startDate.getFullYear()) {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear - 1 }));
                                            }
                                            break;
                                        default:
                                            var newDataVl = new Date(_this.state.selectYear, _this.state.selectMonth - 1, 1);
                                            _this.setState(__assign(__assign({}, _this.state), { selectMonth: newDataVl.getMonth(), selectYear: newDataVl.getFullYear() }));
                                            break;
                                    }
                                } },
                                react_1.default.createElement(winicon_1.Winicon, { src: "fill/arrows/left-arrow", size: '1.4rem' })),
                            react_1.default.createElement("span", { className: "heading-7", onClick: function () {
                                    if (_this.state.type !== CalendarType.YEAR)
                                        _this.setState(__assign(__assign({}, _this.state), { type: _this.state.type === CalendarType.DATE ? CalendarType.MONTH : CalendarType.YEAR }));
                                } }, this.getTitle()),
                            react_1.default.createElement("button", { type: 'button', onClick: function () {
                                    switch (_this.state.type) {
                                        case CalendarType.YEAR:
                                            if (_this.state.selectYear + 10 > exports.endDate.getFullYear()) {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: exports.endDate.getFullYear() }));
                                            }
                                            else {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear + 10 }));
                                            }
                                            break;
                                        case CalendarType.MONTH:
                                            if (_this.state.selectYear + 1 <= exports.endDate.getFullYear()) {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear + 1 }));
                                            }
                                            break;
                                        default:
                                            var newDataVl = new Date(_this.state.selectYear, _this.state.selectMonth + 1, 1);
                                            _this.setState(__assign(__assign({}, _this.state), { selectMonth: newDataVl.getMonth(), selectYear: newDataVl.getFullYear() }));
                                            break;
                                    }
                                } },
                                react_1.default.createElement(winicon_1.Winicon, { src: "fill/arrows/right-arrow", size: '1.4rem' })),
                            react_1.default.createElement("button", { type: 'button', onClick: function () {
                                    switch (_this.state.type) {
                                        case CalendarType.YEAR:
                                            if (_this.state.selectYear + 20 > exports.endDate.getFullYear()) {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: exports.endDate.getFullYear() }));
                                            }
                                            else {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear + 20 }));
                                            }
                                            break;
                                        case CalendarType.MONTH:
                                            if (_this.state.selectYear + 10 < exports.endDate.getFullYear()) {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: exports.endDate.getFullYear() }));
                                            }
                                            else {
                                                _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear + 10 }));
                                            }
                                            break;
                                        default:
                                            _this.setState(__assign(__assign({}, _this.state), { selectYear: _this.state.selectYear + 1 }));
                                            break;
                                    }
                                } },
                                react_1.default.createElement(winicon_1.Winicon, { src: "fill/arrows/double-arrow-right", size: '1.4rem' }))),
                        react_1.default.createElement("div", { className: "".concat(calendar_module_css_1.default['picker-date-body'], " row") }, this.state.type === CalendarType.YEAR ? this.showYearInRange() : this.state.type === CalendarType.MONTH ? this.showMonthInYear() : this.showDateInMonth())),
                    this.props.type === CalendarType.DATETIME ? react_1.default.createElement("div", { className: "".concat(calendar_module_css_1.default['picker-time-container'], " col") },
                        react_1.default.createElement("div", { className: "heading-7" },
                            this.state.selectHours < 10 ? "0".concat(this.state.selectHours) : this.state.selectHours,
                            ":",
                            this.state.selectMinutes < 10 ? "0".concat(this.state.selectMinutes) : this.state.selectMinutes,
                            ":",
                            this.state.selectSeconds < 10 ? "0".concat(this.state.selectSeconds) : this.state.selectSeconds),
                        react_1.default.createElement("div", { className: "row", style: { alignItems: 'start', flex: 1, height: '100%' } },
                            react_1.default.createElement("div", { className: "".concat(calendar_module_css_1.default['scroll-picker-hours'], " scroll-picker-hours col") }, Array.from({ length: 24 }).map(function (_, i) { return react_1.default.createElement("button", { type: "button", onClick: function () {
                                    var newValue = _this.state.value;
                                    newValue.setHours(i);
                                    _this.setState(__assign(__assign({}, _this.state), { selectHours: i, value: newValue }));
                                    if (_this.props.onSelect)
                                        _this.props.onSelect(newValue);
                                }, key: "hours-".concat(i), className: "label-4 ".concat(_this.state.selectHours === (i) ? calendar_module_css_1.default['selected'] : '') }, i < 10 ? "0".concat(i) : i); })),
                            react_1.default.createElement("div", { className: "".concat(calendar_module_css_1.default['scroll-picker-minutes'], " scroll-picker-minutes col") }, Array.from({ length: 60 }).map(function (_, i) { return react_1.default.createElement("button", { type: "button", onClick: function () {
                                    var newValue = _this.state.value;
                                    newValue.setMinutes(i);
                                    _this.setState(__assign(__assign({}, _this.state), { selectMinutes: i, value: newValue }));
                                    if (_this.props.onSelect)
                                        _this.props.onSelect(newValue);
                                }, key: "hours-".concat(i), className: "label-4 ".concat(_this.state.selectMinutes === (i) ? calendar_module_css_1.default['selected'] : '') }, i < 10 ? "0".concat(i) : i); })),
                            react_1.default.createElement("div", { className: "".concat(calendar_module_css_1.default['scroll-picker-seconds'], " scroll-picker-seconds col") }, Array.from({ length: 60 }).map(function (_, i) { return react_1.default.createElement("button", { type: "button", onClick: function () {
                                    var newValue = _this.state.value;
                                    newValue.setSeconds(i);
                                    _this.setState(__assign(__assign({}, _this.state), { selectSeconds: i, value: newValue }));
                                    if (_this.props.onSelect)
                                        _this.props.onSelect(newValue);
                                }, key: "hours-".concat(i), className: "label-4 ".concat(_this.state.selectSeconds === (i) ? calendar_module_css_1.default['selected'] : '') }, i < 10 ? "0".concat(i) : i); })))) : null),
                this.props.footer));
    };
    return TCalendar;
}(react_1.default.Component));
exports.Calendar = (0, react_i18next_1.withTranslation)()(TCalendar);
