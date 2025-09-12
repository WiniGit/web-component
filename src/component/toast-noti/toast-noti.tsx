import { Slide, toast, ToastOptions } from 'react-toastify';
import './toast-noti.css';

const defaultOptions = {
    hideProgressBar: true,
    transition: Slide,
    autoClose: 5000,
    theme: "colored",
    className: "body-3"
}

export class ToastMessage {

    static success(message: string, options?: ToastOptions) {
        toast.success(message, { ...defaultOptions, ...(options ?? {}) });
    }

    static errors(message: string, options?: ToastOptions) {
        toast.error(message, { ...defaultOptions, ...(options ?? {}) });
    }
}