import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter, Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PixelRatio,
  Image,
  TextInput,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import isValidEmail from "@/utils/isValidEmail";
import isAcceptablePassword from "@/utils/isAcceptablePassword";
// @ts-ignore
import Select from "@/components/Select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import Loader from "@/components/Loader";
import sendAccountRequest from "@/utils/submitAccountRequest";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "expo-router";
export default function createAccount() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Connect - Creating Account",
      swipeEnabled: false, // disable swipe gesture
      headerLeft: () => null,
    });
  });
  const router = useRouter();
  const [width, setWidth] = useState<any>("100%");
  const [height, setHeight] = useState<any>(500);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [accType, setType] = useState(1);
  const [error, setError] = useState("");
  const [showPhotocropUI, changePhotocropUI] = useState(false);
  const [loading, setLoading] = useState(false);
  const isNative = Platform.OS == "web" ? false : true;
  const webRef = useRef(null);
  const [waiting, setWaiting] = useState(false);
  const styles = StyleSheet.create({
    mainContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      textAlign: "center",
      fontSize: 60,
      fontFamily: "Nunito",
    },
    frame: {
      width: width,
      height: height,
    },
    image: {
      width: 150,
      height: 150,
      margin: 10,
    },
  });
  const handleMessage = (event: any) => {
    if (event.origin !== "https://connectbackend.web.app") return;
    let data = JSON.parse(event.nativeEvent.data);
    if (data.type == "dimentions") {
      // Implement later when actually good at ui
      //setWidth(convert(data.width))
      //setHeight(convert(data.height))
    } else if ((data.type = "base64")) {
      setImage(data.image);
      // @ts-ignore
      request();
    }
  };
  useEffect(() => {
    if (waiting) {
      request(name, email, image, accType, pass);
    }
  }, [image]);

  const cont = () => {
    if (isAcceptablePassword(pass) && isValidEmail(email) && name.length > 2) {
      changePhotocropUI(true);
    } else {
      setError(
        "Your Email, Password or Name are invalid or malformed. Please double check them and try again.",
      );
    }
  };
  useEffect(() => {
    if (!isNative) {
      const handleMessageWeb = (event: MessageEvent) => {
        if (event.data.type === "dimentions") {
          //imeplement later when actually good at ui
          //setWidth(convert(event.data.width))
          //setHeight(convert(event.data.height))
        } else if (event.data.type === "base64") {
          setImage(event.data.image);
        }
      };
      window.addEventListener("message", handleMessageWeb);
      return () => {
        window.removeEventListener("message", handleMessageWeb);
      };
    }
  }, [showPhotocropUI]);

  const convert = (size: number) => {
    return size / PixelRatio.get() / 2;
  };
  const request = async function (
    name: any,
    email: any,
    image: any,
    accType: any,
    pass: any,
  ) {
    setLoading(true);

    let [data, error] = await sendAccountRequest(
      name,
      email,
      image,
      accType,
      pass,
    );

    if (error) {
      console.log("data: "+data);
      console.log("error:"+error);
    } else if (!data) {
      setLoading(false);
      setError("Account request failed. Please wait and try again.");
    } else if (Array.isArray(data) && data.length > 0) {
      //@ts-ignore
      console.log(data);
      AsyncStorage.setItem("requuid", data[0].id);
      if (Platform.OS !== "web") {
        await SecureStore.setItemAsync("userpass", pass);
      } else {
        AsyncStorage.setItem("userpass", pass);
      }
      router.replace("/auth/requestSent");
    } else {
      console.log(data);
    }
  };
  return (
    <View>
      {loading ? (
        <View style={styles.mainContainer}>
          <Loader size="large" />
        </View>
      ) : (
        <View>
          {showPhotocropUI ? (
            <View>
              {isNative ? (
                <View style={styles.mainContainer}>
                  <WebView
                    ref={webRef}
                    source={{ uri: "https://connectbackend.web.app/profile/" }}
                    style={styles.frame}
                    onMessage={(event: any) => {
                      handleMessage(event);
                    }}
                  />
                  <Button
                    width="40%"
                    text="Request Account"
                    isBlue={true}
                    onPress={() => {
                      //@ts-ignore
                      webRef.current.postMessage("imageToBase64");
                    }}
                  ></Button>
                </View>
              ) : (
                <View style={styles.mainContainer}>
                  <iframe
                    ref={webRef}
                    src="https://connectbackend.web.app/profile/"
                    style={styles.frame}
                  />
                  <Button
                    width="40%"
                    text="Request Account"
                    isBlue={true}
                    onPress={() => {
                      const data = { requesting: "imageToBase64" };
                      //@ts-ignore
                      webRef.current?.contentWindow?.postMessage(
                        JSON.stringify(data),
                        "*",
                      );
                      setWaiting(true);
                    }}
                  ></Button>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.mainContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/images/Connect.png")}
              />
              <Text style={styles.header}>Request an account</Text>
              {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
              <Input
                placeholder={"Full name"}
                onChangeText={setName}
                value={name}
              />
              <Select
                val={accType}
                setVal={setType}
                options={[
                  { label: "Student", value: 1 },
                  { label: "Teacher", value: 2 },
                  { label: "Counselor", value: 3 },
                ]}
              />
              <Input
                placeholder={"Email"}
                onChangeText={setEmail}
                value={email}
                isEmail
              />
              <Input
                placeholder={"Password"}
                onChangeText={setPass}
                value={pass}
                isPass
              />
              <Button
                text="Continue"
                width={"40%"}
                isBlue
                onPress={() => {
                  cont();
                }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}
