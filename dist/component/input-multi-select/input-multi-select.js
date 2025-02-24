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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMultiple = void 0;
const react_1 = __importStar(require("react"));
const input_multi_select_module_css_1 = __importDefault(require("./input-multi-select.module.css"));
const checkbox_1 = require("../checkbox/checkbox");
const text_1 = require("../text/text");
const winicon_1 = require("../wini-icon/winicon");
const react_i18next_1 = require("react-i18next");
const popup_1 = require("../popup/popup");
;
class TSelectMultiple extends react_1.default.Component {
    constructor(props) {
        var _a;
        super(props);
        this.containerRef = (0, react_1.createRef)();
        this.inputRef = (0, react_1.createRef)();
        this.state = {
            value: (_a = props.value) !== null && _a !== void 0 ? _a : [],
            options: props.options,
            offset: {
                x: 0,
                y: 0,
                height: 0,
                width: 0,
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                toJSON: function () {
                    throw new Error('Function not implemented.');
                }
            },
            isOpen: false,
            onSelect: null,
        };
        this.onCheck = this.onCheck.bind(this);
        this.search = this.search.bind(this);
        this.onClickItem = this.onClickItem.bind(this);
    }
    onCheck(value, list) {
        let newValue = [];
        if (value) {
            newValue = [...this.state.value, ...list.map(e => e.id)];
        }
        else {
            newValue = this.state.value.filter(vl => list.every(e => vl !== e.id));
        }
        this.setState(Object.assign(Object.assign({}, this.state), { value: newValue }));
        if (this.props.onChange)
            this.props.onChange(newValue);
    }
    search(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (ev.target.value.trim().length) {
                if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.handleSearch) {
                    const res = yield this.props.handleSearch(ev.target.value.trim());
                    this.setState(Object.assign(Object.assign({}, this.state), { search: res }));
                }
                else {
                    this.setState(Object.assign(Object.assign({}, this.state), { search: this.props.options.filter(e => typeof e.name === "string" && e.name.toLowerCase().includes(ev.target.value.trim().toLowerCase())) }));
                }
            }
            else {
                this.setState(Object.assign(Object.assign({}, this.state), { search: undefined }));
            }
        });
    }
    onClickItem(ev, item) {
        var _a, _b;
        ev.stopPropagation();
        let newValue = this.state.value.filter(vl => vl !== item);
        this.setState(Object.assign(Object.assign(Object.assign({}, this.state), { value: newValue }), (this.state.isOpen ? {} : {
            isOpen: true,
            style: undefined,
            offset: (_b = (_a = this.containerRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect(),
        })));
        if (this.props.onChange)
            this.props.onChange(newValue);
    }
    renderOptions(item) {
        var _a, _b;
        let children = [];
        if (!item.parentId)
            children = ((_a = this.state.search) !== null && _a !== void 0 ? _a : this.state.options).filter(e => e.parentId === item.id);
        // 
        return react_1.default.createElement("div", { key: item.id, className: 'col', style: { width: '100%' } },
            react_1.default.createElement("div", { className: `${input_multi_select_module_css_1.default['select-tile']} row ${item.disabled ? input_multi_select_module_css_1.default["disabled"] : ""}`, style: { paddingLeft: item.parentId ? '4.4rem' : undefined }, onClick: children.length ? () => {
                    if (this.state.search) {
                        this.setState(Object.assign(Object.assign({}, this.state), { search: this.state.search.map(e => {
                                if (e.id === item.id)
                                    return Object.assign(Object.assign({}, e), { isOpen: !item.isOpen });
                                else
                                    return e;
                            }) }));
                    }
                    else {
                        this.setState(Object.assign(Object.assign({}, this.state), { options: this.state.options.map(e => {
                                if (e.id === item.id)
                                    return Object.assign(Object.assign({}, e), { isOpen: !item.isOpen });
                                else
                                    return e;
                            }) }));
                    }
                } : undefined },
                ((_b = this.state.search) !== null && _b !== void 0 ? _b : this.state.options).some(e => e.parentId) && react_1.default.createElement("div", { className: 'row', style: { width: '1.4rem', height: '1.4rem' } }, children.length ? react_1.default.createElement(winicon_1.Winicon, { src: item.isOpen ? 'fill/arrows/triangle-down' : 'fill/arrows/triangle-right', size: '1.2rem' }) : null),
                react_1.default.createElement(checkbox_1.Checkbox, { disabled: item.disabled, value: children.length ? (children.every((e) => this.state.value.includes(e.id)) ? true : children.some((e) => this.state.value.includes(e.id)) ? undefined : false) : this.state.value.includes(item.id), onChange: (v) => { this.onCheck(v, [item, ...children]); }, size: '2rem' }),
                react_1.default.createElement(text_1.Text, { className: 'body-3' }, item.name)),
            react_1.default.createElement("div", { className: 'col', style: { display: item.isOpen ? "flex" : "none", width: '100%' } }, children.map(e => this.renderOptions(e))));
    }
    componentDidUpdate(prevProps, prevState) {
        var _a, _b, _c, _d, _e;
        if (prevProps.options !== this.props.options)
            this.setState(Object.assign(Object.assign({}, this.state), { options: this.props.options }));
        if (prevProps.value !== this.props.value)
            this.setState(Object.assign(Object.assign({}, this.state), { value: (_a = this.props.value) !== null && _a !== void 0 ? _a : [] }));
        //
        if (this.state.isOpen && (prevState.isOpen !== this.state.isOpen || prevState.value.length !== this.state.value.length)) {
            const thisPopupRect = (_b = this.containerRef.current.querySelector(`.select-multi-popup`)) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
            if (thisPopupRect) {
                let style;
                if (prevState.isOpen !== this.state.isOpen && thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        right: document.body.offsetWidth - this.state.offset.right + 'px'
                    };
                }
                let _bottom = thisPopupRect.bottom - 8;
                const thisContainerRect = (_c = this.containerRef.current) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect();
                if (thisContainerRect) {
                    if (prevState.value.length !== this.state.value.length) {
                        _bottom = thisContainerRect.bottom + 2 + thisPopupRect.height;
                        style = Object.assign(Object.assign({}, (style !== null && style !== void 0 ? style : {})), { top: `${thisContainerRect.bottom + 2}px` });
                    }
                    if (_bottom > document.body.offsetHeight) {
                        style = Object.assign(Object.assign({}, (style !== null && style !== void 0 ? style : {})), { top: `${thisContainerRect.y - 2 - thisPopupRect.height}px` });
                    }
                }
                if (style) {
                    (_d = style.left) !== null && _d !== void 0 ? _d : (style.left = style.right ? undefined : `${this.state.offset.x}px`);
                    (_e = style.width) !== null && _e !== void 0 ? _e : (style.width = `${this.state.offset.width}px`);
                    this.setState(Object.assign(Object.assign({}, this.state), { style: style }));
                }
            }
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { t } = this.props;
        return react_1.default.createElement("div", { id: this.props.id, ref: this.containerRef, className: `${input_multi_select_module_css_1.default['select-multi-container']} row ${this.props.disabled ? input_multi_select_module_css_1.default['disabled'] : ''} ${((_a = this.props.helperText) === null || _a === void 0 ? void 0 : _a.length) && input_multi_select_module_css_1.default['helper-text']} ${(_b = this.props.className) !== null && _b !== void 0 ? _b : 'body-3'}`, "helper-text": this.props.helperText, style: this.props.style ? Object.assign(Object.assign({}, { '--helper-text-color': (_c = this.props.helperTextColor) !== null && _c !== void 0 ? _c : '#e14337' }), this.props.style) : { '--helper-text-color': (_d = this.props.helperTextColor) !== null && _d !== void 0 ? _d : '#e14337' }, onClick: () => {
                var _a, _b;
                if (!this.state.isOpen)
                    this.setState(Object.assign(Object.assign({}, this.state), { isOpen: true, style: undefined, offset: (_b = (_a = this.containerRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect() }));
            } },
            react_1.default.createElement("div", { className: 'row', style: { flexWrap: 'wrap', flex: 1, width: '100%', gap: '0.6rem 0.4rem' } },
                this.state.value.map(item => {
                    const optionItem = this.props.options.find(e => e.id === item);
                    return react_1.default.createElement("div", { key: item, className: `row ${input_multi_select_module_css_1.default['selected-item-value']}`, onClick: (optionItem === null || optionItem === void 0 ? void 0 : optionItem.disabled) ? undefined : (ev) => this.onClickItem(ev, item) },
                        react_1.default.createElement(text_1.Text, { style: { color: "var(--neutral-text-title-color)", fontSize: '1.2rem', lineHeight: '1.4rem' } }, optionItem === null || optionItem === void 0 ? void 0 : optionItem.name),
                        react_1.default.createElement(winicon_1.Winicon, { src: "outline/user interface/e-remove", size: '1.2rem' }));
                }),
                (!this.state.value.length || this.state.isOpen) && react_1.default.createElement("input", { ref: this.inputRef, autoFocus: this.state.value.length > 0, onChange: this.search, placeholder: this.state.value.length ? undefined : this.props.placeholder, onBlur: ev => {
                        if (this.state.isOpen)
                            ev.target.focus();
                    } })),
            this.props.showClearValueButton && this.state.value.length ? react_1.default.createElement("button", { type: 'button', className: 'row', style: { padding: '0.4rem' }, onClick: (ev) => {
                    ev.stopPropagation();
                    if (this.state.value.length)
                        this.setState(Object.assign(Object.assign({}, this.state), { isOpen: true, value: [] }));
                } },
                react_1.default.createElement(winicon_1.Winicon, { src: "outline/user interface/c-remove", size: '1.6rem' })) : react_1.default.createElement("div", { ref: iconRef => {
                    if ((iconRef === null || iconRef === void 0 ? void 0 : iconRef.parentElement) && iconRef.parentElement.getBoundingClientRect().width < 100)
                        iconRef.style.display = "none";
                }, className: 'row' },
                react_1.default.createElement(winicon_1.Winicon, { src: this.state.isOpen ? "fill/arrows/up-arrow" : "fill/arrows/down-arrow", size: '1.2rem' })),
            this.state.isOpen && react_1.default.createElement(popup_1.PopupOverlay, { className: `hidden-overlay`, onClose: (ev) => {
                    if (ev.target !== this.inputRef.current)
                        this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false }));
                } },
                react_1.default.createElement("div", { className: `${input_multi_select_module_css_1.default['select-multi-popup']} select-multi-popup col ${(_e = this.props.popupClassName) !== null && _e !== void 0 ? _e : ""}`, style: (_f = this.state.style) !== null && _f !== void 0 ? _f : {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        left: this.state.offset.x + 'px',
                        width: this.state.offset.width,
                    } },
                    react_1.default.createElement("div", { style: { padding: '1.2rem 1.6rem', width: '100%', borderBottom: "var(--neutral-main-border)" } }, (() => {
                        var _a, _b;
                        const _list = ((_b = (_a = this.state.search) !== null && _a !== void 0 ? _a : this.props.options) !== null && _b !== void 0 ? _b : []);
                        const isSelectedAll = _list.every(item => this.state.value.some(vl => vl === item.id));
                        return react_1.default.createElement(text_1.Text, { onClick: () => {
                                let newValue = [];
                                if (_list.length) {
                                    if (isSelectedAll) {
                                        newValue = this.state.value.filter(vl => _list.every(item => vl !== item.id || item.disabled));
                                    }
                                    else {
                                        newValue = [...this.state.value, ..._list.filter(item => this.state.value.every(vl => vl !== item.id) && !item.disabled).map(e => e.id)];
                                    }
                                }
                                this.setState(Object.assign(Object.assign({}, this.state), { value: newValue }));
                                if (this.props.onChange)
                                    this.props.onChange(newValue);
                            }, className: 'button-text-3', style: { color: _list.length ? undefined : 'var(--neutral-text-title-color)' } }, _list.length && isSelectedAll ? `${t("remove")} ${t("all").toLowerCase()}` : `${t("select")} ${t("all").toLowerCase()}`);
                    })()),
                    react_1.default.createElement("div", { className: `col ${input_multi_select_module_css_1.default['select-body']}`, onScroll: this.props.handleLoadmore ? (ev) => {
                            if (this.props.handleLoadmore) {
                                let scrollElement = ev.target;
                                this.props.handleLoadmore(Math.round(scrollElement.offsetHeight + scrollElement.scrollTop) >= (scrollElement.scrollHeight - 1), ev);
                            }
                        } : undefined },
                        ((_g = this.state.search) !== null && _g !== void 0 ? _g : this.state.options).filter(e => !e.parentId).map(item => this.renderOptions(item)),
                        (!((_h = this.state.search) === null || _h === void 0 ? void 0 : _h.length) && !((_j = this.props.options) === null || _j === void 0 ? void 0 : _j.length)) && (react_1.default.createElement("div", { className: input_multi_select_module_css_1.default['no-results-found'] }, t("noResultFound")))))));
    }
}
exports.SelectMultiple = (0, react_i18next_1.withTranslation)()(TSelectMultiple);
