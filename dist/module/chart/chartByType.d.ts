import { CSSProperties } from 'react';
export interface DatasetItem {
    id: string | number;
    name: string;
    title?: string;
    color?: string;
    value: number | Array<number>;
}
interface Props {
    style?: CSSProperties;
    className?: string;
    legend?: "left" | "top" | "right" | "bottom";
    type: 'line' | 'bar' | 'horizontal bar' | 'scatter' | 'bubble' | 'radar' | 'area' | 'doughnut' | 'pie';
    datasets: Array<DatasetItem>;
    xAxisName?: Array<string>;
    yAxisName?: Array<string>;
    unit?: string;
    formatter?: (ev: any) => void;
    handleChartClick?: (ev: any) => void;
}
export default function RenderChartByType(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=chartByType.d.ts.map