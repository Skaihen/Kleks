import { createSignal, createRoot } from "solid-js"

function createFolderStorage() {
    const [currentFolder, setFolder] = createSignal("")
    return { currentFolder, setFolder }
}

export default createRoot(createFolderStorage)
