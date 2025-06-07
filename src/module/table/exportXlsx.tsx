import { CSSProperties, ReactNode } from "react";
import * as XLSX from 'xlsx';
import Papa from "papaparse";
import { Button } from "../../component/button/button";

// enum ExcelCol {
//     A = "A",
//     B = "B",
//     C = "C",
//     D = "D",
//     E = "E",
//     F = "F",
//     G = "G",
//     H = "H",
//     I = "I",
//     J = "J",
//     K = "K",
//     L = "L",
//     M = "M",
//     N = "N",
//     O = "O",
//     P = "P",
//     Q = "Q",
//     R = "R",
//     S = "S",
//     T = "T",
//     U = "U",
//     V = "V",
//     W = "W",
//     X = "X",
//     Y = "Y",
//     Z = "Z",
// }

interface Props {
    label: string,
    fileName?: string,
    sheetName?: string,
    getData: () => Promise<Array<{ [p: string]: any }>>,
    style?: CSSProperties,
    className?: string,
    disabled?: boolean,
    prefix?: ReactNode,
    suffix?: ReactNode,
    config?: { title: Array<string> }
}

export default function ExportXlsx(props: Props) {

    const onExport = async (ev: any) => {
        const btn = ev.target.closest("button")
        btn.disabled = true
        /* fetch JSON data and parse */
        const raw_data = await props.getData();
        if (raw_data.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(raw_data);
            const workbook = XLSX.utils.book_new();
            worksheet["!cols"] = (props.config?.title ?? Object.keys(raw_data[0])).map(e => ({ wch: e.length * 6 }))
            XLSX.utils.sheet_add_aoa(worksheet, [props.config?.title ?? Object.keys(raw_data[0])], { origin: "A1", cellStyles: true });
            styleRow(worksheet, 0, {
                font: {
                    name: 'Calibri',
                    sz: 12,
                    bold: true,
                    color: { rgb: "FFFFFF" } // White text
                },
                fill: {
                    patternType: "solid",
                    fgColor: { rgb: "4CAF50" } // Green background
                },
                alignment: {
                    horizontal: "center",
                    vertical: "center"
                }
            });
            XLSX.utils.book_append_sheet(workbook, worksheet, props.sheetName ?? "Sheet 1");
            XLSX.writeFile(workbook, `${props.fileName ?? "Exported"}.xlsx`, { compression: true });
        }
        btn.disabled = false
    }

    return <Button label={props.label} onClick={onExport} style={props.style} className={props.className} disabled={props.disabled} prefix={props.prefix} suffix={props.suffix} />
}

function styleRow(worksheet: XLSX.WorkSheet, rowIndex: number, style: any) {
    const range = XLSX.utils.decode_range(worksheet['!ref'] ?? "A1"); // Get the range of the sheet
    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: col });
        if (!worksheet[cellAddress]) continue; // Skip if cell doesn't exist
        worksheet[cellAddress].s = style;
    }
}

export const handleFileUpload = (ev: any, onSuccess: (json: any) => void) => {
    const file = ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event: any) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);
        onSuccess(json);
    };
    reader.readAsArrayBuffer(file);
};

export const handleGoogleSheetFetch = async (sheetUrl: string) => {
    try {
        const match = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (!match) throw new Error('Invalid Google Sheet URL');
        const sheetId = match[1];
        const gidMatch = sheetUrl.match(/gid=(\d+)/);
        const gid = gidMatch ? gidMatch[1] : '0';
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;
        const res = await fetch(csvUrl);
        const csvText = await res.text();
        const parsed = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true
        });
        return parsed.data.map((e: any) => {
            Object.keys(e).forEach(k => {
                if (k.startsWith("_") || !k.trim().length) delete e[k];
                else if (k.trim().length !== k.length) {
                    e[k.trim()] = e[k];
                    delete e[k];
                }
            })
            return e
        });
    } catch (err: any) {
        console.error(err.message)
        return undefined;
    }
};