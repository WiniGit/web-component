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
exports.Tag = void 0;
var react_1 = __importDefault(require("react"));
var text_1 = require("../text/text");
var tag_module_css_1 = __importDefault(require("./tag.module.css"));
var component_status_1 = require("../component-status");
var Tag = /** @class */ (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tag.prototype.render = function () {
        var _a, _b;
        return react_1.default.createElement("div", { id: this.props.id, "tag-type": (_a = this.state) !== null && _a !== void 0 ? _a : component_status_1.ComponentStatus.INFOR, className: "".concat(tag_module_css_1.default['tag-container'], " row ").concat(this.props.onClick ? tag_module_css_1.default['type-button'] : '', " ").concat(this.props.disabled ? tag_module_css_1.default['disabled'] : "", " ").concat((_b = this.props.className) !== null && _b !== void 0 ? _b : "button-text-2", " "), style: this.props.style, onClick: this.props.onClick },
            this.props.prefix,
            react_1.default.createElement(text_1.Text, { maxLine: 1, className: tag_module_css_1.default['tag-label'] }, this.props.title),
            this.props.suffix);
    };
    return Tag;
}(react_1.default.Component));
exports.Tag = Tag;
