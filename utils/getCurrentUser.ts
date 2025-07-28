import {useState} from "react"

import supabase from "@/configs/supabase"
export  default async function getCurrentUser(){
    const [user,setUser] = useState<any>(null)
    const {data:{user:curUser},error} = await supabase.auth.getUser()
    setUser(curUser)
    return user
}