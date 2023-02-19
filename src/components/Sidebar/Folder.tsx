import File from "./File"
import { pathStorage } from "../Storages"
import { createEffect, createSignal, For, onMount, Show } from "solid-js"
import { FileEntry } from "@tauri-apps/api/fs"
import { resolve } from "@tauri-apps/api/path"
import { resourceDir } from "@tauri-apps/api/path"
import { convertFileSrc } from "@tauri-apps/api/tauri"

type FolderProps = {
    name: string
    children?: FileEntry[]
    expanded?: boolean
}

const iconsPath = await resolve(
    await resourceDir(),
    "resources",
    "themes",
    "iconPacks",
    "defaultFileIcons"
)

export default function Folder(props: FolderProps) {
    const [isExpanded, setExpanded] = createSignal(props.expanded || false)

    const [chevronIcon, setChevronIcon] = createSignal("")
    const [folderIcon, setFolderIcon] = createSignal("")

    const { setPath } = pathStorage

    onMount(() => {
        createEffect(async () => {
            setChevronIcon(
                convertFileSrc(
                    await resolve(
                        iconsPath,
                        `${isExpanded() ? "chevron-down" : "chevron-right"}.svg`
                    )
                )
            )

            setFolderIcon(
                convertFileSrc(
                    await resolve(
                        iconsPath,
                        `${isExpanded() ? "folder-open" : "folder"}.svg`
                    )
                )
            )
        })
    })

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
                <img src={chevronIcon()} class="w-3 h-3 mr-1 flex-shrink-0" />
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
