import { createSignal, onMount } from "solid-js"
import { pathStorage } from "../Storages"
import { resolveResource } from "@tauri-apps/api/path"
import { readTextFile } from "@tauri-apps/api/fs"

const resourcePath = await resolveResource(
    "resources/themes/iconPacks/defaultFileIcons/fileIcons.json"
)
const fileIconsJson = JSON.parse(await readTextFile(resourcePath))

type FileProps = {
    name: string
    path: string
}

type FileIconsType = {
    [key: string]: string
}

const fileIcons: FileIconsType = fileIconsJson

export default function File(props: FileProps) {
    const { currentPath } = pathStorage

    const [fileIcon, setFileIcon] = createSignal("")

    let fileExt = props.name.slice(props.name.lastIndexOf(".") + 1)

    return (
        <div class="ml-4 flex flex-row flex-nowrap items-center cursor-pointer">
            <img class="w-3 h-3 mr-1 flex-shrink-0" />
            <p
                class={`whitespace-nowrap${
                    currentPath() === props.path ? " active" : ""
                }`}
            >
                {props.name}
            </p>
        </div>
    )
}
