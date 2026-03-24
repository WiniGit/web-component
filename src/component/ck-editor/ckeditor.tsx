import { CSSProperties, useEffect, useState } from 'react';
import { useRef } from 'react';
import './ck-editor.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

/**
 * Please update the following values with your tokens.
 * Instructions on how to obtain them: https://ckeditor.com/docs/trial/latest/guides/real-time/quick-start.html
 */

// Type definitions for CDN-based CKEditor5
type Editor = any;
type EventInfo = any;

interface Props {
    id?: string,
    style?: CSSProperties,
    className?: string,
    value?: string,
    placeholder?: string,
    disabled?: boolean,
    menuBar?: boolean,
    onChange?: (event: EventInfo, editor: Editor) => void,
    onFocus?: (event: EventInfo, editor: Editor) => void,
    onBlur?: (event: EventInfo, editor: Editor) => void,
    onError?: (error: Error, details: any) => void,
    onReady?: (editor: Editor) => void,
    onAfterDestroy?: (editor: Editor) => void,
    extraPlugins?: Array<any>,
    helperText?: string,
    helperTextColor?: string,
    uploadImageUrl?: string, // Your backend image upload endpoint
    uploadImageHeaders?: { [key: string]: string }, // Custom headers for upload
    customConfig?: {
        toolbar: { item?: Array<string>, shouldNotGroupWhenFull?: boolean, [p: string]: any },
        balloonToolbar?: Array<string>,
        mediaEmbed?: { previewsInData?: boolean, providers?: Array<{ [p: string]: any }>, [p: string]: any },
        fontFamily?: { options?: Array<string>, supportAllValues?: boolean },
        fontSize?: { options?: Array<string>, supportAllValues?: boolean },
        fontColor?: { columns?: number, colors?: Array<{ color: string, label: string }> },
        fontBackgroundColor?: { columns?: number, colors?: Array<{ color: string, label: string }> },
        [p: string]: any
    },
    handleExportPdf?: (editor: Editor) => void,
}

// Custom Image Upload Adapter for CDN version
class CustomImageUploadAdapter {
    loader: any;
    uploadUrl: string;
    headers?: { [key: string]: string };

    constructor(loader: any, uploadUrl: string, headers?: { [key: string]: string }) {
        this.loader = loader;
        this.uploadUrl = uploadUrl;
        this.headers = headers;
    }

    upload(): Promise<{ default: string }> {
        return this.loader.file.then((file: File) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);

                const xhr = new XMLHttpRequest();

                // Handle upload progress
                xhr.upload.addEventListener('progress', (evt: ProgressEvent) => {
                    if (evt.lengthComputable) {
                        const percentComplete = (evt.loaded / evt.total) * 100;
                        this.loader.uploadTotal = evt.total;
                        this.loader.uploaded = evt.loaded;
                    }
                });

                // Handle upload completion
                xhr.addEventListener('load', () => {
                    if (xhr.status === 200 || xhr.status === 201) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            // Adjust the response path based on your backend response structure
                            // Common formats: response.url, response.data.url, response.default
                            const imageUrl = response.url || response.data?.url || response.default;
                            
                            if (!imageUrl) {
                                reject(new Error('Invalid response: no image URL provided'));
                                return;
                            }
                            
                            resolve({ default: imageUrl });
                        } catch (error) {
                            reject(new Error('Failed to parse upload response'));
                        }
                    } else {
                        reject(new Error(`Upload failed with status ${xhr.status}`));
                    }
                });

                // Handle upload error
                xhr.addEventListener('error', () => {
                    reject(new Error('Upload request failed'));
                });

                xhr.addEventListener('abort', () => {
                    reject(new Error('Upload was aborted'));
                });

                // Set custom headers if provided
                xhr.open('POST', this.uploadUrl);
                if (this.headers) {
                    Object.entries(this.headers).forEach(([key, value]) => {
                        xhr.setRequestHeader(key, value);
                    });
                }

                xhr.send(formData);
            });
        });
    }

    abort(): void {
        // Handle abort if needed
    }
}

// Custom Upload Plugin to register the adapter
class CustomImageUploadPlugin {
    editor: Editor;
    uploadUrl: string;
    headers?: { [key: string]: string };

    constructor(editor: Editor, uploadUrl: string, headers?: { [key: string]: string }) {
        this.editor = editor;
        this.uploadUrl = uploadUrl;
        this.headers = headers;
    }

    static get pluginName() {
        return 'CustomImageUpload';
    }

    init() {
        const { FileRepository } = (window as any).CKEDITOR.plugins;
        
        // Register the adapter
        this.editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
            return new CustomImageUploadAdapter(loader, this.uploadUrl, this.headers);
        };
    }
}

