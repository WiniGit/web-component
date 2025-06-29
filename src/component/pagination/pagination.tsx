import { CSSProperties, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import styles from './pagination.module.css';
import { Select1 } from "../select1/select1";
import { Text } from "../text/text";
import { TextField } from "../text-field/text-field";
import { Winicon } from "../wini-icon/winicon";
import { useTranslation } from "react-i18next";
import { Popup } from "../popup/popup";

interface Props {
    id?: string,
    currentPage: number,
    itemPerPage: number,
    totalItem: number,
    onChangePage: Function,
    hideGoToPage?: boolean,
    hidePageSize?: boolean,
    style?: CSSProperties,
}

export function Pagination({ id, currentPage, itemPerPage = 10, totalItem, onChangePage, hidePageSize = false, hideGoToPage = false, style }: Props) {
    const goToPageRef = useRef<TextField>(null)
    const { t } = useTranslation()
    const popupRef = useRef<any>(null)

    useEffect(() => {
        if (goToPageRef.current) {
            const _inputPage = goToPageRef.current.getInput()
            if (_inputPage) _inputPage.value = currentPage.toString()
        }
    }, [currentPage])

    if (currentPage > 1 && (totalItem === 0 || (Math.floor(totalItem / itemPerPage) + (totalItem % itemPerPage === 0 ? 0 : 1)) < currentPage)) {
        onChangePage(1, itemPerPage);
        return <div></div>;
    } else if (totalItem > 0) {
        return <div id={id} className={`${styles['custom-pagination']} row`} style={style}>
            {hidePageSize ? null : <div className="row" style={{ gap: '0.8rem' }}>
                <Popup ref={popupRef} />
                <Select1
                    value={itemPerPage}
                    options={[10, 20, 50, 100, 200].map((item, _) => { return { id: item, name: `${item}` } })}
                    style={{ width: '6.8rem', padding: '0 0.8rem', height: '2.4rem' }}
                    suffix={<Winicon src={"fill/arrows/down-arrow"} size={"1.2rem"} />}
                    onChange={(ev: any) => {
                        onChangePage(currentPage, isNaN(parseInt(ev.id)) ? itemPerPage : parseInt(ev.id));
                    }}
                />
                <Text className="body-3">{t("ofItems", { totalItem: totalItem })}</Text>
            </div>}
            <div style={{ flex: 1 }} />
            <ReactPaginate
                onPageChange={(ev) => {
                    onChangePage(ev.selected + 1, itemPerPage);
                }}
                forcePage={currentPage - 1}
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
            {!hideGoToPage && <>
                <div style={{ height: '1.6rem', backgroundColor: "var(--neutral-bolder-border-color, light-dark(#D7D7DB, #494950))", width: 1 }} />
                <Text className="label-3">{t("go")} {t("page").toLowerCase()}</Text>
                <TextField
                    ref={goToPageRef as any}
                    style={{ width: '4.8rem', textAlign: "center" }}
                    className="body-3 size24"
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