import { CSSProperties, ReactNode } from 'react';
import { Text } from "./text/text";

export function EmptyPage(props: { title?: string, subtitle?: string, style?: CSSProperties, className?: string, button?: ReactNode, imgStyle?: CSSProperties, imgUrl?: string }) {
    return <div className={`col ${props.className ?? ''}`} style={{ alignItems: "center", ...(props.style ?? {}) }}>
        <img alt="" src={props.imgUrl ?? "https://redis.ktxgroup.com.vn/api/file/img/ad2c5c0164594e5fb20c5076e7bc6c71"} style={{ aspectRatio: "1/1", width: "100%", maxWidth: "35rem", ...(props.imgStyle ?? {}) }} />
        <Text className="highlight-6" style={{ textAlign: "center" }}>{props.title}</Text>
        <Text className="subtitle-2" style={{ textAlign: "center", marginTop: 4 }}>{props.subtitle}</Text>
        {props.button}
    </div>
}