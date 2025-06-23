import React, { CSSProperties, ReactNode } from 'react';
import styles from './infinite-scroll.module.css'


interface InfiniteScrollProps {
    id?: string,
    className?: string,
    style?: CSSProperties,
    handleScroll?: (onLoadMore: boolean, ev: React.UIEvent<HTMLDivElement, UIEvent>) => Promise<any> | null,
    children?: ReactNode,
    totalCount?: number,
}

interface InfiniteScrollState {
    loading: boolean
}

export class InfiniteScroll extends React.Component<InfiniteScrollProps, InfiniteScrollState> {
    state: Readonly<InfiniteScrollState> = {
        loading: false
    }

    render() {
        return <div id={this.props.id} onScroll={async (ev) => {
            if (this.props.handleScroll) {
                this.setState({ ...this.state, loading: true })
                let scrollElement = ev.target as HTMLDivElement
                await this.props.handleScroll(Math.round(scrollElement.offsetHeight + Math.abs(scrollElement.scrollTop)) >= (scrollElement.scrollHeight - 1), ev)
                this.setState({ loading: false })
            }
        }} className={`${styles['infinite-scroll']} ${this.state.loading ? styles['loading'] : ''} ${this.props.className ?? 'col'}`} style={this.props.style ?? { 'overflow': 'hidden auto' }}>
            {this.props.children}
        </div>
    }
}
