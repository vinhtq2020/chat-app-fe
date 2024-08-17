"use client"
import { getDictionary, Locale, localeConfig } from "../utils/resource/locales";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Sprintf } from "../utils/string";

export default function useTrans() {
  const pathname = usePathname();

  const currentLanguage = (): Locale => {
    const segments = pathname.split("/");

    if (segments.length <= 1) {
      return localeConfig.defaultLocale;
    }
    if (!localeConfig.locales.includes(segments[1].substring(0, 2))) {
      return localeConfig.defaultLocale;
    }
    return segments[1] as Locale;
  };

  const redirectedPathname = (locale: Locale) => {
    const segments = pathname.split("/");
    if (segments.length <= 1) {
      return "/" + localeConfig.defaultLocale;
    } else if (!localeConfig.locales.includes(segments[1].substring(0, 2))) {
      segments[1] = localeConfig.defaultLocale;
    } else {
      segments[1] = locale;
    }

    return segments.join("/");
  };

  const changeLanguage = (locale: Locale) => {
    redirect(redirectedPathname(locale));
  };

  const localized = (key: string, ...value: string[]) =>  {
    const locale = currentLanguage();
    return Sprintf(getDictionary(locale)[key], ...value);
  }

  return {
    redirectedPathname,
    currentLanguage,
    changeLanguage,
    localized
  };
}
