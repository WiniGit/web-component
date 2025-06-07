import { useEffect } from "react"
import { BrowserRouter, Routes } from "react-router-dom"
import { ConfigData } from "../controller/config"
import { TableController, WiniController } from "../controller/setting"
import { Dialog } from "../component/dialog/dialog"
import { ToastContainer } from 'react-toastify'
import { DesignTokenType, ProjectItem } from "./da"
import { Util } from "../controller/utils"

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
    onProjectLoaded?: (item: ProjectItem) => void
}

const appendDesignTokens = (list: Array<{ [p: string]: any }>) => {
    const designTokens = list.map(e => e.Value ? { ...e, Value: typeof e.Value === "string" ? JSON.parse(e.Value) : e.Value } : e)
    if (designTokens.length) {
        const tokenValues = designTokens.filter(e => e.Type !== DesignTokenType.group && (e.Value?.lightMode || e.Value?.darkMode))
        const groupTokens = designTokens.filter(e => e.Type === DesignTokenType.group)
        let styleElement = (document.head.querySelector(":scope > .designTokens") ?? document.createElement('style')) as any;
        styleElement.type = 'text/css';
        const colorVariables = tokenValues.filter(e => e.Type === DesignTokenType.color)
        const classVariables = tokenValues.filter(e => e.Type !== DesignTokenType.color)
        const _innerHTML = `
        html {
            color-scheme: light;
        }

        html.dark {
            color-scheme: dark;
        }
            
        :root { \n${colorVariables.map(e => {
            const tkParent = groupTokens.find(g => g.Id === e.ParentId);
            return e.Value?.lightMode ? `--${tkParent ? `${Util.toSlug(tkParent.Name)}-` : ""}${Util.toSlug(e.Name)}: light-dark(${e.Value.lightMode}, ${e.Value.darkMode});` : ""
        }).join('\n')}\n }\n\n
        ${classVariables.map(e => {
            let classValue: string | undefined = undefined
            switch (e.Type) {
                case DesignTokenType.font:
                    classValue = `font: ${e.Value.lightMode}`
                    break;
                case DesignTokenType.border:
                    classValue = `border: ${e.Value.lightMode}`
                    break;
                case DesignTokenType.boxShadow:
                    classValue = `box-shadow: ${e.Value.lightMode}`
                    break;
                case DesignTokenType.custom:
                    return e.Value.lightMode
                default:
                    break;
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

export const WiniProvider = (props: Props) => {
    ConfigData.pid = props.pid
    ConfigData.url = props.url
    ConfigData.imgUrlId = props.imgUrlId
    ConfigData.fileUrl = props.fileUrl
    if (props.onInvalidToken) ConfigData.onInvalidToken = props.onInvalidToken

    useEffect(() => {
        ConfigData.pid = props.pid
        const _desginTokenController = new TableController("designtoken")
        _desginTokenController.getAll().then(res => {
            if (res.code === 200 && res.data.length) appendDesignTokens(res.data)
        })
        const projectController = new WiniController("Project")
        projectController.getByIds([props.pid]).then(res => {
            if (res.code === 200 && res.data[0]) {
                (document.head.querySelector(`:scope > link[rel="icon"]`) as HTMLLinkElement)!.href = ConfigData.imgUrlId + res.data[0].LogoId;
                (document.head.querySelector(`:scope > title`) as HTMLTitleElement)!.innerHTML = res.data[0].Name;
                if (props.onProjectLoaded) props.onProjectLoaded(res.data[0])
            }
        })
    }, [props.pid])

    useEffect(() => { ConfigData.url = props.url }, [props.url])
    useEffect(() => { ConfigData.imgUrlId = props.imgUrlId }, [props.imgUrlId])
    useEffect(() => { ConfigData.fileUrl = props.fileUrl }, [props.fileUrl])
    useEffect(() => { if (props.onInvalidToken) ConfigData.onInvalidToken = props.onInvalidToken }, [props.onInvalidToken])

    return <BrowserRouter>
        <ToastContainer />
        <Dialog />
        <Routes>{props.children}</Routes>
    </BrowserRouter>
}