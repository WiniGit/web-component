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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
var react_1 = __importDefault(require("react"));
var rating_module_css_1 = __importDefault(require("./rating.module.css"));
var autoKeyId = function () { return window.crypto.randomUUID().replace(/-/g, ''); };
var Rating = /** @class */ (function (_super) {
    __extends(Rating, _super);
    function Rating() {
        var _this = this;
        var _a;
        _this = _super.apply(this, arguments) || this;
        _this.state = {
            value: (_a = _this.props.value) !== null && _a !== void 0 ? _a : 0
        };
        return _this;
    }
    Rating.prototype.componentDidUpdate = function (prevProps) {
        var _a;
        if (prevProps.value !== this.props.value) {
            this.setState({ value: (_a = this.props.value) !== null && _a !== void 0 ? _a : 0 });
        }
    };
    Rating.prototype.render = function () {
        var _this = this;
        var _a;
        return react_1.default.createElement("div", { id: this.props.id, className: "row ".concat(rating_module_css_1.default['rating-container'], " ").concat((_a = this.props.className) !== null && _a !== void 0 ? _a : ''), style: this.props.style }, Array.from({ length: 5 }).map(function (_, i) {
            var _a, _b, _c, _d, _e;
            var uniqueId = 'rating-star-grad-0';
            var stopValue = 0;
            if (_this.state.value >= 5) {
                uniqueId = 'rating-star-grad-5';
                stopValue = 100;
            }
            else if (_this.state.value >= i) {
                uniqueId = autoKeyId();
                stopValue = (_this.state.value - i) * 100;
            }
            return react_1.default.createElement("svg", { onClick: function () {
                    if (_this.props.onChange) {
                        _this.setState({ value: i + 1 });
                        _this.props.onChange(i + 1);
                    }
                }, key: 'rate-' + i, width: "100%", height: "100%", style: { width: (_a = _this.props.size) !== null && _a !== void 0 ? _a : '2rem', height: (_b = _this.props.size) !== null && _b !== void 0 ? _b : '2rem' }, viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                react_1.default.createElement("defs", null,
                    react_1.default.createElement("linearGradient", { id: uniqueId, x1: "0%", x2: "100%", y1: "0%", y2: "0%" },
                        react_1.default.createElement("stop", { offset: "0%", stopColor: (_c = _this.props.fillColor) !== null && _c !== void 0 ? _c : '#FC6B03' }),
                        react_1.default.createElement("stop", { offset: "".concat(stopValue, "%"), stopColor: (_d = _this.props.fillColor) !== null && _d !== void 0 ? _d : '#FC6B03' }),
                        react_1.default.createElement("stop", { offset: "".concat(stopValue, "%"), stopColor: "#00000000" }))),
                react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10 1.66667C10.2884 1.66667 10.5518 1.82993 10.6794 2.0878L12.844 6.46194L17.6847 7.16325C17.97 7.20459 18.2071 7.4039 18.2962 7.67736C18.3853 7.95082 18.311 8.25101 18.1045 8.45172L14.6018 11.8563L15.4285 16.6636C15.4772 16.947 15.3604 17.2334 15.127 17.4024C14.8937 17.5714 14.5844 17.5937 14.3292 17.4599L10 15.1897L5.67081 17.4599C5.41557 17.5937 5.10627 17.5714 4.87295 17.4024C4.63964 17.2334 4.52278 16.947 4.57151 16.6636L5.39815 11.8563L1.89545 8.45172C1.68896 8.25101 1.61465 7.95082 1.70377 7.67736C1.79288 7.4039 2.02996 7.20459 2.31533 7.16325L7.15599 6.46194L9.32063 2.0878C9.44825 1.82993 9.71162 1.66667 10 1.66667ZM10 4.12915L8.33846 7.48665C8.22811 7.70963 8.01479 7.86418 7.76802 7.89993L4.05223 8.43827L6.74094 11.0517C6.91947 11.2252 7.00094 11.4752 6.95881 11.7203L6.3243 15.4102L9.64738 13.6676C9.86813 13.5519 10.1319 13.5519 10.3526 13.6676L13.6757 15.4102L13.0412 11.7203C12.9991 11.4752 13.0805 11.2252 13.2591 11.0517L15.9478 8.43827L12.232 7.89993C11.9852 7.86418 11.7719 7.70963 11.6615 7.48665L10 4.12915Z", fill: (_e = _this.props.strokeColor) !== null && _e !== void 0 ? _e : '#667994' }),
                react_1.default.createElement("path", { d: "M17.738 7.18949L12.8212 6.47499L10.6249 2.02268C10.5611 1.91426 10.47 1.82438 10.3608 1.76194C10.2515 1.6995 10.1279 1.66666 10.0021 1.66666C9.87623 1.66666 9.75259 1.6995 9.64335 1.76194C9.53411 1.82438 9.44306 1.91426 9.37921 2.02268L7.17875 6.47499L2.26191 7.18949C2.13368 7.208 2.0132 7.26201 1.91406 7.34542C1.81493 7.42882 1.74111 7.5383 1.70095 7.66147C1.66078 7.78463 1.65588 7.91658 1.68678 8.04239C1.71769 8.1682 1.78317 8.28286 1.87583 8.3734L5.43449 11.8411L4.59499 16.7385C4.57311 16.8662 4.58739 16.9975 4.63622 17.1175C4.68505 17.2375 4.76648 17.3414 4.8713 17.4175C4.97612 17.4937 5.10016 17.539 5.22938 17.5483C5.3586 17.5577 5.48785 17.5306 5.60252 17.4704L9.99998 15.1588L14.3974 17.4704C14.5121 17.5306 14.6414 17.5577 14.7706 17.5483C14.8998 17.539 15.0238 17.4937 15.1286 17.4175C15.2335 17.3414 15.3149 17.2375 15.3637 17.1175C15.4126 16.9975 15.4268 16.8662 15.405 16.7385L14.5655 11.8411L18.1241 8.3734C18.2168 8.28295 18.2823 8.16841 18.3132 8.0427C18.3442 7.91699 18.3394 7.78512 18.2994 7.66199C18.2594 7.53886 18.1858 7.42937 18.0868 7.34587C17.9879 7.26238 17.8675 7.20822 17.7394 7.18949H17.738Z", fill: "url(#".concat(uniqueId, ")") }));
        }));
    };
    return Rating;
}(react_1.default.Component));
exports.Rating = Rating;
