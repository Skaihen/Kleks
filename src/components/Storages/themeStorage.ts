import { createSignal, createRoot } from "solid-js"
import settingsStorage from "./settingsStorage"

function createThemeStorage() {
    const [currentTheme, setTheme] = createSignal(settingsStorage.get("theme"))
    const changeTheme = (theme: string) => {
        settingsStorage.setCache("theme", theme)
        setTheme(theme)
    }
    return { currentTheme, changeTheme }
}

export default createRoot(createThemeStorage)
