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
exports.ImportFile = void 0;
var react_1 = __importDefault(require("react"));
var import_file_module_css_1 = __importDefault(require("./import-file.module.css"));
var index_1 = require("../../index");
var cloudSvg = (react_1.default.createElement("svg", { width: '100%', height: '100%', style: { width: '3rem', height: '3rem' }, viewBox: '0 0 36 36', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    react_1.default.createElement("path", { d: 'M22.5312 6.51941C20.3258 6.12929 18.0555 6.35518 15.9702 7.1722C13.8849 7.98923 12.0654 9.36573 10.712 11.1502C9.53042 12.7081 8.74407 14.5243 8.41412 16.4432C6.99557 16.9154 5.7486 17.8144 4.85059 19.0274C3.77621 20.4786 3.27749 22.2764 3.45068 24.0737C3.62388 25.871 4.45672 27.5405 5.78845 28.7599C7.12018 29.9792 8.85639 30.6621 10.662 30.6766H13.1063C13.7786 30.6766 14.3236 30.1316 14.3236 29.4594C14.3236 28.7871 13.7786 28.2421 13.1063 28.2421H10.6769C9.47485 28.2313 8.31921 27.7762 7.43253 26.9643C6.54471 26.1514 5.98948 25.0384 5.87402 23.8402C5.75855 22.642 6.09103 21.4435 6.80729 20.476C7.52354 19.5085 8.57279 18.8406 9.75252 18.6013C10.2753 18.4952 10.6682 18.061 10.7216 17.5303C10.9012 15.7476 11.5691 14.049 12.6518 12.6214C13.7345 11.1938 15.1901 10.0926 16.8583 9.43899C18.5266 8.78536 20.3428 8.60466 22.1071 8.91675C23.8715 9.22884 25.5155 10.0216 26.8583 11.2079C28.2011 12.3941 29.1905 13.9278 29.7178 15.6402C30.2451 17.3526 30.2898 19.1772 29.8469 20.9134C29.404 22.6495 28.4907 24.2297 27.2075 25.4802C25.9244 26.7308 24.3211 27.603 22.5742 28.001C21.9187 28.1504 21.5084 28.8028 21.6577 29.4583C21.807 30.1138 22.4595 30.5241 23.115 30.3748C25.2987 29.8772 27.3028 28.7869 28.9067 27.2238C30.5107 25.6606 31.6523 23.6853 32.2059 21.5152C32.7595 19.345 32.7037 17.0642 32.0446 14.9237C31.3855 12.7833 30.1486 10.8661 28.4701 9.38333C26.7916 7.90052 24.7366 6.90953 22.5312 6.51941Z', style: { fill: "var(--primary-main-color)" } }),
    react_1.default.createElement("path", { d: 'M17.1146 17.6431C17.2313 17.5264 17.3658 17.4384 17.5094 17.379C17.6513 17.3201 17.8067 17.2874 17.9697 17.2866L17.9753 17.2866L17.9809 17.2866C18.2906 17.288 18.5998 17.4069 18.8361 17.6431L23.7052 22.5123C24.1806 22.9876 24.1806 23.7584 23.7052 24.2338C23.2298 24.7091 22.4591 24.7091 21.9837 24.2338L19.1926 21.4427V29.4594C19.1926 30.1317 18.6476 30.6767 17.9753 30.6767C17.303 30.6767 16.758 30.1317 16.758 29.4594V21.4427L13.9669 24.2338C13.4916 24.7091 12.7208 24.7091 12.2455 24.2338C11.7701 23.7584 11.7701 22.9876 12.2455 22.5123L17.1146 17.6431Z', style: { fill: "var(--primary-main-color)" } })));
var fileSvg = (react_1.default.createElement("svg", { className: import_file_module_css_1.default['preview-icon'], width: '100%', height: '100%', style: { width: '3rem', height: '3rem' }, viewBox: '0 0 36 36', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    react_1.default.createElement("path", { d: 'M20.9163 3.41669H7.54829C7.22597 3.41669 6.91686 3.54472 6.68895 3.77263C6.46105 4.00054 6.33301 4.30965 6.33301 4.63196V31.3681C6.33301 31.6904 6.46105 31.9995 6.68895 32.2274C6.91686 32.4553 7.22597 32.5834 7.54829 32.5834H29.4233C29.7456 32.5834 30.0547 32.4553 30.2826 32.2274C30.5105 31.9995 30.6386 31.6904 30.6386 31.3681V13.1389H22.1316C21.8093 13.1389 21.5002 13.0109 21.2723 12.783C21.0444 12.5551 20.9163 12.2459 20.9163 11.9236V3.41669Z', style: { fill: "var(--primary-main-color)" } }),
    react_1.default.createElement("path", { d: 'M29.9264 10.7084H23.3469V4.12884L29.9264 10.7084Z', style: { fill: "var(--primary-main-color)" } })));
var closeSvg = (react_1.default.createElement("svg", { width: '100%', height: '100%', style: { width: '2.4rem', height: '2.4rem' }, fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
    react_1.default.createElement("path", { d: 'M13.4144 12.0002L20.4144 5.00015L19.0002 3.58594L12.0002 10.5859L5.00015 3.58594L3.58594 5.00015L10.5859 12.0002L3.58594 19.0002L5.00015 20.4144L12.0002 13.4144L19.0002 20.4144L20.4144 19.0002L13.4144 12.0002Z', style: { fill: "var(--error-main-color)" } })));
var ImportFile = /** @class */ (function (_super) {
    __extends(ImportFile, _super);
    function ImportFile(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            preview: _this.props.value
        };
        _this.fileRef = react_1.default.createRef();
        return _this;
    }
    ImportFile.prototype.showFilePicker = function () {
        var _a;
        (_a = this.fileRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    ImportFile.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevProps.value !== this.props.value || prevProps.status !== this.props.status) {
            this.setState(__assign(__assign({}, this.state), { status: this.props.status, preview: this.props.value }));
        }
    };
    ImportFile.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var sizeTitle;
        if (this.props.maxSize) {
            sizeTitle = this.props.maxSize > Math.pow(1024, 3) ? "".concat(Math.round(this.props.maxSize / Math.pow(1024, 3)), "TB") : this.props.maxSize > Math.pow(1024, 2) ? "".concat(Math.round(this.props.maxSize / Math.pow(1024, 2)), "GB") : this.props.maxSize > 1024 ? "".concat(Math.round(this.props.maxSize / 1024), "MB") : "".concat(this.props.maxSize, "KB");
        }
        return react_1.default.createElement("div", { id: this.props.id, className: "".concat(import_file_module_css_1.default['import-file-container'], " ").concat((_a = this.props.className) !== null && _a !== void 0 ? _a : 'row', " ").concat(this.props.buttonOnly ? import_file_module_css_1.default['button-only'] : ''), style: this.state.preview ? this.props.style : __assign({ cursor: 'pointer' }, this.props.style), onClick: function () {
                if (!_this.state.preview && !_this.props.buttonOnly)
                    _this.showFilePicker();
            } },
            react_1.default.createElement("input", { type: 'file', accept: ((_b = this.props.allowType) !== null && _b !== void 0 ? _b : []).join(','), ref: this.fileRef, onChange: function (ev) {
                    var file;
                    if (ev.target.files && ev.target.files[0]) {
                        file = ev.target.files[0];
                        if (_this.props.maxSize) {
                            if (file.size > (_this.props.maxSize * 1024)) {
                                index_1.ToastMessage.errors("File ".concat(file.name, " exceeds the maximum size of ").concat(sizeTitle));
                                file = undefined;
                            }
                        }
                    }
                    if (file) {
                        _this.setState(__assign(__assign({}, _this.state), { preview: file }));
                        if (_this.props.onChange)
                            _this.props.onChange(file);
                    }
                } }),
            this.props.buttonOnly
                ? null
                : react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { className: "".concat(import_file_module_css_1.default['import-file-prefix'], " row") }, this.state.preview ? ((_c = this.state.preview.type) === null || _c === void 0 ? void 0 : _c.includes('image')) ? react_1.default.createElement("img", { src: this.state.preview instanceof File ? URL.createObjectURL(this.state.preview) : this.state.preview.url }) : fileSvg : cloudSvg),
                    react_1.default.createElement("div", { className: "".concat(import_file_module_css_1.default['file-preview-content'], " col") },
                        react_1.default.createElement(index_1.Text, { className: "".concat(import_file_module_css_1.default['title-file'], " heading-8"), style: { maxWidth: '100%' } }, (_e = (_d = this.state.preview) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : ((_f = this.props.label) !== null && _f !== void 0 ? _f : 'Click or drag and drop to upload file')),
                        react_1.default.createElement(index_1.Text, { className: "".concat(import_file_module_css_1.default['subtitle-file'], " subtitle-3"), style: { maxWidth: '100%' } }, ((_g = this.state.preview) === null || _g === void 0 ? void 0 : _g.size)
                            ? "".concat((_h = this.state.preview) === null || _h === void 0 ? void 0 : _h.size, "KB")
                            : ((_j = this.props.subTitle) !== null && _j !== void 0 ? _j : (sizeTitle ? "File size should not exceed ".concat(sizeTitle, ".") : ''))))),
            this.state.preview && this.props.buttonOnly ? react_1.default.createElement("div", { className: 'row', style: { gap: "0.4rem" } },
                react_1.default.createElement(index_1.Text, { className: 'button-text-6' }, (_l = (_k = this.state.preview) === null || _k === void 0 ? void 0 : _k.name) !== null && _l !== void 0 ? _l : ''),
                react_1.default.createElement("button", { type: 'button', className: "".concat(import_file_module_css_1.default['remove-preview-file']), onClick: function () {
                        _this.setState(__assign(__assign({}, _this.state), { preview: null }));
                        if (_this.props.onChange)
                            _this.props.onChange(undefined);
                    } }, closeSvg))
                : react_1.default.createElement(index_1.Button, { label: this.state.preview ? 'Remove file' : 'Choose file', style: { padding: "1.2rem" }, className: 'button-text-4', onClick: function () {
                        if (_this.state.preview) {
                            _this.setState(__assign(__assign({}, _this.state), { preview: null }));
                            if (_this.props.onChange)
                                _this.props.onChange(undefined);
                        }
                        else if (_this.props.buttonOnly || _this.state.preview)
                            _this.showFilePicker();
                    } }));
    };
    return ImportFile;
}(react_1.default.Component));
exports.ImportFile = ImportFile;
