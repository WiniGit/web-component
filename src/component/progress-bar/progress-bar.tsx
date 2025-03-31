import { CSSProperties, ReactNode, useState } from 'react'
import styles from './progress-bar.module.css'
import { ComponentStatus, getStatusIcon, Winicon } from '../../index'

export function ProgressBar({ id, status = ComponentStatus.INFOR, percent = 80, titleText, title, hideTitle = false, progressBarOnly = false, fullColor, percentColor, style, progressBarStyle, className = "" }: {
    id?: string,
    percent: number,
    titleText?: string,
    title?: ReactNode,
    hideTitle?: boolean,
    progressBarOnly?: boolean,
    fullColor?: string,
    percentColor?: string,
    style?: CSSProperties,
    className?: string,
    status?: ComponentStatus,
    progressBarStyle?: CSSProperties
}) {
    const [openDetails, setOpenDetails] = useState(true)

    return progressBarOnly ?
        <div id={id} className={`${styles["progress-bar-value"]} ${className}`} style={{ '--percent-color': percentColor, '--full-color': fullColor, '--percent': `${percent}%`, minWidth: "16rem", ...(style ?? {}) } as CSSProperties} /> :
        <div id={id} className={`col ${styles["progress-bar-container"]} ${className}`} style={style ? { padding: '1.6rem 2.4rem', ...style } : { padding: '1.6rem 2.4rem' }}>
            {hideTitle ? null : (title ?? <div className={`row ${styles["progress-bar-title"]}`}>
                <div className="heading-8">{titleText}</div>
                <Winicon src={openDetails ? "fill/arrows/down-arrow" : "fill/arrows/up-arrow"} onClick={() => { setOpenDetails(!openDetails) }} />
            </div>)}
            {openDetails ? <div className={`row ${styles["progress-bar-tile"]}`}>
                <div className={styles["progress-bar-value"]} style={{ '--percent-color': percentColor, '--full-color': fullColor, '--percent': `${percent}%`, ...(progressBarStyle ?? {}) } as CSSProperties}></div>
                {status === ComponentStatus.INFOR ? null : <div className={`${styles["status-icon"]}`}>{getStatusIcon(status)}</div>}
                <div className='label-4'>{percent}/100</div>
            </div> : null}
        </div>
}