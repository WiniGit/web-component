import React from 'react'
import ReactDOM from 'react-dom'
import styles from './dialog.module.css'
import { ComponentStatus, getStatusIcon, Text } from '../../index'


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
                                <div className={`${styles['dialog-body']} col`} style={{ alignItems: 'inherit' }}>
                                    <div className={`${styles['dialog-status']} row`}>{getStatusIcon(this.state.status)}</div>
                                    <div className='col'>
                                        <Text className={'heading-6'} style={{ textAlign: this.state.alignment === DialogAlignment.center ? 'center' : 'start' }}>{this.state.title}</Text>
                                        <Text className={'body-3'} style={{ textAlign: this.state.alignment === DialogAlignment.center ? 'center' : 'start' }}>{this.state.content}</Text>
                                    </div>
                                </div>
                                <div className={`${styles['dialog-footer']} row`}>
                                    <button type='button' style={this.state.alignment === DialogAlignment.center ? { flex: 1, width: '100%' } : undefined} onClick={() => this.setState({ open: false })} className={`${styles['dialog-action']} row`}>
                                        <Text className='button-text-3'>{this.state.cancelTitle ?? "Cancel"}</Text>
                                    </button>
                                    <button type='button' style={this.state.alignment === DialogAlignment.center ? { flex: 1, width: '100%' } : undefined} onClick={() => {
                                        this.state.onSubmit();
                                        this.setState({ open: false });
                                    }} className={`${styles['dialog-action']} row ${styles['dialog-submit']}`} >
                                        <Text className='button-text-3'>{this.state.submitTitle ?? 'Submit'}</Text>
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
