import React from 'react'
import ReactDOM from 'react-dom'
import styles from './dialog.module.css'
import { ComponentStatus, getStatusIcon } from '../../index'


export enum DialogAlignment {
    start = 'start',
    center = 'center',
    end = 'end'
}

interface DialogState {
    readonly open?: boolean,
    title: string,
    status: ComponentStatus,
    content: string,
    onSubmit: Function,
    submitTitle?: string,
    cancelTitle?: string,
    alignment?: DialogAlignment,
}

export const showDialog = ({ ref, title, status, content, onSubmit, submitTitle, cancelTitle, alignment }: {
    ref: React.MutableRefObject<Dialog>,
    title?: string,
    status?: ComponentStatus,
    content?: string,
    onSubmit?: Function,
    submitTitle?: string,
    cancelTitle?: string,
    alignment?: DialogAlignment
}) => {
    ref.current.showDialogNoti({
        title: title ?? '',
        status: status ?? ComponentStatus.INFOR,
        content: content ?? '',
        onSubmit: onSubmit ?? (() => { }),
        submitTitle: submitTitle,
        cancelTitle: cancelTitle,
        alignment: alignment
    })
}

export class Dialog extends React.Component<Object, DialogState> {
    state: Readonly<DialogState> = {
        open: false,
        title: '',
        status: ComponentStatus.INFOR,
        content: '',
        onSubmit: () => { }
    }
    showDialogNoti(data: DialogState) {
        this.setState({ open: true, ...data })
    }

    closeDialog() {
        this.setState({ open: false })
    }

    render() {
        return (
            <>
                {this.state.open &&
                    ReactDOM.createPortal(
                        <div className={styles['dialog-overlay']}>
                            <div className={`${styles['dialog-container']} col`} style={{ width: '41.4rem', alignItems: this.state.alignment }} dialog-type={this.state.status} onClick={e => e.stopPropagation()} >
                                <div key={'dialog-body'} className={`${styles['dialog-body']} col`} style={{ alignItems: 'inherit' }}>
                                    <div className={`${styles['dialog-status']} row`}>{getStatusIcon(this.state.status)}</div>
                                    <div className={styles['dialog-title']} style={{ textAlign: this.state.alignment === DialogAlignment.center ? 'center' : 'start' }}>{this.state.title}</div>
                                    <div className={styles['dialog-content']} style={{ textAlign: this.state.alignment === DialogAlignment.center ? 'center' : 'start' }}>{this.state.content}</div>
                                </div>
                                <div key={'dialog-footer'} className={`${styles['dialog-footer']} row`}>
                                    <button type='button' style={this.state.alignment === DialogAlignment.center ? { flex: 1, width: '100%' } : undefined} onClick={() => this.setState({ open: false })} className={styles['dialog-action']}>{this.state.cancelTitle ?? "Quay lại"}</button>
                                    <button type='button' style={this.state.alignment === DialogAlignment.center ? { flex: 1, width: '100%' } : undefined} onClick={() => {
                                        this.state.onSubmit();
                                        this.setState({ open: false });
                                    }} className={`${styles['dialog-action']} ${styles['dialog-submit']}`} >
                                        {this.state.submitTitle ?? 'Xác nhận'}
                                    </button>
                                </div>
                            </div>
                        </div>,
                        document.body
                    )}
            </>
        )
    }
}
