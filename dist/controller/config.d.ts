export declare class ConfigData {
    static pid: string;
    static url: string;
    static fileUrl: string;
    static imgUrlId: string;
    static extraPlugins: undefined;
    static onInvalidToken: () => void;
}
export declare const imgFileTypes: string[];
export declare class BaseDA {
    static post: (url: string, options?: {
        headers?: {
            [k: string]: any;
        };
        body?: any;
    }) => Promise<any>;
    static postFile: (url: string, options?: {
        headers?: {
            [k: string]: any;
        };
        body?: FormData;
    }) => Promise<any>;
    static get: (url: string, options?: {
        headers?: {
            [k: string]: any;
        };
    }) => Promise<any>;
    static uploadFiles: (listFile: Array<File>) => Promise<any>;
    static getFilesInfor: (ids: Array<string>) => Promise<any>;
    static updateFilesInfor: (data: Array<{
        [p: string]: any;
    }>) => Promise<any>;
}
export declare class CkEditorUploadAdapter {
    loader: any;
    xhr: XMLHttpRequest | undefined;
    constructor(loader: any);
    upload(): any;
    abort(): void;
    _initRequest(): void;
    _initListeners(resolve: {
        (value: unknown): void;
        (arg0: {
            default: string;
        }): void;
    }, reject: {
        (reason?: any): void;
        (arg0: string | undefined): any;
    }, file: {
        name: any;
    }): void;
    _sendRequest(file: string | Blob): void;
}
//# sourceMappingURL=config.d.ts.map