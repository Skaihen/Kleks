import { createSignal, createRoot } from "solid-js"

const localTheme = localStorage.getItem("localTheme")

function createThemeStorage() {
    const [currentTheme, setTheme] = createSignal(
        localTheme !== null ? localTheme : "dark"
    )
    const changeTheme = (theme: string) => {
        setTheme(theme)
        localStorage.setItem("localTheme", theme)
    }
    /* createEffect(() => {
        localStorage.setItem("localTheme", currentTheme)
    }) */
    return { currentTheme, changeTheme }
}

export default createRoot(createThemeStorage)
