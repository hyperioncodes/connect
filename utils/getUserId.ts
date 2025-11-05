import supabase from "@/configs/supabase";
export default async function getUserId(){
const {data:{user},error} = await supabase.auth.getUser()
if(error||!user){
return null
}
return user?.id
}