export declare class Util {
    static dateTime_stringToDecimal(stringDate: string): number;
    static tryParseInt(input: string): number;
    static tryParseFloat(input: string): number;
    static dateDefault: number;
    static set_timeRefreshToken(): void;
    static get_timeRefreshToken(): number | undefined;
    static calculateAge: (birthdate: string) => number;
    static getStringDateNow(): string;
    /**
     * number to money format.\
     * ex: 199999 => 1,999,999
     * */
    static money(number: number | string): string | 0;
    static moneytmp(number: number, a: number): string;
    static stringToDate(_date: string, _format?: string, _delimiter?: string): Date;
    static datetoStringDefault(): string;
    /** date: dd/mm/yyyy | yyyy/mm/dd | dd/mm | mm/yyyy
        time: hh:mm:ss | hh:mm */
    static datetoString(x?: Date, y?: string): string;
    dateDefault: Date;
    /**
     * action with localStorage
     *  */
    static setStorage(key: string, value: string): void;
    static getStorage: (key: string) => string | null;
    static clearStorage(): void;
    static removeStorage(key: string): void;
    /**
     * action with sessionStorage, The data is deleted when the browser is closed
     *  */
    static setSession(key: string, value: string): void;
    static getSession: (key: string) => string | null;
    static clearSession(): void;
    static removeSession(key: string): void;
    /**
     * action with cookie
     * */
    static setCookie(cname: string, cvalue: number | string, exdays?: number): void;
    static getCookie(cname: string): string;
    static deleteCookie(cname: string): void;
    static clearCookie(exceptCookie?: string[]): void;
    static randomString(length: number): string;
    static decodeJwtResponse(token: string): any;
    static percentToHex: (p: number) => string;
    static hexToPercent: (h: string) => number;
    static hexToRGB(hex: string): string;
    static rgbToHex(rgba: string): string;
    static colorNameToHex(color: string): string;
    static prettyJsonToString(data: {
        [p: string]: any;
    }): string;
    static syntaxHighlight(json: {
        [p: string]: any;
    }): string;
    static generateRandomColor(): string;
    static generateLightColorRgb(): string;
    static generateDarkColorRgb(number: number): string;
    static toSlug(input: string): string;
    static convertToKebabCase: (str: string) => string;
}
export declare function formatNumberConvert(num: number): string;
export declare function inputMoneyPattern(ev: any): void;
export declare const randomGID: () => string;
//# sourceMappingURL=utils.d.ts.map