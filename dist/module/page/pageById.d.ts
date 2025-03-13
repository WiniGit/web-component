import { CSSProperties, ReactNode } from 'react';
interface Props {
    childrenData?: {
        [p: string]: ReactNode;
    };
    styleData?: {
        [p: string]: CSSProperties;
    };
    itemData?: {
        [p: string]: ReactNode;
    };
}
interface PageByIdProps extends Props {
    id: string;
}
export declare const PageById: (props: PageByIdProps) => import("react/jsx-runtime").JSX.Element | null;
interface PageByUrlProps extends Props {
    url: string;
}
export declare const PageByUrl: (props: PageByUrlProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=pageById.d.ts.map