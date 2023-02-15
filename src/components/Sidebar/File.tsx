import { onMount } from "solid-js"
import { pathStorage } from "../Storages"
import { resolveResource } from "@tauri-apps/api/path"
import { readTextFile } from "@tauri-apps/api/fs"

const resourcePath = await resolveResource(
    "resources/themes/iconPacks/defaultFileIcons/fileIcons.json"
)
const fileIconsJson = JSON.parse(await readTextFile(resourcePath))

console.log(fileIconsJson)

type FileProps = {
    name: string
    path: string
}

type FileIconsType = {
    [key: string]: string
}

const fileIcons: FileIconsType = fileIconsJson

let fileIcon: HTMLDivElement

export default function File(props: FileProps) {
    const { currentPath } = pathStorage

    let fileExt = props.name.slice(props.name.lastIndexOf(".") + 1)

    onMount(() => {
        if (fileExt in fileIcons) {
            console.log(fileExt)
            fileIcon.style.setProperty(
                "-webkit-mask-image",
                `url(/icons/defaultFileIcons/${fileIcons[fileExt]}.svg)`
            )
        } else {
            fileIcon.style.setProperty(
                "-webkit-mask-image",
                `url(/icons/defaultFileIcons/fallback.svg)`
            )
        }
    })

    return (
        <div class="ml-4 flex flex-row flex-nowrap items-center cursor-pointer">
            <div ref={fileIcon} class="w-3 h-3 mr-1 flex-shrink-0 fileIcon" />
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
