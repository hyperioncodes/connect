import { getISOWeek } from "date-fns";
export default function getWeek() {
  return getISOWeek(new Date());
}
