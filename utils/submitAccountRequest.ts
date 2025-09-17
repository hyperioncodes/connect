import * as SecureStore from "expo-secure-store"
import supabase from "@/configs/supabase"
export default async function sendAccountRequest(name:string,email:string,photo:string,type:number,pass:string){
const { data, error } = await supabase
  .from('acc_reqs')
  .insert([
    { name:name,email:email,photo:photo,acc_type:type,pass:pass},
  ])
  .select()
  
  if(error||!data){
    //implement error handling later
    return [null,error]
  }else{
    return [data,null]
  }
  
}