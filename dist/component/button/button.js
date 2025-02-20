"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const react_1 = __importDefault(require("react"));
const text_1 = require("../text/text");
const button_module_css_1 = __importDefault(require("./button.module.css"));
class Button extends react_1.default.Component {
    render() {
        var _a, _b, _c;
        return this.props.linkTo ? react_1.default.createElement("a", { id: this.props.id, href: this.props.disabled ? undefined : this.props.linkTo, target: this.props.target, className: `${button_module_css_1.default['button-container']} row ${(_a = this.props.className) !== null && _a !== void 0 ? _a : "button-text-3"}`, style: this.props.style },
            this.props.prefix,
            react_1.default.createElement(text_1.Text, { maxLine: 1, className: button_module_css_1.default['button-label'] }, this.props.label),
            this.props.suffix) : react_1.default.createElement("button", { id: this.props.id, type: (_b = this.props.type) !== null && _b !== void 0 ? _b : "button", disabled: this.props.disabled, className: `${button_module_css_1.default['button-container']} row ${(_c = this.props.className) !== null && _c !== void 0 ? _c : "button-text-3"}`, style: this.props.style, onClick: this.props.onClick },
            this.props.prefix,
            react_1.default.createElement(text_1.Text, { maxLine: 1, className: button_module_css_1.default['button-label'] }, this.props.label),
            this.props.suffix);
    }
}
exports.Button = Button;
