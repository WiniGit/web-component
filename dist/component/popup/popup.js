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
exports.Popup = exports.closePopup = exports.showPopup = void 0;
exports.PopupOverlay = PopupOverlay;
const react_1 = __importStar(require("react"));
require("./popup.css");
const showPopup = (props) => {
    var _a, _b;
    (_b = (_a = props.ref) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.onOpen({
        heading: props.heading,
        content: props.content,
        body: props.body,
        footer: props.footer,
        clickOverlayClosePopup: props.clickOverlayClosePopup,
        style: props.style,
        className: props.className,
        hideButtonClose: props.hideButtonClose
    });
};
exports.showPopup = showPopup;
const closePopup = (ref) => {
    ref.current.onClose();
};
exports.closePopup = closePopup;
class Popup extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    onOpen(data) {
        this.setState(Object.assign({ open: true }, data));
    }
    onClose() {
        this.setState({ open: false });
    }
    render() {
        var _a, _b;
        return (react_1.default.createElement(react_1.default.Fragment, null, this.state.open &&
            react_1.default.createElement(PopupOverlay, { className: this.state.clickOverlayClosePopup ? 'hidden-overlay' : '', onClose: this.state.clickOverlayClosePopup ? () => { this.onClose(); } : undefined }, (_a = this.state.content) !== null && _a !== void 0 ? _a : react_1.default.createElement("div", { className: `popup-container col ${(_b = this.state.className) !== null && _b !== void 0 ? _b : ""}`, onClick: e => e.stopPropagation(), style: this.state.style },
                this.state.heading,
                this.state.body,
                this.state.footer,
                this.state.hideButtonClose ? null : react_1.default.createElement("button", { type: 'button', onClick: () => this.onClose(), className: 'popup-close-btn row' },
                    react_1.default.createElement("svg", { width: '100%', height: '100%', viewBox: '0 0 20 20', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', style: { width: '2rem', height: '2rem' } },
                        react_1.default.createElement("path", { fillRule: 'evenodd', clipRule: 'evenodd', d: 'M16.4223 4.7559C16.7477 4.43047 16.7477 3.90283 16.4223 3.57739C16.0968 3.25195 15.5692 3.25195 15.2438 3.57739L9.99967 8.82147L4.7556 3.57739C4.43016 3.25195 3.90252 3.25195 3.57709 3.57739C3.25165 3.90283 3.25165 4.43047 3.57709 4.7559L8.82116 9.99998L3.57709 15.2441C3.25165 15.5695 3.25165 16.0971 3.57709 16.4226C3.90252 16.748 4.43016 16.748 4.7556 16.4226L9.99967 11.1785L15.2438 16.4226C15.5692 16.748 16.0968 16.748 16.4223 16.4226C16.7477 16.0971 16.7477 15.5695 16.4223 15.2441L11.1782 9.99998L16.4223 4.7559Z', fill: '#00204D', fillOpacity: 0.6 })))))));
    }
}
exports.Popup = Popup;
function PopupOverlay({ children, onClose, className, style, onOpen }) {
    const overlayRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (overlayRef.current && onClose) {
            const onClickDropDown = (ev) => {
                if (ev.target !== overlayRef.current && !overlayRef.current.contains(ev.target))
                    onClose(ev);
            };
            window.document.body.addEventListener("mousedown", onClickDropDown);
            return () => {
                window.document.body.removeEventListener("mousedown", onClickDropDown);
            };
        }
    }, [overlayRef]);
    (0, react_1.useEffect)(() => {
        if (overlayRef.current && onOpen)
            onOpen(overlayRef.current);
    }, [overlayRef, onOpen]);
    (0, react_1.useEffect)(() => {
        if (overlayRef.current && overlayRef.current.firstChild) {
            const popupContent = overlayRef.current.firstChild;
            const rect = popupContent.getBoundingClientRect();
            if (rect.x < 0) {
                popupContent.style.left = "0px";
                popupContent.style.right = "unset";
            }
            else if (rect.right > document.body.offsetWidth) {
                popupContent.style.right = "0px";
                popupContent.style.left = "unset";
            }
            if (rect.y < 0) {
                popupContent.style.top = "0px";
                popupContent.style.bottom = "unset";
            }
            else if (rect.bottom > document.body.offsetHeight) {
                popupContent.style.bottom = "0px";
                popupContent.style.top = "unset";
            }
        }
    }, [overlayRef]);
    return react_1.default.createElement("div", { ref: overlayRef, className: `popup-overlay ${className !== null && className !== void 0 ? className : ""}`, style: style }, children);
}
