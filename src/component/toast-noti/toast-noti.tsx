import { Slide, toast, ToastOptions } from 'react-toastify';
import './toast-noti.css';

const defaultOptions: ToastOptions = {
    hideProgressBar: true,
    transition: Slide,
    autoClose: 3000,
    position: "bottom-right",
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
}

export class ToastMessage {

    static success(message: string, options?: ToastOptions) {
        toast.success(<span style={{ flex: 1 }}>{message}</span>, { ...defaultOptions, ...(options ?? {}) });
    }

    static errors(message: string, options?: ToastOptions) {
        toast.error(<span style={{ flex: 1 }}>{message}</span>, { ...defaultOptions, ...(options ?? {}) });
    }
}