import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
// import Texting from './components/Texting'
import Chat from './components/Chat'
import Loading from './components/loading/Loading'
import {auth, firestore} from 'firebase'
import {waitingList, getRoomId} from './firebase'
import Home from './components/Home'

export default function App() {
  const [state, setState] = useState({})
  useEffect(() => {
    auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorMessage)
    })

    auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        firestore().collection('users').doc(uid).set({userId:uid})
        console.log('heys')
        setState({...state, userId: user.uid})

      
            // ...
      }
      // ...
    });
  }, [])
  const setRoom = (roomId)=> {
    setState({...state,  roomId})
  }
  const startChat = async () => {
    setState({...state, searching: true})
    await waitingList(state.userId)
     getRoomId(state.userId, setRoom)
  }
  return (
    <View style={styles.container}>
   {/* <Texting /> 
    */}
    {state.userId && !state.searching && !state.roomId? 
      <Home callback={startChat} />
     : <></>}
     {!state.userId|| state.searching?<Loading/>: <></>}
  
     {state.roomId && state.userId? <Chat userId ={state.userId} roomId={state.roomId} /> : <></> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
