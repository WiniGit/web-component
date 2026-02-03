import { createContext, useContext, useEffect, useState } from "react"
import { BrowserRouter, Routes } from "react-router-dom"
import { BaseDA, ConfigData } from "../controller/config"
import { TableController, WiniController } from "../controller/setting"
import { Dialog } from "../component/dialog/dialog"
import { ToastContainer } from 'react-toastify'
import { DesignTokenType, ProjectItem } from "./da"
import { Util } from "../controller/utils"
import { useTranslation } from "react-i18next"
import { DataController } from "../controller/data"
import { encodeClassName, LayoutElement } from "./page/config"
import { getValidLink } from "./page/pageById"
import { i18n } from "i18next"

interface Props {
    /**
     * project id on admin wini
     * */
    pid: string,
    /**
     * api link
     * */
    url: string,
    fileUrl: string,
    imgUrlId: string,
    onInvalidToken?: () => void,
    children?: React.ReactNode,
    theme?: "light" | "dark"
}

const appendDesignTokens = (list: Array<{ [p: string]: any }>) => {
    const designTokens = list.map(e => e.Value ? { ...e, Value: typeof e.Value === "string" ? JSON.parse(e.Value) : e.Value } : e)
    if (designTokens.length) {
        const tokenValues = designTokens.filter(e => e.Type !== DesignTokenType.group && !!e.Value)
        const groupTokens = designTokens.filter(e => e.Type === DesignTokenType.group)
        let styleElement = (document.head.querySelector(":scope > .designTokens") ?? document.createElement('style')) as any;
        styleElement.type = 'text/css';
        const colorVariables = tokenValues.filter(e => e.Type === DesignTokenType.color)
        const classVariables = tokenValues.filter(e => e.Type !== DesignTokenType.color)
        const _innerHTML = `
        html {
            color-scheme: light;
            \n${colorVariables.map(e => {
            const tkParent = groupTokens.find(g => g.Id === e.ParentId);
            return e.Value?.lightMode ? `--${tkParent ? `${Util.toSlug(tkParent.Name)}-` : ""}${Util.toSlug(e.Name)}: ${e.Value.lightMode};` : ""
        }).join('\n')}\n
        }

        html.dark {
            color-scheme: dark;
            \n${colorVariables.map(e => {
            const tkParent = groupTokens.find(g => g.Id === e.ParentId);
            return e.Value?.lightMode ? `--${tkParent ? `${Util.toSlug(tkParent.Name)}-` : ""}${Util.toSlug(e.Name)}: ${e.Value.darkMode};` : ""
        }).join('\n')}\n
        }

        #root>.${LayoutElement.main} { 
            width: 100%;
            height: 100%;
            overflow: hidden auto;
        }

        #root>.${LayoutElement.main}.row { 
            flex-wrap: wrap;
            align-items: start;
            align-content: start;
        }

        p {
            white-space: pre-line;
        }
            
        @supports (color: light-dark(black, white)) {\n
            :root { \n${colorVariables.map(e => {
            const tkParent = groupTokens.find(g => g.Id === e.ParentId);
            return e.Value?.lightMode ? `--${tkParent ? `${Util.toSlug(tkParent.Name)}-` : ""}${Util.toSlug(e.Name)}: light-dark(${e.Value.lightMode}, ${e.Value.darkMode});` : ""
        }).join('\n')}\n }\n\n
        }\n\n
        ${classVariables.map(e => {
            let classValue: string | undefined = undefined
            switch (e.Type) {
                case DesignTokenType.font:
                    if (e.Value.lightMode)
                        classValue = `font: ${e.Value.lightMode}`
                    else {
                        var tkParent = groupTokens.find(g => g.Id === e.ParentId);
                        classValue = Object.keys(e.Value.webMode).map(k => `${k}: ${e.Value.webMode[k]}`).join(";\n")
                        return `.${encodeClassName(`${tkParent ? `${Util.toSlug(tkParent.Name)}-` : ""}${Util.toSlug(e.Name)}`, "font")} { \n${classValue};\n }`
                    }
                    break;
                case DesignTokenType.boxShadow:
                    if (e.Value.lightMode)
                        classValue = `box-shadow: ${e.Value.lightMode}`
                    else {
                        tkParent = groupTokens.find(g => g.Id === e.ParentId);
                        classValue = `box-shadow: ${e.Value.webMode.boxShadow ?? e.Value.webMode["box-shadow"]}`
                        return `.${encodeClassName(`${tkParent ? `${Util.toSlug(tkParent.Name)}-` : ""}${Util.toSlug(e.Name)}`, "shadow")} { \n${classValue};\n }`
                    }
                    break;
                case DesignTokenType.custom:
                    return e.Value.lightMode ?? e.Value.webMode
                default:
                    return ""
            }
            return classValue ? `.${e.Name} { \n${classValue};\n }` : ""
        }).join('\n')}
        `
        styleElement.innerHTML = _innerHTML;
        if (!styleElement.classList.contains("designTokens")) {
            styleElement.classList.add("designTokens")
            document.head.appendChild(styleElement)
        }
    }
}

