import { SettingsManager } from "tauri-settings"
import { createSignal, createRoot } from "solid-js"

type Schema = {
    theme:
        | "light"
        | "dark"
        | "cupcake"
        | "bumblebee"
        | "emerald"
        | "corporate"
        | "synthwave"
        | "retro"
        | "cyberpunk"
        | "valentine"
        | "halloween"
        | "garden"
        | "forest"
        | "aqua"
        | "lofi"
        | "pastel"
        | "fantasy"
        | "wireframe"
        | "black"
        | "luxury"
        | "dracula"
        | "cmyk"
        | "autumn"
        | "business"
        | "acid"
        | "lemonade"
        | "night"
        | "coffee"
        | "winter"
}

/* const settingsManager = new SettingsManager<Schema>(
  { // defaults
    theme: 'light',
    startFullscreen: false
  },
  { // options
    fileName: 'customization-settings'
  }
)

// checks whether the settings file exists and created it if not
// loads the settings if it exists
settingsManager.initialize().then(() => {
  // any key other than 'theme' and 'startFullscreen' will be invalid.
  // theme key will only accept 'dark' or 'light' as a value due to the generic.
  settingsManager.setCache('theme', 'dark');
}

// at a later time
await settingsManager.syncCache(); */

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
