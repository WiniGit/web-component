"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WLoginView = void 0;
var react_1 = __importDefault(require("react"));
var index_1 = require("../../index");
var view_module_css_1 = __importDefault(require("./view.module.css"));
var react_hook_form_1 = require("react-hook-form");
var react_2 = require("react");
var react_i18next_1 = require("react-i18next");
function WLoginView(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    var methods = (0, react_hook_form_1.useForm)({ shouldFocusError: false });
    var _y = (0, react_2.useState)(false), isShowPass = _y[0], setShowPass = _y[1];
    var t = (0, react_i18next_1.useTranslation)().t;
    var _onSubmit = function (ev) {
        if (props.onSubmit)
            props.onSubmit(ev, methods);
    };
    return react_1.default.createElement("form", { id: props.id, className: "col login-view-container ".concat(view_module_css_1.default['login-view-container'], " ").concat((_a = props.className) !== null && _a !== void 0 ? _a : ''), style: props.style },
        typeof props.logo === "string" ? react_1.default.createElement("img", { alt: 'logo', src: props.logo, height: "36rem" }) : props.logo,
        react_1.default.createElement("div", { className: "col login-view-form-container ".concat(view_module_css_1.default['login-view-form-container']) },
            react_1.default.createElement(index_1.Text, { className: 'heading-4' }, (_b = props.title) !== null && _b !== void 0 ? _b : "".concat(t("loginTo"), " Wini")),
            react_1.default.createElement("div", { className: 'col' },
                react_1.default.createElement("div", { className: 'col', style: { gap: "0.8rem", overflow: "visible" } },
                    react_1.default.createElement(index_1.Text, { className: 'label-3' }, (_c = props.formData.username.label) !== null && _c !== void 0 ? _c : t("username")),
                    react_1.default.createElement(index_1.TextField, { autoComplete: 'username', className: "placeholder-2", placeholder: props.formData.username.label, style: { height: "4.8rem" }, prefix: props.formData.username.prefix, name: props.formData.username.name, register: ((_d = props.methods) !== null && _d !== void 0 ? _d : methods).register(props.formData.username.name, {
                            onChange: function (ev) { ev.target.value = ev.target.value.trim(); },
                            onBlur: props.formData.username.onValidate
                        }), onComplete: function (ev) { ev.target.blur(); }, helperText: (_g = (_f = ((_e = props.methods) !== null && _e !== void 0 ? _e : methods).formState.errors) === null || _f === void 0 ? void 0 : _f[props.formData.username.name]) === null || _g === void 0 ? void 0 : _g.message })),
                react_1.default.createElement("div", { className: 'col', style: { gap: "0.8rem", overflow: "visible" } },
                    react_1.default.createElement(index_1.Text, { className: 'label-3' }, (_h = props.formData.password.label) !== null && _h !== void 0 ? _h : t("password")),
                    react_1.default.createElement(index_1.TextField, { autoComplete: 'current-password', className: "placeholder-2", placeholder: props.formData.password.label, style: { height: "4.8rem" }, prefix: props.formData.password.prefix, suffix: react_1.default.createElement("button", { type: 'button', onClick: function () { setShowPass(!isShowPass); } },
                            react_1.default.createElement(index_1.Winicon, { src: "outline/user interface/".concat(isShowPass ? "view" : "hide"), size: "1.6rem" })), name: props.formData.password.name, type: isShowPass ? "text" : "password", register: ((_j = props.methods) !== null && _j !== void 0 ? _j : methods).register(props.formData.password.name, {
                            onChange: function (ev) { ev.target.value = ev.target.value.trim(); },
                            onBlur: props.formData.password.onValidate
                        }), onComplete: function (ev) {
                            var _a, _b, _c;
                            if ((_b = ((_a = props.methods) !== null && _a !== void 0 ? _a : methods).watch(props.formData.password.name)) === null || _b === void 0 ? void 0 : _b.length) {
                                ev.target.blur();
                                if (!props.formData.password.onValidate && props.onSubmit)
                                    _onSubmit(((_c = props.methods) !== null && _c !== void 0 ? _c : methods).getValues());
                            }
                            else
                                ev.target.blur();
                        }, helperText: (_m = (_l = ((_k = props.methods) !== null && _k !== void 0 ? _k : methods).formState.errors) === null || _l === void 0 ? void 0 : _l[props.formData.password.name]) === null || _m === void 0 ? void 0 : _m.message })),
                react_1.default.createElement(index_1.Text, { className: "button-text-3 ".concat(view_module_css_1.default['forgot-password-btn']), onClick: props.onForgotPassword }, (_o = props.forgotPasswordText) !== null && _o !== void 0 ? _o : t("forgotPassword")),
                react_1.default.createElement("div", { className: 'col', style: { gap: "1.6rem" } },
                    react_1.default.createElement(index_1.Button, { disabled: ((_q = ((_p = props.methods) !== null && _p !== void 0 ? _p : methods).watch(props.formData.username.name)) === null || _q === void 0 ? void 0 : _q.length) && ((_s = ((_r = props.methods) !== null && _r !== void 0 ? _r : methods).watch(props.formData.password.name)) === null || _s === void 0 ? void 0 : _s.length) ? false : true, className: "button-text-1 ".concat(view_module_css_1.default['login-btn']), onClick: props.onSubmit && ((_t = props.methods) !== null && _t !== void 0 ? _t : methods).handleSubmit(_onSubmit), label: (_u = props.buttonLoginLabel) !== null && _u !== void 0 ? _u : t("login") }),
                    react_1.default.createElement("div", { className: 'row', style: { justifyContent: "center", gap: "0.4rem" } },
                        react_1.default.createElement(index_1.Text, { className: 'label-4' }, (_v = props.registerPrefixText) !== null && _v !== void 0 ? _v : t("dontHaveAccount")),
                        react_1.default.createElement(index_1.Text, { className: "button-text-3 ".concat(view_module_css_1.default['register-btn']), onClick: props.onRegister }, (_w = props.registerText) !== null && _w !== void 0 ? _w : "".concat(t("signupFor"), " Wini")))),
                (props.loginWithGoogle || props.loginWithFacebook || props.loginWithApple || props.loginWithMicrosoft) ?
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("div", { className: "row ".concat(view_module_css_1.default['or-spacing']) },
                            react_1.default.createElement("div", null),
                            react_1.default.createElement(index_1.Text, { className: "label-4" }, (_x = props.orText) !== null && _x !== void 0 ? _x : t("or")),
                            react_1.default.createElement("div", null)),
                        react_1.default.createElement("div", { className: "row ".concat(view_module_css_1.default['login-social-media']) },
                            props.loginWithGoogle && react_1.default.createElement(index_1.Button, { className: "label-1", onClick: props.loginWithGoogle, prefix: react_1.default.createElement(index_1.Winicon, { src: 'color/social media/google', size: "2rem" }), label: "Google" }),
                            props.loginWithFacebook && react_1.default.createElement(index_1.Button, { className: "label-1", onClick: props.loginWithFacebook, prefix: react_1.default.createElement(index_1.Winicon, { src: 'color/social media/logo-facebook', size: "2rem" }), label: "Facebook" }),
                            props.loginWithApple && react_1.default.createElement(index_1.Button, { className: "label-1", onClick: props.loginWithApple, prefix: react_1.default.createElement(index_1.Winicon, { src: 'color/development/apple', size: "2rem" }), label: "Apple" }),
                            props.loginWithMicrosoft && react_1.default.createElement(index_1.Button, { className: "label-1", onClick: props.loginWithMicrosoft, prefix: react_1.default.createElement(index_1.Winicon, { src: 'color/development/microsoft', size: "2rem" }), label: "Microsoft" }))) : null)));
}
exports.WLoginView = WLoginView;
