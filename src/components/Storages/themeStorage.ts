import { createSignal, createRoot } from "solid-js"
import settingsStorage from "./settingsStorage"
import type { Schema } from "./settingsStorage"

const settingsTheme = await settingsStorage.get("theme")

function createThemeStorage() {
    const [currentTheme, setTheme] = createSignal(settingsTheme)
    const changeTheme = (theme: Schema["theme"]) => {
        settingsStorage.set("theme", theme)
        setTheme(theme)
    }
    return { currentTheme, changeTheme }
}

export default createRoot(createThemeStorage)
