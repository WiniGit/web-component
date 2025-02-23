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
exports.Button = Button;
const react_1 = __importStar(require("react"));
const text_1 = require("../text/text");
const button_module_css_1 = __importDefault(require("./button.module.css"));
function Button(props) {
    var _a, _b, _c;
    const btnRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (btnRef.current) {
            switch (props.type) {
                case "submit":
                    function handleSubmit(ev) {
                        switch (ev.key.toLowerCase()) {
                            case "enter":
                                btnRef.current.click();
                                break;
                            default:
                                break;
                        }
                    }
                    window.addEventListener("keydown", handleSubmit);
                    return () => { window.removeEventListener("keydown", handleSubmit); };
                default:
                    break;
            }
        }
    }, [props.type, btnRef.current]);
    return props.linkTo ? react_1.default.createElement("a", { id: props.id, href: props.disabled ? undefined : props.linkTo, target: props.target, className: `${button_module_css_1.default['button-container']} row ${(_a = props.className) !== null && _a !== void 0 ? _a : "button-text-3"}`, style: props.style, onClick: props.onClick },
        props.prefix,
        react_1.default.createElement(text_1.Text, { maxLine: 1, className: button_module_css_1.default['button-label'] }, props.label),
        props.suffix) : react_1.default.createElement("button", { ref: btnRef, id: props.id, type: (_b = props.type) !== null && _b !== void 0 ? _b : "button", disabled: props.disabled, className: `${button_module_css_1.default['button-container']} row ${(_c = props.className) !== null && _c !== void 0 ? _c : "button-text-3"}`, style: props.style, onClick: props.onClick },
        props.prefix,
        react_1.default.createElement(text_1.Text, { maxLine: 1, className: button_module_css_1.default['button-label'] }, props.label),
        props.suffix);
}
