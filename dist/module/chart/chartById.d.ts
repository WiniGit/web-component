import { CSSProperties, ReactNode } from 'react';
import { DatasetItem } from './chartByType';
interface Props {
    id: string;
    searchRaw?: string;
    /** replace all searchRaw and filter date time */
    query?: string;
    className?: string;
    /**
     * style of chart block
     * */
    style?: CSSProperties;
    /**
     * style of chart
     * */
    chartStyle?: CSSProperties;
    allowGetAll?: boolean;
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
    expandData?: Array<DatasetItem>;
}
export declare const ChartById: ({ searchRaw, style, chartStyle, ...props }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=chartById.d.ts.map