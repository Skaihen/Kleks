import { SettingsManager } from "tauri-settings"

export type Schema = {
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
    iconPack: string
}

const settingsManager = new SettingsManager<Schema>(
    {
        theme: "dark",
        iconPack: "defaultFileIcons"
    },
    {
        fileName: "settings"
    }
)

await settingsManager.initialize()

export default settingsManager
