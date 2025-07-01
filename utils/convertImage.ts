import * as FileSystem from "expo-file-system"
import { Alert } from "react-native";
import submitErrorLog from "./submitError";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
export default async function convertImage(imageUri:string){
    try {
        const data = await FileSystem.readAsStringAsync(imageUri,{
            encoding:FileSystem.EncodingType.Base64
        })
        return data;
    }catch (error){
        const err = String(error)
        const {user,loading} = useAuth()
        useEffect(()=>{
            if(!loading&&user){
              submitErrorLog(err,"error",user.uid)  
            }
        },[loading,user])
        
        return null
    }
}