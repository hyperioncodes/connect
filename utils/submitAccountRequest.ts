import {db} from "../app/firebaseConfig"
import { collection,addDoc,serverTimestamp, Timestamp} from "firebase/firestore"

export default async function sendAccountRequest(name:string,email:string,pass:string,photo:string){
const reqsRef = collection(db,"acc-reqs")
await addDoc(reqsRef,{
    name:name,
    email:email,
    pass:pass,
    photo:"data:image/jpeg;base64,"+photo,
    Timestamp:serverTimestamp
})

}