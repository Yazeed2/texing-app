import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import style from './style'
import {sendMessage} from '../firebase'
import { database } from 'firebase'
export default class Example extends React.Component {
  state = {
    messages: [],
  }
 
  componentDidMount() {

    database().ref('/chat').on('value', payload => {
        this.setState({messages: payload.val()})
    })
       
  }
 
  onSend(messages = []) {
    // this.setState(previousState => ({
    //   messages: ,
    // }))
    let chat = GiftedChat.append(this.state.messages, messages)
    chat[0].createdAt = new Date()
    sendMessage(chat)

  }
 
  render() {
    return (
      <GiftedChat
        messagesContainerStyle={style.widthFull}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.userId
        }}

      />
    )
  }
}
