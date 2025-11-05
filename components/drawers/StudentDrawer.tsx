// components/CustomDrawer.js
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function StudentDrawer(props: any) {
  const router = useRouter();
  const path = usePathname();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <DrawerItem
        label="Home"
        onPress={() => router.replace("/student/home")}
        focused={path === "/student/home"}
        icon={({ color, size }) => (
          <MaterialIcons name="home" size={size} color={color} />
        )}
      />
    <DrawerItem
        label="Binder"
        focused={path === "/student/binder"}
        onPress={() => router.replace("/student/binder")}
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="notebook" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="Settings"
        focused={path === "/settings"}
        onPress={() => router.replace("/settings")}
        icon={({ color, size }) => (
          <MaterialIcons name="settings" size={size} color={color} />
        )}
      />
      
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#ffffffff",
  },
});
