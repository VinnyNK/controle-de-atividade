import './ActivitiesList.css'
import Modal from "./Modal";
import {useState} from "react";

export default function ActivitiesList(props) {
    const [showModal, setShowModal] = useState(false)
    const [selectStatus, setSelectStatus] = useState('All')
    const [selectActivity, setSelectActivity] = useState(null)

    const localActivities = [...props.activities]

    const onSave = (activity) => {
        props.onEdit(activity)
        setShowModal(false)
    }

    const handleChange = (e) => {
        setSelectStatus(e.target.value)
    }

    return (
        <div>
            <div className="filter">
                <label htmlFor="filter">Filtrar Status</label>
                <select id="status" name="status" data-index="status" onChange={handleChange}>
                    <option value="All">Todos</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
            </div>
            <div className="table-responsive costum-table-dark">
                <table className="table">
                    <thead>
                    <tr>
                        <th width="2%">#</th>
                        <th>Atividade</th>
                        <th>Responsável</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    { localActivities.map((activity, index) => (
                        selectStatus === 'All' || activity.status === selectStatus ?
                        <tr onClick={() => {
                            setShowModal(true)
                            setSelectActivity(activity)
                        }}
                        key={index}>
                            <td>{activity.id}</td>
                            <td>{activity.name}</td>
                            <td>{activity.user}</td>
                            <td>{activity.status}</td>
                        </tr>
                            : <tr key={index}></tr>))}
                    </tbody>
                </table>
                <Modal onClose={() => setShowModal(false)} onSave={(activity) => onSave(activity)} show={showModal} activity={selectActivity} />
            </div>
        </div>
    )
}
