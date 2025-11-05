import { eachDayOfInterval, format } from "date-fns";
export default function getWeekDates(start: any, end: any) {
  const weekDates = eachDayOfInterval({ start: start, end: end }).map((date) =>
    format(date, "EEE MMM dd yyyy HH:mm:ss"),
  );
  return weekDates;
}