// Custom Export PDF Plugin for CDN version
class ExportPdfCommand {
    editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
    }

    execute() {
        const content = this.editor.getData();

        const printWindow = window.open("", "_blank", "width=800,height=900");
        if (!printWindow) return;

        printWindow.document.open();
        printWindow.document.write(`
            <html>
            <head>
                <title>Export PDF</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        font-size: 14px;
                    }

                    figure.table {
                        width: 100%;
                        display: table;
                        margin: 0.9em auto;
                        overflow: hidden;
                    }

                    figure.table table {
                        width: 100%;
                        height: 100%;
                        border-collapse: collapse;
                        border-spacing: 0;
                        border: 1px double hsl(0, 0%, 70%);
                    }

                    figure.table table>thead>tr>th,
                    figure.table table>tbody>tr>td {
                        min-width: 2em;
                        padding: 0.4em;
                        border: 1px solid hsl(0, 0%, 75%);
                    }
                            
                    figure.table table>thead>tr>th {
                        font-weight: 700;
                        background: #0000000d;
                    }

                    .a4-page {
                        width: 210mm;
                        min-height: 297mm;
                        padding: 20mm;
                        box-sizing: border-box;
                    }

                    img {
                        max-width: 100%;
                        height: auto;
                    }

                    @page {
                        size: A4;
                        margin: 15mm;
                    }
                </style>
            </head>
            <body>
                <div class="a4-page">
                    ${content}
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.focus();
            printWindow.print();
        };
    }

    refresh() {
        // This ensures the button is clickable
    }
}

// Custom Export PDF Plugin
class ExportPdfPlugin {
    editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
    }

    static get pluginName() {
        return 'ExportPdf';
    }

    init() {
        const editor = this.editor;
        const command = new ExportPdfCommand(editor);

        editor.commands.add('exportPdf', command);

        editor.ui.componentFactory.add('exportPdf', (locale: any) => {
            const { ButtonView } = (window as any).CKEDITOR.ui;
            const { createIcon } = (window as any).CKEDITOR.icons;
            const view = new ButtonView(locale);

            view.set({
                label: 'Export PDF',
                icon: createIcon('download'),
                tooltip: true
            });

            view.on('execute', () => {
                command.execute();
            });

            return view;
        });
    }
}

export function CustomCkEditor5({ style = { width: "100%", height: 400, maxHeight: 600, borderRadius: 8 }, extraPlugins = [], ...props }: Props) {
    const editorContainerRef = useRef<any>(null);
    const editorInstanceRef = useRef<Editor | null>(null);

    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    // Initialize CKEditor when layout is ready
    useEffect(() => {
        if (!isLayoutReady || !editorContainerRef.current) return;

        const initializeEditor = async () => {
            try {
                const { ClassicEditor } = (window as any).CKEDITOR;

                if (!ClassicEditor) {
                    console.error('CKEditor5 not loaded from CDN');
                    props.onError?.(new Error('CKEditor5 not loaded'), {});
                    return;
                }

                const editor = await ClassicEditor.create(editorContainerRef.current, {
                    extraPlugins: [
                        ExportPdfPlugin,
                        ...(props.uploadImageUrl ? [
                            (editor: Editor) => new CustomImageUploadPlugin(editor, props.uploadImageUrl!, props.uploadImageHeaders)
                        ] : []),
                        ...extraPlugins
                    ],
                    toolbar: {
                        items: [
                            'exportPdf',
                            'heading',
                            '|',
                            'fontSize',
                            'fontFamily',
                            'fontColor',
                            'fontBackgroundColor',
                            '|',
                            'bold',
                            'italic',
                            'underline',
                            'strikethrough',
                            '|',
                            ...(props.uploadImageUrl ? ['insertImage'] : []),
                            'specialCharacters',
                            'horizontalLine',
                            'pageBreak',
                            'link',
                            'mediaEmbed',
                            'insertTable',
                            'highlight',
                            'htmlEmbed',
                            '|',
                            'alignment',
                            '|',
                            'bulletedList',
                            'numberedList',
                            'todoList',
                            'outdent',
                            'indent'
                        ],
                        shouldNotGroupWhenFull: false,
                    },
                    balloonToolbar: [
                        'bold',
                        'italic',
                        '|',
                        'link',
                        ...(props.uploadImageUrl ? ['insertImage'] : []),
                        '|',
                        'bulletedList',
                        'numberedList'
                    ],
                    mediaEmbed: {
                        previewsInData: true,
                        providers: [
                            {
                                name: "youtube",
                                url: /^https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/,
                                html: (match: any) => {
                                    const id = match[1];
                                    return (
                                        '<div style="position: relative; padding-bottom: 56.25%; height: 0;">' +
                                        `<iframe src="https://www.youtube.com/embed/${id}" ` +
                                        'style="position: absolute; width: 100%; height: 100%; left: 0;" ' +
                                        'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>' +
                                        "</div>"
                                    );
                                },
                            },
                        ],
                    },
                    fontFamily: {
                        options: ["Default", "Arial", "Courier New", "Inter", "Roboto", "Times New Roman", "Source Serif 4", "Poltawski Nowy", "Noto Sans JP"],
                        supportAllValues: true
                    },
                    fontSize: {
                        options: [10, 12, 14, 'default', 18, 20, 22, 24, 28, 32, 46, 56],
                        supportAllValues: true,
                    },
                    fontColor: {
                        columns: 6,
                        colors: [
                            {
                                color: 'var(--neutral-text-title-color)',
                                label: 'title'
                            },
                            {
                                color: 'var(--neutral-text-subtitle-color)',
                                label: 'subtitle'
                            },
                            {
                                color: 'var(--neutral-text-body-color)',
                                label: 'body'
                            },
                            {
                                color: 'var(--neutral-text-placeholder-color)',
                                label: 'placeholder'
                            },
                            {
                                color: 'var(--neutral-text-disabled-color)',
                                label: 'disabled'
                            },
                            {
                                color: 'var(--neutral-text-stable-color)',
                                label: 'stable'
                            },
                            {
                                color: '#287CF0',
                                label: 'primay'
                            },
                            {
                                color: '#FC7A1C',
                                label: 'warning'
                            },
                            {
                                color: '#3AAC6D',
                                label: 'success'
                            },
                            {
                                color: '#FAAD1E',
                                label: 'secondary3'
                            },
                            {
                                color: '#943CDD',
                                label: 'secondary5'
                            },
                        ],
                    },
                    heading: {
                        options: [
                            {
                                model: 'paragraph',
                                title: 'Paragraph',
                                class: 'ck-heading_paragraph'
                            },
                            {
                                model: 'heading1',
                                view: 'h1',
                                title: 'Heading 1',
                                class: 'ck-heading_heading1'
                            },
                            {
                                model: 'heading2',
                                view: 'h2',
                                title: 'Heading 2',
                                class: 'ck-heading_heading2'
                            },
                            {
                                model: 'heading3',
                                view: 'h3',
                                title: 'Heading 3',
                                class: 'ck-heading_heading3'
                            },
                            {
                                model: 'heading4',
                                view: 'h4',
                                title: 'Heading 4',
                                class: 'ck-heading_heading4'
                            },
                            {
                                model: 'heading5',
                                view: 'h5',
                                title: 'Heading 5',
                                class: 'ck-heading_heading5'
                            },
                            {
                                model: 'heading6',
                                view: 'h6',
                                title: 'Heading 6',
                                class: 'ck-heading_heading6'
                            }
                        ]
                    },
                    htmlSupport: {
                        allow: [
                            {
                                name: /^.*$/,
                                styles: true,
                                attributes: true,
                                classes: true
                            }
                        ]
                    },
                    language: "vi",
                    licenseKey: LICENSE_KEY,
                    link: {
                        addTargetToExternalLinks: true,
                        defaultProtocol: 'https://',
                        decorators: {
                            toggleDownloadable: {
                                mode: 'manual',
                                label: 'Downloadable',
                                attributes: {
                                    download: 'file'
                                }
                            }
                        }
                    },
                    menuBar: { isVisible: props.menuBar },
                    table: {
                        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
                    },
                    ...(props.customConfig ?? {}),
                    placeholder: props.placeholder,
                });

                // Set initial data
                if (props.value) {
                    editor.setData(props.value);
                }

                // Store editor instance
                editorInstanceRef.current = editor;

                // Attach event listeners
                editor.model.document.on('change:data', () => {
                    props.onChange?.({} as EventInfo, editor);
                });

                editor.editing.view.document.on('focus', (event: any) => {
                    props.onFocus?.(event, editor);
                });

                editor.editing.view.document.on('blur', (event: any) => {
                    props.onBlur?.(event, editor);
                });

                props.onReady?.(editor);
            } catch (error: any) {
                console.error('CKEditor initialization error:', error);
                props.onError?.(error, {});
            }
        };

        initializeEditor();

        // Cleanup on unmount
        return () => {
            if (editorInstanceRef.current) {
                editorInstanceRef.current.destroy().catch(() => { });
                editorInstanceRef.current = null;
            }
        };
    }, [isLayoutReady, props.value, props.placeholder, props.customConfig]);

    return <div
        id={props.id}
        ref={editorContainerRef}
        className={`col editor-container editor-container_classic-editor editor-container_include-style ${props.className ?? ""} ${props.helperText?.length ? 'helper-text' : ""}`}
        data-helper-text={props.helperText}
        style={{ '--helper-text-color': props.helperTextColor ?? '#e14337', ...style } as CSSProperties}
    >
    </div>
}