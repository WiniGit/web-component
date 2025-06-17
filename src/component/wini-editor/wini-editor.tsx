import styles from "./index.module.css";
import ReactDOM from "react-dom"
import { CSSProperties, forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { closePopup, showPopup, Button, NavLink, Popup, Text, TextField, Util, Winicon } from "../../index";
import EmojiPicker, { EmojiClickData, EmojiStyle, SuggestionMode } from "emoji-picker-react"
import { useTranslation } from "react-i18next";

export interface SuggestionProps {
    triggerPattern: string;
    render: (offset: { top: number, left: number }, match: string, handleSelectSuggest: (newElement?: HTMLElement) => void) => ReactNode;
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
    showEmoji: (s: CSSProperties) => void;
    element: HTMLDivElement;
    focus: () => void;
}

export const WiniEditor = forwardRef<RefProps, Props>(({ id, onChange, disabled, placeholder, style = {}, className, onSuggest, autoFocus, initValue, hideToolbar, helperText, helperTextColor }, ref) => {
    const inputContentRef = useRef<HTMLDivElement>(null)
    const savedRange = useRef<any>(null)
    const popupRef = useRef<any>(null)
    const emojiOffsetRef = useRef<CSSProperties>(null)
    const inserLinkOffsetRef = useRef<CSSProperties>(null)
    const [isOpenEmoji, setIsOpenEmoji] = useState(false)
    const [showLinkPrompt, setShowLinkPrompt] = useState(false);
    const [showLinkDetails, setShowLinkDetails] = useState<HTMLAnchorElement | null>(null);

    const onSaveRange = (ev?: any) => {
        if (ev?.target.innerHTML === "<br>") ev.target.innerHTML = ""
        const selection = window.getSelection();
        if (selection && (inputContentRef.current?.contains(selection.focusNode) || (selection.focusNode?.nodeName !== "#text" && (selection.focusNode as any)?.closest(`div[class*="wini-editor-input"]`)))) {
            savedRange.current = selection.getRangeAt(0)
        } else if (selection && !savedRange.current) {
            const range = document.createRange();
            range.selectNodeContents(inputContentRef.current!);
            selection.removeAllRanges();
            selection.addRange(range);
            savedRange.current = range
        }
    }

    const onRestoreRange = (content?: string | HTMLElement) => {
        const selection = window.getSelection();
        if (selection) {
            if (content) {
                if (typeof content === "string") {
                    const emoji = document.createTextNode(content);
                    savedRange.current.deleteContents();
                    savedRange.current.insertNode(emoji);
                    savedRange.current.setStartAfter(emoji);
                    savedRange.current.setEndAfter(emoji);
                } else {
                    savedRange.current.insertNode(content);
                    savedRange.current.setStartAfter(content);
                    savedRange.current.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(savedRange.current);
                }
            } else {
                selection.removeAllRanges();
                selection.addRange(savedRange.current);
            }
        }
    }

    const onInput = (ev: any) => {
        if (ev.target.innerHTML === "<br>") ev.target.innerHTML = ""
        const sel = window.getSelection();
        if (sel) {
            const range = sel.getRangeAt(0);
            if (!sel.rangeCount || !range.collapsed || !onSuggest?.length) {
                savedRange.current = range
                onChange?.(inputContentRef.current!.innerHTML, inputContentRef.current!)
                return savedRange.current.collapse()
            }

            const node = sel.anchorNode;
            const offset = sel.anchorOffset;

            // Get text content from the node up to the caret
            const text = node!.textContent!.slice(0, offset);
            let match: RegExpMatchArray | null = null;
            let suggestionItem: SuggestionProps | null = null;
            for (const sgt of onSuggest) {
                match = text.match(sgt.triggerPattern);
                if (match) {
                    suggestionItem = sgt
                    break;
                }
            }

            if (!match || !suggestionItem) {
                if (document.querySelector(".people-suggestion")) closePopup(popupRef)
                savedRange.current = range; // No word starting with @
                onChange?.(inputContentRef.current!.innerHTML, inputContentRef.current!)
                return savedRange.current.collapse()
            }
            // Insert a marker at caret
            const marker = document.createElement("span");
            marker.appendChild(document.createTextNode("\u200b"));
            range.insertNode(marker);

            // Restore caret after the marker
            range.setStartAfter(marker);
            // range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);

            const rect = marker.getBoundingClientRect();

            marker.remove();
            showPopup({
                ref: popupRef,
                hideOverlay: true,
                content: suggestionItem.render(
                    { top: rect.bottom + window.scrollY + 2, left: rect.left + window.scrollX },
                    match[0],
                    (ev) => {
                        closePopup(popupRef)
                        if (ev) {
                            node!.textContent = node!.textContent!.slice(0, offset).replace(match[0], "");
                            const range = sel.getRangeAt(0);
                            range.deleteContents();
                            range.insertNode(ev)
                            range.insertNode(document.createTextNode(String.fromCharCode(0x200b)));
                            onChange?.(inputContentRef.current!.innerHTML, inputContentRef.current!)
                            sel.removeAllRanges();
                            sel.addRange(range)
                            range.collapse()
                        }
                    }
                )
            })
        }
    }

    const showEmoji = (s: CSSProperties) => {
        onSaveRange()
        emojiOffsetRef.current = s
        setIsOpenEmoji(true)
    }

    const handleFocus = () => {
        setTimeout(() => {
            inputContentRef.current!.focus()
            const range = document.createRange();
            range.selectNodeContents(inputContentRef.current!);
            range.collapse(false); // Move caret to end
            const sel = window.getSelection();
            sel!.removeAllRanges();
            sel!.addRange(range);
        }, 100)
    }

    useImperativeHandle(ref, () => ({
        showEmoji: showEmoji,
        element: inputContentRef.current!.parentElement as HTMLDivElement,
        focus: handleFocus,
    }), []);

    useEffect(() => {
        if (autoFocus && inputContentRef.current) handleFocus()
    }, [autoFocus])

    useEffect(() => {
        if (initValue) inputContentRef.current!.innerHTML = initValue
    }, [initValue])

    const [activeStyles, setActiveStyles] = useState({
        bold: false,
        italic: false,
        underline: false,
    });

    const handleFormat = useCallback((command: "bold" | "italic" | "underline") => {
        document.execCommand(command, false);
        inputContentRef.current?.focus();
        updateActiveStyles();
    }, []);

    const handleLink = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            document.execCommand('createLink', false, "https://");
            savedRange.current = selection.getRangeAt(0);
            let selectedLink = savedRange.current.startContainer;
            if (selectedLink.nodeType === Node.TEXT_NODE) selectedLink = selectedLink.parentElement.closest("a")
            selectedLink.onmousedown = (ev: any) => {
                ev.preventDefault();
            }
            selectedLink.onclick = () => {
                const rectLink = selectedLink.getBoundingClientRect();
                inserLinkOffsetRef.current = { top: rectLink.bottom + 2 }
                setShowLinkDetails(selectedLink)
            }
            const rect = savedRange.current.getBoundingClientRect();
            inserLinkOffsetRef.current = { top: rect.bottom + 2 }
            setShowLinkPrompt(true);
        }
    };

    const applyLinkToATag = (url?: string) => {
        if (url) showLinkDetails!.href = url
        setShowLinkDetails(null)
    }

    const applyLink = (url?: string) => {
        setShowLinkPrompt(false);
        let selectedLink = savedRange.current.startContainer;
        if (selectedLink.nodeType === Node.TEXT_NODE) selectedLink = selectedLink.parentElement.closest("a")
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(savedRange.current);
        if (!url) {
            document.execCommand('unLink', false, "https://");
            return;
        }
        selectedLink.href = url
        updateActiveStyles();
    };

    const updateActiveStyles = useCallback(() => {
        setActiveStyles({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
        });
    }, []);

    useEffect(() => {
        const editor = inputContentRef.current;
        if (!editor) return;

        const events = ['mouseup', 'keyup', 'focus'];

        const handleStyleUpdate = () => {
            setTimeout(updateActiveStyles, 0);
        };

        events.forEach(event => {
            editor.addEventListener(event, handleStyleUpdate);
        });

        // Dọn dẹp các trình lắng nghe khi component bị hủy
        return () => {
            events.forEach(event => {
                editor.removeEventListener(event, handleStyleUpdate);
            });
        };
    }, [updateActiveStyles]);

    return <div
        id={id}
        className={`col ${styles["wini-editor-container"]} ${disabled ? styles["disabled"] : ""} ${className ?? "body-3"} ${helperText?.length ? styles['helper-text'] : ""}`}
        style={{ '--helper-text-color': helperTextColor ?? '#e14337', ...style } as CSSProperties}
        helper-text={helperText}
    >
        <Popup ref={popupRef} />
        <div ref={inputContentRef}
            className={`${styles["wini-editor-input"]}`}
            suppressContentEditableWarning contentEditable
            onFocus={onSaveRange}
            onInput={onInput}
            onPaste={(ev) => {
                ev.preventDefault()
                const text = ev.clipboardData.getData("text/plain")
                onRestoreRange(text)
                onChange?.(inputContentRef.current!.innerHTML, inputContentRef.current!)
            }}
            onBlur={() => { onChange?.(inputContentRef.current!.innerHTML, inputContentRef.current!) }}
            {...(placeholder ? { placeholder: placeholder } : {})}
        />
        {showLinkDetails && <PopupLinkDetails
            element={showLinkDetails}
            onClose={() => {
                setTimeout(applyLinkToATag, 150)
            }}
            onRemove={() => {
                showLinkDetails.replaceWith(...showLinkDetails.childNodes)
            }}
            onApply={applyLinkToATag}
            style={inserLinkOffsetRef.current as any}
        />}
        {showLinkPrompt && ReactDOM.createPortal(<PopupLinkPrompt
            onClose={() => {
                setTimeout(() => {
                    setShowLinkPrompt(false)
                    applyLink()
                }, 150)
            }}
            onApply={applyLink}
            style={inserLinkOffsetRef.current as any}
        />, document.body)}
        {!hideToolbar && <div className='row' style={{ gap: 4 }}>
            <Winicon src='outline/emoticons/smile' size={16}
                onMouseDown={(ev) => { ev.preventDefault() }}
                onClick={(ev) => {
                    const btn = ev.currentTarget.closest("div") as any
                    const rect = btn.getBoundingClientRect();
                    showEmoji({ top: rect.bottom + 2, left: ev.currentTarget.offsetLeft })
                }} />
            {isOpenEmoji && ReactDOM.createPortal(<PopupEmojiPicker
                onClose={() => { setTimeout(() => { setIsOpenEmoji(false) }, 150) }}
                style={emojiOffsetRef.current as any}
                onSelect={(em) => {
                    setIsOpenEmoji(false)
                    const img = document.createElement("img")
                    img.src = em.imageUrl
                    img.alt = em.emoji
                    img.className = styles["emoji"]
                    onRestoreRange(img)
                }}
            />, document.body)}
            <Winicon src='outline/text/bold' className="icon-button size24 light" size={14} color={activeStyles.bold ? "var(--primary-main-color)" : undefined} onMouseDown={(ev) => { ev.preventDefault() }} onClick={() => { handleFormat("bold") }} />
            <Winicon src='outline/editing/text-italic' className="icon-button size24 light" size={14} color={activeStyles.italic ? "var(--primary-main-color)" : undefined} onMouseDown={(ev) => { ev.preventDefault() }} onClick={() => { handleFormat("italic") }} />
            <Winicon src='outline/text/underline' className="icon-button size24 light" size={14} color={activeStyles.underline ? "var(--primary-main-color)" : undefined} onMouseDown={(ev) => { ev.preventDefault() }} onClick={() => { handleFormat("underline") }} />
            <Winicon src='outline/user interface/hyperlink' className='icon-button size32' size={16} onMouseDown={(ev) => { ev.preventDefault() }} onClick={handleLink} />
        </div>}
    </div>
})


