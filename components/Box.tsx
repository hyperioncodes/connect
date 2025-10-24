import { View,Text,StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
type Props = { 
    message:string, 
    from:string,
    type:"chat"|"calendar"
}
export default function Box({ message, from, type }: Props) {
  return (
    <View style={styles.box}>
      <View style={styles.row}>
       <Entypo name={type} size={24} color="black" />
        <Text style={[styles.text, styles.message]}>{message}</Text>
        <Text style={[styles.text, styles.from]}>{from} ago</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#cfcfcf",
    paddingHorizontal:10,
    paddingVertical: 8,
    borderRadius:10,
  },
  row: {
    flexDirection: "row",
    
                
  },
  text: {
    fontFamily: "Nunito",
    fontSize: 20,
  },
  message: {
    textAlign: "left",
    flexShrink: 1,  // allow text to shrink if too long
    marginLeft:20
  },
  from: {
marginLeft:"52%"
    
  },
});
