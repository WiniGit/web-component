"use strict";
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
const react_1 = __importStar(require("react"));
const checkbox_module_css_1 = __importDefault(require("./checkbox.module.css"));
class Checkbox extends react_1.default.Component {
    constructor(props) {
        var _a;
        super(props);
        this.ref = (0, react_1.createRef)();
        this.onChange = () => {
            const newValue = !this.state.value;
            this.setState({ value: newValue });
            if (this.props.onChange && this.ref.current)
                this.props.onChange(newValue, this.ref.current.querySelector("input"));
        };
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
        var _a, _b, _c;
        let convertStyle = {
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
            convertStyle = Object.assign(Object.assign({}, this.props.style), convertStyle);
        }
        return react_1.default.createElement("label", { ref: this.ref, id: this.props.id, className: `${checkbox_module_css_1.default['checkbox-container']} row ${(_c = this.props.className) !== null && _c !== void 0 ? _c : ''}`, style: convertStyle, "is-null-value": `${this.state.value == undefined}`, onClick: this.props.onClick },
            react_1.default.createElement("input", { type: "checkbox", checked: this.state.value ? true : false, disabled: this.props.disabled, onChange: (ev) => {
                    ev.stopPropagation();
                    const newValue = !this.state.value;
                    this.setState({ value: newValue });
                    if (this.props.onChange)
                        this.props.onChange(newValue, ev.target);
                } }),
            react_1.default.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { '--check-color': this.props.checkColor } }, this.state.value === undefined ?
                react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.79199 9.95298C4.79199 9.69148 5.00398 9.47949 5.26548 9.47949H14.7352C14.9967 9.47949 15.2087 9.69148 15.2087 9.95298C15.2087 10.2145 14.9967 10.4265 14.7352 10.4265H5.26548C5.00398 10.4265 4.79199 10.2145 4.79199 9.95298Z" }) :
                react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.07 6.49317C15.2549 6.67808 15.2549 6.97787 15.07 7.16278L8.91467 13.3181C8.72977 13.503 8.42997 13.503 8.24507 13.3181L4.93067 10.0037C4.74577 9.81878 4.74577 9.51899 4.93067 9.33408C5.11558 9.14917 5.41537 9.14917 5.60028 9.33408L8.57987 12.3137L14.4004 6.49317C14.5853 6.30827 14.8851 6.30827 15.07 6.49317Z" })));
    }
}
exports.Checkbox = Checkbox;
