import { default as React, CSSProperties, ReactNode } from 'react';
interface InfiniteScrollProps {
    id?: string;
    className?: string;
    style?: CSSProperties;
    handleScroll?: (onLoadMore: boolean, ev: React.UIEvent<HTMLDivElement, UIEvent>) => Promise<any> | null;
    children?: ReactNode;
    totalCount?: number;
}
interface InfiniteScrollState {
    loading: boolean;
}
export declare class InfiniteScroll extends React.Component<InfiniteScrollProps, InfiniteScrollState> {
    state: Readonly<InfiniteScrollState>;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
//# sourceMappingURL=infinite-scroll.d.ts.map