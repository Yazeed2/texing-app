import React,{useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Texting from './components/Texting'

export default function App() {
  useEffect(() => {

  }, [])
  return (
    <View style={styles.container}>
   <Texting /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
