import React from 'react'
import { View, Button } from 'react-native'
import style from './style'

export default function Home({callback}) {
    return (
      <View>

          <Button
          onPress= {callback}
          title={'chat'}
          style={style.chatBtn}
          />
      </View>
    )
}
