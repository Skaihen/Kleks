import { SettingsManager } from "tauri-settings"

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

const settingsStorage = new SettingsManager<Schema>({
    theme: "dark"
})

settingsStorage.initialize()

export default settingsStorage
