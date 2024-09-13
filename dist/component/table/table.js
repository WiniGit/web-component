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
exports.Table = exports.TbBody = exports.TbHeader = exports.TbRow = exports.TbCell = exports.CellAlignItems = void 0;
var react_1 = __importDefault(require("react"));
require("./table.css");
var CellAlignItems;
(function (CellAlignItems) {
    CellAlignItems["start"] = "start";
    CellAlignItems["center"] = "center";
    CellAlignItems["end"] = "end";
})(CellAlignItems = exports.CellAlignItems || (exports.CellAlignItems = {}));
var TbCell = /** @class */ (function (_super) {
    __extends(TbCell, _super);
    function TbCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TbCell.prototype.render = function () {
        var _a, _b;
        return react_1.default.createElement("td", { onClick: this.props.onClick, style: this.props.style, "align-cell": (_a = this.props.align) !== null && _a !== void 0 ? _a : CellAlignItems.start, className: "tb-cell ".concat((_b = this.props.className) !== null && _b !== void 0 ? _b : '', " ").concat(this.props.fixed ? 'tb-cell-fixed' : '') }, this.props.children);
    };
    return TbCell;
}(react_1.default.Component));
exports.TbCell = TbCell;
var TbRow = /** @class */ (function (_super) {
    __extends(TbRow, _super);
    function TbRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TbRow.prototype.render = function () {
        var _this = this;
        var _a, _b;
        return react_1.default.createElement("tr", { style: this.props.style, className: "tb-row ".concat((_a = this.props.className) !== null && _a !== void 0 ? _a : ""), onClick: this.props.onClick }, ((_b = this.props.children) !== null && _b !== void 0 ? _b : []).map(function (e, i) {
            var _a, _b;
            var ox = 0;
            if (_this.props.children && i > 0 && i < (_this.props.children.length - 1)) {
                ox = "calc(".concat(_this.props.children.slice(0, i).map(function (tb) {
                    var _a, _b, _c;
                    var wValue = (_b = (_a = tb.props.style) === null || _a === void 0 ? void 0 : _a.minWidth) !== null && _b !== void 0 ? _b : (_c = tb.props.style) === null || _c === void 0 ? void 0 : _c.width;
                    return wValue ? typeof wValue === 'number' ? "".concat(wValue, "px") : wValue : '60px';
                }).join(" + "), ")");
            }
            return react_1.default.createElement(TbCell, { key: "tb-cell-".concat(i), align: e.props.align, children: e.props.children, fixed: e.props.fixed, onClick: e.props.onClick, style: e.props.fixed ? (_this.props.children && i === _this.props.children.length - 1) ? __assign({ right: 0 }, ((_a = e.props.style) !== null && _a !== void 0 ? _a : {})) : __assign({ left: ox }, ((_b = e.props.style) !== null && _b !== void 0 ? _b : {})) : e.props.style, className: e.props.className });
        }));
    };
    return TbRow;
}(react_1.default.Component));
exports.TbRow = TbRow;
var TbHeader = /** @class */ (function (_super) {
    __extends(TbHeader, _super);
    function TbHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TbHeader.prototype.render = function () {
        var _this = this;
        var _a, _b;
        return react_1.default.createElement("thead", { style: this.props.style, className: "tb-header ".concat((_a = this.props.className) !== null && _a !== void 0 ? _a : "") },
            react_1.default.createElement("tr", null, ((_b = this.props.children) !== null && _b !== void 0 ? _b : []).map(function (e, i) {
                var _a, _b;
                var ox = 0;
                if (_this.props.children && i > 0 && i < (_this.props.children.length - 1)) {
                    ox = "calc(".concat(_this.props.children.slice(0, i).map(function (tb) { var _a; return ((_a = tb.props.style) === null || _a === void 0 ? void 0 : _a.width) ? typeof tb.props.style.width === 'number' ? "".concat(tb.props.style.width, "px") : tb.props.style.width : '60px'; }).join(" + "), ")");
                }
                return react_1.default.createElement(TbCell, { key: "tb-cell-".concat(i), align: e.props.align, children: e.props.children, onClick: e.props.onClick, fixed: e.props.fixed, style: e.props.fixed ? (_this.props.children && i === _this.props.children.length - 1) ? __assign({ right: 0 }, ((_a = e.props.style) !== null && _a !== void 0 ? _a : {})) : __assign({ left: ox }, ((_b = e.props.style) !== null && _b !== void 0 ? _b : {})) : e.props.style, className: e.props.className });
            })));
    };
    return TbHeader;
}(react_1.default.Component));
exports.TbHeader = TbHeader;
var TbBody = /** @class */ (function (_super) {
    __extends(TbBody, _super);
    function TbBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TbBody.prototype.render = function () {
        return react_1.default.createElement("tbody", null, this.props.children);
    };
    return TbBody;
}(react_1.default.Component));
exports.TbBody = TbBody;
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Table.prototype.render = function () {
        return react_1.default.createElement("table", { className: "custom-table ".concat(this.props.className), style: this.props.style }, this.props.children);
    };
    return Table;
}(react_1.default.Component));
exports.Table = Table;
