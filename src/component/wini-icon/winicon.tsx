import ReactDOM from "react-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from './winicon.module.css'
import { CSSProperties } from "react";
import { Text } from "../text/text";

interface WiniconProps {
    src?: WiniIconName,
    link?: string,
    id?: string,
    className?: string,
    style?: CSSProperties,
    size?: number | string,
    color?: string,
    alt?: string,
    tooltip?: { message: string, position?: "top" | "bottom" | "left" | "right" },
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function Winicon({ id, src, link, className, style, size, color, alt, onClick, tooltip }: WiniconProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [svgData, setSvgData] = useState<string>()
    const [showTooltip, setShowTooltip] = useState<boolean>(false)
    const cdnSrc = "https://cdn.jsdelivr.net/gh/WiniGit/icon-library@latest/"
    const extendAttribute = useMemo(() => {
        if (tooltip) return {
            "tooltip-value": tooltip,
            onMouseOver: () => { setShowTooltip(true) },
            onMouseOut: () => { setShowTooltip(false) }
        }
        return {}
    }, [tooltip])

    const cacheImage = async (url: string) => {
        const cacheName = url.replace(cdnSrc, "");
        const cache = await caches.open(cacheName);

        // Check if the image is already cached
        const cachedResponse = await cache.match(url);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Fetch and cache the image
        const response = await fetch(url);
        if (response.ok) {
            await cache.put(url, response.clone());
        }

        return response;
    }

    useEffect(() => {
        if (src) {
            cacheImage(cdnSrc + src + ".svg").then(async (res) => { setSvgData(await res.text()) }).catch(() => { setSvgData(alt ?? "error") })
        } else if (link) {
            fetch(link).then(async (res) => { setSvgData(await res.text()) }).catch(() => { setSvgData(alt ?? "error") })
        }
    }, [src, link])

    return <>
        <div
            ref={ref}
            id={id}
            onClick={onClick}
            className={`${styles['wini-icon']} ${svgData ? "" : "skeleton-loading"} ${onClick ? styles['clickable'] : ''} ${className ?? ''} ${src ? src.split("/").map((e, i) => i === 0 ? `${e}-icon` : e.replace(" ", "-")).join(" ") : ''}${link ? ' link-icon' : ""}`}
            style={(style ? { ...style, '--size': size, '--color': color } : { '--size': size, '--color': color }) as any} dangerouslySetInnerHTML={{ __html: svgData ?? '' }}
            {...extendAttribute}
        />
        {tooltip && showTooltip && ReactDOM.createPortal(showTooltipElement({ element: ref.current, tooltip: tooltip }), document.body)}
    </>
}

export const showTooltipElement = ({ element, tooltip }: { element: any, tooltip: { message: string, position?: "top" | "bottom" | "left" | "right" } }) => {
    if (!element) return null
    const rect = element.getBoundingClientRect()
    let pos = tooltip.position ?? "bottom"
    if (document.body.offsetHeight - rect.bottom < 100 && pos === "bottom") pos = "top"
    else if (rect.top < 100 && pos === "top") pos = "bottom"
    if (document.body.offsetWidth - rect.right < 100 && pos === "right") pos = "left"
    else if (rect.left < 100 && pos === "left") pos = "right"
    switch (pos) {
        case "top":
            return <div ref={r => {
                if (r) {
                    const _r = r.getBoundingClientRect()
                    if (_r.x < 0) {
                        r.style.left = (rect.x + rect.width / 2) + "px"
                        r.style.transform = "translateX(-1.8rem)"
                        r.style.alignItems = "start"
                    } else if (_r.right > document.body.offsetWidth) {
                        r.style.left = "unset"
                        r.style.right = (document.body.offsetWidth - rect.right - rect.width / 2) + "px"
                        r.style.transform = "translateX(-1.4rem)"
                        r.style.alignItems = "end"
                    }
                }
            }} className={`col ${styles['tooltip-container']}`} style={{ alignItems: "center", bottom: document.body.offsetHeight - rect.top - 4, left: rect.left + (rect.width / 2), transform: "translateX(-50%)" }}>
                <Text className={`body-3 ${styles['tooltip-message']}`} maxLine={2}>{tooltip.message}</Text>
                <div className="row" style={{ padding: "0 1.2rem", transform: "translateY(-0.2rem)" }}><div style={{ borderLeft: "0.6rem solid transparent", borderRight: "0.6rem solid transparent", borderTop: "0.8rem solid var(--neutral-main-reverse-background-color)", borderRadius: 2 }} /></div>
            </div>
        case "bottom":
            return <div ref={r => {
                if (r) {
                    const _r = r.getBoundingClientRect()
                    if (_r.x < 0) {
                        r.style.left = (rect.x + rect.width / 2) + "px"
                        r.style.transform = "translateX(-1.8rem)"
                        r.style.alignItems = "start"
                    } else if (_r.right > document.body.offsetWidth) {
                        r.style.left = "unset"
                        r.style.right = (document.body.offsetWidth - rect.right - rect.width / 2) + "px"
                        r.style.transform = "translateX(-1.4rem)"
                        r.style.alignItems = "end"
                    }
                }
            }} className={`col ${styles['tooltip-container']}`} style={{ alignItems: "center", top: rect.bottom + 4, left: rect.left + (rect.width / 2), transform: "translateX(-50%)" }}>
                <div className="row" style={{ padding: "0 1.2rem", transform: "translateY(0.2rem)" }}><div style={{ borderLeft: "0.6rem solid transparent", borderRight: "0.6rem solid transparent", borderBottom: "0.8rem solid var(--neutral-main-reverse-background-color)", borderRadius: 2 }} /></div>
                <Text className={`body-3 ${styles['tooltip-message']}`} maxLine={2}>{tooltip.message}</Text>
            </div >
        case "left":
            return <div ref={r => {
                if (r) {
                    const _r = r.getBoundingClientRect()
                    if (_r.y < 0) {
                        r.style.top = (rect.y + rect.height / 2) + "px"
                        r.style.transform = "translateY(-1.8rem)"
                        r.style.alignItems = "start"
                    } else if (_r.bottom > document.body.offsetHeight) {
                        r.style.top = "unset"
                        r.style.bottom = (document.body.offsetHeight - rect.bottom - rect.height / 2) + "px"
                        r.style.transform = "translateY(-1.4rem)"
                        r.style.alignItems = "end"
                    }
                }
            }} className={`row ${styles['tooltip-container']}`} style={{ top: rect.top + (rect.height / 2), right: document.body.offsetWidth - rect.left - 4, transform: "translateY(-50%)" }}>
                <Text className={`body-3 ${styles['tooltip-message']}`} maxLine={2}>{tooltip.message}</Text>
                <div className="row" style={{ padding: "1.2rem 0", transform: "translateX(-0.2rem)" }}><div style={{ borderTop: "0.6rem solid transparent", borderBottom: "0.6rem solid transparent", borderLeft: "0.8rem solid var(--neutral-main-reverse-background-color)", borderRadius: 2 }} /></div>
            </div>
        case "right":
            return <div ref={r => {
                if (r) {
                    const _r = r.getBoundingClientRect()
                    if (_r.y < 0) {
                        r.style.top = (rect.y + rect.height / 2) + "px"
                        r.style.transform = "translateY(-1.8rem)"
                        r.style.alignItems = "start"
                    } else if (_r.bottom > document.body.offsetHeight) {
                        r.style.top = "unset"
                        r.style.bottom = (document.body.offsetHeight - rect.bottom - rect.height / 2) + "px"
                        r.style.transform = "translateY(-1.4rem)"
                        r.style.alignItems = "end"
                    }
                }
            }} className={`row ${styles['tooltip-container']}`} style={{ top: rect.top + (rect.height / 2), left: rect.right + 4, transform: "translateY(-50%)" }}>
                <div className="row" style={{ padding: "1.2rem 0", transform: "translateX(0.2rem)" }}><div style={{ borderTop: "0.6rem solid transparent", borderBottom: "0.6rem solid transparent", borderRight: "0.8rem solid var(--neutral-main-reverse-background-color)", borderRadius: 2 }} /></div>
                <Text className={`body-3 ${styles['tooltip-message']}`} maxLine={2}>{tooltip.message}</Text>
            </div>
        default:
            return <div />
    }
}

export type WiniIconName = "color/accessibility/accessibility-lift" |
    "color/accessibility/accessibility" |
    "color/accessibility/adaptive-bike" |
    "color/accessibility/audio-description" |
    "color/accessibility/b-eye" |
    "color/accessibility/blindness" |
    "color/accessibility/braille" |
    "color/accessibility/closed-captioning" |
    "color/accessibility/deaf" |
    "color/accessibility/dog-leash" |
    "color/accessibility/edit-color" |
    "color/accessibility/escalator" |
    "color/accessibility/hide" |
    "color/accessibility/lift" |
    "color/accessibility/low-vision" |
    "color/accessibility/screen-reader" |
    "color/accessibility/sign-language" |
    "color/accessibility/text-size" |
    "color/accessibility/tty" |
    "color/accessibility/walking-aid" |
    "color/accessibility/walking-support" |
    "color/accessibility/wheelchair-2" |
    "color/accessibility/wheelchair-ramp" |
    "fill/accessibility/accessibility-lift" |
    "fill/accessibility/accessibility" |
    "fill/accessibility/adaptive-bike" |
    "fill/accessibility/audio-description" |
    "fill/accessibility/b-eye" |
    "fill/accessibility/blindness" |
    "fill/accessibility/braille" |
    "fill/accessibility/closed-captioning" |
    "fill/accessibility/deaf" |
    "fill/accessibility/dog-leash" |
    "fill/accessibility/edit-color" |
    "fill/accessibility/escalator" |
    "fill/accessibility/hide" |
    "fill/accessibility/lift" |
    "fill/accessibility/low-vision" |
    "fill/accessibility/screen-reader" |
    "fill/accessibility/text-size" |
    "fill/accessibility/tty" |
    "fill/accessibility/walking-aid" |
    "fill/accessibility/walking-support" |
    "fill/accessibility/wheelchair-2" |
    "fill/accessibility/wheelchair" |
    "fill/accessibility/wheelchair-ramp" |
    "outline/accessibility/accessibility-lift" |
    "outline/accessibility/accessibility" |
    "outline/accessibility/adaptive-bike" |
    "outline/accessibility/audio-description" |
    "outline/accessibility/b-eye" |
    "outline/accessibility/blindness" |
    "outline/accessibility/braille" |
    "outline/accessibility/closed-captioning" |
    "outline/accessibility/deaf" |
    "outline/accessibility/dog-leash" |
    "outline/accessibility/edit-color" |
    "outline/accessibility/escalator" |
    "outline/accessibility/hide" |
    "outline/accessibility/lift" |
    "outline/accessibility/low-vision" |
    "outline/accessibility/screen-reader" |
    "outline/accessibility/text-size" |
    "outline/accessibility/tty" |
    "outline/accessibility/walking-aid" |
    "outline/accessibility/walking-support" |
    "outline/accessibility/wheelchair-2" |
    "outline/accessibility/wheelchair" |
    "outline/accessibility/wheelchair-ramp" |
    "color/animals/bamboo" |
    "color/animals/bat" |
    "color/animals/bear-2" |
    "color/animals/bear" |
    "color/animals/bee" |
    "color/animals/bones" |
    "color/animals/border-collie" |
    "color/animals/botany" |
    "color/animals/bug" |
    "color/animals/butterfly" |
    "color/animals/cactus" |
    "color/animals/cat" |
    "color/animals/chicken-2" |
    "color/animals/chicken-front" |
    "color/animals/clover" |
    "color/animals/collar" |
    "color/animals/cow" |
    "color/animals/crab" |
    "color/animals/deer" |
    "color/animals/dog-house" |
    "color/animals/dog-leash" |
    "color/animals/dog" |
    "color/animals/drop" |
    "color/animals/duck" |
    "color/animals/earth-science" |
    "color/animals/ecology" |
    "color/animals/elephant" |
    "color/animals/fire" |
    "color/animals/fish" |
    "color/animals/fishbone" |
    "color/animals/flame" |
    "color/animals/flower-07" |
    "color/animals/flower-2" |
    "color/animals/flower-rose" |
    "color/animals/flower" |
    "color/animals/food-dog" |
    "color/animals/forest" |
    "color/animals/goose" |
    "color/animals/grain" |
    "color/animals/horse-2" |
    "color/animals/horse" |
    "color/animals/horseshoe" |
    "color/animals/jellyfish" |
    "color/animals/ladybug" |
    "color/animals/land" |
    "color/animals/leaf-36" |
    "color/animals/leaf-38" |
    "color/animals/leaf" |
    "color/animals/lobster" |
    "color/animals/lotus-flower" |
    "color/animals/macro" |
    "color/animals/maple-leaf" |
    "color/animals/mountain" |
    "color/animals/mower" |
    "color/animals/mushroom" |
    "color/animals/octopus" |
    "color/animals/organic-2" |
    "color/animals/organic" |
    "color/animals/owl" |
    "color/animals/palm-tree" |
    "color/animals/panda" |
    "color/animals/park" |
    "color/animals/parrot" |
    "color/animals/paw" |
    "color/animals/penguin" |
    "color/animals/pet-food" |
    "color/animals/pickaxe" |
    "color/animals/pig-2" |
    "color/animals/plant-leaf" |
    "color/animals/plant-soil" |
    "color/animals/plant-vase" |
    "color/animals/rabbit" |
    "color/animals/rat-head" |
    "color/animals/rat" |
    "color/animals/shark-2" |
    "color/animals/shark" |
    "color/animals/sheep" |
    "color/animals/shell" |
    "color/animals/shovel" |
    "color/animals/shrimp" |
    "color/animals/sloth" |
    "color/animals/snake" |
    "color/animals/spider" |
    "color/animals/teddy-bear" |
    "color/animals/tree-01" |
    "color/animals/tree-03" |
    "color/animals/tree-2" |
    "color/animals/turkey-head" |
    "color/animals/turtle" |
    "color/animals/water-surface" |
    "color/animals/water-wave" |
    "color/animals/watering-plants" |
    "color/animals/weed" |
    "color/animals/windmill-2" |
    "color/animals/wolf" |
    "color/animals/wood" |
    "color/animals/wool-ball" |
    "fill/animals/bamboo" |
    "fill/animals/bat" |
    "fill/animals/bear-2" |
    "fill/animals/bear" |
    "fill/animals/bee" |
    "fill/animals/bones" |
    "fill/animals/border-collie" |
    "fill/animals/botany" |
    "fill/animals/bug" |
    "fill/animals/butterfly" |
    "fill/animals/cactus" |
    "fill/animals/cat" |
    "fill/animals/chicken-2" |
    "fill/animals/chicken-front" |
    "fill/animals/clover" |
    "fill/animals/collar" |
    "fill/animals/cow" |
    "fill/animals/crab" |
    "fill/animals/deer" |
    "fill/animals/dog" |
    "fill/animals/dog-house" |
    "fill/animals/dog-leash" |
    "fill/animals/drop" |
    "fill/animals/duck" |
    "fill/animals/earth-science" |
    "fill/animals/ecology" |
    "fill/animals/elephant" |
    "fill/animals/fire" |
    "fill/animals/fish" |
    "fill/animals/fishbone" |
    "fill/animals/flame" |
    "fill/animals/flower-07" |
    "fill/animals/flower-2" |
    "fill/animals/flower" |
    "fill/animals/flower-rose" |
    "fill/animals/food-dog" |
    "fill/animals/forest" |
    "fill/animals/goose" |
    "fill/animals/grain" |
    "fill/animals/horse" |
    "fill/animals/horse-2" |
    "fill/animals/horseshoe" |
    "fill/animals/jellyfish" |
    "fill/animals/ladybug" |
    "fill/animals/land" |
    "fill/animals/leaf" |
    "fill/animals/leaf-36" |
    "fill/animals/leaf-38" |
    "fill/animals/lobster" |
    "fill/animals/lotus-flower" |
    "fill/animals/macro" |
    "fill/animals/maple-leaf" |
    "fill/animals/mountain" |
    "fill/animals/mower" |
    "fill/animals/mushroom" |
    "fill/animals/octopus" |
    "fill/animals/organic-2" |
    "fill/animals/organic" |
    "fill/animals/owl" |
    "fill/animals/palm-tree" |
    "fill/animals/panda" |
    "fill/animals/park" |
    "fill/animals/parrot" |
    "fill/animals/paw" |
    "fill/animals/penguin" |
    "fill/animals/pet-food" |
    "fill/animals/pickaxe" |
    "fill/animals/pig-2" |
    "fill/animals/plant-leaf" |
    "fill/animals/plant-soil" |
    "fill/animals/plant-vase" |
    "fill/animals/rabbit" |
    "fill/animals/rat-head" |
    "fill/animals/rat" |
    "fill/animals/shark-2" |
    "fill/animals/shark" |
    "fill/animals/sheep" |
    "fill/animals/shell" |
    "fill/animals/shovel" |
    "fill/animals/shrimp" |
    "fill/animals/sloth" |
    "fill/animals/snake" |
    "fill/animals/spider" |
    "fill/animals/teddy-bear" |
    "fill/animals/tree-01" |
    "fill/animals/tree-03" |
    "fill/animals/tree-2" |
    "fill/animals/turkey-head" |
    "fill/animals/turtle" |
    "fill/animals/water-surface" |
    "fill/animals/water-wave" |
    "fill/animals/watering-plants" |
    "fill/animals/weed" |
    "fill/animals/windmill-2" |
    "fill/animals/wolf" |
    "fill/animals/wood" |
    "fill/animals/wool-ball" |
    "outline/animals/bamboo" |
    "outline/animals/bat" |
    "outline/animals/bear-2" |
    "outline/animals/bear" |
    "outline/animals/bee" |
    "outline/animals/bones" |
    "outline/animals/border-collie" |
    "outline/animals/botany" |
    "outline/animals/bug" |
    "outline/animals/butterfly" |
    "outline/animals/cactus" |
    "outline/animals/cat" |
    "outline/animals/chicken-2" |
    "outline/animals/chicken-front" |
    "outline/animals/clover" |
    "outline/animals/collar" |
    "outline/animals/cow" |
    "outline/animals/crab" |
    "outline/animals/deer" |
    "outline/animals/dog" |
    "outline/animals/dog-house" |
    "outline/animals/dog-leash" |
    "outline/animals/drop" |
    "outline/animals/duck" |
    "outline/animals/earth-science" |
    "outline/animals/ecology" |
    "outline/animals/elephant" |
    "outline/animals/fire" |
    "outline/animals/fish" |
    "outline/animals/fishbone" |
    "outline/animals/flame" |
    "outline/animals/flower" |
    "outline/animals/flower-07" |
    "outline/animals/flower-2" |
    "outline/animals/flower-rose" |
    "outline/animals/food-dog" |
    "outline/animals/forest" |
    "outline/animals/goose" |
    "outline/animals/grain" |
    "outline/animals/horse-2" |
    "outline/animals/horse" |
    "outline/animals/horseshoe" |
    "outline/animals/jellyfish" |
    "outline/animals/ladybug" |
    "outline/animals/land" |
    "outline/animals/leaf-36" |
    "outline/animals/leaf" |
    "outline/animals/leaf-38" |
    "outline/animals/lobster" |
    "outline/animals/lotus-flower" |
    "outline/animals/macro" |
    "outline/animals/maple-leaf" |
    "outline/animals/mountain" |
    "outline/animals/mower" |
    "outline/animals/mushroom" |
    "outline/animals/octopus" |
    "outline/animals/organic-2" |
    "outline/animals/organic" |
    "outline/animals/owl" |
    "outline/animals/palm-tree" |
    "outline/animals/panda" |
    "outline/animals/park" |
    "outline/animals/parrot" |
    "outline/animals/paw" |
    "outline/animals/penguin" |
    "outline/animals/pet-food" |
    "outline/animals/pickaxe" |
    "outline/animals/pig-2" |
    "outline/animals/plant-leaf" |
    "outline/animals/plant-soil" |
    "outline/animals/plant-vase" |
    "outline/animals/rabbit" |
    "outline/animals/rat-head" |
    "outline/animals/rat" |
    "outline/animals/shark-2" |
    "outline/animals/shark" |
    "outline/animals/sheep" |
    "outline/animals/shell" |
    "outline/animals/shovel" |
    "outline/animals/shrimp" |
    "outline/animals/sloth" |
    "outline/animals/snake" |
    "outline/animals/spider" |
    "outline/animals/teddy-bear" |
    "outline/animals/tree-01" |
    "outline/animals/tree-03" |
    "outline/animals/tree-2" |
    "outline/animals/turkey-head" |
    "outline/animals/turtle" |
    "outline/animals/water-surface" |
    "outline/animals/water-wave" |
    "outline/animals/watering-plants" |
    "outline/animals/weed" |
    "outline/animals/windmill-2" |
    "outline/animals/wolf" |
    "outline/animals/wood" |
    "outline/animals/wool-ball" |
    "color/arrows/all-directions" |
    "color/arrows/alpha-order" |
    "color/arrows/arrow-bottom-left" |
    "color/arrows/arrow-bottom-right" |
    "color/arrows/arrow-down-2" |
    "color/arrows/arrow-down-3" |
    "color/arrows/arrow-down" |
    "color/arrows/arrow-e" |
    "color/arrows/arrow-left-2" |
    "color/arrows/arrow-left-3" |
    "color/arrows/arrow-left" |
    "color/arrows/arrow-n" |
    "color/arrows/arrow-right-2" |
    "color/arrows/arrow-right-3" |
    "color/arrows/arrow-right" |
    "color/arrows/arrow-s" |
    "color/arrows/arrow-sm-down" |
    "color/arrows/arrow-sm-left" |
    "color/arrows/arrow-sm-right" |
    "color/arrows/arrow-tool" |
    "color/arrows/arrow-top-left" |
    "color/arrows/arrow-top-right" |
    "color/arrows/arrow-up-2" |
    "color/arrows/arrow-up-3" |
    "color/arrows/arrow-up" |
    "color/arrows/arrow-w" |
    "color/arrows/arrows-expand-2" |
    "color/arrows/arrows-expand" |
    "color/arrows/arrows-fullscreen-2" |
    "color/arrows/arrows-fullscreen" |
    "color/arrows/arrows-maximize-2" |
    "color/arrows/arrows-maximize" |
    "color/arrows/arrows-opposite-directions" |
    "color/arrows/arrows-same-direction" |
    "color/arrows/back-arrow" |
    "color/arrows/backward" |
    "color/arrows/block-down" |
    "color/arrows/block-left" |
    "color/arrows/block-right" |
    "color/arrows/block-up" |
    "color/arrows/box-arrow-bottom-left" |
    "color/arrows/box-arrow-bottom-right" |
    "color/arrows/box-arrow-down" |
    "color/arrows/box-arrow-left" |
    "color/arrows/box-arrow-pointing-down" |
    "color/arrows/box-arrow-pointing-left" |
    "color/arrows/box-arrow-pointing-right" |
    "color/arrows/box-arrow-pointing-up" |
    "color/arrows/box-arrow-right" |
    "color/arrows/box-arrow-top-left" |
    "color/arrows/box-arrow-top-right" |
    "color/arrows/box-arrow-up" |
    "color/arrows/box-caret-down" |
    "color/arrows/box-caret-left" |
    "color/arrows/box-caret-right" |
    "color/arrows/box-caret-up" |
    "color/arrows/box-ctrl-down" |
    "color/arrows/box-ctrl-left" |
    "color/arrows/box-ctrl-right" |
    "color/arrows/box-ctrl-up" |
    "color/arrows/btn-enlarge" |
    "color/arrows/btn-expand" |
    "color/arrows/caret-sm-up" |
    "color/arrows/centralize" |
    "color/arrows/change-direction" |
    "color/arrows/circle-arrow-down" |
    "color/arrows/circle-arrow-left" |
    "color/arrows/circle-arrow-pointing-down" |
    "color/arrows/circle-arrow-pointing-left" |
    "color/arrows/circle-arrow-pointing-right" |
    "color/arrows/circle-arrow-pointing-up" |
    "color/arrows/circle-arrow-right" |
    "color/arrows/circle-arrow-up" |
    "color/arrows/circle-caret-down" |
    "color/arrows/circle-caret-left" |
    "color/arrows/circle-caret-right" |
    "color/arrows/circle-caret-up" |
    "color/arrows/circle-ctrl-down" |
    "color/arrows/circle-ctrl-left" |
    "color/arrows/circle-ctrl-right" |
    "color/arrows/circle-ctrl-up" |
    "color/arrows/circle-in" |
    "color/arrows/circle-out" |
    "color/arrows/circuit-round" |
    "color/arrows/circuit" |
    "color/arrows/cloud-data-download" |
    "color/arrows/cloud-data-sync" |
    "color/arrows/cloud-download" |
    "color/arrows/cloud-upload" |
    "color/arrows/compare" |
    "color/arrows/computer-upload" |
    "color/arrows/contrast" |
    "color/arrows/conversion" |
    "color/arrows/corner-bottom-left" |
    "color/arrows/corner-bottom-right" |
    "color/arrows/corner-down-round" |
    "color/arrows/corner-left-down" |
    "color/arrows/corner-left-round" |
    "color/arrows/corner-right-down" |
    "color/arrows/corner-right-round" |
    "color/arrows/corner-top-left" |
    "color/arrows/corner-top-right" |
    "color/arrows/corner-up-left" |
    "color/arrows/corner-up-right" |
    "color/arrows/corner-up-round" |
    "color/arrows/cross-down" |
    "color/arrows/cross-horizontal" |
    "color/arrows/cross-left" |
    "color/arrows/cross-right" |
    "color/arrows/cross-up" |
    "color/arrows/cross-vertical" |
    "color/arrows/cross" |
    "color/arrows/crossing-directions" |
    "color/arrows/ctrl-backward" |
    "color/arrows/ctrl-down" |
    "color/arrows/ctrl-forward" |
    "color/arrows/ctrl-left" |
    "color/arrows/ctrl-right" |
    "color/arrows/ctrl-up" |
    "color/arrows/curved-arrow-down" |
    "color/arrows/curved-arrow-left" |
    "color/arrows/curved-arrow-right" |
    "color/arrows/curved-circuit" |
    "color/arrows/cycle" |
    "color/arrows/data-download" |
    "color/arrows/data-upload" |
    "color/arrows/delete-key" |
    "color/arrows/delete-x" |
    "color/arrows/depth" |
    "color/arrows/direction-down" |
    "color/arrows/direction-e" |
    "color/arrows/direction-left" |
    "color/arrows/direction-n" |
    "color/arrows/direction-right" |
    "color/arrows/direction-s" |
    "color/arrows/direction-up" |
    "color/arrows/direction-w" |
    "color/arrows/direction" |
    "color/arrows/disperse" |
    "color/arrows/double-arrow-left" |
    "color/arrows/double-arrow-right" |
    "color/arrows/down-arrow" |
    "color/arrows/download-data" |
    "color/arrows/download-file" |
    "color/arrows/download" |
    "color/arrows/eject" |
    "color/arrows/enlarge-diagonal-2" |
    "color/arrows/enlarge-diagonal" |
    "color/arrows/enlarge-h" |
    "color/arrows/enlarge-horizontal" |
    "color/arrows/enlarge-vertical" |
    "color/arrows/enlarge" |
    "color/arrows/enter" |
    "color/arrows/exit-right" |
    "color/arrows/expand-2" |
    "color/arrows/expand-h" |
    "color/arrows/expand-window" |
    "color/arrows/expand" |
    "color/arrows/export" |
    "color/arrows/file-archive" |
    "color/arrows/file-download-3" |
    "color/arrows/file-download" |
    "color/arrows/file-export" |
    "color/arrows/file-import" |
    "color/arrows/file-upload-2" |
    "color/arrows/file-upload-3" |
    "color/arrows/file-upload" |
    "color/arrows/fit-horizontal" |
    "color/arrows/fit-vertical" |
    "color/arrows/fork-2" |
    "color/arrows/fork" |
    "color/arrows/format-left" |
    "color/arrows/format-right" |
    "color/arrows/forward" |
    "color/arrows/fullscreen-2" |
    "color/arrows/fullscreen" |
    "color/arrows/git-merge" |
    "color/arrows/height-2" |
    "color/arrows/high-priority" |
    "color/arrows/horizontal-divider" |
    "color/arrows/img-rotate-left" |
    "color/arrows/img-rotate-right" |
    "color/arrows/increase" |
    "color/arrows/infinite-loop" |
    "color/arrows/input" |
    "color/arrows/invert-direction" |
    "color/arrows/invert-process" |
    "color/arrows/launch-app" |
    "color/arrows/launch" |
    "color/arrows/leave" |
    "color/arrows/left-arrow" |
    "color/arrows/log-in" |
    "color/arrows/log-out" |
    "color/arrows/logout" |
    "color/arrows/loop-2" |
    "color/arrows/loop" |
    "color/arrows/low-priority" |
    "color/arrows/maximize-area" |
    "color/arrows/maximize" |
    "color/arrows/merge-2" |
    "color/arrows/merge" |
    "color/arrows/migration" |
    "color/arrows/money-transfer" |
    "color/arrows/move-2" |
    "color/arrows/move-3" |
    "color/arrows/move-down-2" |
    "color/arrows/move-down-right" |
    "color/arrows/move-down" |
    "color/arrows/move-layer-down" |
    "color/arrows/move-layer-left" |
    "color/arrows/move-layer-right" |
    "color/arrows/move-layer-up" |
    "color/arrows/move-left" |
    "color/arrows/move-right" |
    "color/arrows/move-up-2" |
    "color/arrows/move-up-left" |
    "color/arrows/move-up" |
    "color/arrows/move" |
    "color/arrows/nav-down" |
    "color/arrows/nav-left" |
    "color/arrows/nav-right" |
    "color/arrows/nav-up" |
    "color/arrows/open-in-browser" |
    "color/arrows/opposite-directions-2" |
    "color/arrows/opposite-directions" |
    "color/arrows/orientation" |
    "color/arrows/pointing-down" |
    "color/arrows/pointing-left" |
    "color/arrows/pointing-right" |
    "color/arrows/pointing-up" |
    "color/arrows/r-down-left-arrows" |
    "color/arrows/r-down-right-arrows" |
    "color/arrows/r-up-left-arrows" |
    "color/arrows/r-up-right-arrows" |
    "color/arrows/random" |
    "color/arrows/rate-down" |
    "color/arrows/rate-up" |
    "color/arrows/redo" |
    "color/arrows/refresh" |
    "color/arrows/refund" |
    "color/arrows/reload" |
    "color/arrows/repeat-cycle" |
    "color/arrows/repeat" |
    "color/arrows/replay" |
    "color/arrows/reply-all" |
    "color/arrows/reply-arrow" |
    "color/arrows/reply" |
    "color/arrows/resize-x" |
    "color/arrows/resize-y" |
    "color/arrows/respond-arrow" |
    "color/arrows/restore" |
    "color/arrows/right-arrow" |
    "color/arrows/rotate-left" |
    "color/arrows/rotate-right" |
    "color/arrows/screen-sharing-2" |
    "color/arrows/screen-sharing-off-2" |
    "color/arrows/separate-2" |
    "color/arrows/separate-branch" |
    "color/arrows/separate-directions" |
    "color/arrows/separate" |
    "color/arrows/share-2" |
    "color/arrows/share-3" |
    "color/arrows/share" |
    "color/arrows/sharing" |
    "color/arrows/shuffle-2" |
    "color/arrows/shuffle" |
    "color/arrows/sign-down" |
    "color/arrows/sign-left" |
    "color/arrows/sign-right" |
    "color/arrows/sign-up" |
    "color/arrows/slide-left" |
    "color/arrows/slide-right" |
    "color/arrows/social-sharing" |
    "color/arrows/split-branch" |
    "color/arrows/split" |
    "color/arrows/swap-horizontal" |
    "color/arrows/swap-vertical" |
    "color/arrows/system-update" |
    "color/arrows/three-way-direction" |
    "color/arrows/time-machine" |
    "color/arrows/traffic" |
    "color/arrows/transaction" |
    "color/arrows/trend-down" |
    "color/arrows/trend-up" |
    "color/arrows/triangle-down" |
    "color/arrows/triangle-left" |
    "color/arrows/triangle-line-down" |
    "color/arrows/triangle-line-left" |
    "color/arrows/triangle-line-right" |
    "color/arrows/triangle-line-up" |
    "color/arrows/triangle-right" |
    "color/arrows/triangle-sm-down" |
    "color/arrows/triangle-sm-left" |
    "color/arrows/triangle-sm-right" |
    "color/arrows/triangle-sm-up" |
    "color/arrows/triangle-up" |
    "color/arrows/turn-e" |
    "color/arrows/turn-n" |
    "color/arrows/turn-s" |
    "color/arrows/turn-w" |
    "color/arrows/two-way-direction" |
    "color/arrows/undo" |
    "color/arrows/unite-2" |
    "color/arrows/unite" |
    "color/arrows/up-arrow" |
    "color/arrows/upload-data" |
    "color/arrows/upload-file" |
    "color/arrows/upload" |
    "color/arrows/vertical-divider" |
    "color/arrows/width" |
    "color/arrows/window-maximize" |
    "color/arrows/window-minimize" |
    "fill/arrows/all-directions" |
    "fill/arrows/alpha-order" |
    "fill/arrows/arrow-bottom-left" |
    "fill/arrows/arrow-bottom-right" |
    "fill/arrows/arrow-down" |
    "fill/arrows/arrow-down-2" |
    "fill/arrows/arrow-down-3" |
    "fill/arrows/arrow-e" |
    "fill/arrows/arrow-left-2" |
    "fill/arrows/arrow-left" |
    "fill/arrows/arrow-left-3" |
    "fill/arrows/arrow-n" |
    "fill/arrows/arrow-right-2" |
    "fill/arrows/arrow-right-3" |
    "fill/arrows/arrow-right" |
    "fill/arrows/arrow-s" |
    "fill/arrows/arrow-sm-down" |
    "fill/arrows/arrow-sm-left" |
    "fill/arrows/arrow-sm-right" |
    "fill/arrows/arrow-tool" |
    "fill/arrows/arrow-top-left" |
    "fill/arrows/arrow-top-right" |
    "fill/arrows/arrow-up-2" |
    "fill/arrows/arrow-up" |
    "fill/arrows/arrow-up-3" |
    "fill/arrows/arrow-w" |
    "fill/arrows/arrows-expand-2" |
    "fill/arrows/arrows-expand" |
    "fill/arrows/arrows-fullscreen-2" |
    "fill/arrows/arrows-fullscreen" |
    "fill/arrows/arrows-maximize-2" |
    "fill/arrows/arrows-maximize" |
    "fill/arrows/arrows-opposite-directions" |
    "fill/arrows/arrows-same-direction" |
    "fill/arrows/back-arrow" |
    "fill/arrows/backward" |
    "fill/arrows/block-down" |
    "fill/arrows/block-left" |
    "fill/arrows/block-right" |
    "fill/arrows/block-up" |
    "fill/arrows/box-arrow-bottom-left" |
    "fill/arrows/box-arrow-bottom-right" |
    "fill/arrows/box-arrow-down" |
    "fill/arrows/box-arrow-left" |
    "fill/arrows/box-arrow-right" |
    "fill/arrows/box-arrow-top-left" |
    "fill/arrows/box-arrow-top-right" |
    "fill/arrows/box-arrow-up" |
    "fill/arrows/box-caret-down" |
    "fill/arrows/box-caret-left" |
    "fill/arrows/box-caret-right" |
    "fill/arrows/box-caret-up" |
    "fill/arrows/box-ctrl-down" |
    "fill/arrows/box-ctrl-left" |
    "fill/arrows/box-ctrl-right" |
    "fill/arrows/box-ctrl-up" |
    "fill/arrows/caret-sm-up" |
    "fill/arrows/centralize" |
    "fill/arrows/change-direction" |
    "fill/arrows/circle-arrow-down" |
    "fill/arrows/circle-arrow-left" |
    "fill/arrows/circle-arrow-right" |
    "fill/arrows/circle-arrow-up" |
    "fill/arrows/circle-caret-down" |
    "fill/arrows/circle-caret-left" |
    "fill/arrows/circle-caret-right" |
    "fill/arrows/circle-caret-up" |
    "fill/arrows/circle-ctrl-down" |
    "fill/arrows/circle-ctrl-left" |
    "fill/arrows/circle-ctrl-right" |
    "fill/arrows/circle-ctrl-up" |
    "fill/arrows/circle-in" |
    "fill/arrows/circle-out" |
    "fill/arrows/circuit" |
    "fill/arrows/circuit-round" |
    "fill/arrows/cloud-data-download" |
    "fill/arrows/cloud-download" |
    "fill/arrows/cloud-upload" |
    "fill/arrows/compare" |
    "fill/arrows/computer-upload" |
    "fill/arrows/contrast" |
    "fill/arrows/conversion" |
    "fill/arrows/corner-bottom-left" |
    "fill/arrows/corner-bottom-right" |
    "fill/arrows/corner-down-round" |
    "fill/arrows/corner-left-down" |
    "fill/arrows/corner-left-round" |
    "fill/arrows/corner-right-down" |
    "fill/arrows/corner-right-round" |
    "fill/arrows/corner-top-left" |
    "fill/arrows/corner-top-right" |
    "fill/arrows/corner-up-left" |
    "fill/arrows/corner-up-right" |
    "fill/arrows/corner-up-round" |
    "fill/arrows/cross-down" |
    "fill/arrows/cross" |
    "fill/arrows/cross-horizontal" |
    "fill/arrows/cross-left" |
    "fill/arrows/cross-right" |
    "fill/arrows/cross-up" |
    "fill/arrows/cross-vertical" |
    "fill/arrows/crossing-directions" |
    "fill/arrows/ctrl-backward" |
    "fill/arrows/ctrl-down" |
    "fill/arrows/ctrl-forward" |
    "fill/arrows/ctrl-left" |
    "fill/arrows/ctrl-right" |
    "fill/arrows/ctrl-up" |
    "fill/arrows/curved-arrow-down" |
    "fill/arrows/curved-arrow-left" |
    "fill/arrows/curved-arrow-right" |
    "fill/arrows/curved-circuit" |
    "fill/arrows/cycle" |
    "fill/arrows/data-download" |
    "fill/arrows/data-upload" |
    "fill/arrows/delete-key" |
    "fill/arrows/delete-x" |
    "fill/arrows/depth" |
    "fill/arrows/direction-down" |
    "fill/arrows/direction-left" |
    "fill/arrows/direction-right" |
    "fill/arrows/direction-up" |
    "fill/arrows/direction" |
    "fill/arrows/disperse" |
    "fill/arrows/double-arrow-left" |
    "fill/arrows/double-arrow-right" |
    "fill/arrows/down-arrow" |
    "fill/arrows/download" |
    "fill/arrows/download-data" |
    "fill/arrows/download-file" |
    "fill/arrows/eject" |
    "fill/arrows/enlarge" |
    "fill/arrows/enlarge-diagonal-2" |
    "fill/arrows/enlarge-diagonal" |
    "fill/arrows/enlarge-h" |
    "fill/arrows/enlarge-horizontal" |
    "fill/arrows/enlarge-vertical" |
    "fill/arrows/enter" |
    "fill/arrows/exit-right" |
    "fill/arrows/expand" |
    "fill/arrows/expand-2" |
    "fill/arrows/expand-h" |
    "fill/arrows/expand-window" |
    "fill/arrows/export" |
    "fill/arrows/file-archive" |
    "fill/arrows/file-download-3" |
    "fill/arrows/file-download" |
    "fill/arrows/file-export" |
    "fill/arrows/file-import" |
    "fill/arrows/file-upload" |
    "fill/arrows/file-upload-2" |
    "fill/arrows/file-upload-3" |
    "fill/arrows/fit-horizontal" |
    "fill/arrows/fit-vertical" |
    "fill/arrows/fork-2" |
    "fill/arrows/fork" |
    "fill/arrows/format-left" |
    "fill/arrows/format-right" |
    "fill/arrows/forward" |
    "fill/arrows/fullscreen" |
    "fill/arrows/fullscreen-2" |
    "fill/arrows/git-merge" |
    "fill/arrows/height-2" |
    "fill/arrows/high-priority" |
    "fill/arrows/horizontal-divider" |
    "fill/arrows/img-rotate-left" |
    "fill/arrows/img-rotate-right" |
    "fill/arrows/increase" |
    "fill/arrows/infinite-loop" |
    "fill/arrows/input" |
    "fill/arrows/invert-direction" |
    "fill/arrows/invert-process" |
    "fill/arrows/launch-app" |
    "fill/arrows/launch" |
    "fill/arrows/leave" |
    "fill/arrows/left-arrow" |
    "fill/arrows/log-in" |
    "fill/arrows/log-out" |
    "fill/arrows/logout" |
    "fill/arrows/loop" |
    "fill/arrows/loop-2" |
    "fill/arrows/low-priority" |
    "fill/arrows/maximize-area" |
    "fill/arrows/maximize" |
    "fill/arrows/merge-2" |
    "fill/arrows/merge" |
    "fill/arrows/migration" |
    "fill/arrows/money-transfer" |
    "fill/arrows/move-2" |
    "fill/arrows/move" |
    "fill/arrows/move-3" |
    "fill/arrows/move-down-2" |
    "fill/arrows/move-down-right" |
    "fill/arrows/move-down" |
    "fill/arrows/move-layer-down" |
    "fill/arrows/move-layer-left" |
    "fill/arrows/move-layer-right" |
    "fill/arrows/move-layer-up" |
    "fill/arrows/move-left" |
    "fill/arrows/move-right" |
    "fill/arrows/move-up-2" |
    "fill/arrows/move-up" |
    "fill/arrows/move-up-left" |
    "fill/arrows/nav-down" |
    "fill/arrows/nav-left" |
    "fill/arrows/nav-right" |
    "fill/arrows/nav-up" |
    "fill/arrows/open-in-browser" |
    "fill/arrows/opposite-directions-2" |
    "fill/arrows/opposite-directions" |
    "fill/arrows/orientation" |
    "fill/arrows/pointing-down" |
    "fill/arrows/pointing-left" |
    "fill/arrows/pointing-right" |
    "fill/arrows/pointing-up" |
    "fill/arrows/r-down-left-arrows" |
    "fill/arrows/r-down-right-arrows" |
    "fill/arrows/r-up-left-arrows" |
    "fill/arrows/r-up-right-arrows" |
    "fill/arrows/random" |
    "fill/arrows/rate-down" |
    "fill/arrows/rate-up" |
    "fill/arrows/redo" |
    "fill/arrows/refresh" |
    "fill/arrows/refund" |
    "fill/arrows/reload" |
    "fill/arrows/repeat-cycle" |
    "fill/arrows/repeat" |
    "fill/arrows/replay" |
    "fill/arrows/reply-all" |
    "fill/arrows/reply-arrow" |
    "fill/arrows/reply" |
    "fill/arrows/resize-x" |
    "fill/arrows/resize-y" |
    "fill/arrows/respond-arrow" |
    "fill/arrows/restore" |
    "fill/arrows/right-arrow" |
    "fill/arrows/rotate-left" |
    "fill/arrows/rotate-right" |
    "fill/arrows/screen-sharing-2" |
    "fill/arrows/screen-sharing-off-2" |
    "fill/arrows/separate-branch" |
    "fill/arrows/separate-directions" |
    "fill/arrows/separate" |
    "fill/arrows/share" |
    "fill/arrows/share-2" |
    "fill/arrows/share-3" |
    "fill/arrows/sharing" |
    "fill/arrows/shuffle" |
    "fill/arrows/shuffle-2" |
    "fill/arrows/sign-down" |
    "fill/arrows/sign-left" |
    "fill/arrows/sign-right" |
    "fill/arrows/sign-up" |
    "fill/arrows/slide-left" |
    "fill/arrows/slide-right" |
    "fill/arrows/social-sharing" |
    "fill/arrows/split" |
    "fill/arrows/split-branch" |
    "fill/arrows/swap-horizontal" |
    "fill/arrows/swap-vertical" |
    "fill/arrows/system-update" |
    "fill/arrows/three-way-direction" |
    "fill/arrows/time-machine" |
    "fill/arrows/traffic" |
    "fill/arrows/transaction" |
    "fill/arrows/trend-down" |
    "fill/arrows/trend-up" |
    "fill/arrows/triangle-down" |
    "fill/arrows/triangle-left" |
    "fill/arrows/triangle-line-down" |
    "fill/arrows/triangle-line-left" |
    "fill/arrows/triangle-line-right" |
    "fill/arrows/triangle-line-up" |
    "fill/arrows/triangle-right" |
    "fill/arrows/triangle-sm-down" |
    "fill/arrows/triangle-sm-left" |
    "fill/arrows/triangle-sm-right" |
    "fill/arrows/triangle-sm-up" |
    "fill/arrows/triangle-up" |
    "fill/arrows/turn-e" |
    "fill/arrows/turn-n" |
    "fill/arrows/turn-s" |
    "fill/arrows/turn-w" |
    "fill/arrows/two-way-direction" |
    "fill/arrows/undo" |
    "fill/arrows/unite-2" |
    "fill/arrows/unite" |
    "fill/arrows/up-arrow" |
    "fill/arrows/upload" |
    "fill/arrows/upload-data" |
    "fill/arrows/upload-file" |
    "fill/arrows/vertical-divider" |
    "fill/arrows/width" |
    "fill/arrows/window-maximize" |
    "fill/arrows/window-minimize" |
    "outline/arrows/all-directions" |
    "outline/arrows/alpha-order" |
    "outline/arrows/arrow-bottom-left" |
    "outline/arrows/arrow-bottom-right" |
    "outline/arrows/arrow-down" |
    "outline/arrows/arrow-down-2" |
    "outline/arrows/arrow-down-3" |
    "outline/arrows/arrow-e" |
    "outline/arrows/arrow-left-2" |
    "outline/arrows/arrow-left" |
    "outline/arrows/arrow-left-3" |
    "outline/arrows/arrow-n" |
    "outline/arrows/arrow-right-2" |
    "outline/arrows/arrow-right" |
    "outline/arrows/arrow-right-3" |
    "outline/arrows/arrow-s" |
    "outline/arrows/arrow-sm-down" |
    "outline/arrows/arrow-sm-left" |
    "outline/arrows/arrow-sm-right" |
    "outline/arrows/arrow-tool" |
    "outline/arrows/arrow-top-left" |
    "outline/arrows/arrow-top-right" |
    "outline/arrows/arrow-up-2" |
    "outline/arrows/arrow-up" |
    "outline/arrows/arrow-up-3" |
    "outline/arrows/arrow-w" |
    "outline/arrows/arrows-expand-2" |
    "outline/arrows/arrows-expand" |
    "outline/arrows/arrows-fullscreen-2" |
    "outline/arrows/arrows-fullscreen" |
    "outline/arrows/arrows-maximize-2" |
    "outline/arrows/arrows-maximize" |
    "outline/arrows/arrows-opposite-directions" |
    "outline/arrows/arrows-same-direction" |
    "outline/arrows/back-arrow" |
    "outline/arrows/backward" |
    "outline/arrows/block-down" |
    "outline/arrows/block-left" |
    "outline/arrows/block-right" |
    "outline/arrows/block-up" |
    "outline/arrows/box-arrow-bottom-left" |
    "outline/arrows/box-arrow-bottom-right" |
    "outline/arrows/box-arrow-down" |
    "outline/arrows/box-arrow-left" |
    "outline/arrows/box-arrow-right" |
    "outline/arrows/box-arrow-top-left" |
    "outline/arrows/box-arrow-top-right" |
    "outline/arrows/box-arrow-up" |
    "outline/arrows/box-caret-down" |
    "outline/arrows/box-caret-left" |
    "outline/arrows/box-caret-right" |
    "outline/arrows/box-caret-up" |
    "outline/arrows/box-ctrl-down" |
    "outline/arrows/box-ctrl-left" |
    "outline/arrows/box-ctrl-right" |
    "outline/arrows/box-ctrl-up" |
    "outline/arrows/caret-sm-up" |
    "outline/arrows/centralize" |
    "outline/arrows/change-direction" |
    "outline/arrows/circle-arrow-down" |
    "outline/arrows/circle-arrow-left" |
    "outline/arrows/circle-arrow-right" |
    "outline/arrows/circle-arrow-up" |
    "outline/arrows/circle-caret-down" |
    "outline/arrows/circle-caret-left" |
    "outline/arrows/circle-caret-right" |
    "outline/arrows/circle-caret-up" |
    "outline/arrows/circle-ctrl-down" |
    "outline/arrows/circle-ctrl-left" |
    "outline/arrows/circle-ctrl-right" |
    "outline/arrows/circle-ctrl-up" |
    "outline/arrows/circle-in" |
    "outline/arrows/circle-out" |
    "outline/arrows/circuit-round" |
    "outline/arrows/circuit" |
    "outline/arrows/cloud-data-download" |
    "outline/arrows/cloud-download" |
    "outline/arrows/cloud-upload" |
    "outline/arrows/compare" |
    "outline/arrows/computer-upload" |
    "outline/arrows/contrast" |
    "outline/arrows/conversion" |
    "outline/arrows/corner-bottom-left" |
    "outline/arrows/corner-bottom-right" |
    "outline/arrows/corner-down-round" |
    "outline/arrows/corner-left-down" |
    "outline/arrows/corner-left-round" |
    "outline/arrows/corner-right-down" |
    "outline/arrows/corner-right-round" |
    "outline/arrows/corner-top-left" |
    "outline/arrows/corner-top-right" |
    "outline/arrows/corner-up-left" |
    "outline/arrows/corner-up-right" |
    "outline/arrows/corner-up-round" |
    "outline/arrows/cross-down" |
    "outline/arrows/cross" |
    "outline/arrows/cross-horizontal" |
    "outline/arrows/cross-left" |
    "outline/arrows/cross-right" |
    "outline/arrows/cross-up" |
    "outline/arrows/cross-vertical" |
    "outline/arrows/crossing-directions" |
    "outline/arrows/ctrl-backward" |
    "outline/arrows/ctrl-down" |
    "outline/arrows/ctrl-forward" |
    "outline/arrows/ctrl-left" |
    "outline/arrows/ctrl-right" |
    "outline/arrows/ctrl-up" |
    "outline/arrows/curved-arrow-down" |
    "outline/arrows/curved-arrow-left" |
    "outline/arrows/curved-arrow-right" |
    "outline/arrows/curved-circuit" |
    "outline/arrows/cycle" |
    "outline/arrows/data-download" |
    "outline/arrows/data-upload" |
    "outline/arrows/delete-key" |
    "outline/arrows/delete-x" |
    "outline/arrows/depth" |
    "outline/arrows/direction-down" |
    "outline/arrows/direction" |
    "outline/arrows/direction-left" |
    "outline/arrows/direction-right" |
    "outline/arrows/direction-up" |
    "outline/arrows/disperse" |
    "outline/arrows/double-arrow-left" |
    "outline/arrows/double-arrow-right" |
    "outline/arrows/down-arrow" |
    "outline/arrows/download" |
    "outline/arrows/download-data" |
    "outline/arrows/download-file" |
    "outline/arrows/eject" |
    "outline/arrows/enlarge" |
    "outline/arrows/enlarge-diagonal-2" |
    "outline/arrows/enlarge-diagonal" |
    "outline/arrows/enlarge-h" |
    "outline/arrows/enlarge-horizontal" |
    "outline/arrows/enlarge-vertical" |
    "outline/arrows/enter" |
    "outline/arrows/exit-right" |
    "outline/arrows/expand" |
    "outline/arrows/expand-2" |
    "outline/arrows/expand-h" |
    "outline/arrows/expand-window" |
    "outline/arrows/export" |
    "outline/arrows/file-archive" |
    "outline/arrows/file-download-3" |
    "outline/arrows/file-download" |
    "outline/arrows/file-export" |
    "outline/arrows/file-import" |
    "outline/arrows/file-upload" |
    "outline/arrows/file-upload-2" |
    "outline/arrows/file-upload-3" |
    "outline/arrows/fit-horizontal" |
    "outline/arrows/fit-vertical" |
    "outline/arrows/fork-2" |
    "outline/arrows/fork" |
    "outline/arrows/format-left" |
    "outline/arrows/format-right" |
    "outline/arrows/forward" |
    "outline/arrows/fullscreen" |
    "outline/arrows/fullscreen-2" |
    "outline/arrows/git-merge" |
    "outline/arrows/height-2" |
    "outline/arrows/high-priority" |
    "outline/arrows/horizontal-divider" |
    "outline/arrows/img-rotate-left" |
    "outline/arrows/img-rotate-right" |
    "outline/arrows/increase" |
    "outline/arrows/infinite-loop" |
    "outline/arrows/input" |
    "outline/arrows/invert-direction" |
    "outline/arrows/invert-process" |
    "outline/arrows/launch-app" |
    "outline/arrows/launch" |
    "outline/arrows/leave" |
    "outline/arrows/left-arrow" |
    "outline/arrows/log-in" |
    "outline/arrows/log-out" |
    "outline/arrows/logout" |
    "outline/arrows/loop-2" |
    "outline/arrows/loop" |
    "outline/arrows/low-priority" |
    "outline/arrows/maximize" |
    "outline/arrows/maximize-area" |
    "outline/arrows/merge-2" |
    "outline/arrows/merge" |
    "outline/arrows/migration" |
    "outline/arrows/money-transfer" |
    "outline/arrows/move-2" |
    "outline/arrows/move" |
    "outline/arrows/move-3" |
    "outline/arrows/move-down" |
    "outline/arrows/move-down-2" |
    "outline/arrows/move-down-right" |
    "outline/arrows/move-layer-down" |
    "outline/arrows/move-layer-left" |
    "outline/arrows/move-layer-right" |
    "outline/arrows/move-layer-up" |
    "outline/arrows/move-left" |
    "outline/arrows/move-right" |
    "outline/arrows/move-up-2" |
    "outline/arrows/move-up-left" |
    "outline/arrows/move-up" |
    "outline/arrows/nav-down" |
    "outline/arrows/nav-left" |
    "outline/arrows/nav-right" |
    "outline/arrows/nav-up" |
    "outline/arrows/open-in-browser" |
    "outline/arrows/opposite-directions-2" |
    "outline/arrows/opposite-directions" |
    "outline/arrows/orientation" |
    "outline/arrows/pointing-down" |
    "outline/arrows/pointing-left" |
    "outline/arrows/pointing-right" |
    "outline/arrows/pointing-up" |
    "outline/arrows/r-down-left-arrows" |
    "outline/arrows/r-down-right-arrows" |
    "outline/arrows/r-up-left-arrows" |
    "outline/arrows/r-up-right-arrows" |
    "outline/arrows/random" |
    "outline/arrows/rate-down" |
    "outline/arrows/rate-up" |
    "outline/arrows/refresh" |
    "outline/arrows/redo" |
    "outline/arrows/refund" |
    "outline/arrows/reload" |
    "outline/arrows/repeat-cycle" |
    "outline/arrows/repeat" |
    "outline/arrows/replay" |
    "outline/arrows/reply" |
    "outline/arrows/reply-all" |
    "outline/arrows/reply-arrow" |
    "outline/arrows/resize-x" |
    "outline/arrows/resize-y" |
    "outline/arrows/respond-arrow" |
    "outline/arrows/restore" |
    "outline/arrows/right-arrow" |
    "outline/arrows/rotate-left" |
    "outline/arrows/rotate-right" |
    "outline/arrows/screen-sharing-2" |
    "outline/arrows/screen-sharing-off-2" |
    "outline/arrows/separate-branch" |
    "outline/arrows/separate-directions" |
    "outline/arrows/separate" |
    "outline/arrows/share-2" |
    "outline/arrows/share" |
    "outline/arrows/share-3" |
    "outline/arrows/sharing" |
    "outline/arrows/shuffle-2" |
    "outline/arrows/shuffle" |
    "outline/arrows/sign-down" |
    "outline/arrows/sign-left" |
    "outline/arrows/sign-right" |
    "outline/arrows/sign-up" |
    "outline/arrows/slide-left" |
    "outline/arrows/slide-right" |
    "outline/arrows/social-sharing" |
    "outline/arrows/split" |
    "outline/arrows/split-branch" |
    "outline/arrows/swap-horizontal" |
    "outline/arrows/swap-vertical" |
    "outline/arrows/system-update" |
    "outline/arrows/three-way-direction" |
    "outline/arrows/time-machine" |
    "outline/arrows/traffic" |
    "outline/arrows/transaction" |
    "outline/arrows/trend-down" |
    "outline/arrows/trend-up" |
    "outline/arrows/triangle-down" |
    "outline/arrows/triangle-left" |
    "outline/arrows/triangle-line-down" |
    "outline/arrows/triangle-line-left" |
    "outline/arrows/triangle-line-right" |
    "outline/arrows/triangle-line-up" |
    "outline/arrows/triangle-right" |
    "outline/arrows/triangle-sm-down" |
    "outline/arrows/triangle-sm-left" |
    "outline/arrows/triangle-sm-right" |
    "outline/arrows/triangle-sm-up" |
    "outline/arrows/triangle-up" |
    "outline/arrows/turn-e" |
    "outline/arrows/turn-n" |
    "outline/arrows/turn-s" |
    "outline/arrows/turn-w" |
    "outline/arrows/two-way-direction" |
    "outline/arrows/undo" |
    "outline/arrows/unite-2" |
    "outline/arrows/unite" |
    "outline/arrows/up-arrow" |
    "outline/arrows/upload-data" |
    "outline/arrows/upload-file" |
    "outline/arrows/upload" |
    "outline/arrows/vertical-divider" |
    "outline/arrows/width" |
    "outline/arrows/window-maximize" |
    "outline/arrows/window-minimize" |
    "outline/business/address-book" |
    "outline/business/agenda" |
    "outline/business/algorithm" |
    "outline/business/app-services" |
    "outline/business/archery-target" |
    "outline/business/atm" |
    "outline/business/award-49" |
    "outline/business/badge" |
    "outline/business/bank-statement" |
    "outline/business/bill" |
    "outline/business/bitcoin" |
    "outline/business/block" |
    "outline/business/blockchain" |
    "outline/business/board-27" |
    "outline/business/board-28" |
    "outline/business/board-29" |
    "outline/business/board-30" |
    "outline/business/books" |
    "outline/business/briefcase-24" |
    "outline/business/briefcase-25" |
    "outline/business/briefcase-26" |
    "outline/business/bulb-61" |
    "outline/business/bulb-62" |
    "outline/business/bulb-63" |
    "outline/business/business-agent" |
    "outline/business/business-contact-85" |
    "outline/business/businessman-03" |
    "outline/business/businessman-04" |
    "outline/business/calculator" |
    "outline/business/candlestick-chart" |
    "outline/business/card-edit" |
    "outline/business/card-favorite" |
    "outline/business/card-remove" |
    "outline/business/card-update" |
    "outline/business/certificate" |
    "outline/business/chart-bar-32" |
    "outline/business/chart-bar-33" |
    "outline/business/chart" |
    "outline/business/chart-growth" |
    "outline/business/chart-pie-35" |
    "outline/business/chart-pie-36" |
    "outline/business/cheque" |
    "outline/business/chess-knight" |
    "outline/business/chess-tower" |
    "outline/business/cloud-mining" |
    "outline/business/cockade" |
    "outline/business/coins" |
    "outline/business/conference-room" |
    "outline/business/connect" |
    "outline/business/contact-86" |
    "outline/business/contact-87" |
    "outline/business/contact-88" |
    "outline/business/contactless-card" |
    "outline/business/contacts" |
    "outline/business/copyright" |
    "outline/business/credit-card" |
    "outline/business/credit-card-in" |
    "outline/business/credit-locked" |
    "outline/business/crypto-wallet" |
    "outline/business/currency-dollar" |
    "outline/business/currency-euro" |
    "outline/business/currency-exchange-2" |
    "outline/business/currency-exchange" |
    "outline/business/currency-pound" |
    "outline/business/currency-yen" |
    "outline/business/debt" |
    "outline/business/decentralize" |
    "outline/business/decision-process" |
    "outline/business/dice" |
    "outline/business/factory" |
    "outline/business/globe" |
    "outline/business/goal-65" |
    "outline/business/gold" |
    "outline/business/hammer" |
    "outline/business/hand-card" |
    "outline/business/handout" |
    "outline/business/handshake" |
    "outline/business/hat" |
    "outline/business/hierarchy-53" |
    "outline/business/hierarchy-54" |
    "outline/business/hierarchy-55" |
    "outline/business/hierarchy-56" |
    "outline/business/info-point" |
    "outline/business/interview" |
    "outline/business/joint-account" |
    "outline/business/laptop-71" |
    "outline/business/laptop-72" |
    "outline/business/law" |
    "outline/business/line-chart" |
    "outline/business/loan" |
    "outline/business/logic" |
    "outline/business/math" |
    "outline/business/miner" |
    "outline/business/mobile-banking" |
    "outline/business/mobile-card" |
    "outline/business/money-11" |
    "outline/business/money-12" |
    "outline/business/money-13" |
    "outline/business/money-bag" |
    "outline/business/money-coins" |
    "outline/business/money-growth" |
    "outline/business/money-time" |
    "outline/business/money-transfer" |
    "outline/business/mortgage" |
    "outline/business/name-card" |
    "outline/business/negative-judgement" |
    "outline/business/net" |
    "outline/business/new-construction" |
    "outline/business/nodes" |
    "outline/business/notes" |
    "outline/business/office" |
    "outline/business/office-badge" |
    "outline/business/office-chair" |
    "outline/business/office-pass" |
    "outline/business/online-banking" |
    "outline/business/payee" |
    "outline/business/payment-method" |
    "outline/business/payment" |
    "outline/business/payor" |
    "outline/business/percentage-38" |
    "outline/business/percentage-39" |
    "outline/business/personal-trainer" |
    "outline/business/pig" |
    "outline/business/pin" |
    "outline/business/plug" |
    "outline/business/pos" |
    "outline/business/positive-judgement" |
    "outline/business/presentation" |
    "outline/business/privacy-policy" |
    "outline/business/progress" |
    "outline/business/puzzle-09" |
    "outline/business/puzzle-10" |
    "outline/business/ranking" |
    "outline/business/rate-down" |
    "outline/business/rate-up" |
    "outline/business/refund" |
    "outline/business/round-dollar" |
    "outline/business/round-euro" |
    "outline/business/round-pound" |
    "outline/business/round-yen" |
    "outline/business/safe" |
    "outline/business/savings" |
    "outline/business/scale" |
    "outline/business/sign" |
    "outline/business/signature" |
    "outline/business/statistics" |
    "outline/business/stock-market" |
    "outline/business/tactic" |
    "outline/business/temple" |
    "outline/business/tie-01" |
    "outline/business/tie-02" |
    "outline/business/transaction" |
    "outline/business/transactions" |
    "outline/business/wallet-43" |
    "outline/business/wallet-44" |
    "outline/business/wallet-90" |
    "outline/education/abc" |
    "outline/education/agenda" |
    "outline/education/agenda-bookmark" |
    "outline/education/album" |
    "outline/education/astronomy" |
    "outline/education/atom" |
    "outline/education/award-49" |
    "outline/education/backpack-57" |
    "outline/education/backpack-58" |
    "outline/education/basketball" |
    "outline/education/biochemistry" |
    "outline/education/biology" |
    "outline/education/board-27" |
    "outline/education/board-51" |
    "outline/education/book-39" |
    "outline/education/book" |
    "outline/education/book-bookmark-2" |
    "outline/education/book-bookmark" |
    "outline/education/book-open" |
    "outline/education/book-open-2" |
    "outline/education/bookmark" |
    "outline/education/books" |
    "outline/education/books-46" |
    "outline/education/botany" |
    "outline/education/brush" |
    "outline/education/bus" |
    "outline/education/bus-front-12" |
    "outline/education/buzz" |
    "outline/education/calculator" |
    "outline/education/certificate" |
    "outline/education/chalkboard" |
    "outline/education/chemistry" |
    "outline/education/cockade" |
    "outline/education/collection" |
    "outline/education/compass" |
    "outline/education/design" |
    "outline/education/earth-science" |
    "outline/education/ecology" |
    "outline/education/equation" |
    "outline/education/eraser-32" |
    "outline/education/eraser-33" |
    "outline/education/flask" |
    "outline/education/function" |
    "outline/education/geometry" |
    "outline/education/glasses-2" |
    "outline/education/glasses" |
    "outline/education/globe-2" |
    "outline/education/globe" |
    "outline/education/grammar-check" |
    "outline/education/hat-3" |
    "outline/education/language" |
    "outline/education/logic" |
    "outline/education/marker" |
    "outline/education/math" |
    "outline/education/measure-02" |
    "outline/education/measure-17" |
    "outline/education/measure-big" |
    "outline/education/medal" |
    "outline/education/medicine" |
    "outline/education/microbiology" |
    "outline/education/microscope" |
    "outline/education/molecule" |
    "outline/education/notepad" |
    "outline/education/notes" |
    "outline/education/notification" |
    "outline/education/open-book" |
    "outline/education/paper-diploma" |
    "outline/education/paper" |
    "outline/education/paw" |
    "outline/education/pc-play-media" |
    "outline/education/pen-01" |
    "outline/education/pen-23" |
    "outline/education/pen-tool" |
    "outline/education/pencil-47" |
    "outline/education/pencil" |
    "outline/education/pendulum" |
    "outline/education/planet" |
    "outline/education/potion" |
    "outline/education/presentation" |
    "outline/education/rat" |
    "outline/education/read" |
    "outline/education/reading" |
    "outline/education/research" |
    "outline/education/saved-items" |
    "outline/education/school" |
    "outline/education/soccer-ball" |
    "outline/education/statistics" |
    "outline/education/survey" |
    "outline/education/telescope" |
    "outline/education/translation" |
    "outline/education/typography" |
    "outline/user interface/a-chart" |
    "outline/user interface/a-chat" |
    "outline/user interface/a-tag-add" |
    "outline/user interface/a-tag-remove" |
    "outline/user interface/a-tag" |
    "outline/user interface/access-key" |
    "outline/user interface/add-fav" |
    "outline/user interface/add-favorite" |
    "outline/user interface/add-like" |
    "outline/user interface/add-notification" |
    "outline/user interface/add-to-cart-2" |
    "outline/user interface/add-to-cart" |
    "outline/user interface/add" |
    "outline/user interface/alarm-add" |
    "outline/user interface/alarm-disable" |
    "outline/user interface/alarm" |
    "outline/user interface/analytics" |
    "outline/user interface/app-store" |
    "outline/user interface/apps" |
    "outline/user interface/archive-drawer" |
    "outline/user interface/archive" |
    "outline/user interface/at-sign" |
    "outline/user interface/attach" |
    "outline/user interface/attachment" |
    "outline/user interface/b-chart" |
    "outline/user interface/b-comment" |
    "outline/user interface/b-eye" |
    "outline/user interface/backward" |
    "outline/user interface/ban" |
    "outline/user interface/basket" |
    "outline/user interface/battery-charging" |
    "outline/user interface/battery-low" |
    "outline/user interface/battery-power" |
    "outline/user interface/battery-status" |
    "outline/user interface/bell" |
    "outline/user interface/bin" |
    "outline/user interface/blog" |
    "outline/user interface/bluetooth" |
    "outline/user interface/board-2" |
    "outline/user interface/bolt" |
    "outline/user interface/book" |
    "outline/user interface/bookmark-add-2" |
    "outline/user interface/bookmark-add" |
    "outline/user interface/bookmark-delete-2" |
    "outline/user interface/bookmark-delete" |
    "outline/user interface/bookmark" |
    "outline/user interface/bookmarks" |
    "outline/user interface/bullet-list" |
    "outline/user interface/buzz" |
    "outline/user interface/c-add" |
    "outline/user interface/c-check" |
    "outline/user interface/c-delete" |
    "outline/user interface/c-edit" |
    "outline/user interface/c-info" |
    "outline/user interface/c-pulse" |
    "outline/user interface/c-question" |
    "outline/user interface/c-remove" |
    "outline/user interface/c-warning" |
    "outline/user interface/calendar-2" |
    "outline/user interface/calendar-date-2" |
    "outline/user interface/calendar-date" |
    "outline/user interface/calendar-day-view" |
    "outline/user interface/calendar-event-2" |
    "outline/user interface/calendar-event-create" |
    "outline/user interface/calendar-event" |
    "outline/user interface/calendar" |
    "outline/user interface/chain" |
    "outline/user interface/chart" |
    "outline/user interface/chat" |
    "outline/user interface/check-all" |
    "outline/user interface/check-double" |
    "outline/user interface/check-in" |
    "outline/user interface/check-list" |
    "outline/user interface/check-out" |
    "outline/user interface/check-single" |
    "outline/user interface/check" |
    "outline/user interface/checkbox-btn-checked" |
    "outline/user interface/checkbox-btn" |
    "outline/user interface/chemistry" |
    "outline/user interface/clear-data" |
    "outline/user interface/clock" |
    "outline/user interface/cloud-forecast" |
    "outline/user interface/cloud" |
    "outline/user interface/cogwheel" |
    "outline/user interface/comment-add" |
    "outline/user interface/comment" |
    "outline/user interface/comments" |
    "outline/user interface/compare-items" |
    "outline/user interface/components" |
    "outline/user interface/configuration-tools" |
    "outline/user interface/control-panel" |
    "outline/user interface/d-add" |
    "outline/user interface/d-chart" |
    "outline/user interface/d-check" |
    "outline/user interface/d-delete" |
    "outline/user interface/d-edit" |
    "outline/user interface/d-remove" |
    "outline/user interface/dashboard" |
    "outline/user interface/data-download" |
    "outline/user interface/data-settings" |
    "outline/user interface/data-upload" |
    "outline/user interface/database" |
    "outline/user interface/delete-forever" |
    "outline/user interface/delete" |
    "outline/user interface/design-system" |
    "outline/user interface/disk" |
    "outline/user interface/dock-bottom" |
    "outline/user interface/dock-left" |
    "outline/user interface/dock-right" |
    "outline/user interface/dock-top" |
    "outline/user interface/download" |
    "outline/user interface/drop" |
    "outline/user interface/e-add" |
    "outline/user interface/e-delete" |
    "outline/user interface/e-remove" |
    "outline/user interface/edit-note" |
    "outline/user interface/edit" |
    "outline/user interface/email-open" |
    "outline/user interface/email" |
    "outline/user interface/empty" |
    "outline/user interface/enlarge" |
    "outline/user interface/event-confirm" |
    "outline/user interface/event-create" |
    "outline/user interface/exclamation-mark" |
    "outline/user interface/eye" |
    "outline/user interface/f-add" |
    "outline/user interface/f-chat" |
    "outline/user interface/f-check" |
    "outline/user interface/f-comment" |
    "outline/user interface/f-dashboard" |
    "outline/user interface/f-delete" |
    "outline/user interface/f-remove" |
    "outline/user interface/fav-list" |
    "outline/user interface/fav-remove" |
    "outline/user interface/favorite" |
    "outline/user interface/feedback" |
    "outline/user interface/file-add" |
    "outline/user interface/file-article" |
    "outline/user interface/file-delete" |
    "outline/user interface/file-text" |
    "outline/user interface/filter-check" |
    "outline/user interface/filter-remove" |
    "outline/user interface/filter-tool" |
    "outline/user interface/filter" |
    "outline/user interface/find-replace" |
    "outline/user interface/flame" |
    "outline/user interface/floors" |
    "outline/user interface/floppy-disk" |
    "outline/user interface/forward" |
    "outline/user interface/full-screen" |
    "outline/user interface/fullsize" |
    "outline/user interface/funnel" |
    "outline/user interface/g-chart" |
    "outline/user interface/g-check" |
    "outline/user interface/gallery-layout" |
    "outline/user interface/gallery-view" |
    "outline/user interface/gantt" |
    "outline/user interface/gear" |
    "outline/user interface/geometry" |
    "outline/user interface/grid-interface" |
    "outline/user interface/grid-layout" |
    "outline/user interface/grid-view" |
    "outline/user interface/heart" |
    "outline/user interface/hide" |
    "outline/user interface/home-2" |
    "outline/user interface/home-3" |
    "outline/user interface/home" |
    "outline/user interface/hot-key" |
    "outline/user interface/hotspot" |
    "outline/user interface/hourglass" |
    "outline/user interface/house" |
    "outline/user interface/hyperlink-broken" |
    "outline/user interface/hyperlink" |
    "outline/user interface/i-add" |
    "outline/user interface/i-check" |
    "outline/user interface/i-delete" |
    "outline/user interface/i-edit" |
    "outline/user interface/i-remove" |
    "outline/user interface/incognito" |
    "outline/user interface/increase" |
    "outline/user interface/infinite" |
    "outline/user interface/info" |
    "outline/user interface/key" |
    "outline/user interface/label" |
    "outline/user interface/layout-grid" |
    "outline/user interface/layout" |
    "outline/user interface/leaf" |
    "outline/user interface/leave" |
    "outline/user interface/letter" |
    "outline/user interface/lifering" |
    "outline/user interface/light-control" |
    "outline/user interface/like" |
    "outline/user interface/link" |
    "outline/user interface/lock" |
    "outline/user interface/log-out" |
    "outline/user interface/magnifier-zoom-in" |
    "outline/user interface/magnifier-zoom-out" |
    "outline/user interface/magnifier" |
    "outline/user interface/mail" |
    "outline/user interface/megaphone" |
    "outline/user interface/menu-2" |
    "outline/user interface/menu-3" |
    "outline/user interface/menu-4" |
    "outline/user interface/menu-6" |
    "outline/user interface/menu-7" |
    "outline/user interface/menu-8" |
    "outline/user interface/menu-dots" |
    "outline/user interface/menu" |
    "outline/user interface/metrics" |
    "outline/user interface/mirror-tablet-phone" |
    "outline/user interface/n-check" |
    "outline/user interface/n-edit" |
    "outline/user interface/network-communication" |
    "outline/user interface/network-connection" |
    "outline/user interface/networking" |
    "outline/user interface/new-notification" |
    "outline/user interface/news" |
    "outline/user interface/no-results" |
    "outline/user interface/note" |
    "outline/user interface/notification-2" |
    "outline/user interface/notification" |
    "outline/user interface/o-check" |
    "outline/user interface/o-warning" |
    "outline/user interface/offline" |
    "outline/user interface/opening-times" |
    "outline/user interface/options" |
    "outline/user interface/p-chart" |
    "outline/user interface/padlock-unlocked" |
    "outline/user interface/padlock" |
    "outline/user interface/paragraph" |
    "outline/user interface/password" |
    "outline/user interface/pen-2" |
    "outline/user interface/pen" |
    "outline/user interface/pencil" |
    "outline/user interface/phone-call-end" |
    "outline/user interface/phone-call" |
    "outline/user interface/phone" |
    "outline/user interface/plant-leaf" |
    "outline/user interface/playlist" |
    "outline/user interface/preferences" |
    "outline/user interface/present" |
    "outline/user interface/privacy-settings" |
    "outline/user interface/privacy" |
    "outline/user interface/progress-2" |
    "outline/user interface/progress-indicator" |
    "outline/user interface/question-mark" |
    "outline/user interface/questionnaire" |
    "outline/user interface/r-chat" |
    "outline/user interface/radio-btn-checked" |
    "outline/user interface/radio-btn" |
    "outline/user interface/remove-fav" |
    "outline/user interface/remove-favorite" |
    "outline/user interface/remove-like" |
    "outline/user interface/remove" |
    "outline/user interface/roadmap" |
    "outline/user interface/s-add" |
    "outline/user interface/s-ban" |
    "outline/user interface/s-check" |
    "outline/user interface/s-delete" |
    "outline/user interface/s-edit" |
    "outline/user interface/s-info" |
    "outline/user interface/s-pulse" |
    "outline/user interface/s-question" |
    "outline/user interface/s-remove" |
    "outline/user interface/s-warning" |
    "outline/user interface/save-for-later" |
    "outline/user interface/save-to-list" |
    "outline/user interface/saved-items" |
    "outline/user interface/screen-enlarge" |
    "outline/user interface/screen-expand" |
    "outline/user interface/screen-maximize" |
    "outline/user interface/screen-sharing-2" |
    "outline/user interface/screen-sharing-off-2" |
    "outline/user interface/search-content" |
    "outline/user interface/search-zoom-in" |
    "outline/user interface/search-zoom-out" |
    "outline/user interface/search" |
    "outline/user interface/security" |
    "outline/user interface/segmentation" |
    "outline/user interface/select" |
    "outline/user interface/send-message" |
    "outline/user interface/send" |
    "outline/user interface/settings-gear" |
    "outline/user interface/settings-wheel" |
    "outline/user interface/settings" |
    "outline/user interface/setup-options" |
    "outline/user interface/setup-preferences" |
    "outline/user interface/setup-tools" |
    "outline/user interface/share" |
    "outline/user interface/sharing" |
    "outline/user interface/shop" |
    "outline/user interface/shopping-bag" |
    "outline/user interface/shopping-cart-2" |
    "outline/user interface/shopping-cart" |
    "outline/user interface/shopping-label" |
    "outline/user interface/shopping-tag" |
    "outline/user interface/sidebar" |
    "outline/user interface/slide-left" |
    "outline/user interface/slide-right" |
    "outline/user interface/social-sharing" |
    "outline/user interface/sort-tool" |
    "outline/user interface/spaceship" |
    "outline/user interface/speedometer" |
    "outline/user interface/stack" |
    "outline/user interface/star-rate" |
    "outline/user interface/star" |
    "outline/user interface/stopwatch" |
    "outline/user interface/support" |
    "outline/user interface/survey" |
    "outline/user interface/switches" |
    "outline/user interface/system-configuration" |
    "outline/user interface/system-preferences" |
    "outline/user interface/t-add" |
    "outline/user interface/t-delete" |
    "outline/user interface/t-remove" |
    "outline/user interface/table-layout" |
    "outline/user interface/table-move" |
    "outline/user interface/table-slide" |
    "outline/user interface/tag" |
    "outline/user interface/tags-stack" |
    "outline/user interface/target" |
    "outline/user interface/telephone" |
    "outline/user interface/time-alarm" |
    "outline/user interface/time-clock" |
    "outline/user interface/time-machine" |
    "outline/user interface/timeline" |
    "outline/user interface/toggle" |
    "outline/user interface/translation" |
    "outline/user interface/trash-can" |
    "outline/user interface/trash" |
    "outline/user interface/unlink" |
    "outline/user interface/unlocked" |
    "outline/user interface/upload" |
    "outline/user interface/url" |
    "outline/user interface/verified" |
    "outline/user interface/video-gallery" |
    "outline/user interface/view" |
    "outline/user interface/virtual-assistant-2" |
    "outline/user interface/warning-sign" |
    "outline/user interface/web-hyperlink" |
    "outline/user interface/web-link" |
    "outline/user interface/web-url" |
    "outline/user interface/webpage" |
    "outline/user interface/widget" |
    "outline/user interface/window-add" |
    "outline/user interface/window-delete" |
    "outline/user interface/wireframe" |
    "outline/user interface/wrench-tool" |
    "outline/user interface/wrench" |
    "outline/user interface/zoom-in" |
    "outline/user interface/zoom-out" |
    "outline/user interface/zoom" |
    "outline/users/accessibility" |
    "outline/users/account" |
    "outline/users/address-book" |
    "outline/users/child" |
    "outline/users/contact-list" |
    "outline/users/contact" |
    "outline/users/contacts" |
    "outline/users/couple-gay" |
    "outline/users/couple-lesbian" |
    "outline/users/diaper-changing-area" |
    "outline/users/doctor" |
    "outline/users/exchange" |
    "outline/users/face-man" |
    "outline/users/face-woman" |
    "outline/users/family-roof" |
    "outline/users/family" |
    "outline/users/farmer" |
    "outline/users/female-figure" |
    "outline/users/female-sign" |
    "outline/users/file-shared" |
    "outline/users/file-user" |
    "outline/users/folder-shared" |
    "outline/users/folder-user" |
    "outline/users/gathering-restrictions" |
    "outline/users/grandparent" |
    "outline/users/hacker" |
    "outline/users/hair-man" |
    "outline/users/hair-woman" |
    "outline/users/humanoid" |
    "outline/users/info-point" |
    "outline/users/interview" |
    "outline/users/joint-account" |
    "outline/users/male-sign" |
    "outline/users/man-arrow-down" |
    "outline/users/man-arrow-up" |
    "outline/users/man-profile" |
    "outline/users/man" |
    "outline/users/meeting" |
    "outline/users/mickey-mouse" |
    "outline/users/miner" |
    "outline/users/mobile-contact" |
    "outline/users/negative-judgement" |
    "outline/users/no-contact" |
    "outline/users/office-badge" |
    "outline/users/office-pass" |
    "outline/users/parenting" |
    "outline/users/payee" |
    "outline/users/payor" |
    "outline/users/people-network" |
    "outline/users/police-officer" |
    "outline/users/positive-judgement" |
    "outline/users/pregnant-woman" |
    "outline/users/privacy-policy" |
    "outline/users/profile" |
    "outline/users/property" |
    "outline/users/reading" |
    "outline/users/search-user" |
    "outline/users/security-gate" |
    "outline/users/security-officer" |
    "outline/users/social-distancing" |
    "outline/users/standing-man" |
    "outline/users/standing-woman" |
    "outline/users/stay-home" |
    "outline/users/team" |
    "outline/users/toilette" |
    "outline/users/user-2" |
    "outline/users/user-add" |
    "outline/users/user-bubble" |
    "outline/users/user-c-frame-2" |
    "outline/users/user-c-frame-3" |
    "outline/users/user-c-frame" |
    "outline/users/user-check" |
    "outline/users/user-create" |
    "outline/users/user-delete-cross" |
    "outline/users/user-delete-line" |
    "outline/users/user-delete" |
    "outline/users/user-edit" |
    "outline/users/user-focus" |
    "outline/users/user-group" |
    "outline/users/user-heart" |
    "outline/users/user-list" |
    "outline/users/user-location-2" |
    "outline/users/user-location" |
    "outline/users/user-lock" |
    "outline/users/user-new" |
    "outline/users/user-remove" |
    "outline/users/user-s-frame-2" |
    "outline/users/user-s-frame-3" |
    "outline/users/user-s-frame" |
    "outline/users/user-search" |
    "outline/users/user-share" |
    "outline/users/user-star" |
    "outline/users/user-sync" |
    "outline/users/user-time" |
    "outline/users/user-wearing-glasses" |
    "outline/users/user" |
    "outline/users/users-add" |
    "outline/users/users-check" |
    "outline/users/users-heart" |
    "outline/users/users-location" |
    "outline/users/users-lock" |
    "outline/users/users-meeting" |
    "outline/users/users-mm" |
    "outline/users/users-remove" |
    "outline/users/users-wm" |
    "outline/users/users-ww" |
    "outline/users/users" |
    "outline/users/virtual-assistant-2" |
    "outline/users/voice-record" |
    "outline/users/wc-sign" |
    "outline/users/wheelchair" |
    "outline/users/woman-arrow-down" |
    "outline/users/woman-arrow-up" |
    "outline/users/woman-man" |
    "outline/users/woman-profile" |
    "outline/users/woman" |
    "outline/users/work-badge" |
    "outline/health/ambulance" |
    "outline/health/apple-2" |
    "outline/health/atom" |
    "outline/health/bag-49" |
    "outline/health/bag-50" |
    "outline/health/bedroom" |
    "outline/health/biochemistry" |
    "outline/health/biology" |
    "outline/health/botany" |
    "outline/health/brain" |
    "outline/health/c-pulse" |
    "outline/health/call-doctor" |
    "outline/health/chemistry" |
    "outline/health/condom" |
    "outline/health/coughing" |
    "outline/health/cure" |
    "outline/health/diet-food" |
    "outline/health/diet-plan" |
    "outline/health/diet" |
    "outline/health/disinfectant" |
    "outline/health/dna-27" |
    "outline/health/dna-38" |
    "outline/health/doctor" |
    "outline/health/dont-touch-eyes" |
    "outline/health/dont-touch-mouth" |
    "outline/health/drop" |
    "outline/health/embryo" |
    "outline/health/female-figure" |
    "outline/health/female-sign" |
    "outline/health/flame" |
    "outline/health/flask-2" |
    "outline/health/flask" |
    "outline/health/food-scale" |
    "outline/health/gathering-restrictions" |
    "outline/health/heart" |
    "outline/health/heartbeat" |
    "outline/health/height" |
    "outline/health/hospital-32" |
    "outline/health/hospital-33" |
    "outline/health/hospital-34" |
    "outline/health/hospital-bed" |
    "outline/health/humidity-26" |
    "outline/health/humidity-52" |
    "outline/health/infrared-thermometer" |
    "outline/health/intestine" |
    "outline/health/liquid-soap-container" |
    "outline/health/lungs-infection" |
    "outline/health/lungs" |
    "outline/health/male-sign" |
    "outline/health/man" |
    "outline/health/measurement" |
    "outline/health/medical-clipboard" |
    "outline/health/medical-mask" |
    "outline/health/medication" |
    "outline/health/medicine" |
    "outline/health/microbiology" |
    "outline/health/microscope" |
    "outline/health/molecule-39" |
    "outline/health/molecule-40" |
    "outline/health/molecule" |
    "outline/health/mortar" |
    "outline/health/no-contact" |
    "outline/health/no-smoking" |
    "outline/health/nurse" |
    "outline/health/nutrition" |
    "outline/health/ovum-sperm" |
    "outline/health/patch-34" |
    "outline/health/patch" |
    "outline/health/pharmacy" |
    "outline/health/phone-heart" |
    "outline/health/phone-heartbeat" |
    "outline/health/pill-42" |
    "outline/health/pill-43" |
    "outline/health/pill-bottle" |
    "outline/health/potion" |
    "outline/health/pregnancy-test" |
    "outline/health/pulse-chart" |
    "outline/health/pulse-sleep" |
    "outline/health/pulse" |
    "outline/health/research" |
    "outline/health/runny-nose" |
    "outline/health/s-pulse" |
    "outline/health/smoking" |
    "outline/health/sneeze" |
    "outline/health/soap" |
    "outline/health/social-distancing" |
    "outline/health/sperm" |
    "outline/health/stay-home" |
    "outline/health/steps" |
    "outline/health/stethoscope" |
    "outline/health/stretching" |
    "outline/health/syringe" |
    "outline/health/temperature-2" |
    "outline/health/temperature" |
    "outline/health/thermometer" |
    "outline/health/tooth" |
    "outline/health/treadmill" |
    "outline/health/virus" |
    "outline/health/walking-support" |
    "outline/health/wash-hands" |
    "outline/health/watch-heart" |
    "outline/health/watch-heartbeat" |
    "outline/health/weed" |
    "outline/health/weight-gain" |
    "outline/health/weight-loss" |
    "outline/health/weight-scale" |
    "outline/health/wheelchair-2" |
    "outline/health/woman-man" |
    "outline/files/archive-check" |
    "outline/files/archive-content" |
    "outline/files/archive-doc-check" |
    "outline/files/archive-doc" |
    "outline/files/archive-drawer" |
    "outline/files/archive-file-check" |
    "outline/files/archive-file" |
    "outline/files/archive" |
    "outline/files/backup" |
    "outline/files/box" |
    "outline/files/browse" |
    "outline/files/catalog" |
    "outline/files/clear-data" |
    "outline/files/compressed-file" |
    "outline/files/computer-upload" |
    "outline/files/copy-2" |
    "outline/files/doc-folder" |
    "outline/files/document-2" |
    "outline/files/document-copy" |
    "outline/files/document" |
    "outline/files/drawer" |
    "outline/files/file-2" |
    "outline/files/file-add" |
    "outline/files/file-alert" |
    "outline/files/file-archive" |
    "outline/files/file-article" |
    "outline/files/file-audio-2" |
    "outline/files/file-audio" |
    "outline/files/file-bookmark" |
    "outline/files/file-chart-bar" |
    "outline/files/file-chart-pie" |
    "outline/files/file-check" |
    "outline/files/file-cloud" |
    "outline/files/file-copies" |
    "outline/files/file-copy" |
    "outline/files/file-delete" |
    "outline/files/file-dev" |
    "outline/files/file-download-3" |
    "outline/files/file-download" |
    "outline/files/file-edit" |
    "outline/files/file-export" |
    "outline/files/file-favorite" |
    "outline/files/file-folder" |
    "outline/files/file-gallery" |
    "outline/files/file-history" |
    "outline/files/file-image" |
    "outline/files/file-import" |
    "outline/files/file-info" |
    "outline/files/file-link" |
    "outline/files/file-locked" |
    "outline/files/file-money" |
    "outline/files/file-new" |
    "outline/files/file-no-access" |
    "outline/files/file-play" |
    "outline/files/file-preferences" |
    "outline/files/file-question" |
    "outline/files/file-remove" |
    "outline/files/file-replace" |
    "outline/files/file-search" |
    "outline/files/file-settings" |
    "outline/files/file-shared" |
    "outline/files/file-starred" |
    "outline/files/file-sync" |
    "outline/files/file-text" |
    "outline/files/file-upload-2" |
    "outline/files/file-upload-3" |
    "outline/files/file-upload" |
    "outline/files/file-user" |
    "outline/files/file-vector" |
    "outline/files/file" |
    "outline/files/folder-2" |
    "outline/files/folder-3" |
    "outline/files/folder-add" |
    "outline/files/folder-alert" |
    "outline/files/folder-audio" |
    "outline/files/folder-bookmark" |
    "outline/files/folder-chart-bar" |
    "outline/files/folder-chart-pie" |
    "outline/files/folder-check" |
    "outline/files/folder-cloud" |
    "outline/files/folder-dev" |
    "outline/files/folder-download" |
    "outline/files/folder-edit" |
    "outline/files/folder-favorite" |
    "outline/files/folder-gallery" |
    "outline/files/folder-history" |
    "outline/files/folder-image" |
    "outline/files/folder-info" |
    "outline/files/folder-link" |
    "outline/files/folder-locked" |
    "outline/files/folder-money" |
    "outline/files/folder-music" |
    "outline/files/folder-no-access" |
    "outline/files/folder-play" |
    "outline/files/folder-preferences" |
    "outline/files/folder-question" |
    "outline/files/folder-remove" |
    "outline/files/folder-replace" |
    "outline/files/folder-search" |
    "outline/files/folder-settings" |
    "outline/files/folder-shared" |
    "outline/files/folder-starred" |
    "outline/files/folder-sync" |
    "outline/files/folder-upload" |
    "outline/files/folder-user" |
    "outline/files/folder-vector" |
    "outline/files/folder" |
    "outline/files/layers" |
    "outline/files/news" |
    "outline/files/note" |
    "outline/files/notebook" |
    "outline/files/open-book" |
    "outline/files/open-folder" |
    "outline/files/paper" |
    "outline/files/raw-image" |
    "outline/files/read" |
    "outline/files/research" |
    "outline/files/save-for-later" |
    "outline/files/saved-items" |
    "outline/files/upload-file" |
    "outline/files/zipped-file" |
    "outline/development/3d-29" |
    "outline/development/3d-model" |
    "outline/development/ai-generated-img" |
    "outline/development/album" |
    "outline/development/align-bottom" |
    "outline/development/align-center-horizontal" |
    "outline/development/align-center-vertical" |
    "outline/development/align-left" |
    "outline/development/align-right" |
    "outline/development/align-top" |
    "outline/development/android" |
    "outline/development/angle" |
    "outline/development/animation-14" |
    "outline/development/animation-31" |
    "outline/development/animation-32" |
    "outline/development/api" |
    "outline/development/app-store" |
    "outline/development/app" |
    "outline/development/apple" |
    "outline/development/apps" |
    "outline/development/arrow-tool" |
    "outline/development/artboard" |
    "outline/development/binary-code" |
    "outline/development/blend" |
    "outline/development/block" |
    "outline/development/blockchain" |
    "outline/development/board-2" |
    "outline/development/book-bookmark-2" |
    "outline/development/book-bookmark" |
    "outline/development/book-open-2" |
    "outline/development/book-open" |
    "outline/development/border-radius" |
    "outline/development/border-width" |
    "outline/development/border" |
    "outline/development/browser-chrome" |
    "outline/development/browser-edge-legacy" |
    "outline/development/browser-edge" |
    "outline/development/browser-firefox" |
    "outline/development/browser-ie" |
    "outline/development/browser-opera" |
    "outline/development/browser-safari" |
    "outline/development/brush" |
    "outline/development/bucket" |
    "outline/development/bullet-list-67" |
    "outline/development/bullet-list-68" |
    "outline/development/bullet-list-69" |
    "outline/development/bullet-list-70" |
    "outline/development/button-2" |
    "outline/development/canvas" |
    "outline/development/cards" |
    "outline/development/clone" |
    "outline/development/code-editor" |
    "outline/development/code" |
    "outline/development/collection" |
    "outline/development/command" |
    "outline/development/compare-items" |
    "outline/development/compass" |
    "outline/development/components" |
    "outline/development/contrast-2" |
    "outline/development/copy" |
    "outline/development/creative-commons" |
    "outline/development/crop" |
    "outline/development/css3" |
    "outline/development/cursor-48" |
    "outline/development/cursor-49" |
    "outline/development/cursor-add" |
    "outline/development/cursor-grab" |
    "outline/development/cursor-load" |
    "outline/development/cursor-menu" |
    "outline/development/cursor-not-allowed" |
    "outline/development/cursor-pointer" |
    "outline/development/cursor-text" |
    "outline/development/data-table" |
    "outline/development/decision-process" |
    "outline/development/depth" |
    "outline/development/design-system" |
    "outline/development/design" |
    "outline/development/digital-image" |
    "outline/development/distribute-horizontal" |
    "outline/development/distribute-vertical" |
    "outline/development/divider" |
    "outline/development/drag" |
    "outline/development/drop-15" |
    "outline/development/duplicate" |
    "outline/development/edit-curves" |
    "outline/development/edit-levels" |
    "outline/development/empty" |
    "outline/development/eraser-32" |
    "outline/development/eraser-33" |
    "outline/development/eraser-46" |
    "outline/development/fairy-wand" |
    "outline/development/filter-organization" |
    "outline/development/flip-horizontal" |
    "outline/development/flip-vertical" |
    "outline/development/floors" |
    "outline/development/form" |
    "outline/development/frame" |
    "outline/development/function" |
    "outline/development/geometry" |
    "outline/development/git-commit" |
    "outline/development/gradient" |
    "outline/development/grain-effect" |
    "outline/development/graphics-tablet" |
    "outline/development/grid-system" |
    "outline/development/group" |
    "outline/development/hash-mark" |
    "outline/development/height-2" |
    "outline/development/hot-key" |
    "outline/development/html5" |
    "outline/development/image-2" |
    "outline/development/image" |
    "outline/development/img-stack" |
    "outline/development/invert-process" |
    "outline/development/js-console" |
    "outline/development/json-logo" |
    "outline/development/ladybug" |
    "outline/development/layers-2" |
    "outline/development/layers" |
    "outline/development/layout-11" |
    "outline/development/layout-25" |
    "outline/development/layout-grid" |
    "outline/development/layout" |
    "outline/development/license-key" |
    "outline/development/magic-wand" |
    "outline/development/magnet" |
    "outline/development/markdown" |
    "outline/development/marker" |
    "outline/development/mask-oval" |
    "outline/development/mask-rect" |
    "outline/development/measure-02" |
    "outline/development/measure-17" |
    "outline/development/measure-big" |
    "outline/development/microsoft" |
    "outline/development/mirror-display" |
    "outline/development/mirror-tablet-phone" |
    "outline/development/mobile-design" |
    "outline/development/mobile-dev" |
    "outline/development/mobile-phone" |
    "outline/development/mouse-2" |
    "outline/development/mouse" |
    "outline/development/move-down-2" |
    "outline/development/move-up-2" |
    "outline/development/move" |
    "outline/development/newsletter-dev" |
    "outline/development/note-code" |
    "outline/development/note" |
    "outline/development/octagon-m" |
    "outline/development/octagon" |
    "outline/development/paint-16" |
    "outline/development/paint-37" |
    "outline/development/paint-38" |
    "outline/development/paint-brush" |
    "outline/development/paint-bucket-39" |
    "outline/development/paint-bucket-40" |
    "outline/development/palette" |
    "outline/development/pantone" |
    "outline/development/paper-design" |
    "outline/development/paper-dev" |
    "outline/development/paragraph-2" |
    "outline/development/patch-19" |
    "outline/development/patch-34" |
    "outline/development/path-exclude" |
    "outline/development/path-intersect" |
    "outline/development/path-minus" |
    "outline/development/path-unite" |
    "outline/development/pc-mouse" |
    "outline/development/pen-01" |
    "outline/development/pen-23" |
    "outline/development/pen-tool" |
    "outline/development/photo-album" |
    "outline/development/photo-editor" |
    "outline/development/pilcrow" |
    "outline/development/plug-2" |
    "outline/development/position" |
    "outline/development/priority-high" |
    "outline/development/priority-highest" |
    "outline/development/priority-low" |
    "outline/development/priority-lowest" |
    "outline/development/priority-normal" |
    "outline/development/prototype" |
    "outline/development/refresh-02" |
    "outline/development/roadmap" |
    "outline/development/row-table" |
    "outline/development/ruler-pencil" |
    "outline/development/scale-2" |
    "outline/development/scale-down" |
    "outline/development/scale-up" |
    "outline/development/scissors-dashed" |
    "outline/development/scissors" |
    "outline/development/selection" |
    "outline/development/shape-adjust" |
    "outline/development/shape-arrow" |
    "outline/development/shape-circle" |
    "outline/development/shape-custom" |
    "outline/development/shape-line" |
    "outline/development/shape-oval" |
    "outline/development/shape-polygon-2" |
    "outline/development/shape-polygon" |
    "outline/development/shape-rectangle" |
    "outline/development/shape-square" |
    "outline/development/shape-star" |
    "outline/development/shape-triangle-2" |
    "outline/development/shape-triangle" |
    "outline/development/shapes" |
    "outline/development/sharpener" |
    "outline/development/sidebar" |
    "outline/development/size-large" |
    "outline/development/size-medium" |
    "outline/development/size-small" |
    "outline/development/slice" |
    "outline/development/slider" |
    "outline/development/space-divider" |
    "outline/development/sparks" |
    "outline/development/spray-can" |
    "outline/development/stack" |
    "outline/development/stamp" |
    "outline/development/style" |
    "outline/development/tablet-mobile" |
    "outline/development/texture" |
    "outline/development/three-dimensional-object" |
    "outline/development/time-machine" |
    "outline/development/timeline" |
    "outline/development/todo" |
    "outline/development/tool-blur" |
    "outline/development/tool-hand" |
    "outline/development/tool-select" |
    "outline/development/transactions" |
    "outline/development/transform-2d" |
    "outline/development/transform-origin" |
    "outline/development/transform" |
    "outline/development/transparent" |
    "outline/development/type-tool" |
    "outline/development/typography" |
    "outline/development/ungroup" |
    "outline/development/usb" |
    "outline/development/vector" |
    "outline/development/vibrance" |
    "outline/development/wand" |
    "outline/development/watch-dev" |
    "outline/development/web-design" |
    "outline/development/webpage" |
    "outline/development/width" |
    "outline/development/window-code" |
    "outline/development/window-dev" |
    "outline/development/window-paragraph" |
    "outline/development/window-responsive" |
    "outline/development/wireframe" |
    "outline/development/zoom" |
    "fill/development/icon" |
    "fill/development/3d-29" |
    "fill/development/3d-model" |
    "fill/development/ai-generated-img" |
    "fill/development/album" |
    "fill/development/align-bottom" |
    "fill/development/align-center-horizontal" |
    "fill/development/align-center-vertical" |
    "fill/development/align-left" |
    "fill/development/align-right" |
    "fill/development/align-top" |
    "fill/development/android" |
    "fill/development/angle" |
    "fill/development/animation-14" |
    "fill/development/animation-31" |
    "fill/development/animation-32" |
    "fill/development/api" |
    "fill/development/app-store" |
    "fill/development/app" |
    "fill/development/apple" |
    "fill/development/apps" |
    "fill/development/arrow-tool" |
    "fill/development/artboard" |
    "fill/development/binary-code" |
    "fill/development/blend" |
    "fill/development/block" |
    "fill/development/blockchain" |
    "fill/development/board-2" |
    "fill/development/book-bookmark-2" |
    "fill/development/book-bookmark" |
    "fill/development/book-open-2" |
    "fill/development/book-open" |
    "fill/development/border-radius" |
    "fill/development/border-width" |
    "fill/development/border" |
    "fill/development/browser-chrome" |
    "fill/development/browser-edge-legacy" |
    "fill/development/browser-edge" |
    "fill/development/browser-firefox" |
    "fill/development/browser-ie" |
    "fill/development/browser-opera" |
    "fill/development/browser-safari" |
    "fill/development/brush" |
    "fill/development/bucket" |
    "fill/development/bullet-list-67" |
    "fill/development/bullet-list-68" |
    "fill/development/bullet-list-69" |
    "fill/development/bullet-list-70" |
    "fill/development/button-2" |
    "fill/development/canvas" |
    "fill/development/cards" |
    "fill/development/clone" |
    "fill/development/code-editor" |
    "fill/development/code" |
    "fill/development/collection" |
    "fill/development/command" |
    "fill/development/compare-items" |
    "fill/development/compass" |
    "fill/development/components" |
    "fill/development/contrast-2" |
    "fill/development/copy" |
    "fill/development/creative-commons" |
    "fill/development/crop" |
    "fill/development/css3" |
    "fill/development/cursor-48" |
    "fill/development/cursor-49" |
    "fill/development/cursor-add" |
    "fill/development/cursor-grab" |
    "fill/development/cursor-load" |
    "fill/development/cursor-menu" |
    "fill/development/cursor-not-allowed" |
    "fill/development/cursor-pointer" |
    "fill/development/cursor-text" |
    "fill/development/data-table" |
    "fill/development/decision-process" |
    "fill/development/depth" |
    "fill/development/design-system" |
    "fill/development/design" |
    "fill/development/devto" |
    "fill/development/digital-image" |
    "fill/development/distribute-horizontal" |
    "fill/development/distribute-vertical" |
    "fill/development/divider" |
    "fill/development/drag" |
    "fill/development/drop-15" |
    "fill/development/duplicate" |
    "fill/development/edit-curves" |
    "fill/development/edit-levels" |
    "fill/development/empty" |
    "fill/development/eraser-32" |
    "fill/development/eraser-33" |
    "fill/development/eraser-46" |
    "fill/development/fairy-wand" |
    "fill/development/filter-organization" |
    "fill/development/flip-horizontal" |
    "fill/development/flip-vertical" |
    "fill/development/floors" |
    "fill/development/form" |
    "fill/development/frame" |
    "fill/development/function" |
    "fill/development/geometry" |
    "fill/development/git-commit" |
    "fill/development/gradient" |
    "fill/development/grain-effect" |
    "fill/development/graphics-tablet" |
    "fill/development/grid-system" |
    "fill/development/group" |
    "fill/development/hash-mark" |
    "fill/development/height-2" |
    "fill/development/hot-key" |
    "fill/development/html5" |
    "fill/development/image-2" |
    "fill/development/image" |
    "fill/development/img-stack" |
    "fill/development/invert-process" |
    "fill/development/js-console" |
    "fill/development/json-logo" |
    "fill/development/ladybug" |
    "fill/development/layers-2" |
    "fill/development/layers" |
    "fill/development/layout-11" |
    "fill/development/layout-25" |
    "fill/development/layout-grid" |
    "fill/development/license-key" |
    "fill/development/linux" |
    "fill/development/magic-wand" |
    "fill/development/magnet" |
    "fill/development/markdown" |
    "fill/development/marker" |
    "fill/development/mask-oval" |
    "fill/development/mask-rect" |
    "fill/development/measure-02" |
    "fill/development/measure-17" |
    "fill/development/measure-big" |
    "fill/development/microsoft" |
    "fill/development/mirror-display" |
    "fill/development/mirror-tablet-phone" |
    "fill/development/mobile-design" |
    "fill/development/mobile-dev" |
    "fill/development/mobile-phone" |
    "fill/development/mouse-2" |
    "fill/development/mouse" |
    "fill/development/move-down-2" |
    "fill/development/move-up-2" |
    "fill/development/move" |
    "fill/development/newsletter-dev" |
    "fill/development/note-code" |
    "fill/development/note" |
    "fill/development/octagon-m" |
    "fill/development/octagon" |
    "fill/development/paint-16" |
    "fill/development/paint-37" |
    "fill/development/paint-38" |
    "fill/development/paint-brush" |
    "fill/development/paint-bucket-39" |
    "fill/development/paint-bucket-40" |
    "fill/development/palette" |
    "fill/development/pantone" |
    "fill/development/paper-design" |
    "fill/development/paper-dev" |
    "fill/development/paragraph-2" |
    "fill/development/patch-19" |
    "fill/development/patch-34" |
    "fill/development/path-exclude" |
    "fill/development/path-intersect" |
    "fill/development/path-minus" |
    "fill/development/path-unite" |
    "fill/development/pc-mouse" |
    "fill/development/pen-01" |
    "fill/development/pen-23" |
    "fill/development/pen-tool" |
    "fill/development/photo-album" |
    "fill/development/photo-editor" |
    "fill/development/pilcrow" |
    "fill/development/plug-2" |
    "fill/development/position" |
    "fill/development/priority-high" |
    "fill/development/priority-highest" |
    "fill/development/priority-low" |
    "fill/development/priority-lowest" |
    "fill/development/priority-normal" |
    "fill/development/prototype" |
    "fill/development/refresh-02" |
    "fill/development/roadmap" |
    "fill/development/row-table" |
    "fill/development/ruler-pencil" |
    "fill/development/scale-2" |
    "fill/development/scale-down" |
    "fill/development/scale-up" |
    "fill/development/scissors-dashed" |
    "fill/development/scissors" |
    "fill/development/selection" |
    "fill/development/shape-adjust" |
    "fill/development/shape-arrow" |
    "fill/development/shape-circle" |
    "fill/development/shape-custom" |
    "fill/development/shape-line" |
    "fill/development/shape-oval" |
    "fill/development/shape-polygon-2" |
    "fill/development/shape-polygon" |
    "fill/development/shape-rectangle" |
    "fill/development/shape-square" |
    "fill/development/shape-star" |
    "fill/development/shape-triangle-2" |
    "fill/development/shape-triangle" |
    "fill/development/shapes" |
    "fill/development/sharpener" |
    "fill/development/sidebar" |
    "fill/development/size-large" |
    "fill/development/size-medium" |
    "fill/development/size-small" |
    "fill/development/slice" |
    "fill/development/slider" |
    "fill/development/space-divider" |
    "fill/development/sparks" |
    "fill/development/spray-can" |
    "fill/development/stack" |
    "fill/development/stamp" |
    "fill/development/style" |
    "fill/development/tablet-mobile" |
    "fill/development/texture" |
    "fill/development/three-dimensional-object" |
    "fill/development/time-machine" |
    "fill/development/timeline" |
    "fill/development/todo" |
    "fill/development/tool-blur" |
    "fill/development/tool-hand" |
    "fill/development/tool-select" |
    "fill/development/transactions" |
    "fill/development/transform-2d" |
    "fill/development/transform-origin" |
    "fill/development/transform" |
    "fill/development/transparent" |
    "fill/development/type-tool" |
    "fill/development/typography" |
    "fill/development/ungroup" |
    "fill/development/usb" |
    "fill/development/vector" |
    "fill/development/vibrance" |
    "fill/development/wand" |
    "fill/development/watch-dev" |
    "fill/development/web-design" |
    "fill/development/webpage" |
    "fill/development/width" |
    "fill/development/window-code" |
    "fill/development/window-dev" |
    "fill/development/window-paragraph" |
    "fill/development/window-responsive" |
    "fill/development/wireframe" |
    "fill/development/zoom" |
    "fill/user interface/a-chart" |
    "fill/user interface/a-chat" |
    "fill/user interface/a-tag-add" |
    "fill/user interface/a-tag-remove" |
    "fill/user interface/a-tag" |
    "fill/user interface/access-key" |
    "fill/user interface/add-fav" |
    "fill/user interface/add-favorite" |
    "fill/user interface/add-like" |
    "fill/user interface/add-notification" |
    "fill/user interface/add-to-cart-2" |
    "fill/user interface/add-to-cart" |
    "fill/user interface/add" |
    "fill/user interface/alarm-add" |
    "fill/user interface/alarm-disable" |
    "fill/user interface/alarm" |
    "fill/user interface/analytics" |
    "fill/user interface/app-store" |
    "fill/user interface/apps" |
    "fill/user interface/archive-drawer" |
    "fill/user interface/archive" |
    "fill/user interface/at-sign" |
    "fill/user interface/attach" |
    "fill/user interface/attachment" |
    "fill/user interface/b-chart" |
    "fill/user interface/b-comment" |
    "fill/user interface/b-eye" |
    "fill/user interface/backward" |
    "fill/user interface/ban" |
    "fill/user interface/basket" |
    "fill/user interface/battery-charging" |
    "fill/user interface/battery-low" |
    "fill/user interface/battery-power" |
    "fill/user interface/battery-status" |
    "fill/user interface/bell" |
    "fill/user interface/bin" |
    "fill/user interface/blog" |
    "fill/user interface/bluetooth" |
    "fill/user interface/board-2" |
    "fill/user interface/bolt" |
    "fill/user interface/book" |
    "fill/user interface/bookmark-add-2" |
    "fill/user interface/bookmark-add" |
    "fill/user interface/bookmark-delete-2" |
    "fill/user interface/bookmark-delete" |
    "fill/user interface/bookmark" |
    "fill/user interface/bookmarks" |
    "fill/user interface/bullet-list" |
    "fill/user interface/buzz" |
    "fill/user interface/c-add" |
    "fill/user interface/c-check" |
    "fill/user interface/c-delete" |
    "fill/user interface/c-edit" |
    "fill/user interface/c-info" |
    "fill/user interface/c-pulse" |
    "fill/user interface/c-question" |
    "fill/user interface/c-remove" |
    "fill/user interface/c-warning" |
    "fill/user interface/calendar-2" |
    "fill/user interface/calendar-date-2" |
    "fill/user interface/calendar-date" |
    "fill/user interface/calendar-day-view" |
    "fill/user interface/calendar-event-2" |
    "fill/user interface/calendar-event-create" |
    "fill/user interface/calendar-event" |
    "fill/user interface/calendar" |
    "fill/user interface/chain" |
    "fill/user interface/chart" |
    "fill/user interface/chat" |
    "fill/user interface/check-all" |
    "fill/user interface/check-double" |
    "fill/user interface/check-in" |
    "fill/user interface/check-list" |
    "fill/user interface/check-out" |
    "fill/user interface/check-single" |
    "fill/user interface/check" |
    "fill/user interface/checkbox-btn-checked" |
    "fill/user interface/checkbox-btn" |
    "fill/user interface/chemistry" |
    "fill/user interface/clear-data" |
    "fill/user interface/clock" |
    "fill/user interface/cloud-forecast" |
    "fill/user interface/cloud" |
    "fill/user interface/cogwheel" |
    "fill/user interface/comment-add" |
    "fill/user interface/comment" |
    "fill/user interface/comments" |
    "fill/user interface/compare-items" |
    "fill/user interface/components" |
    "fill/user interface/configuration-tools" |
    "fill/user interface/control-panel" |
    "fill/user interface/d-add" |
    "fill/user interface/d-chart" |
    "fill/user interface/d-check" |
    "fill/user interface/d-delete" |
    "fill/user interface/d-edit" |
    "fill/user interface/d-remove" |
    "fill/user interface/dashboard" |
    "fill/user interface/data-download" |
    "fill/user interface/data-settings" |
    "fill/user interface/data-upload" |
    "fill/user interface/database" |
    "fill/user interface/delete-forever" |
    "fill/user interface/delete" |
    "fill/user interface/design-system" |
    "fill/user interface/disk" |
    "fill/user interface/dock-bottom" |
    "fill/user interface/dock-left" |
    "fill/user interface/dock-right" |
    "fill/user interface/dock-top" |
    "fill/user interface/download" |
    "fill/user interface/drop" |
    "fill/user interface/e-add" |
    "fill/user interface/e-delete" |
    "fill/user interface/e-remove" |
    "fill/user interface/edit-note" |
    "fill/user interface/edit" |
    "fill/user interface/email-open" |
    "fill/user interface/email" |
    "fill/user interface/empty" |
    "fill/user interface/enlarge" |
    "fill/user interface/event-confirm" |
    "fill/user interface/event-create" |
    "fill/user interface/exclamation-mark" |
    "fill/user interface/eye" |
    "fill/user interface/f-add" |
    "fill/user interface/f-chat" |
    "fill/user interface/f-check" |
    "fill/user interface/f-comment" |
    "fill/user interface/f-dashboard" |
    "fill/user interface/f-delete" |
    "fill/user interface/f-remove" |
    "fill/user interface/fav-list" |
    "fill/user interface/fav-remove" |
    "fill/user interface/favorite" |
    "fill/user interface/feedback" |
    "fill/user interface/file-add" |
    "fill/user interface/file-article" |
    "fill/user interface/file-delete" |
    "fill/user interface/file-text" |
    "fill/user interface/filter-check" |
    "fill/user interface/filter-remove" |
    "fill/user interface/filter-tool" |
    "fill/user interface/filter" |
    "fill/user interface/find-replace" |
    "fill/user interface/flame" |
    "fill/user interface/floors" |
    "fill/user interface/floppy-disk" |
    "fill/user interface/forward" |
    "fill/user interface/full-screen" |
    "fill/user interface/fullsize" |
    "fill/user interface/funnel" |
    "fill/user interface/g-chart" |
    "fill/user interface/g-check" |
    "fill/user interface/gallery-layout" |
    "fill/user interface/gallery-view" |
    "fill/user interface/gantt" |
    "fill/user interface/gear" |
    "fill/user interface/geometry" |
    "fill/user interface/grid-interface" |
    "fill/user interface/grid-layout" |
    "fill/user interface/grid-view" |
    "fill/user interface/heart" |
    "fill/user interface/hide" |
    "fill/user interface/home-2" |
    "fill/user interface/home-3" |
    "fill/user interface/home" |
    "fill/user interface/hot-key" |
    "fill/user interface/hotspot" |
    "fill/user interface/hourglass" |
    "fill/user interface/house" |
    "fill/user interface/hyperlink-broken" |
    "fill/user interface/hyperlink" |
    "fill/user interface/i-add" |
    "fill/user interface/i-check" |
    "fill/user interface/i-delete" |
    "fill/user interface/i-edit" |
    "fill/user interface/i-remove" |
    "fill/user interface/incognito" |
    "fill/user interface/increase" |
    "fill/user interface/infinite" |
    "fill/user interface/info" |
    "fill/user interface/key" |
    "fill/user interface/label" |
    "fill/user interface/layout-grid" |
    "fill/user interface/leaf" |
    "fill/user interface/leave" |
    "fill/user interface/letter" |
    "fill/user interface/lifering" |
    "fill/user interface/light-control" |
    "fill/user interface/like" |
    "fill/user interface/link" |
    "fill/user interface/lock" |
    "fill/user interface/log-out" |
    "fill/user interface/magnifier-zoom-in" |
    "fill/user interface/magnifier-zoom-out" |
    "fill/user interface/magnifier" |
    "fill/user interface/mail" |
    "fill/user interface/megaphone" |
    "fill/user interface/menu-2" |
    "fill/user interface/menu-3" |
    "fill/user interface/menu-4" |
    "fill/user interface/menu-6" |
    "fill/user interface/menu-7" |
    "fill/user interface/menu-8" |
    "fill/user interface/menu-dots" |
    "fill/user interface/menu" |
    "fill/user interface/metrics" |
    "fill/user interface/mirror-tablet-phone" |
    "fill/user interface/n-check" |
    "fill/user interface/n-edit" |
    "fill/user interface/network-communication" |
    "fill/user interface/network-connection" |
    "fill/user interface/networking" |
    "fill/user interface/new-notification" |
    "fill/user interface/news" |
    "fill/user interface/no-results" |
    "fill/user interface/note" |
    "fill/user interface/notification-2" |
    "fill/user interface/notification" |
    "fill/user interface/o-check" |
    "fill/user interface/o-warning" |
    "fill/user interface/offline" |
    "fill/user interface/opening-times" |
    "fill/user interface/options" |
    "fill/user interface/p-chart" |
    "fill/user interface/padlock-unlocked" |
    "fill/user interface/padlock" |
    "fill/user interface/paragraph" |
    "fill/user interface/password" |
    "fill/user interface/pen-2" |
    "fill/user interface/pen" |
    "fill/user interface/pencil" |
    "fill/user interface/phone-call-end" |
    "fill/user interface/phone-call" |
    "fill/user interface/phone" |
    "fill/user interface/plant-leaf" |
    "fill/user interface/playlist" |
    "fill/user interface/preferences" |
    "fill/user interface/present" |
    "fill/user interface/privacy-settings" |
    "fill/user interface/privacy" |
    "fill/user interface/progress-2" |
    "fill/user interface/progress-indicator" |
    "fill/user interface/question-mark" |
    "fill/user interface/questionnaire" |
    "fill/user interface/r-chat" |
    "fill/user interface/radio-btn-checked" |
    "fill/user interface/radio-btn" |
    "fill/user interface/remove-fav" |
    "fill/user interface/remove-favorite" |
    "fill/user interface/remove-like" |
    "fill/user interface/remove" |
    "fill/user interface/roadmap" |
    "fill/user interface/s-add" |
    "fill/user interface/s-ban" |
    "fill/user interface/s-check" |
    "fill/user interface/s-delete" |
    "fill/user interface/s-edit" |
    "fill/user interface/s-info" |
    "fill/user interface/s-pulse" |
    "fill/user interface/s-question" |
    "fill/user interface/s-remove" |
    "fill/user interface/s-warning" |
    "fill/user interface/save-for-later" |
    "fill/user interface/save-to-list" |
    "fill/user interface/saved-items" |
    "fill/user interface/screen-enlarge" |
    "fill/user interface/screen-expand" |
    "fill/user interface/screen-maximize" |
    "fill/user interface/screen-sharing-2" |
    "fill/user interface/screen-sharing-off-2" |
    "fill/user interface/search-content" |
    "fill/user interface/search-zoom-in" |
    "fill/user interface/search-zoom-out" |
    "fill/user interface/search" |
    "fill/user interface/security" |
    "fill/user interface/segmentation" |
    "fill/user interface/select" |
    "fill/user interface/send-message" |
    "fill/user interface/send" |
    "fill/user interface/settings-gear" |
    "fill/user interface/settings-wheel" |
    "fill/user interface/settings" |
    "fill/user interface/setup-options" |
    "fill/user interface/setup-preferences" |
    "fill/user interface/setup-tools" |
    "fill/user interface/share" |
    "fill/user interface/sharing" |
    "fill/user interface/shop" |
    "fill/user interface/shopping-bag" |
    "fill/user interface/shopping-cart-2" |
    "fill/user interface/shopping-cart" |
    "fill/user interface/shopping-label" |
    "fill/user interface/shopping-tag" |
    "fill/user interface/sidebar" |
    "fill/user interface/slide-left" |
    "fill/user interface/slide-right" |
    "fill/user interface/social-sharing" |
    "fill/user interface/sort-tool" |
    "fill/user interface/spaceship" |
    "fill/user interface/speedometer" |
    "fill/user interface/stack" |
    "fill/user interface/star-rate" |
    "fill/user interface/star" |
    "fill/user interface/stopwatch" |
    "fill/user interface/support" |
    "fill/user interface/survey" |
    "fill/user interface/switches" |
    "fill/user interface/system-configuration" |
    "fill/user interface/system-preferences" |
    "fill/user interface/t-add" |
    "fill/user interface/t-delete" |
    "fill/user interface/t-remove" |
    "fill/user interface/table-layout" |
    "fill/user interface/table-move" |
    "fill/user interface/table-slide" |
    "fill/user interface/tag" |
    "fill/user interface/tags-stack" |
    "fill/user interface/target" |
    "fill/user interface/telephone" |
    "fill/user interface/time-alarm" |
    "fill/user interface/time-clock" |
    "fill/user interface/time-machine" |
    "fill/user interface/timeline" |
    "fill/user interface/toggle" |
    "fill/user interface/translation" |
    "fill/user interface/trash-can" |
    "fill/user interface/trash" |
    "fill/user interface/unlink" |
    "fill/user interface/unlocked" |
    "fill/user interface/upload" |
    "fill/user interface/url" |
    "fill/user interface/verified" |
    "fill/user interface/video-gallery" |
    "fill/user interface/view" |
    "fill/user interface/virtual-assistant-2" |
    "fill/user interface/warning-sign" |
    "fill/user interface/web-hyperlink" |
    "fill/user interface/web-link" |
    "fill/user interface/web-url" |
    "fill/user interface/webpage" |
    "fill/user interface/widget" |
    "fill/user interface/window-add" |
    "fill/user interface/window-delete" |
    "fill/user interface/wireframe" |
    "fill/user interface/wrench-tool" |
    "fill/user interface/wrench" |
    "fill/user interface/zoom-in" |
    "fill/user interface/zoom-out" |
    "fill/user interface/zoom" |
    "fill/files/archive-check" |
    "fill/files/archive-content" |
    "fill/files/archive-doc-check" |
    "fill/files/archive-doc" |
    "fill/files/archive-drawer" |
    "fill/files/archive-file-check" |
    "fill/files/archive-file" |
    "fill/files/archive" |
    "fill/files/backup" |
    "fill/files/box" |
    "fill/files/browse" |
    "fill/files/catalog" |
    "fill/files/clear-data" |
    "fill/files/compressed-file" |
    "fill/files/computer-upload" |
    "fill/files/copy-2" |
    "fill/files/doc-folder" |
    "fill/files/document-2" |
    "fill/files/document-copy" |
    "fill/files/document" |
    "fill/files/drawer" |
    "fill/files/file-2" |
    "fill/files/file-add" |
    "fill/files/file-alert" |
    "fill/files/file-archive" |
    "fill/files/file-article" |
    "fill/files/file-audio-2" |
    "fill/files/file-audio" |
    "fill/files/file-bookmark" |
    "fill/files/file-chart-bar" |
    "fill/files/file-chart-pie" |
    "fill/files/file-check" |
    "fill/files/file-cloud" |
    "fill/files/file-copies" |
    "fill/files/file-copy" |
    "fill/files/file-delete" |
    "fill/files/file-dev" |
    "fill/files/file-download-3" |
    "fill/files/file-download" |
    "fill/files/file-edit" |
    "fill/files/file-export" |
    "fill/files/file-favorite" |
    "fill/files/file-folder" |
    "fill/files/file-gallery" |
    "fill/files/file-history" |
    "fill/files/file-image" |
    "fill/files/file-import" |
    "fill/files/file-info" |
    "fill/files/file-link" |
    "fill/files/file-locked" |
    "fill/files/file-money" |
    "fill/files/file-new" |
    "fill/files/file-no-access" |
    "fill/files/file-play" |
    "fill/files/file-preferences" |
    "fill/files/file-question" |
    "fill/files/file-remove" |
    "fill/files/file-replace" |
    "fill/files/file-search" |
    "fill/files/file-settings" |
    "fill/files/file-shared" |
    "fill/files/file-starred" |
    "fill/files/file-sync" |
    "fill/files/file-text" |
    "fill/files/file-upload-2" |
    "fill/files/file-upload-3" |
    "fill/files/file-upload" |
    "fill/files/file-user" |
    "fill/files/file-vector" |
    "fill/files/file" |
    "fill/files/folder-2" |
    "fill/files/folder-3" |
    "fill/files/folder-add" |
    "fill/files/folder-alert" |
    "fill/files/folder-audio" |
    "fill/files/folder-bookmark" |
    "fill/files/folder-chart-bar" |
    "fill/files/folder-chart-pie" |
    "fill/files/folder-check" |
    "fill/files/folder-cloud" |
    "fill/files/folder-dev" |
    "fill/files/folder-download" |
    "fill/files/folder-edit" |
    "fill/files/folder-favorite" |
    "fill/files/folder-gallery" |
    "fill/files/folder-history" |
    "fill/files/folder-image" |
    "fill/files/folder-info" |
    "fill/files/folder-link" |
    "fill/files/folder-locked" |
    "fill/files/folder-money" |
    "fill/files/folder-music" |
    "fill/files/folder-no-access" |
    "fill/files/folder-play" |
    "fill/files/folder-preferences" |
    "fill/files/folder-question" |
    "fill/files/folder-remove" |
    "fill/files/folder-replace" |
    "fill/files/folder-search" |
    "fill/files/folder-settings" |
    "fill/files/folder-shared" |
    "fill/files/folder-starred" |
    "fill/files/folder-sync" |
    "fill/files/folder-upload" |
    "fill/files/folder-user" |
    "fill/files/folder-vector" |
    "fill/files/folder" |
    "fill/files/layers" |
    "fill/files/microsoft-onenote" |
    "fill/files/news" |
    "fill/files/note" |
    "fill/files/notebook" |
    "fill/files/open-book" |
    "fill/files/open-folder" |
    "fill/files/paper" |
    "fill/files/raw-image" |
    "fill/files/read" |
    "fill/files/research" |
    "fill/files/save-for-later" |
    "fill/files/saved-items" |
    "fill/files/upload-file" |
    "fill/files/zipped-file" |
    "fill/education/abc" |
    "fill/education/agenda-bookmark" |
    "fill/education/agenda" |
    "fill/education/album" |
    "fill/education/astronomy" |
    "fill/education/atom" |
    "fill/education/award-49" |
    "fill/education/backpack-57" |
    "fill/education/backpack-58" |
    "fill/education/basketball" |
    "fill/education/biochemistry" |
    "fill/education/biology" |
    "fill/education/board-27" |
    "fill/education/board-51" |
    "fill/education/book-39" |
    "fill/education/book-bookmark-2" |
    "fill/education/book-bookmark" |
    "fill/education/book-open-2" |
    "fill/education/book-open" |
    "fill/education/book" |
    "fill/education/bookmark" |
    "fill/education/books-46" |
    "fill/education/books" |
    "fill/education/botany" |
    "fill/education/brush" |
    "fill/education/bus-front-12" |
    "fill/education/bus" |
    "fill/education/buzz" |
    "fill/education/calculator" |
    "fill/education/certificate" |
    "fill/education/chalkboard" |
    "fill/education/chemistry" |
    "fill/education/cockade" |
    "fill/education/collection" |
    "fill/education/compass" |
    "fill/education/design" |
    "fill/education/earth-science" |
    "fill/education/ecology" |
    "fill/education/equation" |
    "fill/education/eraser-32" |
    "fill/education/eraser-33" |
    "fill/education/flask" |
    "fill/education/function" |
    "fill/education/geometry" |
    "fill/education/glasses-2" |
    "fill/education/glasses" |
    "fill/education/globe-2" |
    "fill/education/globe" |
    "fill/education/grammar-check" |
    "fill/education/hat-3" |
    "fill/education/language" |
    "fill/education/logic" |
    "fill/education/marker" |
    "fill/education/math" |
    "fill/education/measure-02" |
    "fill/education/measure-17" |
    "fill/education/measure-big" |
    "fill/education/medal" |
    "fill/education/medicine" |
    "fill/education/microbiology" |
    "fill/education/microscope" |
    "fill/education/molecule" |
    "fill/education/notepad" |
    "fill/education/notes" |
    "fill/education/notification" |
    "fill/education/open-book" |
    "fill/education/paper-diploma" |
    "fill/education/paper" |
    "fill/education/paw" |
    "fill/education/pc-play-media" |
    "fill/education/pen-01" |
    "fill/education/pen-23" |
    "fill/education/pen-tool" |
    "fill/education/pencil-47" |
    "fill/education/pencil" |
    "fill/education/pendulum" |
    "fill/education/planet" |
    "fill/education/potion" |
    "fill/education/presentation" |
    "fill/education/rat" |
    "fill/education/read" |
    "fill/education/reading" |
    "fill/education/research" |
    "fill/education/saved-items" |
    "fill/education/school" |
    "fill/education/soccer-ball" |
    "fill/education/statistics" |
    "fill/education/survey" |
    "fill/education/telescope" |
    "fill/education/translation" |
    "fill/education/typography" |
    "fill/users/accessibility" |
    "fill/users/account" |
    "fill/users/address-book" |
    "fill/users/child" |
    "fill/users/contact-list" |
    "fill/users/contact" |
    "fill/users/contacts" |
    "fill/users/couple-gay" |
    "fill/users/couple-lesbian" |
    "fill/users/diaper-changing-area" |
    "fill/users/doctor" |
    "fill/users/exchange" |
    "fill/users/face-man" |
    "fill/users/face-woman" |
    "fill/users/family-roof" |
    "fill/users/family" |
    "fill/users/farmer" |
    "fill/users/female-figure" |
    "fill/users/female-sign" |
    "fill/users/file-shared" |
    "fill/users/file-user" |
    "fill/users/folder-shared" |
    "fill/users/folder-user" |
    "fill/users/gathering-restrictions" |
    "fill/users/grandparent" |
    "fill/users/hacker" |
    "fill/users/hair-man" |
    "fill/users/hair-woman" |
    "fill/users/humanoid" |
    "fill/users/info-point" |
    "fill/users/interview" |
    "fill/users/joint-account" |
    "fill/users/male-sign" |
    "fill/users/man-arrow-down" |
    "fill/users/man-arrow-up" |
    "fill/users/man-profile" |
    "fill/users/man" |
    "fill/users/meeting" |
    "fill/users/mickey-mouse" |
    "fill/users/miner" |
    "fill/users/mobile-contact" |
    "fill/users/negative-judgement" |
    "fill/users/no-contact" |
    "fill/users/office-badge" |
    "fill/users/office-pass" |
    "fill/users/parenting" |
    "fill/users/payee" |
    "fill/users/payor" |
    "fill/users/people-network" |
    "fill/users/police-officer" |
    "fill/users/positive-judgement" |
    "fill/users/pregnant-woman" |
    "fill/users/privacy-policy" |
    "fill/users/profile" |
    "fill/users/property" |
    "fill/users/reading" |
    "fill/users/search-user" |
    "fill/users/security-gate" |
    "fill/users/security-officer" |
    "fill/users/social-distancing" |
    "fill/users/standing-man" |
    "fill/users/standing-woman" |
    "fill/users/stay-home" |
    "fill/users/team" |
    "fill/users/toilette" |
    "fill/users/user-2" |
    "fill/users/user-add" |
    "fill/users/user-bubble" |
    "fill/users/user-c-frame-2" |
    "fill/users/user-c-frame-3" |
    "fill/users/user-c-frame" |
    "fill/users/user-check" |
    "fill/users/user-create" |
    "fill/users/user-delete-cross" |
    "fill/users/user-delete-line" |
    "fill/users/user-delete" |
    "fill/users/user-edit" |
    "fill/users/user-focus" |
    "fill/users/user-group" |
    "fill/users/user-heart" |
    "fill/users/user-list" |
    "fill/users/user-location-2" |
    "fill/users/user-location" |
    "fill/users/user-lock" |
    "fill/users/user-new" |
    "fill/users/user-remove" |
    "fill/users/user-s-frame-2" |
    "fill/users/user-s-frame-3" |
    "fill/users/user-s-frame" |
    "fill/users/user-search" |
    "fill/users/user-share" |
    "fill/users/user-star" |
    "fill/users/user-sync" |
    "fill/users/user-time" |
    "fill/users/user-wearing-glasses" |
    "fill/users/user" |
    "fill/users/users-add" |
    "fill/users/users-check" |
    "fill/users/users-heart" |
    "fill/users/users-location" |
    "fill/users/users-lock" |
    "fill/users/users-meeting" |
    "fill/users/users-mm" |
    "fill/users/users-remove" |
    "fill/users/users-wm" |
    "fill/users/users-ww" |
    "fill/users/users" |
    "fill/users/virtual-assistant-2" |
    "fill/users/voice-record" |
    "fill/users/wc-sign" |
    "fill/users/wheelchair" |
    "fill/users/woman-arrow-down" |
    "fill/users/woman-arrow-up" |
    "fill/users/woman-man" |
    "fill/users/woman-profile" |
    "fill/users/woman" |
    "fill/users/work-badge" |
    "color/social media/devto" |
    "color/social media/discord" |
    "color/social media/google" |
    "color/social media/logo-500px" |
    "color/social media/logo-angellist" |
    "color/social media/logo-behance" |
    "color/social media/logo-blogger" |
    "color/social media/logo-buffer" |
    "color/social media/logo-buysellads" |
    "color/social media/logo-codepen" |
    "color/social media/logo-creative-market" |
    "color/social media/logo-crunchbase" |
    "color/social media/logo-deviantart" |
    "color/social media/logo-dribbble" |
    "color/social media/logo-dropbox" |
    "color/social media/logo-envato" |
    "color/social media/logo-evernote" |
    "color/social media/logo-facebook" |
    "color/social media/logo-fb-simple" |
    "color/social media/logo-feedly" |
    "color/social media/logo-flickr" |
    "color/social media/logo-github" |
    "color/social media/logo-google-plus" |
    "color/social media/logo-instagram" |
    "color/social media/logo-lastfm" |
    "color/social media/logo-linkedin" |
    "color/social media/logo-medium" |
    "color/social media/logo-meetup" |
    "color/social media/logo-messenger" |
    "color/social media/logo-mixer" |
    "color/social media/logo-myspace" |
    "color/social media/logo-paypal" |
    "color/social media/logo-pinterest" |
    "color/social media/logo-product-hunt" |
    "color/social media/logo-qq" |
    "color/social media/logo-reddit" |
    "color/social media/logo-rss" |
    "color/social media/logo-shopify" |
    "color/social media/logo-skype" |
    "color/social media/logo-slack" |
    "color/social media/logo-snapchat" |
    "color/social media/logo-soundcloud" |
    "color/social media/logo-spotify" |
    "color/social media/logo-squarespace" |
    "color/social media/logo-trello" |
    "color/social media/logo-tumblr" |
    "color/social media/logo-twitter" |
    "color/social media/logo-unsplash" |
    "color/social media/logo-vimeo" |
    "color/social media/logo-vine" |
    "color/social media/logo-vk" |
    "color/social media/logo-wechat" |
    "color/social media/logo-weibo" |
    "color/social media/logo-whatsapp" |
    "color/social media/logo-wikipedia" |
    "color/social media/logo-wordpress" |
    "color/social media/logo-yelp" |
    "color/social media/logo-youtube" |
    "color/social media/microsoft-onenote" |
    "color/social media/spectrum" |
    "color/social media/telegram" |
    "color/social media/tiktok" |
    "color/social media/twitch" |
    "fill/social media/discord" |
    "fill/social media/devto" |
    "fill/social media/google" |
    "fill/social media/logo-500px" |
    "fill/social media/logo-angellist" |
    "fill/social media/logo-behance" |
    "fill/social media/logo-blogger" |
    "fill/social media/logo-buffer" |
    "fill/social media/logo-buysellads" |
    "fill/social media/logo-codepen" |
    "fill/social media/logo-creative-market" |
    "fill/social media/logo-crunchbase" |
    "fill/social media/logo-deviantart" |
    "fill/social media/logo-dribbble" |
    "fill/social media/logo-dropbox" |
    "fill/social media/logo-envato" |
    "fill/social media/logo-evernote" |
    "fill/social media/logo-facebook" |
    "fill/social media/logo-fb-simple" |
    "fill/social media/logo-feedly" |
    "fill/social media/logo-flickr" |
    "fill/social media/logo-github" |
    "fill/social media/logo-google-plus" |
    "fill/social media/logo-instagram" |
    "fill/social media/logo-lastfm" |
    "fill/social media/logo-linkedin" |
    "fill/social media/logo-medium" |
    "fill/social media/logo-meetup" |
    "fill/social media/logo-messenger" |
    "fill/social media/logo-mixer" |
    "fill/social media/logo-myspace" |
    "fill/social media/logo-paypal" |
    "fill/social media/logo-pinterest" |
    "fill/social media/logo-product-hunt" |
    "fill/social media/logo-qq" |
    "fill/social media/logo-reddit" |
    "fill/social media/logo-rss" |
    "fill/social media/logo-shopify" |
    "fill/social media/logo-skype" |
    "fill/social media/logo-slack" |
    "fill/social media/logo-snapchat" |
    "fill/social media/logo-soundcloud" |
    "fill/social media/logo-spotify" |
    "fill/social media/logo-squarespace" |
    "fill/social media/logo-trello" |
    "fill/social media/logo-tumblr" |
    "fill/social media/logo-twitter" |
    "fill/social media/logo-unsplash" |
    "fill/social media/logo-vimeo" |
    "fill/social media/logo-vine" |
    "fill/social media/logo-vk" |
    "fill/social media/logo-wechat" |
    "fill/social media/logo-weibo" |
    "fill/social media/logo-whatsapp" |
    "fill/social media/logo-wikipedia" |
    "fill/social media/logo-wordpress" |
    "fill/social media/logo-yelp" |
    "fill/social media/logo-youtube" |
    "fill/social media/microsoft-onenote" |
    "fill/social media/spectrum" |
    "fill/social media/telegram" |
    "fill/social media/tiktok" |
    "fill/social media/twitch" |
    "color/flags/afghanistan" |
    "color/flags/albania" |
    "color/flags/algeria" |
    "color/flags/andorra" |
    "color/flags/angola" |
    "color/flags/antigua-barbuda" |
    "color/flags/argentina" |
    "color/flags/armenia" |
    "color/flags/australia" |
    "color/flags/austria" |
    "color/flags/azerbaijan" |
    "color/flags/bahamas-na" |
    "color/flags/bahrain" |
    "color/flags/bangladesh" |
    "color/flags/barbados-na" |
    "color/flags/belarus" |
    "color/flags/belarus-2" |
    "color/flags/belgium" |
    "color/flags/belize-ca" |
    "color/flags/benin" |
    "color/flags/bolivia" |
    "color/flags/bosnia" |
    "color/flags/botswana" |
    "color/flags/brazil" |
    "color/flags/british-virgin-islands" |
    "color/flags/brunei" |
    "color/flags/bulgaria" |
    "color/flags/burkina-faso" |
    "color/flags/burma" |
    "color/flags/burundi" |
    "color/flags/cambodia" |
    "color/flags/cameroon" |
    "color/flags/canada" |
    "color/flags/cape-verde" |
    "color/flags/central-african-republic" |
    "color/flags/chad" |
    "color/flags/chile" |
    "color/flags/china-2" |
    "color/flags/colombia" |
    "color/flags/comoros" |
    "color/flags/costarica" |
    "color/flags/croatia" |
    "color/flags/cuba" |
    "color/flags/cyprus" |
    "color/flags/czech" |
    "color/flags/democratic-republic-of-congo" |
    "color/flags/denmark" |
    "color/flags/djibouti" |
    "color/flags/dominica" |
    "color/flags/dominican-republic-na" |
    "color/flags/east-timor" |
    "color/flags/ecuador" |
    "color/flags/egypt" |
    "color/flags/el-salvador-ca" |
    "color/flags/england" |
    "color/flags/equatorial-guinea" |
    "color/flags/eritrea" |
    "color/flags/estonia" |
    "color/flags/ethiopia" |
    "color/flags/eu" |
    "color/flags/falkland-islands" |
    "color/flags/faroe-islands" |
    "color/flags/fiji" |
    "color/flags/finland" |
    "color/flags/france" |
    "color/flags/french-guiana" |
    "color/flags/gabon" |
    "color/flags/gambia" |
    "color/flags/georgia" |
    "color/flags/germany" |
    "color/flags/ghana" |
    "color/flags/gibraltar" |
    "color/flags/greece" |
    "color/flags/grenada-na" |
    "color/flags/guadeloupe" |
    "color/flags/guatemala" |
    "color/flags/guernsey" |
    "color/flags/guinea-bissau" |
    "color/flags/guinea" |
    "color/flags/guyana" |
    "color/flags/haiti-na" |
    "color/flags/honduras-ca" |
    "color/flags/hungary" |
    "color/flags/iceland" |
    "color/flags/india" |
    "color/flags/indonesia" |
    "color/flags/iran" |
    "color/flags/iraq" |
    "color/flags/ireland" |
    "color/flags/isle-of-man" |
    "color/flags/israel" |
    "color/flags/italy" |
    "color/flags/ivory-coast" |
    "color/flags/jamaica" |
    "color/flags/japan" |
    "color/flags/jersey" |
    "color/flags/jordan" |
    "color/flags/kazakhstan" |
    "color/flags/kenya" |
    "color/flags/kiribati" |
    "color/flags/korea" |
    "color/flags/kosovo" |
    "color/flags/kyrgyzstan" |
    "color/flags/kuwait" |
    "color/flags/laos" |
    "color/flags/latvia" |
    "color/flags/lebanon" |
    "color/flags/lesotho" |
    "color/flags/liberia" |
    "color/flags/libya" |
    "color/flags/liechtenstein" |
    "color/flags/lithuania" |
    "color/flags/luxembourg" |
    "color/flags/macedonia" |
    "color/flags/madagascar" |
    "color/flags/malawi" |
    "color/flags/malaysia" |
    "color/flags/maldives" |
    "color/flags/mali" |
    "color/flags/malta" |
    "color/flags/marocco" |
    "color/flags/marshall-islands" |
    "color/flags/mauritania" |
    "color/flags/mauritius" |
    "color/flags/mexico" |
    "color/flags/micronesia" |
    "color/flags/moldova" |
    "color/flags/monaco" |
    "color/flags/mongolia" |
    "color/flags/montenegro" |
    "color/flags/mozanbique" |
    "color/flags/namibia" |
    "color/flags/nauru" |
    "color/flags/nepal" |
    "color/flags/netherlands" |
    "color/flags/new-zealand" |
    "color/flags/nicaragua-ca" |
    "color/flags/niger" |
    "color/flags/nigeria" |
    "color/flags/north-korea" |
    "color/flags/norway" |
    "color/flags/oman" |
    "color/flags/pakistan" |
    "color/flags/palau" |
    "color/flags/palestine" |
    "color/flags/panama-ca" |
    "color/flags/papua-new-guinea" |
    "color/flags/paraguay" |
    "color/flags/peru" |
    "color/flags/philippines" |
    "color/flags/poland" |
    "color/flags/portugal" |
    "color/flags/puerto-rico" |
    "color/flags/quatar" |
    "color/flags/republic-of-the-congo" |
    "color/flags/romania" |
    "color/flags/russia" |
    "color/flags/rwanda" |
    "color/flags/saint-kitts-nevis" |
    "color/flags/saint-lucia-na" |
    "color/flags/saint-vincent-grenadines" |
    "color/flags/samoa" |
    "color/flags/san-marino" |
    "color/flags/sao-tome-and-principe" |
    "color/flags/saudi-arabia" |
    "color/flags/senegal" |
    "color/flags/serbia" |
    "color/flags/seychelles" |
    "color/flags/sierra-leone" |
    "color/flags/singapore" |
    "color/flags/slovakia" |
    "color/flags/slovenia" |
    "color/flags/solomon-islands" |
    "color/flags/somalia" |
    "color/flags/south-africa" |
    "color/flags/south-sandwich-islands" |
    "color/flags/south-sudan" |
    "color/flags/spain" |
    "color/flags/sri-lanka" |
    "color/flags/sudan" |
    "color/flags/suriname" |
    "color/flags/swaziland" |
    "color/flags/sweeden" |
    "color/flags/swiss" |
    "color/flags/syria" |
    "color/flags/taiwan" |
    "color/flags/tajikistan" |
    "color/flags/tanzania" |
    "color/flags/thailand" |
    "color/flags/togo" |
    "color/flags/tonga" |
    "color/flags/trinidad-tobago" |
    "color/flags/tunisia" |
    "color/flags/turkey" |
    "color/flags/turkmenistan" |
    "color/flags/tuvalu" |
    "color/flags/uganda" |
    "color/flags/uk" |
    "color/flags/ukraine" |
    "color/flags/united-arab-emirates" |
    "color/flags/uruguay" |
    "color/flags/us-virgin-islands" |
    "color/flags/usa" |
    "color/flags/uzbekistan" |
    "color/flags/vanuatu" |
    "color/flags/venezuela" |
    "color/flags/yemen" |
    "color/flags/vietnam" |
    "color/flags/zambia" |
    "color/flags/zimbabwe" |
    "fill/environment/battery-charging" |
    "fill/environment/battery" |
    "fill/environment/battery-level" |
    "fill/environment/battery-low" |
    "fill/environment/battery-status" |
    "fill/environment/battery-power" |
    "fill/environment/botany" |
    "fill/environment/bulb" |
    "fill/environment/bulb-saver" |
    "fill/environment/car" |
    "fill/environment/clover" |
    "fill/environment/drop" |
    "fill/environment/eco-home" |
    "fill/environment/ecology" |
    "fill/environment/factory" |
    "fill/environment/forest" |
    "fill/environment/fuel" |
    "fill/environment/fuel-2" |
    "fill/environment/fuel-electric" |
    "fill/environment/globe" |
    "fill/environment/humidity-52" |
    "fill/environment/hybrid-car" |
    "fill/environment/leaf" |
    "fill/environment/light-switch" |
    "fill/environment/money-growth" |
    "fill/environment/oil" |
    "fill/environment/panel" |
    "fill/environment/plant-leaf" |
    "fill/environment/plant-soil" |
    "fill/environment/plant-vase" |
    "fill/environment/plug-2" |
    "fill/environment/plug" |
    "fill/environment/power-level" |
    "fill/environment/progress" |
    "fill/environment/radiation" |
    "fill/environment/recycling" |
    "fill/environment/refresh" |
    "fill/environment/reload" |
    "fill/environment/save-planet" |
    "fill/environment/shower" |
    "fill/environment/sink-faucet" |
    "fill/environment/sun" |
    "fill/environment/temperature" |
    "fill/environment/temperature-2" |
    "fill/environment/tree-01" |
    "fill/environment/waste-danger" |
    "fill/environment/waste-recycling" |
    "fill/environment/waste" |
    "fill/environment/water" |
    "fill/environment/water-hand" |
    "fill/environment/water-sink" |
    "fill/environment/wind" |
    "fill/environment/windmill" |
    "fill/environment/windmill-2" |
    "fill/environment/world" |
    "outline/environment/battery" |
    "outline/environment/battery-charging" |
    "outline/environment/battery-level" |
    "outline/environment/battery-low" |
    "outline/environment/battery-power" |
    "outline/environment/battery-status" |
    "outline/environment/botany" |
    "outline/environment/bulb" |
    "outline/environment/bulb-saver" |
    "outline/environment/car" |
    "outline/environment/clover" |
    "outline/environment/drop" |
    "outline/environment/eco-home" |
    "outline/environment/ecology" |
    "outline/environment/factory" |
    "outline/environment/forest" |
    "outline/environment/fuel-2" |
    "outline/environment/fuel" |
    "outline/environment/fuel-electric" |
    "outline/environment/globe" |
    "outline/environment/humidity-52" |
    "outline/environment/hybrid-car" |
    "outline/environment/leaf" |
    "outline/environment/light-switch" |
    "outline/environment/money-growth" |
    "outline/environment/oil" |
    "outline/environment/panel" |
    "outline/environment/plant-leaf" |
    "outline/environment/plant-soil" |
    "outline/environment/plant-vase" |
    "outline/environment/plug-2" |
    "outline/environment/plug" |
    "outline/environment/power-level" |
    "outline/environment/progress" |
    "outline/environment/radiation" |
    "outline/environment/recycling" |
    "outline/environment/refresh" |
    "outline/environment/reload" |
    "outline/environment/save-planet" |
    "outline/environment/shower" |
    "outline/environment/sink-faucet" |
    "outline/environment/sun" |
    "outline/environment/temperature" |
    "outline/environment/temperature-2" |
    "outline/environment/tree-01" |
    "outline/environment/waste" |
    "outline/environment/waste-danger" |
    "outline/environment/waste-recycling" |
    "outline/environment/water-hand" |
    "outline/environment/water" |
    "outline/environment/water-sink" |
    "outline/environment/wind" |
    "outline/environment/windmill-2" |
    "outline/environment/windmill" |
    "outline/environment/world" |
    "fill/business/agenda" |
    "fill/business/address-book" |
    "fill/business/algorithm" |
    "fill/business/app-services" |
    "fill/business/archery-target" |
    "fill/business/atm" |
    "fill/business/award-49" |
    "fill/business/badge" |
    "fill/business/bank-statement" |
    "fill/business/bill" |
    "fill/business/bitcoin" |
    "fill/business/block" |
    "fill/business/blockchain" |
    "fill/business/board-27" |
    "fill/business/board-28" |
    "fill/business/board-29" |
    "fill/business/board-30" |
    "fill/business/books" |
    "fill/business/briefcase-24" |
    "fill/business/briefcase-25" |
    "fill/business/briefcase-26" |
    "fill/business/bulb-61" |
    "fill/business/bulb-62" |
    "fill/business/bulb-63" |
    "fill/business/business-agent" |
    "fill/business/business-contact-85" |
    "fill/business/business-contact-86" |
    "fill/business/business-contact-87" |
    "fill/business/business-contact-88" |
    "fill/business/businessman-03" |
    "fill/business/businessman-04" |
    "fill/business/calculator" |
    "fill/business/candlestick-chart" |
    "fill/business/card-edit" |
    "fill/business/card-favorite" |
    "fill/business/card-remove" |
    "fill/business/card-update" |
    "fill/business/certificate" |
    "fill/business/chart-bar-32" |
    "fill/business/chart" |
    "fill/business/chart-bar-33" |
    "fill/business/chart-growth" |
    "fill/business/chart-pie-35" |
    "fill/business/chart-pie-36" |
    "fill/business/cheque" |
    "fill/business/chess-knight" |
    "fill/business/chess-tower" |
    "fill/business/cloud-mining" |
    "fill/business/cockade" |
    "fill/business/coins" |
    "fill/business/conference-room" |
    "fill/business/connect" |
    "fill/business/contactless-card" |
    "fill/business/contacts" |
    "fill/business/copyright" |
    "fill/business/credit-card" |
    "fill/business/credit-card-in" |
    "fill/business/credit-locked" |
    "fill/business/crypto-wallet" |
    "fill/business/currency-dollar" |
    "fill/business/currency-euro" |
    "fill/business/currency-exchange" |
    "fill/business/currency-pound" |
    "fill/business/currency-exchange-2" |
    "fill/business/currency-yen" |
    "fill/business/debt" |
    "fill/business/decentralize" |
    "fill/business/decision-process" |
    "fill/business/dice" |
    "fill/business/factory" |
    "fill/business/globe" |
    "fill/business/goal-65" |
    "fill/business/gold" |
    "fill/business/hammer" |
    "fill/business/hand-card" |
    "fill/business/handout" |
    "fill/business/handshake" |
    "fill/business/hat" |
    "fill/business/hierarchy-53" |
    "fill/business/hierarchy-54" |
    "fill/business/hierarchy-55" |
    "fill/business/hierarchy-56" |
    "fill/business/info-point" |
    "fill/business/interview" |
    "fill/business/joint-account" |
    "fill/business/laptop-71" |
    "fill/business/laptop-72" |
    "fill/business/law" |
    "fill/business/line-chart" |
    "fill/business/loan" |
    "fill/business/logic" |
    "fill/business/math" |
    "fill/business/miner" |
    "fill/business/mobile-banking" |
    "fill/business/mobile-card" |
    "fill/business/money-11" |
    "fill/business/money-12" |
    "fill/business/money-13" |
    "fill/business/money-bag" |
    "fill/business/money-coins" |
    "fill/business/money-growth" |
    "fill/business/money-time" |
    "fill/business/money-transfer" |
    "fill/business/mortgage" |
    "fill/business/name-card" |
    "fill/business/negative-judgement" |
    "fill/business/net" |
    "fill/business/new-construction" |
    "fill/business/nodes" |
    "fill/business/notes" |
    "fill/business/office-badge" |
    "fill/business/office-chair" |
    "fill/business/office-pass" |
    "fill/business/office" |
    "fill/business/online-banking" |
    "fill/business/payee" |
    "fill/business/payment-method" |
    "fill/business/payment" |
    "fill/business/payor" |
    "fill/business/percentage-38" |
    "fill/business/percentage-39" |
    "fill/business/personal-trainer" |
    "fill/business/pig" |
    "fill/business/pin" |
    "fill/business/plug" |
    "fill/business/pos" |
    "fill/business/positive-judgement" |
    "fill/business/presentation" |
    "fill/business/privacy-policy" |
    "fill/business/progress" |
    "fill/business/puzzle-09" |
    "fill/business/puzzle-10" |
    "fill/business/ranking" |
    "fill/business/rate-down" |
    "fill/business/rate-up" |
    "fill/business/refund" |
    "fill/business/round-dollar" |
    "fill/business/round-euro" |
    "fill/business/round-pound" |
    "fill/business/round-yen" |
    "fill/business/safe" |
    "fill/business/savings" |
    "fill/business/scale" |
    "fill/business/sign" |
    "fill/business/signature" |
    "fill/business/statistics" |
    "fill/business/stock-market" |
    "fill/business/tactic" |
    "fill/business/temple" |
    "fill/business/tie-01" |
    "fill/business/tie-02" |
    "fill/business/transaction" |
    "fill/business/transactions" |
    "fill/business/wallet-43" |
    "fill/business/wallet-44" |
    "fill/business/wallet-90" |
    "fill/buildings/air-conditioner" |
    "fill/buildings/apartment" |
    "fill/buildings/armchair" |
    "fill/buildings/bath-faucet" |
    "fill/buildings/bathroom-cabinet" |
    "fill/buildings/bathtub" |
    "fill/buildings/bed" |
    "fill/buildings/bedroom" |
    "fill/buildings/books" |
    "fill/buildings/broom" |
    "fill/buildings/bureau-dresser" |
    "fill/buildings/cabinet" |
    "fill/buildings/cactus" |
    "fill/buildings/casino" |
    "fill/buildings/chair" |
    "fill/buildings/chandelier" |
    "fill/buildings/clothes-hanger" |
    "fill/buildings/clothing-hanger" |
    "fill/buildings/coat-hanger" |
    "fill/buildings/coffee-maker" |
    "fill/buildings/conference-room" |
    "fill/buildings/cradle" |
    "fill/buildings/crane" |
    "fill/buildings/curtains" |
    "fill/buildings/depth" |
    "fill/buildings/desk-drawer" |
    "fill/buildings/desk" |
    "fill/buildings/desk-lamp" |
    "fill/buildings/detached-property" |
    "fill/buildings/door" |
    "fill/buildings/door-2" |
    "fill/buildings/door-3" |
    "fill/buildings/door-handle" |
    "fill/buildings/doorphone" |
    "fill/buildings/double-bed" |
    "fill/buildings/drawer" |
    "fill/buildings/drawer-2" |
    "fill/buildings/dresser" |
    "fill/buildings/dresser-2" |
    "fill/buildings/dresser-3" |
    "fill/buildings/drill" |
    "fill/buildings/escalator" |
    "fill/buildings/fan" |
    "fill/buildings/fireplace" |
    "fill/buildings/flashlight" |
    "fill/buildings/floor" |
    "fill/buildings/floor-lamp" |
    "fill/buildings/forklift" |
    "fill/buildings/fridge" |
    "fill/buildings/furnished-property" |
    "fill/buildings/gym" |
    "fill/buildings/hair-dryer" |
    "fill/buildings/hand-mixer" |
    "fill/buildings/heater" |
    "fill/buildings/height-2" |
    "fill/buildings/iron" |
    "fill/buildings/iron-2" |
    "fill/buildings/jacuzzi" |
    "fill/buildings/kitchen-fan" |
    "fill/buildings/ladder" |
    "fill/buildings/laundry" |
    "fill/buildings/library" |
    "fill/buildings/lift" |
    "fill/buildings/light-control" |
    "fill/buildings/light-switch" |
    "fill/buildings/liquid-soap-container" |
    "fill/buildings/makeup-mirror" |
    "fill/buildings/mirror" |
    "fill/buildings/mirror-2" |
    "fill/buildings/mortgage" |
    "fill/buildings/new-construction" |
    "fill/buildings/night-table" |
    "fill/buildings/office-chair" |
    "fill/buildings/oven" |
    "fill/buildings/pendant-lighting" |
    "fill/buildings/photo-frame" |
    "fill/buildings/record-player" |
    "fill/buildings/robot-cleaner" |
    "fill/buildings/router" |
    "fill/buildings/safe" |
    "fill/buildings/shower" |
    "fill/buildings/single-bed" |
    "fill/buildings/sink-faucet" |
    "fill/buildings/sink" |
    "fill/buildings/smart-house" |
    "fill/buildings/sofa" |
    "fill/buildings/spade" |
    "fill/buildings/spray-bottle" |
    "fill/buildings/stairs" |
    "fill/buildings/stay-home" |
    "fill/buildings/steam-iron" |
    "fill/buildings/storage-hanger" |
    "fill/buildings/storage-shelves" |
    "fill/buildings/table" |
    "fill/buildings/table-lamp" |
    "fill/buildings/telephone" |
    "fill/buildings/terrace" |
    "fill/buildings/time-alarm" |
    "fill/buildings/time-clock" |
    "fill/buildings/toaster" |
    "fill/buildings/toilet-paper" |
    "fill/buildings/toilet" |
    "fill/buildings/towel-hanger" |
    "fill/buildings/trash" |
    "fill/buildings/tv-stand" |
    "fill/buildings/vacuum-cleaner" |
    "fill/buildings/wardrobe-2" |
    "fill/buildings/wardrobe-3" |
    "fill/buildings/wardrobe-4" |
    "fill/buildings/wardrobe" |
    "fill/buildings/washing-machine" |
    "fill/buildings/weight-scale" |
    "fill/buildings/wheelbarrow" |
    "fill/buildings/width" |
    "fill/buildings/window" |
    "outline/buildings/air-conditioner" |
    "outline/buildings/apartment" |
    "outline/buildings/armchair" |
    "outline/buildings/bath-faucet" |
    "outline/buildings/bathroom-cabinet" |
    "outline/buildings/bathtub" |
    "outline/buildings/bed" |
    "outline/buildings/bedroom" |
    "outline/buildings/books" |
    "outline/buildings/broom" |
    "outline/buildings/bureau-dresser" |
    "outline/buildings/cabinet" |
    "outline/buildings/cactus" |
    "outline/buildings/casino" |
    "outline/buildings/chair" |
    "outline/buildings/chandelier" |
    "outline/buildings/clothes-hanger" |
    "outline/buildings/clothing-hanger" |
    "outline/buildings/coat-hanger" |
    "outline/buildings/coffee-maker" |
    "outline/buildings/conference-room" |
    "outline/buildings/cradle" |
    "outline/buildings/crane" |
    "outline/buildings/curtains" |
    "outline/buildings/depth" |
    "outline/buildings/desk" |
    "outline/buildings/desk-drawer" |
    "outline/buildings/desk-lamp" |
    "outline/buildings/detached-property" |
    "outline/buildings/door" |
    "outline/buildings/door-2" |
    "outline/buildings/door-3" |
    "outline/buildings/door-handle" |
    "outline/buildings/doorphone" |
    "outline/buildings/double-bed" |
    "outline/buildings/drawer" |
    "outline/buildings/drawer-2" |
    "outline/buildings/dresser" |
    "outline/buildings/dresser-2" |
    "outline/buildings/dresser-3" |
    "outline/buildings/drill" |
    "outline/buildings/escalator" |
    "outline/buildings/fan" |
    "outline/buildings/fireplace" |
    "outline/buildings/flashlight" |
    "outline/buildings/floor" |
    "outline/buildings/floor-lamp" |
    "outline/buildings/forklift" |
    "outline/buildings/fridge" |
    "outline/buildings/furnished-property" |
    "outline/buildings/gym" |
    "outline/buildings/hair-dryer" |
    "outline/buildings/hand-mixer" |
    "outline/buildings/heater" |
    "outline/buildings/height-2" |
    "outline/buildings/iron" |
    "outline/buildings/iron-2" |
    "outline/buildings/jacuzzi" |
    "outline/buildings/kitchen-fan" |
    "outline/buildings/ladder" |
    "outline/buildings/laundry" |
    "outline/buildings/library" |
    "outline/buildings/lift" |
    "outline/buildings/light-control" |
    "outline/buildings/light-switch" |
    "outline/buildings/liquid-soap-container" |
    "outline/buildings/makeup-mirror" |
    "outline/buildings/mirror-2" |
    "outline/buildings/mirror" |
    "outline/buildings/mortgage" |
    "outline/buildings/new-construction" |
    "outline/buildings/night-table" |
    "outline/buildings/office-chair" |
    "outline/buildings/oven" |
    "outline/buildings/pendant-lighting" |
    "outline/buildings/photo-frame" |
    "outline/buildings/record-player" |
    "outline/buildings/robot-cleaner" |
    "outline/buildings/router" |
    "outline/buildings/safe" |
    "outline/buildings/shower" |
    "outline/buildings/single-bed" |
    "outline/buildings/sink-faucet" |
    "outline/buildings/sink" |
    "outline/buildings/smart-house" |
    "outline/buildings/sofa" |
    "outline/buildings/spade" |
    "outline/buildings/spray-bottle" |
    "outline/buildings/stairs" |
    "outline/buildings/stay-home" |
    "outline/buildings/steam-iron" |
    "outline/buildings/storage-hanger" |
    "outline/buildings/storage-shelves" |
    "outline/buildings/table-lamp" |
    "outline/buildings/table" |
    "outline/buildings/telephone" |
    "outline/buildings/terrace" |
    "outline/buildings/time-alarm" |
    "outline/buildings/time-clock" |
    "outline/buildings/toaster" |
    "outline/buildings/toilet-paper" |
    "outline/buildings/toilet" |
    "outline/buildings/towel-hanger" |
    "outline/buildings/trash" |
    "outline/buildings/tv-stand" |
    "outline/buildings/vacuum-cleaner" |
    "outline/buildings/wardrobe-2" |
    "outline/buildings/wardrobe" |
    "outline/buildings/wardrobe-3" |
    "outline/buildings/wardrobe-4" |
    "outline/buildings/washing-machine" |
    "outline/buildings/weight-scale" |
    "outline/buildings/wheelbarrow" |
    "outline/buildings/width" |
    "outline/buildings/window" |
    "fill/health/ambulance" |
    "fill/health/apple-2" |
    "fill/health/atom" |
    "fill/health/bag-49" |
    "fill/health/bag-50" |
    "fill/health/bedroom" |
    "fill/health/biochemistry" |
    "fill/health/biology" |
    "fill/health/botany" |
    "fill/health/brain" |
    "fill/health/c-pulse" |
    "fill/health/call-doctor" |
    "fill/health/chemistry" |
    "fill/health/condom" |
    "fill/health/coughing" |
    "fill/health/cure" |
    "fill/health/diet-food" |
    "fill/health/diet" |
    "fill/health/diet-plan" |
    "fill/health/disinfectant" |
    "fill/health/dna-27" |
    "fill/health/dna-38" |
    "fill/health/doctor" |
    "fill/health/dont-touch-eyes" |
    "fill/health/dont-touch-mouth" |
    "fill/health/drop" |
    "fill/health/embryo" |
    "fill/health/female-figure" |
    "fill/health/female-sign" |
    "fill/health/flame" |
    "fill/health/flask-2" |
    "fill/health/flask" |
    "fill/health/food-scale" |
    "fill/health/gathering-restrictions" |
    "fill/health/heart" |
    "fill/health/heartbeat" |
    "fill/health/height" |
    "fill/health/hospital-32" |
    "fill/health/hospital-33" |
    "fill/health/hospital-34" |
    "fill/health/hospital-bed" |
    "fill/health/humidity-26" |
    "fill/health/humidity-52" |
    "fill/health/infrared-thermometer" |
    "fill/health/intestine" |
    "fill/health/liquid-soap-container" |
    "fill/health/lungs-infection" |
    "fill/health/lungs" |
    "fill/health/male-sign" |
    "fill/health/man" |
    "fill/health/measurement" |
    "fill/health/medical-clipboard" |
    "fill/health/medical-mask" |
    "fill/health/medication" |
    "fill/health/medicine" |
    "fill/health/microbiology" |
    "fill/health/microscope" |
    "fill/health/molecule-39" |
    "fill/health/molecule-40" |
    "fill/health/molecule" |
    "fill/health/mortar" |
    "fill/health/no-contact" |
    "fill/health/no-smoking" |
    "fill/health/nurse" |
    "fill/health/nutrition" |
    "fill/health/ovum-sperm" |
    "fill/health/patch-34" |
    "fill/health/patch" |
    "fill/health/pharmacy" |
    "fill/health/phone-heart" |
    "fill/health/phone-heartbeat" |
    "fill/health/pill-42" |
    "fill/health/pill-43" |
    "fill/health/pill-bottle" |
    "fill/health/potion" |
    "fill/health/pregnancy-test" |
    "fill/health/pulse-chart" |
    "fill/health/pulse" |
    "fill/health/pulse-sleep" |
    "fill/health/research" |
    "fill/health/runny-nose" |
    "fill/health/s-pulse" |
    "fill/health/smoking" |
    "fill/health/sneeze" |
    "fill/health/soap" |
    "fill/health/social-distancing" |
    "fill/health/sperm" |
    "fill/health/stay-home" |
    "fill/health/steps" |
    "fill/health/stethoscope" |
    "fill/health/stretching" |
    "fill/health/syringe" |
    "fill/health/temperature-2" |
    "fill/health/temperature" |
    "fill/health/thermometer" |
    "fill/health/tooth" |
    "fill/health/treadmill" |
    "fill/health/virus" |
    "fill/health/walking-support" |
    "fill/health/wash-hands" |
    "fill/health/watch-heart" |
    "fill/health/watch-heartbeat" |
    "fill/health/weed" |
    "fill/health/weight-gain" |
    "fill/health/weight-loss" |
    "fill/health/weight-scale" |
    "fill/health/wheelchair-2" |
    "fill/health/woman-man" |
    "fill/text/a-tag-add" |
    "fill/text/a-tag-remove" |
    "fill/text/a-tag" |
    "fill/text/at-sign" |
    "fill/text/attach" |
    "fill/text/attachment" |
    "fill/text/blockquote" |
    "fill/text/bold" |
    "fill/text/border-width" |
    "fill/text/code" |
    "fill/text/decrease-indent" |
    "fill/text/decrease-font-size" |
    "fill/text/drop-cap" |
    "fill/text/equation" |
    "fill/text/file-edit" |
    "fill/text/grammar-check-2" |
    "fill/text/hash-mark" |
    "fill/text/heading-1" |
    "fill/text/heading-2" |
    "fill/text/heading-3" |
    "fill/text/heading-4" |
    "fill/text/heading-5" |
    "fill/text/heading-6" |
    "fill/text/horizontal-divider" |
    "fill/text/img" |
    "fill/text/increase-font-size" |
    "fill/text/increase-indent" |
    "fill/text/line-height" |
    "fill/text/link" |
    "fill/text/lowercase" |
    "fill/text/markdown" |
    "fill/text/menu-dots" |
    "fill/text/microphone" |
    "fill/text/ordered-list" |
    "fill/text/paragraph-2" |
    "fill/text/pilcrow" |
    "fill/text/quote" |
    "fill/text/space-divider" |
    "fill/text/sparks" |
    "fill/text/strikethrough" |
    "fill/text/subscript" |
    "fill/text/superscript" |
    "fill/text/text" |
    "fill/text/text-align-center" |
    "fill/text/text-align-justify" |
    "fill/text/text-align-left" |
    "fill/text/text-align-right" |
    "fill/text/text-bg-color" |
    "fill/text/text-color" |
    "fill/text/text-horizontal-scale" |
    "fill/text/text-italic" |
    "fill/text/text-size" |
    "fill/text/text-tracking" |
    "fill/text/text-vertical-scale" |
    "fill/text/title-case" |
    "fill/text/type-tool" |
    "fill/text/typography" |
    "fill/text/underline" |
    "fill/text/unlink" |
    "fill/text/unordered-list" |
    "fill/text/uppercase" |
    "fill/text/vertical-divider" |
    "fill/text/video" |
    "fill/text/web-hyperlink" |
    "outline/text/a-tag" |
    "outline/text/a-tag-add" |
    "outline/text/a-tag-remove" |
    "outline/text/at-sign" |
    "outline/text/attach" |
    "outline/text/attachment" |
    "outline/text/blockquote" |
    "outline/text/bold" |
    "outline/text/border-width" |
    "outline/text/code" |
    "outline/text/decrease-font-size" |
    "outline/text/decrease-indent" |
    "outline/text/drop-cap" |
    "outline/text/equation" |
    "outline/text/file-edit" |
    "outline/text/grammar-check-2" |
    "outline/text/hash-mark" |
    "outline/text/heading-1" |
    "outline/text/heading-2" |
    "outline/text/heading-3" |
    "outline/text/heading-4" |
    "outline/text/heading-5" |
    "outline/text/heading-6" |
    "outline/text/horizontal-divider" |
    "outline/text/img" |
    "outline/text/increase-font-size" |
    "outline/text/increase-indent" |
    "outline/text/line-height" |
    "outline/text/link" |
    "outline/text/lowercase" |
    "outline/text/markdown" |
    "outline/text/menu-dots" |
    "outline/text/microphone" |
    "outline/text/ordered-list" |
    "outline/text/paragraph-2" |
    "outline/text/pilcrow" |
    "outline/text/quote" |
    "outline/text/space-divider" |
    "outline/text/sparks" |
    "outline/text/strikethrough" |
    "outline/text/subscript" |
    "outline/text/superscript" |
    "outline/text/text-align-center" |
    "outline/text/text" |
    "outline/text/text-align-justify" |
    "outline/text/text-align-left" |
    "outline/text/text-align-right" |
    "outline/text/text-bg-color" |
    "outline/text/text-color" |
    "outline/text/text-horizontal-scale" |
    "outline/text/text-italic" |
    "outline/text/text-size" |
    "outline/text/text-tracking" |
    "outline/text/text-vertical-scale" |
    "outline/text/title-case" |
    "outline/text/type-tool" |
    "outline/text/typography" |
    "outline/text/underline" |
    "outline/text/unlink" |
    "outline/text/unordered-list" |
    "outline/text/uppercase" |
    "outline/text/vertical-divider" |
    "outline/text/video" |
    "outline/text/web-hyperlink" |
    "outline/location/appointment" |
    "outline/location/bookmark" |
    "outline/location/bookmark-add" |
    "outline/location/bookmark-add-2" |
    "outline/location/bookmark-delete" |
    "outline/location/bookmark-delete-2" |
    "outline/location/compass-04" |
    "outline/location/compass-05" |
    "outline/location/compass-06" |
    "outline/location/compass-2" |
    "outline/location/compass-3" |
    "outline/location/construction-sign" |
    "outline/location/crosshair" |
    "outline/location/crossroad" |
    "outline/location/directions" |
    "outline/location/distance" |
    "outline/location/explore-user" |
    "outline/location/explore" |
    "outline/location/flag-complex" |
    "outline/location/flag-diagonal-33" |
    "outline/location/flag-diagonal-34" |
    "outline/location/flag" |
    "outline/location/flag-points-31" |
    "outline/location/flag-points-32" |
    "outline/location/flag-simple" |
    "outline/location/gps" |
    "outline/location/home-search" |
    "outline/location/journey" |
    "outline/location/journey-06" |
    "outline/location/journey-07" |
    "outline/location/journey-08" |
    "outline/location/m-add" |
    "outline/location/m-check" |
    "outline/location/m-delete" |
    "outline/location/m-edit" |
    "outline/location/m-heart" |
    "outline/location/m-location" |
    "outline/location/m-remove" |
    "outline/location/m-search" |
    "outline/location/m-security" |
    "outline/location/m-settings" |
    "outline/location/m-share" |
    "outline/location/m-star" |
    "outline/location/m-sync" |
    "outline/location/m-time" |
    "outline/location/m-update" |
    "outline/location/map" |
    "outline/location/map-big" |
    "outline/location/map-compass" |
    "outline/location/map-gps" |
    "outline/location/map-marker" |
    "outline/location/map-pin" |
    "outline/location/marker-2" |
    "outline/location/marker-3" |
    "outline/location/pennant" |
    "outline/location/pin" |
    "outline/location/pin-3" |
    "outline/location/pin-add-2" |
    "outline/location/pin-add" |
    "outline/location/pin-check" |
    "outline/location/pin-copy" |
    "outline/location/pin-delete" |
    "outline/location/pin-edit" |
    "outline/location/pin-heart" |
    "outline/location/pin-remove" |
    "outline/location/pin-remove-2" |
    "outline/location/pin-search" |
    "outline/location/pin-security" |
    "outline/location/pin-settings" |
    "outline/location/pin-share" |
    "outline/location/pin-star" |
    "outline/location/pin-sync" |
    "outline/location/pin-time" |
    "outline/location/pin-user" |
    "outline/location/pins" |
    "outline/location/point-a" |
    "outline/location/point-b" |
    "outline/location/position-marker" |
    "outline/location/position-pin" |
    "outline/location/position-user" |
    "outline/location/property-location" |
    "outline/location/radar" |
    "outline/location/road" |
    "outline/location/road-2" |
    "outline/location/roadmap" |
    "outline/location/route" |
    "outline/location/route-close" |
    "outline/location/route-alert" |
    "outline/location/route-open" |
    "outline/location/square-marker" |
    "outline/location/square-pin" |
    "outline/location/treasure-map-21" |
    "outline/location/treasure-map-40" |
    "outline/location/user-bubble" |
    "outline/location/world-marker" |
    "outline/location/world" |
    "outline/location/world-pin" |
    "fill/location/appointment" |
    "fill/location/bookmark" |
    "fill/location/bookmark-add-2" |
    "fill/location/bookmark-add" |
    "fill/location/bookmark-delete-2" |
    "fill/location/bookmark-delete" |
    "fill/location/compass-04" |
    "fill/location/compass-05" |
    "fill/location/compass-06" |
    "fill/location/compass-2" |
    "fill/location/compass-3" |
    "fill/location/construction-sign" |
    "fill/location/crosshair" |
    "fill/location/crossroad" |
    "fill/location/directions" |
    "fill/location/distance" |
    "fill/location/explore" |
    "fill/location/explore-user" |
    "fill/location/flag" |
    "fill/location/flag-complex" |
    "fill/location/flag-diagonal-33" |
    "fill/location/flag-diagonal-34" |
    "fill/location/flag-points-31" |
    "fill/location/flag-points-32" |
    "fill/location/flag-simple" |
    "fill/location/gps" |
    "fill/location/home-search" |
    "fill/location/journey" |
    "fill/location/journey-06" |
    "fill/location/journey-07" |
    "fill/location/journey-08" |
    "fill/location/m-add" |
    "fill/location/m-check" |
    "fill/location/m-delete" |
    "fill/location/m-edit" |
    "fill/location/m-heart" |
    "fill/location/m-location" |
    "fill/location/m-remove" |
    "fill/location/m-search" |
    "fill/location/m-security" |
    "fill/location/m-settings" |
    "fill/location/m-share" |
    "fill/location/m-star" |
    "fill/location/m-sync" |
    "fill/location/m-time" |
    "fill/location/m-update" |
    "fill/location/map" |
    "fill/location/map-big" |
    "fill/location/map-compass" |
    "fill/location/map-gps" |
    "fill/location/map-marker" |
    "fill/location/map-pin" |
    "fill/location/marker-2" |
    "fill/location/marker-3" |
    "fill/location/pennant" |
    "fill/location/pin" |
    "fill/location/pin-3" |
    "fill/location/pin-add" |
    "fill/location/pin-add-2" |
    "fill/location/pin-check" |
    "fill/location/pin-copy" |
    "fill/location/pin-delete" |
    "fill/location/pin-edit" |
    "fill/location/pin-heart" |
    "fill/location/pin-remove-2" |
    "fill/location/pin-remove" |
    "fill/location/pin-search" |
    "fill/location/pin-security" |
    "fill/location/pin-settings" |
    "fill/location/pin-share" |
    "fill/location/pin-star" |
    "fill/location/pin-sync" |
    "fill/location/pin-time" |
    "fill/location/pin-user" |
    "fill/location/pins" |
    "fill/location/point-a" |
    "fill/location/point-b" |
    "fill/location/position-marker" |
    "fill/location/position-pin" |
    "fill/location/position-user" |
    "fill/location/property-location" |
    "fill/location/radar" |
    "fill/location/road-2" |
    "fill/location/road" |
    "fill/location/roadmap" |
    "fill/location/route-alert" |
    "fill/location/route-close" |
    "fill/location/route" |
    "fill/location/route-open" |
    "fill/location/square-marker" |
    "fill/location/square-pin" |
    "fill/location/treasure-map-21" |
    "fill/location/treasure-map-40" |
    "fill/location/user-bubble" |
    "fill/location/world-marker" |
    "fill/location/world" |
    "fill/location/world-pin" |
    "fill/weather/camera-flash" |
    "fill/weather/celsius" |
    "fill/weather/cloud" |
    "fill/weather/cloud-download" |
    "fill/weather/cloud-drop" |
    "fill/weather/cloud-fog-31" |
    "fill/weather/cloud-fog-32" |
    "fill/weather/cloud-forecast" |
    "fill/weather/cloud-hail" |
    "fill/weather/cloud-light" |
    "fill/weather/cloud-moon" |
    "fill/weather/cloud-rain" |
    "fill/weather/cloud-rainbow" |
    "fill/weather/cloud-snow-34" |
    "fill/weather/cloud-snow-42" |
    "fill/weather/cloud-sun-17" |
    "fill/weather/cloud-sun-19" |
    "fill/weather/cloud-upload" |
    "fill/weather/compass-3" |
    "fill/weather/drop" |
    "fill/weather/drop-15" |
    "fill/weather/drops" |
    "fill/weather/eclipse" |
    "fill/weather/fahrenheit" |
    "fill/weather/fog" |
    "fill/weather/forecast" |
    "fill/weather/humidity-26" |
    "fill/weather/humidity-52" |
    "fill/weather/hurricane-44" |
    "fill/weather/hurricane-45" |
    "fill/weather/lightning" |
    "fill/weather/moon" |
    "fill/weather/moon-cloud-drop" |
    "fill/weather/moon-cloud-fog" |
    "fill/weather/moon-cloud-hail" |
    "fill/weather/moon-cloud-light" |
    "fill/weather/moon-cloud-rain" |
    "fill/weather/moon-cloud-snow-61" |
    "fill/weather/moon-cloud-snow-62" |
    "fill/weather/moon-fog" |
    "fill/weather/moon-full" |
    "fill/weather/moon-stars" |
    "fill/weather/night" |
    "fill/weather/pennant" |
    "fill/weather/rain-hail" |
    "fill/weather/rain" |
    "fill/weather/rainbow" |
    "fill/weather/snow" |
    "fill/weather/sun-cloud" |
    "fill/weather/sun" |
    "fill/weather/sun-cloud-drop" |
    "fill/weather/sun-cloud-fog" |
    "fill/weather/sun-cloud-hail" |
    "fill/weather/sun-cloud-light" |
    "fill/weather/sun-cloud-rain" |
    "fill/weather/sun-cloud-snow-54" |
    "fill/weather/sun-cloud-snow-55" |
    "fill/weather/sun-fog-29" |
    "fill/weather/sun-fog-30" |
    "fill/weather/sun-fog-43" |
    "fill/weather/temperature" |
    "fill/weather/temperature-2" |
    "fill/weather/umbrella-13" |
    "fill/weather/wind-2" |
    "fill/weather/wind" |
    "outline/weather/camera-flash" |
    "outline/weather/celsius" |
    "outline/weather/cloud-download" |
    "outline/weather/cloud" |
    "outline/weather/cloud-drop" |
    "outline/weather/cloud-fog-31" |
    "outline/weather/cloud-fog-32" |
    "outline/weather/cloud-forecast" |
    "outline/weather/cloud-hail" |
    "outline/weather/cloud-light" |
    "outline/weather/cloud-moon" |
    "outline/weather/cloud-rain" |
    "outline/weather/cloud-rainbow" |
    "outline/weather/cloud-snow-34" |
    "outline/weather/cloud-snow-42" |
    "outline/weather/cloud-sun-17" |
    "outline/weather/cloud-sun-19" |
    "outline/weather/cloud-upload" |
    "outline/weather/compass-3" |
    "outline/weather/drop" |
    "outline/weather/drop-15" |
    "outline/weather/drops" |
    "outline/weather/eclipse" |
    "outline/weather/fahrenheit" |
    "outline/weather/fog" |
    "outline/weather/forecast" |
    "outline/weather/humidity-26" |
    "outline/weather/humidity-52" |
    "outline/weather/hurricane-44" |
    "outline/weather/hurricane-45" |
    "outline/weather/lightning" |
    "outline/weather/moon-cloud-drop" |
    "outline/weather/moon" |
    "outline/weather/moon-cloud-fog" |
    "outline/weather/moon-cloud-hail" |
    "outline/weather/moon-cloud-light" |
    "outline/weather/moon-cloud-rain" |
    "outline/weather/moon-cloud-snow-61" |
    "outline/weather/moon-cloud-snow-62" |
    "outline/weather/moon-fog" |
    "outline/weather/moon-full" |
    "outline/weather/moon-stars" |
    "outline/weather/night" |
    "outline/weather/pennant" |
    "outline/weather/rain-hail" |
    "outline/weather/rain" |
    "outline/weather/rainbow" |
    "outline/weather/snow" |
    "outline/weather/sun-cloud" |
    "outline/weather/sun" |
    "outline/weather/sun-cloud-drop" |
    "outline/weather/sun-cloud-fog" |
    "outline/weather/sun-cloud-hail" |
    "outline/weather/sun-cloud-light" |
    "outline/weather/sun-cloud-rain" |
    "outline/weather/sun-cloud-snow-54" |
    "outline/weather/sun-cloud-snow-55" |
    "outline/weather/sun-fog-29" |
    "outline/weather/sun-fog-30" |
    "outline/weather/sun-fog-43" |
    "outline/weather/temperature-2" |
    "outline/weather/temperature" |
    "outline/weather/umbrella-13" |
    "outline/weather/wind" |
    "outline/weather/wind-2" |
    "outline/technology/3d-printing" |
    "outline/technology/ai-generated-img" |
    "outline/technology/ai" |
    "outline/technology/algorithm" |
    "outline/technology/android" |
    "outline/technology/antenna" |
    "outline/technology/api" |
    "outline/technology/app-services" |
    "outline/technology/apple" |
    "outline/technology/artificial-brain" |
    "outline/technology/artificial-intelligence" |
    "outline/technology/audio-jack" |
    "outline/technology/augmented-reality" |
    "outline/technology/automated-logistics" |
    "outline/technology/baby-monitor" |
    "outline/technology/battery-level" |
    "outline/technology/binary-code" |
    "outline/technology/block" |
    "outline/technology/blockchain" |
    "outline/technology/cable" |
    "outline/technology/cctv" |
    "outline/technology/cd-reader" |
    "outline/technology/charger-cable" |
    "outline/technology/chat-bot" |
    "outline/technology/cloud-mining" |
    "outline/technology/computer-monitor" |
    "outline/technology/computer" |
    "outline/technology/connection" |
    "outline/technology/contactless" |
    "outline/technology/content-360deg" |
    "outline/technology/content-delivery" |
    "outline/technology/control-panel" |
    "outline/technology/controller-2" |
    "outline/technology/controller" |
    "outline/technology/cpu" |
    "outline/technology/cryptography" |
    "outline/technology/cyborg" |
    "outline/technology/decentralize" |
    "outline/technology/decision-process" |
    "outline/technology/device-connection" |
    "outline/technology/digital-image" |
    "outline/technology/digital-key" |
    "outline/technology/disk-reader" |
    "outline/technology/disk" |
    "outline/technology/drone-2" |
    "outline/technology/drone" |
    "outline/technology/e-reader" |
    "outline/technology/earbuds" |
    "outline/technology/electronic-circuit" |
    "outline/technology/engine-start" |
    "outline/technology/eye-recognition" |
    "outline/technology/face-recognition" |
    "outline/technology/firewall" |
    "outline/technology/gaming-console" |
    "outline/technology/gaming-controller" |
    "outline/technology/graphics-tablet" |
    "outline/technology/hacker" |
    "outline/technology/hair-clipper" |
    "outline/technology/handheld-console" |
    "outline/technology/hdmi" |
    "outline/technology/headphones-2" |
    "outline/technology/headphones-3" |
    "outline/technology/headphones" |
    "outline/technology/headset" |
    "outline/technology/humanoid" |
    "outline/technology/hybrid-car" |
    "outline/technology/keyboard-hide" |
    "outline/technology/keyboard-mouse" |
    "outline/technology/keyboard-wired" |
    "outline/technology/keyboard" |
    "outline/technology/keyboard-wireless" |
    "outline/technology/l-add" |
    "outline/technology/l-check" |
    "outline/technology/l-location" |
    "outline/technology/l-remove" |
    "outline/technology/l-search" |
    "outline/technology/l-security" |
    "outline/technology/l-settings" |
    "outline/technology/l-sync" |
    "outline/technology/l-system-update" |
    "outline/technology/landscape-orientation" |
    "outline/technology/laptop" |
    "outline/technology/laptop-1" |
    "outline/technology/laptop-2" |
    "outline/technology/license-key" |
    "outline/technology/live-streaming" |
    "outline/technology/lock-landscape" |
    "outline/technology/lock-orientation" |
    "outline/technology/lock-portrait" |
    "outline/technology/logic" |
    "outline/technology/machine-learning" |
    "outline/technology/media-player" |
    "outline/technology/messaging" |
    "outline/technology/metrics" |
    "outline/technology/mic-2" |
    "outline/technology/mic" |
    "outline/technology/migration" |
    "outline/technology/mobile-banking" |
    "outline/technology/mobile-chat" |
    "outline/technology/mobile-phone" |
    "outline/technology/mouse-2" |
    "outline/technology/mouse" |
    "outline/technology/music-player" |
    "outline/technology/navigation" |
    "outline/technology/nodes" |
    "outline/technology/offline" |
    "outline/technology/online-banking" |
    "outline/technology/open-ai" |
    "outline/technology/p-add" |
    "outline/technology/p-check" |
    "outline/technology/p-edit" |
    "outline/technology/p-heart" |
    "outline/technology/p-location" |
    "outline/technology/p-remove" |
    "outline/technology/p-search" |
    "outline/technology/p-settings" |
    "outline/technology/p-share" |
    "outline/technology/p-sync" |
    "outline/technology/p-system-update" |
    "outline/technology/p-time" |
    "outline/technology/parking-sensors" |
    "outline/technology/pattern-recognition" |
    "outline/technology/pc-monitor" |
    "outline/technology/pc" |
    "outline/technology/pc-mouse" |
    "outline/technology/pc-play-media" |
    "outline/technology/pci-card" |
    "outline/technology/phone-button" |
    "outline/technology/phone-camera-back" |
    "outline/technology/phone-camera-front" |
    "outline/technology/phone-charging-2" |
    "outline/technology/phone-charging" |
    "outline/technology/phone-charging-3" |
    "outline/technology/phone-dock" |
    "outline/technology/phone-toolbar" |
    "outline/technology/plug" |
    "outline/technology/plug-2" |
    "outline/technology/print" |
    "outline/technology/printer" |
    "outline/technology/projector" |
    "outline/technology/ram-2" |
    "outline/technology/ram" |
    "outline/technology/reading-tablet" |
    "outline/technology/remote-control" |
    "outline/technology/robot-cleaner" |
    "outline/technology/robotic-arm" |
    "outline/technology/router" |
    "outline/technology/satellite-dish" |
    "outline/technology/satellite" |
    "outline/technology/screen-reader" |
    "outline/technology/screen-rotation" |
    "outline/technology/screen-sharing-2" |
    "outline/technology/screen-sharing-off-2" |
    "outline/technology/send-to-phone" |
    "outline/technology/sensor" |
    "outline/technology/server" |
    "outline/technology/server-rack" |
    "outline/technology/signal" |
    "outline/technology/sim-card" |
    "outline/technology/smart-house" |
    "outline/technology/smartphone" |
    "outline/technology/smartwatch" |
    "outline/technology/socket-europe-1" |
    "outline/technology/socket" |
    "outline/technology/socket-europe-2" |
    "outline/technology/socket-uk" |
    "outline/technology/sparks" |
    "outline/technology/ssd" |
    "outline/technology/sync-devices" |
    "outline/technology/system-update" |
    "outline/technology/tablet-2" |
    "outline/technology/tablet" |
    "outline/technology/tablet-charging" |
    "outline/technology/tablet-toolbar" |
    "outline/technology/three-dimensional-object" |
    "outline/technology/three-dimensional-world" |
    "outline/technology/traffic" |
    "outline/technology/transactions" |
    "outline/technology/translation" |
    "outline/technology/tv-stand" |
    "outline/technology/tv" |
    "outline/technology/usb" |
    "outline/technology/video-off" |
    "outline/technology/video-player" |
    "outline/technology/vintage-computer" |
    "outline/technology/vintage-tv" |
    "outline/technology/virtual-assistant-2" |
    "outline/technology/virtual-assistant" |
    "outline/technology/virtual-environment" |
    "outline/technology/virtual-reality" |
    "outline/technology/voice-recognition" |
    "outline/technology/vpn" |
    "outline/technology/vr-controller" |
    "outline/technology/vr-headset" |
    "outline/technology/watch-2" |
    "outline/technology/watch" |
    "outline/technology/webcam" |
    "outline/technology/webcam-2" |
    "outline/technology/wifi-2" |
    "outline/technology/wifi-off" |
    "outline/technology/wifi-protected" |
    "outline/technology/wifi" |
    "outline/technology/wifi-router" |
    "outline/technology/wireless-charging" |
    "fill/technology/3d-printing" |
    "fill/technology/ai" |
    "fill/technology/ai-generated-img" |
    "fill/technology/algorithm" |
    "fill/technology/android" |
    "fill/technology/antenna" |
    "fill/technology/api" |
    "fill/technology/app-services" |
    "fill/technology/apple" |
    "fill/technology/artificial-brain" |
    "fill/technology/artificial-intelligence" |
    "fill/technology/audio-jack" |
    "fill/technology/augmented-reality" |
    "fill/technology/automated-logistics" |
    "fill/technology/baby-monitor" |
    "fill/technology/battery-level" |
    "fill/technology/binary-code" |
    "fill/technology/block" |
    "fill/technology/blockchain" |
    "fill/technology/cable" |
    "fill/technology/cctv" |
    "fill/technology/cd-reader" |
    "fill/technology/charger-cable" |
    "fill/technology/chat-bot" |
    "fill/technology/cloud-mining" |
    "fill/technology/computer" |
    "fill/technology/computer-monitor" |
    "fill/technology/connection" |
    "fill/technology/contactless" |
    "fill/technology/content-360deg" |
    "fill/technology/content-delivery" |
    "fill/technology/control-panel" |
    "fill/technology/controller-2" |
    "fill/technology/controller" |
    "fill/technology/cpu" |
    "fill/technology/cryptography" |
    "fill/technology/cyborg" |
    "fill/technology/decentralize" |
    "fill/technology/decision-process" |
    "fill/technology/device-connection" |
    "fill/technology/digital-image" |
    "fill/technology/digital-key" |
    "fill/technology/disk-reader" |
    "fill/technology/disk" |
    "fill/technology/drone" |
    "fill/technology/drone-2" |
    "fill/technology/e-reader" |
    "fill/technology/earbuds" |
    "fill/technology/electronic-circuit" |
    "fill/technology/engine-start" |
    "fill/technology/eye-recognition" |
    "fill/technology/face-recognition" |
    "fill/technology/firewall" |
    "fill/technology/gaming-console" |
    "fill/technology/gaming-controller" |
    "fill/technology/graphics-tablet" |
    "fill/technology/hacker" |
    "fill/technology/hair-clipper" |
    "fill/technology/handheld-console" |
    "fill/technology/hdmi" |
    "fill/technology/headphones-2" |
    "fill/technology/headphones-3" |
    "fill/technology/headphones" |
    "fill/technology/headset" |
    "fill/technology/humanoid" |
    "fill/technology/hybrid-car" |
    "fill/technology/keyboard-hide" |
    "fill/technology/keyboard" |
    "fill/technology/keyboard-mouse" |
    "fill/technology/keyboard-wired" |
    "fill/technology/keyboard-wireless" |
    "fill/technology/l-add" |
    "fill/technology/l-check" |
    "fill/technology/l-location" |
    "fill/technology/l-remove" |
    "fill/technology/l-search" |
    "fill/technology/l-security" |
    "fill/technology/l-settings" |
    "fill/technology/l-sync" |
    "fill/technology/l-system-update" |
    "fill/technology/landscape-orientation" |
    "fill/technology/laptop-1" |
    "fill/technology/laptop-2" |
    "fill/technology/laptop" |
    "fill/technology/license-key" |
    "fill/technology/live-streaming" |
    "fill/technology/lock-landscape" |
    "fill/technology/lock-orientation" |
    "fill/technology/lock-portrait" |
    "fill/technology/logic" |
    "fill/technology/machine-learning" |
    "fill/technology/media-player" |
    "fill/technology/messaging" |
    "fill/technology/metrics" |
    "fill/technology/mic-2" |
    "fill/technology/mic" |
    "fill/technology/migration" |
    "fill/technology/mobile-banking" |
    "fill/technology/mobile-chat" |
    "fill/technology/mobile-phone" |
    "fill/technology/mouse-2" |
    "fill/technology/mouse" |
    "fill/technology/music-player" |
    "fill/technology/navigation" |
    "fill/technology/nodes" |
    "fill/technology/offline" |
    "fill/technology/online-banking" |
    "fill/technology/open-ai" |
    "fill/technology/p-add" |
    "fill/technology/p-check" |
    "fill/technology/p-edit" |
    "fill/technology/p-heart" |
    "fill/technology/p-location" |
    "fill/technology/p-remove" |
    "fill/technology/p-search" |
    "fill/technology/p-settings" |
    "fill/technology/p-share" |
    "fill/technology/p-sync" |
    "fill/technology/p-system-update" |
    "fill/technology/p-time" |
    "fill/technology/parking-sensors" |
    "fill/technology/pattern-recognition" |
    "fill/technology/pc-monitor" |
    "fill/technology/pc-mouse" |
    "fill/technology/pc-play-media" |
    "fill/technology/pc" |
    "fill/technology/pci-card" |
    "fill/technology/phone-button" |
    "fill/technology/phone-camera-back" |
    "fill/technology/phone-camera-front" |
    "fill/technology/phone-charging" |
    "fill/technology/phone-charging-2" |
    "fill/technology/phone-charging-3" |
    "fill/technology/phone-dock" |
    "fill/technology/phone-toolbar" |
    "fill/technology/plug-2" |
    "fill/technology/plug" |
    "fill/technology/print" |
    "fill/technology/printer" |
    "fill/technology/projector" |
    "fill/technology/ram" |
    "fill/technology/ram-2" |
    "fill/technology/reading-tablet" |
    "fill/technology/remote-control" |
    "fill/technology/robot-cleaner" |
    "fill/technology/robotic-arm" |
    "fill/technology/router" |
    "fill/technology/satellite" |
    "fill/technology/satellite-dish" |
    "fill/technology/screen-reader" |
    "fill/technology/screen-rotation" |
    "fill/technology/screen-sharing-2" |
    "fill/technology/screen-sharing-off-2" |
    "fill/technology/send-to-phone" |
    "fill/technology/sensor" |
    "fill/technology/server" |
    "fill/technology/server-rack" |
    "fill/technology/signal" |
    "fill/technology/sim-card" |
    "fill/technology/smart-house" |
    "fill/technology/smartphone" |
    "fill/technology/smartwatch" |
    "fill/technology/socket-europe-1" |
    "fill/technology/socket-europe-2" |
    "fill/technology/socket" |
    "fill/technology/socket-uk" |
    "fill/technology/sparks" |
    "fill/technology/ssd" |
    "fill/technology/sync-devices" |
    "fill/technology/system-update" |
    "fill/technology/tablet-2" |
    "fill/technology/tablet-charging" |
    "fill/technology/tablet-toolbar" |
    "fill/technology/tablet" |
    "fill/technology/three-dimensional-object" |
    "fill/technology/three-dimensional-world" |
    "fill/technology/traffic" |
    "fill/technology/transactions" |
    "fill/technology/translation" |
    "fill/technology/tv-stand" |
    "fill/technology/tv" |
    "fill/technology/usb" |
    "fill/technology/video-off" |
    "fill/technology/video-player" |
    "fill/technology/vintage-computer" |
    "fill/technology/vintage-tv" |
    "fill/technology/virtual-assistant-2" |
    "fill/technology/virtual-assistant" |
    "fill/technology/virtual-environment" |
    "fill/technology/virtual-reality" |
    "fill/technology/voice-recognition" |
    "fill/technology/vpn" |
    "fill/technology/vr-controller" |
    "fill/technology/vr-headset" |
    "fill/technology/watch-2" |
    "fill/technology/watch" |
    "fill/technology/webcam-2" |
    "fill/technology/webcam" |
    "fill/technology/wifi-2" |
    "fill/technology/wifi" |
    "fill/technology/wifi-off" |
    "fill/technology/wifi-protected" |
    "fill/technology/wifi-router" |
    "fill/technology/wireless-charging" |
    "fill/travel/airplane" |
    "fill/travel/airport" |
    "fill/travel/airport-trolley" |
    "fill/travel/anchor" |
    "fill/travel/astronaut" |
    "fill/travel/axe" |
    "fill/travel/backpack" |
    "fill/travel/backpack-2" |
    "fill/travel/bag" |
    "fill/travel/baggage-collection" |
    "fill/travel/baggage-scale" |
    "fill/travel/barbecue" |
    "fill/travel/beach-bat" |
    "fill/travel/beach-umbrella" |
    "fill/travel/big-ben" |
    "fill/travel/bikini" |
    "fill/travel/binoculars" |
    "fill/travel/blue-mosque" |
    "fill/travel/brandenburg-gate" |
    "fill/travel/buddhist-temple" |
    "fill/travel/burj-al-arab" |
    "fill/travel/c-info" |
    "fill/travel/camper" |
    "fill/travel/camping" |
    "fill/travel/camping-lantern" |
    "fill/travel/castle" |
    "fill/travel/check-in" |
    "fill/travel/check-out" |
    "fill/travel/church" |
    "fill/travel/cn-tower" |
    "fill/travel/cocktail" |
    "fill/travel/colosseum" |
    "fill/travel/concierge" |
    "fill/travel/currency-exchange-2" |
    "fill/travel/data-table" |
    "fill/travel/double-bed" |
    "fill/travel/drink-2" |
    "fill/travel/escalator" |
    "fill/travel/explore-2" |
    "fill/travel/find-baggage" |
    "fill/travel/fire" |
    "fill/travel/flight-connection" |
    "fill/travel/flight" |
    "fill/travel/globe" |
    "fill/travel/globe-2" |
    "fill/travel/golden-gate-bridge" |
    "fill/travel/great-wall" |
    "fill/travel/honeymoon" |
    "fill/travel/hotel-bell" |
    "fill/travel/hotel" |
    "fill/travel/hotel-symbol" |
    "fill/travel/hut" |
    "fill/travel/igloo" |
    "fill/travel/info-point" |
    "fill/travel/jellyfish" |
    "fill/travel/landing" |
    "fill/travel/lighthouse" |
    "fill/travel/love-car" |
    "fill/travel/luggage" |
    "fill/travel/mosque" |
    "fill/travel/no-smoking" |
    "fill/travel/ny-building" |
    "fill/travel/octopus" |
    "fill/travel/pagoda" |
    "fill/travel/palm-tree" |
    "fill/travel/paris-tower" |
    "fill/travel/parking" |
    "fill/travel/passenger" |
    "fill/travel/passport" |
    "fill/travel/pickaxe" |
    "fill/travel/pisa-tower" |
    "fill/travel/plane" |
    "fill/travel/pyramid" |
    "fill/travel/rio-statue" |
    "fill/travel/road-sign-left" |
    "fill/travel/road-sign-right" |
    "fill/travel/rowing-oars" |
    "fill/travel/sagrada-familia" |
    "fill/travel/saint-basil-cathedral" |
    "fill/travel/security-gate" |
    "fill/travel/security-officer" |
    "fill/travel/shark" |
    "fill/travel/shark-2" |
    "fill/travel/shinto" |
    "fill/travel/shuttle" |
    "fill/travel/single-bed" |
    "fill/travel/smoking" |
    "fill/travel/snorkel-mask" |
    "fill/travel/spa" |
    "fill/travel/spaceship" |
    "fill/travel/sphinx" |
    "fill/travel/statue-of-liberty" |
    "fill/travel/sunglasses" |
    "fill/travel/surfboard" |
    "fill/travel/swimming-pool" |
    "fill/travel/swimsuit" |
    "fill/travel/swiss-knife" |
    "fill/travel/sydney-opera-house" |
    "fill/travel/table-lamp" |
    "fill/travel/take-off" |
    "fill/travel/taxi" |
    "fill/travel/telescope" |
    "fill/travel/temple-2" |
    "fill/travel/temple" |
    "fill/travel/ticket" |
    "fill/travel/toilette" |
    "fill/travel/towel-hanger" |
    "fill/travel/water-surface" |
    "fill/travel/water-wave" |
    "fill/travel/white-house" |
    "fill/travel/windmill-2" |
    "fill/travel/windsurfing" |
    "fill/travel/world-2" |
    "fill/travel/world" |
    "outline/travel/airplane" |
    "outline/travel/airport" |
    "outline/travel/airport-trolley" |
    "outline/travel/anchor" |
    "outline/travel/astronaut" |
    "outline/travel/axe" |
    "outline/travel/backpack-2" |
    "outline/travel/backpack" |
    "outline/travel/bag" |
    "outline/travel/baggage-collection" |
    "outline/travel/baggage-scale" |
    "outline/travel/barbecue" |
    "outline/travel/beach-bat" |
    "outline/travel/beach-umbrella" |
    "outline/travel/big-ben" |
    "outline/travel/bikini" |
    "outline/travel/binoculars" |
    "outline/travel/blue-mosque" |
    "outline/travel/brandenburg-gate" |
    "outline/travel/buddhist-temple" |
    "outline/travel/burj-al-arab" |
    "outline/travel/c-info" |
    "outline/travel/camper" |
    "outline/travel/camping" |
    "outline/travel/camping-lantern" |
    "outline/travel/castle" |
    "outline/travel/check-in" |
    "outline/travel/check-out" |
    "outline/travel/church" |
    "outline/travel/cn-tower" |
    "outline/travel/cocktail" |
    "outline/travel/colosseum" |
    "outline/travel/concierge" |
    "outline/travel/currency-exchange-2" |
    "outline/travel/data-table" |
    "outline/travel/double-bed" |
    "outline/travel/drink-2" |
    "outline/travel/escalator" |
    "outline/travel/explore-2" |
    "outline/travel/find-baggage" |
    "outline/travel/fire" |
    "outline/travel/flight" |
    "outline/travel/flight-connection" |
    "outline/travel/globe-2" |
    "outline/travel/globe" |
    "outline/travel/golden-gate-bridge" |
    "outline/travel/great-wall" |
    "outline/travel/honeymoon" |
    "outline/travel/hotel-bell" |
    "outline/travel/hotel" |
    "outline/travel/hotel-symbol" |
    "outline/travel/hut" |
    "outline/travel/igloo" |
    "outline/travel/info-point" |
    "outline/travel/jellyfish" |
    "outline/travel/landing" |
    "outline/travel/lighthouse" |
    "outline/travel/love-car" |
    "outline/travel/luggage" |
    "outline/travel/mosque" |
    "outline/travel/no-smoking" |
    "outline/travel/ny-building" |
    "outline/travel/octopus" |
    "outline/travel/pagoda" |
    "outline/travel/palm-tree" |
    "outline/travel/paris-tower" |
    "outline/travel/parking" |
    "outline/travel/passenger" |
    "outline/travel/passport" |
    "outline/travel/pickaxe" |
    "outline/travel/pisa-tower" |
    "outline/travel/plane" |
    "outline/travel/pyramid" |
    "outline/travel/rio-statue" |
    "outline/travel/road-sign-left" |
    "outline/travel/road-sign-right" |
    "outline/travel/rowing-oars" |
    "outline/travel/sagrada-familia" |
    "outline/travel/saint-basil-cathedral" |
    "outline/travel/security-gate" |
    "outline/travel/security-officer" |
    "outline/travel/shark" |
    "outline/travel/shark-2" |
    "outline/travel/shinto" |
    "outline/travel/shuttle" |
    "outline/travel/single-bed" |
    "outline/travel/smoking" |
    "outline/travel/snorkel-mask" |
    "outline/travel/spa" |
    "outline/travel/spaceship" |
    "outline/travel/sphinx" |
    "outline/travel/statue-of-liberty" |
    "outline/travel/sunglasses" |
    "outline/travel/surfboard" |
    "outline/travel/swimming-pool" |
    "outline/travel/swimsuit" |
    "outline/travel/swiss-knife" |
    "outline/travel/sydney-opera-house" |
    "outline/travel/table-lamp" |
    "outline/travel/take-off" |
    "outline/travel/taxi" |
    "outline/travel/telescope" |
    "outline/travel/temple-2" |
    "outline/travel/temple" |
    "outline/travel/ticket" |
    "outline/travel/toilette" |
    "outline/travel/towel-hanger" |
    "outline/travel/water-surface" |
    "outline/travel/water-wave" |
    "outline/travel/white-house" |
    "outline/travel/windmill-2" |
    "outline/travel/windsurfing" |
    "outline/travel/world" |
    "outline/travel/world-2" |
    "outline/touch gestures/2x-drag-down" |
    "outline/touch gestures/2x-drag-up" |
    "outline/touch gestures/2x-swipe-down" |
    "outline/touch gestures/2x-swipe-left" |
    "outline/touch gestures/2x-swipe-right" |
    "outline/touch gestures/2x-swipe-up" |
    "outline/touch gestures/2x-tap" |
    "outline/touch gestures/3x-swipe-left" |
    "outline/touch gestures/3x-swipe-right" |
    "outline/touch gestures/3x-swipe-up" |
    "outline/touch gestures/3x-tap" |
    "outline/touch gestures/4x-swipe-left" |
    "outline/touch gestures/4x-swipe-right" |
    "outline/touch gestures/4x-swipe-up" |
    "outline/touch gestures/active-38" |
    "outline/touch gestures/active-40" |
    "outline/touch gestures/camera-button" |
    "outline/touch gestures/double-tap" |
    "outline/touch gestures/drag-21" |
    "outline/touch gestures/drag-31" |
    "outline/touch gestures/drag-down" |
    "outline/touch gestures/drag-left" |
    "outline/touch gestures/drag-right" |
    "outline/touch gestures/drag-up" |
    "outline/touch gestures/flick-down" |
    "outline/touch gestures/flick-left" |
    "outline/touch gestures/flick-right" |
    "outline/touch gestures/flick-up" |
    "outline/touch gestures/grab" |
    "outline/touch gestures/hold" |
    "outline/touch gestures/pin-2" |
    "outline/touch gestures/pinch" |
    "outline/touch gestures/rotate-22" |
    "outline/touch gestures/rotate-23" |
    "outline/touch gestures/scan" |
    "outline/touch gestures/scroll-horizontal" |
    "outline/touch gestures/scroll-vertical" |
    "outline/touch gestures/stretch" |
    "outline/touch gestures/swipe-bottom" |
    "outline/touch gestures/swipe-left" |
    "outline/touch gestures/swipe-right" |
    "outline/touch gestures/swipe-up" |
    "outline/touch gestures/tap-01" |
    "outline/touch gestures/tap-02" |
    "fill/touch gestures/2x-drag-down" |
    "fill/touch gestures/2x-drag-up" |
    "fill/touch gestures/2x-swipe-down" |
    "fill/touch gestures/2x-swipe-left" |
    "fill/touch gestures/2x-swipe-right" |
    "fill/touch gestures/2x-swipe-up" |
    "fill/touch gestures/2x-tap" |
    "fill/touch gestures/3x-swipe-left" |
    "fill/touch gestures/3x-swipe-right" |
    "fill/touch gestures/3x-swipe-up" |
    "fill/touch gestures/3x-tap" |
    "fill/touch gestures/4x-swipe-left" |
    "fill/touch gestures/4x-swipe-right" |
    "fill/touch gestures/4x-swipe-up" |
    "fill/touch gestures/active-40" |
    "fill/touch gestures/active-38" |
    "fill/touch gestures/camera-button" |
    "fill/touch gestures/double-tap" |
    "fill/touch gestures/drag-31" |
    "fill/touch gestures/drag-21" |
    "fill/touch gestures/drag-down" |
    "fill/touch gestures/drag-left" |
    "fill/touch gestures/drag-right" |
    "fill/touch gestures/drag-up" |
    "fill/touch gestures/flick-down" |
    "fill/touch gestures/flick-left" |
    "fill/touch gestures/flick-right" |
    "fill/touch gestures/flick-up" |
    "fill/touch gestures/grab" |
    "fill/touch gestures/hold" |
    "fill/touch gestures/pin-2" |
    "fill/touch gestures/pinch" |
    "fill/touch gestures/rotate-22" |
    "fill/touch gestures/rotate-23" |
    "fill/touch gestures/scan" |
    "fill/touch gestures/scroll-horizontal" |
    "fill/touch gestures/scroll-vertical" |
    "fill/touch gestures/stretch" |
    "fill/touch gestures/swipe-bottom" |
    "fill/touch gestures/swipe-left" |
    "fill/touch gestures/swipe-right" |
    "fill/touch gestures/swipe-up" |
    "fill/touch gestures/tap-01" |
    "fill/touch gestures/tap-02" |
    "fill/multimedia/3d-glasses" |
    "fill/multimedia/adult-content" |
    "fill/multimedia/ai-generated-img" |
    "fill/multimedia/album" |
    "fill/multimedia/alpha-order" |
    "fill/multimedia/antenna" |
    "fill/multimedia/anti-shake" |
    "fill/multimedia/aperture" |
    "fill/multimedia/audio-description" |
    "fill/multimedia/audio-jack" |
    "fill/multimedia/audio-mixer" |
    "fill/multimedia/auto-flash" |
    "fill/multimedia/auto-flash-2" |
    "fill/multimedia/auto-focus" |
    "fill/multimedia/brightness" |
    "fill/multimedia/browse" |
    "fill/multimedia/btn-play-2" |
    "fill/multimedia/btn-play" |
    "fill/multimedia/btn-stop" |
    "fill/multimedia/button-eject" |
    "fill/multimedia/button-next" |
    "fill/multimedia/button-pause" |
    "fill/multimedia/button-play" |
    "fill/multimedia/button-power" |
    "fill/multimedia/button-previous" |
    "fill/multimedia/button-record" |
    "fill/multimedia/button-rewind" |
    "fill/multimedia/button-skip" |
    "fill/multimedia/button-stop" |
    "fill/multimedia/camcorder" |
    "fill/multimedia/camera" |
    "fill/multimedia/camera-2" |
    "fill/multimedia/camera-3" |
    "fill/multimedia/camera-flash" |
    "fill/multimedia/camera-flashlight" |
    "fill/multimedia/camera-focus" |
    "fill/multimedia/camera-focus-2" |
    "fill/multimedia/camera-lens" |
    "fill/multimedia/camera-roll" |
    "fill/multimedia/camera-screen" |
    "fill/multimedia/camera-shooting" |
    "fill/multimedia/camera-timer" |
    "fill/multimedia/clapperboard" |
    "fill/multimedia/clapperboard-2" |
    "fill/multimedia/clarinet" |
    "fill/multimedia/compact-camera" |
    "fill/multimedia/countdown" |
    "fill/multimedia/countdown-2" |
    "fill/multimedia/crop" |
    "fill/multimedia/cycle" |
    "fill/multimedia/digital-image" |
    "fill/multimedia/digital-piano" |
    "fill/multimedia/drums" |
    "fill/multimedia/earbuds" |
    "fill/multimedia/edit-color" |
    "fill/multimedia/edit-contrast" |
    "fill/multimedia/edit-curves" |
    "fill/multimedia/edit-levels" |
    "fill/multimedia/edit-saturation" |
    "fill/multimedia/event-ticket" |
    "fill/multimedia/expand" |
    "fill/multimedia/face-recognition" |
    "fill/multimedia/file-audio" |
    "fill/multimedia/film" |
    "fill/multimedia/flash-off-2" |
    "fill/multimedia/flash-off" |
    "fill/multimedia/folder-image" |
    "fill/multimedia/folder-music" |
    "fill/multimedia/frame-effect" |
    "fill/multimedia/full-screen" |
    "fill/multimedia/fullscreen" |
    "fill/multimedia/grain-effect" |
    "fill/multimedia/grid" |
    "fill/multimedia/guitar" |
    "fill/multimedia/headphones-2" |
    "fill/multimedia/headphones-3" |
    "fill/multimedia/headphones" |
    "fill/multimedia/headphones-mic" |
    "fill/multimedia/image-add" |
    "fill/multimedia/image-delete" |
    "fill/multimedia/image-location" |
    "fill/multimedia/image" |
    "fill/multimedia/img-rotate-left" |
    "fill/multimedia/img-rotate-right" |
    "fill/multimedia/img-stack" |
    "fill/multimedia/img" |
    "fill/multimedia/instant-camera-2" |
    "fill/multimedia/instant-camera" |
    "fill/multimedia/interview" |
    "fill/multimedia/kid-2" |
    "fill/multimedia/knob" |
    "fill/multimedia/layers-2" |
    "fill/multimedia/lightning" |
    "fill/multimedia/logo-mixer" |
    "fill/multimedia/loudspeaker" |
    "fill/multimedia/love-movie" |
    "fill/multimedia/macro" |
    "fill/multimedia/media-player" |
    "fill/multimedia/media-stream" |
    "fill/multimedia/mic" |
    "fill/multimedia/mic-2" |
    "fill/multimedia/microphone-2" |
    "fill/multimedia/microphone-off" |
    "fill/multimedia/microphone" |
    "fill/multimedia/movie-2" |
    "fill/multimedia/movie" |
    "fill/multimedia/movie-3" |
    "fill/multimedia/movie-reel" |
    "fill/multimedia/music-album" |
    "fill/multimedia/music" |
    "fill/multimedia/music-cloud" |
    "fill/multimedia/music-note" |
    "fill/multimedia/music-playlist" |
    "fill/multimedia/night" |
    "fill/multimedia/no-photo" |
    "fill/multimedia/offline" |
    "fill/multimedia/options" |
    "fill/multimedia/pc-play-media" |
    "fill/multimedia/phone-camera-back" |
    "fill/multimedia/phone-music" |
    "fill/multimedia/photo-album" |
    "fill/multimedia/photo" |
    "fill/multimedia/photo-frame" |
    "fill/multimedia/photo-not-allowed" |
    "fill/multimedia/piano-2" |
    "fill/multimedia/piano" |
    "fill/multimedia/picture" |
    "fill/multimedia/play-media" |
    "fill/multimedia/play-movie" |
    "fill/multimedia/player" |
    "fill/multimedia/playlist" |
    "fill/multimedia/podcast-mic" |
    "fill/multimedia/podcast" |
    "fill/multimedia/polaroid" |
    "fill/multimedia/polaroid-photo" |
    "fill/multimedia/polaroid-portrait" |
    "fill/multimedia/polaroid-shot-delete" |
    "fill/multimedia/polaroid-shot-new" |
    "fill/multimedia/polaroid-shots" |
    "fill/multimedia/progress-indicator" |
    "fill/multimedia/projector" |
    "fill/multimedia/radio" |
    "fill/multimedia/random" |
    "fill/multimedia/raw-image" |
    "fill/multimedia/rotate-camera" |
    "fill/multimedia/record-player" |
    "fill/multimedia/rotate-left" |
    "fill/multimedia/rotate-right" |
    "fill/multimedia/save-to-list" |
    "fill/multimedia/saxophone" |
    "fill/multimedia/scale-2" |
    "fill/multimedia/screen-reader" |
    "fill/multimedia/screen-sharing-2" |
    "fill/multimedia/screen-sharing-off-2" |
    "fill/multimedia/screen-touch" |
    "fill/multimedia/sd-card" |
    "fill/multimedia/selfie-2" |
    "fill/multimedia/selfie" |
    "fill/multimedia/sharpen" |
    "fill/multimedia/sound" |
    "fill/multimedia/sound-wave" |
    "fill/multimedia/soundwave" |
    "fill/multimedia/sparks" |
    "fill/multimedia/speaker" |
    "fill/multimedia/speaker-2" |
    "fill/multimedia/sport-mode" |
    "fill/multimedia/sticker" |
    "fill/multimedia/subtitles" |
    "fill/multimedia/sun" |
    "fill/multimedia/tape" |
    "fill/multimedia/temperature" |
    "fill/multimedia/ticket" |
    "fill/multimedia/tool-blur" |
    "fill/multimedia/tripod" |
    "fill/multimedia/trumpet" |
    "fill/multimedia/vibrance" |
    "fill/multimedia/video-camera" |
    "fill/multimedia/video-gallery-2" |
    "fill/multimedia/video-gallery" |
    "fill/multimedia/video" |
    "fill/multimedia/video-off" |
    "fill/multimedia/video-player" |
    "fill/multimedia/video-playlist" |
    "fill/multimedia/vignette" |
    "fill/multimedia/violin" |
    "fill/multimedia/volume" |
    "fill/multimedia/volume-2" |
    "fill/multimedia/volume-down" |
    "fill/multimedia/volume-mute" |
    "fill/multimedia/volume-off" |
    "fill/multimedia/volume-up" |
    "fill/multimedia/white-balance" |
    "outline/multimedia/3d-glasses" |
    "outline/multimedia/adult-content" |
    "outline/multimedia/ai-generated-img" |
    "outline/multimedia/album" |
    "outline/multimedia/alpha-order" |
    "outline/multimedia/antenna" |
    "outline/multimedia/anti-shake" |
    "outline/multimedia/aperture" |
    "outline/multimedia/audio-description" |
    "outline/multimedia/audio-jack" |
    "outline/multimedia/audio-mixer" |
    "outline/multimedia/auto-flash" |
    "outline/multimedia/auto-flash-2" |
    "outline/multimedia/auto-focus" |
    "outline/multimedia/brightness" |
    "outline/multimedia/browse" |
    "outline/multimedia/btn-play-2" |
    "outline/multimedia/btn-play" |
    "outline/multimedia/btn-stop" |
    "outline/multimedia/button-eject" |
    "outline/multimedia/button-next" |
    "outline/multimedia/button-pause" |
    "outline/multimedia/button-play" |
    "outline/multimedia/button-power" |
    "outline/multimedia/button-previous" |
    "outline/multimedia/button-record" |
    "outline/multimedia/button-rewind" |
    "outline/multimedia/button-skip" |
    "outline/multimedia/button-stop" |
    "outline/multimedia/camcorder" |
    "outline/multimedia/camera-2" |
    "outline/multimedia/camera" |
    "outline/multimedia/camera-3" |
    "outline/multimedia/camera-flash" |
    "outline/multimedia/camera-flashlight" |
    "outline/multimedia/camera-focus" |
    "outline/multimedia/camera-focus-2" |
    "outline/multimedia/camera-lens" |
    "outline/multimedia/camera-roll" |
    "outline/multimedia/camera-screen" |
    "outline/multimedia/camera-shooting" |
    "outline/multimedia/camera-timer" |
    "outline/multimedia/clapperboard" |
    "outline/multimedia/clapperboard-2" |
    "outline/multimedia/clarinet" |
    "outline/multimedia/compact-camera" |
    "outline/multimedia/countdown-2" |
    "outline/multimedia/countdown" |
    "outline/multimedia/crop" |
    "outline/multimedia/cycle" |
    "outline/multimedia/digital-image" |
    "outline/multimedia/digital-piano" |
    "outline/multimedia/drums" |
    "outline/multimedia/earbuds" |
    "outline/multimedia/edit-color" |
    "outline/multimedia/edit-contrast" |
    "outline/multimedia/edit-curves" |
    "outline/multimedia/edit-levels" |
    "outline/multimedia/edit-saturation" |
    "outline/multimedia/event-ticket" |
    "outline/multimedia/expand" |
    "outline/multimedia/face-recognition" |
    "outline/multimedia/file-audio" |
    "outline/multimedia/film" |
    "outline/multimedia/flash-off-2" |
    "outline/multimedia/flash-off" |
    "outline/multimedia/folder-image" |
    "outline/multimedia/folder-music" |
    "outline/multimedia/frame-effect" |
    "outline/multimedia/full-screen" |
    "outline/multimedia/fullscreen" |
    "outline/multimedia/grain-effect" |
    "outline/multimedia/grid" |
    "outline/multimedia/guitar" |
    "outline/multimedia/headphones" |
    "outline/multimedia/headphones-2" |
    "outline/multimedia/headphones-3" |
    "outline/multimedia/headphones-mic" |
    "outline/multimedia/image-add" |
    "outline/multimedia/image" |
    "outline/multimedia/image-delete" |
    "outline/multimedia/image-location" |
    "outline/multimedia/img-rotate-left" |
    "outline/multimedia/img-rotate-right" |
    "outline/multimedia/img-stack" |
    "outline/multimedia/img" |
    "outline/multimedia/instant-camera-2" |
    "outline/multimedia/instant-camera" |
    "outline/multimedia/interview" |
    "outline/multimedia/kid-2" |
    "outline/multimedia/knob" |
    "outline/multimedia/layers-2" |
    "outline/multimedia/lightning" |
    "outline/multimedia/loudspeaker" |
    "outline/multimedia/love-movie" |
    "outline/multimedia/macro" |
    "outline/multimedia/media-player" |
    "outline/multimedia/media-stream" |
    "outline/multimedia/mic-2" |
    "outline/multimedia/mic" |
    "outline/multimedia/microphone-2" |
    "outline/multimedia/microphone" |
    "outline/multimedia/microphone-off" |
    "outline/multimedia/movie-2" |
    "outline/multimedia/movie-3" |
    "outline/multimedia/movie" |
    "outline/multimedia/movie-reel" |
    "outline/multimedia/music" |
    "outline/multimedia/music-album" |
    "outline/multimedia/music-cloud" |
    "outline/multimedia/music-note" |
    "outline/multimedia/music-playlist" |
    "outline/multimedia/night" |
    "outline/multimedia/no-photo" |
    "outline/multimedia/offline" |
    "outline/multimedia/options" |
    "outline/multimedia/pc-play-media" |
    "outline/multimedia/phone-camera-back" |
    "outline/multimedia/phone-music" |
    "outline/multimedia/photo" |
    "outline/multimedia/photo-album" |
    "outline/multimedia/photo-frame" |
    "outline/multimedia/photo-not-allowed" |
    "outline/multimedia/piano-2" |
    "outline/multimedia/piano" |
    "outline/multimedia/picture" |
    "outline/multimedia/play-media" |
    "outline/multimedia/play-movie" |
    "outline/multimedia/player" |
    "outline/multimedia/playlist" |
    "outline/multimedia/podcast-mic" |
    "outline/multimedia/podcast" |
    "outline/multimedia/polaroid-photo" |
    "outline/multimedia/polaroid-portrait" |
    "outline/multimedia/polaroid-shot-delete" |
    "outline/multimedia/polaroid" |
    "outline/multimedia/polaroid-shot-new" |
    "outline/multimedia/polaroid-shots" |
    "outline/multimedia/progress-indicator" |
    "outline/multimedia/projector" |
    "outline/multimedia/radio" |
    "outline/multimedia/random" |
    "outline/multimedia/raw-image" |
    "outline/multimedia/record-player" |
    "outline/multimedia/rotate-camera" |
    "outline/multimedia/rotate-left" |
    "outline/multimedia/rotate-right" |
    "outline/multimedia/save-to-list" |
    "outline/multimedia/saxophone" |
    "outline/multimedia/scale-2" |
    "outline/multimedia/screen-reader" |
    "outline/multimedia/screen-sharing-2" |
    "outline/multimedia/screen-sharing-off-2" |
    "outline/multimedia/screen-touch" |
    "outline/multimedia/sd-card" |
    "outline/multimedia/selfie" |
    "outline/multimedia/selfie-2" |
    "outline/multimedia/sharpen" |
    "outline/multimedia/sound-wave" |
    "outline/multimedia/sound" |
    "outline/multimedia/soundwave" |
    "outline/multimedia/sparks" |
    "outline/multimedia/speaker-2" |
    "outline/multimedia/speaker" |
    "outline/multimedia/sport-mode" |
    "outline/multimedia/sticker" |
    "outline/multimedia/subtitles" |
    "outline/multimedia/sun" |
    "outline/multimedia/tape" |
    "outline/multimedia/temperature" |
    "outline/multimedia/ticket" |
    "outline/multimedia/tool-blur" |
    "outline/multimedia/tripod" |
    "outline/multimedia/trumpet" |
    "outline/multimedia/vibrance" |
    "outline/multimedia/video" |
    "outline/multimedia/video-camera" |
    "outline/multimedia/video-gallery-2" |
    "outline/multimedia/video-gallery" |
    "outline/multimedia/video-off" |
    "outline/multimedia/video-player" |
    "outline/multimedia/video-playlist" |
    "outline/multimedia/vignette" |
    "outline/multimedia/violin" |
    "outline/multimedia/volume-2" |
    "outline/multimedia/volume" |
    "outline/multimedia/volume-down" |
    "outline/multimedia/volume-mute" |
    "outline/multimedia/volume-off" |
    "outline/multimedia/volume-up" |
    "outline/multimedia/white-balance" |
    "color/emoticons/alien-29" |
    "color/emoticons/angel-face" |
    "color/emoticons/angry-10" |
    "color/emoticons/angry-44" |
    "color/emoticons/angry-face" |
    "color/emoticons/bandaged-head" |
    "color/emoticons/big-eyes" |
    "color/emoticons/big-grin" |
    "color/emoticons/big-smile" |
    "color/emoticons/bigmouth" |
    "color/emoticons/bleah" |
    "color/emoticons/bomb" |
    "color/emoticons/bored" |
    "color/emoticons/broken-heart" |
    "color/emoticons/bug" |
    "color/emoticons/cake" |
    "color/emoticons/child-v2" |
    "color/emoticons/child" |
    "color/emoticons/clapping-hands" |
    "color/emoticons/clown" |
    "color/emoticons/cold-sweat" |
    "color/emoticons/cowboy" |
    "color/emoticons/crazy-eyes" |
    "color/emoticons/crossed-fingers" |
    "color/emoticons/cry-15" |
    "color/emoticons/cry-57" |
    "color/emoticons/cursing" |
    "color/emoticons/cute" |
    "color/emoticons/devil" |
    "color/emoticons/disgusted" |
    "color/emoticons/dizzy-face" |
    "color/emoticons/drool" |
    "color/emoticons/excited" |
    "color/emoticons/eyeballs" |
    "color/emoticons/face-with-monocle" |
    "color/emoticons/fairy-wand" |
    "color/emoticons/fearful-face" |
    "color/emoticons/finger-snap" |
    "color/emoticons/fist" |
    "color/emoticons/flexed-biceps" |
    "color/emoticons/folded-hands" |
    "color/emoticons/frowning-face" |
    "color/emoticons/frustrated" |
    "color/emoticons/ghost" |
    "color/emoticons/grinning-face" |
    "color/emoticons/hand-pointing-down" |
    "color/emoticons/hand-pointing-left" |
    "color/emoticons/hand-pointing-right" |
    "color/emoticons/hand-pointing-up" |
    "color/emoticons/happy-face" |
    "color/emoticons/happy-sun" |
    "color/emoticons/heart-face" |
    "color/emoticons/heart" |
    "color/emoticons/horns-sign" |
    "color/emoticons/hug" |
    "color/emoticons/hungry" |
    "color/emoticons/index-pointing-up" |
    "color/emoticons/kid" |
    "color/emoticons/kiss" |
    "color/emoticons/kissy" |
    "color/emoticons/laugh-17" |
    "color/emoticons/laugh-35" |
    "color/emoticons/lips" |
    "color/emoticons/lol" |
    "color/emoticons/love-you-gesture" |
    "color/emoticons/lying-face" |
    "color/emoticons/mad-12" |
    "color/emoticons/mad-58" |
    "color/emoticons/malicious" |
    "color/emoticons/manga-62" |
    "color/emoticons/manga-63" |
    "color/emoticons/mask-face" |
    "color/emoticons/middle-finger" |
    "color/emoticons/mind-blown" |
    "color/emoticons/money-face" |
    "color/emoticons/monkey-hear-no" |
    "color/emoticons/monkey-see-no" |
    "color/emoticons/monkey-speak-no" |
    "color/emoticons/monster" |
    "color/emoticons/nerd" |
    "color/emoticons/ninja" |
    "color/emoticons/no-words" |
    "color/emoticons/ok-hand" |
    "color/emoticons/parrot" |
    "color/emoticons/party-popper" |
    "color/emoticons/party" |
    "color/emoticons/penguin" |
    "color/emoticons/phone-hand" |
    "color/emoticons/pirate" |
    "color/emoticons/poop" |
    "color/emoticons/psycho-face" |
    "color/emoticons/puzzled" |
    "color/emoticons/quiet" |
    "color/emoticons/quite-happy" |
    "color/emoticons/raised-eyebrow" |
    "color/emoticons/raised-fist" |
    "color/emoticons/raised-hand" |
    "color/emoticons/raising-hands" |
    "color/emoticons/robot" |
    "color/emoticons/rock" |
    "color/emoticons/sad-sweat-face" |
    "color/emoticons/sad" |
    "color/emoticons/satisfied" |
    "color/emoticons/scream" |
    "color/emoticons/selfie-hand" |
    "color/emoticons/shaking-hands" |
    "color/emoticons/shark" |
    "color/emoticons/shy" |
    "color/emoticons/sick-face" |
    "color/emoticons/sick" |
    "color/emoticons/silly" |
    "color/emoticons/skull" |
    "color/emoticons/sleep" |
    "color/emoticons/sleep-2" |
    "color/emoticons/sloth" |
    "color/emoticons/sleep-face" |
    "color/emoticons/smart" |
    "color/emoticons/smile" |
    "color/emoticons/smiley-face" |
    "color/emoticons/smiling-face" |
    "color/emoticons/smiling-face-glasses" |
    "color/emoticons/smiling-face-sunglasses" |
    "color/emoticons/sneezing-face" |
    "color/emoticons/soldier" |
    "color/emoticons/speechless" |
    "color/emoticons/spiteful" |
    "color/emoticons/sunglasses-48" |
    "color/emoticons/surprise" |
    "color/emoticons/thinker" |
    "color/emoticons/thumb-down" |
    "color/emoticons/thumb-up" |
    "color/emoticons/upset-13" |
    "color/emoticons/upset-14" |
    "color/emoticons/upside-down-face" |
    "color/emoticons/victory-hand" |
    "color/emoticons/vomit-face" |
    "color/emoticons/vulcan-salute" |
    "color/emoticons/waving-hand" |
    "color/emoticons/what" |
    "color/emoticons/whiskers" |
    "color/emoticons/wink-06" |
    "color/emoticons/wink-11" |
    "color/emoticons/wink-69" |
    "fill/emoticons/alien-29" |
    "fill/emoticons/angry-10" |
    "fill/emoticons/angry-44" |
    "fill/emoticons/big-eyes" |
    "fill/emoticons/big-smile" |
    "fill/emoticons/bigmouth" |
    "fill/emoticons/bleah" |
    "fill/emoticons/bomb" |
    "fill/emoticons/bored" |
    "fill/emoticons/broken-heart" |
    "fill/emoticons/bug" |
    "fill/emoticons/cake" |
    "fill/emoticons/child" |
    "fill/emoticons/cry-15" |
    "fill/emoticons/cry-57" |
    "fill/emoticons/cute" |
    "fill/emoticons/devil" |
    "fill/emoticons/disgusted" |
    "fill/emoticons/dizzy-face" |
    "fill/emoticons/fairy-wand" |
    "fill/emoticons/finger-snap" |
    "fill/emoticons/fist" |
    "fill/emoticons/ghost" |
    "fill/emoticons/happy-sun" |
    "fill/emoticons/heart" |
    "fill/emoticons/kid" |
    "fill/emoticons/kiss" |
    "fill/emoticons/laugh-17" |
    "fill/emoticons/laugh-35" |
    "fill/emoticons/lips" |
    "fill/emoticons/mad-12" |
    "fill/emoticons/mad-58" |
    "fill/emoticons/malicious" |
    "fill/emoticons/manga-62" |
    "fill/emoticons/manga-63" |
    "fill/emoticons/mask-face" |
    "fill/emoticons/monster" |
    "fill/emoticons/nerd" |
    "fill/emoticons/ninja" |
    "fill/emoticons/no-words" |
    "fill/emoticons/parrot" |
    "fill/emoticons/party" |
    "fill/emoticons/penguin" |
    "fill/emoticons/pirate" |
    "fill/emoticons/poop" |
    "fill/emoticons/puzzled" |
    "fill/emoticons/quite-happy" |
    "fill/emoticons/robot" |
    "fill/emoticons/rock" |
    "fill/emoticons/sad" |
    "fill/emoticons/satisfied" |
    "fill/emoticons/shark" |
    "fill/emoticons/shy" |
    "fill/emoticons/sick" |
    "fill/emoticons/silly" |
    "fill/emoticons/skull" |
    "fill/emoticons/sleep-2" |
    "fill/emoticons/sleep" |
    "fill/emoticons/sloth" |
    "fill/emoticons/smart" |
    "fill/emoticons/smile" |
    "fill/emoticons/smiling-face-glasses" |
    "fill/emoticons/smiling-face-sunglasses" |
    "fill/emoticons/soldier" |
    "fill/emoticons/speechless" |
    "fill/emoticons/spiteful" |
    "fill/emoticons/sunglasses-48" |
    "fill/emoticons/surprise" |
    "fill/emoticons/thumb-down" |
    "fill/emoticons/thumb-up" |
    "fill/emoticons/upset-13" |
    "fill/emoticons/upset-14" |
    "fill/emoticons/what" |
    "fill/emoticons/whiskers" |
    "fill/emoticons/wink-06" |
    "fill/emoticons/wink-11" |
    "fill/emoticons/wink-69" |
    "outline/emoticons/alien-29" |
    "outline/emoticons/angry-10" |
    "outline/emoticons/angry-44" |
    "outline/emoticons/big-eyes" |
    "outline/emoticons/big-smile" |
    "outline/emoticons/bigmouth" |
    "outline/emoticons/bleah" |
    "outline/emoticons/bomb" |
    "outline/emoticons/bored" |
    "outline/emoticons/broken-heart" |
    "outline/emoticons/bug" |
    "outline/emoticons/cake" |
    "outline/emoticons/child" |
    "outline/emoticons/cry-15" |
    "outline/emoticons/cute" |
    "outline/emoticons/cry-57" |
    "outline/emoticons/devil" |
    "outline/emoticons/disgusted" |
    "outline/emoticons/dizzy-face" |
    "outline/emoticons/fairy-wand" |
    "outline/emoticons/finger-snap" |
    "outline/emoticons/fist" |
    "outline/emoticons/ghost" |
    "outline/emoticons/happy-sun" |
    "outline/emoticons/heart" |
    "outline/emoticons/kid" |
    "outline/emoticons/kiss" |
    "outline/emoticons/laugh-17" |
    "outline/emoticons/laugh-35" |
    "outline/emoticons/lips" |
    "outline/emoticons/mad-12" |
    "outline/emoticons/mad-58" |
    "outline/emoticons/malicious" |
    "outline/emoticons/manga-62" |
    "outline/emoticons/manga-63" |
    "outline/emoticons/mask-face" |
    "outline/emoticons/monster" |
    "outline/emoticons/nerd" |
    "outline/emoticons/ninja" |
    "outline/emoticons/no-words" |
    "outline/emoticons/parrot" |
    "outline/emoticons/party" |
    "outline/emoticons/penguin" |
    "outline/emoticons/pirate" |
    "outline/emoticons/puzzled" |
    "outline/emoticons/poop" |
    "outline/emoticons/quite-happy" |
    "outline/emoticons/robot" |
    "outline/emoticons/rock" |
    "outline/emoticons/sad" |
    "outline/emoticons/satisfied" |
    "outline/emoticons/shark" |
    "outline/emoticons/shy" |
    "outline/emoticons/sick" |
    "outline/emoticons/silly" |
    "outline/emoticons/skull" |
    "outline/emoticons/sleep-2" |
    "outline/emoticons/sleep" |
    "outline/emoticons/sloth" |
    "outline/emoticons/smart" |
    "outline/emoticons/smile" |
    "outline/emoticons/smiling-face-glasses" |
    "outline/emoticons/smiling-face-sunglasses" |
    "outline/emoticons/soldier" |
    "outline/emoticons/speechless" |
    "outline/emoticons/spiteful" |
    "outline/emoticons/sunglasses-48" |
    "outline/emoticons/surprise" |
    "outline/emoticons/thumb-down" |
    "outline/emoticons/thumb-up" |
    "outline/emoticons/upset-13" |
    "outline/emoticons/upset-14" |
    "outline/emoticons/what" |
    "outline/emoticons/whiskers" |
    "outline/emoticons/wink-06" |
    "outline/emoticons/wink-11" |
    "outline/emoticons/wink-69" |
    "color/business/address-book" |
    "color/business/agenda" |
    "color/business/algorithm" |
    "color/business/amazon-card" |
    "color/business/amex" |
    "color/business/android-card" |
    "color/business/app-services" |
    "color/business/apple-card" |
    "color/business/archery-target" |
    "color/business/atm" |
    "color/business/award-49" |
    "color/business/badge" |
    "color/business/bank-statement" |
    "color/business/bill" |
    "color/business/bitcoin" |
    "color/business/bitcoin-card" |
    "color/business/block" |
    "color/business/blockchain" |
    "color/business/board-27" |
    "color/business/board-28" |
    "color/business/board-29" |
    "color/business/board-30" |
    "color/business/books" |
    "color/business/briefcase-24" |
    "color/business/briefcase-25" |
    "color/business/briefcase-26" |
    "color/business/bulb-61" |
    "color/business/bulb-62" |
    "color/business/bulb-63" |
    "color/business/business-agent" |
    "color/business/business-contact-85" |
    "color/business/business-contact-86" |
    "color/business/business-contact-87" |
    "color/business/business-contact-88" |
    "color/business/businessman-03" |
    "color/business/businessman-04" |
    "color/business/calculator" |
    "color/business/candlestick-chart" |
    "color/business/card-switch" |
    "color/business/certificate" |
    "color/business/chart-bar-32" |
    "color/business/chart-bar-33" |
    "color/business/chart-growth" |
    "color/business/chart-pie-35" |
    "color/business/chart-pie-36" |
    "color/business/chart" |
    "color/business/cheque" |
    "color/business/chess-knight" |
    "color/business/chess-tower" |
    "color/business/citi" |
    "color/business/cloud-mining" |
    "color/business/cockade" |
    "color/business/coins" |
    "color/business/conference-room" |
    "color/business/connect" |
    "color/business/contactless-card" |
    "color/business/contacts" |
    "color/business/copyright" |
    "color/business/credit-card-in" |
    "color/business/credit-card" |
    "color/business/credit-locked" |
    "color/business/crypto-wallet" |
    "color/business/currency-dollar" |
    "color/business/currency-euro" |
    "color/business/currency-exchange-2" |
    "color/business/currency-pound" |
    "color/business/currency-yen" |
    "color/business/debt" |
    "color/business/decentralize" |
    "color/business/decision-process" |
    "color/business/dice" |
    "color/business/diners-club" |
    "color/business/discover" |
    "color/business/factory" |
    "color/business/globe" |
    "color/business/goal-65" |
    "color/business/gold" |
    "color/business/hammer" |
    "color/business/hand-card" |
    "color/business/handout" |
    "color/business/handshake" |
    "color/business/hat" |
    "color/business/hierarchy-53" |
    "color/business/hierarchy-54" |
    "color/business/hierarchy-55" |
    "color/business/hierarchy-56" |
    "color/business/info-point" |
    "color/business/interview" |
    "color/business/jcb" |
    "color/business/joint-account" |
    "color/business/laptop-71" |
    "color/business/laptop-72" |
    "color/business/laptop-91" |
    "color/business/law" |
    "color/business/line-chart" |
    "color/business/loan" |
    "color/business/logic" |
    "color/business/maestro" |
    "color/business/mastercard" |
    "color/business/math" |
    "color/business/miner-v2" |
    "color/business/miner" |
    "color/business/mobile-banking" |
    "color/business/mobile-card" |
    "color/business/money-11" |
    "color/business/money-12" |
    "color/business/money-13" |
    "color/business/money-bag" |
    "color/business/money-coins" |
    "color/business/money-growth" |
    "color/business/money-time" |
    "color/business/money-transfer" |
    "color/business/mortgage-v2" |
    "color/business/mortgage" |
    "color/business/name-card" |
    "color/business/negative-judgement" |
    "color/business/net" |
    "color/business/new-construction" |
    "color/business/nodes" |
    "color/business/notes" |
    "color/business/office-badge" |
    "color/business/office" |
    "color/business/office-chair" |
    "color/business/office-pass" |
    "color/business/online-banking" |
    "color/business/payee" |
    "color/business/payment" |
    "color/business/payor" |
    "color/business/paypal" |
    "color/business/percentage-38" |
    "color/business/percentage-39" |
    "color/business/personal-trainer" |
    "color/business/pig" |
    "color/business/pin" |
    "color/business/plug" |
    "color/business/pos" |
    "color/business/positive-judgement" |
    "color/business/presentation" |
    "color/business/privacy-policy" |
    "color/business/progress" |
    "color/business/puzzle-09" |
    "color/business/puzzle-10" |
    "color/business/ranking" |
    "color/business/rate-down" |
    "color/business/rate-up" |
    "color/business/refund" |
    "color/business/round-dollar" |
    "color/business/round-euro" |
    "color/business/round-pound" |
    "color/business/round-yen" |
    "color/business/safe" |
    "color/business/savings" |
    "color/business/scale" |
    "color/business/sign" |
    "color/business/signature" |
    "color/business/solo" |
    "color/business/statistics" |
    "color/business/stock-market" |
    "color/business/stripe" |
    "color/business/tactic" |
    "color/business/temple" |
    "color/business/tie-01" |
    "color/business/tie-02" |
    "color/business/transaction" |
    "color/business/transactions" |
    "color/business/visa" |
    "color/business/wallet-43" |
    "color/business/wallet-44" |
    "color/business/wallet-90" |
    "color/education/abc" |
    "color/education/agenda" |
    "color/education/agenda-bookmark" |
    "color/education/album" |
    "color/education/astronomy" |
    "color/education/atom" |
    "color/education/award-49" |
    "color/education/backpack-57" |
    "color/education/backpack-58" |
    "color/education/basketball" |
    "color/education/biochemistry" |
    "color/education/biology" |
    "color/education/board-27" |
    "color/education/board-51" |
    "color/education/book-39" |
    "color/education/book-bookmark" |
    "color/education/book" |
    "color/education/book-bookmark-2" |
    "color/education/book-open-2" |
    "color/education/book-open" |
    "color/education/bookmark" |
    "color/education/books" |
    "color/education/books-46" |
    "color/education/botany" |
    "color/education/brush" |
    "color/education/bus-front-12" |
    "color/education/bus" |
    "color/education/buzz" |
    "color/education/calculator" |
    "color/education/certificate" |
    "color/education/chalkboard" |
    "color/education/chemistry" |
    "color/education/cockade" |
    "color/education/collection" |
    "color/education/compass" |
    "color/education/design" |
    "color/education/earth-science" |
    "color/education/ecology" |
    "color/education/equation" |
    "color/education/eraser-32" |
    "color/education/eraser-33" |
    "color/education/flask" |
    "color/education/function" |
    "color/education/geometry" |
    "color/education/glasses-2" |
    "color/education/glasses" |
    "color/education/globe-2" |
    "color/education/globe" |
    "color/education/grammar-check" |
    "color/education/hat-3" |
    "color/education/language" |
    "color/education/logic" |
    "color/education/marker" |
    "color/education/math" |
    "color/education/measure-02" |
    "color/education/measure-17" |
    "color/education/measure-big" |
    "color/education/medal" |
    "color/education/medicine" |
    "color/education/microbiology" |
    "color/education/microscope" |
    "color/education/molecule" |
    "color/education/notepad" |
    "color/education/notes" |
    "color/education/notification" |
    "color/education/open-book" |
    "color/education/paper-diploma" |
    "color/education/paper" |
    "color/education/paw" |
    "color/education/pc-play-media" |
    "color/education/pen-01" |
    "color/education/pen-23" |
    "color/education/pen-tool" |
    "color/education/pencil" |
    "color/education/pencil-47" |
    "color/education/pendulum" |
    "color/education/planet" |
    "color/education/potion" |
    "color/education/rat" |
    "color/education/presentation" |
    "color/education/read" |
    "color/education/reading" |
    "color/education/research" |
    "color/education/saved-items" |
    "color/education/school" |
    "color/education/soccer-ball" |
    "color/education/statistics" |
    "color/education/survey" |
    "color/education/telescope" |
    "color/education/translation" |
    "color/education/typography" |
    "color/entertainment/3d-glasses" |
    "color/entertainment/adult-content" |
    "color/entertainment/arcade" |
    "color/entertainment/archery-target" |
    "color/entertainment/armchair" |
    "color/entertainment/audio-mixer" |
    "color/entertainment/baloon" |
    "color/entertainment/board-game" |
    "color/entertainment/bowling-pins" |
    "color/entertainment/brush" |
    "color/entertainment/camera" |
    "color/entertainment/canvas" |
    "color/entertainment/chess-knight" |
    "color/entertainment/cinema" |
    "color/entertainment/clapping-hands" |
    "color/entertainment/dice" |
    "color/entertainment/dice-2" |
    "color/entertainment/exhibition" |
    "color/entertainment/fairy-wand" |
    "color/entertainment/fireworks" |
    "color/entertainment/gaming-console" |
    "color/entertainment/gaming-controller" |
    "color/entertainment/guitar" |
    "color/entertainment/handheld-console" |
    "color/entertainment/magic-wand" |
    "color/entertainment/mic" |
    "color/entertainment/movie" |
    "color/entertainment/music" |
    "color/entertainment/open-book" |
    "color/entertainment/party" |
    "color/entertainment/play-movie" |
    "color/entertainment/playing-cards" |
    "color/entertainment/popcorn" |
    "color/entertainment/projector" |
    "color/entertainment/saxophone" |
    "color/entertainment/show" |
    "color/entertainment/speaker-2" |
    "color/entertainment/temple" |
    "color/entertainment/theater" |
    "color/entertainment/theater-curtains" |
    "fill/entertainment/3d-glasses" |
    "fill/entertainment/adult-content" |
    "fill/entertainment/arcade" |
    "fill/entertainment/archery-target" |
    "fill/entertainment/armchair" |
    "fill/entertainment/audio-mixer" |
    "fill/entertainment/baloon" |
    "fill/entertainment/board-game" |
    "fill/entertainment/bowling-pins" |
    "fill/entertainment/brush" |
    "fill/entertainment/camera" |
    "fill/entertainment/canvas" |
    "fill/entertainment/chess-knight" |
    "fill/entertainment/cinema" |
    "fill/entertainment/dice-2" |
    "fill/entertainment/dice" |
    "fill/entertainment/exhibition" |
    "fill/entertainment/fairy-wand" |
    "fill/entertainment/fireworks" |
    "fill/entertainment/gaming-console" |
    "fill/entertainment/gaming-controller" |
    "fill/entertainment/guitar" |
    "fill/entertainment/handheld-console" |
    "fill/entertainment/magic-wand" |
    "fill/entertainment/mic" |
    "fill/entertainment/movie" |
    "fill/entertainment/music" |
    "fill/entertainment/open-book" |
    "fill/entertainment/party" |
    "fill/entertainment/play-movie" |
    "fill/entertainment/playing-cards" |
    "fill/entertainment/popcorn" |
    "fill/entertainment/projector" |
    "fill/entertainment/saxophone" |
    "fill/entertainment/show" |
    "fill/entertainment/speaker-2" |
    "fill/entertainment/temple" |
    "fill/entertainment/theater" |
    "fill/entertainment/theater-curtains" |
    "outline/entertainment/3d-glasses" |
    "outline/entertainment/adult-content" |
    "outline/entertainment/arcade" |
    "outline/entertainment/archery-target" |
    "outline/entertainment/armchair" |
    "outline/entertainment/audio-mixer" |
    "outline/entertainment/baloon" |
    "outline/entertainment/board-game" |
    "outline/entertainment/bowling-pins" |
    "outline/entertainment/brush" |
    "outline/entertainment/canvas" |
    "outline/entertainment/camera" |
    "outline/entertainment/chess-knight" |
    "outline/entertainment/cinema" |
    "outline/entertainment/dice-2" |
    "outline/entertainment/dice" |
    "outline/entertainment/exhibition" |
    "outline/entertainment/fairy-wand" |
    "outline/entertainment/fireworks" |
    "outline/entertainment/gaming-console" |
    "outline/entertainment/gaming-controller" |
    "outline/entertainment/guitar" |
    "outline/entertainment/handheld-console" |
    "outline/entertainment/magic-wand" |
    "outline/entertainment/mic" |
    "outline/entertainment/movie" |
    "outline/entertainment/music" |
    "outline/entertainment/open-book" |
    "outline/entertainment/party" |
    "outline/entertainment/play-movie" |
    "outline/entertainment/playing-cards" |
    "outline/entertainment/popcorn" |
    "outline/entertainment/projector" |
    "outline/entertainment/saxophone" |
    "outline/entertainment/show" |
    "outline/entertainment/speaker-2" |
    "outline/entertainment/temple" |
    "outline/entertainment/theater" |
    "outline/entertainment/theater-curtains" |
    "color/transportation/air-baloon" |
    "color/transportation/airbag" |
    "color/transportation/airplane" |
    "color/transportation/alien-33" |
    "color/transportation/anchor" |
    "color/transportation/baby-car-seat" |
    "color/transportation/battery-level" |
    "color/transportation/bike" |
    "color/transportation/bike-bmx" |
    "color/transportation/boat" |
    "color/transportation/boat-front" |
    "color/transportation/boat-small-02" |
    "color/transportation/boat-small-03" |
    "color/transportation/brakes" |
    "color/transportation/bus-front-10" |
    "color/transportation/bus-front-12" |
    "color/transportation/bus" |
    "color/transportation/car" |
    "color/transportation/car-2" |
    "color/transportation/car-accident" |
    "color/transportation/car-connect" |
    "color/transportation/car-door" |
    "color/transportation/car-front" |
    "color/transportation/car-lights" |
    "color/transportation/car-parking" |
    "color/transportation/car-simple" |
    "color/transportation/car-sport" |
    "color/transportation/car-ventilation" |
    "color/transportation/car-wash" |
    "color/transportation/cone" |
    "color/transportation/control-panel" |
    "color/transportation/cycling" |
    "color/transportation/dashboard" |
    "color/transportation/delivery" |
    "color/transportation/drone-2" |
    "color/transportation/drone" |
    "color/transportation/engine-start" |
    "color/transportation/engine" |
    "color/transportation/flight" |
    "color/transportation/flip-up" |
    "color/transportation/fuel-2" |
    "color/transportation/fuel" |
    "color/transportation/fuel-electric" |
    "color/transportation/helicopter" |
    "color/transportation/helmet" |
    "color/transportation/hybrid-car" |
    "color/transportation/landing" |
    "color/transportation/light-traffic" |
    "color/transportation/love-car" |
    "color/transportation/moto" |
    "color/transportation/oil" |
    "color/transportation/parking" |
    "color/transportation/parking-sensors" |
    "color/transportation/plane" |
    "color/transportation/power-level" |
    "color/transportation/racing-bike" |
    "color/transportation/rim" |
    "color/transportation/road-2" |
    "color/transportation/road" |
    "color/transportation/scooter" |
    "color/transportation/seat" |
    "color/transportation/seatbelt" |
    "color/transportation/sensor" |
    "color/transportation/shuttle" |
    "color/transportation/skateboard-2" |
    "color/transportation/skateboard" |
    "color/transportation/speedometer" |
    "color/transportation/steering-wheel" |
    "color/transportation/stop-sign" |
    "color/transportation/submarine" |
    "color/transportation/take-off" |
    "color/transportation/taxi" |
    "color/transportation/tractor" |
    "color/transportation/train-speed" |
    "color/transportation/train" |
    "color/transportation/tram" |
    "color/transportation/truck-front" |
    "color/transportation/trunk" |
    "color/transportation/ventilation" |
    "color/transportation/vespa-front" |
    "color/transportation/vespa" |
    "color/transportation/walk" |
    "color/transportation/washing-fluid" |
    "color/transportation/wheel" |
    "color/transportation/wheel-2" |
    "fill/transportation/air-baloon" |
    "fill/transportation/airbag" |
    "fill/transportation/airplane" |
    "fill/transportation/alien-33" |
    "fill/transportation/anchor" |
    "fill/transportation/baby-car-seat" |
    "fill/transportation/battery-level" |
    "fill/transportation/bike" |
    "fill/transportation/bike-bmx" |
    "fill/transportation/boat" |
    "fill/transportation/boat-front" |
    "fill/transportation/boat-small-02" |
    "fill/transportation/boat-small-03" |
    "fill/transportation/brakes" |
    "fill/transportation/bus-front-10" |
    "fill/transportation/bus" |
    "fill/transportation/bus-front-12" |
    "fill/transportation/car-2" |
    "fill/transportation/car-accident" |
    "fill/transportation/car" |
    "fill/transportation/car-connect" |
    "fill/transportation/car-door" |
    "fill/transportation/car-front" |
    "fill/transportation/car-lights" |
    "fill/transportation/car-parking" |
    "fill/transportation/car-simple" |
    "fill/transportation/car-sport" |
    "fill/transportation/car-ventilation" |
    "fill/transportation/car-wash" |
    "fill/transportation/cone" |
    "fill/transportation/control-panel" |
    "fill/transportation/cycling" |
    "fill/transportation/dashboard" |
    "fill/transportation/delivery" |
    "fill/transportation/drone-2" |
    "fill/transportation/drone" |
    "fill/transportation/engine-start" |
    "fill/transportation/engine" |
    "fill/transportation/flight" |
    "fill/transportation/flip-up" |
    "fill/transportation/fuel-2" |
    "fill/transportation/fuel" |
    "fill/transportation/fuel-electric" |
    "fill/transportation/helicopter" |
    "fill/transportation/helmet" |
    "fill/transportation/hybrid-car" |
    "fill/transportation/landing" |
    "fill/transportation/light-traffic" |
    "fill/transportation/love-car" |
    "fill/transportation/moto" |
    "fill/transportation/oil" |
    "fill/transportation/parking" |
    "fill/transportation/parking-sensors" |
    "fill/transportation/plane" |
    "fill/transportation/power-level" |
    "fill/transportation/rim" |
    "fill/transportation/road-2" |
    "fill/transportation/road" |
    "fill/transportation/scooter" |
    "fill/transportation/seat" |
    "fill/transportation/seatbelt" |
    "fill/transportation/sensor" |
    "fill/transportation/shuttle" |
    "fill/transportation/skateboard" |
    "fill/transportation/skateboard-2" |
    "fill/transportation/speedometer" |
    "fill/transportation/steering-wheel" |
    "fill/transportation/stop-sign" |
    "fill/transportation/submarine" |
    "fill/transportation/take-off" |
    "fill/transportation/taxi" |
    "fill/transportation/tractor" |
    "fill/transportation/train-speed" |
    "fill/transportation/train" |
    "fill/transportation/tram" |
    "fill/transportation/truck-front" |
    "fill/transportation/trunk" |
    "fill/transportation/ventilation" |
    "fill/transportation/vespa-front" |
    "fill/transportation/vespa" |
    "fill/transportation/walk" |
    "fill/transportation/washing-fluid" |
    "fill/transportation/wheel-2" |
    "fill/transportation/wheel" |
    "outline/transportation/air-baloon" |
    "outline/transportation/airbag" |
    "outline/transportation/airplane" |
    "outline/transportation/alien-33" |
    "outline/transportation/anchor" |
    "outline/transportation/baby-car-seat" |
    "outline/transportation/battery-level" |
    "outline/transportation/bike" |
    "outline/transportation/bike-bmx" |
    "outline/transportation/boat" |
    "outline/transportation/boat-front" |
    "outline/transportation/boat-small-02" |
    "outline/transportation/boat-small-03" |
    "outline/transportation/brakes" |
    "outline/transportation/bus-front-10" |
    "outline/transportation/bus-front-12" |
    "outline/transportation/bus" |
    "outline/transportation/car" |
    "outline/transportation/car-2" |
    "outline/transportation/car-accident" |
    "outline/transportation/car-connect" |
    "outline/transportation/car-door" |
    "outline/transportation/car-front" |
    "outline/transportation/car-lights" |
    "outline/transportation/car-parking" |
    "outline/transportation/car-simple" |
    "outline/transportation/car-sport" |
    "outline/transportation/car-ventilation" |
    "outline/transportation/car-wash" |
    "outline/transportation/cone" |
    "outline/transportation/control-panel" |
    "outline/transportation/cycling" |
    "outline/transportation/dashboard" |
    "outline/transportation/delivery" |
    "outline/transportation/drone-2" |
    "outline/transportation/drone" |
    "outline/transportation/engine" |
    "outline/transportation/engine-start" |
    "outline/transportation/flight" |
    "outline/transportation/flip-up" |
    "outline/transportation/fuel-2" |
    "outline/transportation/fuel-electric" |
    "outline/transportation/fuel" |
    "outline/transportation/helicopter" |
    "outline/transportation/helmet" |
    "outline/transportation/hybrid-car" |
    "outline/transportation/landing" |
    "outline/transportation/light-traffic" |
    "outline/transportation/love-car" |
    "outline/transportation/moto" |
    "outline/transportation/oil" |
    "outline/transportation/parking-sensors" |
    "outline/transportation/parking" |
    "outline/transportation/plane" |
    "outline/transportation/power-level" |
    "outline/transportation/rim" |
    "outline/transportation/road-2" |
    "outline/transportation/road" |
    "outline/transportation/scooter" |
    "outline/transportation/seat" |
    "outline/transportation/seatbelt" |
    "outline/transportation/sensor" |
    "outline/transportation/shuttle" |
    "outline/transportation/skateboard" |
    "outline/transportation/skateboard-2" |
    "outline/transportation/speedometer" |
    "outline/transportation/steering-wheel" |
    "outline/transportation/stop-sign" |
    "outline/transportation/submarine" |
    "outline/transportation/take-off" |
    "outline/transportation/taxi" |
    "outline/transportation/tractor" |
    "outline/transportation/train" |
    "outline/transportation/train-speed" |
    "outline/transportation/tram" |
    "outline/transportation/truck-front" |
    "outline/transportation/trunk" |
    "outline/transportation/ventilation" |
    "outline/transportation/vespa-front" |
    "outline/transportation/vespa" |
    "outline/transportation/walk" |
    "outline/transportation/washing-fluid" |
    "outline/transportation/wheel-2" |
    "outline/transportation/wheel" |
    "color/technology/3d-printing" |
    "color/technology/ai" |
    "color/technology/algorithm" |
    "color/technology/ai-generated-img" |
    "color/technology/android" |
    "color/technology/antenna" |
    "color/technology/api" |
    "color/technology/app-services" |
    "color/technology/apple" |
    "color/technology/artificial-brain" |
    "color/technology/artificial-intelligence" |
    "color/technology/audio-jack" |
    "color/technology/augmented-reality" |
    "color/technology/automated-logistics" |
    "color/technology/baby-monitor" |
    "color/technology/battery-level" |
    "color/technology/binary-code" |
    "color/technology/block" |
    "color/technology/blockchain" |
    "color/technology/cable" |
    "color/technology/cctv" |
    "color/technology/cd-reader" |
    "color/technology/charger-cable" |
    "color/technology/chat-bot" |
    "color/technology/cloud-mining" |
    "color/technology/computer" |
    "color/technology/computer-monitor" |
    "color/technology/connection" |
    "color/technology/contactless" |
    "color/technology/content-360deg" |
    "color/technology/content-delivery" |
    "color/technology/control-panel" |
    "color/technology/controller-2" |
    "color/technology/controller" |
    "color/technology/cpu" |
    "color/technology/cryptography" |
    "color/technology/cyborg" |
    "color/technology/decentralize" |
    "color/technology/decision-process" |
    "color/technology/device-connection" |
    "color/technology/digital-image" |
    "color/technology/digital-key" |
    "color/technology/disk-reader" |
    "color/technology/disk" |
    "color/technology/drone-2" |
    "color/technology/drone" |
    "color/technology/e-reader" |
    "color/technology/earbuds" |
    "color/technology/electronic-circuit" |
    "color/technology/engine-start" |
    "color/technology/eye-recognition" |
    "color/technology/face-recognition" |
    "color/technology/firewall" |
    "color/technology/gaming-console" |
    "color/technology/gaming-controller" |
    "color/technology/graphics-tablet" |
    "color/technology/hacker-v2" |
    "color/technology/hacker" |
    "color/technology/hair-clipper" |
    "color/technology/handheld-console" |
    "color/technology/hdmi" |
    "color/technology/headphones-2" |
    "color/technology/headphones-3" |
    "color/technology/headphones" |
    "color/technology/headset" |
    "color/technology/humanoid" |
    "color/technology/humanoid-v2" |
    "color/technology/hybrid-car" |
    "color/technology/keyboard-hide" |
    "color/technology/keyboard" |
    "color/technology/keyboard-mouse" |
    "color/technology/keyboard-wired" |
    "color/technology/keyboard-wireless" |
    "color/technology/l-add" |
    "color/technology/l-check" |
    "color/technology/l-location" |
    "color/technology/l-remove" |
    "color/technology/l-search" |
    "color/technology/l-security" |
    "color/technology/l-settings" |
    "color/technology/l-sync" |
    "color/technology/l-system-update" |
    "color/technology/landscape-orientation" |
    "color/technology/laptop" |
    "color/technology/laptop-1" |
    "color/technology/laptop-2" |
    "color/technology/license-key" |
    "color/technology/live-streaming" |
    "color/technology/lock-landscape" |
    "color/technology/lock-orientation" |
    "color/technology/lock-portrait" |
    "color/technology/logic" |
    "color/technology/machine-learning" |
    "color/technology/media-player" |
    "color/technology/messaging" |
    "color/technology/metrics" |
    "color/technology/mic" |
    "color/technology/mic-2" |
    "color/technology/migration" |
    "color/technology/mobile-banking" |
    "color/technology/mobile-chat" |
    "color/technology/mobile-phone" |
    "color/technology/mouse-2" |
    "color/technology/mouse" |
    "color/technology/music-player" |
    "color/technology/navigation" |
    "color/technology/nodes" |
    "color/technology/offline" |
    "color/technology/online-banking" |
    "color/technology/open-ai" |
    "color/technology/p-add" |
    "color/technology/p-check" |
    "color/technology/p-edit" |
    "color/technology/p-heart" |
    "color/technology/p-location" |
    "color/technology/p-remove" |
    "color/technology/p-search" |
    "color/technology/p-settings" |
    "color/technology/p-share" |
    "color/technology/p-sync" |
    "color/technology/p-system-update" |
    "color/technology/p-time" |
    "color/technology/parking-sensors" |
    "color/technology/pattern-recognition" |
    "color/technology/pc-monitor" |
    "color/technology/pc-mouse" |
    "color/technology/pc" |
    "color/technology/pc-play-media" |
    "color/technology/pci-card" |
    "color/technology/phone-button" |
    "color/technology/phone-camera-back" |
    "color/technology/phone-camera-front" |
    "color/technology/phone-charging-2" |
    "color/technology/phone-charging" |
    "color/technology/phone-charging-3" |
    "color/technology/phone-dock" |
    "color/technology/phone-toolbar" |
    "color/technology/plug" |
    "color/technology/plug-2" |
    "color/technology/print" |
    "color/technology/printer" |
    "color/technology/projector" |
    "color/technology/ram-2" |
    "color/technology/ram" |
    "color/technology/reading-tablet" |
    "color/technology/remote-control" |
    "color/technology/robot-cleaner" |
    "color/technology/robotic-arm" |
    "color/technology/router" |
    "color/technology/satellite-dish" |
    "color/technology/satellite" |
    "color/technology/screen-reader" |
    "color/technology/screen-rotation" |
    "color/technology/screen-sharing-2" |
    "color/technology/screen-sharing-off-2" |
    "color/technology/send-to-phone" |
    "color/technology/server" |
    "color/technology/sensor" |
    "color/technology/server-rack" |
    "color/technology/signal" |
    "color/technology/sim-card" |
    "color/technology/smart-house" |
    "color/technology/smartphone" |
    "color/technology/smartwatch" |
    "color/technology/socket-europe-1" |
    "color/technology/socket" |
    "color/technology/socket-europe-2" |
    "color/technology/socket-uk" |
    "color/technology/sparks" |
    "color/technology/ssd" |
    "color/technology/sync-devices" |
    "color/technology/system-update" |
    "color/technology/tablet-2" |
    "color/technology/tablet" |
    "color/technology/tablet-charging" |
    "color/technology/tablet-toolbar" |
    "color/technology/three-dimensional-object" |
    "color/technology/three-dimensional-world" |
    "color/technology/traffic" |
    "color/technology/transactions" |
    "color/technology/translation" |
    "color/technology/tv" |
    "color/technology/tv-stand" |
    "color/technology/usb" |
    "color/technology/video-off" |
    "color/technology/video-player" |
    "color/technology/vintage-computer" |
    "color/technology/vintage-tv" |
    "color/technology/virtual-assistant-2" |
    "color/technology/virtual-assistant" |
    "color/technology/virtual-environment" |
    "color/technology/virtual-reality" |
    "color/technology/voice-recognition" |
    "color/technology/vpn" |
    "color/technology/vr-controller" |
    "color/technology/vr-headset" |
    "color/technology/watch-2" |
    "color/technology/watch" |
    "color/technology/webcam-2" |
    "color/technology/webcam" |
    "color/technology/wifi-2" |
    "color/technology/wifi-off" |
    "color/technology/wifi-protected" |
    "color/technology/wifi" |
    "color/technology/wifi-router" |
    "color/technology/wireless-charging" |
    "color/sport/adaptive-bike" |
    "color/sport/analytics" |
    "color/sport/archer" |
    "color/sport/archery-target" |
    "color/sport/archery" |
    "color/sport/athletics" |
    "color/sport/balance" |
    "color/sport/barbell" |
    "color/sport/baseball-bat" |
    "color/sport/baseball-pitch" |
    "color/sport/baseball-player" |
    "color/sport/baseball" |
    "color/sport/basketball-board" |
    "color/sport/basketball" |
    "color/sport/basketball-player" |
    "color/sport/basketball-ring" |
    "color/sport/bicep-v2" |
    "color/sport/bicep" |
    "color/sport/bicep-v3" |
    "color/sport/bike-bmx" |
    "color/sport/bike" |
    "color/sport/bikini" |
    "color/sport/billiard-ball" |
    "color/sport/blender" |
    "color/sport/body-back-v2" |
    "color/sport/body-back-v3" |
    "color/sport/body-back" |
    "color/sport/body-butt" |
    "color/sport/body-butt-v2" |
    "color/sport/body-butt-v3" |
    "color/sport/bodybuilder" |
    "color/sport/bowling-ball" |
    "color/sport/bowling-pins" |
    "color/sport/boxing" |
    "color/sport/boxing-bag" |
    "color/sport/boxing-glove" |
    "color/sport/chequered-flag" |
    "color/sport/chess-tower" |
    "color/sport/climbing" |
    "color/sport/cockade" |
    "color/sport/cricket-bat" |
    "color/sport/crown" |
    "color/sport/crunches" |
    "color/sport/curling" |
    "color/sport/curling-stone" |
    "color/sport/cycling-track" |
    "color/sport/cycling" |
    "color/sport/dancer" |
    "color/sport/dart" |
    "color/sport/deadlift" |
    "color/sport/diet-food" |
    "color/sport/diet" |
    "color/sport/diet-plan" |
    "color/sport/distance" |
    "color/sport/drinking-bottle" |
    "color/sport/dumbbell" |
    "color/sport/elliptical-cross-trainer" |
    "color/sport/energy" |
    "color/sport/energy-drink" |
    "color/sport/energy-shaker" |
    "color/sport/energy-supplement" |
    "color/sport/equestrian-helmet" |
    "color/sport/exercise-bike" |
    "color/sport/ez-bar" |
    "color/sport/fencing" |
    "color/sport/fencing-swords" |
    "color/sport/final-score" |
    "color/sport/flip-up" |
    "color/sport/food-supplement" |
    "color/sport/football-headguard" |
    "color/sport/golf-ball" |
    "color/sport/golf-club" |
    "color/sport/golf-course" |
    "color/sport/golf-player" |
    "color/sport/golf-strike" |
    "color/sport/gym" |
    "color/sport/gym-class" |
    "color/sport/gym-shoes" |
    "color/sport/gymnastics" |
    "color/sport/handball" |
    "color/sport/heartbeat" |
    "color/sport/helmet" |
    "color/sport/hockey-stick" |
    "color/sport/hockey" |
    "color/sport/hoodie" |
    "color/sport/hook" |
    "color/sport/horse" |
    "color/sport/ice-skates" |
    "color/sport/jump-rope" |
    "color/sport/karate" |
    "color/sport/kettlebell" |
    "color/sport/lat-station" |
    "color/sport/leggins" |
    "color/sport/lightning" |
    "color/sport/man-up-front" |
    "color/sport/man-up-front-v2" |
    "color/sport/man-up-front-v3" |
    "color/sport/mat" |
    "color/sport/measurement" |
    "color/sport/medal" |
    "color/sport/medicine-ball" |
    "color/sport/nutrition" |
    "color/sport/olympic-flame" |
    "color/sport/olympic-games" |
    "color/sport/paralympic-games" |
    "color/sport/pectoral-machine" |
    "color/sport/pennant" |
    "color/sport/personal-trainer" |
    "color/sport/phone-heart" |
    "color/sport/phone-heartbeat" |
    "color/sport/podium-trophy" |
    "color/sport/podium" |
    "color/sport/power-lifting" |
    "color/sport/power-rack" |
    "color/sport/presentation" |
    "color/sport/pulse" |
    "color/sport/racing-bike" |
    "color/sport/ranking" |
    "color/sport/referee-v2" |
    "color/sport/referee" |
    "color/sport/referee-y-v2" |
    "color/sport/referee-y" |
    "color/sport/resistance-band" |
    "color/sport/rings" |
    "color/sport/row-machine" |
    "color/sport/rowing" |
    "color/sport/rowing-oars" |
    "color/sport/rugby" |
    "color/sport/rugby-ball" |
    "color/sport/run-shoes" |
    "color/sport/shaker" |
    "color/sport/shorts" |
    "color/sport/shuttlecock" |
    "color/sport/skateboard-2" |
    "color/sport/skateboard" |
    "color/sport/skateboarding" |
    "color/sport/skating" |
    "color/sport/skiing" |
    "color/sport/skipping-rope" |
    "color/sport/snorkel-mask" |
    "color/sport/snowboard" |
    "color/sport/snowboarding" |
    "color/sport/soccer-ball" |
    "color/sport/soccer-field" |
    "color/sport/soccer" |
    "color/sport/spa" |
    "color/sport/spinning-bike" |
    "color/sport/sport-bag" |
    "color/sport/sports-bra" |
    "color/sport/sports-fan" |
    "color/sport/sports-tank" |
    "color/sport/stadium" |
    "color/sport/stair-climber" |
    "color/sport/steering-wheel" |
    "color/sport/stopwatch" |
    "color/sport/stretching" |
    "color/sport/surfboard" |
    "color/sport/swimming" |
    "color/sport/swimming-pool" |
    "color/sport/swimsuit" |
    "color/sport/table-tennis-bat" |
    "color/sport/tactic" |
    "color/sport/tennis-ball" |
    "color/sport/tennis-racket" |
    "color/sport/tennis" |
    "color/sport/ticket" |
    "color/sport/timer" |
    "color/sport/towel" |
    "color/sport/treadmill" |
    "color/sport/trophy" |
    "color/sport/tshirt-sport" |
    "color/sport/users-mm" |
    "color/sport/users-ww" |
    "color/sport/utility-bench" |
    "color/sport/volleyball-player" |
    "color/sport/volleyball" |
    "color/sport/watch-heart" |
    "color/sport/watch-heartbeat" |
    "color/sport/water-aerobics" |
    "color/sport/water-polo" |
    "color/sport/water-polo-ball" |
    "color/sport/weight-bench" |
    "color/sport/weight-gain-v2" |
    "color/sport/weight-gain" |
    "color/sport/weight-gain-v3" |
    "color/sport/weight-loss-v2" |
    "color/sport/weight-loss-v3" |
    "color/sport/weight-loss" |
    "color/sport/weight-plate" |
    "color/sport/weight-scale" |
    "color/sport/whistle" |
    "color/sport/windsurfing" |
    "color/sport/winner" |
    "color/sport/woman-up-front-v2" |
    "color/sport/woman-up-front-v3" |
    "color/sport/woman-up-front" |
    "color/sport/workout-plan" |
    "color/sport/yoga" |
    "fill/sport/adaptive-bike" |
    "fill/sport/analytics" |
    "fill/sport/archer" |
    "fill/sport/archery" |
    "fill/sport/archery-target" |
    "fill/sport/athletics" |
    "fill/sport/balance" |
    "fill/sport/barbell" |
    "fill/sport/baseball" |
    "fill/sport/baseball-bat" |
    "fill/sport/baseball-pitch" |
    "fill/sport/baseball-player" |
    "fill/sport/basketball-board" |
    "fill/sport/basketball" |
    "fill/sport/basketball-player" |
    "fill/sport/basketball-ring" |
    "fill/sport/bicep" |
    "fill/sport/bike" |
    "fill/sport/bike-bmx" |
    "fill/sport/bikini" |
    "fill/sport/billiard-ball" |
    "fill/sport/blender" |
    "fill/sport/body-back" |
    "fill/sport/body-butt" |
    "fill/sport/bodybuilder" |
    "fill/sport/bowling-ball" |
    "fill/sport/bowling-pins" |
    "fill/sport/boxing" |
    "fill/sport/boxing-bag" |
    "fill/sport/boxing-glove" |
    "fill/sport/chequered-flag" |
    "fill/sport/chess-tower" |
    "fill/sport/climbing" |
    "fill/sport/cockade" |
    "fill/sport/cricket-bat" |
    "fill/sport/crown" |
    "fill/sport/crunches" |
    "fill/sport/curling" |
    "fill/sport/curling-stone" |
    "fill/sport/cycling-track" |
    "fill/sport/cycling" |
    "fill/sport/dancer" |
    "fill/sport/dart" |
    "fill/sport/deadlift" |
    "fill/sport/diet-food" |
    "fill/sport/diet" |
    "fill/sport/diet-plan" |
    "fill/sport/distance" |
    "fill/sport/drinking-bottle" |
    "fill/sport/dumbbell" |
    "fill/sport/elliptical-cross-trainer" |
    "fill/sport/energy" |
    "fill/sport/energy-drink" |
    "fill/sport/energy-shaker" |
    "fill/sport/energy-supplement" |
    "fill/sport/equestrian-helmet" |
    "fill/sport/exercise-bike" |
    "fill/sport/ez-bar" |
    "fill/sport/fencing-swords" |
    "fill/sport/fencing" |
    "fill/sport/final-score" |
    "fill/sport/flip-up" |
    "fill/sport/food-supplement" |
    "fill/sport/football-headguard" |
    "fill/sport/golf-ball" |
    "fill/sport/golf-club" |
    "fill/sport/golf-course" |
    "fill/sport/golf-player" |
    "fill/sport/golf-strike" |
    "fill/sport/gym" |
    "fill/sport/gym-class" |
    "fill/sport/gym-shoes" |
    "fill/sport/gymnastics" |
    "fill/sport/handball" |
    "fill/sport/heartbeat" |
    "fill/sport/helmet" |
    "fill/sport/hockey-stick" |
    "fill/sport/hockey" |
    "fill/sport/hoodie" |
    "fill/sport/hook" |
    "fill/sport/horse" |
    "fill/sport/ice-skates" |
    "fill/sport/jump-rope" |
    "fill/sport/karate" |
    "fill/sport/kettlebell" |
    "fill/sport/lat-station" |
    "fill/sport/leggins" |
    "fill/sport/lightning" |
    "fill/sport/man-up-front" |
    "fill/sport/mat" |
    "fill/sport/measurement" |
    "fill/sport/medal" |
    "fill/sport/medicine-ball" |
    "fill/sport/nutrition" |
    "fill/sport/olympic-flame" |
    "fill/sport/paralympic-games" |
    "fill/sport/pectoral-machine" |
    "fill/sport/pennant" |
    "fill/sport/personal-trainer" |
    "fill/sport/phone-heart" |
    "fill/sport/phone-heartbeat" |
    "fill/sport/podium" |
    "fill/sport/podium-trophy" |
    "fill/sport/power-lifting" |
    "fill/sport/power-rack" |
    "fill/sport/presentation" |
    "fill/sport/pulse" |
    "fill/sport/ranking" |
    "fill/sport/referee" |
    "fill/sport/resistance-band" |
    "fill/sport/rings" |
    "fill/sport/row-machine" |
    "fill/sport/rowing-oars" |
    "fill/sport/rowing" |
    "fill/sport/rugby-ball" |
    "fill/sport/rugby" |
    "fill/sport/run-shoes" |
    "fill/sport/shaker" |
    "fill/sport/shorts" |
    "fill/sport/shuttlecock" |
    "fill/sport/skateboard-2" |
    "fill/sport/skateboard" |
    "fill/sport/skateboarding" |
    "fill/sport/skating" |
    "fill/sport/skiing" |
    "fill/sport/skipping-rope" |
    "fill/sport/snorkel-mask" |
    "fill/sport/snowboard" |
    "fill/sport/snowboarding" |
    "fill/sport/soccer" |
    "fill/sport/soccer-ball" |
    "fill/sport/soccer-field" |
    "fill/sport/spa" |
    "fill/sport/spinning-bike" |
    "fill/sport/sport-bag" |
    "fill/sport/sports-bra" |
    "fill/sport/sports-fan" |
    "fill/sport/sports-tank" |
    "fill/sport/stadium" |
    "fill/sport/stair-climber" |
    "fill/sport/steering-wheel" |
    "fill/sport/stopwatch" |
    "fill/sport/stretching" |
    "fill/sport/surfboard" |
    "fill/sport/swimming" |
    "fill/sport/swimming-pool" |
    "fill/sport/swimsuit" |
    "fill/sport/table-tennis-bat" |
    "fill/sport/tactic" |
    "fill/sport/tennis" |
    "fill/sport/tennis-ball" |
    "fill/sport/tennis-racket" |
    "fill/sport/ticket" |
    "fill/sport/timer" |
    "fill/sport/towel" |
    "fill/sport/treadmill" |
    "fill/sport/trophy" |
    "fill/sport/tshirt-sport" |
    "fill/sport/users-mm" |
    "fill/sport/users-ww" |
    "fill/sport/utility-bench" |
    "fill/sport/volleyball-player" |
    "fill/sport/volleyball" |
    "fill/sport/watch-heart" |
    "fill/sport/watch-heartbeat" |
    "fill/sport/water-aerobics" |
    "fill/sport/water-polo-ball" |
    "fill/sport/water-polo" |
    "fill/sport/weight-bench" |
    "fill/sport/weight-gain" |
    "fill/sport/weight-loss" |
    "fill/sport/weight-plate" |
    "fill/sport/weight-scale" |
    "fill/sport/whistle" |
    "fill/sport/windsurfing" |
    "fill/sport/winner" |
    "fill/sport/woman-up-front" |
    "fill/sport/workout-plan" |
    "fill/sport/yoga" |
    "outline/sport/adaptive-bike" |
    "outline/sport/analytics" |
    "outline/sport/archer" |
    "outline/sport/archery" |
    "outline/sport/archery-target" |
    "outline/sport/athletics" |
    "outline/sport/balance" |
    "outline/sport/barbell" |
    "outline/sport/baseball-bat" |
    "outline/sport/baseball-pitch" |
    "outline/sport/baseball-player" |
    "outline/sport/baseball" |
    "outline/sport/basketball-board" |
    "outline/sport/basketball-player" |
    "outline/sport/basketball-ring" |
    "outline/sport/basketball" |
    "outline/sport/bicep" |
    "outline/sport/bike" |
    "outline/sport/bike-bmx" |
    "outline/sport/bikini" |
    "outline/sport/billiard-ball" |
    "outline/sport/blender" |
    "outline/sport/body-back" |
    "outline/sport/body-butt" |
    "outline/sport/bodybuilder" |
    "outline/sport/bowling-ball" |
    "outline/sport/bowling-pins" |
    "outline/sport/boxing" |
    "outline/sport/boxing-bag" |
    "outline/sport/boxing-glove" |
    "outline/sport/chequered-flag" |
    "outline/sport/chess-tower" |
    "outline/sport/climbing" |
    "outline/sport/cockade" |
    "outline/sport/cricket-bat" |
    "outline/sport/crown" |
    "outline/sport/crunches" |
    "outline/sport/curling-stone" |
    "outline/sport/curling" |
    "outline/sport/cycling" |
    "outline/sport/cycling-track" |
    "outline/sport/dancer" |
    "outline/sport/dart" |
    "outline/sport/deadlift" |
    "outline/sport/diet-food" |
    "outline/sport/diet" |
    "outline/sport/diet-plan" |
    "outline/sport/distance" |
    "outline/sport/drinking-bottle" |
    "outline/sport/dumbbell" |
    "outline/sport/elliptical-cross-trainer" |
    "outline/sport/energy" |
    "outline/sport/energy-drink" |
    "outline/sport/energy-shaker" |
    "outline/sport/energy-supplement" |
    "outline/sport/equestrian-helmet" |
    "outline/sport/exercise-bike" |
    "outline/sport/ez-bar" |
    "outline/sport/fencing-swords" |
    "outline/sport/fencing" |
    "outline/sport/final-score" |
    "outline/sport/flip-up" |
    "outline/sport/food-supplement" |
    "outline/sport/football-headguard" |
    "outline/sport/golf-ball" |
    "outline/sport/golf-club" |
    "outline/sport/golf-course" |
    "outline/sport/golf-player" |
    "outline/sport/golf-strike" |
    "outline/sport/gym" |
    "outline/sport/gym-class" |
    "outline/sport/gym-shoes" |
    "outline/sport/gymnastics" |
    "outline/sport/handball" |
    "outline/sport/heartbeat" |
    "outline/sport/helmet" |
    "outline/sport/hockey-stick" |
    "outline/sport/hockey" |
    "outline/sport/hoodie" |
    "outline/sport/hook" |
    "outline/sport/horse" |
    "outline/sport/ice-skates" |
    "outline/sport/jump-rope" |
    "outline/sport/karate" |
    "outline/sport/kettlebell" |
    "outline/sport/lat-station" |
    "outline/sport/leggins" |
    "outline/sport/lightning" |
    "outline/sport/man-up-front" |
    "outline/sport/mat" |
    "outline/sport/measurement" |
    "outline/sport/medal" |
    "outline/sport/medicine-ball" |
    "outline/sport/nutrition" |
    "outline/sport/olympic-flame" |
    "outline/sport/paralympic-games" |
    "outline/sport/pectoral-machine" |
    "outline/sport/pennant" |
    "outline/sport/personal-trainer" |
    "outline/sport/phone-heart" |
    "outline/sport/phone-heartbeat" |
    "outline/sport/podium" |
    "outline/sport/podium-trophy" |
    "outline/sport/power-lifting" |
    "outline/sport/power-rack" |
    "outline/sport/presentation" |
    "outline/sport/pulse" |
    "outline/sport/ranking" |
    "outline/sport/referee" |
    "outline/sport/resistance-band" |
    "outline/sport/rings" |
    "outline/sport/row-machine" |
    "outline/sport/rowing-oars" |
    "outline/sport/rowing" |
    "outline/sport/rugby-ball" |
    "outline/sport/rugby" |
    "outline/sport/run-shoes" |
    "outline/sport/shaker" |
    "outline/sport/shorts" |
    "outline/sport/shuttlecock" |
    "outline/sport/skateboard-2" |
    "outline/sport/skateboard" |
    "outline/sport/skateboarding" |
    "outline/sport/skating" |
    "outline/sport/skiing" |
    "outline/sport/skipping-rope" |
    "outline/sport/snorkel-mask" |
    "outline/sport/snowboard" |
    "outline/sport/snowboarding" |
    "outline/sport/soccer-ball" |
    "outline/sport/soccer-field" |
    "outline/sport/soccer" |
    "outline/sport/spa" |
    "outline/sport/spinning-bike" |
    "outline/sport/sport-bag" |
    "outline/sport/sports-bra" |
    "outline/sport/sports-fan" |
    "outline/sport/sports-tank" |
    "outline/sport/stadium" |
    "outline/sport/stair-climber" |
    "outline/sport/steering-wheel" |
    "outline/sport/stopwatch" |
    "outline/sport/stretching" |
    "outline/sport/surfboard" |
    "outline/sport/swimming" |
    "outline/sport/swimming-pool" |
    "outline/sport/swimsuit" |
    "outline/sport/table-tennis-bat" |
    "outline/sport/tactic" |
    "outline/sport/tennis-ball" |
    "outline/sport/tennis-racket" |
    "outline/sport/tennis" |
    "outline/sport/ticket" |
    "outline/sport/timer" |
    "outline/sport/towel" |
    "outline/sport/treadmill" |
    "outline/sport/trophy" |
    "outline/sport/tshirt-sport" |
    "outline/sport/users-mm" |
    "outline/sport/users-ww" |
    "outline/sport/utility-bench" |
    "outline/sport/volleyball" |
    "outline/sport/volleyball-player" |
    "outline/sport/watch-heart" |
    "outline/sport/watch-heartbeat" |
    "outline/sport/water-aerobics" |
    "outline/sport/water-polo-ball" |
    "outline/sport/water-polo" |
    "outline/sport/weight-bench" |
    "outline/sport/weight-gain" |
    "outline/sport/weight-plate" |
    "outline/sport/weight-loss" |
    "outline/sport/weight-scale" |
    "outline/sport/whistle" |
    "outline/sport/windsurfing" |
    "outline/sport/winner" |
    "outline/sport/woman-up-front" |
    "outline/sport/workout-plan" |
    "outline/sport/yoga" |
    "color/multimedia/3d-glasses" |
    "color/multimedia/adult-content" |
    "color/multimedia/ai-generated-img" |
    "color/multimedia/album" |
    "color/multimedia/alpha-order" |
    "color/multimedia/antenna" |
    "color/multimedia/anti-shake" |
    "color/multimedia/aperture" |
    "color/multimedia/audio-description" |
    "color/multimedia/audio-jack" |
    "color/multimedia/audio-mixer" |
    "color/multimedia/auto-flash" |
    "color/multimedia/auto-flash-2" |
    "color/multimedia/auto-focus" |
    "color/multimedia/brightness" |
    "color/multimedia/browse" |
    "color/multimedia/btn-play-2" |
    "color/multimedia/btn-play" |
    "color/multimedia/btn-stop" |
    "color/multimedia/button-eject" |
    "color/multimedia/button-next" |
    "color/multimedia/button-pause" |
    "color/multimedia/button-play" |
    "color/multimedia/button-power" |
    "color/multimedia/button-previous" |
    "color/multimedia/button-record" |
    "color/multimedia/button-rewind" |
    "color/multimedia/button-skip" |
    "color/multimedia/button-stop" |
    "color/multimedia/camcorder" |
    "color/multimedia/camera" |
    "color/multimedia/camera-2" |
    "color/multimedia/camera-3" |
    "color/multimedia/camera-flash" |
    "color/multimedia/camera-flashlight" |
    "color/multimedia/camera-focus" |
    "color/multimedia/camera-focus-2" |
    "color/multimedia/camera-lens" |
    "color/multimedia/camera-roll" |
    "color/multimedia/camera-screen" |
    "color/multimedia/camera-shooting" |
    "color/multimedia/camera-timer" |
    "color/multimedia/clapperboard-2" |
    "color/multimedia/clapperboard" |
    "color/multimedia/clarinet" |
    "color/multimedia/compact-camera" |
    "color/multimedia/countdown-2" |
    "color/multimedia/countdown" |
    "color/multimedia/crop" |
    "color/multimedia/cycle" |
    "color/multimedia/digital-image" |
    "color/multimedia/digital-piano" |
    "color/multimedia/drums" |
    "color/multimedia/earbuds" |
    "color/multimedia/edit-color" |
    "color/multimedia/edit-contrast" |
    "color/multimedia/edit-curves" |
    "color/multimedia/edit-levels" |
    "color/multimedia/edit-saturation" |
    "color/multimedia/event-ticket" |
    "color/multimedia/expand" |
    "color/multimedia/face-recognition" |
    "color/multimedia/file-aac" |
    "color/multimedia/file-audio" |
    "color/multimedia/file-avi" |
    "color/multimedia/file-bmp" |
    "color/multimedia/file-epub" |
    "color/multimedia/file-flash" |
    "color/multimedia/file-flv" |
    "color/multimedia/file-mkv" |
    "color/multimedia/file-mov" |
    "color/multimedia/file-mp3" |
    "color/multimedia/file-mp4" |
    "color/multimedia/file-mpg" |
    "color/multimedia/file-vvt" |
    "color/multimedia/file-wav" |
    "color/multimedia/film" |
    "color/multimedia/flash-off-2" |
    "color/multimedia/flash-off" |
    "color/multimedia/folder-image" |
    "color/multimedia/folder-music" |
    "color/multimedia/frame-effect" |
    "color/multimedia/full-screen" |
    "color/multimedia/fullscreen" |
    "color/multimedia/grain-effect" |
    "color/multimedia/grid" |
    "color/multimedia/guitar" |
    "color/multimedia/headphones-2" |
    "color/multimedia/headphones" |
    "color/multimedia/headphones-3" |
    "color/multimedia/headphones-mic" |
    "color/multimedia/image" |
    "color/multimedia/image-add" |
    "color/multimedia/image-delete" |
    "color/multimedia/image-location" |
    "color/multimedia/img" |
    "color/multimedia/img-rotate-left" |
    "color/multimedia/img-rotate-right" |
    "color/multimedia/img-stack" |
    "color/multimedia/instant-camera" |
    "color/multimedia/instant-camera-2" |
    "color/multimedia/interview" |
    "color/multimedia/kid-2" |
    "color/multimedia/knob" |
    "color/multimedia/layers-2" |
    "color/multimedia/lightning" |
    "color/multimedia/logo-mixer" |
    "color/multimedia/loudspeaker" |
    "color/multimedia/love-movie" |
    "color/multimedia/macro" |
    "color/multimedia/media-player" |
    "color/multimedia/media-stream" |
    "color/multimedia/mic-2" |
    "color/multimedia/mic" |
    "color/multimedia/microphone-2" |
    "color/multimedia/microphone-off" |
    "color/multimedia/microphone" |
    "color/multimedia/movie-2" |
    "color/multimedia/movie-3" |
    "color/multimedia/movie-reel" |
    "color/multimedia/movie" |
    "color/multimedia/music-album" |
    "color/multimedia/music-cloud" |
    "color/multimedia/music-note" |
    "color/multimedia/music" |
    "color/multimedia/music-playlist" |
    "color/multimedia/night" |
    "color/multimedia/no-photo" |
    "color/multimedia/offline" |
    "color/multimedia/options" |
    "color/multimedia/pc-play-media" |
    "color/multimedia/phone-camera-back" |
    "color/multimedia/phone-music" |
    "color/multimedia/photo-album" |
    "color/multimedia/photo-frame" |
    "color/multimedia/photo" |
    "color/multimedia/photo-not-allowed" |
    "color/multimedia/piano" |
    "color/multimedia/piano-2" |
    "color/multimedia/picture" |
    "color/multimedia/play-media" |
    "color/multimedia/play-movie" |
    "color/multimedia/player" |
    "color/multimedia/playlist" |
    "color/multimedia/podcast" |
    "color/multimedia/podcast-mic" |
    "color/multimedia/polaroid" |
    "color/multimedia/polaroid-photo" |
    "color/multimedia/polaroid-portrait" |
    "color/multimedia/polaroid-shot-delete" |
    "color/multimedia/polaroid-shot-new" |
    "color/multimedia/polaroid-shots" |
    "color/multimedia/progress-indicator" |
    "color/multimedia/projector" |
    "color/multimedia/radio" |
    "color/multimedia/random" |
    "color/multimedia/raw-image" |
    "color/multimedia/record-player" |
    "color/multimedia/rotate-camera" |
    "color/multimedia/rotate-left" |
    "color/multimedia/rotate-right" |
    "color/multimedia/save-to-list" |
    "color/multimedia/saxophone" |
    "color/multimedia/scale-2" |
    "color/multimedia/screen-reader" |
    "color/multimedia/screen-sharing-2" |
    "color/multimedia/screen-sharing-off-2" |
    "color/multimedia/screen-touch" |
    "color/multimedia/sd-card" |
    "color/multimedia/selfie" |
    "color/multimedia/selfie-2" |
    "color/multimedia/sharpen" |
    "color/multimedia/sound" |
    "color/multimedia/sound-wave" |
    "color/multimedia/soundwave" |
    "color/multimedia/sparks" |
    "color/multimedia/speaker-2" |
    "color/multimedia/speaker" |
    "color/multimedia/sport-mode" |
    "color/multimedia/sticker" |
    "color/multimedia/subtitles" |
    "color/multimedia/sun" |
    "color/multimedia/tape" |
    "color/multimedia/temperature" |
    "color/multimedia/ticket" |
    "color/multimedia/tool-blur" |
    "color/multimedia/tripod" |
    "color/multimedia/trumpet" |
    "color/multimedia/vibrance" |
    "color/multimedia/video" |
    "color/multimedia/video-camera" |
    "color/multimedia/video-gallery-2" |
    "color/multimedia/video-gallery" |
    "color/multimedia/video-off" |
    "color/multimedia/video-player" |
    "color/multimedia/video-playlist" |
    "color/multimedia/vignette" |
    "color/multimedia/violin" |
    "color/multimedia/volume-2" |
    "color/multimedia/volume-down" |
    "color/multimedia/volume" |
    "color/multimedia/volume-mute" |
    "color/multimedia/volume-off" |
    "color/multimedia/volume-up" |
    "color/multimedia/white-balance" |
    "fill/shopping/a-chart" |
    "fill/shopping/add-to-cart" |
    "fill/shopping/add-to-cart-2" |
    "fill/shopping/award" |
    "fill/shopping/bag-16" |
    "fill/shopping/bag-17" |
    "fill/shopping/bag-20" |
    "fill/shopping/bag-add-18" |
    "fill/shopping/bag-add-21" |
    "fill/shopping/bag-delivery" |
    "fill/shopping/bag-edit" |
    "fill/shopping/bag-remove-19" |
    "fill/shopping/bag-remove-22" |
    "fill/shopping/bag-time" |
    "fill/shopping/barcode-qr" |
    "fill/shopping/barcode-scan" |
    "fill/shopping/barcode" |
    "fill/shopping/basket-add" |
    "fill/shopping/basket-edit" |
    "fill/shopping/basket" |
    "fill/shopping/basket-favorite" |
    "fill/shopping/basket-remove" |
    "fill/shopping/basket-search" |
    "fill/shopping/basket-share" |
    "fill/shopping/basket-simple-add" |
    "fill/shopping/basket-simple-remove" |
    "fill/shopping/basket-simple" |
    "fill/shopping/basket-update" |
    "fill/shopping/bill" |
    "fill/shopping/billboard" |
    "fill/shopping/bitcoin" |
    "fill/shopping/board" |
    "fill/shopping/box-2" |
    "fill/shopping/box" |
    "fill/shopping/box-3d-50" |
    "fill/shopping/box-ribbon" |
    "fill/shopping/businessman-04" |
    "fill/shopping/card-edit" |
    "fill/shopping/card-favorite" |
    "fill/shopping/card-remove" |
    "fill/shopping/card-update" |
    "fill/shopping/cart" |
    "fill/shopping/cart-add-9" |
    "fill/shopping/cart-add" |
    "fill/shopping/cart-favorite" |
    "fill/shopping/cart-full" |
    "fill/shopping/cart-refresh" |
    "fill/shopping/cart-remove" |
    "fill/shopping/cart-remove-9" |
    "fill/shopping/cart-return" |
    "fill/shopping/cart-simple-add" |
    "fill/shopping/cart-simple-remove" |
    "fill/shopping/cart-speed" |
    "fill/shopping/cash-register" |
    "fill/shopping/cheque" |
    "fill/shopping/cheque-2" |
    "fill/shopping/cheque-3" |
    "fill/shopping/contactless-card" |
    "fill/shopping/coupon" |
    "fill/shopping/credit-card" |
    "fill/shopping/credit-card-in" |
    "fill/shopping/credit-locked" |
    "fill/shopping/currency-dollar" |
    "fill/shopping/currency-euro" |
    "fill/shopping/currency-exchange-2" |
    "fill/shopping/currency-exchange" |
    "fill/shopping/currency-pound" |
    "fill/shopping/currency-yen" |
    "fill/shopping/customer-support" |
    "fill/shopping/cut" |
    "fill/shopping/delivery" |
    "fill/shopping/delivery-2" |
    "fill/shopping/delivery-3" |
    "fill/shopping/delivery-fast" |
    "fill/shopping/delivery-time" |
    "fill/shopping/delivery-track" |
    "fill/shopping/discount-2" |
    "fill/shopping/farmer-market" |
    "fill/shopping/hand-card" |
    "fill/shopping/label" |
    "fill/shopping/lifering" |
    "fill/shopping/list" |
    "fill/shopping/market-music" |
    "fill/shopping/market-play" |
    "fill/shopping/mobile-banking" |
    "fill/shopping/mobile-card" |
    "fill/shopping/money-transfer" |
    "fill/shopping/new" |
    "fill/shopping/newsletter" |
    "fill/shopping/online-banking" |
    "fill/shopping/pallet" |
    "fill/shopping/pallet-stacked-boxes" |
    "fill/shopping/payment-method" |
    "fill/shopping/percent-sign" |
    "fill/shopping/percentage-38" |
    "fill/shopping/personal-trainer" |
    "fill/shopping/pos" |
    "fill/shopping/present" |
    "fill/shopping/receipt-list-42" |
    "fill/shopping/receipt" |
    "fill/shopping/receipt-list-43" |
    "fill/shopping/refund" |
    "fill/shopping/round-dollar" |
    "fill/shopping/round-euro" |
    "fill/shopping/round-pound" |
    "fill/shopping/round-yen" |
    "fill/shopping/sale" |
    "fill/shopping/scale-4" |
    "fill/shopping/shipping-container" |
    "fill/shopping/shop" |
    "fill/shopping/shop-location" |
    "fill/shopping/shopping-bag" |
    "fill/shopping/shopping-cart" |
    "fill/shopping/shopping-cart-2" |
    "fill/shopping/shopping-label" |
    "fill/shopping/shopping-tag" |
    "fill/shopping/sign-board" |
    "fill/shopping/size-large" |
    "fill/shopping/size-medium" |
    "fill/shopping/size-small" |
    "fill/shopping/stock-2" |
    "fill/shopping/stock-market" |
    "fill/shopping/storage-unit" |
    "fill/shopping/store" |
    "fill/shopping/support" |
    "fill/shopping/tag" |
    "fill/shopping/tag-add" |
    "fill/shopping/tag-check" |
    "fill/shopping/tag-cut" |
    "fill/shopping/tag-loyalty" |
    "fill/shopping/tag-remove" |
    "fill/shopping/tag-sale" |
    "fill/shopping/tags-stack" |
    "fill/shopping/track-delivery" |
    "fill/shopping/virtual-assistant-2" |
    "fill/shopping/wallet-43" |
    "fill/shopping/wallet" |
    "fill/shopping/wallet-44" |
    "fill/shopping/wallet-90" |
    "outline/shopping/a-chart" |
    "outline/shopping/add-to-cart" |
    "outline/shopping/add-to-cart-2" |
    "outline/shopping/award" |
    "outline/shopping/bag-16" |
    "outline/shopping/bag-17" |
    "outline/shopping/bag-20" |
    "outline/shopping/bag-add-18" |
    "outline/shopping/bag-add-21" |
    "outline/shopping/bag-delivery" |
    "outline/shopping/bag-edit" |
    "outline/shopping/bag-remove-19" |
    "outline/shopping/bag-remove-22" |
    "outline/shopping/bag-time" |
    "outline/shopping/barcode-qr" |
    "outline/shopping/barcode-scan" |
    "outline/shopping/barcode" |
    "outline/shopping/basket-add" |
    "outline/shopping/basket" |
    "outline/shopping/basket-edit" |
    "outline/shopping/basket-favorite" |
    "outline/shopping/basket-remove" |
    "outline/shopping/basket-search" |
    "outline/shopping/basket-share" |
    "outline/shopping/basket-simple-add" |
    "outline/shopping/basket-simple" |
    "outline/shopping/basket-simple-remove" |
    "outline/shopping/basket-update" |
    "outline/shopping/bill" |
    "outline/shopping/billboard" |
    "outline/shopping/bitcoin" |
    "outline/shopping/board" |
    "outline/shopping/box" |
    "outline/shopping/box-2" |
    "outline/shopping/box-3d-50" |
    "outline/shopping/box-ribbon" |
    "outline/shopping/businessman-04" |
    "outline/shopping/card-edit" |
    "outline/shopping/card-favorite" |
    "outline/shopping/card-remove" |
    "outline/shopping/card-update" |
    "outline/shopping/cart" |
    "outline/shopping/cart-add" |
    "outline/shopping/cart-add-9" |
    "outline/shopping/cart-favorite" |
    "outline/shopping/cart-full" |
    "outline/shopping/cart-refresh" |
    "outline/shopping/cart-remove" |
    "outline/shopping/cart-remove-9" |
    "outline/shopping/cart-return" |
    "outline/shopping/cart-simple-add" |
    "outline/shopping/cart-simple-remove" |
    "outline/shopping/cart-speed" |
    "outline/shopping/cash-register" |
    "outline/shopping/cheque-2" |
    "outline/shopping/cheque" |
    "outline/shopping/cheque-3" |
    "outline/shopping/contactless-card" |
    "outline/shopping/coupon" |
    "outline/shopping/credit-card" |
    "outline/shopping/credit-card-in" |
    "outline/shopping/credit-locked" |
    "outline/shopping/currency-dollar" |
    "outline/shopping/currency-euro" |
    "outline/shopping/currency-exchange-2" |
    "outline/shopping/currency-exchange" |
    "outline/shopping/currency-pound" |
    "outline/shopping/currency-yen" |
    "outline/shopping/customer-support" |
    "outline/shopping/cut" |
    "outline/shopping/delivery-2" |
    "outline/shopping/delivery" |
    "outline/shopping/delivery-3" |
    "outline/shopping/delivery-fast" |
    "outline/shopping/delivery-time" |
    "outline/shopping/delivery-track" |
    "outline/shopping/discount-2" |
    "outline/shopping/farmer-market" |
    "outline/shopping/hand-card" |
    "outline/shopping/label" |
    "outline/shopping/lifering" |
    "outline/shopping/list" |
    "outline/shopping/market-music" |
    "outline/shopping/market-play" |
    "outline/shopping/mobile-banking" |
    "outline/shopping/mobile-card" |
    "outline/shopping/money-transfer" |
    "outline/shopping/new" |
    "outline/shopping/newsletter" |
    "outline/shopping/online-banking" |
    "outline/shopping/pallet" |
    "outline/shopping/pallet-stacked-boxes" |
    "outline/shopping/payment-method" |
    "outline/shopping/percent-sign" |
    "outline/shopping/percentage-38" |
    "outline/shopping/personal-trainer" |
    "outline/shopping/pos" |
    "outline/shopping/present" |
    "outline/shopping/receipt-list-42" |
    "outline/shopping/receipt-list-43" |
    "outline/shopping/receipt" |
    "outline/shopping/refund" |
    "outline/shopping/round-dollar" |
    "outline/shopping/round-euro" |
    "outline/shopping/round-pound" |
    "outline/shopping/round-yen" |
    "outline/shopping/sale" |
    "outline/shopping/scale-4" |
    "outline/shopping/shipping-container" |
    "outline/shopping/shop-location" |
    "outline/shopping/shop" |
    "outline/shopping/shopping-bag" |
    "outline/shopping/shopping-cart-2" |
    "outline/shopping/shopping-cart" |
    "outline/shopping/shopping-label" |
    "outline/shopping/shopping-tag" |
    "outline/shopping/sign-board" |
    "outline/shopping/size-large" |
    "outline/shopping/size-medium" |
    "outline/shopping/size-small" |
    "outline/shopping/stock-2" |
    "outline/shopping/stock-market" |
    "outline/shopping/storage-unit" |
    "outline/shopping/store" |
    "outline/shopping/support" |
    "outline/shopping/tag" |
    "outline/shopping/tag-add" |
    "outline/shopping/tag-check" |
    "outline/shopping/tag-cut" |
    "outline/shopping/tag-loyalty" |
    "outline/shopping/tag-remove" |
    "outline/shopping/tag-sale" |
    "outline/shopping/tags-stack" |
    "outline/shopping/track-delivery" |
    "outline/shopping/virtual-assistant-2" |
    "outline/shopping/wallet" |
    "outline/shopping/wallet-43" |
    "outline/shopping/wallet-44" |
    "color/shopping/a-chart" |
    "color/shopping/add-notification" |
    "color/shopping/add-to-cart" |
    "color/shopping/add-to-cart-2" |
    "color/shopping/amazon-card" |
    "color/shopping/amex" |
    "color/shopping/android-card" |
    "color/shopping/apple-card" |
    "color/shopping/award" |
    "color/shopping/bag-16" |
    "color/shopping/bag-17" |
    "color/shopping/bag-20" |
    "color/shopping/bag-add-18" |
    "color/shopping/bag-add-21" |
    "color/shopping/bag-delivery" |
    "color/shopping/bag-edit" |
    "color/shopping/bag-remove-19" |
    "color/shopping/bag-remove-22" |
    "color/shopping/barcode-qr" |
    "color/shopping/barcode" |
    "color/shopping/barcode-scan" |
    "color/shopping/basket-add" |
    "color/shopping/basket" |
    "color/shopping/basket-edit" |
    "color/shopping/basket-remove" |
    "color/shopping/basket-simple" |
    "color/shopping/basket-simple-add" |
    "color/shopping/basket-simple-remove" |
    "color/shopping/bill" |
    "color/shopping/billboard" |
    "color/shopping/bitcoin-card" |
    "color/shopping/bitcoin" |
    "color/shopping/board" |
    "color/shopping/box" |
    "color/shopping/box-2" |
    "color/shopping/box-3d-50" |
    "color/shopping/box-ribbon" |
    "color/shopping/businessman-04" |
    "color/shopping/card-switch" |
    "color/shopping/cart" |
    "color/shopping/cart-add-9" |
    "color/shopping/cart-add" |
    "color/shopping/cart-remove-9" |
    "color/shopping/cart-remove" |
    "color/shopping/cart-simple-add" |
    "color/shopping/cart-simple-remove" |
    "color/shopping/cash-register" |
    "color/shopping/cheque" |
    "color/shopping/citi" |
    "color/shopping/contactless-card" |
    "color/shopping/credit-card" |
    "color/shopping/credit-card-in" |
    "color/shopping/credit-locked" |
    "color/shopping/currency-dollar" |
    "color/shopping/currency-euro" |
    "color/shopping/currency-exchange-2" |
    "color/shopping/currency-pound" |
    "color/shopping/currency-yen" |
    "color/shopping/delivery-fast" |
    "color/shopping/delivery" |
    "color/shopping/delivery-time" |
    "color/shopping/delivery-track" |
    "color/shopping/diners-club" |
    "color/shopping/discover" |
    "color/shopping/farmer-market" |
    "color/shopping/hand-card" |
    "color/shopping/jcb" |
    "color/shopping/label" |
    "color/shopping/lifering" |
    "color/shopping/list" |
    "color/shopping/maestro" |
    "color/shopping/mastercard" |
    "color/shopping/mobile-banking" |
    "color/shopping/mobile-card" |
    "color/shopping/money-transfer" |
    "color/shopping/newsletter" |
    "color/shopping/online-banking" |
    "color/shopping/pallet" |
    "color/shopping/pallet-stacked-boxes" |
    "color/shopping/paypal" |
    "color/shopping/percent-sign" |
    "color/shopping/percentage-38" |
    "color/shopping/personal-trainer" |
    "color/shopping/pos" |
    "color/shopping/present" |
    "color/shopping/receipt" |
    "color/shopping/receipt-list-42" |
    "color/shopping/receipt-list-43" |
    "color/shopping/refund" |
    "color/shopping/round-dollar" |
    "color/shopping/round-euro" |
    "color/shopping/round-pound" |
    "color/shopping/round-yen" |
    "color/shopping/shipping-container" |
    "color/shopping/shop" |
    "color/shopping/shop-location" |
    "color/shopping/shopping-bag" |
    "color/shopping/shopping-cart" |
    "color/shopping/shopping-cart-2" |
    "color/shopping/shopping-label" |
    "color/shopping/shopping-tag" |
    "color/shopping/size-large" |
    "color/shopping/size-medium" |
    "color/shopping/size-small" |
    "color/shopping/solo" |
    "color/shopping/stock-2" |
    "color/shopping/stock-market" |
    "color/shopping/storage-unit" |
    "color/shopping/stripe" |
    "color/shopping/support" |
    "color/shopping/tag" |
    "color/shopping/tag-cut" |
    "color/shopping/tag-sale" |
    "color/shopping/tags-stack" |
    "color/shopping/virtual-assistant-2" |
    "color/shopping/visa" |
    "color/shopping/visa-v2" |
    "color/shopping/wallet-43" |
    "color/shopping/wallet" |
    "color/shopping/wallet-44" |
    "fill/layout/alert-info" |
    "fill/layout/alert-question" |
    "fill/layout/alert-warning" |
    "fill/layout/app-stack" |
    "fill/layout/applications" |
    "fill/layout/badge-check" |
    "fill/layout/badge-check-2" |
    "fill/layout/ban" |
    "fill/layout/bars-filter" |
    "fill/layout/blockquote" |
    "fill/layout/bolt" |
    "fill/layout/bolt-slash" |
    "fill/layout/bolt-speed" |
    "fill/layout/border" |
    "fill/layout/border-bottom-left" |
    "fill/layout/border-bottom" |
    "fill/layout/border-bottom-right" |
    "fill/layout/border-center-x" |
    "fill/layout/border-center-y" |
    "fill/layout/border-left" |
    "fill/layout/border-none" |
    "fill/layout/border-right" |
    "fill/layout/border-top-left" |
    "fill/layout/border-top" |
    "fill/layout/border-top-right" |
    "fill/layout/border-x" |
    "fill/layout/border-y" |
    "fill/layout/brightness-decrease" |
    "fill/layout/brightness-increase" |
    "fill/layout/bullet-list" |
    "fill/layout/carousel-2" |
    "fill/layout/check" |
    "fill/layout/check-double" |
    "fill/layout/check-list-2" |
    "fill/layout/check-list" |
    "fill/layout/check-underline" |
    "fill/layout/checkbox-checked-2" |
    "fill/layout/checkbox-checked" |
    "fill/layout/checkbox-checked-3" |
    "fill/layout/checkbox-unchecked" |
    "fill/layout/circle-bars-filter" |
    "fill/layout/circle-check" |
    "fill/layout/circle-check-2" |
    "fill/layout/circle-check-plus" |
    "fill/layout/circle-copy" |
    "fill/layout/circle-copy-2" |
    "fill/layout/circle-copy-plus" |
    "fill/layout/circle-dashed" |
    "fill/layout/circle-dots-vertical" |
    "fill/layout/circle-dots" |
    "fill/layout/circle-dotted" |
    "fill/layout/circle-grid-dots" |
    "fill/layout/circle-half-dashed-check" |
    "fill/layout/circle-half-dotted-check" |
    "fill/layout/circle-info-sparkle" |
    "fill/layout/circle-info" |
    "fill/layout/circle-minus" |
    "fill/layout/circle-plus" |
    "fill/layout/circle-power-off" |
    "fill/layout/circle-question" |
    "fill/layout/circle-warning" |
    "fill/layout/circle-xmark" |
    "fill/layout/circles-5" |
    "fill/layout/clear-data" |
    "fill/layout/clone-2" |
    "fill/layout/clone-3" |
    "fill/layout/clone-dashed" |
    "fill/layout/clone-dashed-2" |
    "fill/layout/clone-plus" |
    "fill/layout/clone-plus-2" |
    "fill/layout/compare-items" |
    "fill/layout/connections" |
    "fill/layout/connections-2" |
    "fill/layout/copies" |
    "fill/layout/copies-2" |
    "fill/layout/copies-3" |
    "fill/layout/copies-plus" |
    "fill/layout/copy-2" |
    "fill/layout/divider-y-dotted" |
    "fill/layout/dots" |
    "fill/layout/dots-vertical" |
    "fill/layout/expand-obj-2" |
    "fill/layout/expand-obj" |
    "fill/layout/eye" |
    "fill/layout/eye-2-slash" |
    "fill/layout/eye-2" |
    "fill/layout/eye-closed" |
    "fill/layout/eye-open" |
    "fill/layout/eye-slash" |
    "fill/layout/feather" |
    "fill/layout/fill-loader" |
    "fill/layout/find-replace" |
    "fill/layout/float-left" |
    "fill/layout/float-right" |
    "fill/layout/full-screen-2" |
    "fill/layout/full-screen" |
    "fill/layout/full-screen-3" |
    "fill/layout/fullsize" |
    "fill/layout/gauge-2" |
    "fill/layout/gauge-3" |
    "fill/layout/gauge-4" |
    "fill/layout/gauge-5" |
    "fill/layout/gauge-6" |
    "fill/layout/gear" |
    "fill/layout/gear-2" |
    "fill/layout/gear-3" |
    "fill/layout/gear-keyhole" |
    "fill/layout/grid" |
    "fill/layout/grid-2" |
    "fill/layout/grid-3" |
    "fill/layout/grid-4" |
    "fill/layout/grid-check" |
    "fill/layout/grid-circle-plus" |
    "fill/layout/grid-circle" |
    "fill/layout/grid-empty-obj-bottom-right" |
    "fill/layout/grid-layout-10" |
    "fill/layout/grid-layout-8" |
    "fill/layout/grid-list" |
    "fill/layout/grid-obj-snap-to-bottom-right" |
    "fill/layout/grid-plus" |
    "fill/layout/grid-plus-2" |
    "fill/layout/grid-rect-circle" |
    "fill/layout/grid-search" |
    "fill/layout/grip-dots" |
    "fill/layout/grip-dots-vertical" |
    "fill/layout/half-dotted-circle-one" |
    "fill/layout/hexagon-check" |
    "fill/layout/input-password" |
    "fill/layout/input-password-alert" |
    "fill/layout/input-password-check" |
    "fill/layout/input-password-edit" |
    "fill/layout/input-password-pointer" |
    "fill/layout/input-password-settings" |
    "fill/layout/input-password-xmark" |
    "fill/layout/input-search" |
    "fill/layout/layers-3" |
    "fill/layout/layout-bottom" |
    "fill/layout/layout-left" |
    "fill/layout/layout-right" |
    "fill/layout/layout-top" |
    "fill/layout/light-switch" |
    "fill/layout/list-checkbox-2" |
    "fill/layout/list-multiple-choice" |
    "fill/layout/list-radio" |
    "fill/layout/list-todo" |
    "fill/layout/menu-3" |
    "fill/layout/menu" |
    "fill/layout/menu-bars" |
    "fill/layout/menu-left" |
    "fill/layout/menu-left-2" |
    "fill/layout/menu-right" |
    "fill/layout/minus" |
    "fill/layout/move-obj-down-2" |
    "fill/layout/move-obj-up-2" |
    "fill/layout/move-to-right" |
    "fill/layout/move-to-bottom" |
    "fill/layout/move-to-top" |
    "fill/layout/nut" |
    "fill/layout/octagon" |
    "fill/layout/octagon-check" |
    "fill/layout/octagon-copy" |
    "fill/layout/octagon-info" |
    "fill/layout/octagon-question" |
    "fill/layout/octagon-warning" |
    "fill/layout/plus" |
    "fill/layout/position-bottom" |
    "fill/layout/position-bottom-left" |
    "fill/layout/position-bottom-right" |
    "fill/layout/position-left" |
    "fill/layout/position-center" |
    "fill/layout/position-right" |
    "fill/layout/position-top" |
    "fill/layout/position-top-left" |
    "fill/layout/position-top-right" |
    "fill/layout/progress-bar" |
    "fill/layout/queue" |
    "fill/layout/radio-checked" |
    "fill/layout/radio-unchecked" |
    "fill/layout/rect-layout-grid-2" |
    "fill/layout/rect-layout-grid-3" |
    "fill/layout/rows-offset-left" |
    "fill/layout/rows-offset-right" |
    "fill/layout/scale-from-bottom-left" |
    "fill/layout/scale-from-bottom-left-2" |
    "fill/layout/scale-from-top-right" |
    "fill/layout/sidebar-right" |
    "fill/layout/sliders-2-vertical" |
    "fill/layout/sliders-2" |
    "fill/layout/sliders-3" |
    "fill/layout/sliders-3-vertical" |
    "fill/layout/slideshow" |
    "fill/layout/sort-bottom-to-top" |
    "fill/layout/sort-top-to-bottom" |
    "fill/layout/square-bars" |
    "fill/layout/square-grid-2" |
    "fill/layout/square-grid" |
    "fill/layout/square-grid-3" |
    "fill/layout/square-info" |
    "fill/layout/square-layout-grid" |
    "fill/layout/square-minus" |
    "fill/layout/square-plus" |
    "fill/layout/square-question" |
    "fill/layout/square-sliders-2" |
    "fill/layout/square-sliders" |
    "fill/layout/square-sliders-2-vertical" |
    "fill/layout/square-sliders-vertical" |
    "fill/layout/square-warning" |
    "fill/layout/square-xmark" |
    "fill/layout/table-rows-cols-2" |
    "fill/layout/table-rows-cols" |
    "fill/layout/toggle" |
    "fill/layout/toggles" |
    "fill/layout/trash-2" |
    "fill/layout/trash" |
    "fill/layout/trash-3" |
    "fill/layout/trash-xmark" |
    "fill/layout/triangle-warning" |
    "fill/layout/window" |
    "fill/layout/window-layout" |
    "fill/layout/wrench" |
    "fill/layout/wrench-screwdriver" |
    "fill/layout/xmark" |
    "outline/layout/alert-question" |
    "outline/layout/alert-info" |
    "outline/layout/alert-warning" |
    "outline/layout/app-stack" |
    "outline/layout/applications" |
    "outline/layout/badge-check" |
    "outline/layout/badge-check-2" |
    "outline/layout/ban" |
    "outline/layout/bars-filter" |
    "outline/layout/blockquote" |
    "outline/layout/bolt-slash" |
    "outline/layout/bolt" |
    "outline/layout/bolt-speed" |
    "outline/layout/border" |
    "outline/layout/border-bottom" |
    "outline/layout/border-bottom-left" |
    "outline/layout/border-bottom-right" |
    "outline/layout/border-center-x" |
    "outline/layout/border-center-y" |
    "outline/layout/border-left" |
    "outline/layout/border-none" |
    "outline/layout/border-right" |
    "outline/layout/border-top" |
    "outline/layout/border-top-left" |
    "outline/layout/border-top-right" |
    "outline/layout/border-x" |
    "outline/layout/border-y" |
    "outline/layout/brightness-decrease" |
    "outline/layout/brightness-increase" |
    "outline/layout/bullet-list" |
    "outline/layout/carousel-2" |
    "outline/layout/check" |
    "outline/layout/check-double" |
    "outline/layout/check-list" |
    "outline/layout/check-list-2" |
    "outline/layout/check-underline" |
    "outline/layout/checkbox-checked" |
    "outline/layout/checkbox-checked-2" |
    "outline/layout/checkbox-checked-3" |
    "outline/layout/checkbox-unchecked" |
    "outline/layout/circle-bars-filter" |
    "outline/layout/circle-check" |
    "outline/layout/circle-check-plus" |
    "outline/layout/circle-check-2" |
    "outline/layout/circle-copy" |
    "outline/layout/circle-copy-2" |
    "outline/layout/circle-copy-plus" |
    "outline/layout/circle-dashed" |
    "outline/layout/circle-dots-vertical" |
    "outline/layout/circle-dots" |
    "outline/layout/circle-dotted" |
    "outline/layout/circle-grid-dots" |
    "outline/layout/circle-half-dashed-check" |
    "outline/layout/circle-half-dotted-check" |
    "outline/layout/circle-info-sparkle" |
    "outline/layout/circle-info" |
    "outline/layout/circle-minus" |
    "outline/layout/circle-plus" |
    "outline/layout/circle-power-off" |
    "outline/layout/circle-question" |
    "outline/layout/circle-warning" |
    "outline/layout/circle-xmark" |
    "outline/layout/circles-5" |
    "outline/layout/clear-data" |
    "outline/layout/clone-2" |
    "outline/layout/clone-3" |
    "outline/layout/clone-dashed" |
    "outline/layout/clone-dashed-2" |
    "outline/layout/clone-plus" |
    "outline/layout/clone-plus-2" |
    "outline/layout/compare-items" |
    "outline/layout/connections-2" |
    "outline/layout/connections" |
    "outline/layout/copies" |
    "outline/layout/copies-2" |
    "outline/layout/copies-3" |
    "outline/layout/copies-plus" |
    "outline/layout/copy-2" |
    "outline/layout/divider-y-dotted" |
    "outline/layout/dots" |
    "outline/layout/dots-vertical" |
    "outline/layout/expand-obj" |
    "outline/layout/expand-obj-2" |
    "outline/layout/eye" |
    "outline/layout/eye-2" |
    "outline/layout/eye-2-slash" |
    "outline/layout/eye-closed" |
    "outline/layout/eye-open" |
    "outline/layout/eye-slash" |
    "outline/layout/feather" |
    "outline/layout/fill-loader" |
    "outline/layout/find-replace" |
    "outline/layout/float-left" |
    "outline/layout/float-right" |
    "outline/layout/full-screen-2" |
    "outline/layout/full-screen" |
    "outline/layout/full-screen-3" |
    "outline/layout/fullsize" |
    "outline/layout/gauge-2" |
    "outline/layout/gauge-3" |
    "outline/layout/gauge-4" |
    "outline/layout/gauge-5" |
    "outline/layout/gauge-6" |
    "outline/layout/gear" |
    "outline/layout/gear-2" |
    "outline/layout/gear-3" |
    "outline/layout/gear-keyhole" |
    "outline/layout/grid" |
    "outline/layout/grid-2" |
    "outline/layout/grid-3" |
    "outline/layout/grid-4" |
    "outline/layout/grid-check" |
    "outline/layout/grid-circle-plus" |
    "outline/layout/grid-circle" |
    "outline/layout/grid-empty-obj-bottom-right" |
    "outline/layout/grid-layout-10" |
    "outline/layout/grid-layout-8" |
    "outline/layout/grid-list" |
    "outline/layout/grid-obj-snap-to-bottom-right" |
    "outline/layout/grid-plus" |
    "outline/layout/grid-plus-2" |
    "outline/layout/grid-rect-circle" |
    "outline/layout/grid-search" |
    "outline/layout/grip-dots" |
    "outline/layout/grip-dots-vertical" |
    "outline/layout/half-dotted-circle-one" |
    "outline/layout/hexagon-check" |
    "outline/layout/input-password-alert" |
    "outline/layout/input-password" |
    "outline/layout/input-password-check" |
    "outline/layout/input-password-edit" |
    "outline/layout/input-password-pointer" |
    "outline/layout/input-password-settings" |
    "outline/layout/input-password-xmark" |
    "outline/layout/input-search" |
    "outline/layout/layers-3" |
    "outline/layout/layout-bottom" |
    "outline/layout/layout-left" |
    "outline/layout/layout-right" |
    "outline/layout/layout-top" |
    "outline/layout/light-switch" |
    "outline/layout/list-checkbox-2" |
    "outline/layout/list-multiple-choice" |
    "outline/layout/list-radio" |
    "outline/layout/list-todo" |
    "outline/layout/menu" |
    "outline/layout/menu-3" |
    "outline/layout/menu-bars" |
    "outline/layout/menu-left-2" |
    "outline/layout/menu-left" |
    "outline/layout/menu-right" |
    "outline/layout/minus" |
    "outline/layout/move-obj-down-2" |
    "outline/layout/move-obj-up-2" |
    "outline/layout/move-to-bottom" |
    "outline/layout/move-to-right" |
    "outline/layout/move-to-top" |
    "outline/layout/nut" |
    "outline/layout/octagon-check" |
    "outline/layout/octagon" |
    "outline/layout/octagon-copy" |
    "outline/layout/octagon-info" |
    "outline/layout/octagon-question" |
    "outline/layout/octagon-warning" |
    "outline/layout/plus" |
    "outline/layout/position-bottom" |
    "outline/layout/position-bottom-left" |
    "outline/layout/position-bottom-right" |
    "outline/layout/position-center" |
    "outline/layout/position-left" |
    "outline/layout/position-right" |
    "outline/layout/position-top" |
    "outline/layout/position-top-left" |
    "outline/layout/position-top-right" |
    "outline/layout/progress-bar" |
    "outline/layout/queue" |
    "outline/layout/radio-checked" |
    "outline/layout/radio-unchecked" |
    "outline/layout/rect-layout-grid-2" |
    "outline/layout/rect-layout-grid-3" |
    "outline/layout/rows-offset-left" |
    "outline/layout/rows-offset-right" |
    "outline/layout/scale-from-bottom-left" |
    "outline/layout/scale-from-bottom-left-2" |
    "outline/layout/scale-from-top-right" |
    "outline/layout/sidebar-right" |
    "outline/layout/sliders-2-vertical" |
    "outline/layout/sliders-2" |
    "outline/layout/sliders-3-vertical" |
    "outline/layout/sliders-3" |
    "outline/layout/slideshow" |
    "outline/layout/sort-bottom-to-top" |
    "outline/layout/sort-top-to-bottom" |
    "outline/layout/square-bars" |
    "outline/layout/square-grid-2" |
    "outline/layout/square-grid" |
    "outline/layout/square-grid-3" |
    "outline/layout/square-info" |
    "outline/layout/square-layout-grid" |
    "outline/layout/square-minus" |
    "outline/layout/square-plus" |
    "outline/layout/square-question" |
    "outline/layout/square-sliders-2" |
    "outline/layout/square-sliders" |
    "outline/layout/square-sliders-2-vertical" |
    "outline/layout/square-sliders-vertical" |
    "outline/layout/square-warning" |
    "outline/layout/square-xmark" |
    "outline/layout/table-rows-cols-2" |
    "outline/layout/table-rows-cols" |
    "outline/layout/toggle" |
    "outline/layout/toggles" |
    "outline/layout/trash-2" |
    "outline/layout/trash" |
    "outline/layout/trash-3" |
    "outline/layout/trash-xmark" |
    "outline/layout/triangle-warning" |
    "outline/layout/window-layout" |
    "outline/layout/window" |
    "outline/layout/wrench" |
    "outline/layout/wrench-screwdriver" |
    "outline/layout/xmark" |
    "color/development/3d-29" |
    "color/development/3d-model" |
    "color/development/ai-generated-img" |
    "color/development/album" |
    "color/development/align-bottom" |
    "color/development/align-center-horizontal" |
    "color/development/align-center-vertical" |
    "color/development/align-left" |
    "color/development/align-right" |
    "color/development/align-top" |
    "color/development/android" |
    "color/development/angle" |
    "color/development/animation-14" |
    "color/development/animation-31" |
    "color/development/animation-32" |
    "color/development/api" |
    "color/development/app" |
    "color/development/app-store" |
    "color/development/apple" |
    "color/development/apps" |
    "color/development/arrow-tool" |
    "color/development/artboard" |
    "color/development/binary-code" |
    "color/development/blend" |
    "color/development/block" |
    "color/development/blockchain" |
    "color/development/board-2" |
    "color/development/book-bookmark" |
    "color/development/book-bookmark-2" |
    "color/development/book-open-2" |
    "color/development/book-open" |
    "color/development/border" |
    "color/development/border-radius" |
    "color/development/border-width" |
    "color/development/browser-chrome" |
    "color/development/browser-edge" |
    "color/development/browser-edge-legacy" |
    "color/development/browser-firefox" |
    "color/development/browser-ie" |
    "color/development/browser-opera" |
    "color/development/browser-safari" |
    "color/development/brush" |
    "color/development/bucket" |
    "color/development/bullet-list-67" |
    "color/development/bullet-list-68" |
    "color/development/bullet-list-69" |
    "color/development/bullet-list-70" |
    "color/development/button-2" |
    "color/development/canvas" |
    "color/development/cards" |
    "color/development/clone" |
    "color/development/code-editor" |
    "color/development/code" |
    "color/development/collection" |
    "color/development/command" |
    "color/development/compare-items" |
    "color/development/compass" |
    "color/development/components" |
    "color/development/contrast-2" |
    "color/development/copy" |
    "color/development/creative-commons" |
    "color/development/crop" |
    "color/development/css3" |
    "color/development/cursor-48" |
    "color/development/cursor-49" |
    "color/development/cursor-add" |
    "color/development/cursor-grab" |
    "color/development/cursor-load" |
    "color/development/cursor-menu" |
    "color/development/cursor-not-allowed" |
    "color/development/cursor-pointer" |
    "color/development/cursor-text" |
    "color/development/data-table" |
    "color/development/decision-process" |
    "color/development/depth" |
    "color/development/design" |
    "color/development/design-dev" |
    "color/development/design-system" |
    "color/development/devto" |
    "color/development/digital-image" |
    "color/development/distribute-horizontal" |
    "color/development/distribute-vertical" |
    "color/development/divider" |
    "color/development/drag" |
    "color/development/drop-15" |
    "color/development/duplicate" |
    "color/development/edit-curves" |
    "color/development/edit-levels" |
    "color/development/empty" |
    "color/development/eraser-32" |
    "color/development/eraser-33" |
    "color/development/eraser-46" |
    "color/development/fairy-wand" |
    "color/development/file-ase" |
    "color/development/file-asp" |
    "color/development/file-aspx" |
    "color/development/file-c-plus-plus" |
    "color/development/file-cad" |
    "color/development/file-cfm" |
    "color/development/file-cgi" |
    "color/development/file-csh" |
    "color/development/file-css" |
    "color/development/file-eps" |
    "color/development/file-font" |
    "color/development/file-gif" |
    "color/development/file-gzip" |
    "color/development/file-html" |
    "color/development/file-java" |
    "color/development/file-jpg" |
    "color/development/file-js" |
    "color/development/file-json" |
    "color/development/file-jsp" |
    "color/development/file-log" |
    "color/development/file-max" |
    "color/development/file-md" |
    "color/development/file-obj" |
    "color/development/file-otf" |
    "color/development/file-pdf" |
    "color/development/file-php" |
    "color/development/file-png" |
    "color/development/file-psd" |
    "color/development/file-py" |
    "color/development/file-raw" |
    "color/development/file-ruby" |
    "color/development/file-sketch" |
    "color/development/file-sql" |
    "color/development/file-svg" |
    "color/development/file-tif" |
    "color/development/file-tiff" |
    "color/development/file-ttf" |
    "color/development/file-xml" |
    "color/development/filter-organization" |
    "color/development/flip-horizontal" |
    "color/development/flip-vertical" |
    "color/development/floors" |
    "color/development/form" |
    "color/development/frame" |
    "color/development/function" |
    "color/development/geometry" |
    "color/development/git-commit" |
    "color/development/gradient" |
    "color/development/grain-effect" |
    "color/development/graphics-tablet" |
    "color/development/grid-system" |
    "color/development/group" |
    "color/development/hash-mark" |
    "color/development/height-2" |
    "color/development/hot-key" |
    "color/development/html5" |
    "color/development/image" |
    "color/development/image-2" |
    "color/development/img-stack" |
    "color/development/invert-process" |
    "color/development/js-console" |
    "color/development/json-logo" |
    "color/development/ladybug" |
    "color/development/layers-2" |
    "color/development/layers" |
    "color/development/layout-11" |
    "color/development/layout" |
    "color/development/layout-25" |
    "color/development/layout-grid" |
    "color/development/license-key" |
    "color/development/linux" |
    "color/development/magic-wand" |
    "color/development/magnet" |
    "color/development/markdown" |
    "color/development/marker" |
    "color/development/mask-oval" |
    "color/development/mask-rect" |
    "color/development/measure-02" |
    "color/development/measure-17" |
    "color/development/measure-big" |
    "color/development/microsoft" |
    "color/development/mirror-display" |
    "color/development/mirror-tablet-phone" |
    "color/development/mobile-design" |
    "color/development/mobile-dev" |
    "color/development/mobile-phone" |
    "color/development/mouse-2" |
    "color/development/mouse" |
    "color/development/move" |
    "color/development/move-down-2" |
    "color/development/move-up-2" |
    "color/development/newsletter-dev" |
    "color/development/note-code" |
    "color/development/note" |
    "color/development/octagon" |
    "color/development/octagon-m" |
    "color/development/paint-16" |
    "color/development/paint-37" |
    "color/development/paint-38" |
    "color/development/paint-brush" |
    "color/development/paint-bucket-39" |
    "color/development/paint-bucket-40" |
    "color/development/palette" |
    "color/development/pantone" |
    "color/development/paper-design" |
    "color/development/paper-dev" |
    "color/development/paragraph-2" |
    "color/development/patch-19" |
    "color/development/patch-34" |
    "color/development/path-exclude" |
    "color/development/path-intersect" |
    "color/development/path-minus" |
    "color/development/path-unite" |
    "color/development/pc-mouse" |
    "color/development/pen-01" |
    "color/development/pen-23" |
    "color/development/pen-tool" |
    "color/development/photo-album" |
    "color/development/photo-editor" |
    "color/development/pilcrow" |
    "color/development/plug-2" |
    "color/development/position" |
    "color/development/priority-high" |
    "color/development/priority-highest" |
    "color/development/priority-low" |
    "color/development/priority-lowest" |
    "color/development/priority-normal" |
    "color/development/prototype" |
    "color/development/responsive" |
    "color/development/roadmap" |
    "color/development/row-table" |
    "color/development/ruler-pencil" |
    "color/development/scale-2" |
    "color/development/scale-down" |
    "color/development/scale-up" |
    "color/development/scissors-dashed" |
    "color/development/scissors" |
    "color/development/selection" |
    "color/development/shape-adjust" |
    "color/development/shape-arrow" |
    "color/development/shape-circle" |
    "color/development/shape-custom" |
    "color/development/shape-line" |
    "color/development/shape-oval" |
    "color/development/shape-polygon" |
    "color/development/shape-rectangle" |
    "color/development/shape-polygon-2" |
    "color/development/shape-star" |
    "color/development/shape-square" |
    "color/development/shape-triangle-2" |
    "color/development/shape-triangle" |
    "color/development/shapes" |
    "color/development/sharpener" |
    "color/development/sidebar" |
    "color/development/size-large" |
    "color/development/size-medium" |
    "color/development/size-small" |
    "color/development/slice" |
    "color/development/slider" |
    "color/development/space-divider" |
    "color/development/sparks" |
    "color/development/spray-can" |
    "color/development/stack" |
    "color/development/stamp" |
    "color/development/style" |
    "color/development/tablet-mobile" |
    "color/development/texture" |
    "color/development/three-dimensional-object" |
    "color/development/time-machine" |
    "color/development/timeline" |
    "color/development/todo" |
    "color/development/tool-blur" |
    "color/development/tool-hand" |
    "color/development/tool-select" |
    "color/development/transactions" |
    "color/development/transform" |
    "color/development/transform-2d" |
    "color/development/transform-origin" |
    "color/development/transparent" |
    "color/development/type-tool" |
    "color/development/typography" |
    "color/development/ungroup" |
    "color/development/usb" |
    "color/development/vector" |
    "color/development/vibrance" |
    "color/development/wand" |
    "color/development/watch-dev" |
    "color/development/web-design" |
    "color/development/webpage" |
    "color/development/width" |
    "color/development/window-code" |
    "color/development/window-dev" |
    "color/development/window-paragraph" |
    "color/development/window-responsive" |
    "color/development/wireframe" |
    "color/development/zoom" |
    "color/location/appointment" |
    "color/location/bookmark" |
    "color/location/bookmark-add" |
    "color/location/bookmark-add-2" |
    "color/location/bookmark-delete" |
    "color/location/bookmark-delete-2" |
    "color/location/compass-04" |
    "color/location/compass-05" |
    "color/location/compass-06" |
    "color/location/compass-2" |
    "color/location/compass-3" |
    "color/location/construction-sign" |
    "color/location/crosshair" |
    "color/location/crossroad" |
    "color/location/directions" |
    "color/location/distance" |
    "color/location/explore" |
    "color/location/explore-user" |
    "color/location/file-gpx" |
    "color/location/flag" |
    "color/location/flag-complex" |
    "color/location/flag-diagonal-33" |
    "color/location/flag-diagonal-34" |
    "color/location/flag-points-31" |
    "color/location/flag-points-32" |
    "color/location/flag-simple" |
    "color/location/gps" |
    "color/location/home-search" |
    "color/location/journey" |
    "color/location/journey-06" |
    "color/location/journey-07" |
    "color/location/journey-08" |
    "color/location/m-add" |
    "color/location/m-check" |
    "color/location/m-delete" |
    "color/location/m-edit" |
    "color/location/m-heart" |
    "color/location/m-location" |
    "color/location/m-remove" |
    "color/location/m-search" |
    "color/location/m-security" |
    "color/location/m-settings" |
    "color/location/m-share" |
    "color/location/m-star" |
    "color/location/m-sync" |
    "color/location/m-time" |
    "color/location/m-update" |
    "color/location/map" |
    "color/location/map-compass" |
    "color/location/map-gps" |
    "color/location/map-marker" |
    "color/location/map-pin" |
    "color/location/marker-2" |
    "color/location/marker-3" |
    "color/location/pennant" |
    "color/location/pin" |
    "color/location/pin-3" |
    "color/location/pin-add" |
    "color/location/pin-add-2" |
    "color/location/pin-check" |
    "color/location/pin-copy" |
    "color/location/pin-delete" |
    "color/location/pin-edit" |
    "color/location/pin-heart" |
    "color/location/pin-remove-2" |
    "color/location/pin-remove" |
    "color/location/pin-search" |
    "color/location/pin-security" |
    "color/location/pin-settings" |
    "color/location/pin-share" |
    "color/location/pin-star" |
    "color/location/pin-sync" |
    "color/location/pin-time" |
    "color/location/pin-user" |
    "color/location/pins" |
    "color/location/point-a" |
    "color/location/point-b" |
    "color/location/position-marker" |
    "color/location/position-pin" |
    "color/location/position-user" |
    "color/location/property-location" |
    "color/location/radar" |
    "color/location/road-2" |
    "color/location/road" |
    "color/location/roadmap" |
    "color/location/route" |
    "color/location/route-alert" |
    "color/location/route-close" |
    "color/location/route-open" |
    "color/location/square-marker" |
    "color/location/square-pin" |
    "color/location/treasure-map-21" |
    "color/location/treasure-map-40" |
    "color/location/world-marker" |
    "color/location/world-pin" |
    "color/location/world" |
    "fill/editing/add-above" |
    "fill/editing/add-below" |
    "fill/editing/ball-crystal" |
    "fill/editing/blockquote" |
    "fill/editing/border-width" |
    "fill/editing/broom-2" |
    "fill/editing/broom-sparkle" |
    "fill/editing/circle-pencil" |
    "fill/editing/clear-text-formatting" |
    "fill/editing/closing-quotation-mark-2" |
    "fill/editing/closing-quotation-mark" |
    "fill/editing/code" |
    "fill/editing/dots" |
    "fill/editing/drop-cap" |
    "fill/editing/equation" |
    "fill/editing/eraser-2" |
    "fill/editing/eraser" |
    "fill/editing/eraser-3" |
    "fill/editing/file-pen" |
    "fill/editing/fill" |
    "fill/editing/float-left" |
    "fill/editing/float-right" |
    "fill/editing/heading-1" |
    "fill/editing/heading-2" |
    "fill/editing/heading-3" |
    "fill/editing/heading-4" |
    "fill/editing/heading-5" |
    "fill/editing/heading-6" |
    "fill/editing/highlighter-2" |
    "fill/editing/highlighter" |
    "fill/editing/image-2" |
    "fill/editing/image" |
    "fill/editing/image-3" |
    "fill/editing/indent-decrease" |
    "fill/editing/indent-decrease-2" |
    "fill/editing/indent-increase" |
    "fill/editing/indent-increase-2" |
    "fill/editing/letter-spacing" |
    "fill/editing/line-dashed" |
    "fill/editing/line-height" |
    "fill/editing/line-spacing" |
    "fill/editing/link-2-slash" |
    "fill/editing/link-2" |
    "fill/editing/link" |
    "fill/editing/link-3" |
    "fill/editing/link-4-slash" |
    "fill/editing/link-4" |
    "fill/editing/link-5" |
    "fill/editing/link-5-slash" |
    "fill/editing/link-6-minus" |
    "fill/editing/link-6-plus" |
    "fill/editing/link-6" |
    "fill/editing/link-7" |
    "fill/editing/link-7-slash" |
    "fill/editing/link-broken" |
    "fill/editing/link-slash" |
    "fill/editing/list-favs-2" |
    "fill/editing/list-favs" |
    "fill/editing/markdown" |
    "fill/editing/numbers" |
    "fill/editing/obj-add" |
    "fill/editing/obj-remove" |
    "fill/editing/opening-quotation-mark" |
    "fill/editing/ordered-list" |
    "fill/editing/paragraph-add" |
    "fill/editing/paragraph" |
    "fill/editing/paragraph-check" |
    "fill/editing/paragraph-clear" |
    "fill/editing/paragraph-spacing" |
    "fill/editing/pen-arrow-clockwise" |
    "fill/editing/pilcrow" |
    "fill/editing/post" |
    "fill/editing/post-2" |
    "fill/editing/quote" |
    "fill/editing/reduce-2" |
    "fill/editing/rename" |
    "fill/editing/scribble" |
    "fill/editing/signature" |
    "fill/editing/signature-2" |
    "fill/editing/signature-3" |
    "fill/editing/sparkle-3" |
    "fill/editing/sparkle" |
    "fill/editing/spell-check" |
    "fill/editing/square-streaming" |
    "fill/editing/string-contains" |
    "fill/editing/string-does-not-contain" |
    "fill/editing/string-ends-with" |
    "fill/editing/string-starts-with" |
    "fill/editing/subscript" |
    "fill/editing/superscript" |
    "fill/editing/text-a-sparkle" |
    "fill/editing/text" |
    "fill/editing/text-align-center" |
    "fill/editing/text-align-justify" |
    "fill/editing/text-align-left" |
    "fill/editing/text-align-right" |
    "fill/editing/text-area" |
    "fill/editing/text-bg-color" |
    "fill/editing/text-bold" |
    "fill/editing/text-color" |
    "fill/editing/text-color-2" |
    "fill/editing/text-columns" |
    "fill/editing/text-highlight-2" |
    "fill/editing/text-highlight" |
    "fill/editing/text-input" |
    "fill/editing/text-italic" |
    "fill/editing/text-lowercase" |
    "fill/editing/text-outdent-left" |
    "fill/editing/text-outdent-right" |
    "fill/editing/text-overline" |
    "fill/editing/text-prompt" |
    "fill/editing/text-scale-x" |
    "fill/editing/text-scale-y" |
    "fill/editing/text-size" |
    "fill/editing/text-size-change" |
    "fill/editing/text-size-decrease" |
    "fill/editing/text-size-down" |
    "fill/editing/text-size-increase" |
    "fill/editing/text-sparkle" |
    "fill/editing/text-strikethrough" |
    "fill/editing/text-title-case" |
    "fill/editing/text-to-image-2" |
    "fill/editing/text-to-image" |
    "fill/editing/text-tool-2" |
    "fill/editing/text-tool-3" |
    "fill/editing/text-tool" |
    "fill/editing/text-tracking" |
    "fill/editing/text-underline" |
    "fill/editing/text-uppercase" |
    "fill/editing/type-scale" |
    "fill/editing/typography" |
    "fill/editing/undo" |
    "fill/editing/unordered-list-2" |
    "fill/editing/unordered-list" |
    "fill/editing/video-2" |
    "outline/editing/add-below" |
    "outline/editing/add-above" |
    "outline/editing/ball-crystal" |
    "outline/editing/blockquote" |
    "outline/editing/border-width" |
    "outline/editing/broom-2" |
    "outline/editing/broom-sparkle" |
    "outline/editing/circle-pencil" |
    "outline/editing/clear-text-formatting" |
    "outline/editing/closing-quotation-mark" |
    "outline/editing/closing-quotation-mark-2" |
    "outline/editing/code" |
    "outline/editing/dots" |
    "outline/editing/drop-cap" |
    "outline/editing/equation" |
    "outline/editing/eraser-2" |
    "outline/editing/eraser" |
    "outline/editing/eraser-3" |
    "outline/editing/file-pen" |
    "outline/editing/fill" |
    "outline/editing/float-left" |
    "outline/editing/float-right" |
    "outline/editing/heading-1" |
    "outline/editing/heading-2" |
    "outline/editing/heading-3" |
    "outline/editing/heading-4" |
    "outline/editing/heading-5" |
    "outline/editing/heading-6" |
    "outline/editing/highlighter-2" |
    "outline/editing/highlighter" |
    "outline/editing/image" |
    "outline/editing/image-2" |
    "outline/editing/image-3" |
    "outline/editing/indent-decrease" |
    "outline/editing/indent-decrease-2" |
    "outline/editing/indent-increase-2" |
    "outline/editing/indent-increase" |
    "outline/editing/letter-spacing" |
    "outline/editing/line-dashed" |
    "outline/editing/line-height" |
    "outline/editing/line-spacing" |
    "outline/editing/link-2-slash" |
    "outline/editing/link-2" |
    "outline/editing/link" |
    "outline/editing/link-3" |
    "outline/editing/link-4" |
    "outline/editing/link-4-slash" |
    "outline/editing/link-5" |
    "outline/editing/link-5-slash" |
    "outline/editing/link-6-minus" |
    "outline/editing/link-6" |
    "outline/editing/link-6-plus" |
    "outline/editing/link-7-slash" |
    "outline/editing/link-7" |
    "outline/editing/link-broken" |
    "outline/editing/link-slash" |
    "outline/editing/list-favs-2" |
    "outline/editing/list-favs" |
    "outline/editing/markdown" |
    "outline/editing/numbers" |
    "outline/editing/obj-add" |
    "outline/editing/obj-remove" |
    "outline/editing/opening-quotation-mark" |
    "outline/editing/ordered-list" |
    "outline/editing/paragraph-add" |
    "outline/editing/paragraph" |
    "outline/editing/paragraph-check" |
    "outline/editing/paragraph-clear" |
    "outline/editing/paragraph-spacing" |
    "outline/editing/pen-arrow-clockwise" |
    "outline/editing/pilcrow" |
    "outline/editing/post" |
    "outline/editing/post-2" |
    "outline/editing/quote" |
    "outline/editing/reduce-2" |
    "outline/editing/rename" |
    "outline/editing/scribble" |
    "outline/editing/signature" |
    "outline/editing/signature-2" |
    "outline/editing/signature-3" |
    "outline/editing/sparkle" |
    "outline/editing/sparkle-3" |
    "outline/editing/spell-check" |
    "outline/editing/square-streaming" |
    "outline/editing/string-contains" |
    "outline/editing/string-does-not-contain" |
    "outline/editing/string-ends-with" |
    "outline/editing/string-starts-with" |
    "outline/editing/subscript" |
    "outline/editing/superscript" |
    "outline/editing/text-a-sparkle" |
    "outline/editing/text" |
    "outline/editing/text-align-center" |
    "outline/editing/text-align-justify" |
    "outline/editing/text-align-left" |
    "outline/editing/text-align-right" |
    "outline/editing/text-area" |
    "outline/editing/text-bg-color" |
    "outline/editing/text-bold" |
    "outline/editing/text-color" |
    "outline/editing/text-color-2" |
    "outline/editing/text-columns" |
    "outline/editing/text-highlight" |
    "outline/editing/text-highlight-2" |
    "outline/editing/text-input" |
    "outline/editing/text-italic" |
    "outline/editing/text-lowercase" |
    "outline/editing/text-outdent-left" |
    "outline/editing/text-outdent-right" |
    "outline/editing/text-overline" |
    "outline/editing/text-prompt" |
    "outline/editing/text-scale-x" |
    "outline/editing/text-scale-y" |
    "outline/editing/text-size" |
    "outline/editing/text-size-change" |
    "outline/editing/text-size-decrease" |
    "outline/editing/text-size-down" |
    "outline/editing/text-size-increase" |
    "outline/editing/text-sparkle" |
    "outline/editing/text-strikethrough" |
    "outline/editing/text-title-case" |
    "outline/editing/text-to-image-2" |
    "outline/editing/text-to-image" |
    "outline/editing/text-tool" |
    "outline/editing/text-tool-2" |
    "outline/editing/text-tool-3" |
    "outline/editing/text-tracking" |
    "outline/editing/text-underline" |
    "outline/editing/text-uppercase" |
    "outline/editing/type-scale" |
    "outline/editing/typography" |
    "outline/editing/undo" |
    "outline/editing/unordered-list" |
    "outline/editing/unordered-list-2" |
    "outline/editing/video-2"


