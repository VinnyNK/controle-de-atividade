import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './view/App'
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Config from "./config";

document.title = 'Controle de Atividades'

if(!firebase.apps.length){
    firebase.initializeApp(Config);
} else {
    firebase.app()
}

const db = firebase.firestore()

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Switch>
              <Route exact path="/">
                <App db={db} />
              </Route>
              <Route exact path="/login">
                  <Login />
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