const PopupEmojiPicker = (props: { style: CSSProperties, onClose: () => void, onSelect: (emoji: EmojiClickData) => void }) => {
    const divRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()

    useEffect(() => {
        if (divRef.current) {
            const onClickDropDown = (ev: any) => {
                if (ev.target === divRef.current || !divRef.current!.contains(ev.target)) props.onClose()
            }
            window.document.body.addEventListener("mousedown", onClickDropDown)
            return () => {
                window.document.body.removeEventListener("mousedown", onClickDropDown)
            }
        }
    }, [divRef.current])

    return <div ref={divRef} className={`col ${styles["dropdown"]}`} style={props.style}>
        <EmojiPicker
            lazyLoadEmojis
            theme={Util.getStorage("theme") as any}
            skinTonesDisabled
            emojiStyle={EmojiStyle.APPLE}
            height={400}
            searchPlaceHolder={t("search")}
            suggestedEmojisMode={SuggestionMode.RECENT}
            onEmojiClick={props.onSelect}
            autoFocusSearch={false}
        />
    </div>
}

const PopupLinkPrompt = (props: { style: CSSProperties, onClose: () => void, onApply: (vl: string) => void }) => {
    const divRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()
    const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g
    const [value, setValue] = useState("")

    useEffect(() => {
        if (divRef.current) {
            const onClickDropDown = (ev: any) => {
                if (ev.target === divRef.current || !divRef.current!.contains(ev.target)) props.onClose()
            }
            window.document.body.addEventListener("mousedown", onClickDropDown)
            return () => {
                window.document.body.removeEventListener("mousedown", onClickDropDown)
            }
        }
    }, [divRef.current])

    return <div ref={divRef} className={`row ${styles["dropdown"]} ${styles["link-prompt"]}`} style={props.style}>
        <TextField
            autoFocus
            placeholder="Insert link..."
            className="body-3 size32"
            style={{ width: "28rem" }}
            onChange={(ev) => {
                setValue(ev.target.value)
            }}
            onComplete={(ev) => { ev.currentTarget.blur() }}
        />
        <Button
            label={t("apply")}
            className="label-3 size32 button-primary"
            style={{ borderRadius: "10rem" }}
            disabled={!urlRegex.test(value) || urlRegex.test(value)}
            onClick={() => { props.onApply(value) }}
        />
    </div>
}

