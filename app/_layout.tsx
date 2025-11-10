import { useFonts } from "expo-font";
import {
  Stack,
  useRouter,
  useRootNavigationState,
  usePathname,
} from "expo-router";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigationState } from "@react-navigation/native";
import CustomDrawer from "@/components/CustomDrawer";
export default function RootLayout() {
  const pathname = usePathname();

  const state = useNavigationState((state) => state);


  // Load fonts
  const [fontsLoaded] = useFonts({
    Nunito: require("../assets/fonts/Nunito.ttf"),
  });

  // Prevent splash screen from auto-hiding (only once)
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  // Set user on mount (assuming synchronous, otherwise handle async)

  // Hide splash screen after fonts load and user is set
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Redirect once navigation is ready and fonts/user loaded

  // Don't render until fonts and user are ready (to avoid flicker)
  if (!fontsLoaded) {
    return null;
  }
  const isAuth = pathname.startsWith("/auth") || pathname.startsWith("/mobile");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            drawerActiveTintColor: "#3a86ff",
            drawerType: "permanent",
            headerStyle: { backgroundColor: "#3a86ff" },
            headerTintColor: "#fff",
            drawerActiveBackgroundColor: "#ffffffff",
            drawerStyle: {
              width: isAuth ? 0 : 320,
            },

            headerTitleStyle: { fontWeight: "bold" },
            headerLeft: () => null,
          }}
          drawerContent={(props) => <CustomDrawer {...props} />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
