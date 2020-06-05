import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


const colors = { 
    green: '#39ff5a',
    white: '#fdfdfd', 
    blue: '#218aff', 
    bage: '#d8d8d8', 
    gray: '#aeb9cc'
}


const style = StyleSheet.create({
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
      },
      input:{
        borderWidth: 2,
        borderColor: '#0f0f0f', 
        borderRadius: 5,
        width: width * 0.8,
        height: 30,
        flexDirection: "row",
        justifyContent: "flex-start"
      },
      btn: {
          height: 300,
          color: '#000'
      },
      message : {
        width: width * 0.8,
        backgroundColor: colors.green,
        marginTop : 10, 
        marginRight: 0 ,
        marginLeft: width * 0.2 ,
        padding:5,//
        color: colors.white

      },
      textingArea : { 
          marginTop: height * 0.05
      },
      widthFull: { 
        width: width 
      },
      chatBtn: {
        width: width / 2,
        height: 30 ,
        backgroundColor: 'green'

      },
})

export default style 