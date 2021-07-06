import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import firebase from 'firebase' 
import 'firebase/firestore'

//your apps firebase configuration 
firebase.initializeApp({
  apiKey: "AIzaSyBa9BbTyBO0xp8P_wo-L_DG74uZ-98BfZg",
  authDomain: "evernote-clone-d6a47.firebaseapp.com",
  projectId: "evernote-clone-d6a47",
  storageBucket: "evernote-clone-d6a47.appspot.com",
  messagingSenderId: "311446954216",
  appId: "1:311446954216:web:dfd89d8028ca4dfd39e95d",
  measurementId: "G-R1LB2MLKMD"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
