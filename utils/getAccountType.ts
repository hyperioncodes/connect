import supabase from "@/configs/supabase";
export default async function getAccountType(id:string){
const {data,error} = await supabase
.from("acc_details")
.select("type")
.eq("id",id)
if(error||!data){
    return [null,"An error occured or no account of that type was found."]
}
return [data[0].type,null]
}