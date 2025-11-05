import {
  startOfWeek,
  endOfWeek,
  setISOWeek,
  setYear,
  format,
  getWeek,
} from "date-fns";
export default function getWeekRange(
  week: number,
  year: number,
  inDate?: false,
) {
  let dateOfYear = setYear(new Date(), year);
  let dateOfWeek = setISOWeek(dateOfYear, week);
  let date1 = startOfWeek(dateOfWeek, { weekStartsOn: 1 });
  let date2 = endOfWeek(dateOfWeek, { weekStartsOn: 1 });
  const monday = format(date1, "PPP");
  const friday = format(date2, "PPP");
  return [monday, friday];
}
