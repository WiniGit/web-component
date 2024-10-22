"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSimple = void 0;
var react_1 = __importDefault(require("react"));
require("./card.css");
function CardSimple(_a) {
    var avatar = _a.avatar, heading = _a.heading, subHeading = _a.subHeading, content = _a.content, action = _a.action, style = _a.style, className = _a.className;
    return react_1.default.createElement("div", { className: "card-new-grid ".concat(className !== null && className !== void 0 ? className : ''), style: style },
        react_1.default.createElement("div", { className: "list-item" },
            react_1.default.createElement("div", { className: "media" },
                react_1.default.createElement("div", { className: "media-styleimage-circle" }, avatar !== null && avatar !== void 0 ? avatar : react_1.default.createElement("img", { className: "media-styleimage-circle-child", src: "https://via.placeholder.com/40x40" }))),
            react_1.default.createElement("div", { className: "content" },
                react_1.default.createElement("div", { className: "content-title-parent" },
                    heading ? react_1.default.createElement("div", { className: "content-title" }, heading) : react_1.default.createElement("div", { className: "content-title" }, "name"),
                    subHeading ? react_1.default.createElement("div", { className: "subtitle" }, subHeading) : react_1.default.createElement("div", { className: "subtitle" }, "sub"))),
            react_1.default.createElement("div", { className: "media1" },
                react_1.default.createElement("svg", { onClick: function () { }, width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    react_1.default.createElement("path", { d: "M3.60698 5.34049C3.35391 5.10851 2.94912 5.10851 2.69605 5.34049C2.43465 5.58011 2.43465 5.97512 2.69605 6.21474L7.54454 10.6592C7.7976 10.8912 8.2024 10.8912 8.45546 10.6592L13.3039 6.21474C13.5654 5.97512 13.5654 5.58011 13.3039 5.34049C13.0509 5.10851 12.6461 5.10851 12.393 5.34049L8 9.36743L3.60698 5.34049Z", fill: "#61616B" })))),
        react_1.default.createElement("div", { className: "frame-parent" }, content !== null && content !== void 0 ? content : react_1.default.createElement("div", { className: "content-parent" },
            react_1.default.createElement("div", { className: "content1" },
                react_1.default.createElement("div", { className: "content-title-wrapper" },
                    react_1.default.createElement("div", { className: "content-title" }, "value1")),
                react_1.default.createElement("div", { className: "body-content" }, "content1")),
            react_1.default.createElement("div", { className: "content1" },
                react_1.default.createElement("div", { className: "content-title-wrapper" },
                    react_1.default.createElement("div", { className: "content-title" }, "value2")),
                react_1.default.createElement("div", { className: "body-content" }, "content2")))),
        react_1.default.createElement("div", null, action !== null && action !== void 0 ? action : react_1.default.createElement("div", null)));
}
exports.CardSimple = CardSimple;
