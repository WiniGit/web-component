"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
var react_1 = __importDefault(require("react"));
var react_paginate_1 = __importDefault(require("react-paginate"));
require("./pagination.css");
var index_1 = require("../../index");
function Pagination(_a) {
    var id = _a.id, currentPage = _a.currentPage, itemPerPage = _a.itemPerPage, totalItem = _a.totalItem, onChangePage = _a.onChangePage, _b = _a.hiddenPageSize, hiddenPageSize = _b === void 0 ? false : _b, _c = _a.hiddenTotal, hiddenTotal = _c === void 0 ? false : _c, style = _a.style;
    if (currentPage > 1 && (totalItem === 0 || (Math.floor(totalItem / itemPerPage) + (totalItem % itemPerPage === 0 ? 0 : 1)) < currentPage)) {
        onChangePage(1, itemPerPage);
        return react_1.default.createElement("div", null);
    }
    if (totalItem > 0) {
        return (react_1.default.createElement("div", { id: id, className: "row custom-pagination", style: style },
            hiddenTotal ? null : react_1.default.createElement(index_1.Text, { className: "regular2" },
                "Hi\u1EC3n th\u1ECB ",
                itemPerPage * (currentPage - 1) + 1,
                "-",
                ((itemPerPage * (currentPage - 1) + itemPerPage) > totalItem) ? totalItem : (itemPerPage * (currentPage - 1) + itemPerPage),
                " trong t\u1ED5ng s\u1ED1 ",
                totalItem,
                " b\u1EA3n ghi"),
            react_1.default.createElement("div", { className: "row " },
                hiddenPageSize ? null : react_1.default.createElement("div", { className: "row items-per-page-container" },
                    react_1.default.createElement(index_1.Text, { className: "regular2" }, "Items/page"),
                    react_1.default.createElement("div", { className: "row" },
                        react_1.default.createElement(index_1.Select1, { readOnly: true, style: { width: '8.6rem' }, placeholder: itemPerPage.toString(), options: [10, 20, 50, 100, 200].map(function (item, _) { return { id: item, name: item }; }), onChange: function (ev) {
                                onChangePage(currentPage, isNaN(parseInt(ev.id)) ? itemPerPage : parseInt(ev.id));
                            } }))),
                react_1.default.createElement(react_paginate_1.default, { breakLabel: "...", nextLabel: "Next", onPageChange: function (ev) {
                        onChangePage(ev.selected + 1, itemPerPage);
                    }, forcePage: currentPage - 1, 
                    // initialPage={currentPage - 1}
                    pageCount: Math.ceil(totalItem / itemPerPage), previousLabel: "Previous", containerClassName: "pagination row", pageClassName: "", pageLinkClassName: "nav-link", previousClassName: "nav-link", previousLinkClassName: "nav-link", nextClassName: "nav-link regular2", nextLinkClassName: "nav-link", activeClassName: "active", hrefBuilder: function (pageIndex) {
                        return pageIndex >= 1 && pageIndex <= Math.ceil(totalItem / itemPerPage) ? "/page/".concat(pageIndex) : '#';
                    }, renderOnZeroPageCount: null }))));
    }
    else {
        return (react_1.default.createElement("div", { id: id }));
    }
}
exports.Pagination = Pagination;
