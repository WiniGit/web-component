import { CSSProperties } from 'react';
import { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Alignment,
    Autoformat,
    AutoImage,
    AutoLink,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    Bold,
    Bookmark,
    Code,
    CodeBlock,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    FullPage,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlComment,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    // Markdown,
    MediaEmbed,
    Mention,
    PageBreak,
    Paragraph,
    PasteFromMarkdownExperimental,
    PasteFromOffice,
    PictureEditing,
    RemoveFormat,
    ShowBlocks,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Style,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    TextTransformation,
    // Title,
    TodoList,
    Underline,
    WordCount,
    EventInfo,
    Fullscreen,
    IconExportPdf,
    ButtonView,
    Plugin,
    Command
} from 'ckeditor5';
import './ck-editor.css';
import 'ckeditor5/ckeditor5.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

/**
 * Please update the following values with your tokens.
 * Instructions on how to obtain them: https://ckeditor.com/docs/trial/latest/guides/real-time/quick-start.html
 */

// wordCount = editor.plugins.get('WordCount');
interface Props {
    id?: string,
    style?: CSSProperties,
    className?: string,
    value?: string,
    placeholder?: string,
    disabled?: boolean,
    menuBar?: boolean,
    onChange?: (event: EventInfo, editor: ClassicEditor) => void,
    onFocus?: (event: EventInfo, editor: ClassicEditor) => void,
    onBlur?: (event: EventInfo, editor: ClassicEditor) => void,
    onError?: (error: Error, details: any) => void,
    onReady?: (editor: ClassicEditor) => void,
    onAfterDestroy?: (editor: ClassicEditor) => void,
    extraPlugins?: Array<any>,
    helperText?: string,
    helperTextColor?: string,
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
    handleExportPdf?: (editor: ClassicEditor) => void,
}

class ExportPdfCommand extends Command {
    execute() {
        const editor = this.editor;
        const content = editor.getData();

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
        this.isEnabled = true;
    }
}

// 2. Your Plugin Class
class ExportPdfPlugin extends Plugin {
    static get pluginName() {
        return 'ExportPdf';
    }

    init() {
        const editor = this.editor;

        // CORRECT: Instantiate the class. 
        // The Command class parent automatically handles .destroy() logic.
        editor.commands.add('exportPdf', new ExportPdfCommand(editor));

        editor.ui.componentFactory.add('exportPdf', (locale) => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Export PDF',
                icon: IconExportPdf,
                tooltip: true
            });

            view.on('execute', () => {
                editor.execute('exportPdf');
            });

            return view;
        });
    }
}


export function CustomCkEditor5({ style = {}, extraPlugins = [], ...props }: Props) {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    // const editorWordCountRef = useRef(null);

    return <div
        id={props.id}
        ref={editorContainerRef}
        className={`col editor-container editor-container_classic-editor editor-container_include-style ${props.className ?? ""} ${props.helperText?.length ? 'helper-text' : ""}`}
        helper-text={props.helperText}
        style={{ '--helper-text-color': props.helperTextColor ?? '#e14337', ...style } as CSSProperties}
    >
        <div className="editor-container__editor">
            <div ref={editorRef}>
                <CKEditor
                    onReady={props.onReady}
                    onAfterDestroy={props.onAfterDestroy}
                    onFocus={props.onFocus}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    editor={ClassicEditor}
                    onError={props.onError}
                    config={{
                        toolbar: {
                            items: [
                                'exportPdf',
                                'fullscreen',
                                'heading',
                                '|',
                                // 'sourceEditing',
                                // 'showBlocks',
                                // 'findAndReplace',
                                // 'textPartLanguage',
                                'fontSize',
                                'fontFamily',
                                'fontColor',
                                'fontBackgroundColor',
                                '|',
                                'bold',
                                'italic',
                                'underline',
                                'strikethrough',
                                // 'subscript',
                                // 'superscript',
                                // 'code',
                                // 'removeFormat',
                                '|',
                                'insertImage',
                                'specialCharacters',
                                'horizontalLine',
                                'pageBreak',
                                'link',
                                // 'bookmark',
                                // 'insertImageViaUrl',
                                // 'ckbox',
                                'mediaEmbed',
                                'insertTable',
                                'highlight',
                                // 'blockQuote',
                                // 'codeBlock',
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
                        plugins: [
                            Fullscreen,
                            Alignment,
                            Autoformat,
                            AutoImage,
                            AutoLink,
                            Autosave,
                            BalloonToolbar,
                            BlockQuote,
                            Bold,
                            Bookmark,
                            Code,
                            CodeBlock,
                            Essentials,
                            FindAndReplace,
                            FontBackgroundColor,
                            FontColor,
                            FontFamily,
                            FontSize,
                            FullPage,
                            GeneralHtmlSupport,
                            Heading,
                            Highlight,
                            HorizontalLine,
                            HtmlComment,
                            HtmlEmbed,
                            ImageBlock,
                            ImageCaption,
                            ImageInline,
                            ImageInsert,
                            ImageInsertViaUrl,
                            ImageResize,
                            ImageStyle,
                            ImageTextAlternative,
                            ImageToolbar,
                            ImageUpload,
                            Indent,
                            IndentBlock,
                            Italic,
                            Link,
                            LinkImage,
                            List,
                            ListProperties,
                            // Markdown,
                            MediaEmbed,
                            Mention,
                            PageBreak,
                            Paragraph,
                            PasteFromMarkdownExperimental,
                            PasteFromOffice,
                            PictureEditing,
                            RemoveFormat,
                            ShowBlocks,
                            SourceEditing,
                            SpecialCharacters,
                            SpecialCharactersArrows,
                            SpecialCharactersCurrency,
                            SpecialCharactersEssentials,
                            SpecialCharactersLatin,
                            SpecialCharactersMathematical,
                            SpecialCharactersText,
                            Strikethrough,
                            Style,
                            Subscript,
                            Superscript,
                            Table,
                            TableCaption,
                            TableCellProperties,
                            TableColumnResize,
                            TableProperties,
                            TableToolbar,
                            TextPartLanguage,
                            TextTransformation,
                            // Title,
                            TodoList,
                            Underline,
                            WordCount,
                        ],
                        balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
                        extraPlugins: [
                            ExportPdfPlugin, ...extraPlugins
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
                            options: ["Default", "Arial", "Courier New", "Inter", "Roboto", "Times New Roman", "Source Serif 4", "Noto Sans JP"],
                            supportAllValues: true
                        },
                        fontSize: {
                            options: [10, 12, 14, 'default', 18, 20, 22, 24],
                            supportAllValues: true,
                        },
                        fontColor: {
                            columns: 6,
                            colors: [
                                {
                                    color: '#18181B',
                                    label: 'title'
                                },
                                {
                                    color: '#61616B',
                                    label: 'subtitle'
                                },
                                {
                                    color: '#313135',
                                    label: 'body'
                                },
                                {
                                    color: '#878792',
                                    label: 'placeholder'
                                },
                                {
                                    color: '#A2A2AA',
                                    label: 'disabled'
                                },
                                {
                                    color: '#FFFFFF',
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
                        // fontBackgroundColor: {
                        //     columns: 6,
                        //     colors: [],
                        // },
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
                        image: {
                            toolbar: [
                                'toggleImageCaption',
                                'imageTextAlternative',
                                '|',
                                'imageStyle:inline',
                                'imageStyle:wrapText',
                                'imageStyle:breakText',
                                '|',
                                'resizeImage'
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
                    } as any}
                    disabled={props.disabled}
                    data={props.value}
                />
            </div>
        </div>
    </div>
}