import {Text,View,StyleSheet,Image} from "react-native"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function RequestSent(){
    const [uuid,setUuid] = useState("")
useEffect(()=>{
    //@ts-ignore
    setUuid(AsyncStorage.getItem("requuid"))
},[])
return(
    <View style={styles.mainContainer}>
<Image style={styles.image} source={require("../../assets/images/Connect.png")}/>
<Text style={styles.header}>Request sent</Text>
<Text style={styles.text}>Your account request has been sent. Once approved, you will be redirected to the main screen. You are now free to leave or close the app. Thank you.</Text>
<View style={styles.mainContainer}>
    <Accordion type='single' collapsible>
  <AccordionItem value='item-1'>
    <AccordionTrigger><Text style={styles.text}>Developer Information</Text></AccordionTrigger>
    <AccordionContent>
        <Text style={styles.accordionText}>
        Request-uuid:{uuid}
        </Text>
    </AccordionContent>
  </AccordionItem>
</Accordion>
</View>
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
    accordionText:{
        fontFamily:"Nunito",
        textAlign:"center"
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