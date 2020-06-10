import firebase from 'firebase'
import config from './config'
firebase.initializeApp(config)

import link from './link'
import Axios from 'axios'
const db = firebase.database()
export const auth = firebase.auth
export const firestore = firebase.firestore
export const sendMessage = (message, roomId) => {

   
    db.ref('/chat/'+roomId).set(message)
    return; 
}
export const getMessages = (back, roomId) => { 
    db.ref('texting/'+roomId).on('value',(payload)=>{
               back(payload.val())
    })
}
// export const createRoom = async () => { 
//     let key = firebase().database().ref('').child('chat').push().key
//     let ref = firebase.database.ref() 
//     let update = {}

//     update['chat/'+ key] = []
    
//     ref.update(update).then(data => {
//         Promise.resolve({id: key})
//     })


// }

export const waitingList = async (userId) => {
    try{ 
        // await firebase.firestore().collection('waitingList').doc(userId).set({userId})
        await Axios.post(link+'waitingList',{ 
            uid: userId ,
        })
        Promise.resolve('done')
    }
    catch (err){ 
        console.log('error in waitingList', err);
        Promise.reject(new Error(err))
        
    }
    

}

export const getRoomId = async (uid, setRoom)=> {
    firebase.firestore().collection("users").doc(uid).onSnapshot(data=> {
        data = data.data()
        if(data.roomId){
            setRoom(data.roomId)
            console.log(data.roomId);
            
        }
    })
}