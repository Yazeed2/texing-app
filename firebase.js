import firebase from 'firebase'
import config from './config'
firebase.initializeApp(config)


const db = firebase.database()
export const auth = firebase.auth
export const firestore = firebase.firestore
export const sendMessage = (message) => {

   
    db.ref('/chat').set(message)
    return; 
}
export const getMessages = (back) => { 
    db.ref('texting').on('value',(payload)=>{
        console.log(payload.val());
        
       back(payload.val())
    })
}
