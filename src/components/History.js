import './History.css'

export default function History(props) {

    if(!props.showHistory){
        return null
    } else {
        return (
            <ul className="history">
                { props.history.map((item, index) => (
                    <li key={index}><small>{item.date}</small> - {item.text}</li>
                ))}
            </ul>

        )
    }

}
