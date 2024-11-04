import React, { CSSProperties, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import styles from './pagination.module.css';
import { Select1 } from "../select1/select1";
import { Text } from "../text/text";
import { TextField } from "../text-field/text-field";
import { Winicon } from "../wini-icon/winicon";

export function Pagination({ id, currentPage, itemPerPage, totalItem, onChangePage, hidePageSize = false, hideGoToPage = false, style }: { id?: string, currentPage: number, itemPerPage: number, totalItem: number, onChangePage: Function, hideGoToPage?: boolean, hidePageSize?: boolean, style: CSSProperties }) {
    const goToPageRef = useRef<TextField>()

    if (currentPage > 1 && (totalItem === 0 || (Math.floor(totalItem / itemPerPage) + (totalItem % itemPerPage === 0 ? 0 : 1)) < currentPage)) {
        onChangePage(1, itemPerPage);
        return <div></div>;
    }

    useEffect(() => {
        if (goToPageRef.current) {
            const _inputPage = goToPageRef.current.getInput()
            if (_inputPage) _inputPage.value = currentPage.toString()
        }
    }, [currentPage])

    if (totalItem > 0) {
        return <div id={id} className={`${styles['custom-pagination']} row`} style={style}>
            {hidePageSize ? null : <div className="row" style={{ gap: '0.8rem' }}>
                <Select1
                    readOnly
                    placeholder={itemPerPage.toString()}
                    options={[10, 20, 50, 80, 100, 150, 200].map((item, _) => { return { id: item, name: item } })}
                    style={{ borderRadius: '0.4rem', width: '5.6rem', padding: '0 0.8rem', height: '2.4rem' }}
                    onChange={(ev: any) => {
                        onChangePage(currentPage, isNaN(parseInt(ev.id)) ? itemPerPage : parseInt(ev.id));
                    }}
                />
                <Text className="body-3">of {totalItem} items</Text>
            </div>}
            <div style={{ flex: 1 }} />
            <ReactPaginate
                onPageChange={(ev) => {
                    onChangePage(ev.selected + 1, itemPerPage);
                }}
                forcePage={currentPage - 1}
                // initialPage={currentPage - 1}
                breakClassName="row button-text-3"
                breakLabel="..."
                pageCount={Math.ceil(totalItem / itemPerPage)}
                previousClassName="row"
                previousLabel={<Winicon src={"fill/arrows/left-arrow"} size={"1.4rem"} />}
                nextClassName="row"
                nextLabel={<Winicon src={"fill/arrows/right-arrow"} size={"1.4rem"} />}
                containerClassName={`${styles['pagination']} row`}
                pageClassName="row button-text-3"
                activeClassName={styles['active']}
                hrefBuilder={(pageIndex: number) =>
                    pageIndex >= 1 && pageIndex <= Math.ceil(totalItem / itemPerPage) ? `/page/${pageIndex}` : '#'
                }
                renderOnZeroPageCount={null}
            />
            {hideGoToPage ? null : <>
                <div style={{ height: '1.6rem', backgroundColor: "#00358033", width: 1 }} />
                <Text className="label-3" style={{ color: "#161C2499" }}>Go to page</Text>
                <TextField
                    ref={goToPageRef as any}
                    style={{ width: '4.8rem', textAlign: "center", padding: 0, height: '2.4rem', borderRadius: '0.4rem' }}
                    className="body-3"
                    type="number"
                    onBlur={(ev) => {
                        const _tmp = ev.target.value.trim().length ? parseInt(ev.target.value.trim()) : undefined
                        if (_tmp && !isNaN(_tmp) && _tmp > 0 && _tmp <= Math.ceil(totalItem / itemPerPage)) {
                            onChangePage(_tmp, itemPerPage)
                        } else ev.target.value = ""
                    }}
                />
            </>}
        </div>
    } else return <div id={id} />
}