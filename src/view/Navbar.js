import './Navbar.css'
import Modal from "../components/Modal";
import {useState} from "react";
import firebase from "firebase/app";

export default function Navbar(props) {
    const [showModal, setShowModal] = useState(false)

    const onSave = (activity) => {
        props.onCreate(activity)
        setShowModal(false)
    }

    return (
        <div>
            <nav>
                <h1>logo</h1>
                <ul>
                    <li><button data-text="Criar Atividade" onClick={() => setShowModal(true)}>Criar Atividade</button></li>
                    <li><button data-text="Sair" onClick={() => firebase.auth().signOut()}>Sair</button></li>
                </ul>
            </nav>

            <Modal onClose={() => setShowModal(false)} show={showModal} onSave={onSave}/>
        </div>
    )
}