const PopupLinkDetails = (props: { style: CSSProperties, onClose: () => void, element: HTMLAnchorElement, onRemove: () => void, onApply: (vl: string) => void }) => {
    const divRef = useRef<HTMLDivElement>(null)
    const [tab, setTab] = useState(0)
    const { t } = useTranslation()
    const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g
    const [value, setValue] = useState("")

    useEffect(() => {
        if (divRef.current) {
            const onClickDropDown = (ev: any) => {
                if (ev.target === divRef.current || !divRef.current!.contains(ev.target)) props.onClose()
            }
            window.document.body.addEventListener("mousedown", onClickDropDown)
            return () => {
                window.document.body.removeEventListener("mousedown", onClickDropDown)
            }
        }
    }, [divRef.current])

    return <div ref={divRef} className={`row ${styles["dropdown"]} ${styles["link-prompt"]}`} style={{ ...props.style, gap: 4 }}>
        {tab ? <>
            <TextField
                autoFocus
                placeholder="Insert link..."
                className="body-3 size32"
                style={{ width: "28rem" }}
                onChange={(ev) => {
                    setValue(ev.target.value)
                }}
                onComplete={(ev) => { ev.currentTarget.blur() }}
            />
            <Button
                label={t("apply")}
                className="label-3 size32 button-primary"
                style={{ borderRadius: "10rem" }}
                disabled={!urlRegex.test(value) || urlRegex.test(value)}
                onClick={() => { props.onApply(value) }}
            />
        </> : <>
            <Text>Go to: </Text>
            <NavLink target="_blank" to={props.element.href}>
                <Text className="button-text-3" style={{ maxWidth: "24rem" }} maxLine={1}>{props.element.href}</Text>
            </NavLink>
            <div style={{ background: "var(--neutral-bolder-border-color)", height: "1.4rem", width: 1, margin: "0 0.4rem" }} />
            <Text onClick={() => setTab(1)} className="button-text-3">Change</Text>
            <div style={{ background: "var(--neutral-bolder-border-color)", height: "1.4rem", width: 1, margin: "0 0.4rem" }} />
            <Text onClick={props.onRemove} className="button-text-3">Remove</Text>
        </>}
    </div>
}