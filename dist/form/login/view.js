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
function WLoginView(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var methods = (0, react_hook_form_1.useForm)({ shouldFocusError: false });
    var _o = (0, react_2.useState)(false), isShowPass = _o[0], setShowPass = _o[1];
    return react_1.default.createElement("div", { className: "col login-view-container ".concat(view_module_css_1.default['login-view-container']) },
        typeof props.logo === "string" ? react_1.default.createElement("img", { alt: 'logo', src: props.logo, height: "36rem" }) : props.logo,
        react_1.default.createElement("div", { className: "col login-view-form-container ".concat(view_module_css_1.default['login-view-form-container']) },
            react_1.default.createElement(index_1.Text, { className: 'heading-4' }, (_a = props.title) !== null && _a !== void 0 ? _a : "Log in to Wini"),
            react_1.default.createElement("div", { className: 'col' },
                react_1.default.createElement("div", { className: 'col', style: { gap: "0.8rem" } },
                    react_1.default.createElement(index_1.Text, { className: 'label-3' }, "Email"),
                    react_1.default.createElement(index_1.TextField, { className: "placeholder-2", placeholder: props.formData.username.label, style: { height: "4.8rem" }, prefix: props.formData.username.prefix, name: props.formData.username.name, register: methods.register(props.formData.username.name, {
                            onChange: function (ev) { ev.target.value = ev.target.value.trim(); },
                            onBlur: props.formData.username.onValidate
                        }), onComplete: function (ev) { ev.target.blur(); }, helperText: (_c = (_b = methods.formState.errors) === null || _b === void 0 ? void 0 : _b[props.formData.username.name]) === null || _c === void 0 ? void 0 : _c.message })),
                react_1.default.createElement("div", { className: 'col', style: { gap: "0.8rem" } },
                    react_1.default.createElement(index_1.Text, { className: 'label-3' }, "Email"),
                    react_1.default.createElement(index_1.TextField, { className: "placeholder-2", placeholder: props.formData.password.label, style: { height: "4.8rem" }, prefix: props.formData.password.prefix, suffix: react_1.default.createElement("button", { type: 'button', onClick: function () { setShowPass(!isShowPass); } },
                            react_1.default.createElement(index_1.Winicon, { src: "outline/user interface/".concat(isShowPass ? "view" : "hide"), size: "1.6rem" })), name: props.formData.password.name, type: isShowPass ? "text" : "password", register: methods.register(props.formData.password.name, {
                            onChange: function (ev) { ev.target.value = ev.target.value.trim(); },
                            onBlur: props.formData.password.onValidate
                        }), onComplete: function (ev) {
                            var _a;
                            if ((_a = methods.watch(props.formData.password.name)) === null || _a === void 0 ? void 0 : _a.length) {
                                ev.target.blur();
                                if (!props.formData.password.onValidate && props.onSubmit)
                                    props.onSubmit(methods.getValues());
                            }
                            else
                                ev.target.blur();
                        }, helperText: (_e = (_d = methods.formState.errors) === null || _d === void 0 ? void 0 : _d[props.formData.password.name]) === null || _e === void 0 ? void 0 : _e.message })),
                react_1.default.createElement(index_1.Text, { className: "button-text-3 ".concat(view_module_css_1.default['forgot-password-btn']), onClick: props.onForgotPassword }, (_f = props.forgotPasswordText) !== null && _f !== void 0 ? _f : "Forgot your password?"),
                react_1.default.createElement("div", { className: 'col', style: { gap: "1.6rem" } },
                    react_1.default.createElement(index_1.Button, { disabled: ((_g = methods.watch(props.formData.username.name)) === null || _g === void 0 ? void 0 : _g.length) && ((_h = methods.watch(props.formData.password.name)) === null || _h === void 0 ? void 0 : _h.length) ? false : true, className: "button-text-1 ".concat(view_module_css_1.default['login-btn']), onClick: props.onSubmit && methods.handleSubmit(props.onSubmit), label: (_j = props.buttonLoginLabel) !== null && _j !== void 0 ? _j : "Log In" }),
                    react_1.default.createElement("div", { className: 'row', style: { justifyContent: "center", gap: "0.4rem" } },
                        react_1.default.createElement(index_1.Text, { className: 'label-4' }, (_k = props.registerPrefixText) !== null && _k !== void 0 ? _k : "Don't have an account?"),
                        react_1.default.createElement(index_1.Text, { className: "button-text-3 ".concat(view_module_css_1.default['register-btn']), onClick: props.onRegister }, (_l = props.registerText) !== null && _l !== void 0 ? _l : "Sign up for Wini"))),
                react_1.default.createElement("div", { className: "row ".concat(view_module_css_1.default['or-spacing']) },
                    react_1.default.createElement("div", null),
                    react_1.default.createElement(index_1.Text, { className: "label-4" }, (_m = props.orText) !== null && _m !== void 0 ? _m : "Or"),
                    react_1.default.createElement("div", null)),
                react_1.default.createElement("div", { className: "row ".concat(view_module_css_1.default['login-social-media']) },
                    react_1.default.createElement(index_1.Button, { className: "label-1", onClick: props.loginWithGoogle, prefix: react_1.default.createElement(index_1.Winicon, { src: 'color/social media/google', size: "2rem" }), label: "Google" }),
                    react_1.default.createElement(index_1.Button, { className: "label-1", onClick: props.loginWithFacebook, prefix: react_1.default.createElement(index_1.Winicon, { src: 'color/social media/logo-facebook', size: "2rem" }), label: "Facebook" })))));
}
exports.WLoginView = WLoginView;
