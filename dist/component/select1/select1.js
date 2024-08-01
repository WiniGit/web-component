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
exports.Select1 = void 0;
var react_1 = __importDefault(require("react"));
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var react_dom_1 = __importDefault(require("react-dom"));
require("./select1.css");
;
;
var Select1 = /** @class */ (function (_super) {
    __extends(Select1, _super);
    function Select1(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: _this.props.value,
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
        _this.parseValue = _this.parseValue.bind(_this);
        _this.onChangeValue = _this.onChangeValue.bind(_this);
        _this.search = _this.search.bind(_this);
        return _this;
    }
    Select1.prototype.parseValue = function (value) {
        if (value === null || value === undefined || value === '') {
            return null;
        }
        switch (typeof this.props.options[0].id) {
            case 'number':
                return parseFloat(value);
            default:
                return value;
        }
    };
    Select1.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a;
        if (prevProps.value !== this.props.value) {
            this.setState(__assign(__assign({}, this.state), { value: this.props.value }));
        }
        if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
            var thisPopupRect = (_a = document.body.querySelector('.select1-popup')) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            if (thisPopupRect) {
                var style = void 0;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        width: "".concat(this.state.offset.width, "px"),
                        right: document.body.offsetWidth - this.state.offset.right + 'px'
                    };
                }
                if (thisPopupRect.bottom > document.body.offsetHeight) {
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
    Select1.prototype.onChangeValue = function (ev) {
        var _this = this;
        var _a, _b;
        if ((_b = (_a = this.state.onSelect) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.contains('select1-tile')) {
            var item = this.props.options.find(function (e) { return e.id === _this.parseValue(_this.state.onSelect.id); });
            this.setState(__assign(__assign({}, this.state), { isOpen: false, onSelect: null, value: item === null || item === void 0 ? void 0 : item.id }));
            if (this.props.onChange)
                this.props.onChange(item);
        }
        else if (this.state.onSelect) {
            ev.target.focus();
        }
        else {
            this.setState(__assign(__assign({}, this.state), { isOpen: false, onSelect: null }));
        }
    };
    Select1.prototype.search = function (ev) {
        var _this = this;
        if (ev.target.value.trim().length) {
            if (this.props.handleSearch) {
                this.props.handleSearch(ev.target.value.trim()).then(function (res) {
                    _this.setState(__assign(__assign({}, _this.state), { search: res }));
                });
            }
            else {
                this.setState(__assign(__assign({}, this.state), { search: this.props.options.filter(function (e) { return typeof e.name === "string" && e.name.toLowerCase().includes(ev.target.value.trim().toLowerCase()); }) }));
            }
        }
        else {
            this.setState(__assign(__assign({}, this.state), { search: undefined }));
        }
    };
    Select1.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var selectedValue = ((_a = this.props.options) !== null && _a !== void 0 ? _a : []).find(function (e) { return e.id === _this.state.value; });
        return react_1.default.createElement("div", { className: "select1-container row ".concat((_b = this.props.className) !== null && _b !== void 0 ? _b : 'placeholder-2', " ").concat(this.props.disabled ? 'disabled' : '', " ").concat(((_c = this.props.helperText) === null || _c === void 0 ? void 0 : _c.length) && 'helper-text'), "helper-text": this.props.helperText, style: this.props.style ? __assign(__assign({}, { '--helper-text-color': (_d = this.props.helperTextColor) !== null && _d !== void 0 ? _d : '#e14337' }), this.props.style) : { '--helper-text-color': (_e = this.props.helperTextColor) !== null && _e !== void 0 ? _e : '#e14337' }, onClick: function (ev) {
                var _a;
                if (!_this.state.isOpen) {
                    var _offset = ((_a = ev.target.closest('.select1-container')) !== null && _a !== void 0 ? _a : ev.target).getBoundingClientRect();
                    if (_offset.bottom + 32 > document.body.offsetHeight) {
                        _this.setState(__assign(__assign({}, _this.state), { isOpen: true, offset: _offset, style: {
                                left: _offset.x + 'px',
                                bottom: (document.body.offsetHeight - _offset.y) + 'px',
                                width: "".concat(_offset.width / 10, "rem")
                            } }));
                    }
                    else {
                        _this.setState(__assign(__assign({}, _this.state), { isOpen: true, offset: _offset, style: undefined }));
                    }
                }
            } },
            (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.name) ? (react_1.default.createElement("div", { className: 'select1-value-name' }, selectedValue.name)) : (react_1.default.createElement("div", { className: 'select1-placeholder' }, this.props.placeholder)),
            react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: this.state.isOpen ? free_solid_svg_icons_1.faChevronUp : free_solid_svg_icons_1.faChevronDown, style: { fontSize: '1.2rem', color: '#888' } }),
            this.state.isOpen &&
                react_dom_1.default.createPortal(react_1.default.createElement("div", { className: 'select1-popup col', style: (_f = this.state.style) !== null && _f !== void 0 ? _f : {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        left: this.state.offset.x + 'px',
                        width: this.state.offset.width,
                    }, onMouseOver: function (ev) {
                        _this.setState(__assign(__assign({}, _this.state), { onSelect: ev.target }));
                    }, onMouseOut: function () {
                        return _this.setState(__assign(__assign({}, _this.state), { onSelect: null }));
                    } },
                    react_1.default.createElement("div", { className: 'row header-search', style: this.props.hideSearch ? { marginTop: '-4rem' } : undefined },
                        react_1.default.createElement("input", { autoFocus: true, placeholder: (_g = this.props.searchPlaceholder) !== null && _g !== void 0 ? _g : 'Tìm kiếm', onChange: this.search, onBlur: function (ev) {
                                _this.onChangeValue(ev);
                            } }),
                        react_1.default.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSearch, style: { fontSize: '1.2rem', color: '#161D24D9' } })),
                    react_1.default.createElement("div", { className: 'col select1-body' },
                        react_1.default.createElement("div", { className: 'col select1-scroll-view' },
                            ((_h = this.state.search) !== null && _h !== void 0 ? _h : this.props.options).map(function (item) {
                                var _a;
                                return (react_1.default.createElement("button", { type: 'button', key: item.id, className: 'select1-tile label-3 row', id: "".concat(item.id), style: { backgroundColor: (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.id) === item.id ? 'var(--selected-background)' : '#00000000' } }, (_a = item.title) !== null && _a !== void 0 ? _a : item.name));
                            }),
                            (((_j = this.state.search) === null || _j === void 0 ? void 0 : _j.length) === 0 || ((_k = this.props.options) === null || _k === void 0 ? void 0 : _k.length) === 0) && (react_1.default.createElement("div", { className: 'no-results-found' }, "No result found"))))), document.body));
    };
    return Select1;
}(react_1.default.Component));
exports.Select1 = Select1;
