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
exports.Checkbox = void 0;
var react_1 = __importDefault(require("react"));
require("./checkbox.css");
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        var _this = this;
        var _a;
        _this = _super.apply(this, arguments) || this;
        _this.state = {
            value: (_a = _this.props.value) !== null && _a !== void 0 ? _a : false
        };
        return _this;
    }
    Checkbox.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value });
        }
    };
    Checkbox.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d;
        var convertStyle = {
            width: (_a = this.props.size) !== null && _a !== void 0 ? _a : '2.4rem',
            height: (_b = this.props.size) !== null && _b !== void 0 ? _b : '2.4rem',
        };
        if (this.props.style) {
            delete this.props.style.width;
            delete this.props.style.minWidth;
            delete this.props.style.maxWidth;
            delete this.props.style.height;
            delete this.props.style.minHeight;
            delete this.props.style.maxHeight;
            convertStyle = __assign(__assign({}, this.props.style), convertStyle);
        }
        return react_1.default.createElement("label", { className: "checkbox-container row", style: convertStyle, "is-null-value": "".concat(this.state.value == undefined), onClick: this.props.onClick },
            react_1.default.createElement("input", { type: "checkbox", checked: this.state.value, disabled: this.props.disabled, onChange: function (ev) {
                    ev.stopPropagation();
                    var newValue = !_this.state.value;
                    _this.setState({ value: newValue });
                    if (_this.props.onChange)
                        _this.props.onChange(newValue);
                } }),
            react_1.default.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, this.state.value == undefined ?
                react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.79199 9.95298C4.79199 9.69148 5.00398 9.47949 5.26548 9.47949H14.7352C14.9967 9.47949 15.2087 9.69148 15.2087 9.95298C15.2087 10.2145 14.9967 10.4265 14.7352 10.4265H5.26548C5.00398 10.4265 4.79199 10.2145 4.79199 9.95298Z", fill: (_c = this.props.checkColor) !== null && _c !== void 0 ? _c : '#ffffff' }) :
                react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.07 6.49317C15.2549 6.67808 15.2549 6.97787 15.07 7.16278L8.91467 13.3181C8.72977 13.503 8.42997 13.503 8.24507 13.3181L4.93067 10.0037C4.74577 9.81878 4.74577 9.51899 4.93067 9.33408C5.11558 9.14917 5.41537 9.14917 5.60028 9.33408L8.57987 12.3137L14.4004 6.49317C14.5853 6.30827 14.8851 6.30827 15.07 6.49317Z", fill: (_d = this.props.checkColor) !== null && _d !== void 0 ? _d : '#ffffff' })));
    };
    return Checkbox;
}(react_1.default.Component));
exports.Checkbox = Checkbox;
react_1.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    react_1.default.createElement("rect", { width: "20", height: "20", rx: "4", fill: "#366AE2" }));
