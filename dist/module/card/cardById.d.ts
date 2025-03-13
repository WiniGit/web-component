import { CSSProperties } from 'react';
interface Props {
    dataItem?: {
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