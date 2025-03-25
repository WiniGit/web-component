import { CSSProperties, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { RenderLayerElement } from "../page/pageById"
import { SettingDataController } from "../../controller/data"

interface ViewByIdProps {
    id: string,
    style?: CSSProperties,
    className?: string,
    data?: { [p: string]: any }
}

export const ViewById = (props: ViewByIdProps) => {
    const methods = useForm({ shouldFocusError: false })
    const [viewItem, setViewItem] = useState<{ [p: string]: any }>()
    const layers = useMemo(() => viewItem?.Props ?? [], [viewItem])

    useEffect(() => {
        if (props.id) {
            const controller = new SettingDataController("view" as any)
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
        />
    }) : null
}