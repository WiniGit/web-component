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
exports.CustomSlider = void 0;
var react_1 = __importDefault(require("react"));
var react_awesome_slider_1 = __importDefault(require("react-awesome-slider"));
require("./slider.css");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var CustomSlider = /** @class */ (function (_super) {
    __extends(CustomSlider, _super);
    function CustomSlider(props) {
        var _this = this;
        var _a;
        _this = _super.call(this, props) || this;
        _this.nextPage = function () {
            var _a, _b, _c;
            var index = (_b = (_a = _this.state) === null || _a === void 0 ? void 0 : _a.page) !== null && _b !== void 0 ? _b : 0;
            if (((_c = _this.props) === null || _c === void 0 ? void 0 : _c.children) && (index + 1) < _this.props.children.length) {
                _this.setState({ page: index + 1 });
                if (_this.props.onChage)
                    _this.props.onChage(index + 1);
            }
        };
        _this.previousPage = function () {
            var _a, _b, _c;
            var index = (_b = (_a = _this.state) === null || _a === void 0 ? void 0 : _a.page) !== null && _b !== void 0 ? _b : 0;
            if (((_c = _this.props) === null || _c === void 0 ? void 0 : _c.children) && index > 0) {
                _this.setState({ page: index - 1 });
                if (_this.props.onChage)
                    _this.props.onChage(index - 1);
            }
        };
        _this.autoPlay = function () {
            var _a, _b, _c;
            var index = (_b = (_a = _this.state) === null || _a === void 0 ? void 0 : _a.page) !== null && _b !== void 0 ? _b : 0;
            if (((_c = _this.props) === null || _c === void 0 ? void 0 : _c.children) && (index + 1) === _this.props.children.length)
                index = -1;
            _this.setState({ page: index + 1 });
            if (_this.props.onChage)
                _this.props.onChage(index + 1);
        };
        (_a = props.buttons) !== null && _a !== void 0 ? _a : (props.buttons = true);
        _this.state = {
            page: 0
        };
        _this.autoPlay = _this.autoPlay.bind(_this);
        return _this;
    }
    CustomSlider.prototype.componentDidMount = function () {
        var _a;
        if (this.props.autoPlay)
            this.intervalPlay = setInterval(this.autoPlay, (_a = this.props.duration) !== null && _a !== void 0 ? _a : 2000);
    };
    CustomSlider.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.autoPlay !== prevProps.autoPlay && !this.props.autoPlay)
            clearInterval(this.intervalPlay);
    };
    CustomSlider.prototype.render = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return react_1.default.createElement(react_awesome_slider_1.default, { style: this.props.style, className: "custom-slider-container ".concat((_a = this.props.className) !== null && _a !== void 0 ? _a : ''), selected: this.state.page, bullets: false, buttons: this.props.buttons ? (this.props.children && ((_b = this.props.children) === null || _b === void 0 ? void 0 : _b.length) > 1) : false, organicArrows: false, buttonContentLeft: (_c = this.props.prevButton) !== null && _c !== void 0 ? _c : react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCircleChevronLeft, style: { color: (_d = this.props.iconColor) !== null && _d !== void 0 ? _d : '#ffffff', fontSize: (_e = this.props.iconSize) !== null && _e !== void 0 ? _e : '2.4rem' } }), buttonContentRight: (_f = this.props.nextButton) !== null && _f !== void 0 ? _f : react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCircleChevronRight, style: { color: (_g = this.props.iconColor) !== null && _g !== void 0 ? _g : '#ffffff', fontSize: (_h = this.props.iconSize) !== null && _h !== void 0 ? _h : '2.4rem' } }) }, this.props.children);
    };
    return CustomSlider;
}(react_1.default.Component));
exports.CustomSlider = CustomSlider;
