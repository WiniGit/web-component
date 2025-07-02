import { CSSProperties } from 'react';
interface SearchFilterDataProps {
    columns: Array<{
        [p: string]: any;
    }>;
    fields: Array<{
        [p: string]: any;
    }>;
    searchRaw?: string;
    onChange?: (searchRaw: string) => void;
    initFilterList?: Array<string>;
    onChangeFilterData?: (filterList: Array<string>) => void;
}
export declare const SearchFilterData: ({ columns, fields, searchRaw, onChange, initFilterList, onChangeFilterData }: SearchFilterDataProps) => import("react/jsx-runtime").JSX.Element;
export declare const ButtonImportData: ({ onImport }: {
    onImport?: (result: {
        [key: string]: any;
    }[]) => void;
}) => import("react/jsx-runtime").JSX.Element;
interface ActionOptionsDropdownProps {
    onClose?: () => void;
    actions?: {
        [p: string]: any;
    }[];
    onChangeActions?: (params: {
        [p: string]: any;
    }[]) => void;
    onEditActionColumn?: (params: {
        [p: string]: any;
    }, actionItem: {
        [p: string]: any;
    }) => void;
    style?: CSSProperties;
    onEdit?: () => void;
    onDuplicate?: () => void;
    onDelete?: () => void;
    item: {
        [p: string]: any;
    };
    tbName: string;
    title?: string;
}
export declare const ActionOptionsDropdown: import('react').ForwardRefExoticComponent<ActionOptionsDropdownProps & import('react').RefAttributes<unknown>>;
export {};
//# sourceMappingURL=featureElement.d.ts.map