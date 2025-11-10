import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function NotificationRedirect(){
const router = useRouter()
const { id } = useLocalSearchParams<{ id?: string }>();
useEffect(()=>{

},[])
return (
<View style={styles.view}>
<Text style={styles.text}>Redirecting, please wait...</Text>
<Text>Your id:{id}</Text>
</View>)
}
const styles = StyleSheet.create({
view:{
justifyContent:"center",
flex:1,
alignItems:"center"
},
text:{
    fontFamily:"Nunito",
    fontSize:20
}
})