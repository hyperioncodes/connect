import { Text,View,StyleSheet,Pressable } from "react-native"
type Props = {
   message:string,
   id:string
}

export default function Box({message,id}:Props){
return(
    <View style={styles.box}>
        <Text style={styles.text}>{message}</Text>
    </View>
)
}
const styles = StyleSheet.create({
    box:{
    width:"100%",
    borderWidth:1,
    borderColor:"#cfcfcf"
    },
    text:{
        fontFamily:"Nunito",
        fontSize:20
    }
})