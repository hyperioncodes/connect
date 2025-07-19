import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter,Link } from "expo-router";
import { View,Text,StyleSheet,Platform,PixelRatio,Image} from "react-native";
import {useState,useRef,useEffect} from "react"
import * as ImagePicker from "expo-image-picker"
import isValidEmail from "@/utils/isValidEmail";
import isAcceptablePassword from "@/utils/isAcceptablePassword";
// @ts-ignore
import Select from "@/components/Select";
import {WebView} from "react-native-webview"
import Loader from "@/components/Loader";
import sendAccountRequest from "@/utils/submitAccountRequest";
export default function createAccount(){
    const router = useRouter()
    const [width,setWidth]=useState<any>("100%")
const [height,setHeight]= useState<any>(500)
const [name,setName]=useState("")
const [email,setEmail] = useState("")
const [image,setImage] = useState("")
const [pass,setPass]= useState("")
const [accType,setType] = useState<any|string|number>(1)
const [error,setError] = useState("")
const [showPhotocropUI,changePhotocropUI] = useState(false)
const [loading,setLoading] = useState(false)
const isNative = Platform.OS=="web"?false:true
const webRef = useRef(null)
const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    header:{
         textAlign:"center",
            fontSize:60,
             fontFamily:"Nunito",  
    },
    frame:{
        width:width,
        height:height
    },
    image:{
        width:150,
        height:150,
        margin:10
    }
})
const handleMessage=(event:any)=>{
    if(event.origin!=="https://connectbackend.web.app")return;
    let data = JSON.parse(event.nativeEvent.data)
    if(data.type=="dimentions"){
        // Implement later when actually good at ui
        //setWidth(convert(data.width))
        //setHeight(convert(data.height))
    }else if(data.type="base64"){
        setImage(data.image)
        // @ts-ignore
        router.replace("/requestSubmitted")
    }
}
    

const cont=()=>{
if(isAcceptablePassword(pass)&&isValidEmail(email)&&name.length>2){
changePhotocropUI(true)
}else{
    setError("Your Email, Password or Name is invalid. Please doublecheck them and try again.")
}
}
useEffect(()=>{
    if(!isNative){
        const handleMessageWeb=(event:MessageEvent)=>{
            
            if(event.data.type==="dimentions"){
                //imeplement later when actually good at ui
                //setWidth(convert(event.data.width))
                //setHeight(convert(event.data.height))
                
            }else if(event.data.type==="base64"){
                setImage(event.data.image)
            }
        }
        window.addEventListener("message",handleMessageWeb)
        return () => {
      window.removeEventListener("message", handleMessageWeb);
    };
    }
},[])
useEffect(() => {
  if (image && name && email && pass) {
    request()
  }
}, [image])
const convert = (size:number)=>{
return size/PixelRatio.get()/2
}
const request = async ()=>{
    setLoading(true)
    alert(name+email+pass+image)
    await sendAccountRequest(name,email,pass,image,accType)
    router.replace("/auth/requestSent")
}
    return(
    <View>
    {loading?
    <View
    style={styles.mainContainer}
    >
<Loader size="large"/>
    </View>:
    <View>
    {showPhotocropUI ? <View>
        {isNative?
        <View style={styles.mainContainer}>
        <WebView
        ref={webRef}
        source={{uri:'https://connectbackend.web.app/profile/'}}
        style={styles.frame}
        onmessage={(event:MessageEvent)=>{
        handleMessage(event)
        }}
        />
        <Button width="40%" text="Request Account" isBlue={true} onPress={()=>{
            //@ts-ignore
            webRef.current.postMessage("imageToBase64")
        }}></Button>
        </View>
:
<View style={styles.mainContainer}>
<iframe
ref={webRef}
src="https://connectbackend.web.app/profile/"
style={styles.frame}
/>
<Button width="40%" text="Request Account" isBlue={true} onPress={()=>{
    const data = {requesting:"imageToBase64"}
    alert(pass+name)
    //@ts-ignore
    
          webRef.current?.contentWindow?.postMessage(JSON.stringify(data),"*")  
        }}></Button>
 </View>   
    }
    </View> :
    <View style={styles.mainContainer}>
        <Image style={styles.image} source={require("../../assets/images/Connect.png")}/>
        <Text style={styles.header}>Request an account</Text>
        {error?<Text style={{color:"red"}}>{error}</Text>:null}
        <Input placeholder={"Full name"} onChange={setName} value={name}/>
   <Select val={accType} setVal={setType} options={[
            {label:'Student',value:1},
            {label:'Teacher',value:2},
            {label:'Counselor',value:3}
        ]}/>
        <Input placeholder={"Email"} onChange={setEmail} value={email} isEmail={true}/>
        <Input placeholder={"Password"} onChange={setPass} value={pass} isPass={true}/>
        <Button text="Continue" width={"40%"} isBlue onPress={()=>{cont();alert(email+pass)}}/>
    </View>
    }
    </View>
}</View>
)

}
