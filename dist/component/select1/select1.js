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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select1 = void 0;
var select1_module_css_1 = __importDefault(require("./select1.module.css"));
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var text_1 = require("../text/text");
;
var Select1 = /** @class */ (function (_super) {
    __extends(Select1, _super);
    function Select1(props) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, props) || this;
        _this.containerRef = (0, react_1.createRef)();
        _this.inputRef = (0, react_1.createRef)();
        _this.onKeyDown = function (ev) {
            var _a, _b, _c, _d, _e, _f, _g;
            console.log(ev.key);
            if ((((_a = _this.state.options) === null || _a === void 0 ? void 0 : _a.length) || ((_b = _this.state.search) === null || _b === void 0 ? void 0 : _b.length)) && _this.state.isOpen) {
                switch (ev.key.toLowerCase()) {
                    case "enter":
                        ev.preventDefault();
                        var _selectItem = ((_c = _this.state.search) !== null && _c !== void 0 ? _c : _this.state.options).find(function (e) { return e.id === _this.state.selected; });
                        if (_selectItem)
                            _this.onSelect(_selectItem);
                        break;
                    case "arrowup":
                        ev.preventDefault();
                        if (_this.state.selected) {
                            var _index = ((_d = _this.state.search) !== null && _d !== void 0 ? _d : _this.state.options).findIndex(function (e) { return e.id === _this.state.selected; });
                            _index = ((_index === 0) ? _this.props.options.length : _index) - 1;
                            _this.setState(__assign(__assign({}, _this.state), { selected: (_e = _this.props.options[_index]) === null || _e === void 0 ? void 0 : _e.id }));
                        }
                        break;
                    case "arrowdown":
                        ev.preventDefault();
                        if (_this.state.selected) {
                            var _index = ((_f = _this.state.search) !== null && _f !== void 0 ? _f : _this.state.options).findIndex(function (e) { return e.id === _this.state.selected; });
                            _index = ((_index + 1 === _this.props.options.length) ? -1 : _index) + 1;
                            _this.setState(__assign(__assign({}, _this.state), { selected: (_g = _this.props.options[_index]) === null || _g === void 0 ? void 0 : _g.id }));
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        _this.state = {
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
        _this.search = _this.search.bind(_this);
        if (_this.inputRef.current)
            _this.inputRef.current.value = "".concat((_b = (_a = _this.state.options.find(function (e) { return e.id === _this.state.value; })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "");
        return _this;
    }
    Select1.prototype.search = function (ev) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!ev.target.value.trim().length) return [3 /*break*/, 4];
                        if (!((_a = this.props) === null || _a === void 0 ? void 0 : _a.handleSearch)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.handleSearch(ev.target.value.trim())];
                    case 1:
                        res = _b.sent();
                        this.setState(__assign(__assign({}, this.state), { search: res }));
                        return [3 /*break*/, 3];
                    case 2:
                        this.setState(__assign(__assign({}, this.state), { search: this.props.options.filter(function (e) { return typeof e.name === "string" && e.name.toLowerCase().includes(ev.target.value.trim().toLowerCase()); }) }));
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.setState(__assign(__assign({}, this.state), { search: undefined }));
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Select1.prototype.onSelect = function (item) {
        var _a, _b;
        if (item.disabled) {
            this.setState(__assign(__assign({}, this.state), { isOpen: false, onSelect: undefined, selected: undefined }));
            (_a = this.inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
        }
        else {
            this.setState(__assign(__assign({}, this.state), { isOpen: false, value: item.id, onSelect: undefined, selected: undefined }));
            (_b = this.inputRef.current) === null || _b === void 0 ? void 0 : _b.blur();
        }
        if (this.props.onChange)
            this.props.onChange(item);
    };
    Select1.prototype.renderOptions = function (item) {
        var _this = this;
        var _a, _b;
        var children = [];
        if (!item.parentId)
            children = ((_a = this.state.search) !== null && _a !== void 0 ? _a : this.state.options).filter(function (e) { return e.parentId === item.id; });
        // 
        return react_1.default.createElement("div", { key: item.id, className: 'col', style: { width: '100%' } },
            react_1.default.createElement("div", { className: "".concat(select1_module_css_1.default['select-tile'], " row ").concat(item.disabled ? select1_module_css_1.default["disabled"] : ""), style: { paddingLeft: item.parentId ? '4.4rem' : undefined, backgroundColor: this.state.selected === item.id ? "var(--selected-background)" : undefined }, onClick: children.length ? function () {
                    if (_this.state.search) {
                        _this.setState(__assign(__assign({}, _this.state), { search: _this.state.search.map(function (e) {
                                if (e.id === item.id)
                                    return __assign(__assign({}, e), { isOpen: !item.isOpen });
                                else
                                    return e;
                            }) }));
                    }
                    else {
                        _this.setState(__assign(__assign({}, _this.state), { options: _this.state.options.map(function (e) {
                                if (e.id === item.id)
                                    return __assign(__assign({}, e), { isOpen: !item.isOpen });
                                else
                                    return e;
                            }) }));
                    }
                } : function () {
                    _this.onSelect(item);
                } },
                ((_b = this.state.search) !== null && _b !== void 0 ? _b : this.state.options).some(function (e) { return e.parentId; }) && react_1.default.createElement("div", { className: 'row', style: { width: '1.4rem', height: '1.4rem' } }, children.length ? react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: item.isOpen ? free_solid_svg_icons_1.faCaretDown : free_solid_svg_icons_1.faCaretRight, style: { fontSize: '1.2rem', color: '#161C2499' } }) : null),
                react_1.default.createElement(text_1.Text, { className: 'body-3' }, item.name)),
            react_1.default.createElement("div", { className: 'col', style: { display: item.isOpen ? "flex" : "none", width: '100%' } }, children.map(function (e) { return _this.renderOptions(e); })));
    };
    Select1.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (prevProps.options !== this.props.options) {
            this.setState(__assign(__assign({}, this.state), { options: this.props.options }));
            if (this.inputRef.current)
                this.inputRef.current.value = "".concat((_b = (_a = this.props.options.find(function (e) { return e.id === _this.state.value; })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "");
        }
        if (prevProps.value !== this.props.value)
            this.setState(__assign(__assign({}, this.state), { value: this.props.value }));
        if (prevState.value !== this.state.value && this.inputRef.current)
            this.inputRef.current.value = "".concat((_d = (_c = this.state.options.find(function (e) { return e.id === _this.state.value; })) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : "");
        //
        if (this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
            var thisPopupRect = (_e = document.body.querySelector(':scope > .col[class*="select1-popup"]')) === null || _e === void 0 ? void 0 : _e.getBoundingClientRect();
            if (thisPopupRect) {
                var style = void 0;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        right: document.body.offsetWidth - this.state.offset.right + 'px'
                    };
                }
                var _bottom = thisPopupRect.bottom - 8;
                var thisContainerRect = (_f = this.containerRef.current) === null || _f === void 0 ? void 0 : _f.getBoundingClientRect();
                if (thisContainerRect) {
                    if (_bottom > document.body.offsetHeight) {
                        style = __assign(__assign({}, (style !== null && style !== void 0 ? style : {})), { top: "".concat(thisContainerRect.y - 2 - thisPopupRect.height, "px") });
                    }
                }
                if (style) {
                    (_g = style.left) !== null && _g !== void 0 ? _g : (style.left = style.right ? undefined : "".concat(this.state.offset.x, "px"));
                    (_h = style.width) !== null && _h !== void 0 ? _h : (style.width = "".concat(this.state.offset.width, "px"));
                    this.setState(__assign(__assign({}, this.state), { style: style }));
                }
            }
        }
    };
    Select1.prototype.componentDidMount = function () {
        var _this = this;
        var _a, _b;
        if (this.inputRef.current)
            this.inputRef.current.value = "".concat((_b = (_a = this.state.options.find(function (e) { return e.id === _this.state.value; })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "");
    };
    Select1.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var _value = this.state.options.find(function (e) { return e.id === _this.state.value; });
        return react_1.default.createElement("div", { id: this.props.id, className: "".concat(select1_module_css_1.default['select1-container'], " row ").concat(this.props.disabled ? select1_module_css_1.default['disabled'] : '', " ").concat(((_a = this.props.helperText) === null || _a === void 0 ? void 0 : _a.length) && select1_module_css_1.default['helper-text'], " ").concat((_b = this.props.className) !== null && _b !== void 0 ? _b : 'body-3'), "helper-text": this.props.helperText, style: this.props.style ? __assign(__assign({}, { '--helper-text-color': (_c = this.props.helperTextColor) !== null && _c !== void 0 ? _c : '#e14337' }), this.props.style) : { '--helper-text-color': (_d = this.props.helperTextColor) !== null && _d !== void 0 ? _d : '#e14337' }, onClick: function () {
                var _a, _b, _c;
                if (!_this.state.isOpen) {
                    _this.setState(__assign(__assign({}, _this.state), { isOpen: true, style: undefined, offset: (_b = (_a = _this.containerRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect() }));
                    (_c = _this.inputRef.current) === null || _c === void 0 ? void 0 : _c.focus();
                }
            } },
            (!_value || typeof _value.name === "string" || typeof _value.name === "number") ? react_1.default.createElement("input", { ref: this.inputRef, readOnly: this.props.readOnly, onChange: this.search, placeholder: this.props.placeholder, onKeyDown: this.onKeyDown, onBlur: function (ev) {
                    if (_this.state.onSelect && !_this.props.readOnly)
                        ev.target.focus();
                    else if (!_this.state.onSelect)
                        _this.setState(__assign(__assign({}, _this.state), { isOpen: false, onSelect: null }));
                } }) : _value.name,
            this.props.showClearValueButton && _value ? react_1.default.createElement("button", { type: 'button', className: 'row', style: { padding: '0.4rem' }, onClick: function (ev) {
                    ev.stopPropagation();
                    if (_this.state.value)
                        _this.setState(__assign(__assign({}, _this.state), { isOpen: true, value: undefined }));
                } },
                react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faXmarkCircle, style: { fontSize: '1.6rem', color: "var(--neutral-text-color-subtitle)" } })) : react_1.default.createElement("div", { ref: function (iconRef) {
                    if ((iconRef === null || iconRef === void 0 ? void 0 : iconRef.parentElement) && iconRef.parentElement.getBoundingClientRect().width < 120)
                        iconRef.style.display = "none";
                }, className: 'row' },
                react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: this.state.isOpen ? free_solid_svg_icons_1.faChevronUp : free_solid_svg_icons_1.faChevronDown, style: { fontSize: '1.1rem', color: "var(--neutral-text-color-subtitle)" } })),
            this.state.isOpen &&
                react_dom_1.default.createPortal(react_1.default.createElement("div", { className: "".concat(select1_module_css_1.default['select1-popup'], " col ").concat((_e = this.props.popupClassName) !== null && _e !== void 0 ? _e : ""), style: (_f = this.state.style) !== null && _f !== void 0 ? _f : {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        left: this.state.offset.x + 'px',
                        width: this.state.offset.width,
                    }, onMouseOver: function (ev) { return _this.setState(__assign(__assign({}, _this.state), { onSelect: ev.target })); }, onMouseOut: function () { return _this.setState(__assign(__assign({}, _this.state), { onSelect: null })); } },
                    react_1.default.createElement("div", { className: "col ".concat(select1_module_css_1.default['select-body']) },
                        ((_g = this.state.search) !== null && _g !== void 0 ? _g : this.state.options).filter(function (e) { return !e.parentId; }).map(function (item) { return _this.renderOptions(item); }),
                        (((_h = this.state.search) === null || _h === void 0 ? void 0 : _h.length) === 0 || ((_j = this.props.options) === null || _j === void 0 ? void 0 : _j.length) === 0) && (react_1.default.createElement("div", { className: select1_module_css_1.default['no-results-found'] }, "No result found")))), document.body));
    };
    return Select1;
}(react_1.default.Component));
exports.Select1 = Select1;
