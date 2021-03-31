import {useState} from 'react'
import './Modal.css'
import firebase from "firebase/app";
import History from "./History";

export default function Modal(props) {
    const [showHistory, setShowHistory] = useState(false)

    const onClose = e => {
        props.onClose(e)
    }

    const onShowHistory = () => {
        setShowHistory(!showHistory)
    }

    const localState = {...props.activity ?? {name: '', description: '', status: '', user: ''}}

    const onSave = () => {
        if(props.activity){
            const date = new Date()
            if(localState.status !== props.activity.status) {
                localState.history.push({date: `${date.getDate()}/${date.getUTCMonth()+1}/${date.getUTCFullYear()}`, text: `Status alterado para: ${localState.status} por: ${firebase.auth().currentUser.displayName}`
            })
            }
            if(localState.user !== props.activity.user) {
                localState.history.push({date: `${date.getDate()}/${date.getUTCMonth()+1}/${date.getUTCFullYear()}`, text: `Responsável alterado para: ${localState.user} por: ${firebase.auth().currentUser.displayName}`
            })
            }
        }
        props.onSave(localState)
    }

    const handleChange = (e) => {
        localState[e.target.dataset.index] = e.target.value
    }

    if(!props.show) {
        return null
    }

    return(
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{props.activity ? `Editar Atividade ${props.activity.name}` : `Criar Nova Atividade`}</h2>
                <div className="modal-form v-row justify-space-between">

                        <div className="col col-6 col-s-12">
                            <label htmlFor="activity">Nome da Atividade</label>
                            <input type="text" id="activity" name="activity" data-index="name" defaultValue={localState.name} onChange={handleChange}/>

                            <label htmlFor="descricao">Descrição</label>
                            <textarea data-index="description" defaultValue={localState.description} onChange={handleChange}/>
                        </div>

                        <div className="col col-5 col-s-12">
                            <label htmlFor="status">Status</label>
                            <select id="status" name="status" data-index="status" defaultValue={localState.status} onChange={handleChange}>
                                <option value="" disabled hidden>Selecione Status</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Em Andamento">Em Andamento</option>
                                <option value="Finalizado">Finalizado</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>

                            <label htmlFor="user">Responsável</label>
                            <select id="user" name="user" data-index="user" defaultValue={localState.user} onChange={handleChange}>
                                <option value="" disabled hidden>Selecione o Responsável</option>
                                <option value="User1">User1</option>
                                <option value="User2">User2</option>
                            </select>
                            <History history={localState.history} showHistory={showHistory} />
                        </div>

                </div>
                <div className="actions">
                    <button className="save-button" onClick={onSave} >
                        Salvar
                    </button>
                    <button className="cancel-button" onClick={onClose} >
                        Cancelar
                    </button>
                    {localState.history ?
                        <button className="transparent-button" onClick={onShowHistory}>
                            Mostrar Histórico
                        </button>
                    : ''}
                </div>
            </div>
        </div>
    )
}
