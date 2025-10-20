import * as SecureStore from "expo-secure-store"
import supabase from "@/configs/supabase"
export default async function sendAccountRequest(name:string,email:string,photo:string,type:number,pass:string){
const { data, error } = await supabase
  .from('acc_reqs')
  .insert([
    { name:name,email:email,photo:photo,acc_type:type},
  ])
  .select()

if(!data||!Array.isArray(data)||error){
return [null,error ?? new Error("Insert failed or returned no data")]
}
const {error:perror} = await supabase
.from("acc_reqs_passwords")
.insert([{
  //@ts-ignore
  password:pass, id:data[0].id
}])
  if(perror){
    //implement error handling later
    return [null,error ?? new Error("Insert into passwords failed")]
  }else{
    return [data,null]
  }
  
}