interface WiniContextProps {
    i18n: i18n,
    theme: "light" | "dark",
    setTheme: (theme: "light" | "dark") => void,
    projectData?: { [k: string]: any },
    userData?: { [k: string]: any },
    setUserData: (data?: { [k: string]: any }) => void,
    globalData?: { [k: string]: any },
    setGlobalData: (data?: { [k: string]: any }) => void
}

const WiniContext = createContext<WiniContextProps | undefined>(undefined)

export const WiniProvider = (props: Props) => {
    ConfigData.pid = props.pid
    ConfigData.url = props.url
    ConfigData.imgUrlId = props.imgUrlId
    ConfigData.fileUrl = props.fileUrl
    if (props.onInvalidToken) ConfigData.onInvalidToken = props.onInvalidToken
    const { i18n } = useTranslation()
    const [loadedResources, setLoadedResources] = useState(false)
    const [theme, setTheme] = useState<"light" | "dark">("light")
    const [userData, setUserData] = useState<{ [k: string]: any } | undefined>(undefined)
    const [projectData, setProjectData] = useState<ProjectItem | undefined>(undefined)
    const [globalData, setGlobalData] = useState<{ [k: string]: any } | undefined>(undefined)

    useEffect(() => {
        const rootLink = document.createElement("link")
        rootLink.rel = "stylesheet"
        rootLink.href = "https://cdn.jsdelivr.net/gh/WiniGit/web-component@5c9b1ca/src/skin/root.css"
        const typoLink = document.createElement("link")
        typoLink.rel = "stylesheet"
        typoLink.href = "https://cdn.jsdelivr.net/gh/WiniGit/web-component@5c9b1ca/src/skin/typography.css"
        const layoutLink = document.createElement("link")
        layoutLink.rel = "stylesheet"
        layoutLink.href = "https://cdn.jsdelivr.net/gh/WiniGit/web-component@5c9b1ca/src/skin/layout.css"
        document.head.children[0].before(rootLink, typoLink, layoutLink)
        return () => {
            rootLink.remove()
            typoLink.remove()
            layoutLink.remove()
        }
    }, [])

    useEffect(() => {
        setTheme(props.theme ?? "light")
    }, [props.theme])

    useEffect(() => {
        if (theme === "dark") document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    }, [theme])

    useEffect(() => {
        ConfigData.pid = props.pid
        if (props.pid.length === 32) {
            const _desginTokenController = new TableController("designtoken")
            _desginTokenController.getAll().then(res => {
                if (res.code === 200 && res.data.length) appendDesignTokens(res.data)
            })
            const projectController = new WiniController("Project")
            projectController.getByIds([props.pid]).then(res => {
                if (res.code === 200 && res.data[0]) {
                    if (res.data[0].LogoId) (document.head.querySelector(`:scope > link[rel="icon"]`) as HTMLLinkElement)!.href = getValidLink(res.data[0].LogoId);
                    (document.head.querySelector(`:scope > title`) as HTMLTitleElement)!.innerHTML = res.data[0].Name;
                    setProjectData(res.data[0])
                    ConfigData.fileUrl = res.data[0].FileDomain
                }
            })
            const languageController = new DataController("Language")
            languageController.getAll().then(async (res) => {
                if (res.code === 200 && res.data.length) {
                    const languages = await Promise.all(res.data.map((e: any) => BaseDA.get(ConfigData.imgUrlId + e.Json)))
                    languages.forEach((lngData, i) => {
                        if (lngData) i18n.addResourceBundle(res.data[i].Lng, "translation", lngData, true, true)
                    })
                    setLoadedResources(true)
                } else setLoadedResources(true)
            })
        } else {
            console.log("Project not found")
            setLoadedResources(true)
        }
    }, [props.pid])

    return <WiniContext.Provider value={{ projectData, theme, setTheme, i18n, userData, setUserData, globalData, setGlobalData }}>
        <BrowserRouter>
            <ToastContainer />
            <Dialog />
            {loadedResources && <Routes>{props.children}</Routes>}
        </BrowserRouter>
    </WiniContext.Provider>
}

export const useWiniContext = () => {
    const context = useContext(WiniContext);
    if (context === undefined) {
        throw new Error(
            "useWiniContext must be used within a WiniProvider"
        );
    }
    return context;
}