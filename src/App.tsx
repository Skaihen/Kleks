import { CodeEditor, Navbar, Sidebar, Terminal } from "./components"
import { themeStorage } from "./components/Storages"

export default function App() {
    const { currentTheme } = themeStorage

    return (
        <div
            data-theme={currentTheme()}
            class="grid grid-rows-[min-content_1.5fr_0.5fr] grid-cols-[minmax(10rem,0.25fr)_1.75fr] gap-2 p-2 h-screen max-h-screen overflow-hidden"
        >
            <Navbar />
            <Sidebar />
            <CodeEditor />
            <Terminal />
        </div>
    )
}
