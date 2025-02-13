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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var react_1 = __importDefault(require("react"));
var text_1 = require("../text/text");
var button_module_css_1 = __importDefault(require("./button.module.css"));
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () {
        var _a, _b, _c;
        return this.props.linkTo ? react_1.default.createElement("a", { id: this.props.id, href: this.props.disabled ? undefined : this.props.linkTo, target: this.props.target, className: "".concat(button_module_css_1.default['button-container'], " row ").concat((_a = this.props.className) !== null && _a !== void 0 ? _a : "button-text-3"), style: this.props.style },
            this.props.prefix,
            react_1.default.createElement(text_1.Text, { maxLine: 1, className: button_module_css_1.default['button-label'] }, this.props.label),
            this.props.suffix) : react_1.default.createElement("button", { id: this.props.id, type: (_b = this.props.type) !== null && _b !== void 0 ? _b : "button", disabled: this.props.disabled, className: "".concat(button_module_css_1.default['button-container'], " row ").concat((_c = this.props.className) !== null && _c !== void 0 ? _c : "button-text-3"), style: this.props.style, onClick: this.props.onClick },
            this.props.prefix,
            react_1.default.createElement(text_1.Text, { maxLine: 1, className: button_module_css_1.default['button-label'] }, this.props.label),
            this.props.suffix);
    };
    return Button;
}(react_1.default.Component));
exports.Button = Button;
