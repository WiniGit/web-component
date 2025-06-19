import { CSSProperties, ReactNode } from 'react';
export interface SuggestionProps {
    triggerPattern: string;
    render: (offset: {
        top: number;
        left: number;
    }, match: string, handleSelectSuggest: (newElement?: HTMLElement) => void) => ReactNode;
}
interface Props {
    id?: string;
    autoFocus?: boolean;
    initValue?: string;
    onChange?: (value: string, htmlElement: HTMLDivElement) => void;
    style?: CSSProperties;
    className?: string;
    onSuggest?: Array<SuggestionProps>;
    placeholder?: string;
    hideToolbar?: boolean;
    disabled?: boolean;
    helperText?: string;
    helperTextColor?: string;
}
interface RefProps {
    isOpenEmoji: boolean;
    showEmoji: (s: CSSProperties) => void;
    element: HTMLDivElement;
    focus: () => void;
}
export declare const WiniEditor: import('react').ForwardRefExoticComponent<Props & import('react').RefAttributes<RefProps>>;
export {};
//# sourceMappingURL=wini-editor.d.ts.map