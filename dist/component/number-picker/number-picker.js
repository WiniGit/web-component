"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberPicker = void 0;
var react_1 = __importStar(require("react"));
var number_picker_module_css_1 = __importDefault(require("./number-picker.module.css"));
var NumberPicker = function (_a) {
    var id = _a.id, value = _a.value, onChange = _a.onChange, disabled = _a.disabled, readOnly = _a.readOnly, className = _a.className, helperText = _a.helperText, helperTextColor = _a.helperTextColor, max = _a.max, min = _a.min, style = _a.style, _b = _a.type, type = _b === void 0 ? "icon-button" : _b, _c = _a.volume, volume = _c === void 0 ? 1 : _c;
    var _d = (0, react_1.useState)(0), val = _d[0], setValue = _d[1];
    var inputRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (inputRef.current) {
            setValue(value !== null && value !== void 0 ? value : 0);
            inputRef.current.value = "".concat(value !== null && value !== void 0 ? value : 0);
        }
    }, [value, inputRef]);
    return react_1.default.createElement("div", { id: id, className: "row ".concat(number_picker_module_css_1.default["number-picker-container"], " ").concat(className !== null && className !== void 0 ? className : "body-2", " ").concat((helperText === null || helperText === void 0 ? void 0 : helperText.length) && number_picker_module_css_1.default['helper-text']), "number-picker-type": type !== null && type !== void 0 ? type : "icon-button", "helper-text": helperText, style: style ? __assign(__assign({}, { '--helper-text-color': helperTextColor !== null && helperTextColor !== void 0 ? helperTextColor : '#e14337' }), style) : { '--helper-text-color': helperTextColor !== null && helperTextColor !== void 0 ? helperTextColor : '#e14337' } },
        react_1.default.createElement("div", { className: "row", onClick: function () {
                var newValue = val - volume;
                if (min === undefined || newValue >= min) {
                    if (volume % 1 === 0)
                        newValue = Math.round(newValue);
                    else
                        newValue = parseFloat(newValue.toFixed(1));
                    setValue(newValue);
                    if (inputRef.current)
                        inputRef.current.value = "".concat(newValue);
                    if (onChange)
                        onChange(newValue);
                }
            } },
            react_1.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.3335 7.93907C1.3335 7.60435 1.60484 7.33301 1.93956 7.33301H14.0608C14.3955 7.33301 14.6668 7.60435 14.6668 7.93907C14.6668 8.27379 14.3955 8.54513 14.0608 8.54513H1.93956C1.60484 8.54513 1.3335 8.27379 1.3335 7.93907Z" }))),
        react_1.default.createElement("input", { ref: inputRef, readOnly: readOnly, disabled: disabled, onKeyDown: function (ev) {
                switch (ev.key.toLowerCase()) {
                    case "enter":
                        ev.target.blur();
                        break;
                    default:
                        break;
                }
            }, onFocus: function (ev) { ev.target.select(); }, onBlur: function (ev) {
                var newValue = volume % 1 === 0 ? parseInt(ev.target.value.trim()) : parseFloat(ev.target.value.trim());
                if (isNaN(newValue))
                    ev.target.value = "".concat(val);
                else {
                    if (volume % 1 === 0)
                        newValue = Math.round(newValue);
                    else
                        newValue = parseFloat(newValue.toFixed(1));
                    if (min !== undefined && newValue < min) {
                        setValue(min);
                        if (inputRef.current)
                            inputRef.current.value = "".concat(min);
                        if (onChange)
                            onChange(min);
                    }
                    else if (max !== undefined && newValue > max) {
                        setValue(max);
                        if (inputRef.current)
                            inputRef.current.value = "".concat(max);
                        if (onChange)
                            onChange(max);
                    }
                    else {
                        setValue(newValue);
                        if (inputRef.current)
                            inputRef.current.value = "".concat(newValue);
                        if (onChange)
                            onChange(newValue);
                    }
                }
            } }),
        react_1.default.createElement("div", { className: "row", onClick: function () {
                var newValue = val + volume;
                if (max === undefined || newValue <= max) {
                    if (volume % 1 === 0)
                        newValue = Math.round(newValue);
                    else
                        newValue = parseFloat(newValue.toFixed(1));
                    setValue(newValue);
                    if (inputRef.current)
                        inputRef.current.value = "".concat(newValue);
                    if (onChange)
                        onChange(newValue);
                }
            } },
            react_1.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                react_1.default.createElement("path", { d: "M8.60622 1.93907C8.60622 1.60435 8.33488 1.33301 8.00016 1.33301C7.66544 1.33301 7.3941 1.60435 7.3941 1.93907V7.39361H1.93956C1.60484 7.39361 1.3335 7.66496 1.3335 7.99967C1.3335 8.33439 1.60484 8.60574 1.93956 8.60574H7.3941V14.0603C7.3941 14.395 7.66544 14.6663 8.00016 14.6663C8.33488 14.6663 8.60622 14.395 8.60622 14.0603V8.60574H14.0608C14.3955 8.60574 14.6668 8.33439 14.6668 7.99967C14.6668 7.66496 14.3955 7.39361 14.0608 7.39361H8.60622V1.93907Z" }))));
};
exports.NumberPicker = NumberPicker;
