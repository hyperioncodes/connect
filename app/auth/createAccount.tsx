import Input from "@/components/Input";
import Button from "@/components/Button";
import { View,Text,StyleSheet } from "react-native";
import {useState} from "react"
import * as ImagePicker from "expo-image-picker"
export default function createAccount(){
const [name,setName]=useState("")
const [email,setEmail] = useState("")
const [image,setImage] = useState("")
const [pass,setPass]= useState("")
const [error,setError] = useState("")

return(
    <View style={styles.mainContainer}>
        <Text style={styles.header}>Request an account</Text>
    </View>
)

}
const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    header:{
        fontSize:60,
        fontFamily:"Nunito",
    }
    
})