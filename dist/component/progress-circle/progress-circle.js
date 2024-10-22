"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressCircle = void 0;
require("./progress-circle.css");
var react_1 = __importDefault(require("react"));
function ProgressCircle(_a) {
    var id = _a.id, percent = _a.percent, style = _a.style, fillColor = _a.fillColor, percentColor = _a.percentColor, strokeWidth = _a.strokeWidth, strokeColor = _a.strokeColor, textStyle = _a.textStyle;
    var radius = 30 - (strokeWidth !== null && strokeWidth !== void 0 ? strokeWidth : 4);
    var diameter = Math.PI * 2 * radius;
    var strokeOffset = (1 - ((percent !== null && percent !== void 0 ? percent : 0) / 100)) * diameter;
    return react_1.default.createElement("svg", { id: id, width: "100%", height: "100%", viewBox: "0 0 60 60", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: __assign({ width: 60, height: 60 }, (style !== null && style !== void 0 ? style : {})) },
        react_1.default.createElement("path", { d: "M 30,30 m 0,-".concat(radius, " a ").concat(radius, ",").concat(radius, " 0 1 1 0,").concat(2 * radius, " a ").concat(radius, ",").concat(radius, " 0 1 1 0,-").concat(2 * radius), style: { fill: "none", stroke: strokeColor !== null && strokeColor !== void 0 ? strokeColor : "#E6EAF0", strokeWidth: strokeWidth !== null && strokeWidth !== void 0 ? strokeWidth : '4px', } }),
        react_1.default.createElement("path", { d: "M 30,30 m 0,-".concat(radius, " a ").concat(radius, ",").concat(radius, " 0 1 1 0,").concat(2 * radius, " a ").concat(radius, ",").concat(radius, " 0 1 1 0,-").concat(2 * radius), style: { fill: fillColor !== null && fillColor !== void 0 ? fillColor : "none", stroke: percentColor !== null && percentColor !== void 0 ? percentColor : "var(--infor-main-color)", strokeWidth: strokeWidth !== null && strokeWidth !== void 0 ? strokeWidth : '4px', strokeLinecap: 'round', strokeDasharray: "".concat(diameter, "px ").concat(diameter, "px"), strokeDashoffset: "".concat(strokeOffset, "px") } }),
        react_1.default.createElement("text", { x: "50%", y: "50%", fill: "#00204D", dy: ".3em", textAnchor: "middle", fontSize: 16, fontWeight: '600', style: textStyle }, percent !== null && percent !== void 0 ? percent : 0,
            "%"));
}
exports.ProgressCircle = ProgressCircle;
