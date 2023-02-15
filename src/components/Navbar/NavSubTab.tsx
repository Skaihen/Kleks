import { children, JSX } from "solid-js"

type NavSubTabProps = {
    label: string
    children: JSX.Element | JSX.Element[]
}

export default function NavSubTab(props: NavSubTabProps) {
    const child = children(() => props.children)

    return (
        <li tabindex="-1">
            <span>{props.label}</span>
            <ul class="p-0 shadow-md bg-base-100 w-40 max-h-[70vh] overflow-hidden transition ease-in duration-150 hover:-translate-y-1 hover:scale-110 hover:ease-out hover:duration-200">
                <ul class="p-2 scrollbar">{child()}</ul>
            </ul>
        </li>
    )
}
