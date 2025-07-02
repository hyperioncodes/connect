import { db } from "@/app/firebaseConfig";
import Toast from "react-native-toast-message";
import { collection,addDoc, doc,serverTimestamp} from "firebase/firestore";
import { Alert } from "react-native";
export default async function submitErrorLog(
    message:string,
    type:string,
    uid:string,
    notify?:boolean){
const alertDocRef = doc(db,"dev","alert")


const errorRef = collection(alertDocRef,"errors")
try{
await addDoc(errorRef,{
    type:type,
    msg:message,
    from:uid,
    timestamp:serverTimestamp()
})
}catch(err){
    console.log(err)
}
}