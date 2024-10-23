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
exports.RadioButton = void 0;
var react_1 = __importDefault(require("react"));
var radio_button_module_css_1 = __importDefault(require("./radio-button.module.css"));
var RadioButton = /** @class */ (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioButton.prototype.render = function () {
        var _a, _b, _c;
        var convertStyle = {
            '--off-color': (_a = this.props.offColor) !== null && _a !== void 0 ? _a : '#ccd7e6',
            '--active-color': (_b = this.props.activeColor) !== null && _b !== void 0 ? _b : 'var(--infor-main-color)',
            '--size': this.props.size ? (typeof this.props.size === 'number') ? "".concat(this.props.size, "px") : this.props.size : '20px'
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
        return react_1.default.createElement("label", { id: this.props.id, className: "row ".concat(radio_button_module_css_1.default['radio-btn-container'], " ").concat((_c = this.props.className) !== null && _c !== void 0 ? _c : ''), style: convertStyle },
            this.props.register ?
                react_1.default.createElement("input", __assign({}, this.props.register, { type: "radio", value: this.props.value, disabled: this.props.disabled })) :
                react_1.default.createElement("input", { type: "radio", name: this.props.name, value: this.props.value, defaultChecked: this.props.defaultChecked, disabled: this.props.disabled, onChange: this.props.onChange }),
            react_1.default.createElement("span", { className: radio_button_module_css_1.default['checkmark'] }));
    };
    return RadioButton;
}(react_1.default.Component));
exports.RadioButton = RadioButton;
