import { CSSProperties, ReactNode, useState } from 'react'
import styles from './progress-bar.module.css'
import { ComponentStatus, getStatusIcon, Winicon } from '../../index'

export function ProgressBar({ id, status = ComponentStatus.INFOR, percent = 100, titleText, title, hideTitle = false, progressBarOnly = false, fullColor = 'var(--neutral-main-background-color)', percentColor = 'var(--primary-main-color)', style, progressBarStyle }: {
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

    return <div id={id} className={`col ${styles["progress-bar-container"]}`} style={style ? { padding: progressBarOnly ? '0' : '1.6rem 2.4rem', ...style } : { padding: progressBarOnly ? '0' : '1.6rem 2.4rem' }}>
        {(hideTitle || progressBarOnly) ? null : (title ?? <div className={`row ${styles["progress-bar-title"]}`}>
            <div className="heading-8">{titleText}</div>
            <Winicon src={openDetails ? "fill/arrows/down-arrow" : "fill/arrows/up-arrow"} onClick={() => { setOpenDetails(!openDetails) }} />
        </div>)}
        {openDetails ? <div className={`row ${styles["progress-bar-tile"]}`} >
            <div className={styles["progress-bar-value"]} style={{ '--percent-color': percentColor, '--full-color': fullColor, '--percent': `${percent}%`, ...(progressBarStyle ?? {}) } as CSSProperties}></div>
            {progressBarOnly || status === ComponentStatus.INFOR ? null : <div className={`${styles["status-icon"]}`}>{getStatusIcon(status)}</div>}
            {progressBarOnly ? null : <div className='label-4'>{percent}/100</div>}
        </div> : null}

    </div>
}