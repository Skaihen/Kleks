import { createSignal, createRoot } from "solid-js"
import settingsManager from "../settingsManager"
import type { Schema } from "../settingsManager"

const settingsTheme = await settingsManager.get("theme")

function createThemeStorage() {
    const [currentTheme, setTheme] = createSignal(settingsTheme)
    const changeTheme = (theme: Schema["theme"]) => {
        settingsManager.set("theme", theme)
        setTheme(theme)
    }
    return { currentTheme, changeTheme }
}

export default createRoot(createThemeStorage)
