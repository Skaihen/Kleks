type NavBtnProps = {
    label: string
    onClick: Function
}

export default function NavBtn(props: NavBtnProps) {
    return (
        <li>
            <button
                type="button"
                onClick={() => {
                    props.onClick()
                }}
            >
                {props.label}
            </button>
        </li>
    )
}
