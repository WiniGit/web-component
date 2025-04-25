import { CSSProperties, Dispatch, MouseEventHandler, ReactNode, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';
interface Props {
    /**
    * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
    * */
    childrenData?: {
        [p: string]: (itemData: {
            [p: string]: any;
        }, index: number, methods?: UseFormReturn) => ReactNode;
    };
    /**
     * custom props of layer by id. Ex: { "gid": { style: { width: "60rem", backgroundColor: "red" }, className: "my-class" } }
     * */
    propsData?: {
        [p: string]: (itemData: {
            [p: string]: any;
        }, index: number, methods?: UseFormReturn) => {
            style?: CSSProperties;
            className?: string;
            onCLick?: (ev: MouseEventHandler) => void;
            [p: string]: any;
        };
    };
    /**
     * replace layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    itemData?: {
        [p: string]: (indexItem: {
            [p: string]: any;
        }, index: number, methods?: UseFormReturn) => ReactNode;
    };
    /**
     * list json object data. Ex: {Id: 1, Name: "Example", ...}
     * */
    cardData?: Array<{
        [p: string]: any;
    }>;
    style?: CSSProperties;
    className?: string;
    controller?: "all" | {
        page: number;
        size: number;
        searchRaw?: string;
        filter?: string;
        sortby?: Array<{
            prop: string;
            direction?: "ASC" | "DESC";
        }>;
    } | {
        ids: string;
        maxLength?: number | "none";
    };
    methods?: UseFormReturn;
    emptyLink?: string;
    onUnMount?: () => void;
}
interface CardProps extends Props {
    id: string;
    methods?: UseFormReturn;
    onLoaded?: (ev: {
        data: Array<{
            [p: string]: any;
        }>;
        totalCount: number;
    }) => void;
}
interface CardRef {
    getData: (page?: number) => Promise<void>;
    data: {
        data: Array<{
            [p: string]: any;
        }>;
        totalCount?: number;
    };
    controller: "all" | {
        page: number;
        size: number;
        searchRaw?: string;
        filter?: string;
        sortby?: Array<{
            prop: string;
            direction?: "ASC" | "DESC";
        }>;
    } | {
        ids: string;
        maxLength?: number | "none";
    };
    setData: Dispatch<SetStateAction<{
        data: Array<{
            [p: string]: any;
        }>;
        totalCount?: number;
    }>>;
}
export declare const CardById: import('react').ForwardRefExoticComponent<CardProps & import('react').RefAttributes<CardRef>>;
export {};
//# sourceMappingURL=cardById.d.ts.map