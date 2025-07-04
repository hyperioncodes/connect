import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { Text,StyleSheet,View,TextInput,Image,Alert} from "react-native";
import { useNavigation} from "expo-router";
import { useEffect,useState} from "react";
import { auth } from "../firebaseConfig";
import Button from "@/components/Button";
import isValidEmail from "@/utils/isValidEmail";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import { makeErrorReadable } from "@/utils/makeErrorReadable";
export default function Login(){
    const navigation = useNavigation();
    const router = useRouter()
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const [emailError,setEmailError] = useState("")
    const [loading,setLoading] = useState(false)
   
    async function login(){
        if(true){
            setLoading(true)
        try{  
        const user = await signInWithEmailAndPassword(auth,email,pass)
        router.replace("/")
        }catch(error){
            // @ts-ignore
            setEmailError(makeErrorReadable(error.code,"auth","login"))
            setLoading(false)
        }
            
        }else{
        setEmailError("The email you entered is invalid. \n Please double-check it and try again.")
        }
    }
  useEffect(() => {
    navigation.setOptions({
      title: 'Connect - Login',
    })
  }, [navigation]);
    return(
        <View style={styles.mainContainer}>
            {loading ? 
           <Loader size="xl"></Loader>: <>
            <Image style={styles.image} source={require("../../assets/images/Connect.png")}/>
    <Text style={styles.header}>Connect Login</Text>
        {emailError ? <Text style={styles.error}>{emailError}</Text>:null}
    <Input
    placeholder="Email"
    onChange={setEmail}
    value={email}
    isEmail={true}
    />
    <Input
    placeholder="Password"
    onChange={setPass}
    value={pass}
    isPass={true}
    />
    <Button width="40%" text="Login" onPress={login} isBlue={true}/>
    </>}
    </View>

)
    
}
const styles = StyleSheet.create({
        header:{
            textAlign:"center",
            fontSize:60,
             fontFamily:"Nunito",
            
        },
        mainContainer:{
            alignItems:"center",
            justifyContent:"center",
            
        },
        
        image:{
            width:150,
            height:150,
            margin:10
        },
        error:{
            color:"red"
        },
        button:{
           
            backgroundColor:"#3a86ff",
            width:"40%",
            height:50,
            borderRadius:15,
            margin:20,
            justifyContent:"center",
            alignItems:"center"
            
        },
        buttonText:{
             fontFamily:"Nunito",
            fontSize:30,
            
            
        }
    })
    