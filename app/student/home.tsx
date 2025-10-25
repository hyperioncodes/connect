import { Text, View, StyleSheet, Pressable, Animated, Dimensions } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import React, { useRef, useState, useLayoutEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Box from "@/components/Box";
import notificationsObject from "@/types/notificationsFrom";
import {useWindowDimensions} from 'react-native';
import heightPercentage from "@/utils/heightPercentage";
type Props = {
  name: string;
  notifications: number;
  notifications_from: any[];
};

const PANEL_WIDTH = 350;

export default function StudentHome() {
  const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    width:"100%",
    
  },
  upcoming:{
    fontFamily:"Nunito",
    fontSize:24,
    textAlign:"center",
    marginTop:heightPercentage(0.20)
  },
  greeting: {
    fontSize: 50,
    fontFamily: "Nunito",
    textAlign: "center",
    marginTop: "5%",
  },
  notificationsPanel: {
    position: "absolute",
    top: 0,
    right: 0, // anchored to right
    width: PANEL_WIDTH,
    paddingTop: 60,
    height: "100%",
    backgroundColor: "#f3f3f3ff",
    padding: 20,
    zIndex: 100,
    borderLeftWidth: 1,
    margin:0,
    borderColor: "#cececeff",
    borderRadius:20
    
  },
  panelText: {
    color: "black",
    fontSize: 16,
    fontFamily:"Nunito"
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

const name = "Toby"
const notifications_from:notificationsObject[] = [{message:"Hi",from:"8m",type:"chat",routeTo:"/"}]
const notifications = 1;
    const insets = useSafeAreaInsets()
    const router = useRouter()
  const [isOpen, setOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(PANEL_WIDTH)).current; // Off-screen to the right
  const navigation = useNavigation();
  const [notificationsNum, setNum] = useState(notifications);

  const toggleNotifications = () => {
    const nextIsOpen = !isOpen;
    setOpen(nextIsOpen);

    Animated.timing(slideAnim, {
      toValue: nextIsOpen ? 0 : PANEL_WIDTH,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Pressable onPress={toggleNotifications} style={{ width: 30, height: 30 }}>
            <MaterialIcons name="notifications" size={30} color="white" />
            {notificationsNum > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationsNum}</Text>
              </View>
            )}
          </Pressable>
        </View>
      ),
    });
  }, [navigation, toggleNotifications, notificationsNum,notifications_from]);

  return (
    <View style={styles.main}>
      <Text style={styles.greeting}>Welcome back, {name}</Text>
      <Text style={styles.upcoming}>Upcoming:</Text>
      
      
      {/*Notifications panel*/}
      <Animated.View
        style={[
          styles.notificationsPanel,
          { transform: [{ translateX: slideAnim }],
          
        }, // Slide in from right
        ]}
      >
        
        
        {notifications_from.map((element,index)=>(
            <View key={index}>
                <Pressable onPress={(()=>router.replace(element.routeTo as any))}>
                <Box message={element.message} from={element.from} type={element.type}/>
                </Pressable>
            </View>
        ))}
        
      </Animated.View>
      </View>
  );
}


