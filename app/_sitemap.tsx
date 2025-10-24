import { useRouter } from "expo-router";
export default function Page(){
    const router = useRouter()
    router.replace("/")
    return null;
}
