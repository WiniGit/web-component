import { CSSProperties, ReactNode } from 'react';
interface Props {
    id: string;
    searchRaw?: string;
    className?: string;
    /**
     * style of chart block
     * */
    style?: CSSProperties;
    /**
     * style of chart
     * */
    chartStyle?: CSSProperties;
    filterAll?: boolean;
    handleChartClick?: (e: any) => void;
    /**
     * hide heading & filter
     * */
    chartOnly?: boolean;
    /**
     * content between heading & chart
     * */
    content?: ReactNode;
    /**
     * format value of chart
     * */
    formatter?: (ev: any) => void;
}
export declare const ChartById: ({ id, searchRaw, className, style, chartStyle, filterAll, handleChartClick, formatter }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=chartById.d.ts.map