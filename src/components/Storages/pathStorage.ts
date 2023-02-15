import { createSignal, createRoot } from "solid-js"

function createPathStorage() {
    const [currentPath, setPath] = createSignal("")
    return { currentPath, setPath }
}

export default createRoot(createPathStorage)
