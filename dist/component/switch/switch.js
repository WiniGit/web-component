"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const react_1 = __importDefault(require("react"));
const switch_module_css_1 = __importDefault(require("./switch.module.css"));
class Switch extends react_1.default.Component {
    constructor() {
        var _a;
        super(...arguments);
        this.state = {
            value: (_a = this.props.value) !== null && _a !== void 0 ? _a : false
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value });
        }
    }
    render() {
        var _a, _b, _c, _d, _e;
        const propStyle = {
            '--off-bg': (_a = this.props.offBackground) !== null && _a !== void 0 ? _a : 'var(--neutral-main-background-color)',
            '--on-bg': (_b = this.props.onBackground) !== null && _b !== void 0 ? _b : 'var(--primary-main-color)',
            '--dot-color': (_c = this.props.dotColor) !== null && _c !== void 0 ? _c : '#ffffff',
            '--size': this.props.size ? (typeof this.props.size === 'number') ? `${this.props.size}px` : this.props.size : '2rem'
        };
        let convertStyle = Object.assign({ height: (_d = this.props.size) !== null && _d !== void 0 ? _d : '2rem', width: `calc(${this.props.size ? (typeof this.props.size === 'number') ? `${this.props.size}px` : this.props.size : '2rem'} * 9 / 5)` }, propStyle);
        if (this.props.style) {
            delete this.props.style.width;
            delete this.props.style.minWidth;
            delete this.props.style.maxWidth;
            delete this.props.style.height;
            delete this.props.style.minHeight;
            delete this.props.style.maxHeight;
            convertStyle = Object.assign(Object.assign({}, this.props.style), convertStyle);
        }
        return react_1.default.createElement("label", { id: this.props.id, className: `${switch_module_css_1.default['switch-container']} row ${(_e = this.props.className) !== null && _e !== void 0 ? _e : ''}`, style: convertStyle },
            react_1.default.createElement("input", { type: "checkbox", checked: this.state.value, name: this.props.name, disabled: this.props.disabled, onChange: () => {
                    const newValue = !this.state.value;
                    this.setState({ value: newValue });
                    if (this.props.onChange)
                        this.props.onChange(newValue);
                } }),
            react_1.default.createElement("span", { className: switch_module_css_1.default['slider'] }));
    }
}
exports.Switch = Switch;
