import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
// import Texting from './components/Texting'
import Chat from './components/Chat'
import Loading from './components/loading/Loading'
import {auth} from 'firebase'
import {waitingList} from './firebase'
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
        console.log('heys')
        setState({...state, userId: user.uid})

      
            // ...
      }
      // ...
    });
  }, [])
  const startChat = async () => {
    setState({...state, searching: true})
    waitingList(state.userId)
  }
  return (
    <View style={styles.container}>
   {/* <Texting /> 
    */}
    {state.userId? 
      <Home callback={startChat} />
     : <Loading/>}
  {state.searching? <Loading />: <></>}
     {state.chatId && state.userId?<Chat userId ={state.userId} /> : <></> }
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
