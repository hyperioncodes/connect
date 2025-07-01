import { db } from "@/app/firebaseConfig";
import Toast from "react-native-toast-message";
import { serverTimestamp,collection,addDoc } from "firebase/firestore";
export default async function submitErrorLog(message:string,type:string,uid:string,notify?:boolean){

const errorRef = collection(db,"dev","reports","errors")
await addDoc(errorRef,{
    type:type,
    msg:message,
    from:uid,
    timestamp:serverTimestamp()
})
if(notify){

Toast.show({
    type:"error",
    text1:"Error",
    text2:"An error has occured. The error details have been sent to the developers of Connect. We apologize for any inconvinience.\n Error details: "+message
})

}
}