import { format } from "date-fns";
export default function getObjectKeyDate(date: Date) {
  return format(date, "EEE MMM dd yyyy HH:mm:ss");
}
