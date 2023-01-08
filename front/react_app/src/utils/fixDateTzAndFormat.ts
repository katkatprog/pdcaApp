import { format, utcToZonedTime } from "date-fns-tz";

export const fixDateTzAndFormat = (date: Date) => {
  return format(utcToZonedTime(date, "Asia/Tokyo"), "yyyy/MM/dd");
};
