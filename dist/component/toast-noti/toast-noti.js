"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastMessage = void 0;
const react_toastify_1 = require("react-toastify");
require("./toast-noti.css");
class ToastMessage {
    static success(message) {
        react_toastify_1.toast.success(message, {
            hideProgressBar: true,
            transition: react_toastify_1.Slide,
            autoClose: 800,
            theme: "colored",
        });
    }
    static errors(message) {
        react_toastify_1.toast.error(message, {
            theme: "colored",
            pauseOnHover: false,
            hideProgressBar: true,
            transition: react_toastify_1.Slide,
            autoClose: 800,
        });
    }
}
exports.ToastMessage = ToastMessage;
