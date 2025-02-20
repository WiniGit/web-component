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
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const dialog_module_css_1 = __importDefault(require("./dialog.module.css"));
const index_1 = require("../../index");
const react_i18next_1 = require("react-i18next");
var DialogAlignment;
(function (DialogAlignment) {
    DialogAlignment["start"] = "start";
    DialogAlignment["center"] = "center";
    DialogAlignment["end"] = "end";
})(DialogAlignment || (exports.DialogAlignment = DialogAlignment = {}));
class TDialog extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: '',
            status: index_1.ComponentStatus.INFOR,
            content: '',
            onSubmit: () => { }
        };
    }
    showDialogNoti(data) {
        this.setState(Object.assign({ open: true }, data));
    }
    closeDialog() {
        this.setState({ open: false });
    }
    render() {
        var _a, _b;
        const { t } = this.props;
        return (react_1.default.createElement(react_1.default.Fragment, null, this.state.open &&
            react_dom_1.default.createPortal(react_1.default.createElement("div", { className: dialog_module_css_1.default['dialog-overlay'] },
                react_1.default.createElement("div", { className: `${dialog_module_css_1.default['dialog-container']} col`, style: { width: '41.4rem', alignItems: this.state.alignment }, "dialog-type": this.state.status, onClick: e => e.stopPropagation() },
                    react_1.default.createElement("div", { className: `${dialog_module_css_1.default['dialog-body']} col`, style: { alignItems: 'inherit' } },
                        react_1.default.createElement("div", { className: `${dialog_module_css_1.default['dialog-status']} row` }, (0, index_1.getStatusIcon)(this.state.status)),
                        react_1.default.createElement("div", { className: 'col' },
                            react_1.default.createElement(index_1.Text, { className: 'heading-6', style: { textAlign: this.state.alignment === DialogAlignment.center ? 'center' : 'start' } }, this.state.title),
                            react_1.default.createElement(index_1.Text, { className: 'body-3', style: { textAlign: this.state.alignment === DialogAlignment.center ? 'center' : 'start' } }, this.state.content))),
                    react_1.default.createElement("div", { className: `${dialog_module_css_1.default['dialog-footer']} row` },
                        react_1.default.createElement("button", { type: 'button', style: this.state.alignment === DialogAlignment.center ? { flex: 1, width: '100%' } : undefined, onClick: () => {
                                if (this.state.onCancel)
                                    this.state.onCancel();
                                this.setState({ open: false });
                            }, className: `${dialog_module_css_1.default['dialog-action']} row` },
                            react_1.default.createElement(index_1.Text, { className: 'button-text-3' }, (_a = this.state.cancelTitle) !== null && _a !== void 0 ? _a : t("cancel"))),
                        react_1.default.createElement("button", { type: 'button', style: this.state.alignment === DialogAlignment.center ? { flex: 1, width: '100%' } : undefined, onClick: () => {
                                this.state.onSubmit();
                                this.setState({ open: false });
                            }, className: `${dialog_module_css_1.default['dialog-action']} row ${dialog_module_css_1.default['dialog-submit']}` },
                            react_1.default.createElement(index_1.Text, { className: 'button-text-3' }, (_b = this.state.submitTitle) !== null && _b !== void 0 ? _b : t('submit')))))), document.body)));
    }
}
const dialogRef = (0, react_1.createRef)();
const Dialog = () => {
    const { t, i18n } = (0, react_i18next_1.useTranslation)();
    return react_1.default.createElement(TDialog, { ref: dialogRef, t: t, i18n: i18n, tReady: true });
};
exports.Dialog = Dialog;
const showDialog = (props) => {
    var _a, _b, _c, _d;
    if (dialogRef.current)
        dialogRef.current.showDialogNoti({
            title: (_a = props.title) !== null && _a !== void 0 ? _a : '',
            status: (_b = props.status) !== null && _b !== void 0 ? _b : index_1.ComponentStatus.INFOR,
            content: (_c = props.content) !== null && _c !== void 0 ? _c : '',
            onSubmit: (_d = props.onSubmit) !== null && _d !== void 0 ? _d : (() => { }),
            onCancel: props.onCancel,
            submitTitle: props.submitTitle,
            cancelTitle: props.cancelTitle,
            alignment: props.alignment
        });
};
exports.showDialog = showDialog;
