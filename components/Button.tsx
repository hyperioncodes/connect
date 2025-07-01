import { TouchableOpacity,Text,StyleSheet } from "react-native";
type Props={
width:any,
text:string,
onPress:any,
isBlue?:boolean
}
export default function Button({width,text,onPress,isBlue}:Props){
const styles = StyleSheet.create({
    button:{
           
            backgroundColor:isBlue?"#3a86ff":"#ffffff",
            width:width,
            height:50,
            borderRadius:15,
            margin:20,
            justifyContent:"center",
            alignItems:"center"
            
        },
        buttonText:{
             fontFamily:"Nunito",
            fontSize:30,
            color:isBlue?"#ffffff":"#000000"
            
        }

})
return(
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
)
}
