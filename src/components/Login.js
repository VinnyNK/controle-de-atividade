import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import './Login.css'

export default function Login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const history = useHistory()

    firebase.auth().useDeviceLanguage()

    const onLongin = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then(() => {
                history.push("/")
            })
    }

    return (
        <div className="app">
            <div className="content">
                <div className="google-btn" onClick={() => onLongin()}>
                    <div className="google-icon-wrapper">
                        <img className="google-icon"
                             src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo"/>
                    </div>
                    <p className="btn-text"><b>Sign in with google</b></p>
                </div>
            </div>
        </div>
    )
}
