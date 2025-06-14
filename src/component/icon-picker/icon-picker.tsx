import { CSSProperties, useEffect, useRef, useState } from "react"
import { IconLibrary } from "./iconLibrary";
import { Winicon } from "../wini-icon/winicon";

interface IconPickerProps {
    src?: string;
    style?: CSSProperties;
    onChange?: (src?: string) => void;
}

export const IconPicker = (props: IconPickerProps) => {
    const offsetRef = useRef<{ [p: string]: any }>(null)
    const [value, setValue] = useState<string | undefined>()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setValue(props.src)
    }, [props.src])

    const onOpenIconLib = (ev: any) => {
        if (isOpen) return null;
        const rect = ev.target.closest("div").getBoundingClientRect()
        let offset: any = {}
        if (rect.bottom + 240 >= document.body.offsetHeight) offset.bottom = `calc(100dvh - ${rect.y}px + 2px)`
        else offset.top = rect.bottom + 2
        offsetRef.current = offset
        setIsOpen(true)
    }

    return <>
        <Winicon src={(value ?? "outline/user interface/setup-tools") as any} onClick={onOpenIconLib} />
        {isOpen && <IconLibrary
            onSelect={(src) => {
                setValue(`${src.type}/${src.category}/${src.name}`)
                setIsOpen(false)
            }}
            style={{ position: "fixed", zIndex: 2, ...offsetRef.current }}
            onClose={() => { setIsOpen(false) }}
        />}
    </>
}