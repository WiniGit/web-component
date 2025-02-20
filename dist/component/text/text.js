"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const react_1 = __importDefault(require("react"));
require("./text.css");
class Text extends react_1.default.Component {
    render() {
        var _a, _b, _c;
        let convertStyle = (_a = this.props.style) !== null && _a !== void 0 ? _a : {};
        if (this.props.maxLine) {
            convertStyle = Object.assign(Object.assign({}, convertStyle), { '--max-line': this.props.maxLine });
        }
        return this.props.html ? react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.html }, id: this.props.id, onMouseOver: this.props.onHover, onClick: this.props.onClick, className: `comp-text innerhtml ${this.props.onClick ? 'type-button' : ''} ${(_b = this.props.className) !== null && _b !== void 0 ? _b : ''}`, style: convertStyle }) :
            react_1.default.createElement("div", { id: this.props.id, onMouseOver: this.props.onHover, onClick: this.props.onClick, className: `comp-text ${this.props.onClick ? 'type-button' : ''} ${(_c = this.props.className) !== null && _c !== void 0 ? _c : ''}`, style: convertStyle }, this.props.children);
    }
}
exports.Text = Text;
