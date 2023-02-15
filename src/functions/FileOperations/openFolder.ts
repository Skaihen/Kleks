import { open } from "@tauri-apps/api/dialog"
import { openFolderStorage } from "../../components/Storages"

export default async function openFolder() {
    const { setFolder } = openFolderStorage

    const folderPath = await open({
        directory: true,
        recursive: true
    })

    if (typeof folderPath === "string") {
        setFolder(folderPath)
    }
}
