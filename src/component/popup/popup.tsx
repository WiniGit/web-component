import React, { createRef, CSSProperties, ReactNode, useEffect, useRef } from 'react'
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
    hideButtonClose?: boolean,
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
    hideButtonClose?: boolean
}) => {
    props.ref?.current?.onOpen({
        heading: props.heading,
        content: props.content,
        body: props.body,
        footer: props.footer,
        clickOverlayClosePopup: props.clickOverlayClosePopup,
        style: props.style,
        className: props.className,
        hideButtonClose: props.hideButtonClose
    })
}

export const closePopup = (ref: React.RefObject<Popup>) => {
    ref.current.onClose()
}

export class Popup extends React.Component<Object, PopupState> {
    private ref = createRef<HTMLDivElement>()
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
                    <PopupOverlay className={this.state.clickOverlayClosePopup ? 'hidden-overlay' : ''} onClose={this.state.clickOverlayClosePopup ? () => { this.onClose() } : undefined}>
                        {this.state.content ?? <div ref={this.ref} className={`popup-container col ${this.state.className ?? ""}`} onClick={e => e.stopPropagation()} style={this.state.style} >
                            {this.state.heading}
                            {this.state.body}
                            {this.state.footer}
                            {this.state.hideButtonClose ? null : <button type='button' onClick={() => this.onClose()} className='popup-close-btn row' >
                                <svg width='100%' height='100%' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' style={{ width: '2rem', height: '2rem' }} >
                                    <path fillRule='evenodd' clipRule='evenodd' d='M16.4223 4.7559C16.7477 4.43047 16.7477 3.90283 16.4223 3.57739C16.0968 3.25195 15.5692 3.25195 15.2438 3.57739L9.99967 8.82147L4.7556 3.57739C4.43016 3.25195 3.90252 3.25195 3.57709 3.57739C3.25165 3.90283 3.25165 4.43047 3.57709 4.7559L8.82116 9.99998L3.57709 15.2441C3.25165 15.5695 3.25165 16.0971 3.57709 16.4226C3.90252 16.748 4.43016 16.748 4.7556 16.4226L9.99967 11.1785L15.2438 16.4226C15.5692 16.748 16.0968 16.748 16.4223 16.4226C16.7477 16.0971 16.7477 15.5695 16.4223 15.2441L11.1782 9.99998L16.4223 4.7559Z' fill='#00204D' fillOpacity={0.6} />
                                </svg>
                            </button>}
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
                if (ev.target !== overlayRef.current && !overlayRef.current!.contains(ev.target)) onClose(ev)
            }
            window.document.body.addEventListener("mousedown", onClickDropDown)
            return () => {
                window.document.body.removeEventListener("mousedown", onClickDropDown)
            }
        }
    }, [overlayRef])

    useEffect(() => {
        if (overlayRef.current && onOpen) onOpen(overlayRef.current)
    }, [overlayRef, onOpen])

    useEffect(() => {
        if (overlayRef.current && overlayRef.current.firstChild) {
            const popupContent = overlayRef.current.firstChild as HTMLElement
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
        }
    }, [overlayRef])

    return <div
        ref={overlayRef}
        className={`popup-overlay ${className ?? ""}`}
        style={style}
    >{children}</div>
}