import * as firebase from "firebase-admin";
const creds = require("../firebase-creds-ignore.json")

firebase.initializeApp({
    credential: firebase.credential.cert(creds)
})

export let database = firebase.firestore()