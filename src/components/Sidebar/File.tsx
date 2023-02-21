import { createSignal, onMount } from "solid-js"
import { pathStorage } from "../Storages"
import { extname, resolve, resourceDir } from "@tauri-apps/api/path"
import { readTextFile } from "@tauri-apps/api/fs"
import { convertFileSrc } from "@tauri-apps/api/tauri"
import settingsManager from "../settingsManager"

type FileProps = {
    name: string
    path: string
}

type FileIconsType = {
    [key: string]: string
}

const iconsPath = await resolve(
    await resourceDir(),
    "resources",
    "themes",
    "iconPacks",
    await settingsManager.get("iconPack")
)

const fileIcons: FileIconsType = JSON.parse(
    await readTextFile(await resolve(iconsPath, "fileIcons.json"))
)

export default function File(props: FileProps) {
    const { currentPath } = pathStorage

    const [fileIcon, setFileIcon] = createSignal("")

    onMount(async () => {
        let fileExt: string

        try {
            fileExt = await extname(props.path)
        } catch (error) {
            fileExt = "notFound"
        }

        if (fileExt in fileIcons) {
            setFileIcon(
                convertFileSrc(
                    await resolve(iconsPath, `${fileIcons[fileExt]}.svg`)
                )
            )
        } else {
            setFileIcon(
                convertFileSrc(await resolve(iconsPath, "fallback.svg"))
            )
        }
    })

    return (
        <div class="ml-4 flex flex-row flex-nowrap items-center cursor-pointer">
            <img src={fileIcon()} class="w-3 h-3 mr-1 flex-shrink-0" />
            <p
                class={`whitespace-nowrap${
                    currentPath() === props.path ? " activeFile" : ""
                }`}
            >
                {props.name}
            </p>
        </div>
    )
}
