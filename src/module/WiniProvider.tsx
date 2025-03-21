import { useEffect } from "react"
import { BrowserRouter, Routes } from "react-router-dom"
import { ConfigData } from "../controller/config"
import { TableController, WiniController } from "../controller/setting"
import { Dialog } from "../component/dialog/dialog"
import { ToastContainer } from 'react-toastify'
import { ProjectItem } from "./da"

interface Props {
    /**
     * project id on admin wini
     * */
    pid: string,
    /**
     * api link
     * */
    url: string,
    imgUrlId: string,
    onInvalidToken?: () => void,
    children?: React.ReactNode,
    onProjectLoaded?: (item: ProjectItem) => void
}

export const WiniProvider = (props: Props) => {
    ConfigData.pid = props.pid
    ConfigData.url = props.url
    ConfigData.imgUrlId = props.imgUrlId
    if (props.onInvalidToken) ConfigData.onInvalidToken = props.onInvalidToken

    useEffect(() => {
        ConfigData.pid = props.pid
        const _desginTokenController = new TableController("designtoken")
        _desginTokenController.getAll().then(res => {
            if (res.code === 200 && res.data.length) {
                const designTokens = res.data.map((e: any) => {
                    return { ...e, Value: typeof e.Value === "string" ? JSON.parse(e.Value) : e.Value }
                })
                const tokenValues = designTokens.filter((e: any) => e.Type !== "group")
                let styleElement = document.head.querySelector(":scope > .designTokens") ?? document.createElement('style') as any;
                styleElement.type = 'text/css';
                const _innerHTML = `html { \n${tokenValues.map((e: any) => e.Value?.lightMode ? `${e.Name}: ${e.Value.lightMode};` : "").join('\n')}\n }\n\nhtml.dark { \n${tokenValues.map((e: any) => e.Value?.darkMode ? `${e.Name}: ${e.Value.darkMode};` : "").join('\n')}\n }`
                styleElement.innerHTML = _innerHTML;
                if (!styleElement.classList.contains("designTokens")) {
                    styleElement.classList.add("designTokens")
                    document.head.appendChild(styleElement)
                }
            }
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

    useEffect(() => {
        ConfigData.url = props.url
    }, [props.url])

    useEffect(() => {
        ConfigData.imgUrlId = props.imgUrlId
    }, [props.imgUrlId])

    useEffect(() => {
        if (props.onInvalidToken) ConfigData.onInvalidToken = props.onInvalidToken
    }, [props.onInvalidToken])

    return <BrowserRouter>
        <ToastContainer />
        <Dialog />
        <Routes>{props.children}</Routes>
    </BrowserRouter>
}