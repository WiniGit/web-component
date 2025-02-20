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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextArea = void 0;
const react_1 = __importStar(require("react"));
require("./text-area.css");
class TextArea extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.containerRef = (0, react_1.createRef)();
        this.getTextarea = () => {
            var _a;
            return (_a = this.containerRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("textarea");
        };
    }
    render() {
        var _a, _b, _c, _d;
        return react_1.default.createElement("div", { ref: this.containerRef, id: this.props.id, className: `text-area-container row ${(_a = this.props.className) !== null && _a !== void 0 ? _a : 'body-3'} ${((_b = this.props.helperText) === null || _b === void 0 ? void 0 : _b.length) && 'helper-text'}`, "helper-text": this.props.helperText, style: this.props.style ? Object.assign(Object.assign({}, { '--helper-text-color': (_c = this.props.helperTextColor) !== null && _c !== void 0 ? _c : '#e14337' }), this.props.style) : { '--helper-text-color': (_d = this.props.helperTextColor) !== null && _d !== void 0 ? _d : '#e14337' } }, this.props.register ?
            react_1.default.createElement("textarea", Object.assign({ name: this.props.name, autoFocus: this.props.autoFocus }, this.props.register, { maxLength: this.props.maxLength, placeholder: this.props.placeholder, readOnly: this.props.readOnly, disabled: this.props.disabled, onFocus: this.props.onFocus })) : react_1.default.createElement("textarea", { autoFocus: this.props.autoFocus, maxLength: this.props.maxLength, name: this.props.name, defaultValue: this.props.defaultValue, value: this.props.value, placeholder: this.props.placeholder, readOnly: this.props.readOnly, disabled: this.props.disabled, onChange: this.props.onChange, onFocus: this.props.onFocus, onBlur: this.props.onBlur }));
    }
}
exports.TextArea = TextArea;
