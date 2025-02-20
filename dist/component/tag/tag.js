"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const react_1 = __importDefault(require("react"));
const text_1 = require("../text/text");
const tag_module_css_1 = __importDefault(require("./tag.module.css"));
class Tag extends react_1.default.Component {
    render() {
        var _a, _b;
        return react_1.default.createElement("div", { id: this.props.id, "tag-type": (_a = this.props.status) !== null && _a !== void 0 ? _a : 'default', className: `${tag_module_css_1.default['tag-container']} row ${this.props.onClick ? tag_module_css_1.default['type-button'] : ''} ${this.props.disabled ? tag_module_css_1.default['disabled'] : ""} ${(_b = this.props.className) !== null && _b !== void 0 ? _b : "button-text-6"} `, style: this.props.style, onClick: this.props.onClick },
            this.props.prefix,
            react_1.default.createElement(text_1.Text, { maxLine: 1, className: tag_module_css_1.default['tag-label'] }, this.props.title),
            this.props.suffix);
    }
}
exports.Tag = Tag;
