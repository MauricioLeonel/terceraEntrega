const firebase = require('firebase/app');
const { doc, setDoc, firestore } = require('firebase/firestore');

const firebaseConfig = {
	apikey:process.env.apikey,
	authDomain:process.env.authDomain,
	projectId:process.env.projectId,
	storageBucket:process.env.storageBucket,
	messagingSenderId:process.env.messagingSenderId,
	appId:process.env.appId
}

const app2 = firebase.initializeApp(firebaseConfig);

const db2 = firebase.firestore;


module.exports = db2