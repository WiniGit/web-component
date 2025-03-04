"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimePicker = DateTimePicker;
const date_time_picker_module_css_1 = __importDefault(require("./date-time-picker.module.css"));
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const react_i18next_1 = require("react-i18next");
const date_fns_1 = require("date-fns");
const react_2 = __importDefault(require("react"));
const popup_1 = require("../popup/popup");
const text_1 = require("../text/text");
const winicon_1 = require("../wini-icon/winicon");
const text_field_1 = require("../text-field/text-field");
const calendar_1 = require("../calendar/calendar");
const button_1 = require("../button/button");
const checkbox_1 = require("../checkbox/checkbox");
const today = new Date();
const startDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
const endDate = new Date(today.getFullYear() + 100, today.getMonth(), today.getDate());
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
                    return '';
            }
        }).join(":");
        return dateConvert + " " + timeConvert;
    }
    return dateConvert;
};
const stringToDate = (_date, _format = "dd/mm/yyyy", _delimiter = "/") => {
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
const inRangeTime = (date, startDate, endDate) => ((0, date_fns_1.differenceInCalendarDays)(date, startDate) > -1 && (0, date_fns_1.differenceInCalendarDays)(endDate, date) > -1);
function DateTimePicker(props) {
    const popupRef = (0, react_1.useRef)(null);
    const inputRef = (0, react_1.useRef)(null);
    const [value, setValue] = (0, react_1.useState)();
    const txtValue = (0, react_1.useMemo)(() => {
        var _a, _b, _c, _d, _e, _f;
        if (!value)
            return react_2.default.createElement(text_1.Text, { className: date_time_picker_module_css_1.default["value"], style: { color: "var(--neutral-text-subtitle-color)" } }, (_a = props.placeholder) !== null && _a !== void 0 ? _a : "");
        if (value instanceof Date)
            return react_2.default.createElement(text_1.Text, { className: date_time_picker_module_css_1.default["value"] }, dateToString(value, `dd/mm/yyyy${((_b = props.pickerType) === null || _b === void 0 ? void 0 : _b.includes("time")) ? " hh:mm" : ""}`));
        else
            return react_2.default.createElement(react_2.default.Fragment, null,
                react_2.default.createElement(text_1.Text, { className: date_time_picker_module_css_1.default["value"], style: { flex: "none", width: "fit-content" } },
                    dateToString((_c = value.start) !== null && _c !== void 0 ? _c : new Date(), `dd/mm/yyyy${(((_d = props.pickerType) === null || _d === void 0 ? void 0 : _d.includes("time")) || props.pickerType === "auto") ? " hh:mm" : ""}`),
                    " - ",
                    dateToString((_e = value.end) !== null && _e !== void 0 ? _e : new Date(), `dd/mm/yyyy${(((_f = props.pickerType) === null || _f === void 0 ? void 0 : _f.includes("time")) || props.pickerType === "auto") ? " hh:mm" : ""}`)),
                value.repeatData && react_2.default.createElement(winicon_1.Winicon, { src: "outline/arrows/loop-2", size: "1.2rem" }));
    }, [value]);
    (0, react_1.useEffect)(() => {
        if (inputRef.current) {
            if (value && value instanceof Date)
                inputRef.current.value = dateToString(value, `dd/mm/yyyy`);
            else
                inputRef.current.value = "";
        }
    }, [value, inputRef.current]);
    (0, react_1.useEffect)(() => {
        switch (props.pickerType) {
            case "date":
            case "datetime":
                setValue(props.value);
                break;
            default:
                setValue((!props.value || !props.endValue) ? undefined : { start: props.value, end: props.endValue, repeatData: props.pickerType === "auto" ? props.repeatValue : undefined });
                break;
        }
    }, [props.value, props.endValue, props.repeatValue, props.pickerType]);
    const showCalendar = (rect) => {
        (0, popup_1.showPopup)({
            ref: popupRef,
            clickOverlayClosePopup: true,
            content: react_2.default.createElement(PopupDateTimePicker, { ref: popupRef, max: props.max, min: props.min, value: value instanceof Date ? value : value === null || value === void 0 ? void 0 : value.start, endValue: value instanceof Date ? undefined : value === null || value === void 0 ? void 0 : value.end, pickerType: props.pickerType, enableRepeat: props.enableRepeat, style: { top: rect.bottom + 2, left: rect.left + 16 }, onApply: (ev) => {
                    setValue(ev);
                    (0, popup_1.closePopup)(popupRef);
                    if (props.onChange)
                        props.onChange(ev);
                    if (inputRef.current)
                        inputRef.current.focus();
                } })
        });
    };
    const returnUI = () => {
        var _a, _b, _c, _d, _e, _f, _g;
        switch (props.pickerType) {
            case "date":
                return react_2.default.createElement("div", { id: props.id, className: `row ${date_time_picker_module_css_1.default["date-time-picker"]} ${(_a = props.className) !== null && _a !== void 0 ? _a : "body-3"} ${((_b = props.helperText) === null || _b === void 0 ? void 0 : _b.length) ? date_time_picker_module_css_1.default['helper-text'] : ""}`, "helper-text": props.helperText, style: props.style ? Object.assign(Object.assign({}, { '--helper-text-color': (_c = props.helperTextColor) !== null && _c !== void 0 ? _c : '#e14337' }), props.style) : { '--helper-text-color': (_d = props.helperTextColor) !== null && _d !== void 0 ? _d : '#e14337' }, onClick: (ev) => {
                        const rect = ev.target.closest("div").getBoundingClientRect();
                        showCalendar(rect);
                    } }, (_e = props.prefix) !== null && _e !== void 0 ? _e : react_2.default.createElement(winicon_1.Winicon, { className: date_time_picker_module_css_1.default["prefix-icon"], src: "outline/user interface/calendar-date", size: "1.2rem" }),
                    react_2.default.createElement("input", { className: date_time_picker_module_css_1.default["value"], ref: inputRef, autoComplete: 'off', disabled: props.disabled, placeholder: props.placeholder, readOnly: props.pickOnly, onKeyDown: (ev) => {
                            switch (ev.key.toLowerCase()) {
                                case "enter":
                                    ev.target.blur();
                                    break;
                                default:
                                    break;
                            }
                        }, onBlur: props.pickOnly ? undefined : (ev) => {
                            var _a, _b, _c, _d, _e, _f;
                            const inputValue = ev.target.value.trim();
                            let dateValue = undefined;
                            if (inputValue.match(/[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g)) {
                                dateValue = stringToDate(inputValue, 'dd/MM/yyyy', '/');
                                if (inRangeTime(dateValue, (_a = props.min) !== null && _a !== void 0 ? _a : startDate, (_b = props.min) !== null && _b !== void 0 ? _b : endDate)) {
                                }
                                else if ((0, date_fns_1.differenceInCalendarDays)((_c = props.min) !== null && _c !== void 0 ? _c : startDate, dateValue) > -1) {
                                    dateValue = (_d = props.min) !== null && _d !== void 0 ? _d : startDate;
                                }
                                else if ((0, date_fns_1.differenceInCalendarDays)(dateValue, (_e = props.min) !== null && _e !== void 0 ? _e : endDate) > -1) {
                                    dateValue = (_f = props.max) !== null && _f !== void 0 ? _f : endDate;
                                }
                                else {
                                    dateValue = undefined;
                                }
                            }
                            setValue(dateValue);
                            if (props.onChange)
                                props.onChange(dateValue);
                        } }));
            default:
                return react_2.default.createElement("button", { id: props.id, type: "button", disabled: props.disabled, className: `row ${date_time_picker_module_css_1.default["date-time-picker"]} ${(_f = props.className) !== null && _f !== void 0 ? _f : "body-3"}`, style: props.style, onClick: (ev) => {
                        const rect = ev.target.closest("button").getBoundingClientRect();
                        showCalendar(rect);
                    } }, (_g = props.prefix) !== null && _g !== void 0 ? _g : react_2.default.createElement(winicon_1.Winicon, { className: date_time_picker_module_css_1.default["prefix-icon"], src: "outline/user interface/calendar-date", size: "1.2rem" }),
                    txtValue);
        }
    };
    return react_2.default.createElement(react_2.default.Fragment, null,
        react_2.default.createElement(popup_1.Popup, { ref: popupRef }),
        returnUI());
}
const PopupDateTimePicker = (0, react_1.forwardRef)(function PopupDateTimePicker({ value, style, endValue, repeatValue, onApply, pickerType = "auto", enableRepeat = false, min, max }, ref) {
    const methods = (0, react_hook_form_1.useForm)({ shouldFocusError: false });
    const [selectTime, setSelectTime] = (0, react_1.useState)(false);
    const [isRepeat, setIsRepeat] = (0, react_1.useState)(false);
    const today = new Date();
    const [repeatData, setRepeatData] = (0, react_1.useState)({ type: 1, value: ["everyday"] }); // 1: daily, 2: weekly, 3: monthly
    const popupRef = (0, react_1.useRef)(null);
    const inputStartRef = (0, react_1.useRef)(null);
    const inputEndRef = (0, react_1.useRef)(null);
    const { t } = (0, react_i18next_1.useTranslation)();
    const regexDate = /[0-9]{1,2}(\/|-)[0-9]{1,2}(\/|-)[0-9]{4}/g;
    const regexTime = /^(?:[01]\d|2[0-3]):[0-5]\d(?:[:][0-5]\d)?$/g;
    (0, react_1.useEffect)(() => {
        if (repeatValue && enableRepeat) {
            setIsRepeat(true);
            setRepeatData(repeatValue);
        }
        else
            setIsRepeat(false);
    }, [repeatValue]);
    (0, react_1.useEffect)(() => {
        if (selectTime && pickerType !== "auto" && !pickerType.includes("time")) {
            setSelectTime(false);
            methods.setValue('time-start', null);
            methods.setValue('time-end', null);
        }
        else if (!selectTime && pickerType.includes("time")) {
            setSelectTime(true);
        }
    }, [pickerType]);
    const initStartValue = () => {
        if (value) {
            const initStart = new Date(value);
            methods.setValue('date-start', initStart);
            inputStartRef.current.getInput().value = dateToString(initStart);
            if (pickerType.includes("time") || initStart.getSeconds() === 1) {
                setSelectTime(true);
                methods.setValue('time-start', `${initStart.getHours() < 9 ? `0${initStart.getHours()}` : initStart.getHours()}:${initStart.getMinutes() < 9 ? `0${initStart.getMinutes()}` : initStart.getMinutes()}`);
            }
        }
        else
            inputStartRef.current.getInput().value = "";
    };
    const initEndValue = () => {
        if (((pickerType === null || pickerType === void 0 ? void 0 : pickerType.includes("range")) || pickerType === "auto") && inputEndRef.current) {
            if (endValue) {
                const initEnd = new Date(endValue);
                methods.setValue('date-end', initEnd);
                inputEndRef.current.getInput().value = dateToString(initEnd);
                if (pickerType.includes("time") || initEnd.getSeconds() === 59)
                    methods.setValue('time-end', `${initEnd.getHours() < 9 ? `0${initEnd.getHours()}` : initEnd.getHours()}:${initEnd.getMinutes() < 9 ? `0${initEnd.getMinutes()}` : initEnd.getMinutes()}`);
            }
            else
                inputEndRef.current.getInput().value = "";
        }
    };
    (0, react_1.useEffect)(() => {
        if (value && inputStartRef.current)
            initStartValue();
    }, [value, inputStartRef]);
    (0, react_1.useEffect)(() => {
        initEndValue();
    }, [endValue, inputEndRef, pickerType]);
    return react_2.default.createElement("div", { className: "col", style: Object.assign({ width: "31.2rem" }, style) },
        react_2.default.createElement(popup_1.Popup, { ref: popupRef }),
        react_2.default.createElement(calendar_1.Calendar, { min: min, max: max, range: pickerType.includes("range") || pickerType === "auto", value: pickerType === "date" || pickerType === "datetime" ? methods.watch('date-start') : (methods.watch('date-start') && methods.watch('date-end') ? { sTime: methods.watch('date-start'), eTime: methods.watch('date-end') } : undefined), header: pickerType !== "date" && react_2.default.createElement("div", { className: 'row', style: { flexWrap: "wrap", gap: "0.8rem 1.2rem", padding: "1.6rem", borderBottom: "var(--neutral-main-border)" } },
                react_2.default.createElement(text_field_1.TextField, { ref: inputStartRef, autoComplete: "off", className: 'col12 body-3', style: { "--gutter": "1.2rem", padding: "0.4rem 1.2rem" }, placeholder: pickerType.includes("range") || pickerType === "auto" ? t("start-date") : "dd/mm/yyyy", onComplete: (ev) => ev.target.blur(), onBlur: (ev) => {
                        const inputValue = ev.target.value;
                        if (regexDate.test(inputValue)) {
                            const dateValue = stringToDate(inputValue, 'dd/mm/yyyy', '/');
                            if ((pickerType.includes("range") || pickerType === "auto") && (0, date_fns_1.differenceInCalendarDays)(methods.getValues('date-end'), dateValue) < 0) {
                                methods.setValue('date-end', dateValue);
                                inputEndRef.current.getInput().value = dateToString(dateValue);
                            }
                            methods.setValue('date-start', dateValue);
                        }
                        else
                            ev.target.value = methods.getValues('date-start') ? dateToString(methods.getValues('date-start')) : "";
                    } }),
                (pickerType.includes("range") || pickerType === "auto") &&
                    react_2.default.createElement(text_field_1.TextField, { ref: inputEndRef, autoComplete: "off", className: 'col12 body-3', style: { "--gutter": "1.2rem", padding: "0.4rem 1.2rem" }, placeholder: t("end-date"), onComplete: (ev) => ev.target.blur(), onBlur: (ev) => {
                            const inputValue = ev.target.value;
                            if (regexDate.test(inputValue)) {
                                const dateValue = stringToDate(inputValue, 'dd/mm/yyyy', '/');
                                if ((0, date_fns_1.differenceInCalendarDays)(dateValue, methods.getValues('date-start')) < 0) {
                                    methods.setValue('date-start', dateValue);
                                    inputStartRef.current.getInput().value = dateToString(dateValue);
                                }
                                methods.setValue('date-end', dateValue);
                            }
                            else
                                ev.target.value = methods.getValues('date-end') ? dateToString(methods.getValues('date-end')) : "";
                        } }),
                selectTime && react_2.default.createElement(react_2.default.Fragment, null,
                    react_2.default.createElement(text_field_1.TextField, { autoComplete: "off", name: 'time-start', style: { "--gutter": "1.2rem", padding: "0.4rem 1.2rem" }, onComplete: (ev) => { ev.target.blur(); }, register: methods.register("time-start", {
                            onChange: (ev) => ev.target.value = ev.target.value.trim(),
                            onBlur: (ev) => {
                                if (regexTime.test(ev.target.value)) {
                                    methods.setValue('time-start', ev.target.value);
                                }
                                else
                                    ev.target.value = "";
                            }
                        }), className: 'col12 body-3', placeholder: "hh:mm", onFocus: (ev) => {
                            const rect = ev.target.closest("div").getBoundingClientRect();
                            (0, popup_1.showPopup)({
                                ref: popupRef,
                                clickOverlayClosePopup: true,
                                content: react_2.default.createElement("div", { className: `col ${date_time_picker_module_css_1.default['popup-actions']}`, style: { maxHeight: "24rem", top: rect.bottom + 2, right: document.body.offsetWidth - rect.right, width: rect.width, overflow: "hidden auto", border: "var(--neutral-main-border)" } }, Array.from({ length: 48 }).map((_, i) => {
                                    if (i % 2 === 0)
                                        var timeValue = `${(i / 2) < 9 ? `0${i / 2}` : (i / 2)}:00`;
                                    else
                                        timeValue = `${((i - 1) / 2) < 9 ? `0${(i - 1) / 2}` : ((i - 1) / 2)}:30`;
                                    return react_2.default.createElement("button", { key: "time-" + i, type: "button", className: "row", onClick: () => {
                                            methods.setValue("time-start", timeValue);
                                            (0, popup_1.closePopup)(popupRef);
                                        } },
                                        react_2.default.createElement(text_1.Text, { className: "body-3" }, timeValue));
                                }))
                            });
                        } }),
                    (pickerType.includes("range") || pickerType === "auto") &&
                        react_2.default.createElement(text_field_1.TextField, { autoComplete: "off", name: 'time-end', style: { "--gutter": "1.2rem", padding: "0.4rem 1.2rem" }, onComplete: (ev) => { ev.target.blur(); }, register: methods.register("time-end", {
                                onChange: (ev) => ev.target.value = ev.target.value.trim(),
                                onBlur: (ev) => {
                                    if (regexTime.test(ev.target.value)) {
                                        methods.setValue('time-end', ev.target.value);
                                    }
                                    else
                                        ev.target.value = "";
                                }
                            }), className: 'col12 body-3', placeholder: "hh:mm", onFocus: (ev) => {
                                const rect = ev.target.closest("div").getBoundingClientRect();
                                (0, popup_1.showPopup)({
                                    ref: popupRef,
                                    clickOverlayClosePopup: true,
                                    content: react_2.default.createElement("div", { className: `col ${date_time_picker_module_css_1.default['popup-actions']}`, style: { maxHeight: "24rem", top: rect.bottom + 2, right: document.body.offsetWidth - rect.right, width: rect.width, overflow: "hidden auto", border: "var(--neutral-main-border)" } }, Array.from({ length: 48 }).map((_, i) => {
                                        if (i % 2 === 0)
                                            var timeValue = `${(i / 2) < 9 ? `0${i / 2}` : (i / 2)}:00`;
                                        else
                                            timeValue = `${((i - 1) / 2) < 9 ? `0${(i - 1) / 2}` : ((i - 1) / 2)}:30`;
                                        return react_2.default.createElement("button", { key: "time-" + i, type: "button", className: "row", onClick: () => {
                                                methods.setValue("time-end", timeValue);
                                                (0, popup_1.closePopup)(popupRef);
                                            } },
                                            react_2.default.createElement(text_1.Text, { className: "body-3" }, timeValue));
                                    }))
                                });
                            } }))), footer: pickerType !== "date" && react_2.default.createElement(react_2.default.Fragment, null,
                isRepeat && react_2.default.createElement("div", { className: 'col', style: { borderTop: "var(--neutral-main-border)" } },
                    react_2.default.createElement("div", { className: 'row', style: { gap: 4, padding: "1.2rem 1.6rem" } },
                        react_2.default.createElement(text_1.Text, { className: 'heading-8', style: { flex: 1 } }, "L\u1EB7p l\u1EA1i"),
                        react_2.default.createElement(button_1.Button, { style: { padding: 0 }, label: (() => {
                                switch (repeatData.type) {
                                    case 1:
                                        return t("daily");
                                    case 2:
                                        return t("weekly");
                                    case 3:
                                        return t("monthly");
                                    default:
                                        return "";
                                }
                            })(), suffix: react_2.default.createElement(winicon_1.Winicon, { src: 'outline/arrows/down-arrow', size: "1.4rem", style: { padding: "0.2rem" } }), onClick: (ev) => {
                                const rect = ev.target.closest("button").getBoundingClientRect();
                                (0, popup_1.showPopup)({
                                    ref: popupRef,
                                    clickOverlayClosePopup: true,
                                    style: { position: "absolute", top: rect.bottom + 2, left: rect.x + 8 },
                                    body: react_2.default.createElement("div", { className: "col popup-actions" }, Array.from({ length: 3 }).map((_, num) => {
                                        let label = "";
                                        switch (num) {
                                            case 0:
                                                label = t("daily");
                                                break;
                                            case 1:
                                                label = t("weekly");
                                                break;
                                            case 2:
                                                label = t("monthly");
                                                break;
                                            default:
                                                break;
                                        }
                                        return react_2.default.createElement("button", { key: "tStatus-" + num, type: "button", className: "row", onClick: () => {
                                                let newValue = ["everyday"];
                                                switch (num) {
                                                    case 0:
                                                        newValue = ["everyday"];
                                                        break;
                                                    case 1:
                                                        newValue = today.getDay();
                                                        break;
                                                    case 2:
                                                        newValue = today.getDate();
                                                        break;
                                                    default:
                                                        break;
                                                }
                                                setRepeatData({ type: (num + 1), value: [newValue] });
                                                (0, popup_1.closePopup)(popupRef);
                                            } },
                                            react_2.default.createElement(text_1.Text, { className: "button-text-3" }, label));
                                    }))
                                });
                            } })),
                    (() => {
                        switch (repeatData.type) {
                            case 2:
                                return react_2.default.createElement(react_2.default.Fragment, null,
                                    react_2.default.createElement(text_1.Text, { className: 'heading-8', style: { padding: "0 1.6rem" } }, t("on") + " " + t("date").toLowerCase()),
                                    react_2.default.createElement("div", { className: 'row', style: { justifyContent: "space-between", padding: "0.4rem 1.6rem" } }, Array.from({ length: 7 }).map((_, i) => {
                                        switch (i) {
                                            case 0:
                                                var weekdayTitle = t("su");
                                                break;
                                            case 1:
                                                weekdayTitle = t("mo");
                                                break;
                                            case 2:
                                                weekdayTitle = t("tu");
                                                break;
                                            case 3:
                                                weekdayTitle = t("we");
                                                break;
                                            case 4:
                                                weekdayTitle = t("th");
                                                break;
                                            case 5:
                                                weekdayTitle = t("fr");
                                                break;
                                            case 6:
                                                weekdayTitle = t("sa");
                                                break;
                                            default:
                                                weekdayTitle = '';
                                                break;
                                        }
                                        return react_2.default.createElement("div", { key: "weekday-" + i, className: 'col', style: { gap: 4, alignItems: "center" } },
                                            react_2.default.createElement(checkbox_1.Checkbox, { size: "1.8rem", value: repeatData.value.includes(i), disabled: repeatData.value.includes(i) && repeatData.value.length === 1, onChange: (v) => {
                                                    if (v)
                                                        setRepeatData({ type: 2, value: [...repeatData.value, i] });
                                                    else
                                                        setRepeatData({ type: 2, value: repeatData.value.filter(id => id !== i) });
                                                } }),
                                            react_2.default.createElement(text_1.Text, { className: 'placeholder-2' }, weekdayTitle));
                                    })));
                            case 3:
                                return react_2.default.createElement("div", { className: 'row', style: { justifyContent: "space-between", padding: "0.4rem 1.6rem", gap: "1.2rem" } },
                                    react_2.default.createElement(text_1.Text, { className: 'heading-8', style: { flex: 1 } }, t("on") + " " + t("date").toLowerCase()),
                                    react_2.default.createElement(button_1.Button, { style: { padding: 0 }, label: repeatData.value[0] === "last" ? t("Last") : `${repeatData.value[0]}`, suffix: react_2.default.createElement(winicon_1.Winicon, { src: 'outline/arrows/down-arrow', size: "1.4rem", style: { padding: "0.2rem" } }), onClick: (ev) => {
                                            const rect = ev.target.closest("button").getBoundingClientRect();
                                            (0, popup_1.showPopup)({
                                                ref: popupRef,
                                                clickOverlayClosePopup: true,
                                                style: { top: rect.bottom + 2, right: document.body.offsetWidth - rect.right, maxHeight: "30.4rem" },
                                                body: react_2.default.createElement("div", { className: "col popup-actions", style: { flex: 1, overflow: "hidden auto" } }, Array.from({ length: 29 }).map((_, num) => {
                                                    switch (num) {
                                                        case 28:
                                                            var label = t("Last");
                                                            break;
                                                        default:
                                                            label = `${num + 1}`;
                                                            break;
                                                    }
                                                    return react_2.default.createElement("button", { key: "date-" + num, type: "button", className: "row", onClick: () => {
                                                            setRepeatData({ type: 3, value: [num === 28 ? "last" : (num + 1)] });
                                                            (0, popup_1.closePopup)(popupRef);
                                                        } },
                                                        react_2.default.createElement(text_1.Text, { className: "button-text-3" }, label));
                                                }))
                                            });
                                        } }));
                            default:
                                return null;
                        }
                    })()),
                onApply && react_2.default.createElement("div", { className: 'row', style: { gap: "0.8rem", padding: "1.2rem 1.6rem", borderTop: "var(--neutral-main-border)" } },
                    pickerType === "auto" && react_2.default.createElement("div", { className: 'row', style: { gap: 4 } },
                        react_2.default.createElement(winicon_1.Winicon, { src: 'outline/user interface/time-alarm', size: "1.6rem", style: { padding: "0.7rem", borderRadius: "50%", backgroundColor: selectTime ? "var(--neutral-disable-background-color)" : undefined }, onClick: () => { setSelectTime(!selectTime); } }),
                        (enableRepeat || pickerType === "auto") && react_2.default.createElement(winicon_1.Winicon, { src: 'outline/arrows/loop-2', size: "1.6rem", style: { padding: "0.7rem", borderRadius: "50%", backgroundColor: isRepeat ? "var(--neutral-disable-background-color)" : undefined }, onClick: () => { setIsRepeat(!isRepeat); } })),
                    react_2.default.createElement("div", { style: { flex: 1 } }),
                    react_2.default.createElement(button_1.Button, { label: t("reset"), onClick: () => {
                            methods.setValue("date-start", null);
                            methods.setValue("date-end", null);
                            methods.setValue("time-start", null);
                            methods.setValue("time-end", null);
                            initStartValue();
                            initEndValue();
                        } }),
                    react_2.default.createElement(button_1.Button, { label: t("apply"), disabled: !methods.watch("date-start") || (!methods.watch("date-end") && (pickerType.includes("range") || pickerType === "auto")), className: `button-text-3 button-primary`, onClick: () => {
                            var _a, _b;
                            let dateStartValue = methods.getValues("date-start");
                            let timeStartValue = selectTime ? (((_a = methods.getValues("time-start")) === null || _a === void 0 ? void 0 : _a.length) ? methods.getValues("time-start") : "00:00") : "00:00";
                            dateStartValue.setHours(parseInt(timeStartValue.split(':')[0]), parseInt(timeStartValue.split(':')[1]), selectTime ? 1 : 0, 0);
                            if (pickerType.includes("range") || pickerType === "auto") {
                                var dateEndValue = methods.getValues("date-end");
                                let timeEndValue = selectTime ? (((_b = methods.getValues("time-end")) === null || _b === void 0 ? void 0 : _b.length) ? methods.getValues("time-end") : "23:59") : "23:59";
                                dateEndValue.setHours(parseInt(timeEndValue.split(':')[0]), parseInt(timeEndValue.split(':')[1]), selectTime ? 59 : 0, 0);
                            }
                            onApply(!pickerType.includes("range") && pickerType !== "auto" ? dateStartValue : { start: dateStartValue, end: dateEndValue, repeatData: isRepeat ? repeatData : undefined });
                            (0, popup_1.closePopup)(ref);
                        } }))), onSelect: (ev) => {
                if (pickerType !== "date") {
                    if (ev instanceof Date) {
                        methods.setValue('date-start', ev);
                        if (inputStartRef.current)
                            inputStartRef.current.getInput().value = dateToString(ev);
                    }
                    else {
                        methods.setValue('date-start', ev.sTime);
                        if (inputStartRef.current)
                            inputStartRef.current.getInput().value = dateToString(ev.sTime);
                        if (pickerType.includes("range") || pickerType === "auto") {
                            methods.setValue('date-end', ev.eTime);
                            if (inputEndRef.current)
                                inputEndRef.current.getInput().value = dateToString(ev.eTime);
                        }
                    }
                }
                else if (onApply) {
                    onApply(ev);
                    (0, popup_1.closePopup)(ref);
                }
            } }));
});
