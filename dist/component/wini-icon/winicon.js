"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function Winicon(_a) {
    var svg = _a.svg, className = _a.className, style = _a.style, size = _a.size, color = _a.color;
    var modifiedSvg = react_1.default.cloneElement(svg, {
        size: size,
        fill: color, // Apply color to the fill attribute of the SVG
    });
    return react_1.default.createElement("div", { className: "wini-icon ".concat(className !== null && className !== void 0 ? className : ''), style: style }, modifiedSvg);
}
exports.default = Winicon;
