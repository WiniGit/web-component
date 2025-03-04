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
exports.InputOtp = void 0;
const react_1 = __importStar(require("react"));
const input_otp_module_css_1 = __importDefault(require("./input-otp.module.css"));
class InputOtp extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.containerRef = (0, react_1.createRef)();
        this.getValue = () => {
            var _a;
            if (this.containerRef.current)
                return [...this.containerRef.current.querySelectorAll("input")].map(v => v.value).join("");
            else
                return (_a = this.props.value) !== null && _a !== void 0 ? _a : "";
        };
        this.getValue = this.getValue.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        var _a;
        if (prevProps.value !== this.props.value && this.containerRef.current) {
            const inputList = [...this.containerRef.current.querySelectorAll("input")];
            if ((_a = this.props.value) === null || _a === void 0 ? void 0 : _a.length) {
                for (let i = 0; i < inputList.length; i++)
                    inputList[i].value = this.props.value[i];
            }
            else {
                for (let i = 0; i < inputList.length; i++)
                    inputList[i].value = "";
            }
        }
    }
    render() {
        var _a, _b, _c, _d, _e;
        return react_1.default.createElement("div", { id: this.props.id, ref: this.containerRef, "helper-text": this.props.helperText, style: this.props.style ? Object.assign(Object.assign({}, { '--helper-text-color': (_a = this.props.helperTextColor) !== null && _a !== void 0 ? _a : '#e14337' }), this.props.style) : { '--helper-text-color': (_b = this.props.helperTextColor) !== null && _b !== void 0 ? _b : '#e14337' }, className: `row body-1 ${input_otp_module_css_1.default['input-opt-container']} ${((_c = this.props.helperText) === null || _c === void 0 ? void 0 : _c.length) && 'helper-text'} ${(_d = this.props.className) !== null && _d !== void 0 ? _d : ''}`, onMouseDown: (ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                const inputList = [...ev.target.closest("div").childNodes];
                for (const [index, input] of inputList.entries()) {
                    if (!input.value.length || index === (inputList.length - 1)) {
                        input.focus();
                        break;
                    }
                    continue;
                }
            } }, Array.from({ length: (_e = this.props.length) !== null && _e !== void 0 ? _e : 6 }).map((_, i) => react_1.default.createElement("input", { key: "opt-" + i, autoFocus: i === 0 && this.props.autoFocus, disabled: this.props.disabled, style: this.props.inputStyle, onKeyDown: (ev) => {
                var _a, _b;
                const key = ev.key.toLowerCase();
                switch (key) {
                    case "backspace":
                        if (ev.target.value.length)
                            ev.target.value = "";
                        else if (((_a = ev.target.previousSibling) === null || _a === void 0 ? void 0 : _a.localName) === "input")
                            ev.target.previousSibling.focus();
                        else
                            ev.target.blur();
                        break;
                    case "delete":
                        ev.target.value = "";
                        break;
                    default:
                        ev.preventDefault();
                        ev.stopPropagation();
                        if (key === "v" && ev.ctrlKey) {
                            return navigator.clipboard.readText().then(text => {
                                const otpRegex = /^\d{6}$/g;
                                if (otpRegex.test(text)) {
                                    const inputList = [...ev.target.closest("div").childNodes];
                                    inputList.forEach((input, i) => {
                                        input.value = text[i];
                                        input.focus();
                                    });
                                }
                            });
                        }
                        else {
                            const numberCheck = /[0-9]/g;
                            if (numberCheck.test(key) && !key.startsWith("f")) {
                                if (!ev.target.value.length)
                                    ev.target.value = key;
                                if (((_b = ev.target.nextSibling) === null || _b === void 0 ? void 0 : _b.localName) === "input" && !ev.target.nextSibling.value.length)
                                    ev.target.nextSibling.focus();
                                else
                                    ev.target.blur();
                            }
                        }
                        break;
                }
            }, onBlur: () => {
                if (this.props.onChange)
                    this.props.onChange(this.getValue(), this.containerRef.current);
            } })));
    }
}
exports.InputOtp = InputOtp;
