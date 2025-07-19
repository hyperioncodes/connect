import {Text,View,StyleSheet,Image} from "react-native"
export default function RequestSent(){
return(
    <View style={styles.mainContainer}>
<Image style={styles.image} source={require("../../assets/images/Connect.png")}/>
<Text style={styles.header}>Request sent</Text>
<Text style={styles.text}>Your account request has been sent. Once approved, you will be redirected to the main screen. You are now free to leave or close the app. Thank you.</Text>
    </View>
)
}
const styles = StyleSheet.create({
    header:{
        textAlign:"center",
            fontSize:60,
             fontFamily:"Nunito",
    },
    text:{
        fontFamily:"Nunito"
    },
    mainContainer:{
        alignItems:"center",
        justifyContent:"center"
    },
    image:{
     width:150,
        height:150,
        margin:10
    }
})