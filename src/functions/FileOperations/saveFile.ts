import { writeTextFile } from "@tauri-apps/api/fs"
import { pathStorage, codeStorage } from "../../components/Storages"

export default async function saveFile() {
    const { currentPath } = pathStorage
    const { currentCode } = codeStorage

    await writeTextFile({
        path: currentPath(),
        contents: currentCode()
    })
}
