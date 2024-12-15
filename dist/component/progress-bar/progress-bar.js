"use strict";
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
exports.ProgressBar = ProgressBar;
var react_1 = require("react");
var progress_bar_module_css_1 = __importDefault(require("./progress-bar.module.css"));
var react_2 = __importDefault(require("react"));
var index_1 = require("../../index");
function ProgressBar(_a) {
    var id = _a.id, _b = _a.status, status = _b === void 0 ? index_1.ComponentStatus.INFOR : _b, _c = _a.percent, percent = _c === void 0 ? 100 : _c, titleText = _a.titleText, title = _a.title, _d = _a.hideTitle, hideTitle = _d === void 0 ? false : _d, _e = _a.progressBarOnly, progressBarOnly = _e === void 0 ? false : _e, _f = _a.fullColor, fullColor = _f === void 0 ? 'var(--neutral-main-background-color)' : _f, _g = _a.percentColor, percentColor = _g === void 0 ? 'var(--primary-main-color)' : _g, style = _a.style, progressBarStyle = _a.progressBarStyle;
    var _h = (0, react_1.useState)(true), openDetails = _h[0], setOpenDetails = _h[1];
    return react_2.default.createElement("div", { id: id, className: "col ".concat(progress_bar_module_css_1.default["progress-bar-container"]), style: style ? __assign({ padding: progressBarOnly ? '0' : '1.6rem 2.4rem' }, style) : { padding: progressBarOnly ? '0' : '1.6rem 2.4rem' } },
        (hideTitle || progressBarOnly) ? null : (title !== null && title !== void 0 ? title : react_2.default.createElement("div", { className: "row ".concat(progress_bar_module_css_1.default["progress-bar-title"]) },
            react_2.default.createElement("div", { className: "heading-8" }, titleText),
            react_2.default.createElement(index_1.Winicon, { src: openDetails ? "fill/arrows/down-arrow" : "fill/arrows/up-arrow", onClick: function () { setOpenDetails(!openDetails); } }))),
        openDetails ? react_2.default.createElement("div", { className: "row ".concat(progress_bar_module_css_1.default["progress-bar-tile"]) },
            react_2.default.createElement("div", { className: progress_bar_module_css_1.default["progress-bar-value"], style: __assign({ '--percent-color': percentColor, '--full-color': fullColor, '--percent': "".concat(percent, "%") }, (progressBarStyle !== null && progressBarStyle !== void 0 ? progressBarStyle : {})) }),
            progressBarOnly || status === index_1.ComponentStatus.INFOR ? null : react_2.default.createElement("div", { className: "".concat(progress_bar_module_css_1.default["status-icon"]) }, (0, index_1.getStatusIcon)(status)),
            progressBarOnly ? null : react_2.default.createElement("div", { className: 'label-4' },
                percent,
                "/100")) : null);
}
