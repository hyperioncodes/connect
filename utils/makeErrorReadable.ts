import submitErrorLog from "./submitError"
export const makeErrorReadable = (error:string,type:string,from:string)=>{
        switch(error){
            case "auth/invalid-credential":
                return "The email and password you entered are not correct. Please double check them or create an account."
            break
            default:
                submitErrorLog(error,type,from)
                return "Error:"+error+" \n The developers of Connect have been notified and will attempt to fix it shortly.\n We apologize in advance."
        }}