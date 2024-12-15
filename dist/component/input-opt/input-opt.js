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
exports.InputOpt = void 0;
var react_1 = __importStar(require("react"));
var input_opt_module_css_1 = __importDefault(require("./input-opt.module.css"));
var InputOpt = /** @class */ (function (_super) {
    __extends(InputOpt, _super);
    function InputOpt(props) {
        var _this = _super.call(this, props) || this;
        _this.containerRef = (0, react_1.createRef)();
        _this.getValue = function () {
            var _a;
            if (_this.containerRef.current)
                return __spreadArray([], _this.containerRef.current.querySelectorAll("input"), true).map(function (v) { return v.value; }).join("");
            else
                return (_a = _this.props.value) !== null && _a !== void 0 ? _a : "";
        };
        _this.getValue = _this.getValue.bind(_this);
        return _this;
    }
    InputOpt.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        var _a;
        if (prevProps.value !== this.props.value && this.containerRef.current) {
            var inputList = __spreadArray([], this.containerRef.current.querySelectorAll("input"), true);
            if ((_a = this.props.value) === null || _a === void 0 ? void 0 : _a.length) {
                for (var i = 0; i < inputList.length; i++)
                    inputList[i].value = this.props.value[i];
            }
            else {
                for (var i = 0; i < inputList.length; i++)
                    inputList[i].value = "";
            }
        }
    };
    InputOpt.prototype.render = function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        return react_1.default.createElement("div", { id: this.props.id, ref: this.containerRef, "helper-text": this.props.helperText, style: this.props.style ? __assign(__assign({}, { '--helper-text-color': (_a = this.props.helperTextColor) !== null && _a !== void 0 ? _a : '#e14337' }), this.props.style) : { '--helper-text-color': (_b = this.props.helperTextColor) !== null && _b !== void 0 ? _b : '#e14337' }, className: "row body-1 ".concat(input_opt_module_css_1.default['input-opt-container'], " ").concat(((_c = this.props.helperText) === null || _c === void 0 ? void 0 : _c.length) && 'helper-text', " ").concat((_d = this.props.className) !== null && _d !== void 0 ? _d : ''), onMouseDown: function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                var inputList = __spreadArray([], ev.target.closest("div").childNodes, true);
                for (var _i = 0, _a = inputList.entries(); _i < _a.length; _i++) {
                    var _b = _a[_i], index = _b[0], input = _b[1];
                    if (!input.value.length || index === (inputList.length - 1)) {
                        input.focus();
                        break;
                    }
                    continue;
                }
            } }, Array.from({ length: (_e = this.props.length) !== null && _e !== void 0 ? _e : 6 }).map(function (_, i) { return react_1.default.createElement("input", { key: "opt-" + i, disabled: _this.props.disabled, onKeyDown: function (ev) {
                var _a, _b;
                var key = ev.key.toLowerCase();
                switch (key) {
                    case "backspace":
                        if (ev.target.value.length)
                            ev.target.value = "";
                        else if (((_a = ev.target.previousSibling) === null || _a === void 0 ? void 0 : _a.localName) === "input")
                            ev.target.previousSibling.focus();
                        else
                            ev.target.blur();
                        break;
                    case "delete":
                        ev.target.value = "";
                        break;
                    default:
                        var numberCheck = /[0-9]/g;
                        if (numberCheck.test(key)) {
                            if (!ev.target.value.length)
                                ev.target.value = key;
                            if (((_b = ev.target.nextSibling) === null || _b === void 0 ? void 0 : _b.localName) === "input" && !ev.target.nextSibling.value.length)
                                ev.target.nextSibling.focus();
                            else
                                ev.target.blur();
                        }
                        else
                            ev.preventDefault();
                        break;
                }
            }, onBlur: function () {
                if (_this.props.onChange)
                    _this.props.onChange(_this.getValue(), _this.containerRef.current);
            } }); }));
    };
    return InputOpt;
}(react_1.default.Component));
exports.InputOpt = InputOpt;
