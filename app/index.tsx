import { Text, View } from "react-native";
import Loader from "@/components/Loader";
export default function Index() {
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{fontFamily:'Nunito'}}>Edit app/index.tsx to edit this screen.</Text>
      <Loader size="large"/>
    </View>
  );
}
