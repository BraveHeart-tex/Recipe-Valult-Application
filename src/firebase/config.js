import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA584r0VzjWHRpSry20uPYsf1AqSgtF46c',
  authDomain: 'recipe-vault-site.firebaseapp.com',
  projectId: 'recipe-vault-site',
  storageBucket: 'recipe-vault-site.appspot.com',
  messagingSenderId: '702282484862',
  appId: '1:702282484862:web:5a343a643ed44877dd9c2f',
}

//init firebase
firebase.initializeApp(firebaseConfig) //connect to backend

//init services
const projectFirestore = firebase.firestore()

export { projectFirestore } // export so we can import it and use it to interact with the backend
