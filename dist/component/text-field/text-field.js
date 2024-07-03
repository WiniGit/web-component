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
exports.TextField = void 0;
var react_1 = __importDefault(require("react"));
require("./text-field.css");
var TextField = /** @class */ (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextField.prototype.render = function () {
        var _a, _b, _c, _d, _e, _f;
        return react_1.default.createElement("div", { className: "text-field-container row ".concat((_a = this.props.className) !== null && _a !== void 0 ? _a : 'placeholder-2', " ").concat(((_b = this.props.helperText) === null || _b === void 0 ? void 0 : _b.length) && 'helper-text'), "helper-text": this.props.helperText, style: this.props.style ? __assign(__assign({}, { '--helper-text-color': (_c = this.props.helperTextColor) !== null && _c !== void 0 ? _c : '#e14337' }), this.props.style) : { '--helper-text-color': (_d = this.props.helperTextColor) !== null && _d !== void 0 ? _d : '#e14337' } },
            this.props.prefix,
            this.props.register ?
                react_1.default.createElement("input", __assign({}, this.props.register, { autoFocus: this.props.autoFocus, maxLength: this.props.maxLength, name: this.props.name, type: (_e = this.props.type) !== null && _e !== void 0 ? _e : 'text', placeholder: this.props.placeholder, readOnly: this.props.readOnly, disabled: this.props.disabled, onFocus: this.props.onFocus })) : react_1.default.createElement("input", { autoFocus: this.props.autoFocus, maxLength: this.props.maxLength, name: this.props.name, type: (_f = this.props.type) !== null && _f !== void 0 ? _f : 'text', defaultValue: this.props.defaultValue, value: this.props.value, placeholder: this.props.placeholder, readOnly: this.props.readOnly, disabled: this.props.disabled, onChange: this.props.onChange, onFocus: this.props.onFocus, onBlur: this.props.onBlur }),
            this.props.suffix);
    };
    return TextField;
}(react_1.default.Component));
exports.TextField = TextField;
