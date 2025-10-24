import { Text,View,ScrollView, StyleSheet } from "react-native";
import Box from "@/components/Box";
import notificationsObject from "@/types/notificationsFrom"
//@ts-nocheck
type Props = {
    name:string,
    notifications:number,
    notifications_from:any[]
}
export default function StudentHome({name,notifications,notifications_from}:Props){
console.log(typeof notifications_from)
console.log(JSON.stringify(notifications_from))
return(
<View style={styles.main}>
<Text style={styles.greeting}>Welcome back, {name}</Text>
<View style={[styles.quarter,styles.q1]}>
<View style={styles.title}>
    <Text style={[styles.text,styles.titleText]}>Notifications</Text>
</View>

{
!notifications || notifications==0 
? <Text style={[styles.text,{fontSize:15,textAlign:"center",top:"20%"}]}>No new notifications. You're all caught up.</Text> 
: <ScrollView>
{notifications_from.map((element, index) => (
        <View key={index}>
            
        </View>
      ))}
</ScrollView>
}
</View>
</View>
);
}
const styles = StyleSheet.create({
    quarter:{
        width:"25%",
        height:"20%",
    borderRadius:20,
    borderWidth:1
    },
    title:{
    width:"100%",
    backgroundColor:"#3a86ff",
    height:"30%",
    borderTopLeftRadius:19,
    borderTopRightRadius:19,
    },
    titleText:{
    fontSize:25,
    top:"20%",
    color:"#eee",
    marginLeft:"4%"
    },
    text:{
        fontFamily:"Nunito"
    },
    greeting:{
    fontSize:60,
    fontFamily:"Nunito",
    textAlign:"center",
    marginTop:"3%"
    },
    q1:{
    
    top:"20%",
    left:"20%",
    
    },
    q2:{

    },
    q3:{

    },
    q4:{

    },
    main:{
    width:"100%",
    height:"100%",
    fontFamily:"Nunito"
    }
})