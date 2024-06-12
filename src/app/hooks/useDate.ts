import { useEffect, useState } from "react";
import { getDictionary } from "../utils/resource/locales";
import { Resource } from "../utils/resource/resourse";
import useTrans from "./useTrans";
import { Sprintf } from "../utils/string/string";
import { usePathname } from "next/navigation";

export function useDate() {
  const [today, setDate] = useState(new Date());
  const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = 30 * DAY;
const YEAR = MONTH * 12;
  const timeSince = (date: Date) => {
    const locale = useTrans().currentLanguage();
    const dictionaries = getDictionary(locale);
    const {today} = useDate()
    var miliseconds = today.getTime() - date.getTime();
    let time = miliseconds / YEAR;
    if (time >= 1) {
      return Sprintf(dictionaries.diff_time_year, time.toFixed());
    }
  
    time = miliseconds / WEEK;
    if (time >= 1) {
      return Sprintf(dictionaries.diff_time_week, time.toFixed());
    }
    time = miliseconds / DAY;
    if (time >= 1) {
      return Sprintf(dictionaries.diff_time_day, time.toFixed());
    }
    time = miliseconds / HOUR;
    if (time >= 1) {
      return Sprintf(dictionaries.diff_time_hour, time.toFixed());
    }
    time = miliseconds / MINUTE;
    if (time >= 1) {
      return Sprintf(dictionaries.diff_time_minute, time.toFixed());
    }
    return dictionaries.diff_time_now;
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  // const day = today.toLocaleDateString(locale, { weekday: "long" });
  return { today, timeSince };
  
}