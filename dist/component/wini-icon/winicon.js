"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Winicon = Winicon;
var react_dom_1 = __importDefault(require("react-dom"));
var react_1 = __importStar(require("react"));
var winicon_module_css_1 = __importDefault(require("./winicon.module.css"));
var text_1 = require("../text/text");
function Winicon(_a) {
    var _this = this;
    var id = _a.id, src = _a.src, link = _a.link, className = _a.className, style = _a.style, size = _a.size, color = _a.color, alt = _a.alt, onClick = _a.onClick, tooltip = _a.tooltip;
    var ref = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(), svgData = _b[0], setSvgData = _b[1];
    var _c = (0, react_1.useState)(false), showTooltip = _c[0], setShowTooltip = _c[1];
    var cdnSrc = "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/";
    var extendAttribute = (0, react_1.useMemo)(function () {
        if (tooltip)
            return {
                "tooltip-value": tooltip,
                onMouseOver: function () { setShowTooltip(true); },
                onMouseOut: function () { setShowTooltip(false); }
            };
        return {};
    }, [tooltip]);
    (0, react_1.useEffect)(function () {
        if (src) {
            fetch(cdnSrc + src + ".svg").then(function (res) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = setSvgData;
                        return [4 /*yield*/, res.text()];
                    case 1:
                        _a.apply(void 0, [_b.sent()]);
                        return [2 /*return*/];
                }
            }); }); }).catch(function () { setSvgData(alt !== null && alt !== void 0 ? alt : "error"); });
        }
        else if (link) {
            fetch(link).then(function (res) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = setSvgData;
                        return [4 /*yield*/, res.text()];
                    case 1:
                        _a.apply(void 0, [_b.sent()]);
                        return [2 /*return*/];
                }
            }); }); });
        }
    }, [src, link]);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", __assign({ ref: ref, id: id, onClick: onClick, className: "".concat(winicon_module_css_1.default['wini-icon'], " ").concat(svgData ? "" : "skeleton-loading", " ").concat(onClick ? winicon_module_css_1.default['clickable'] : '', " ").concat(className !== null && className !== void 0 ? className : '', " ").concat(src ? src.split("/").map(function (e, i) { return i === 0 ? "".concat(e, "-icon") : e.replace(" ", "-"); }).join(" ") : '').concat(link ? ' link-icon' : ""), style: (style ? __assign(__assign({}, style), { '--size': size, '--color': color }) : { '--size': size, '--color': color }), dangerouslySetInnerHTML: { __html: svgData !== null && svgData !== void 0 ? svgData : '' } }, extendAttribute)),
        tooltip && showTooltip && react_dom_1.default.createPortal((function () {
            var _a;
            if (!ref.current)
                return null;
            var rect = ref.current.getBoundingClientRect();
            var pos = (_a = tooltip.position) !== null && _a !== void 0 ? _a : "bottom";
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
                    return react_1.default.createElement("div", { ref: function (r) {
                            if (r) {
                                var _r = r.getBoundingClientRect();
                                if (_r.x < 0) {
                                    r.style.left = "0px";
                                    r.style.transform = "translateX(0)";
                                    r.style.alignItems = "start";
                                }
                                else if (_r.right > document.body.offsetWidth) {
                                    r.style.left = "unset";
                                    r.style.right = "0px";
                                    r.style.transform = "translateX(0)";
                                    r.style.alignItems = "end";
                                }
                            }
                        }, className: "col ".concat(winicon_module_css_1.default['tooltip-container']), style: { alignItems: "center", bottom: document.body.offsetHeight - rect.top - 4, left: rect.left + (rect.width / 2), transform: "translateX(-50%)" } },
                        react_1.default.createElement(text_1.Text, { className: "body-3 ".concat(winicon_module_css_1.default['tooltip-message']), maxLine: 2 }, tooltip.message),
                        react_1.default.createElement("div", { className: "row", style: { padding: "0 1.2rem", transform: "translateY(-0.2rem)" } },
                            react_1.default.createElement("div", { style: { borderLeft: "0.6rem solid transparent", borderRight: "0.6rem solid transparent", borderTop: "0.8rem solid var(--neutral-main-reverse-background-color)", borderRadius: 2 } })));
                case "bottom":
                    return react_1.default.createElement("div", { ref: function (r) {
                            if (r) {
                                var _r = r.getBoundingClientRect();
                                if (_r.x < 0) {
                                    r.style.left = "0px";
                                    r.style.transform = "translateX(0)";
                                    r.style.alignItems = "start";
                                }
                                else if (_r.right > document.body.offsetWidth) {
                                    r.style.left = "unset";
                                    r.style.right = "0px";
                                    r.style.transform = "translateX(0)";
                                    r.style.alignItems = "end";
                                }
                            }
                        }, className: "col ".concat(winicon_module_css_1.default['tooltip-container']), style: { alignItems: "center", top: rect.bottom + 4, left: rect.left + (rect.width / 2), transform: "translateX(-50%)" } },
                        react_1.default.createElement("div", { className: "row", style: { padding: "0 1.2rem", transform: "translateY(0.2rem)" } },
                            react_1.default.createElement("div", { style: { borderLeft: "0.6rem solid transparent", borderRight: "0.6rem solid transparent", borderBottom: "0.8rem solid var(--neutral-main-reverse-background-color)", borderRadius: 2 } })),
                        react_1.default.createElement(text_1.Text, { className: "body-3 ".concat(winicon_module_css_1.default['tooltip-message']), maxLine: 2 }, tooltip.message));
                case "left":
                    return react_1.default.createElement("div", { ref: function (r) {
                            if (r) {
                                var _r = r.getBoundingClientRect();
                                if (_r.y < 0) {
                                    r.style.top = "0px";
                                    r.style.transform = "translateY(0)";
                                    r.style.alignItems = "start";
                                }
                                else if (_r.right > document.body.offsetWidth) {
                                    r.style.top = "unset";
                                    r.style.bottom = "0px";
                                    r.style.transform = "translateY(0)";
                                    r.style.alignItems = "end";
                                }
                            }
                        }, className: "row ".concat(winicon_module_css_1.default['tooltip-container']), style: { top: rect.top + (rect.height / 2), right: document.body.offsetWidth - rect.left - 4, transform: "translateY(-50%)" } },
                        react_1.default.createElement(text_1.Text, { className: "body-3 ".concat(winicon_module_css_1.default['tooltip-message']), maxLine: 2 }, tooltip.message),
                        react_1.default.createElement("div", { className: "row", style: { padding: "0 1.2rem", transform: "translateX(-0.2rem)" } },
                            react_1.default.createElement("div", { style: { borderTop: "0.6rem solid transparent", borderBottom: "0.6rem solid transparent", borderLeft: "0.8rem solid var(--neutral-main-reverse-background-color)", borderRadius: 2 } })));
                case "right":
                    return react_1.default.createElement("div", { ref: function (r) {
                            if (r) {
                                var _r = r.getBoundingClientRect();
                                if (_r.y < 0) {
                                    r.style.top = "0px";
                                    r.style.transform = "translateY(0)";
                                    r.style.alignItems = "start";
                                }
                                else if (_r.right > document.body.offsetWidth) {
                                    r.style.top = "unset";
                                    r.style.bottom = "0px";
                                    r.style.transform = "translateY(0)";
                                    r.style.alignItems = "end";
                                }
                            }
                        }, className: "row ".concat(winicon_module_css_1.default['tooltip-container']), style: { top: rect.top + (rect.height / 2), left: rect.right + 4, transform: "translateY(-50%)" } },
                        react_1.default.createElement("div", { className: "row", style: { padding: "0 1.2rem", transform: "translateX(0.2rem)" } },
                            react_1.default.createElement("div", { style: { borderTop: "0.6rem solid transparent", borderBottom: "0.6rem solid transparent", borderRight: "0.8rem solid var(--neutral-main-reverse-background-color)", borderRadius: 2 } })),
                        react_1.default.createElement(text_1.Text, { className: "body-3 ".concat(winicon_module_css_1.default['tooltip-message']), maxLine: 2 }, tooltip.message));
                default:
                    return react_1.default.createElement("div", null);
            }
        })(), document.body));
}
