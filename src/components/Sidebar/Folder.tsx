import File from "./File"
import { pathStorage } from "../Storages"
import { createMemo, createSignal, For, Show } from "solid-js"
import { FileEntry } from "@tauri-apps/api/fs"
import { resolveResource } from "@tauri-apps/api/path"

type FolderProps = {
    name: string
    children?: FileEntry[]
    expanded?: boolean
}

export default function Folder(props: FolderProps) {
    const [isExpanded, setExpanded] = createSignal(props.expanded || false)

    const chevronIcon = createMemo(async () => {
        return await resolveResource(
            `resources/themes/iconPacks/defaultFileIcons/${
                isExpanded() ? "chevron-down" : "chevron-right"
            }.svg`
        )
    })

    const folderIcon = createMemo(async () => {
        return await resolveResource(
            `resources/themes/iconPacks/defaultFileIcons/${
                isExpanded() ? "folder-open" : "folder"
            }.svg`
        )
    })

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
