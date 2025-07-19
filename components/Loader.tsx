import {StyleSheet,Image} from "react-native"

type Props={
size?:string
isDark?:boolean

}
export default function Loader({size="normal",isDark}:Props){
    let style;
    if(size==="small"){
        style=styles.small
    }
    else if(size==="normal"){
        style=styles.normal
    }else if(size==="large"){
        style=styles.large
    }else if(size==="xl"){
        style=styles.xl
    }
    return <Image 
    source={require("../assets/images/ConnectLoader.gif")} 
    style={style}
    />
    
}
const styles = StyleSheet.create({
        xl:{
        width:800,
        height:800,
        resizeMode:"cover"
        },
        large:{
            width:400,
            height:400,
            resizeMode:"cover"
        },
        normal:{
            width:200,
            height:200,
            resizeMode:"cover"
        },
        small:{
            width:100,
            height:100,
            resizeMode:"cover"
        }
    })