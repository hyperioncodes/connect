import supabase from "@/configs/supabase";
export default async function getAccountType(){
const {data:{user},error:accerror} = await supabase.auth.getUser()
if(!user) return[null,"No user found."]
const id = user.id
const {data,error} = await supabase
.from("acc_details")
.select("type")
.eq("id",id)
if(error||!data){
    return [null,"An error occured or no account of that type was found."]
}
return [data[0].type,null]
}