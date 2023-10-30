import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAXvLhwsC6kPfYfNrrHQJAJssW-StW4rFs",
    authDomain: "proyectofinal-rn.firebaseapp.com",
    projectId: "proyectofinal-rn",
    storageBucket: "proyectofinal-rn.appspot.com",
    messagingSenderId: "605884081864",
    appId: "1:605884081864:web:47b761aded98d57ab5a7fd"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()