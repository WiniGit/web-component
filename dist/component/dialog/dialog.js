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
exports.Dialog = exports.showDialog = exports.DialogAlignment = void 0;
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
require("./dialog.css");
var index_1 = require("../../index");
var DialogAlignment;
(function (DialogAlignment) {
    DialogAlignment["start"] = "start";
    DialogAlignment["center"] = "center";
    DialogAlignment["end"] = "end";
})(DialogAlignment = exports.DialogAlignment || (exports.DialogAlignment = {}));
var showDialog = function (_a) {
    var ref = _a.ref, title = _a.title, status = _a.status, content = _a.content, onSubmit = _a.onSubmit, submitTitle = _a.submitTitle, alignment = _a.alignment;
    ref.current.showDialogNoti({
        title: title !== null && title !== void 0 ? title : '',
        status: status !== null && status !== void 0 ? status : 1 /* ComponentStatus.INFOR */,
        content: content !== null && content !== void 0 ? content : '',
        onSubmit: onSubmit !== null && onSubmit !== void 0 ? onSubmit : (function () { }),
        submitTitle: submitTitle,
        alignment: alignment
    });
};
exports.showDialog = showDialog;
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false,
            title: '',
            status: 1 /* ComponentStatus.INFOR */,
            content: '',
            onSubmit: function () { }
        };
        return _this;
    }
    Dialog.prototype.showDialogNoti = function (data) {
        this.setState(__assign({ open: true }, data));
    };
    Dialog.prototype.closeDialog = function () {
        this.setState({ open: false });
    };
    Dialog.prototype.render = function () {
        var _this = this;
        var _a;
        return (react_1.default.createElement(react_1.default.Fragment, null, this.state.open &&
            react_dom_1.default.createPortal(react_1.default.createElement("div", { className: 'dialog-overlay' },
                react_1.default.createElement("div", { className: 'dialog-container col', style: { width: '41.4rem', alignItems: this.state.alignment }, "dialog-type": this.state.status, onClick: function (e) { return e.stopPropagation(); } },
                    react_1.default.createElement("div", { key: 'dialog-body', className: 'dialog-body col', style: { alignItems: 'inherit' } },
                        react_1.default.createElement("div", { className: 'dialog-status row' }, (0, index_1.getStatusIcon)(this.state.status)),
                        react_1.default.createElement("div", { className: 'dialog-title', style: { textAlign: this.state.alignment === DialogAlignment.center ? 'center' : 'start' } }, this.state.title),
                        react_1.default.createElement("div", { className: 'dialog-content', style: { textAlign: this.state.alignment === DialogAlignment.center ? 'center' : 'start' } }, this.state.content)),
                    react_1.default.createElement("div", { key: 'dialog-footer', className: 'dialog-footer row' },
                        react_1.default.createElement("button", { type: 'button', style: this.state.alignment === DialogAlignment.center ? { flex: 1, width: '100%' } : undefined, onClick: function () { return _this.setState({ open: false }); }, className: 'dialog-action' }, "Quay l\u1EA1i"),
                        react_1.default.createElement("button", { type: 'button', style: this.state.alignment === DialogAlignment.center ? { flex: 1, width: '100%' } : undefined, onClick: function () {
                                _this.state.onSubmit();
                                _this.setState({ open: false });
                            }, className: 'dialog-action dialog-submit' }, (_a = this.state.submitTitle) !== null && _a !== void 0 ? _a : 'Xác nhận')),
                    react_1.default.createElement("button", { type: 'button', onClick: function () { return _this.setState({ open: false }); }, className: 'dialog-close-btn row' },
                        react_1.default.createElement("svg", { width: '100%', height: '100%', viewBox: '0 0 20 20', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', style: { width: '2rem', height: '2rem' } },
                            react_1.default.createElement("path", { fillRule: 'evenodd', clipRule: 'evenodd', d: 'M16.4223 4.7559C16.7477 4.43047 16.7477 3.90283 16.4223 3.57739C16.0968 3.25195 15.5692 3.25195 15.2438 3.57739L9.99967 8.82147L4.7556 3.57739C4.43016 3.25195 3.90252 3.25195 3.57709 3.57739C3.25165 3.90283 3.25165 4.43047 3.57709 4.7559L8.82116 9.99998L3.57709 15.2441C3.25165 15.5695 3.25165 16.0971 3.57709 16.4226C3.90252 16.748 4.43016 16.748 4.7556 16.4226L9.99967 11.1785L15.2438 16.4226C15.5692 16.748 16.0968 16.748 16.4223 16.4226C16.7477 16.0971 16.7477 15.5695 16.4223 15.2441L11.1782 9.99998L16.4223 4.7559Z', fill: '#00204D', fillOpacity: 0.6 }))))), document.body)));
    };
    return Dialog;
}(react_1.default.Component));
exports.Dialog = Dialog;
