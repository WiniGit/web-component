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
exports.Switch = void 0;
var react_1 = __importDefault(require("react"));
var switch_module_css_1 = __importDefault(require("./switch.module.css"));
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        var _this = this;
        var _a;
        _this = _super.apply(this, arguments) || this;
        _this.state = {
            value: (_a = _this.props.value) !== null && _a !== void 0 ? _a : false
        };
        return _this;
    }
    Switch.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value });
        }
    };
    Switch.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d;
        var propStyle = {
            '--off-bg': (_a = this.props.offBackground) !== null && _a !== void 0 ? _a : 'var(--neutral-main-background-color)',
            '--on-bg': (_b = this.props.onBackground) !== null && _b !== void 0 ? _b : 'var(--infor-main-color)',
            '--dot-color': (_c = this.props.dotColor) !== null && _c !== void 0 ? _c : '#ffffff',
            '--size': this.props.size ? (typeof this.props.size === 'number') ? "".concat(this.props.size, "px") : this.props.size : '2rem'
        };
        var convertStyle = __assign({ height: (_d = this.props.size) !== null && _d !== void 0 ? _d : '2rem', width: "calc(".concat(this.props.size ? (typeof this.props.size === 'number') ? "".concat(this.props.size, "px") : this.props.size : '2rem', " * 9 / 5)") }, propStyle);
        if (this.props.style) {
            delete this.props.style.width;
            delete this.props.style.minWidth;
            delete this.props.style.maxWidth;
            delete this.props.style.height;
            delete this.props.style.minHeight;
            delete this.props.style.maxHeight;
            convertStyle = __assign(__assign({}, this.props.style), convertStyle);
        }
        return react_1.default.createElement("label", { id: this.props.id, className: "".concat(switch_module_css_1.default['switch-container'], " row"), style: convertStyle },
            react_1.default.createElement("input", { type: "checkbox", checked: this.state.value, name: this.props.name, disabled: this.props.disabled, onChange: function () {
                    var newValue = !_this.state.value;
                    _this.setState({ value: newValue });
                    if (_this.props.onChange)
                        _this.props.onChange(newValue);
                } }),
            react_1.default.createElement("span", { className: switch_module_css_1.default['slider'] }));
    };
    return Switch;
}(react_1.default.Component));
exports.Switch = Switch;
