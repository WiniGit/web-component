import { CSSProperties, useMemo } from "react";
import ReactEcharts from "echarts-for-react";
import styles from "./chart.module.css";
import { useWiniContext, Winicon, Text } from "../../index";

export interface DatasetItem {
    id: string | number,
    name: string,
    title?: string,
    color?: string,
    backgroundColor?: string,
    value: number | Array<number>
}

interface Props {
    style?: CSSProperties,
    className?: string,
    legend?: "left" | "top" | "right" | "bottom" | "none",
    type: 'line' | 'bar' | 'horizontal bar' | 'scatter' | 'bubble' | 'radar' | 'area' | 'doughnut' | 'pie',
    datasets: DatasetItem[],
    xAxisConfig?: { name: string[] | { name: string, color?: string }[], unit?: string, label?: { [k: string]: any } },
    yAxisConfig?: { name: string[] | { name: string, color?: string }[], unit?: string, label?: { [k: string]: any } },
    indicator?: { name: string, max: number, min?: number, color?: string }[],
    formatter?: (ev: any) => void | string,
    handleChartClick?: (ev: any) => void;
}

export default function RenderChartByType({ xAxisConfig, yAxisConfig, legend = "none", ...props }: Props) {
    const { theme } = useWiniContext()
    const grid = useMemo(() => {
        let _left = 24;
        let _right = 24;
        if (xAxisConfig?.unit?.length) {
            const tmp = document.createElement("span");
            tmp.style.cssText = "font-size: 12px; font-family: Inter; opacity: 0; position: fixed;";
            tmp.innerText = xAxisConfig.unit;
            document.body.appendChild(tmp);
            _left = tmp.offsetWidth + 8;
            tmp.remove();
        }
        if (yAxisConfig?.unit?.length) {
            const tmp = document.createElement("span");
            tmp.style.cssText = "font-size: 12px; font-family: Inter; opacity: 0; position: fixed;";
            tmp.innerText = yAxisConfig.unit;
            document.body.appendChild(tmp);
            _right = tmp.offsetWidth + 8;
            tmp.remove();
        }
        return { containLabel: true, left: Math.max(0, _left), right: Math.max(0, _right) }
    }, [xAxisConfig?.unit, yAxisConfig?.unit, props.type]);
    const option = useMemo(() => {
        const tmp: any = {
            backgroundColor: theme === "dark" ? "#14181b" : "#FFFFFF",
            responsive: true,
            tooltip: {
                trigger: 'item',
                position: 'top',
                appendToBody: true,
                axisPointer: { type: 'shadow' }
            },
            grid,
        }
        switch (props.type) {
            case 'line':
                return {
                    ...tmp,
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: theme === "dark" ? "#494950" : "#D7D7DB"
                            }
                        },
                        data: yAxisConfig?.name?.map((n: string | { name: string, color?: string }) => (typeof n === "string" ? n : { value: n.name, textStyle: { color: n.color } })),
                        name: yAxisConfig?.unit,
                        nameLocation: 'end',
                        nameGap: 20,
                        nameTextStyle: {
                            color: theme === "dark" ? "#A2A2AA" : "#61616B",
                            fontSize: 12,
                        },
                        axisLabel: {
                            formatter: props.formatter,
                            color: theme === "dark" ? "#A2A2AA" : "#61616B",
                            fontSize: 12,
                            lineHeight: 16,
                            ...yAxisConfig?.label
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxisConfig?.name?.map((n: string | { name: string, color?: string }) => (typeof n === "string" ? n : { value: n.name, textStyle: { color: n.color } })),
                        name: xAxisConfig?.unit,
                        nameLocation: 'end',
                        nameGap: 20,
                        nameTextStyle: {
                            color: theme === "dark" ? "#A2A2AA" : "#61616B",
                            fontSize: 12,
                        },
                        axisLine: {
                            lineStyle: {
                                color: theme === "dark" ? "#494950" : "#D7D7DB",
                                width: 1,
                            }
                        },
                        axisLabel: {
                            color: theme === "dark" ? "#A2A2AA" : "#61616B",
                            fontSize: 12,
                            lineHeight: 16,
                            ...xAxisConfig?.label
                        }
                    },
                    series: props.datasets.map((c) => {
                        return {
                            ...c,
                            stack: 'Total',
                            name: c.title ?? c.name,
                            type: props.type,
                            data: Array.isArray(c.value) ? c.value : [c.value],
                            itemStyle: { color: c.color },
                            areaStyle: c.backgroundColor ? { color: c.backgroundColor } : undefined,
                        }
                    }),
                };
            case 'bar':
                return {
                    ...tmp,
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: theme === "dark" ? "#494950" : "#D7D7DB"
                            }
                        },
                        data: yAxisConfig?.name?.map((n: string | { name: string, color?: string }) => (typeof n === "string" ? n : { value: n.name, textStyle: { color: n.color } })),
                        name: yAxisConfig?.unit,
                        nameLocation: 'end',
                        nameGap: 20,
                        nameTextStyle: {
                            color: theme === "dark" ? "#A2A2AA" : "#61616B",
                            fontSize: 12,
                        },
                        axisLabel: {
                            formatter: props.formatter,
                            color: theme === "dark" ? "#A2A2AA" : "#61616B",
                            fontSize: 12,
                            lineHeight: 16,
                            ...yAxisConfig?.label
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: xAxisConfig?.name?.map((n: string | { name: string, color?: string }) => (typeof n === "string" ? n : { value: n.name, textStyle: { color: n.color } })),
                        name: xAxisConfig?.unit,
                        nameLocation: 'end',
                        nameGap: 20,
                        nameTextStyle: {
                            color: theme === "dark" ? "#A2A2AA" : "#61616B",
                            fontSize: 12,
                        },
                        axisLine: {
                            lineStyle: {
                                color: theme === "dark" ? "#494950" : "#D7D7DB",
                                width: 1,
                            }
                        },
                        axisLabel: {
                            color: theme === "dark" ? "#A2A2AA" : "#61616B",
                            fontSize: 12,
                            lineHeight: 16,
                            ...xAxisConfig?.label
                        }
                    },
                    series: props.datasets?.map((c) => {
                        return {
                            ...c,
                            data: Array.isArray(c.value) ? c.value : [c.value],
                            type: props.type,
                            itemStyle: { color: c.color, borderRadius: [2, 2, 0, 0] },
                            radius: '50%',
                            barMinWidth: 8,
                            barMaxWidth: 80,
                            barGap: 0.2,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                        }
                    }),
                };
            case 'horizontal bar':
                return {
                    ...tmp,
                    xAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: theme === "dark" ? "#494950" : "#D7D7DB"
                            }
                        },
                        data: xAxisConfig?.name?.map((n: string | { name: string, color?: string }) => (typeof n === "string" ? n : { value: n.name, textStyle: { color: n.color } })),
                        name: xAxisConfig?.unit,
                        nameLocation: 'end',
                        nameGap: 20,
                        nameTextStyle: {
                            color: theme === "dark" ? "#A2A2AA" : "#61616B",
                            fontSize: 12,
                        },
                        axisLabel: {
                            formatter: props.formatter,
                            color: theme === "dark" ? "#A2A2AA" : "#61616B",
                            fontSize: 12,
                            lineHeight: 16,
                            ...xAxisConfig?.label
                        }
                    },
                    yAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: yAxisConfig?.name?.map((n: string | { name: string, color?: string }) => (typeof n === "string" ? n : { value: n.name, textStyle: { color: n.color } })),
                        name: yAxisConfig?.unit,
                        nameLocation: 'end',
                        nameGap: 20,
                        nameTextStyle: {
                            color: theme === "dark" ? "#A2A2AA" : "#61616B",
                            fontSize: 12,
                        },
                        axisLine: {
                            lineStyle: {
                                color: theme === "dark" ? "#494950" : "#D7D7DB",
                                width: 1,
                            }
                        },
                        axisLabel: {
                            color: theme === "dark" ? "#A2A2AA" : "#61616B",
                            fontSize: 12,
                            lineHeight: 16,
                            ...yAxisConfig?.label
                        }
                    },
                    series: props.datasets?.map((c) => {
                        return {
                            ...c,
                            data: Array.isArray(c.value) ? c.value : [c.value],
                            type: 'bar',
                            itemStyle: { color: c.color, borderRadius: [2, 2, 0, 0] },
                            radius: '50%',
                            barMinWidth: 8,
                            barMaxWidth: 80,
                            barGap: 0.2,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                        }
                    }),
                };
            case 'pie':
                tmp.tooltip.formatter = props.formatter || '{b}: {c} ({d}%)'
                if (!props.datasets.length) delete tmp.tooltip
                return {
                    ...tmp,
                    series: [
                        {
                            type: props.type,
                            avoidLabelOverlap: false,
                            radius: '100%',
                            padAngle: props.datasets.length ? 2 : 0,
                            label: { show: false, position: 'center' },
                            emphasis: { label: false },
                            data: props.datasets.length ? props.datasets.map(e => ({ ...e, value: e.value, itemStyle: { color: e.color, borderRadius: 4 } })) : [{ value: 1, label: "empty", name: "empty", itemStyle: { color: theme === "dark" ? "313135" : "#EFEFF0" } }]
                        },
                    ],
                }
            case 'doughnut':
                tmp.tooltip.formatter = props.formatter || '{b}: {c} ({d}%)'
                if (!props.datasets.length) delete tmp.tooltip
                return {
                    ...tmp,
                    title: {
                        text: props.datasets.map(e => typeof e.value === 'number' ? e.value : e.value.reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0),
                        left: 'center',
                        top: 'center',
                        textStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: theme === "dark" ? "#F4F4F5" : "#18181B",
                            fontFamily: "Inter"
                        },
                    },
                    series: [
                        {
                            type: "pie",
                            radius: ['56%', '90%'],
                            center: ['50%', '50%'],
                            avoidLabelOverlap: false,
                            padAngle: props.datasets.length ? 2 : 0,
                            label: { show: false, position: 'center' },
                            emphasis: { label: false },
                            data: props.datasets.length ? props.datasets.map(e => ({ ...e, value: e.value, itemStyle: { color: e.color, borderRadius: 4 } })) : [{ value: 1, label: "empty", name: "empty", itemStyle: { color: theme === "dark" ? "313135" : "#EFEFF0" } }]
                        },
                    ],
                }
            case 'radar':
                return {
                    ...tmp,
                    radar: {
                        // shape: 'circle',
                        indicator: props.indicator
                    },
                    series: props.datasets?.map((c) => {
                        return {
                            ...c,
                            value: Array.isArray(c.value) ? c.value : [c.value],
                            itemStyle: { color: c.color },
                            areaStyle: { color: c.backgroundColor },
                            label: { show: false, position: 'center' },
                            emphasis: { label: false },
                        }
                    }),
                };
            case 'scatter':
            case 'bubble':
            default:
                return {}
        }
    }, [grid, props.datasets, xAxisConfig, yAxisConfig, props.formatter, theme]);

    switch (legend) {
        case "top":
            return <div className={`${styles["chart-block"]} ${props.className ?? ''}`} style={{ flexDirection: "column", ...props.style }}>
                {!!props.datasets.length && <div className={`row ${styles["legend"]}`} style={{ rowGap: "2rem" }}>
                    <CustomLegend datasets={props.datasets as any} type={props.type} />
                </div>}
                <ReactEcharts
                    key={props.type}
                    onEvents={{ click: props.handleChartClick as any }}
                    theme={theme}
                    notMerge={true}
                    lazyUpdate={true}
                    option={option}
                    style={{ width: "100%", aspectRatio: ["bar", "horizontal bar", "line"].includes(props.type) ? undefined : "1 / 1" }}
                />
            </div>
        case "bottom":
            return <div className={`${styles["chart-block"]} ${props.className ?? ''}`} style={{ flexDirection: "column", ...props.style }}>
                <ReactEcharts
                    key={props.type}
                    onEvents={{ click: props.handleChartClick as any }}
                    theme={theme}
                    notMerge={true}
                    lazyUpdate={true}
                    option={option}
                    style={{ width: "100%", aspectRatio: ["bar", "horizontal bar", "line"].includes(props.type) ? undefined : "1 / 1" }}
                />
                {!!props.datasets.length && <div className={`row ${styles["legend"]}`} style={{ rowGap: "2rem" }}>
                    <CustomLegend datasets={props.datasets as any} type={props.type} />
                </div>}
            </div>
        case "left":
            return <div className={`${styles["chart-block"]} ${props.className ?? ''}`} style={{ alignItems: "center", ...props.style }}>
                {!!props.datasets.length && <div className={`col ${styles["legend"]}`} style={{ flex: 1, maxHeight: "100%", columnGap: "2rem" }}>
                    <CustomLegend datasets={props.datasets as any} type={props.type} />
                </div>}
                <ReactEcharts
                    key={props.type}
                    onEvents={{ click: props.handleChartClick as any }}
                    theme={theme}
                    notMerge={true}
                    lazyUpdate={true}
                    option={option}
                    style={{ height: "100%", aspectRatio: ["bar", "horizontal bar", "line"].includes(props.type) ? undefined : "1 / 1" }}
                />
            </div>
        case "right":
        default:
            return <div className={`${styles["chart-block"]} ${props.className ?? ''}`} style={{ alignItems: "center", ...props.style }}>
                <ReactEcharts
                    key={props.type}
                    onEvents={{ click: props.handleChartClick as any }}
                    theme={theme}
                    notMerge={true}
                    lazyUpdate={true}
                    option={option}
                    style={{ height: "100%", aspectRatio: ["bar", "horizontal bar", "line"].includes(props.type) ? "5 / 3" : "1 / 1" }}
                />
                {legend === "right" && !!props.datasets.length && <div className={`col ${styles["legend"]}`} style={{ flex: 1, maxHeight: "100%", columnGap: "2rem" }}>
                    <CustomLegend datasets={props.datasets as any} type={props.type} />
                </div>}
            </div>
    }
}

const CustomLegend = ({ datasets = [], type = "" }) => {
    return datasets.map((e: any, i) => {
        if (type.includes("bar")) {
            return <div key={"legend-" + e.id + i} className="row" style={{ gap: 8 }}>
                <div style={{ height: "1.6rem", width: "1.6rem", borderRadius: 4, backgroundColor: e.color }} />
                <Text className="label-4" maxLine={1}>{e.name}</Text>
            </div>
        } else if (type === "line") {
            return <div key={"legend-" + e.id + i} className="row" style={{ gap: 8 }}>
                <Winicon src="fill/business/line-chart" size={"2rem"} color={e.color} />
                <Text className="label-4" maxLine={1}>{e.name}: {e.value}</Text>
            </div>
        } else {
            return <div key={"legend-" + e.id + i} className="row" style={{ gap: 8 }}>
                <div style={{ height: 8, width: 8, borderRadius: "50%", backgroundColor: e.color }} />
                <Text className="label-4" maxLine={1}>{e.name}: {e.value}</Text>
            </div>
        }
    })
}