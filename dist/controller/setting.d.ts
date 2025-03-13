export declare class TableController {
    private module;
    constructor(module: "table" | "column" | "rel" | "menu" | "page" | "layer" | "designtoken" | "workflow" | "stage" | "settingstage");
    getAll(): Promise<any>;
    getByListId(ids: Array<string>): Promise<any>;
    getListSimple(options?: {
        page?: number;
        size?: number;
        query?: string;
        returns?: Array<string>;
        sortby?: {
            BY: string;
            DIRECTION?: "ASC" | "DESC";
        };
    }): Promise<any>;
    group(options: {
        searchRaw?: string;
        reducers: string;
    }): Promise<any>;
    add(data: Array<{
        [p: string]: any;
    }>): Promise<any>;
    edit(data: Array<{
        [p: string]: any;
    }>): Promise<any>;
    delete(ids: Array<string>): Promise<any>;
}
//# sourceMappingURL=setting.d.ts.map