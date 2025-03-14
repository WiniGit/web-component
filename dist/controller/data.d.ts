export declare class DataController {
    private module;
    constructor(module: string);
    getAll(): Promise<any>;
    getProperties(): Promise<any>;
    aggregateList(options: {
        page?: number;
        size?: number;
        searchRaw?: string;
        filter?: string;
        sortby?: Array<{
            prop: string;
            direction?: "ASC" | "DESC";
        }>;
    } | undefined): Promise<any>;
    filterByEmptyKey(options: {
        page?: number;
        size?: number;
        searchRaw?: string;
        key: string;
        notEmpty?: boolean;
        sortby?: Array<{
            prop: string;
            direction?: "ASC" | "DESC";
        }>;
    } | undefined): Promise<any>;
    group(options: {
        searchRaw?: string;
        reducers: string;
    }): Promise<any>;
    getListSimple(options: {
        page?: number;
        size?: number;
        query?: string;
        returns?: Array<string>;
        sortby?: {
            BY: string;
            DIRECTION?: "ASC" | "DESC";
        };
    } | undefined): Promise<any>;
    getById(id: string): Promise<any>;
    getByListId(ids: Array<string>): Promise<any>;
    add(data: Array<{
        [p: string]: any;
    }>): Promise<any>;
    edit(data: Array<{
        [p: string]: any;
    }>): Promise<any>;
    delete(ids: Array<string>): Promise<any>;
    checkotp(idToken: string): Promise<any>;
}
export declare class SettingDataController {
    private setting;
    private type;
    constructor(setting: "model" | "reducer" | "chart" | "form" | "card");
    action(action: "add" | "edit" | "delete", options: {
        data?: Array<{
            [p: string]: any;
        }>;
        ids?: Array<string>;
    }): Promise<any>;
    getListSimple(options: {
        page?: number;
        size?: number;
        query?: string;
        returns?: Array<string>;
        sortby?: {
            BY: string;
            DIRECTION?: "ASC" | "DESC";
        };
    } | undefined): Promise<any>;
    getByIds(ids: Array<string>): Promise<any>;
}
export declare class AccountController {
    login(body: {
        type: "phone" | "apple" | "google" | "microsoft";
        token?: string;
        deviceToken?: string;
        ggClientId?: string;
        phone?: string;
    }, resolve?: () => void): Promise<any>;
    getInfor(): Promise<any>;
}
//# sourceMappingURL=data.d.ts.map