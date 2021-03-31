export default function Button(props) {
    return (
        <button onClick={props.onClick}>
            clicado {props.value} vezes
        </button>
    )
}
