import React,{useState, useEffect} from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import style from './style'
import {Grid, Col, Row} from 'react-native-easy-grid'
import { getMessages, sendMessage } from '../firebase';
import { database } from 'firebase';
export default function Texting() {
    const [state, set] = useState({refresh:true})

    const setState = (obj) => {
      set({...state, ...obj})
    }
    const setMessages  = (payload) => { 
    
    }  
    useEffect(() => {
        
           database().ref().on('value', (payload)=>{
            var data = payload.val()
            console.log( data.texting);
                if(data.texting == undefined){
                    data.texting = []
                }
            
               set({...state, messages: data.texting, refresh :!state.refresh})
           })

    }, [])
  
   const setText = (text) => {
     setState({text})

    
   }
   const sendIt = () => {
  if (state.text){
    set({...state, messages:state.messages.push(state.text)})
    sendMessage( state.messages)
       }
       setText('')


   }
   
    return (
     <View >
         <Grid>
             <Row size={9}>
                 <ScrollView style={style.textingArea}>
            {state.messages && state.messages.map((txt, i) =><View key={i} style={style.message}> 
            <Text>{txt}</Text>
             </View> )}
                 </ScrollView>
             </Row>
<Row size={1}>

<TextInput 
        style={style.input}
            onChangeText={(text)=>setText(text)}
            placeholder='type somthing'
            value={state.text}
            onSubmitEditing={sendIt}
        /> 


<Button
      title="Send"
      type="solid"
      size={105}
    onPress={sendIt}
/>

</Row>

      <Text>;</Text>
         </Grid>
     </View>
    )
}
