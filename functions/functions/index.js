const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')
const {v1:uuid} = require('uuid')
const app = express()
const cors = require('cors')

admin.initializeApp()
const db = admin.firestore()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.post('/waitingList', (req,res)=> {
    let payload = req.body
    let uid = payload.uid

    db.collection('waitingList').get().then(snap => {
        let docs = snap.docs
        if(docs.length >= 1){
            let roomId = uuid()
            let otherUser = docs[0]
            let otherId = otherUser.ref.id

            // assign references
            let waitingRef = db.collection('waitingList').doc(otherId)
            let otherUserRef = db.collection('users').doc(otherId)
            let userRef = db.collection('users').doc(uid)

            // create a batch 
            let batch = db.batch() 
            batch.delete(waitingRef)
            batch.update(otherUserRef, {roomId})
            batch.update(userRef, {roomId})
            batch.commit()
            .then(done => res.status(200).json({msg: 'Now you can join the room :) '}))
            .catch(err => {res.status(500).json({err})
            console.log(err)
        })

            
        }else{ 
            // if the waiting list is empty just add this user to the waiting list 
            db.collection('waitingList').doc(uid).set({uid})
            .then(done => res.status(200).json({msg:'You are now in the waiting list :))'}))
            .catch(err => res.json({err:err}))
        }
    })
})

exports.app = functions.https.onRequest(app);
