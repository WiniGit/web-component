"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSlider = void 0;
const react_1 = __importDefault(require("react"));
const react_awesome_slider_1 = __importDefault(require("react-awesome-slider"));
require("./slider.css");
const winicon_1 = require("../wini-icon/winicon");
class CustomSlider extends react_1.default.Component {
    constructor(props) {
        var _a;
        super(props);
        this.nextPage = () => {
            var _a, _b, _c;
            let index = (_b = (_a = this.state) === null || _a === void 0 ? void 0 : _a.page) !== null && _b !== void 0 ? _b : 0;
            if (((_c = this.props) === null || _c === void 0 ? void 0 : _c.children) && (index + 1) < this.props.children.length) {
                this.setState({ page: index + 1 });
                if (this.props.onChage)
                    this.props.onChage(index + 1);
            }
        };
        this.previousPage = () => {
            var _a, _b, _c;
            let index = (_b = (_a = this.state) === null || _a === void 0 ? void 0 : _a.page) !== null && _b !== void 0 ? _b : 0;
            if (((_c = this.props) === null || _c === void 0 ? void 0 : _c.children) && index > 0) {
                this.setState({ page: index - 1 });
                if (this.props.onChage)
                    this.props.onChage(index - 1);
            }
        };
        this.autoPlay = () => {
            var _a, _b, _c;
            let index = (_b = (_a = this.state) === null || _a === void 0 ? void 0 : _a.page) !== null && _b !== void 0 ? _b : 0;
            if (((_c = this.props) === null || _c === void 0 ? void 0 : _c.children) && (index + 1) === this.props.children.length)
                index = -1;
            this.setState({ page: index + 1 });
            if (this.props.onChage)
                this.props.onChage(index + 1);
        };
        (_a = props.buttons) !== null && _a !== void 0 ? _a : (props.buttons = true);
        this.state = {
            page: 0
        };
        this.autoPlay = this.autoPlay.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }
    componentDidMount() {
        var _a;
        if (this.props.autoPlay)
            this.intervalPlay = setInterval(this.autoPlay, (_a = this.props.duration) !== null && _a !== void 0 ? _a : 2000);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.autoPlay !== prevProps.autoPlay && !this.props.autoPlay)
            clearInterval(this.intervalPlay);
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        return react_1.default.createElement(react_awesome_slider_1.default, { style: this.props.style, className: `custom-slider-container ${(_a = this.props.className) !== null && _a !== void 0 ? _a : ''}`, selected: this.state.page, bullets: false, buttons: this.props.buttons ? (this.props.children && ((_b = this.props.children) === null || _b === void 0 ? void 0 : _b.length) > 1) : false, organicArrows: false, buttonContentLeft: (_c = this.props.prevButton) !== null && _c !== void 0 ? _c : react_1.default.createElement(winicon_1.Winicon, { src: "fill/arrows/circle-ctrl-left", size: "2.4rem", color: (_d = this.props.iconColor) !== null && _d !== void 0 ? _d : "var(--neutral-absolute-background-color)" }), buttonContentRight: (_e = this.props.nextButton) !== null && _e !== void 0 ? _e : react_1.default.createElement(winicon_1.Winicon, { src: "fill/arrows/circle-ctrl-right", size: "2.4rem", color: (_f = this.props.iconColor) !== null && _f !== void 0 ? _f : "var(--neutral-absolute-background-color)" }) }, this.props.children);
    }
}
exports.CustomSlider = CustomSlider;
