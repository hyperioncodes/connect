// components/CustomDrawer.js
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet,Text } from 'react-native';
import getAccountType from '@/utils/getAccountType';
import supabase from '@/configs/supabase';
import StudentDrawer from './drawers/StudentDrawer';
import { useEffect, useState } from 'react';
export default function CustomDrawer(props:any) {


const [ToRender,setRender] = useState<React.ComponentType<any>>(Text)
useEffect(()=>{
const setup = async ()=>{
const [type,terror]= await getAccountType()
switch(type){
        case 1:
        console.log("111")
        setRender(()=>StudentDrawer)
        
        break;
    }
}
setup()
})
const router = useRouter()
const path = usePathname()
  return (

    <ToRender/>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor:"#ffffffff",
    
  },
});
