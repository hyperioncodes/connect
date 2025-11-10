import { Text, View, StyleSheet, Image, Platform } from "react-native";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/Button";
import supabase from "@/configs/supabase";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect, useRouter } from "expo-router";
import { useNavigation } from "expo-router";
export default function RequestSent() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Connect - Account Requested",
      swipeEnabled: false, // disable swipe gesture
      headerLeft: () => null,
    });
  }, [navigation]);
  const router = useRouter();
  const [uuid, setUuid] = useState("");
  const init = async () => {
    const storedUuid = await AsyncStorage.getItem("requuid");
    if (!storedUuid) {
      setUuid("none");
      return;
    }
    setUuid(storedUuid);
  };
  init();
  const checkStatus = async () => {
    console.log("Checking...");
    const { data: accdata, error } = await supabase
      .from("acc_details")
      .select("*")
      .eq("old_uuid", uuid);
    if (accdata && accdata.length > 0) {
      //run stuff
      let email = accdata[0].email;
      let password;
      password = await AsyncStorage.getItem("userpass");

      if (!password) {
        console.log("no password");
      } else {
        const {
          data: { user },
          error: usererror,
        } = await supabase.auth.getUser();
        if (!user) {
          console.log("no user or error");
          await login(email, password);
        }
      }
      if (error) {
        throw new Error(JSON.stringify(error));
      } else {
        let user = supabase.auth.getUser();
        console.log(JSON.stringify(user));
        AsyncStorage.removeItem("requuid");
        AsyncStorage.removeItem("userpass");
        router.replace("/");
      }
    }
  };
  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(checkStatus, 2000);
      console.log("using callback");
      return () => {
        clearInterval(interval);
        console.log("not using callback");
      };
    }, []),
  );
  const login = async (email: any, password: any) => {
    const { data: sdata, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log("data:" + sdata + "error:" + error);
  };
  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.image}
        source={require("../../assets/images/Connect.png")}
      />
      <Text style={styles.header}>Request sent</Text>
      <Text style={styles.text}>
        Your account request has been sent. Once approved, you will be
        redirected to the main screen. You are now free to leave or close the
        app. Thank you.
      </Text>
      <Button width="20%" text="Reload" onPress={checkStatus} isBlue />
      <View style={styles.mainContainer}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Text style={styles.text}>Developer Information</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text style={styles.accordionText}>Request-uuid:{uuid}</Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 60,
    fontFamily: "Nunito",
  },
  text: {
    fontFamily: "Nunito",
  },
  accordionText: {
    fontFamily: "Nunito",
    textAlign: "center",
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
});
