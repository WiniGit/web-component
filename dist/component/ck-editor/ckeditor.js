"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCkEditor5 = CustomCkEditor5;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const ckeditor5_react_1 = require("@ckeditor/ckeditor5-react");
const ckeditor5_1 = require("ckeditor5");
require("./ck-editor.css");
const react_i18next_1 = require("react-i18next");
/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.
function CustomCkEditor5(props) {
    var _a, _b, _c, _d;
    const editorContainerRef = (0, react_2.useRef)(null);
    const editorRef = (0, react_2.useRef)(null);
    // const editorWordCountRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = (0, react_2.useState)(false);
    const { i18n } = (0, react_i18next_1.useTranslation)();
    (0, react_2.useEffect)(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);
    const { editorConfig } = (0, react_2.useMemo)(() => {
        if (!isLayoutReady) {
            return {};
        }
        return {
            editorConfig: {
                toolbar: {
                    items: [
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
                        'specialCharacters',
                        'insertImage',
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
                    ckeditor5_1.Alignment,
                    ckeditor5_1.Autoformat,
                    ckeditor5_1.AutoImage,
                    ckeditor5_1.AutoLink,
                    ckeditor5_1.Autosave,
                    ckeditor5_1.BalloonToolbar,
                    ckeditor5_1.BlockQuote,
                    ckeditor5_1.Bold,
                    ckeditor5_1.Bookmark,
                    ckeditor5_1.Code,
                    ckeditor5_1.CodeBlock,
                    ckeditor5_1.Essentials,
                    ckeditor5_1.FindAndReplace,
                    ckeditor5_1.FontBackgroundColor,
                    ckeditor5_1.FontColor,
                    ckeditor5_1.FontFamily,
                    ckeditor5_1.FontSize,
                    ckeditor5_1.FullPage,
                    ckeditor5_1.GeneralHtmlSupport,
                    ckeditor5_1.Heading,
                    ckeditor5_1.Highlight,
                    ckeditor5_1.HorizontalLine,
                    ckeditor5_1.HtmlComment,
                    ckeditor5_1.HtmlEmbed,
                    ckeditor5_1.ImageBlock,
                    ckeditor5_1.ImageCaption,
                    ckeditor5_1.ImageInline,
                    ckeditor5_1.ImageInsert,
                    ckeditor5_1.ImageInsertViaUrl,
                    ckeditor5_1.ImageResize,
                    ckeditor5_1.ImageStyle,
                    ckeditor5_1.ImageTextAlternative,
                    ckeditor5_1.ImageToolbar,
                    ckeditor5_1.ImageUpload,
                    ckeditor5_1.Indent,
                    ckeditor5_1.IndentBlock,
                    ckeditor5_1.Italic,
                    ckeditor5_1.Link,
                    ckeditor5_1.LinkImage,
                    ckeditor5_1.List,
                    ckeditor5_1.ListProperties,
                    ckeditor5_1.Markdown,
                    ckeditor5_1.MediaEmbed,
                    ckeditor5_1.Mention,
                    ckeditor5_1.PageBreak,
                    ckeditor5_1.Paragraph,
                    ckeditor5_1.PasteFromMarkdownExperimental,
                    ckeditor5_1.PasteFromOffice,
                    ckeditor5_1.PictureEditing,
                    ckeditor5_1.RemoveFormat,
                    ckeditor5_1.ShowBlocks,
                    ckeditor5_1.SourceEditing,
                    ckeditor5_1.SpecialCharacters,
                    ckeditor5_1.SpecialCharactersArrows,
                    ckeditor5_1.SpecialCharactersCurrency,
                    ckeditor5_1.SpecialCharactersEssentials,
                    ckeditor5_1.SpecialCharactersLatin,
                    ckeditor5_1.SpecialCharactersMathematical,
                    ckeditor5_1.SpecialCharactersText,
                    ckeditor5_1.Strikethrough,
                    ckeditor5_1.Style,
                    ckeditor5_1.Subscript,
                    ckeditor5_1.Superscript,
                    ckeditor5_1.Table,
                    ckeditor5_1.TableCaption,
                    ckeditor5_1.TableCellProperties,
                    ckeditor5_1.TableColumnResize,
                    ckeditor5_1.TableProperties,
                    ckeditor5_1.TableToolbar,
                    ckeditor5_1.TextPartLanguage,
                    ckeditor5_1.TextTransformation,
                    // Title,
                    ckeditor5_1.TodoList,
                    ckeditor5_1.Underline,
                    ckeditor5_1.WordCount
                ],
                balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
                extraPlugins: props.extraPlugins,
                mediaEmbed: {
                    previewsInData: true,
                    providers: [
                        {
                            name: "youtube",
                            url: /^https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/,
                            html: (match) => {
                                const id = match[1];
                                return ('<div style="position: relative; padding-bottom: 56.25%; height: 0;">' +
                                    `<iframe src="https://www.youtube.com/embed/${id}" ` +
                                    'style="position: absolute; width: 100%; height: 100%; left: 0;" ' +
                                    'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>' +
                                    "</div>");
                            },
                        },
                    ],
                },
                fontFamily: {
                    options: props.fontFamily || ["Default", "Arial", "Courier New", "Inter", "Roboto", "Times New Roman", "Source Serif 4"],
                    supportAllValues: true
                },
                fontSize: {
                    options: props.fontSize || [10, 12, 14, 'default', 18, 20, 22, 24],
                    supportAllValues: true,
                },
                fontColor: {
                    columns: 6,
                    colors: props.fontColors || [
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
                            color: 'var(--primary-main-color)',
                            label: 'primay'
                        },
                        {
                            color: 'var(--warning-main-color)',
                            label: 'warning'
                        },
                        {
                            color: 'var(--success-main-color)',
                            label: 'success'
                        },
                        {
                            color: 'var(--secondary3-main-color)',
                            label: 'secondary3'
                        },
                        {
                            color: 'var(--secondary4-main-color)',
                            label: 'secondary4'
                        },
                        {
                            color: 'var(--secondary5-main-color)',
                            label: 'secondary5'
                        },
                        {
                            color: 'var(--infor-main-color)',
                            label: 'infor'
                        },
                        {
                            color: 'var(--error-main-color)',
                            label: 'error'
                        },
                    ],
                },
                fontBackgroundColor: {
                    columns: 6,
                    colors: props.fontBgColors || [
                        {
                            color: 'var(--neutral-main-background-color)',
                            label: 'main'
                        },
                        {
                            color: 'var(--neutral-main-reverse-background-color)',
                            label: 'main-reverse'
                        },
                        {
                            color: 'var(--neutral-absolute-background-color)',
                            label: 'absolute'
                        },
                        {
                            color: 'var(--neutral-absolute-reverse-background-color)',
                            label: 'absolute-reverse'
                        },
                        {
                            color: 'var(--primary-background)',
                            label: 'primay-bg'
                        },
                        {
                            color: 'var(--warning-background)',
                            label: 'warning-bg'
                        },
                        {
                            color: 'var(--success-background)',
                            label: 'success-bg'
                        },
                        {
                            color: 'var(--secondary3-background)',
                            label: 'secondary3-bg'
                        },
                        {
                            color: 'var(--secondary4-background)',
                            label: 'secondary4-bg'
                        },
                        {
                            color: 'var(--secondary5-background)',
                            label: 'secondary5-bg'
                        },
                        {
                            color: 'var(--infor-background)',
                            label: 'infor-bg'
                        },
                        {
                            color: 'var(--error-background)',
                            label: 'error-bg'
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
                placeholder: props.placeholder,
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
                },
            }
        };
    }, [isLayoutReady, i18n.language]);
    return react_1.default.createElement("div", { ref: editorContainerRef, className: `col editor-container editor-container_classic-editor editor-container_include-style ${(_a = props.className) !== null && _a !== void 0 ? _a : ""} ${((_b = props.helperText) === null || _b === void 0 ? void 0 : _b.length) ? 'helper-text' : ""}`, "helper-text": props.helperText, style: props.style ? Object.assign(Object.assign({}, { '--helper-text-color': (_c = props.helperTextColor) !== null && _c !== void 0 ? _c : '#e14337' }), props.style) : { '--helper-text-color': (_d = props.helperTextColor) !== null && _d !== void 0 ? _d : '#e14337' } },
        react_1.default.createElement("div", { className: "editor-container__editor" },
            react_1.default.createElement("div", { ref: editorRef }, editorConfig && (react_1.default.createElement(ckeditor5_react_1.CKEditor, { onReady: props.onReady, onAfterDestroy: props.onAfterDestroy, onFocus: props.onFocus, onChange: props.onChange, onBlur: props.onBlur, editor: ckeditor5_1.ClassicEditor, onError: props.onError, config: editorConfig, data: props.value, disabled: props.disabled })))));
}
