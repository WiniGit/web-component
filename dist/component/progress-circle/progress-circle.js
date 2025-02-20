"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressCircle = ProgressCircle;
require("./progress-circle.css");
const react_1 = __importDefault(require("react"));
function ProgressCircle(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const radius = 30 - ((_a = props.strokeWidth) !== null && _a !== void 0 ? _a : 4);
    const diameter = Math.PI * 2 * radius;
    const strokeOffset = (1 - (((_b = props.percent) !== null && _b !== void 0 ? _b : 0) / 100)) * diameter;
    return react_1.default.createElement("svg", { id: props.id, width: "100%", height: "100%", viewBox: "0 0 60 60", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: Object.assign({ width: '6rem', height: '6rem' }, ((_c = props.style) !== null && _c !== void 0 ? _c : {})) },
        react_1.default.createElement("path", { d: `M 30,30 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${2 * radius} a ${radius},${radius} 0 1 1 0,-${2 * radius}`, style: { fill: "none", stroke: (_d = props.strokeColor) !== null && _d !== void 0 ? _d : "var(--neutral-main-background-color)", strokeWidth: (_e = props.strokeWidth) !== null && _e !== void 0 ? _e : '4px', } }),
        react_1.default.createElement("path", { d: `M 30,30 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${2 * radius} a ${radius},${radius} 0 1 1 0,-${2 * radius}`, style: { fill: (_f = props.fillColor) !== null && _f !== void 0 ? _f : "none", stroke: (_g = props.percentColor) !== null && _g !== void 0 ? _g : "var(--primary-main-color)", strokeWidth: (_h = props.strokeWidth) !== null && _h !== void 0 ? _h : '4px', strokeLinecap: 'round', strokeDasharray: `${diameter}px ${diameter}px`, strokeDashoffset: `${strokeOffset}px` } }),
        react_1.default.createElement("text", { x: "50%", y: "50%", dy: ".3em", textAnchor: "middle", fontSize: "1.6rem", fontWeight: '600', style: Object.assign({ fill: "var(neutral-text-title-color)" }, ((_j = props.textStyle) !== null && _j !== void 0 ? _j : {})) }, (_k = props.percent) !== null && _k !== void 0 ? _k : 0,
            "%"));
}
