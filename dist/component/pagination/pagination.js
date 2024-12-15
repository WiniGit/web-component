"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
var react_1 = __importStar(require("react"));
var react_paginate_1 = __importDefault(require("react-paginate"));
var pagination_module_css_1 = __importDefault(require("./pagination.module.css"));
var select1_1 = require("../select1/select1");
var text_1 = require("../text/text");
var text_field_1 = require("../text-field/text-field");
var winicon_1 = require("../wini-icon/winicon");
var react_i18next_1 = require("react-i18next");
function Pagination(_a) {
    var id = _a.id, currentPage = _a.currentPage, itemPerPage = _a.itemPerPage, totalItem = _a.totalItem, onChangePage = _a.onChangePage, _b = _a.hidePageSize, hidePageSize = _b === void 0 ? false : _b, _c = _a.hideGoToPage, hideGoToPage = _c === void 0 ? false : _c, style = _a.style;
    var goToPageRef = (0, react_1.useRef)();
    var t = (0, react_i18next_1.useTranslation)().t;
    (0, react_1.useEffect)(function () {
        if (goToPageRef.current) {
            var _inputPage = goToPageRef.current.getInput();
            if (_inputPage)
                _inputPage.value = currentPage.toString();
        }
    }, [currentPage]);
    if (currentPage > 1 && (totalItem === 0 || (Math.floor(totalItem / itemPerPage) + (totalItem % itemPerPage === 0 ? 0 : 1)) < currentPage)) {
        onChangePage(1, itemPerPage);
        return react_1.default.createElement("div", null);
    }
    else if (totalItem > 0) {
        return react_1.default.createElement("div", { id: id, className: "".concat(pagination_module_css_1.default['custom-pagination'], " row"), style: style },
            hidePageSize ? null : react_1.default.createElement("div", { className: "row", style: { gap: '0.8rem' } },
                react_1.default.createElement(select1_1.Select1, { readOnly: true, placeholder: itemPerPage.toString(), options: [10, 20, 50, 80, 100, 150, 200].map(function (item, _) { return { id: item, name: item }; }), style: { borderRadius: '0.4rem', width: '5.6rem', padding: '0 0.8rem', height: '2.4rem' }, onChange: function (ev) {
                        onChangePage(currentPage, isNaN(parseInt(ev.id)) ? itemPerPage : parseInt(ev.id));
                    } }),
                react_1.default.createElement(text_1.Text, { className: "body-3" }, t("ofItems", { totalItem: totalItem }))),
            react_1.default.createElement("div", { style: { flex: 1 } }),
            react_1.default.createElement(react_paginate_1.default, { onPageChange: function (ev) {
                    onChangePage(ev.selected + 1, itemPerPage);
                }, forcePage: currentPage - 1, breakClassName: "row button-text-3", breakLabel: "...", pageCount: Math.ceil(totalItem / itemPerPage), previousClassName: "row", previousLabel: react_1.default.createElement(winicon_1.Winicon, { src: "fill/arrows/left-arrow", size: "1.4rem" }), nextClassName: "row", nextLabel: react_1.default.createElement(winicon_1.Winicon, { src: "fill/arrows/right-arrow", size: "1.4rem" }), containerClassName: "".concat(pagination_module_css_1.default['pagination'], " row"), pageClassName: "row button-text-3", activeClassName: pagination_module_css_1.default['active'], hrefBuilder: function (pageIndex) {
                    return pageIndex >= 1 && pageIndex <= Math.ceil(totalItem / itemPerPage) ? "/page/".concat(pageIndex) : '#';
                }, renderOnZeroPageCount: null }),
            hideGoToPage ? null : react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: { height: '1.6rem', backgroundColor: "var(--neutral-bolder-border-color)", width: 1 } }),
                react_1.default.createElement(text_1.Text, { className: "label-3" },
                    t("go"),
                    " ",
                    t("page").toLowerCase()),
                react_1.default.createElement(text_field_1.TextField, { ref: goToPageRef, style: { width: '4.8rem', textAlign: "center", padding: 0, height: '2.4rem', borderRadius: '0.4rem' }, className: "body-3", type: "number", onBlur: function (ev) {
                        var _tmp = ev.target.value.trim().length ? parseInt(ev.target.value.trim()) : undefined;
                        if (_tmp && !isNaN(_tmp) && _tmp > 0 && _tmp <= Math.ceil(totalItem / itemPerPage)) {
                            onChangePage(_tmp, itemPerPage);
                        }
                        else
                            ev.target.value = "";
                    } })));
    }
    else
        return react_1.default.createElement("div", { id: id });
}
exports.Pagination = Pagination;
