"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastMessage = void 0;
var react_toastify_1 = require("react-toastify");
require("./toast-noti.css");
var ToastMessage = /** @class */ (function () {
    function ToastMessage() {
    }
    ToastMessage.success = function (message) {
        react_toastify_1.toast.success(message, {
            hideProgressBar: true,
            transition: react_toastify_1.Slide,
            autoClose: 800,
            theme: "colored",
        });
    };
    ToastMessage.errors = function (message) {
        react_toastify_1.toast.error(message, {
            theme: "colored",
            pauseOnHover: false,
            hideProgressBar: true,
            transition: react_toastify_1.Slide,
            autoClose: 800,
        });
    };
    return ToastMessage;
}());
exports.ToastMessage = ToastMessage;
