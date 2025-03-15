import { CSSProperties, ReactNode } from 'react';
import { Text } from "./text/text";

export function EmptyPage(props: { title?: string, subtitle?: string, style?: CSSProperties, className?: string, button?: ReactNode, imgStyle?: CSSProperties, imgUrl?: string }) {
    return <div className={`col ${props.className ?? ''}`} style={{ alignItems: "center", ...(props.style ?? {}) }}>
        <img
            alt=""
            src={props.imgUrl ?? "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/error-file.png"}
            style={{ aspectRatio: "1/1", width: "100%", maxWidth: "35rem", ...(props.imgStyle ?? {}) }}
        />
        <Text className="highlight-6" style={{ textAlign: "center", marginTop: "1.6rem" }}>{props.title}</Text>
        <Text className="subtitle-2" style={{ textAlign: "center", marginTop: 4 }}>{props.subtitle}</Text>
        {props.button}
    </div>
}