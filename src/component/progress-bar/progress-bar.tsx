import { CSSProperties, ReactNode, useState } from 'react'
import './progress-bar.css'
import React from 'react'
import { ComponentStatus, getStatusIcon, Winicon } from '../../index'

export function ProgressBar({ id, status = ComponentStatus.INFOR, percent = 100, titleText, title, hideTitle = false, progressBarOnly = false, fullColor = 'var(--neutral-main-background-color)', percentColor = 'var(--infor-main-color)', style, progressBarStyle }: {
    id?: string,
    percent: number,
    titleText?: string,
    title?: ReactNode,
    hideTitle: boolean,
    progressBarOnly: boolean,
    fullColor: string,
    percentColor: string,
    style?: CSSProperties,
    status: ComponentStatus,
    progressBarStyle?: CSSProperties
}) {
    const [openDetails, setOpenDetails] = useState(true)

    return <div id={id} className="progress-bar-container col" style={style ? { padding: progressBarOnly ? '0' : '1.6rem 2.4rem', ...style } : { padding: progressBarOnly ? '0' : '1.6rem 2.4rem' }}>
        {(hideTitle || progressBarOnly) ? null : (title ?? <div className="progress-bar-title row">
            <div className="heading-text">{titleText}</div>
            <button type="button" className="suffix-action" onClick={() => { setOpenDetails(!openDetails) }}><Winicon src={openDetails ? "fill/arrows/down-arrow" : "fill/arrows/up-arrow"} /></button>
        </div>)}
        {openDetails ? <div className='progress-bar-tile row' >
            <div className="progress-bar-value" style={{ '--percent-color': percentColor, '--full-color': fullColor, '--percent': `${percent}%`, ...(progressBarStyle ?? {}) } as CSSProperties}></div>
            {progressBarOnly || status === ComponentStatus.INFOR ? null : <div className='status-icon'>{getStatusIcon(status)}</div>}
            {progressBarOnly ? null : <div className='text-value'>{percent}/100</div>}
        </div> : null}

    </div>
}