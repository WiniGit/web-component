import { CSSProperties, ReactNode, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { CustomHTMLProps, RenderLayerElement } from "../page/pageById"
import { SettingDataController } from "../../controller/data"

interface ViewByIdProps {
    id: string,
    style?: CSSProperties,
    className?: string,
    data?: { [p: string]: any },
    propsData?: { [p: string]: CustomHTMLProps },
    childrenData?: { [p: string]: ReactNode },
    itemData?: { [p: string]: ReactNode },
}

export const ViewById = (props: ViewByIdProps) => {
    const methods = useForm({ shouldFocusError: false })
    const [viewItem, setViewItem] = useState<{ [p: string]: any }>()
    const layers = useMemo(() => viewItem?.Props ?? [], [viewItem])

    useEffect(() => {
        if (props.id) {
            const controller = new SettingDataController("view")
            controller.getByIds([props.id]).then(async (res) => {
                if (res.code === 200 && res.data[0]) {
                    let _viewItem = res.data[0]
                    if (_viewItem.Props && typeof _viewItem.Props === "string") _viewItem.Props = JSON.parse(_viewItem.Props)
                    setViewItem(_viewItem)
                }
            })
        }
    }, [props.id])

    return viewItem ? layers.filter((e: any) => !e.ParentId).map((e: any) => {
        return <RenderLayerElement
            key={e.Id}
            item={e}
            list={layers}
            style={props.style}
            className={props.className}
            type={"view"}
            methods={methods}
            indexItem={props.data}
            propsData={props.propsData}
            childrenData={props.childrenData}
            itemData={props.itemData}
        />
    }) : null
}