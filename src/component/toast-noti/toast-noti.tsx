import { Slide, toast, ToastOptions } from 'react-toastify';
import './toast-noti.css';

const defaultOptions: ToastOptions = {
    hideProgressBar: true,
    transition: Slide,
    autoClose: 3000,
    position: "bottom-right",
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    className: "body-3",
}

export class ToastMessage {

    static infor(message: string, options?: ToastOptions) {
        toast.info(<span style={{ flex: 1 }}>{message}</span>, { ...defaultOptions, ...(options ?? {}) });
    }

    static warn(message: string, options?: ToastOptions) {
        toast.warn(<span style={{ flex: 1 }}>{message}</span>, { ...defaultOptions, ...(options ?? {}) });
    }

    static success(message: string, options?: ToastOptions) {
        toast.success(<span style={{ flex: 1 }}>{message}</span>, { ...defaultOptions, ...(options ?? {}) });
    }

    static errors(message: string, options?: ToastOptions) {
        toast.error(<span style={{ flex: 1 }}>{message}</span>, { ...defaultOptions, ...(options ?? {}) });
    }
}