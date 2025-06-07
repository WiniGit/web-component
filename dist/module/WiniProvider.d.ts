import { ProjectItem } from './da';
interface Props {
    /**
     * project id on admin wini
     * */
    pid: string;
    /**
     * api link
     * */
    url: string;
    fileUrl: string;
    imgUrlId: string;
    onInvalidToken?: () => void;
    children?: React.ReactNode;
    onProjectLoaded?: (item: ProjectItem) => void;
}
export declare const WiniProvider: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=WiniProvider.d.ts.map