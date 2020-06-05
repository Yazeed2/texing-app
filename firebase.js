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

        
        await firebase.firestore().collection('waitingList').doc(userId).set({userId})
        Promise.resolve('done')
    }
    catch (err){ 
        console.log('error in waitingList', err);
        Promise.reject(new Error('Something went wrong I can feel It :( (probably firebase)'))
        
    }
    

}