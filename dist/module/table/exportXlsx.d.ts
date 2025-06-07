import { CSSProperties, ReactNode } from 'react';
interface Props {
    label: string;
    fileName?: string;
    sheetName?: string;
    getData: () => Promise<Array<{
        [p: string]: any;
    }>>;
    style?: CSSProperties;
    className?: string;
    disabled?: boolean;
    prefix?: ReactNode;
    suffix?: ReactNode;
    config?: {
        title: Array<string>;
    };
}
export default function ExportXlsx(props: Props): import("react/jsx-runtime").JSX.Element;
export declare const handleFileUpload: (ev: any, onSuccess: (json: any) => void) => void;
export declare const handleGoogleSheetFetch: (sheetUrl: string) => Promise<any[] | undefined>;
export {};
//# sourceMappingURL=exportXlsx.d.ts.map