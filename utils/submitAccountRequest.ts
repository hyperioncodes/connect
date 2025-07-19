import {db} from "../app/firebaseConfig"
import { collection,addDoc,serverTimestamp} from "firebase/firestore"
import * as SecureStore from "expo-secure-store"
export default async function sendAccountRequest(name:string,email:string,pass:string,photo:string,type:number){
const reqsRef = collection(db,"acc-reqs")
const doc = await addDoc(reqsRef,{
    name:name,
    email:email,
    pass:pass,
    photo:"data:image/jpeg;base64,"+photo,
    Timestamp:serverTimestamp(),
    resolved:0
})

}