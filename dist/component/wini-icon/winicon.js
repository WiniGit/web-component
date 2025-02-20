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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Winicon = Winicon;
const react_dom_1 = __importDefault(require("react-dom"));
const react_1 = __importStar(require("react"));
const winicon_module_css_1 = __importDefault(require("./winicon.module.css"));
const text_1 = require("../text/text");
function Winicon({ id, src, link, className, style, size, color, alt, onClick, tooltip }) {
    const ref = (0, react_1.useRef)(null);
    const [svgData, setSvgData] = (0, react_1.useState)();
    const [showTooltip, setShowTooltip] = (0, react_1.useState)(false);
    const cdnSrc = "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/";
    const extendAttribute = (0, react_1.useMemo)(() => {
        if (tooltip)
            return {
                "tooltip-value": tooltip,
                onMouseOver: () => { setShowTooltip(true); },
                onMouseOut: () => { setShowTooltip(false); }
            };
        return {};
    }, [tooltip]);
    (0, react_1.useEffect)(() => {
        if (src) {
            fetch(cdnSrc + src + ".svg").then((res) => __awaiter(this, void 0, void 0, function* () { setSvgData(yield res.text()); })).catch(() => { setSvgData(alt !== null && alt !== void 0 ? alt : "error"); });
        }
        else if (link) {
            fetch(link).then((res) => __awaiter(this, void 0, void 0, function* () { setSvgData(yield res.text()); }));
        }
    }, [src, link]);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", Object.assign({ ref: ref, id: id, onClick: onClick, className: `${winicon_module_css_1.default['wini-icon']} ${svgData ? "" : "skeleton-loading"} ${onClick ? winicon_module_css_1.default['clickable'] : ''} ${className !== null && className !== void 0 ? className : ''} ${src ? src.split("/").map((e, i) => i === 0 ? `${e}-icon` : e.replace(" ", "-")).join(" ") : ''}${link ? ' link-icon' : ""}`, style: (style ? Object.assign(Object.assign({}, style), { '--size': size, '--color': color }) : { '--size': size, '--color': color }), dangerouslySetInnerHTML: { __html: svgData !== null && svgData !== void 0 ? svgData : '' } }, extendAttribute)),
        tooltip && showTooltip && react_dom_1.default.createPortal((() => {
            var _a;
            if (!ref.current)
                return null;
            const rect = ref.current.getBoundingClientRect();
            let pos = (_a = tooltip.position) !== null && _a !== void 0 ? _a : "bottom";
            if (document.body.offsetHeight - rect.bottom < 100 && pos === "bottom")
                pos = "top";
            else if (rect.top < 100 && pos === "top")
                pos = "bottom";
            if (document.body.offsetWidth - rect.right < 100 && pos === "right")
                pos = "left";
            else if (rect.left < 100 && pos === "left")
                pos = "right";
            switch (pos) {
                case "top":
                    return react_1.default.createElement("div", { ref: r => {
                            if (r) {
                                const _r = r.getBoundingClientRect();
                                if (_r.x < 0) {
                                    r.style.left = (rect.x + rect.width / 2) + "px";
                                    r.style.transform = "translateX(-1.8rem)";
                                    r.style.alignItems = "start";
                                }
                                else if (_r.right > document.body.offsetWidth) {
                                    r.style.left = "unset";
                                    r.style.right = (document.body.offsetWidth - rect.right - rect.width / 2) + "px";
                                    r.style.transform = "translateX(-1.4rem)";
                                    r.style.alignItems = "end";
                                }
                            }
                        }, className: `col ${winicon_module_css_1.default['tooltip-container']}`, style: { alignItems: "center", bottom: document.body.offsetHeight - rect.top - 4, left: rect.left + (rect.width / 2), transform: "translateX(-50%)" } },
                        react_1.default.createElement(text_1.Text, { className: `body-3 ${winicon_module_css_1.default['tooltip-message']}`, maxLine: 2 }, tooltip.message),
                        react_1.default.createElement("div", { className: "row", style: { padding: "0 1.2rem", transform: "translateY(-0.2rem)" } },
                            react_1.default.createElement("div", { style: { borderLeft: "0.6rem solid transparent", borderRight: "0.6rem solid transparent", borderTop: "0.8rem solid var(--neutral-main-reverse-background-color)", borderRadius: 2 } })));
                case "bottom":
                    return react_1.default.createElement("div", { ref: r => {
                            if (r) {
                                const _r = r.getBoundingClientRect();
                                if (_r.x < 0) {
                                    r.style.left = (rect.x + rect.width / 2) + "px";
                                    r.style.transform = "translateX(-1.8rem)";
                                    r.style.alignItems = "start";
                                }
                                else if (_r.right > document.body.offsetWidth) {
                                    r.style.left = "unset";
                                    r.style.right = (document.body.offsetWidth - rect.right - rect.width / 2) + "px";
                                    r.style.transform = "translateX(-1.4rem)";
                                    r.style.alignItems = "end";
                                }
                            }
                        }, className: `col ${winicon_module_css_1.default['tooltip-container']}`, style: { alignItems: "center", top: rect.bottom + 4, left: rect.left + (rect.width / 2), transform: "translateX(-50%)" } },
                        react_1.default.createElement("div", { className: "row", style: { padding: "0 1.2rem", transform: "translateY(0.2rem)" } },
                            react_1.default.createElement("div", { style: { borderLeft: "0.6rem solid transparent", borderRight: "0.6rem solid transparent", borderBottom: "0.8rem solid var(--neutral-main-reverse-background-color)", borderRadius: 2 } })),
                        react_1.default.createElement(text_1.Text, { className: `body-3 ${winicon_module_css_1.default['tooltip-message']}`, maxLine: 2 }, tooltip.message));
                case "left":
                    return react_1.default.createElement("div", { ref: r => {
                            if (r) {
                                const _r = r.getBoundingClientRect();
                                if (_r.y < 0) {
                                    r.style.top = (rect.y + rect.height / 2) + "px";
                                    r.style.transform = "translateY(-1.8rem)";
                                    r.style.alignItems = "start";
                                }
                                else if (_r.bottom > document.body.offsetHeight) {
                                    r.style.top = "unset";
                                    r.style.bottom = (document.body.offsetHeight - rect.bottom - rect.height / 2) + "px";
                                    r.style.transform = "translateY(-1.4rem)";
                                    r.style.alignItems = "end";
                                }
                            }
                        }, className: `row ${winicon_module_css_1.default['tooltip-container']}`, style: { top: rect.top + (rect.height / 2), right: document.body.offsetWidth - rect.left - 4, transform: "translateY(-50%)" } },
                        react_1.default.createElement(text_1.Text, { className: `body-3 ${winicon_module_css_1.default['tooltip-message']}`, maxLine: 2 }, tooltip.message),
                        react_1.default.createElement("div", { className: "row", style: { padding: "1.2rem 0", transform: "translateX(-0.2rem)" } },
                            react_1.default.createElement("div", { style: { borderTop: "0.6rem solid transparent", borderBottom: "0.6rem solid transparent", borderLeft: "0.8rem solid var(--neutral-main-reverse-background-color)", borderRadius: 2 } })));
                case "right":
                    return react_1.default.createElement("div", { ref: r => {
                            if (r) {
                                const _r = r.getBoundingClientRect();
                                if (_r.y < 0) {
                                    r.style.top = (rect.y + rect.height / 2) + "px";
                                    r.style.transform = "translateY(-1.8rem)";
                                    r.style.alignItems = "start";
                                }
                                else if (_r.bottom > document.body.offsetHeight) {
                                    r.style.top = "unset";
                                    r.style.bottom = (document.body.offsetHeight - rect.bottom - rect.height / 2) + "px";
                                    r.style.transform = "translateY(-1.4rem)";
                                    r.style.alignItems = "end";
                                }
                            }
                        }, className: `row ${winicon_module_css_1.default['tooltip-container']}`, style: { top: rect.top + (rect.height / 2), left: rect.right + 4, transform: "translateY(-50%)" } },
                        react_1.default.createElement("div", { className: "row", style: { padding: "1.2rem 0", transform: "translateX(0.2rem)" } },
                            react_1.default.createElement("div", { style: { borderTop: "0.6rem solid transparent", borderBottom: "0.6rem solid transparent", borderRight: "0.8rem solid var(--neutral-main-reverse-background-color)", borderRadius: 2 } })),
                        react_1.default.createElement(text_1.Text, { className: `body-3 ${winicon_module_css_1.default['tooltip-message']}`, maxLine: 2 }, tooltip.message));
                default:
                    return react_1.default.createElement("div", null);
            }
        })(), document.body));
}
