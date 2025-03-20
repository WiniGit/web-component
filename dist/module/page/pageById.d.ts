import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
interface Props {
    /**
     * replace children of parent layer by id. Ex: { "gid": <Text className="heading-7">Example</Text> }
     * */
    childrenData?: {
        [p: string]: ReactNode;
    };
    /**
     * custom props of layer by id. Ex: { "gid": { style: { width: "60rem", backgroundColor: "red" }, className: "my-class" } }
     * */
    propsData?: {
        [p: string]: {
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
        [p: string]: ReactNode;
    };
    methods: UseFormReturn;
}
interface PageByIdProps extends Props {
    id: string;
    method?: UseFormReturn;
}
export declare const PageById: (props: PageByIdProps) => import("react/jsx-runtime").JSX.Element | null;
interface PageByUrlProps extends Props {
    url: string;
    method?: UseFormReturn;
}
export declare const PageByUrl: (props: PageByUrlProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=pageById.d.ts.map