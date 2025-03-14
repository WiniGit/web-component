import { CSSProperties, ReactNode } from 'react';
interface Props {
    /**
     * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    childrenData?: {
        [p: string]: ReactNode;
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