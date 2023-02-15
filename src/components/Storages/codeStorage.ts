import { createSignal, createRoot } from "solid-js"

function createCodeStorage() {
    const [currentCode, setCode] = createSignal("")
    return { currentCode, setCode }
}

export default createRoot(createCodeStorage)
