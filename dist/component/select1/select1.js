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
exports.Select1 = void 0;
const select1_module_css_1 = __importDefault(require("./select1.module.css"));
const react_1 = __importStar(require("react"));
const winicon_1 = require("../wini-icon/winicon");
const text_1 = require("../text/text");
const react_i18next_1 = require("react-i18next");
const popup_1 = require("../popup/popup");
;
class TSelect1 extends react_1.default.Component {
    constructor(props) {
        var _a, _b;
        super(props);
        this.containerRef = (0, react_1.createRef)();
        this.inputRef = (0, react_1.createRef)();
        this.onKeyDown = (ev) => {
            var _a, _b, _c, _d, _e, _f, _g;
            if ((((_a = this.state.options) === null || _a === void 0 ? void 0 : _a.length) || ((_b = this.state.search) === null || _b === void 0 ? void 0 : _b.length)) && this.state.isOpen) {
                switch (ev.key.toLowerCase()) {
                    case "enter":
                        ev.preventDefault();
                        const _selectItem = ((_c = this.state.search) !== null && _c !== void 0 ? _c : this.state.options).find(e => e.id === this.state.selected);
                        if (_selectItem)
                            this.onSelect(_selectItem);
                        break;
                    case "arrowup":
                        ev.preventDefault();
                        if (this.state.selected) {
                            let _index = ((_d = this.state.search) !== null && _d !== void 0 ? _d : this.state.options).findIndex((e) => e.id === this.state.selected);
                            _index = ((_index === 0) ? this.props.options.length : _index) - 1;
                            this.setState(Object.assign(Object.assign({}, this.state), { selected: (_e = this.props.options[_index]) === null || _e === void 0 ? void 0 : _e.id }));
                        }
                        break;
                    case "arrowdown":
                        ev.preventDefault();
                        if (this.state.selected) {
                            let _index = ((_f = this.state.search) !== null && _f !== void 0 ? _f : this.state.options).findIndex((e) => e.id === this.state.selected);
                            _index = ((_index + 1 === this.props.options.length) ? -1 : _index) + 1;
                            this.setState(Object.assign(Object.assign({}, this.state), { selected: (_g = this.props.options[_index]) === null || _g === void 0 ? void 0 : _g.id }));
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        this.state = {
            value: props.value,
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
        this.search = this.search.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        if (this.inputRef.current)
            this.inputRef.current.value = `${(_b = (_a = this.state.options.find(e => e.id === this.state.value)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : ""}`;
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
    onSelect(item) {
        var _a, _b;
        if (item.disabled) {
            this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false, onSelect: undefined, selected: undefined }));
            (_a = this.inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        }
        else {
            let newState = Object.assign(Object.assign({}, this.state), { isOpen: false, value: item.id, onSelect: undefined, selected: undefined });
            if (!newState.options.some(e => e.id === item.id))
                newState.options.push(item);
            this.setState(newState);
            (_b = this.inputRef.current) === null || _b === void 0 ? void 0 : _b.blur();
        }
        if (this.props.onChange)
            this.props.onChange(item);
    }
    componentDidUpdate(prevProps, prevState) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (prevProps.options !== this.props.options) {
            this.setState(Object.assign(Object.assign({}, this.state), { options: this.props.options }));
            if (this.inputRef.current)
                this.inputRef.current.value = `${(_b = (_a = this.props.options.find(e => e.id === this.state.value)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : ""}`;
        }
        if (prevProps.value !== this.props.value)
            this.setState(Object.assign(Object.assign({}, this.state), { value: this.props.value }));
        if (prevState.value !== this.state.value && this.inputRef.current)
            this.inputRef.current.value = `${(_d = (_c = this.state.options.find(e => e.id === this.state.value)) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : ""}`;
        //
        if (this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
            const thisPopupRect = (_e = this.containerRef.current.querySelector(`.select1-popup`)) === null || _e === void 0 ? void 0 : _e.getBoundingClientRect();
            if (thisPopupRect) {
                let style;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        right: document.body.offsetWidth - this.state.offset.right + 'px'
                    };
                }
                let _bottom = thisPopupRect.bottom - 8;
                const thisContainerRect = (_f = this.containerRef.current) === null || _f === void 0 ? void 0 : _f.getBoundingClientRect();
                if (thisContainerRect) {
                    if (_bottom > document.body.offsetHeight) {
                        style = Object.assign(Object.assign({}, (style !== null && style !== void 0 ? style : {})), { top: `${thisContainerRect.y - 2 - thisPopupRect.height}px` });
                    }
                }
                if (style) {
                    (_g = style.left) !== null && _g !== void 0 ? _g : (style.left = style.right ? undefined : `${this.state.offset.x}px`);
                    (_h = style.width) !== null && _h !== void 0 ? _h : (style.width = `${this.state.offset.width}px`);
                    this.setState(Object.assign(Object.assign({}, this.state), { style: style }));
                }
            }
        }
    }
    componentDidMount() {
        var _a, _b;
        if (this.inputRef.current)
            this.inputRef.current.value = `${(_b = (_a = this.state.options.find(e => e.id === this.state.value)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : ""}`;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const { t } = this.props;
        const _value = this.state.options.find(e => e.id === this.state.value);
        return react_1.default.createElement("div", { id: this.props.id, ref: this.containerRef, className: `${select1_module_css_1.default['select1-container']} row ${this.props.disabled ? select1_module_css_1.default['disabled'] : ''} ${((_a = this.props.helperText) === null || _a === void 0 ? void 0 : _a.length) && select1_module_css_1.default['helper-text']} ${(_b = this.props.className) !== null && _b !== void 0 ? _b : 'body-3'}`, "helper-text": this.props.helperText, style: this.props.style ? Object.assign(Object.assign({}, { '--helper-text-color': (_c = this.props.helperTextColor) !== null && _c !== void 0 ? _c : '#e14337' }), this.props.style) : { '--helper-text-color': (_d = this.props.helperTextColor) !== null && _d !== void 0 ? _d : '#e14337' }, onClick: () => {
                var _a, _b, _c;
                if (!this.state.isOpen) {
                    this.setState(Object.assign(Object.assign({}, this.state), { isOpen: true, style: undefined, offset: (_b = (_a = this.containerRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect() }));
                    (_c = this.inputRef.current) === null || _c === void 0 ? void 0 : _c.focus();
                }
            } },
            this.props.prefix,
            (!_value || typeof _value.name === "string" || typeof _value.name === "number") ? react_1.default.createElement("input", { ref: this.inputRef, readOnly: this.props.readOnly, onChange: this.search, placeholder: this.props.placeholder, onBlur: ev => {
                    if (this.state.onSelect && !this.props.readOnly)
                        ev.target.focus();
                } }) : _value.name, (_e = this.props.suffix) !== null && _e !== void 0 ? _e : react_1.default.createElement("div", { ref: iconRef => {
                if ((iconRef === null || iconRef === void 0 ? void 0 : iconRef.parentElement) && iconRef.parentElement.getBoundingClientRect().width < 88)
                    iconRef.style.display = "none";
            }, className: 'row' },
            react_1.default.createElement(winicon_1.Winicon, { src: this.state.isOpen ? "fill/arrows/up-arrow" : "fill/arrows/down-arrow", size: "1.2rem" })),
            this.state.isOpen && react_1.default.createElement(popup_1.PopupOverlay, { onOpen: this.props.onOpenOptions, className: `hidden-overlay`, onClose: (ev) => {
                    if (ev.target !== this.inputRef.current)
                        this.setState(Object.assign(Object.assign({}, this.state), { isOpen: false }));
                } },
                react_1.default.createElement("div", { className: `${select1_module_css_1.default['select1-popup']} select1-popup col ${(_f = this.props.popupClassName) !== null && _f !== void 0 ? _f : ""}`, style: (_g = this.state.style) !== null && _g !== void 0 ? _g : {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        left: this.state.offset.x + 'px',
                        width: this.state.offset.width,
                    } },
                    react_1.default.createElement("div", { className: `col ${select1_module_css_1.default['select-body']}`, onScroll: this.props.handleLoadmore ? (ev) => {
                            if (this.props.handleLoadmore) {
                                let scrollElement = ev.target;
                                this.props.handleLoadmore(Math.round(scrollElement.offsetHeight + scrollElement.scrollTop) >= (scrollElement.scrollHeight - 1), ev);
                            }
                        } : undefined },
                        ((_h = this.state.search) !== null && _h !== void 0 ? _h : this.state.options).filter(e => !e.parentId).map(item => {
                            var _a, _b;
                            return react_1.default.createElement(OptionsItemTile, { key: item.id, item: item, children: ((_a = this.state.search) !== null && _a !== void 0 ? _a : this.state.options).filter(e => e.parentId === item.id), selected: this.state.selected === item.id, onClick: this.onSelect, treeData: ((_b = this.state.search) !== null && _b !== void 0 ? _b : this.state.options).some(e => e.parentId) });
                        }),
                        (!((_j = this.state.search) === null || _j === void 0 ? void 0 : _j.length) && !((_k = this.props.options) === null || _k === void 0 ? void 0 : _k.length)) && (react_1.default.createElement("div", { className: select1_module_css_1.default['no-results-found'] }, t("noResultFound")))))));
    }
}
function OptionsItemTile({ item, children, selected, onClick, treeData }) {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    return item.title && typeof item.title !== "string" ? react_1.default.createElement(react_1.default.Fragment, null, item.title(onClick)) : react_1.default.createElement("div", { className: 'col', style: { width: '100%' } },
        react_1.default.createElement("div", { className: `${select1_module_css_1.default['select-tile']} row ${item.disabled ? select1_module_css_1.default["disabled"] : ""}`, style: { paddingLeft: item.parentId ? '4.4rem' : undefined, backgroundColor: selected ? "var(--neutral-selected-background-color)" : undefined }, onClick: () => {
                if (children === null || children === void 0 ? void 0 : children.length) {
                    setIsOpen(!isOpen);
                }
                else
                    onClick(item);
            } },
            treeData ? react_1.default.createElement("div", { className: 'row', style: { width: '1.4rem', height: '1.4rem' } }, (children === null || children === void 0 ? void 0 : children.length) ? react_1.default.createElement(winicon_1.Winicon, { src: isOpen ? "fill/arrows/triangle-down" : "fill/arrows/triangle-right", size: "1.2rem" }) : null) : undefined,
            ((item.title && typeof item.title === "string") || typeof item.name === "string") ? react_1.default.createElement(text_1.Text, { className: 'body-3' }, item.title && typeof item.title === "string" ? item.title : item.name) : item.name),
        (children === null || children === void 0 ? void 0 : children.length) ? react_1.default.createElement("div", { className: 'col', style: { display: isOpen ? "flex" : "none", width: '100%' } }, children.map(e => react_1.default.createElement(OptionsItemTile, { key: e.id, item: e, onClick: onClick }))) : undefined);
}
exports.Select1 = (0, react_i18next_1.withTranslation)()(TSelect1);
