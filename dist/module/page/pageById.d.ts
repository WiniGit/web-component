import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
interface Props {
    /**
     * replace layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    methods?: UseFormReturn;
}
interface RenderLayerElementProps extends Props {
    item: {
        [p: string]: any;
    };
    list: Array<{
        [p: string]: any;
    }>;
    bodyChildren?: ReactNode;
    type?: "page" | "view" | "card";
    propsData?: {
        [p: string]: {
            style?: CSSProperties;
            className?: string;
            onClick?: (ev: MouseEventHandler) => void;
            [p: string]: any;
        };
    } | {
        [p: string]: (itemData: {
            [p: string]: any;
        }, index: number) => {
            style?: CSSProperties;
            className?: string;
            onCLick?: (ev: MouseEventHandler) => void;
            [p: string]: any;
        };
    };
    itemData?: {
        [p: string]: ReactNode;
    } | {
        [p: string]: (indexItem: {
            [p: string]: any;
        }, index: number) => ReactNode;
    };
    childrenData?: {
        [p: string]: ReactNode;
    } | {
        [p: string]: (itemData: {
            [p: string]: any;
        }, index: number) => ReactNode;
    };
    indexItem?: {
        [p: string]: any;
    };
    index?: number;
    style?: CSSProperties;
    className?: string;
}
export declare const RenderLayerElement: (props: RenderLayerElementProps) => any;
interface PageByIdProps extends Props {
    id: string;
    /**
     * custom props of layer by id. Ex: { "gid": { style: { width: "60rem", backgroundColor: "red" }, className: "my-class" } }
     * */
    propsData?: {
        [p: string]: {
            style?: CSSProperties;
            className?: string;
            onClick?: (ev: MouseEventHandler) => void;
            [p: string]: any;
        };
    };
    /**
     * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    childrenData?: {
        [p: string]: ReactNode;
    };
    itemData?: {
        [p: string]: ReactNode;
    };
}
export declare const PageById: (props: PageByIdProps) => import("react/jsx-runtime").JSX.Element | null;
interface PageByUrlProps extends Props {
    url: string;
    /**
     * custom props of layer by id. Ex: { "gid": { style: { width: "60rem", backgroundColor: "red" }, className: "my-class" } }
     * */
    propsData?: {
        [p: string]: {
            style?: CSSProperties;
            className?: string;
            onClick?: (ev: MouseEventHandler) => void;
            [p: string]: any;
        };
    };
    /**
     * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    childrenData?: {
        [p: string]: ReactNode;
    };
    itemData?: {
        [p: string]: ReactNode;
    };
}
export declare const PageByUrl: (props: PageByUrlProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=pageById.d.ts.map