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
    __assign = Object.assign || function (t) {
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
require("./calendar.css");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var date_fns_1 = require("date-fns");
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
})(CalendarType = exports.CalendarType || (exports.CalendarType = {}));
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        _this = _super.apply(this, arguments) || this;
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
        return _this;
    }
    Calendar.prototype.showDateInMonth = function () {
        var _this = this;
        var firstDayOfMonth = new Date(this.state.selectYear, this.state.selectMonth, 1);
        return react_1.default.createElement(react_1.default.Fragment, null,
            Array.from({ length: 7 }).map(function (_, i) {
                switch (i) {
                    case 0:
                        var weekdayTitle = 'Su';
                        break;
                    case 1:
                        weekdayTitle = 'Mo';
                        break;
                    case 2:
                        weekdayTitle = 'Tu';
                        break;
                    case 3:
                        weekdayTitle = 'We';
                        break;
                    case 4:
                        weekdayTitle = 'Th';
                        break;
                    case 5:
                        weekdayTitle = 'Fr';
                        break;
                    case 6:
                        weekdayTitle = 'Sa';
                        break;
                    default:
                        weekdayTitle = '';
                        break;
                }
                return react_1.default.createElement("div", { key: 'dtwk-' + i, className: 'date-picker-circle label-4', style: { color: '#00204D99' } }, weekdayTitle);
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
                    style = __assign(__assign({}, style), { color: '#9fb0c7' });
                }
                return react_1.default.createElement("button", __assign({ type: "button", key: timeValue.toString(), className: "date-picker-circle body-3 ".concat(selected ? 'selected' : ''), style: style }, additionProps, {
                    onClick: function () {
                        _this.setState(__assign(__assign({}, _this.state), { value: timeValue }));
                        if (_this.props.onSelect)
                            _this.props.onSelect(timeValue);
                    }
                }), timeValue.getDate());
            }));
    };
    Calendar.prototype.showMonthInYear = function () {
        var _this = this;
        return react_1.default.createElement(react_1.default.Fragment, null, Array.from({ length: 12 }).map(function (_, i) {
            var _a, _b, _c;
            var monthTitle = '';
            switch (i) {
                case 0:
                    monthTitle = 'Jan';
                    break;
                case 1:
                    monthTitle = 'Feb';
                    break;
                case 2:
                    monthTitle = 'Mar';
                    break;
                case 3:
                    monthTitle = 'Apr';
                    break;
                case 4:
                    monthTitle = 'May';
                    break;
                case 5:
                    monthTitle = 'Jun';
                    break;
                case 6:
                    monthTitle = 'Jul';
                    break;
                case 7:
                    monthTitle = 'Aug';
                    break;
                case 8:
                    monthTitle = 'Sep';
                    break;
                case 9:
                    monthTitle = 'Oct';
                    break;
                case 10:
                    monthTitle = 'Nov';
                    break;
                case 11:
                    monthTitle = 'Dec';
                    break;
                default:
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
            return react_1.default.createElement("button", __assign({ type: "button", key: timeValue.toString(), className: "month-picker-circle body-3 row ".concat(selected ? 'selected' : ''), style: style }, additionProps, {
                onClick: function () {
                    if (_this.props.type === CalendarType.MONTH) {
                        _this.setState(__assign(__assign({}, _this.state), { value: timeValue }));
                        if (_this.props.onSelect)
                            _this.props.onSelect(timeValue);
                    }
                    else {
                        _this.setState(__assign(__assign({}, _this.state), { selectMonth: i, type: CalendarType.DATE }));
                    }
                }
            }), monthTitle);
        }));
    };
    Calendar.prototype.showYearInRange = function () {
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
            return react_1.default.createElement("button", __assign({ type: "button", key: yearNumber.toString(), className: "year-picker-circle body-3 row ".concat(selected ? 'selected' : ''), style: style }, additionProps, {
                onClick: function () {
                    if (_this.props.type === CalendarType.YEAR) {
                        _this.setState(__assign(__assign({}, _this.state), { value: new Date(yearNumber) }));
                        if (_this.props.onSelect)
                            _this.props.onSelect(new Date(yearNumber));
                    }
                    else {
                        _this.setState(__assign(__assign({}, _this.state), { type: CalendarType.MONTH, selectYear: yearNumber }));
                    }
                }
            }), yearNumber);
        }));
    };
    Calendar.prototype.getTitle = function () {
        switch (this.state.type) {
            case CalendarType.YEAR:
                var firstYearInTable = this.state.selectYear - ((this.state.selectYear - exports.startDate.getFullYear()) % 12);
                return "".concat(firstYearInTable, "-").concat(firstYearInTable + 11);
            case CalendarType.MONTH:
                return this.state.selectYear;
            default:
                switch (this.state.selectMonth) {
                    case 0:
                        var monthName = 'January';
                        break;
                    case 1:
                        monthName = 'February';
                        break;
                    case 2:
                        monthName = 'March';
                        break;
                    case 3:
                        monthName = 'April';
                        break;
                    case 4:
                        monthName = 'May';
                        break;
                    case 5:
                        monthName = 'June';
                        break;
                    case 6:
                        monthName = 'July';
                        break;
                    case 7:
                        monthName = 'August';
                        break;
                    case 8:
                        monthName = 'September';
                        break;
                    case 9:
                        monthName = 'October';
                        break;
                    case 10:
                        monthName = 'November';
                        break;
                    case 11:
                        monthName = 'December';
                        break;
                    default:
                        monthName = '';
                        break;
                }
                return "".concat(monthName, " ").concat(this.state.selectYear);
        }
    };
    Calendar.prototype.render = function () {
        var _this = this;
        return react_1.default.createElement("div", { id: this.props.id, className: "row calendar-container ".concat(this.props.className), style: this.props.style },
            this.props.showSidebar ? react_1.default.createElement("div", { className: "calendar-sidebar-options col" },
                react_1.default.createElement("button", { type: "button", onClick: function () { }, className: "label-4 calendar-sidebar-option-buttton" }, "Yesterday"),
                react_1.default.createElement("button", { type: "button", className: "label-4 calendar-sidebar-option-buttton" }, "Last week"),
                react_1.default.createElement("button", { type: "button", className: "label-4 calendar-sidebar-option-buttton" }, "Last month"),
                react_1.default.createElement("button", { type: "button", className: "label-4 calendar-sidebar-option-buttton" }, "Last year")) : null,
            react_1.default.createElement("div", { className: "calendar-body col" },
                react_1.default.createElement("div", { className: "row", style: { alignItems: 'start' } },
                    react_1.default.createElement("div", { className: "picker-date-container col" },
                        react_1.default.createElement("div", { className: 'picker-date-header row' },
                            react_1.default.createElement("button", {
                                type: 'button', onClick: function () {
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
                                }
                            },
                                react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faAngleDoubleLeft })),
                            react_1.default.createElement("button", {
                                type: 'button', onClick: function () {
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
                                }
                            },
                                react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faAngleLeft })),
                            react_1.default.createElement("span", {
                                className: "heading-7", onClick: function () {
                                    if (_this.state.type !== CalendarType.YEAR)
                                        _this.setState(__assign(__assign({}, _this.state), { type: _this.state.type === CalendarType.DATE ? CalendarType.MONTH : CalendarType.YEAR }));
                                }
                            }, this.getTitle()),
                            react_1.default.createElement("button", {
                                type: 'button', onClick: function () {
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
                                }
                            },
                                react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faAngleRight })),
                            react_1.default.createElement("button", {
                                type: 'button', onClick: function () {
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
                                }
                            },
                                react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faAngleDoubleRight }))),
                        react_1.default.createElement("div", { className: 'picker-date-body row' }, this.state.type === CalendarType.YEAR ? this.showYearInRange() : this.state.type === CalendarType.MONTH ? this.showMonthInYear() : this.showDateInMonth())),
                    this.props.type === CalendarType.DATETIME ? react_1.default.createElement("div", { className: "picker-time-container col" },
                        react_1.default.createElement("div", { className: "heading-7" },
                            this.state.selectHours < 10 ? "0".concat(this.state.selectHours) : this.state.selectHours,
                            ":",
                            this.state.selectMinutes < 10 ? "0".concat(this.state.selectMinutes) : this.state.selectMinutes,
                            ":",
                            this.state.selectSeconds < 10 ? "0".concat(this.state.selectSeconds) : this.state.selectSeconds),
                        react_1.default.createElement("div", { className: "row", style: { alignItems: 'start', flex: 1, height: '100%' } },
                            react_1.default.createElement("div", { className: "scroll-picker-hours col" }, Array.from({ length: 24 }).map(function (_, i) {
                                return react_1.default.createElement("button", {
                                    type: "button", onClick: function () {
                                        var newValue = _this.state.value;
                                        newValue.setHours(i);
                                        _this.setState(__assign(__assign({}, _this.state), { selectHours: i, value: newValue }));
                                        if (_this.props.onSelect)
                                            _this.props.onSelect(newValue);
                                    }, key: "hours-".concat(i), className: "label-4 ".concat(_this.state.selectHours === (i) ? 'selected' : '')
                                }, i < 10 ? "0".concat(i) : i);
                            })),
                            react_1.default.createElement("div", { className: "scroll-picker-minutes col" }, Array.from({ length: 60 }).map(function (_, i) {
                                return react_1.default.createElement("button", {
                                    type: "button", onClick: function () {
                                        var newValue = _this.state.value;
                                        newValue.setMinutes(i);
                                        _this.setState(__assign(__assign({}, _this.state), { selectMinutes: i, value: newValue }));
                                        if (_this.props.onSelect)
                                            _this.props.onSelect(newValue);
                                    }, key: "hours-".concat(i), className: "label-4 ".concat(_this.state.selectMinutes === (i) ? 'selected' : '')
                                }, i < 10 ? "0".concat(i) : i);
                            })),
                            react_1.default.createElement("div", { className: "scroll-picker-seconds col" }, Array.from({ length: 60 }).map(function (_, i) {
                                return react_1.default.createElement("button", {
                                    type: "button", onClick: function () {
                                        var newValue = _this.state.value;
                                        newValue.setSeconds(i);
                                        _this.setState(__assign(__assign({}, _this.state), { selectSeconds: i, value: newValue }));
                                        if (_this.props.onSelect)
                                            _this.props.onSelect(newValue);
                                    }, key: "hours-".concat(i), className: "label-4 ".concat(_this.state.selectSeconds === (i) ? 'selected' : '')
                                }, i < 10 ? "0".concat(i) : i);
                            })))) : null),
                this.props.footer));
    };
    return Calendar;
}(react_1.default.Component));
exports.Calendar = Calendar;
