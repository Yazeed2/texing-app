import firebase from 'firebase'
import config from './config'
firebase.initializeApp(config)


const db = firebase.database()
export const sendMessage = (message) => {

   
    db.ref('/texting').set(message)
    return; 
}
export const getMessages = (back) => { 
    db.ref('texting').on('value',(payload)=>{
        console.log(payload.val());
        
       back(payload.val())
    })
}
