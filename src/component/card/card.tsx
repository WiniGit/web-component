import React, { CSSProperties, ReactNode } from 'react';
import './card.css';

interface cardInfoProps {
    avatar?: ReactNode,
    heading?: ReactNode,
    subHeading?: ReactNode,
    content?: ReactNode,
    action?: ReactNode,
    style?: CSSProperties,
    className?: string
}

export function CardSimple({ avatar, heading, subHeading, content, action, style, className }: cardInfoProps) {
    return <div className={`card-new-grid ${className ?? ''}`} style={style}>
        <div className="list-item">
            <div className="media">
                <div className="media-styleimage-circle">
                    {avatar ??
                        <img className="media-styleimage-circle-child" src="https://via.placeholder.com/40x40" />
                    }
                </div>
            </div>
            <div className="content">
                <div className="content-title-parent">
                    {heading ? <div className="content-title">{heading}</div> : <div className="content-title">name</div>}
                    {subHeading ? <div className="subtitle">{subHeading}</div> : <div className="subtitle">sub</div>}
                </div>
            </div>
            <div className="media1">
                <svg onClick={() => { }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.60698 5.34049C3.35391 5.10851 2.94912 5.10851 2.69605 5.34049C2.43465 5.58011 2.43465 5.97512 2.69605 6.21474L7.54454 10.6592C7.7976 10.8912 8.2024 10.8912 8.45546 10.6592L13.3039 6.21474C13.5654 5.97512 13.5654 5.58011 13.3039 5.34049C13.0509 5.10851 12.6461 5.10851 12.393 5.34049L8 9.36743L3.60698 5.34049Z" fill="#61616B" />
                </svg>
            </div>
        </div>
        <div className="frame-parent">
            {/* 1item hàng ngang */}
            {content ?? <div className="content-parent">
                <div className="content1">
                    <div className="content-title-wrapper">
                        <div className="content-title">value1</div>
                    </div>
                    <div className="body-content">content1</div>
                </div>
                <div className="content1">
                    <div className="content-title-wrapper">
                        <div className="content-title">value2</div>
                    </div>
                    <div className="body-content">content2</div>
                </div>
            </div>}

        </div>
        <div>
            {action ?? <div></div>}
        </div>
    </div>
}