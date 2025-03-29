import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react'
import './popup.css'

interface PopupState {
    readonly open?: boolean,
    heading?: ReactNode,
    body?: ReactNode,
    content?: ReactNode,
    footer?: ReactNode,
    clickOverlayClosePopup?: boolean,
    style?: CSSProperties,
    className?: string,
    hideOverlay?: boolean,
}

export const showPopup = (props: {
    ref: React.RefObject<Popup | undefined>,
    heading?: ReactNode,
    content?: ReactNode,
    body?: ReactNode,
    footer?: ReactNode,
    clickOverlayClosePopup?: boolean,
    style?: CSSProperties,
    className?: string,
    hideOverlay?: boolean,
}) => {
    props.ref?.current?.onOpen({
        heading: props.heading,
        content: props.content,
        body: props.body,
        footer: props.footer,
        clickOverlayClosePopup: props.clickOverlayClosePopup,
        style: props.style,
        className: props.className,
        hideOverlay: props.hideOverlay
    })
}

export const closePopup = (ref: React.RefObject<Popup>) => {
    ref.current.onClose()
}

export class Popup extends React.Component<Object, PopupState> {
    constructor(props: Object | Readonly<Object>) {
        super(props);
    }
    state: Readonly<PopupState> = {
        open: false,
    }

    onOpen(data: PopupState) {
        this.setState({ open: true, ...data })
    }

    onClose() {
        this.setState({ open: false })
    }

    render() {
        return (
            <>
                {this.state.open &&
                    <PopupOverlay className={this.state.hideOverlay ? 'hidden-overlay' : ''} onClose={(this.state.hideOverlay || this.state.clickOverlayClosePopup) ? () => { this.onClose() } : undefined}>
                        {this.state.content ?? <div className={`popup-container col ${this.state.className ?? ""}`} onClick={e => e.stopPropagation()} style={this.state.style} >
                            {this.state.heading}
                            {this.state.body}
                            {this.state.footer}
                        </div>}
                    </PopupOverlay>}
            </>
        )
    }
}

export function PopupOverlay({ children, onClose, className, style, onOpen }: { children?: ReactNode, className?: string, onClose?: (ev: MouseEvent) => void, style?: CSSProperties, onOpen?: (ev: HTMLDivElement) => void }) {
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (overlayRef.current && onClose) {
            const onClickDropDown = (ev: any) => {
                if (ev.target === overlayRef.current || !overlayRef.current!.contains(ev.target)) onClose(ev)
            }
            window.document.body.addEventListener("mousedown", onClickDropDown)
            return () => {
                window.document.body.removeEventListener("mousedown", onClickDropDown)
            }
        }
    }, [overlayRef.current])

    useEffect(() => {
        if (overlayRef.current && onOpen) onOpen(overlayRef.current)
    }, [overlayRef.current, onOpen])

    useEffect(() => {
        if (overlayRef.current && overlayRef.current.firstChild) {
            const timer = setTimeout(() => {
                const popupContent = overlayRef.current!.firstChild as HTMLElement
                const rect = popupContent.getBoundingClientRect()
                if (rect.x < 0) {
                    popupContent.style.left = "0px"
                    popupContent.style.right = "unset"
                } else if (rect.right > document.body.offsetWidth) {
                    popupContent.style.right = "0px"
                    popupContent.style.left = "unset"
                }
                if (rect.y < 0) {
                    popupContent.style.top = "0px"
                    popupContent.style.bottom = "unset"
                } else if (rect.bottom > document.body.offsetHeight) {
                    popupContent.style.bottom = "0px"
                    popupContent.style.top = "unset"
                }
            }, 300)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [overlayRef])

    return <div
        ref={overlayRef}
        className={`popup-overlay ${className ?? ""}`}
        style={style}
    >{children}</div>
}