import { Stack } from "expo-router";
import {useFonts} from "expo-font"
import * as SplashScreen from 'expo-splash-screen'
import {useEffect} from "react";
SplashScreen.preventAutoHideAsync()
export default function RootLayout() {
  const [loaded,error] = useFonts({
    'Nunito':require("../assets/fonts/Nunito.ttf")
  })
  useEffect(()=>{
    if(loaded||error){
      SplashScreen.hideAsync()
    }
  },[loaded,error])
  if(!loaded&&!error){
    return null
  }
  return <Stack />;
}
