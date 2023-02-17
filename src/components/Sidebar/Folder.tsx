import File from "./File"
import { pathStorage } from "../Storages"
import { createSignal, For, onMount, Show } from "solid-js"
import { FileEntry } from "@tauri-apps/api/fs"
import { join, resolve } from "@tauri-apps/api/path"
import { resourceDir } from "@tauri-apps/api/path"
import { convertFileSrc } from "@tauri-apps/api/tauri"

type FolderProps = {
    name: string
    children?: FileEntry[]
    expanded?: boolean
}

const resourceDirPath = await resourceDir()

const chevronIconPath = await join(
    resourceDirPath,
    "resources/chevron-down.svg"
)

const assetUrl = convertFileSrc(chevronIconPath)

const pruebaimg = document.createElement("img")
pruebaimg.src = assetUrl

/* const folderIconPath = await resolveResource(
    `resources/themes/iconPacks/defaultFileIcons/${
        isExpanded() ? "folder-open" : "folder"
    }.svg`
)
 */

export default function Folder(props: FolderProps) {
    const [isExpanded, setExpanded] = createSignal(props.expanded || false)

    const [chevronIcon, setChevronIcon] = createSignal("")
    const [folderIcon, setFolderIcon] = createSignal("")

    setChevronIcon(chevronIconPath)

    const { setPath } = pathStorage

    return (
        <>
            <div
                onClick={() => {
                    setExpanded(!isExpanded())
                }}
                onKeyDown={() => {
                    setExpanded(!isExpanded())
                }}
                class="flex flex-row flex-nowrap items-center cursor-pointer"
            >
                <img ref={pruebaimg} />
                <img src={folderIcon()} class="w-3 h-3 mr-1 flex-shrink-0" />
                <p class="whitespace-nowrap">{props.name}</p>
            </div>

            <Show when={isExpanded()}>
                <ul class=" ml-[0.349rem] border-l border-l-base-content border-opacity-30 list-none">
                    <For each={props.children}>
                        {(file: FileEntry) => (
                            <li class="pl-1">
                                <Show
                                    when={file.children}
                                    fallback={
                                        <div
                                            onClick={() => {
                                                setPath(file.path)
                                            }}
                                            onKeyDown={() => {
                                                setPath(file.path)
                                            }}
                                        >
                                            <File
                                                name={file.name || ""}
                                                path={file.path}
                                            />
                                        </div>
                                    }
                                >
                                    <Folder
                                        name={file.name || ""}
                                        children={file.children || []}
                                    />
                                </Show>
                            </li>
                        )}
                    </For>
                </ul>
            </Show>
        </>
    )
}
