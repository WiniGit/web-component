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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMultiple = void 0;
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
require("./input-multi-select.css");
var index_1 = require("../../index");
;
var SelectMultiple = /** @class */ (function (_super) {
    __extends(SelectMultiple, _super);
    function SelectMultiple(props) {
        var _this = this;
        var _a;
        _this = _super.call(this, props) || this;
        _this.state = {
            value: (_a = props.value) !== null && _a !== void 0 ? _a : [],
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
        _this.onCheck = _this.onCheck.bind(_this);
        _this.search = _this.search.bind(_this);
        return _this;
    }
    SelectMultiple.prototype.onCheck = function (item) {
        var newValue = [];
        if (this.state.value.includes(item.id)) {
            newValue = this.state.value.filter(function (vl) { return vl !== item.id; });
        }
        else {
            newValue = __spreadArray(__spreadArray([], this.state.value, true), [item.id], false);
        }
        this.setState(__assign(__assign({}, this.state), { value: newValue }));
        if (this.props.onChange)
            this.props.onChange(newValue);
    };
    SelectMultiple.prototype.search = function (ev) {
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
    SelectMultiple.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a, _b;
        if (prevProps.value !== this.props.value) {
            this.setState(__assign(__assign({}, this.state), { value: (_a = this.props.value) !== null && _a !== void 0 ? _a : [] }));
        }
        if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
            var thisPopupRect = (_b = document.body.querySelector('.select-multi-popup')) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
            if (thisPopupRect) {
                var style = void 0;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        width: "".concat(this.state.offset.width, "px"),
                        right: document.body.offsetWidth - this.state.offset.right + 'px'
                    };
                }
                if (thisPopupRect.bottom - 12 > document.body.offsetHeight) {
                    style = style ? __assign(__assign({}, style), { top: undefined, bottom: document.body.offsetHeight - this.state.offset.bottom + 'px' }) : {
                        left: this.state.offset.x + 'px',
                        width: "".concat(this.state.offset.width, "px"),
                        bottom: document.body.offsetHeight - this.state.offset.bottom + 'px'
                    };
                }
                if (style)
                    this.setState(__assign(__assign({}, this.state), { style: style }));
            }
        }
    };
    SelectMultiple.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return react_1.default.createElement("div", { className: "select-multi-container row ".concat(this.props.disabled ? 'disabled' : '', " ").concat(((_a = this.props.helperText) === null || _a === void 0 ? void 0 : _a.length) && 'helper-text'), "helper-text": this.props.helperText, style: this.props.style ? __assign(__assign({}, { '--helper-text-color': (_b = this.props.helperTextColor) !== null && _b !== void 0 ? _b : '#e14337' }), this.props.style) : { '--helper-text-color': (_c = this.props.helperTextColor) !== null && _c !== void 0 ? _c : '#e14337' }, onClick: function (ev) {
                var _a;
                if (!_this.state.isOpen) {
                    _this.setState(__assign(__assign({}, _this.state), { isOpen: true, style: undefined, offset: ((_a = ev.target.closest('.select-multi-container')) !== null && _a !== void 0 ? _a : ev.target).getBoundingClientRect() }));
                }
            } },
            react_1.default.createElement("div", { className: 'row', style: { overflow: 'auto hidden', flex: 1, width: '100%', gap: '0.8rem' } }, ((_d = this.state.value) === null || _d === void 0 ? void 0 : _d.length) ? (this.state.value.map(function (item) {
                var optionItem = _this.props.options.find(function (e) { return e.id === item; });
                return react_1.default.createElement("div", { key: item, className: 'selected-item-value row', onClick: function (ev) {
                        var _a;
                        ev.stopPropagation();
                        var newValue = _this.state.value.filter(function (vl) { return vl !== item; });
                        _this.setState(__assign(__assign({}, _this.state), { value: newValue, isOpen: true, style: undefined, offset: ((_a = ev.target.closest('.select-multi-container')) !== null && _a !== void 0 ? _a : ev.target).getBoundingClientRect() }));
                        if (_this.props.onChange)
                            _this.props.onChange(newValue);
                    } },
                    react_1.default.createElement("div", { className: 'selected-value-title' }, optionItem === null || optionItem === void 0 ? void 0 : optionItem.name),
                    react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faClose, style: { color: '#161D24E5', fontSize: '1.2rem' } }));
            })) : (react_1.default.createElement("div", { className: 'select-multi-placeholder' }, this.props.placeholder))),
            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: this.state.isOpen ? free_solid_svg_icons_1.faChevronUp : free_solid_svg_icons_1.faChevronDown, style: { fontSize: '1.2rem', color: '#888' } }),
            this.state.isOpen &&
                react_dom_1.default.createPortal(react_1.default.createElement("div", { className: 'select-multi-popup col', style: (_e = this.state.style) !== null && _e !== void 0 ? _e : {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        left: this.state.offset.x + 'px',
                        width: this.state.offset.width,
                    }, onMouseOver: function (ev) {
                        _this.setState(__assign(__assign({}, _this.state), { onSelect: ev.target }));
                    }, onMouseOut: function () {
                        return _this.setState(__assign(__assign({}, _this.state), { onSelect: null }));
                    } },
                    react_1.default.createElement("div", { className: 'row header-search' },
                        react_1.default.createElement("input", { autoFocus: true, placeholder: 'Tìm kiếm', onChange: this.search, onBlur: function (ev) {
                                if (_this.state.onSelect) {
                                    ev.target.focus();
                                }
                                else {
                                    _this.setState(__assign(__assign({}, _this.state), { isOpen: false, onSelect: null }));
                                }
                            } }),
                        react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSearch, style: { fontSize: '1.2rem', color: '#161D24D9' } })),
                    react_1.default.createElement("div", { style: { padding: '1.2rem 1.6rem', width: '100%', borderTop: '1px solid #161D2414', borderBottom: '1px solid #161D2414' } }, (function () {
                        var _a, _b;
                        var _list = ((_b = (_a = _this.state.search) !== null && _a !== void 0 ? _a : _this.props.options) !== null && _b !== void 0 ? _b : []);
                        var isSelectedAll = _list.every(function (item) { return _this.state.value.some(function (vl) { return vl === item.id; }); });
                        return react_1.default.createElement(index_1.Text, { onClick: function () {
                                var newValue = [];
                                if (_list.length) {
                                    if (isSelectedAll) {
                                        newValue = _this.state.value.filter(function (vl) { return _list.every(function (item) { return vl !== item.id; }); });
                                    }
                                    else {
                                        newValue = __spreadArray(__spreadArray([], _this.state.value, true), _list.filter(function (item) { return _this.state.value.every(function (vl) { return vl !== item.id; }); }).map(function (e) { return e.id; }), true);
                                    }
                                }
                                _this.setState(__assign(__assign({}, _this.state), { value: newValue }));
                                if (_this.props.onChange)
                                    _this.props.onChange(newValue);
                            }, className: 'button-text-3', style: { color: _list.length ? 'var(--primary-color)' : '#00204D99', } }, _list.length && isSelectedAll ? 'Bỏ chọn tất cả' : 'Chọn tất cả');
                    })()),
                    react_1.default.createElement("div", { className: 'col select-body' },
                        ((_g = (_f = this.state.search) !== null && _f !== void 0 ? _f : this.props.options) !== null && _g !== void 0 ? _g : []).map(function (item) { return (react_1.default.createElement("div", { key: item.id, className: 'select-tile row' },
                            react_1.default.createElement(index_1.Checkbox, { value: _this.state.value.some(function (vl) { return vl === item.id; }), onChange: function () { _this.onCheck(item); }, size: '2rem' }),
                            react_1.default.createElement("div", { className: 'label-3' }, item.name))); }),
                        (((_h = this.state.search) === null || _h === void 0 ? void 0 : _h.length) === 0 || ((_j = this.props.options) === null || _j === void 0 ? void 0 : _j.length) === 0) && (react_1.default.createElement("div", { className: 'no-results-found' }, "No result found")))), document.body));
    };
    return SelectMultiple;
}(react_1.default.Component));
exports.SelectMultiple = SelectMultiple;
