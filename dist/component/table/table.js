"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.TbBody = exports.TbHeader = exports.TbRow = exports.TbCell = exports.CellAlignItems = void 0;
const react_1 = __importDefault(require("react"));
require("./table.css");
var CellAlignItems;
(function (CellAlignItems) {
    CellAlignItems["start"] = "start";
    CellAlignItems["center"] = "center";
    CellAlignItems["end"] = "end";
})(CellAlignItems || (exports.CellAlignItems = CellAlignItems = {}));
class TbCell extends react_1.default.Component {
    render() {
        var _a, _b;
        return react_1.default.createElement("td", { id: this.props.id, onClick: this.props.onClick, style: this.props.style, "align-cell": (_a = this.props.align) !== null && _a !== void 0 ? _a : CellAlignItems.start, className: `tb-cell ${(_b = this.props.className) !== null && _b !== void 0 ? _b : ''} ${this.props.fixed ? 'tb-cell-fixed' : ''}` }, this.props.children);
    }
}
exports.TbCell = TbCell;
class TbRow extends react_1.default.Component {
    render() {
        var _a, _b;
        return react_1.default.createElement("tr", { id: this.props.id, style: this.props.style, className: `tb-row ${(_a = this.props.className) !== null && _a !== void 0 ? _a : ""}`, onClick: this.props.onClick }, ((_b = this.props.children) !== null && _b !== void 0 ? _b : []).map((e, i) => {
            var _a, _b;
            let ox = 0;
            if (this.props.children && i > 0 && i < (this.props.children.length - 1)) {
                ox = `calc(${this.props.children.slice(0, i).map(tb => {
                    var _a, _b, _c;
                    const wValue = (_b = (_a = tb.props.style) === null || _a === void 0 ? void 0 : _a.minWidth) !== null && _b !== void 0 ? _b : (_c = tb.props.style) === null || _c === void 0 ? void 0 : _c.width;
                    return wValue ? typeof wValue === 'number' ? `${wValue}px` : wValue : '60px';
                }).join(" + ")})`;
            }
            return react_1.default.createElement(TbCell, { id: e.props.id, key: `tb-cell-${i}`, align: e.props.align, children: e.props.children, fixed: e.props.fixed, onClick: e.props.onClick, style: e.props.fixed ? (this.props.children && i === this.props.children.length - 1) ? Object.assign({ right: 0 }, ((_a = e.props.style) !== null && _a !== void 0 ? _a : {})) : Object.assign({ left: ox }, ((_b = e.props.style) !== null && _b !== void 0 ? _b : {})) : e.props.style, className: e.props.className });
        }));
    }
}
exports.TbRow = TbRow;
class TbHeader extends react_1.default.Component {
    render() {
        var _a, _b;
        return react_1.default.createElement("thead", { style: this.props.style, className: `tb-header ${(_a = this.props.className) !== null && _a !== void 0 ? _a : ""}` },
            react_1.default.createElement("tr", null, ((_b = this.props.children) !== null && _b !== void 0 ? _b : []).map((e, i) => {
                var _a, _b;
                let ox = 0;
                if (this.props.children && i > 0 && i < (this.props.children.length - 1)) {
                    ox = `calc(${this.props.children.slice(0, i).map(tb => { var _a; return ((_a = tb.props.style) === null || _a === void 0 ? void 0 : _a.width) ? typeof tb.props.style.width === 'number' ? `${tb.props.style.width}px` : tb.props.style.width : '60px'; }).join(" + ")})`;
                }
                return react_1.default.createElement(TbCell, { id: e.props.id, key: `tb-cell-${i}`, align: e.props.align, children: e.props.children, onClick: e.props.onClick, fixed: e.props.fixed, style: e.props.fixed ? (this.props.children && i === this.props.children.length - 1) ? Object.assign({ right: 0 }, ((_a = e.props.style) !== null && _a !== void 0 ? _a : {})) : Object.assign({ left: ox }, ((_b = e.props.style) !== null && _b !== void 0 ? _b : {})) : e.props.style, className: e.props.className });
            })));
    }
}
exports.TbHeader = TbHeader;
class TbBody extends react_1.default.Component {
    render() {
        return react_1.default.createElement("tbody", { id: this.props.id }, this.props.children);
    }
}
exports.TbBody = TbBody;
class Table extends react_1.default.Component {
    render() {
        return react_1.default.createElement("table", { id: this.props.id, className: `custom-table ${this.props.className}`, style: this.props.style }, this.props.children);
    }
}
exports.Table = Table;
