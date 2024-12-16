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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showDialog = exports.Dialog = exports.DialogAlignment = void 0;
var react_1 = __importStar(require("react"));
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
var dialogRef = (0, react_1.createRef)();
var Dialog = function () {
    var _a = (0, react_i18next_1.useTranslation)(), t = _a.t, i18n = _a.i18n;
    return react_1.default.createElement(TDialog, { ref: dialogRef, t: t, i18n: i18n, tReady: true });
};
exports.Dialog = Dialog;
var showDialog = function (props) {
    var _a, _b, _c, _d;
    if (dialogRef.current)
        dialogRef.current.showDialogNoti({
            title: (_a = props.title) !== null && _a !== void 0 ? _a : '',
            status: (_b = props.status) !== null && _b !== void 0 ? _b : index_1.ComponentStatus.INFOR,
            content: (_c = props.content) !== null && _c !== void 0 ? _c : '',
            onSubmit: (_d = props.onSubmit) !== null && _d !== void 0 ? _d : (function () { }),
            submitTitle: props.submitTitle,
            cancelTitle: props.cancelTitle,
            alignment: props.alignment
        });
};
exports.showDialog = showDialog;
