import { Text, View } from "react-native";
import Loader from "@/components/Loader";
import supabase from "@/configs/supabase";
import { useRouter } from "expo-router";
import { useEffect,useState } from "react";
import getAccountType from "@/utils/getAccountType";
import AdminHome from "@/screens/admin/home";
import notificationsObject from "@/types/notificationsFrom"
export default function Index() {
const [ToRender,setRender] = useState<React.ComponentType<any>|null>(null)
const notifications:notificationsObject[] = [{message:"Hi",time:"bye",type:"chat"}] 
  useEffect(()=>{
  const check = async ()=>{
  const {data:{user},error} = await supabase.auth.getUser()
  const router = useRouter()
  console.log(user)
  if(!user){
    router.replace("/auth")
  }else{
    const [acctype,error] = await getAccountType(user.id)
    console.log(acctype)
    switch(acctype){
      case 1:
      setRender(()=>AdminHome)
      break;

    }
    //@ts-ignore
  }

}
check()
  },[])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width:"100%"
      }}
    >
      {ToRender?
      <ToRender name="Toby" notifications_from={notifications}/>
      :null}
    </View>
  )
}
