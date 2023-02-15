import NavTab from "./NavTab"
import NavBtn from "./NavBtn"
import NavSubTab from "./NavSubTab"
import { openFolder, saveFile } from "../../functions/FileOperations"
import { ThemeSubTab } from "./View"

export default function Navbar() {
    return (
        <nav class="col-span-full rounded-lg shadow-lg bg-base-200 flex content-center align-middle items-center h-8">
            <NavTab label="File">
                <NavBtn label="Open Folder..." onClick={openFolder} />
                <div class="divider m-0 p-0" />
                <NavBtn label="Save File" onClick={saveFile} />
            </NavTab>

            <NavTab label="View">
                <NavSubTab label="Theme">
                    <ThemeSubTab />
                </NavSubTab>
            </NavTab>
        </nav>
    )
}
