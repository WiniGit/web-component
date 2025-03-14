import { CSSProperties, ReactNode } from 'react';
interface Props {
    /**
    * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
    * */
    childrenData?: {
        [p: string]: (itemData: {
            [p: string]: any;
        }, index: number) => ReactNode;
    };
    /**
     * custom style layer by id. Ex: { "gid": { width: "60rem", backgroundColor: "red" } }
     * */
    styleData?: {
        [p: string]: CSSProperties;
    };
    /**
     * replace layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    itemData?: {
        [p: string]: (indexItem: {
            [p: string]: any;
        }, index: number) => ReactNode;
    };
    /**
     * json object data. Ex: {Id: 1, Name: "Example", ...}
     * */
    cardData?: {
        [p: string]: any;
    };
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
        loadmore?: boolean;
    };
}
interface CardProps extends Props {
    id: string;
}
export declare const CardById: (props: CardProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=cardById.d.ts.map