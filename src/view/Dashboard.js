import React  from "react"
import Status from "../components/Status";
import ActivitiesList from "../components/ActivitiesList";
import './Dashboard.css'

export default function Dashboard(props) {

    const [pending, inProgress, finished, canceled] = [
        props.activities.reduce((count, activity) => {
            return activity.status === 'Pendente' ? count + 1 : count
        }, 0),
        props.activities.reduce((count, activity) => {
            return activity.status === 'Em Andamento' ? count + 1 : count
        }, 0),
        props.activities.reduce((count, activity) => {
            return activity.status === 'Finalizado' ? count + 1 : count
        }, 0),
        props.activities.reduce((count, activity) => {
            return activity.status === 'Cancelado' ? count + 1 : count
        }, 0)
    ]

    const onEditActivity = activity => {
        props.onEditActivity(activity)
    }

    return (
        <div>
            <div className="v-row justify-center">
                <div className="col col-3 col-s-6">
                    <Status name="Pendente" color="primary" number={pending} />
                </div>
                <div className="col col-3 col-s-6">
                    <Status name="Em Andamento" color="caution" number={inProgress} />
                </div>
                <div className="col col-3 col-s-6">
                    <Status name="Finalizado" color="success" number={finished} />
                </div>
                <div className="col col-3 col-s-6">
                    <Status name="Cancelado" color="danger" number={canceled} />
                </div>
                <div className="col col-10 col-s-12 table-list">
                    <ActivitiesList activities={props.activities} onEdit={(activity) => onEditActivity(activity)} />
                </div>
            </div>
        </div>
    )
}
