import { Text, View } from "react-native";
import Loader from "@/components/Loader";
import supabase from "@/configs/supabase";
import { useRouter } from "expo-router";
import { useEffect,useState } from "react";
import getAccountType from "@/utils/getAccountType";
import StudentHome from "@/app/student/home";
import notificationsObject from "@/types/notificationsFrom"
export default function Index() {
const [ToRender,setRender] = useState<React.ComponentType<any>|null>(null)
const notifications:notificationsObject[] = [{message:"Hi",from:"8m",type:"chat",routeTo:"/index"}] 
  useEffect(()=>{
  const check = async ()=>{
  const {data:{user},error} = await supabase.auth.getUser()
  const router = useRouter()
  console.log(user)
  if(!user){
    router.replace("/auth")
  }else{
    const [acctype,error] = await getAccountType()
    console.log(acctype)
    switch(acctype){
      case 1:
      router.replace("/student/home")
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
      <ToRender name="Toby" notifications_from={notifications} notifications={notifications.length}/>
      :null}
    </View>
  )
}
