import { Text,View,ScrollView, StyleSheet, Pressable, Animated, Dimensions } from "react-native";
import Box from "@/components/Box";
import notificationsObject from "@/types/notificationsFrom"
import { useNavigation } from "expo-router";
import React, { useRef, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
type Props = {
    name:string,
    notifications:number,
    notifications_from:any[]
}
const SCREEN_WIDTH = Dimensions.get('window').width;
export default function StudentHome({name,notifications,notifications_from}:Props){
    const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current; // Start off-screen right
const navigation = useNavigation()
const [notificationsNum,setNum] = useState(notifications)
const toggleNotifications = () => {
    console.log(isOpen)
    console.log("start")
    Animated.timing(slideAnim, {
      toValue: isOpen ? SCREEN_WIDTH : SCREEN_WIDTH - 250, // Width of panel
      duration: 300,
      useNativeDriver: false,
    }).start(() => {setIsOpen(!isOpen);console.log("went")});
  };
React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
  <Pressable onPress={() => {toggleNotifications();console.log("toggle")}} style={{ width: 30, height: 30 }}>
    <MaterialIcons name="notifications" size={30} color="white" />
    {notificationsNum>0&&(
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{notificationsNum}</Text>
    </View>
    )}
  </Pressable>
</View>
      ),
    });
  }, [navigation]);
return(
<View style={styles.main}>
<Text style={styles.greeting}>Welcome back, {name}</Text>
<Text>Upcoming:</Text>
 <Animated.View style={[styles.notificationsPanel, { left: slideAnim }]}>
        <Text style={styles.panelText}>🔔 You have new notifications!</Text>
</Animated.View>
</View>
);
}
const styles = StyleSheet.create({
    title:{
    width:"100%",
    backgroundColor:"#3a86ff",
    height:"30%",
    borderTopLeftRadius:19,
    borderTopRightRadius:19,
    },
    titleText:{
    fontSize:25,
    top:"20%",
    color:"#eee",
    marginLeft:"4%"
    },
    text:{
        fontFamily:"Nunito"
    },
    greeting:{
    fontSize:60,
    fontFamily:"Nunito",
    textAlign:"center",
    marginTop:"3%"
    },
    notificationsPanel: {
    position: 'absolute',
    top: 1, // below the header
    bottom: 0,
    width: 250,
    backgroundColor: '#333',
    padding: 20,
    zIndex: 100,
    borderLeftWidth: 1,
    borderColor: '#555',
  },
  panelText: {
    color: 'black',
    fontSize: 16,
  },
    main:{
    width:"100%",
    height:"100%",
    fontFamily:"Nunito"
    },
    badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
})