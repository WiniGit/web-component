"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = ProgressBar;
const react_1 = require("react");
const progress_bar_module_css_1 = __importDefault(require("./progress-bar.module.css"));
const react_2 = __importDefault(require("react"));
const index_1 = require("../../index");
function ProgressBar({ id, status = index_1.ComponentStatus.INFOR, percent = 100, titleText, title, hideTitle = false, progressBarOnly = false, fullColor = 'var(--neutral-main-background-color)', percentColor = 'var(--primary-main-color)', style, progressBarStyle }) {
    const [openDetails, setOpenDetails] = (0, react_1.useState)(true);
    return react_2.default.createElement("div", { id: id, className: `col ${progress_bar_module_css_1.default["progress-bar-container"]}`, style: style ? Object.assign({ padding: progressBarOnly ? '0' : '1.6rem 2.4rem' }, style) : { padding: progressBarOnly ? '0' : '1.6rem 2.4rem' } },
        (hideTitle || progressBarOnly) ? null : (title !== null && title !== void 0 ? title : react_2.default.createElement("div", { className: `row ${progress_bar_module_css_1.default["progress-bar-title"]}` },
            react_2.default.createElement("div", { className: "heading-8" }, titleText),
            react_2.default.createElement(index_1.Winicon, { src: openDetails ? "fill/arrows/down-arrow" : "fill/arrows/up-arrow", onClick: () => { setOpenDetails(!openDetails); } }))),
        openDetails ? react_2.default.createElement("div", { className: `row ${progress_bar_module_css_1.default["progress-bar-tile"]}` },
            react_2.default.createElement("div", { className: progress_bar_module_css_1.default["progress-bar-value"], style: Object.assign({ '--percent-color': percentColor, '--full-color': fullColor, '--percent': `${percent}%` }, (progressBarStyle !== null && progressBarStyle !== void 0 ? progressBarStyle : {})) }),
            progressBarOnly || status === index_1.ComponentStatus.INFOR ? null : react_2.default.createElement("div", { className: `${progress_bar_module_css_1.default["status-icon"]}` }, (0, index_1.getStatusIcon)(status)),
            progressBarOnly ? null : react_2.default.createElement("div", { className: 'label-4' },
                percent,
                "/100")) : null);
}
