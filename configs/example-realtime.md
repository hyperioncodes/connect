useEffect(()=>{
//@ts-ignore
const init = async()=>{
const {data:{session}} = await supabase.auth.getSession()
if(!session){
throw new Error("No session")
}
console.log(session.access_token)
const storedUuid = await AsyncStorage.getItem("requuid")
if(!storedUuid){
setUuid("none")
return;
};
setUuid(storedUuid)
}
init()
const channels = supabase.channel('acc-reqs')
.on(
'postgres_changes',
{ event: 'INSERT', schema: 'public', table: 'acc_details' },
(payload) => {
if("id" in payload.new){
if(payload.new.id===uuid){
const login = async ()=>{
const pass = await AsyncStorage.getItem("userpass")
const {data,error}= await supabase
.from("acc_details")
.select("email")
.eq("id",uuid)
if(data!=null&&pass!=null){
supabase.auth.signInWithPassword({email:data[0].email,password:pass})
router.replace("/")
}
}
}else{
console.log(payload.new)
}
}
}
)
.subscribe()

},[])
