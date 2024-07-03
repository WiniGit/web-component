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
        var _a, _b, _c;
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
        return react_1.default.createElement("label", { className: "checkbox-container row", style: convertStyle },
            react_1.default.createElement("input", { type: "checkbox", checked: this.state.value, disabled: this.props.disabled, onChange: function () {
                    var newValue = !_this.state.value;
                    _this.setState({ value: newValue });
                    if (_this.props.onChange)
                        _this.props.onChange(newValue);
                } }),
            react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                react_1.default.createElement("path", { d: "M6.72 11.52 L10.8 15.6 L18 7.2", fill: "none", strokeLinecap: "round", stroke: (_c = this.props.checkColor) !== null && _c !== void 0 ? _c : '#ffffff' })));
    };
    return Checkbox;
}(react_1.default.Component));
exports.Checkbox = Checkbox;
