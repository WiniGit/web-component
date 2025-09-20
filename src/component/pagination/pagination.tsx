import { CSSProperties, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import styles from './pagination.module.css';
import { Select1 } from "../select1/select1";
import { Text } from "../text/text";
import { TextField, TextFieldRef } from "../text-field/text-field";
import { Winicon } from "../wini-icon/winicon";
import { useTranslation } from "react-i18next";
import { Popup } from "../popup/popup";

interface Props {
    id?: string,
    currentPage: number,
    itemPerPage: number,
    totalItem?: number,
    onChangePage?: Function,
    hideGoToPage?: boolean,
    hidePageSize?: boolean,
    style?: CSSProperties,
    className?: string
}

export function Pagination({ itemPerPage = 10, ...props }: Props) {
    const goToPageRef = useRef<TextFieldRef>(null)
    const { t } = useTranslation()
    const popupRef = useRef<any>(null)

    useEffect(() => {
        if (goToPageRef.current) {
            const _inputPage = goToPageRef.current.inputElement
            if (_inputPage) _inputPage.value = props.currentPage.toString()
        }
    }, [props.currentPage])

    if (props.currentPage > 1 && (!props.totalItem || (Math.floor(props.totalItem / itemPerPage) + (props.totalItem % itemPerPage === 0 ? 0 : 1)) < props.currentPage)) {
        props.onChangePage?.(1, itemPerPage);
        return <div></div>;
    } else if (props.totalItem) {
        return <div id={props.id} className={`${styles['custom-pagination']} row ${props.className ?? ""}`} style={props.style}>
            {!props.hidePageSize && <div className="row" style={{ gap: '0.8rem' }}>
                <Popup ref={popupRef} />
                <Select1
                    value={itemPerPage}
                    options={[10, 20, 50, 100, 200].map((item, _) => { return { id: item, name: `${item}` } })}
                    className="body-3 size24"
                    style={{ width: '6.8rem' }}
                    suffix={<Winicon src={"fill/arrows/down-arrow"} size={12} />}
                    onChange={(ev: any) => {
                        props.onChangePage?.(props.currentPage, isNaN(parseInt(ev.id)) ? itemPerPage : parseInt(ev.id));
                    }}
                />
                <Text className="body-3">{t("ofItems", { totalItem: props.totalItem })}</Text>
            </div>}
            <div style={{ flex: 1 }} />
            <ReactPaginate
                onPageChange={(ev) => {
                    props.onChangePage?.(ev.selected + 1, itemPerPage);
                }}
                forcePage={props.currentPage - 1}
                breakClassName="row button-text-3"
                breakLabel="..."
                pageCount={Math.ceil(props.totalItem / itemPerPage)}
                previousClassName="row"
                previousLabel={<Winicon src={"fill/arrows/left-arrow"} size={"1.4rem"} />}
                nextClassName="row"
                nextLabel={<Winicon src={"fill/arrows/right-arrow"} size={"1.4rem"} />}
                containerClassName={`${styles['pagination']} row`}
                pageClassName="row button-text-3"
                activeClassName={styles['active']}
                hrefBuilder={(pageIndex: number) =>
                    pageIndex >= 1 && pageIndex <= Math.ceil(props.totalItem! / itemPerPage) ? `/page/${pageIndex}` : '#'
                }
                renderOnZeroPageCount={null}
            />
            {!props.hideGoToPage && <>
                <div style={{ height: '1.6rem', backgroundColor: "var(--neutral-bolder-border-color, light-dark(#D7D7DB, #494950))", width: 1 }} />
                <Text className="label-3">{t("go")} {t("page").toLowerCase()}</Text>
                <TextField
                    ref={goToPageRef as any}
                    style={{ width: '4.8rem', textAlign: "center" }}
                    className="body-3 size24"
                    type="number"
                    onBlur={(ev) => {
                        const _tmp = ev.target.value.trim().length ? parseInt(ev.target.value.trim()) : undefined
                        if (_tmp && !isNaN(_tmp) && _tmp > 0 && _tmp <= Math.ceil(props.totalItem! / itemPerPage)) {
                            props.onChangePage?.(_tmp, itemPerPage)
                        } else ev.target.value = ""
                    }}
                />
            </>}
        </div>
    } else return <div id={props.id} style={props.style} className={props.className} />
}