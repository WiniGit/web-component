import { BaseDA, ConfigData } from "./config";

export class TableController {
    private module: "table" | "column" | "rel" | "menu" | "page" | "layer" | "designtoken" | "workflow" | "stage" | "settingstage";
    constructor(module: "table" | "column" | "rel" | "menu" | "page" | "layer" | "designtoken" | "workflow" | "stage" | "settingstage") {
        this.module = module
    }

    async getAll() {
        const res = await BaseDA.get(ConfigData.url + 'setting/getAll', {
            headers: {
                pid: ConfigData.pid,
                module: this.module,
            },
        })
        return res
    }

    async getByListId(ids: Array<string>) {
        const res = await BaseDA.post(ConfigData.url + 'setting/getByIds', {
            headers: {
                pid: ConfigData.pid,
                module: this.module,
            },
            body: { ids: ids }
        })
        return res
    }

    async getListSimple(options?: { page?: number, size?: number, query?: string, returns?: Array<string>, sortby?: { BY: string, DIRECTION?: "ASC" | "DESC" } }) {
        const res = await BaseDA.post(ConfigData.url + 'setting/getListSimple', {
            headers: {
                pid: ConfigData.pid,
                module: this.module,
            },
            body: { searchRaw: options?.query ?? "*", page: options?.page ?? 1, size: options?.size ?? 10, returns: options?.returns, sortby: options?.sortby }
        })
        return res
    }

    async group(options: { searchRaw?: string, reducers: string }) {
        const res = await BaseDA.post(ConfigData.url + 'setting/group', {
            headers: {
                pid: ConfigData.pid,
                module: this.module,
            },
            body: options
        })
        return res
    }

    async add(data: Array<{ [p: string]: any }>) {
        const res = await BaseDA.post(ConfigData.url + 'setting/action?action=add', {
            headers: {
                pid: ConfigData.pid,
                module: this.module
            },
            body: { data: data }
        })
        return res
    }

    async edit(data: Array<{ [p: string]: any }>) {
        const res = await BaseDA.post(ConfigData.url + 'setting/action?action=edit', {
            headers: {
                pid: ConfigData.pid,
                module: this.module
            },
            body: { data: data }
        })
        return res
    }

    async delete(ids: Array<string>) {
        const res = await BaseDA.post(ConfigData.url + 'setting/action?action=delete', {
            headers: {
                pid: ConfigData.pid,
                module: this.module
            },
            body: { ids: ids }
        })
        return res
    }
}