import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Texting from './components/Texting'
import Chat from './components/Chat'
import {getMessages} from './firebase' 
import {firestore, auth} from 'firebase' 
import Loading from './components/loading/Loading'


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
  return (
    <View style={styles.container}>
   {/* <Texting /> 
    */}
    {state.userId? 
    <Chat userId ={state.userId} /> 
     : <Loading/>}
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
