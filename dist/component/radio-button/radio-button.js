"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioButton = void 0;
const react_1 = __importDefault(require("react"));
const radio_button_module_css_1 = __importDefault(require("./radio-button.module.css"));
class RadioButton extends react_1.default.Component {
    render() {
        var _a, _b, _c;
        let convertStyle = {
            '--off-color': (_a = this.props.offColor) !== null && _a !== void 0 ? _a : 'var(--neutral-bolder-border-color)',
            '--active-color': (_b = this.props.activeColor) !== null && _b !== void 0 ? _b : 'var(--primary-main-color)',
            '--size': this.props.size ? (typeof this.props.size === 'number') ? `${this.props.size}px` : this.props.size : '20px'
        };
        if (this.props.style) {
            delete this.props.style.width;
            delete this.props.style.minWidth;
            delete this.props.style.maxWidth;
            delete this.props.style.height;
            delete this.props.style.minHeight;
            delete this.props.style.maxHeight;
            convertStyle = Object.assign(Object.assign({}, this.props.style), convertStyle);
        }
        return react_1.default.createElement("label", { id: this.props.id, className: `row ${radio_button_module_css_1.default['radio-btn-container']} ${(_c = this.props.className) !== null && _c !== void 0 ? _c : ''}`, style: convertStyle },
            this.props.register ?
                react_1.default.createElement("input", Object.assign({}, this.props.register, { type: "radio", value: this.props.value, disabled: this.props.disabled })) :
                react_1.default.createElement("input", { type: "radio", name: this.props.name, value: this.props.value, defaultChecked: this.props.defaultChecked, disabled: this.props.disabled, onChange: this.props.onChange }),
            react_1.default.createElement("span", { className: radio_button_module_css_1.default['checkmark'] }));
    }
}
exports.RadioButton = RadioButton;
