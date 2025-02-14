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
var react_1 = __importStar(require("react"));
require("./popup.css");
var showPopup = function (props) {
    var _a, _b;
    (_b = (_a = props.ref) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.onOpen({
        heading: props.heading,
        content: props.content,
        body: props.body,
        footer: props.footer,
        clickOverlayClosePopup: props.clickOverlayClosePopup,
        style: props.style,
        hideButtonClose: props.hideButtonClose
    });
};
exports.showPopup = showPopup;
var closePopup = function (ref) {
    ref.current.onClose();
};
exports.closePopup = closePopup;
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup(props) {
        var _this = _super.call(this, props) || this;
        _this.ref = (0, react_1.createRef)();
        _this.state = {
            open: false,
        };
        return _this;
    }
    Popup.prototype.onOpen = function (data) {
        this.setState(__assign({ open: true }, data));
    };
    Popup.prototype.onClose = function () {
        this.setState({ open: false });
    };
    Popup.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a;
        if (prevState.open !== this.state.open && this.state.open && this.state.style) {
            var thisPopupRect = (_a = this.ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            if (thisPopupRect) {
                var style = void 0;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = __assign(__assign({}, this.state.style), { right: '0.4rem' });
                    delete style.left;
                }
                if (thisPopupRect.bottom > document.body.offsetHeight) {
                    style = style ? __assign(__assign({}, style), { bottom: '0.4rem' }) : __assign(__assign({}, this.state.style), { bottom: '0.4rem' });
                    delete style.top;
                }
                if (style)
                    this.setState(__assign(__assign({}, this.state), { style: style }));
            }
        }
    };
    Popup.prototype.render = function () {
        var _this = this;
        var _a;
        return (react_1.default.createElement(react_1.default.Fragment, null, this.state.open &&
            react_1.default.createElement(PopupOverlay, { className: this.state.clickOverlayClosePopup ? 'hidden-overlay' : '', onClose: this.state.clickOverlayClosePopup ? function () { _this.onClose(); } : undefined }, (_a = this.state.content) !== null && _a !== void 0 ? _a : react_1.default.createElement("div", { ref: this.ref, className: 'popup-container col', onClick: function (e) { return e.stopPropagation(); }, style: this.state.style },
                this.state.heading,
                this.state.body,
                this.state.footer,
                this.state.hideButtonClose ? null : react_1.default.createElement("button", { type: 'button', onClick: function () { return _this.onClose(); }, className: 'popup-close-btn row' },
                    react_1.default.createElement("svg", { width: '100%', height: '100%', viewBox: '0 0 20 20', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', style: { width: '2rem', height: '2rem' } },
                        react_1.default.createElement("path", { fillRule: 'evenodd', clipRule: 'evenodd', d: 'M16.4223 4.7559C16.7477 4.43047 16.7477 3.90283 16.4223 3.57739C16.0968 3.25195 15.5692 3.25195 15.2438 3.57739L9.99967 8.82147L4.7556 3.57739C4.43016 3.25195 3.90252 3.25195 3.57709 3.57739C3.25165 3.90283 3.25165 4.43047 3.57709 4.7559L8.82116 9.99998L3.57709 15.2441C3.25165 15.5695 3.25165 16.0971 3.57709 16.4226C3.90252 16.748 4.43016 16.748 4.7556 16.4226L9.99967 11.1785L15.2438 16.4226C15.5692 16.748 16.0968 16.748 16.4223 16.4226C16.7477 16.0971 16.7477 15.5695 16.4223 15.2441L11.1782 9.99998L16.4223 4.7559Z', fill: '#00204D', fillOpacity: 0.6 })))))));
    };
    return Popup;
}(react_1.default.Component));
exports.Popup = Popup;
function PopupOverlay(_a) {
    var children = _a.children, onClose = _a.onClose, className = _a.className, style = _a.style, onOpen = _a.onOpen;
    var overlayRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (overlayRef.current && onClose) {
            var onClickDropDown_1 = function (ev) {
                if (ev.target !== overlayRef.current && !overlayRef.current.contains(ev.target))
                    onClose(ev);
            };
            window.document.body.addEventListener("mousedown", onClickDropDown_1);
            return function () {
                window.document.body.removeEventListener("mousedown", onClickDropDown_1);
            };
        }
    }, [overlayRef]);
    (0, react_1.useEffect)(function () {
        if (overlayRef.current && onOpen)
            onOpen(overlayRef.current);
    }, [overlayRef, onOpen]);
    return react_1.default.createElement("div", { ref: overlayRef, className: "popup-overlay ".concat(className !== null && className !== void 0 ? className : ""), style: style }, children);
}
