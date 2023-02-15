import File from "./File"
import { pathStorage } from "../Storages"
import { createSignal, For, Show } from "solid-js"
import { FileEntry } from "@tauri-apps/api/fs"

type FolderProps = {
    name: string
    children?: FileEntry[]
    expanded?: boolean
}

export default function Folder(props: FolderProps) {
    const [isExpanded, setExpanded] = createSignal(props.expanded || false)
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
                <div
                    class={`w-3 h-3 mr-1 flex-shrink-0 chevronIcon${
                        isExpanded() ? " expanded" : ""
                    }`}
                />
                <div
                    class={`w-3 h-3 mr-1 flex-shrink-0 folderIcon${
                        isExpanded() ? " expanded" : ""
                    }`}
                />
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
