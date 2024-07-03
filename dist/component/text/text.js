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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
var react_1 = __importDefault(require("react"));
require("./text.css");
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Text.prototype.render = function () {
        var _a, _b;
        var convertStyle = (_a = this.props.style) !== null && _a !== void 0 ? _a : {};
        if (this.props.maxLine) {
            convertStyle = __assign(__assign({}, convertStyle), { '--max-line': this.props.maxLine });
        }
        return react_1.default.createElement("div", { onMouseOver: this.props.onHover, onClick: this.props.onClick, className: "comp-text ".concat(this.props.onClick ? 'type-button' : '', " ").concat((_b = this.props.className) !== null && _b !== void 0 ? _b : ''), style: convertStyle }, this.props.children);
    };
    return Text;
}(react_1.default.Component));
exports.Text = Text;
