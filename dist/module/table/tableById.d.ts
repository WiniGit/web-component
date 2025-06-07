export declare function TableById({ id }: {
    id: string;
}): import("react/jsx-runtime").JSX.Element | undefined;
interface DataTableProps {
    tbName: string;
    staticSearch?: string;
    title?: string;
    columns: Array<{
        [p: string]: any;
    }>;
    onChangeConfigData?: (params: Array<{
        [p: string]: any;
    }>) => void;
    filterData?: {
        searchRaw: string;
        sortby: Array<{
            prop: string;
            direction: string;
        }>;
    };
    filterList?: Array<string>;
    onChangeFilterList?: (filterList: Array<string>) => void;
    onChangeFilterData?: (params: {
        searchRaw: string;
        sortby: Array<{
            prop: string;
            direction: string;
        }>;
    }) => void;
    showIndex?: boolean;
    hideCheckbox?: boolean;
    enableEdit?: boolean;
    actions?: Array<{
        [p: string]: any;
    }>;
    onChangeActions?: () => void;
    [p: string]: any;
}
export declare const DataTable: ({ tbName, staticSearch, title, columns, onChangeConfigData, filterData, filterList, onChangeFilterList, onChangeFilterData, showIndex, hideCheckbox, enableEdit, actions, onChangeActions, ...props }: DataTableProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=tableById.d.ts.map