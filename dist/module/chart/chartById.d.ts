import { CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react';
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
interface ChartRef {
    chartInfor?: {
        [p: string]: any;
    };
    result: Array<{
        [p: string]: any;
    }>;
    setResult: Dispatch<SetStateAction<{
        [p: string]: any;
    }[]>>;
    getData: () => Promise<void>;
    datasets?: Array<DatasetItem>;
    selectedTime?: string | number;
}
export declare const ChartById: import('react').ForwardRefExoticComponent<Props & import('react').RefAttributes<ChartRef>>;
export {};
//# sourceMappingURL=chartById.d.ts.map