import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
interface Props {
    methods?: UseFormReturn;
}
export interface CustomHTMLProps extends HTMLAttributes<any> {
    style?: CSSProperties;
    className?: string;
    /** type function only for card element */
    propsData?: {
        [p: string]: CustomHTMLProps;
    } | {
        [p: string]: (itemData: {
            [p: string]: any;
        }, index: number, methods: UseFormReturn) => CustomHTMLProps;
    };
    /** type function only for card element */
    itemData?: {
        [p: string]: ReactNode;
    } | {
        [p: string]: (indexItem: {
            [p: string]: any;
        }, index: number, methods: UseFormReturn) => ReactNode;
    };
    /** type function only for card element */
    childrenData?: {
        [p: string]: ReactNode;
    } | {
        [p: string]: (itemData: {
            [p: string]: any;
        }, index: number, methods: UseFormReturn) => ReactNode;
    };
    /** only for card element */
    cardData?: Array<{
        [p: string]: any;
    }>;
    /** only for card element */
    controller?: "all" | {
        page?: number;
        size?: number;
        searchRaw?: string;
        filter?: string;
        sortby?: Array<{
            prop: string;
            direction?: "ASC" | "DESC";
        }>;
        pattern?: {
            returns: Array<string>;
            [p: string]: Array<string> | {
                searchRaw?: string;
                reducers: string;
            };
        };
    } | {
        ids: string;
        maxLength?: number | "none";
    };
    /** only for card element */
    emptyLink?: string;
    /** only for card element */
    emptyMessage?: string;
    /** only for card element */
    emptyElement?: ReactNode;
    /** only for card element */
    onUnMount?: () => void;
    /** only for form element */
    data?: {
        [p: string]: any;
    };
    /** only for form element */
    customOptions?: {
        [p: string]: Array<{
            [k: string]: any;
        }>;
    };
    /** only for form element */
    onSubmit?: (
    /** form data */
    e?: {
        [p: string]: any;
    }) => void;
    /** only for form element */
    onError?: (e?: {
        [p: string]: any;
    }) => void;
    /** only for form element */
    autoBcrypt?: boolean;
}
interface RenderLayerElementProps extends Props {
    item: {
        [p: string]: any;
    };
    list: Array<{
        [p: string]: any;
    }>;
    cols?: Array<{
        [p: string]: any;
    }>;
    rels?: Array<{
        [p: string]: any;
    }>;
    bodyChildren?: ReactNode;
    type?: "page" | "view" | "card" | "form";
    propsData?: {
        [p: string]: CustomHTMLProps;
    } | {
        [p: string]: (itemData: {
            [p: string]: any;
        }, index: number, methods: UseFormReturn) => CustomHTMLProps;
    };
    itemData?: {
        [p: string]: ReactNode;
    } | {
        [p: string]: (indexItem: {
            [p: string]: any;
        }, index: number, methods: UseFormReturn) => ReactNode;
    };
    childrenData?: {
        [p: string]: ReactNode;
    } | {
        [p: string]: (itemData: {
            [p: string]: any;
        }, index: number, methods: UseFormReturn) => ReactNode;
    };
    indexItem?: {
        [p: string]: any;
    };
    index?: number;
    style?: CSSProperties;
    className?: string;
    options?: {
        [p: string]: Array<{
            [p: string]: any;
        }>;
    };
}
export declare const pageAllRefs: {
    [p: string]: any;
};
export declare const RenderLayerElement: (props: RenderLayerElementProps) => any;
interface PageByIdProps extends Props {
    id: string;
    /**
     * custom props of layer by id. Ex: { "gid": { style: { width: "60rem", backgroundColor: "red" }, className: "my-class" } }
     * */
    propsData?: {
        [p: string]: CustomHTMLProps;
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
    onlyLayout?: boolean;
    onlyBody?: boolean;
}
export declare const PageById: (props: PageByIdProps) => false | import("react/jsx-runtime").JSX.Element | null;
interface PageByUrlProps extends Props {
    url: string;
    /**
     * custom props of layer by id. Ex: { "gid": { style: { width: "60rem", backgroundColor: "red" }, className: "my-class" } }
     * */
    propsData?: {
        [p: string]: CustomHTMLProps;
    };
    /**
     * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    childrenData?: {
        [p: string]: ReactNode;
    };
    /**
     * replace layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    itemData?: {
        [p: string]: ReactNode;
    };
    onlyLayout?: boolean;
    onlyBody?: boolean;
    /** children of layout-body */
    children?: ReactNode;
}
export declare const PageByUrl: ({ childrenData, ...props }: PageByUrlProps) => false | import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=pageById.d.ts.map