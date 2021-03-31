import './Status.css'

export default function Status(props) {
    return (
        <div className="status">
            <div className="title">
                <p className={props.color}>{props.name}</p>
            </div>
            <div className="tickets-number">
                <p>{props.number}</p>
            </div>
        </div>
    )
}
