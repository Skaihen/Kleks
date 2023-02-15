import Folder from "./Folder"
import { readDir } from "@tauri-apps/api/fs"
import type { FileEntry } from "@tauri-apps/api/fs"
import { openFolderStorage } from "../Storages"
import { createEffect, createSignal } from "solid-js"

function orderTree(tree: FileEntry[]) {
    let isFolder: FileEntry[] = []
    let isFile: FileEntry[] = []
    let orderedTree: FileEntry[] = []

    tree.forEach((leaf: FileEntry) => {
        leaf.children ? isFolder.push(leaf) : isFile.push(leaf)
    })

    isFolder.sort()
    isFile.sort()

    isFolder.forEach((folder: FileEntry) => {
        orderedTree.push(folder)
    })
    isFile.forEach((file: FileEntry) => {
        orderedTree.push(file)
    })

    return orderedTree
}

function processTree(tree: FileEntry[]) {
    //Fix types
    let processedTree: any = []

    tree.forEach((leaf: any) => {
        if (leaf.children) {
            processedTree.push({
                name: leaf.name,
                children: processTree(leaf.children)
            })
        } else {
            processedTree.push({
                name: leaf.name,
                path: leaf.path
            })
        }
    })

    return orderTree(processedTree)
}

export default function Sidebar() {
    const [doneTree, setDoneTree] = createSignal<FileEntry[]>([])

    const { currentFolder } = openFolderStorage

    createEffect(async () => {
        try {
            const unprocessed = await readDir(currentFolder(), {
                recursive: true
            })

            setDoneTree(processTree(unprocessed))
        } catch (error) {
            console.log(error)
        }
    })

    return (
        <nav class="row-span-2 rounded-lg shadow-lg bg-base-100 overflow-hidden">
            <div class="p-2 scrollbar">
                <Folder name={"Root"} children={doneTree()} expanded />
            </div>
        </nav>
    )
}
