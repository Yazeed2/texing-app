import React,{useState} from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import style from './style'
import {Grid, Col, Row} from 'react-native-easy-grid'
export default function Texting() {

    const [state, set] = useState({sended:[]})
    const setState = (obj) => {
      set({...state, ...obj})
    }
   const setText = (text) => {
     setState({text})

    
   }
   const sendIt = () => {
       if(state.text === '='){
        state.sended = []
       }else if (state.text){
        setState({sended: state.sended.push(state.text) })

       }
       setText('')


   }
    return (
     <View >
         <Grid>
             <Row size={9}>
                 <ScrollView style={style.textingArea}>
            {state.sended && state.sended.map(txt =><View style={style.message}> 
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
