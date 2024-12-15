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
var dialog_module_css_1 = __importDefault(require("./dialog.module.css"));
var index_1 = require("../../index");
var react_i18next_1 = require("react-i18next");
var DialogAlignment;
(function (DialogAlignment) {
    DialogAlignment["start"] = "start";
    DialogAlignment["center"] = "center";
    DialogAlignment["end"] = "end";
})(DialogAlignment || (exports.DialogAlignment = DialogAlignment = {}));
var showDialog = function (_a) {
    var ref = _a.ref, title = _a.title, status = _a.status, content = _a.content, onSubmit = _a.onSubmit, submitTitle = _a.submitTitle, cancelTitle = _a.cancelTitle, alignment = _a.alignment;
    ref.current.showDialogNoti({
        title: title !== null && title !== void 0 ? title : '',
        status: status !== null && status !== void 0 ? status : index_1.ComponentStatus.INFOR,
        content: content !== null && content !== void 0 ? content : '',
        onSubmit: onSubmit !== null && onSubmit !== void 0 ? onSubmit : (function () { }),
        submitTitle: submitTitle,
        cancelTitle: cancelTitle,
        alignment: alignment
    });
};
exports.showDialog = showDialog;
var TDialog = /** @class */ (function (_super) {
    __extends(TDialog, _super);
    function TDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            open: false,
            title: '',
            status: index_1.ComponentStatus.INFOR,
            content: '',
            onSubmit: function () { }
        };
        return _this;
    }
    TDialog.prototype.showDialogNoti = function (data) {
        this.setState(__assign({ open: true }, data));
    };
    TDialog.prototype.closeDialog = function () {
        this.setState({ open: false });
    };
    TDialog.prototype.render = function () {
        var _this = this;
        var _a, _b;
        var t = this.props.t;
        return (react_1.default.createElement(react_1.default.Fragment, null, this.state.open &&
            react_dom_1.default.createPortal(react_1.default.createElement("div", { className: dialog_module_css_1.default['dialog-overlay'] },
                react_1.default.createElement("div", { className: "".concat(dialog_module_css_1.default['dialog-container'], " col"), style: { width: '41.4rem', alignItems: this.state.alignment }, "dialog-type": this.state.status, onClick: function (e) { return e.stopPropagation(); } },
                    react_1.default.createElement("div", { className: "".concat(dialog_module_css_1.default['dialog-body'], " col"), style: { alignItems: 'inherit' } },
                        react_1.default.createElement("div", { className: "".concat(dialog_module_css_1.default['dialog-status'], " row") }, (0, index_1.getStatusIcon)(this.state.status)),
                        react_1.default.createElement("div", { className: 'col' },
                            react_1.default.createElement(index_1.Text, { className: 'heading-6', style: { textAlign: this.state.alignment === DialogAlignment.center ? 'center' : 'start' } }, this.state.title),
                            react_1.default.createElement(index_1.Text, { className: 'body-3', style: { textAlign: this.state.alignment === DialogAlignment.center ? 'center' : 'start' } }, this.state.content))),
                    react_1.default.createElement("div", { className: "".concat(dialog_module_css_1.default['dialog-footer'], " row") },
                        react_1.default.createElement("button", { type: 'button', style: this.state.alignment === DialogAlignment.center ? { flex: 1, width: '100%' } : undefined, onClick: function () { return _this.setState({ open: false }); }, className: "".concat(dialog_module_css_1.default['dialog-action'], " row") },
                            react_1.default.createElement(index_1.Text, { className: 'button-text-3' }, (_a = this.state.cancelTitle) !== null && _a !== void 0 ? _a : t("cancel"))),
                        react_1.default.createElement("button", { type: 'button', style: this.state.alignment === DialogAlignment.center ? { flex: 1, width: '100%' } : undefined, onClick: function () {
                                _this.state.onSubmit();
                                _this.setState({ open: false });
                            }, className: "".concat(dialog_module_css_1.default['dialog-action'], " row ").concat(dialog_module_css_1.default['dialog-submit']) },
                            react_1.default.createElement(index_1.Text, { className: 'button-text-3' }, (_b = this.state.submitTitle) !== null && _b !== void 0 ? _b : t('submit')))))), document.body)));
    };
    return TDialog;
}(react_1.default.Component));
exports.Dialog = (0, react_i18next_1.withTranslation)()(TDialog);
