import Toast from "react-native-toast-message";
import { collection, addDoc, doc, serverTimestamp } from "firebase/firestore";
import { Alert } from "react-native";
export default async function submitErrorLog(
  message: string,
  type: string,
  uid: string,
  notify?: boolean,
) {}
