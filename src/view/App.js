import './App.css'
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import {useState, useEffect} from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

export default function App(props) {
    const [activities, setActivities] = useState([])

    let history = useHistory()

    const addActivity = activity => {
        const date = new Date()
        activity = {...activity, history: [{date: `${date.getDate()}/${date.getUTCMonth()+1}/${date.getUTCFullYear()}`, text: `Atividade Criada por: ${firebase.auth().currentUser.displayName}`}]}
        props.db.collection("activities").add({
            ...activity
        })
            .then((docRef) => {
                activities.push({id: docRef.id, ...activity})
                setActivities([...activities])
            })
    }

    const editActivity = activity => {
        const updateActivity = {...activity}
        delete updateActivity.id
        props.db.collection("activities").doc(activity.id).update({
            ...updateActivity
        }).then(() => {
            const indexState = activities.findIndex(stateActivity => stateActivity.id === activity.id)
            activities[indexState] = activity
            setActivities([...activities])
        })
    }

    const fetchActivities = async() => {
        const response = props.db.collection("activities")
        const data = await response.get();
        data.docs.forEach(item=>{
            activities.push({id: item.id, ...item.data()})
            setActivities([...activities])
        })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                fetchActivities()
            } else {
                history.push("/login")
            }
        })

        return () => {
            setActivities([])
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="app">
            <div>
                <Navbar activities={activities} onCreate={(activity) => addActivity(activity)}/>
            </div>
            <div className="content">
                <Dashboard activities={activities} onEditActivity={(activity) => editActivity(activity)} />
            </div>
        </div>
    )
}
