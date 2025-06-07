import { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
interface TableHeaderProps {
    methods: UseFormReturn<FieldValues, any, undefined>;
    showIndex?: boolean;
    hideCheckbox?: boolean;
    selected?: boolean | null;
    onChangeSelected?: (v: boolean) => void;
    onChangeConfigData?: () => void;
}
export declare const TableHeader: ({ methods, onChangeConfigData, showIndex, hideCheckbox, selected, onChangeSelected }: TableHeaderProps) => import("react/jsx-runtime").JSX.Element;
interface TableRowProps {
    item: {
        [p: string]: any;
    };
    setItem: (params: {
        [p: string]: any;
    }) => void;
    title?: string;
    index: number;
    methods: UseFormReturn<FieldValues, any, undefined>;
    fields?: Array<{
        [p: string]: any;
    }>;
    files?: Array<{
        [p: string]: any;
    }>;
    relativeData?: Array<{
        [p: string]: any;
    }>;
    relativeFields?: Array<{
        [p: string]: any;
    }>;
    showIndex?: boolean;
    hideCheckbox?: boolean;
    showAddEditPopup?: (id?: string) => void;
    onDelete?: () => void;
    actions?: Array<{
        [p: string]: any;
    }>;
    onChangeActions?: (actions: Array<{
        [p: string]: any;
    }>) => void;
    selected?: string[];
    setSelected?: Dispatch<SetStateAction<string[]>>;
    onDuplicate?: () => void;
    [p: string]: any;
}
export declare const TableRow: ({ item, setItem, title, index, methods, fields, files, relativeData, relativeFields, showIndex, hideCheckbox, showAddEditPopup, onDelete, actions, onChangeActions, selected, setSelected, onDuplicate, ...props }: TableRowProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=tableElement.d.ts.map