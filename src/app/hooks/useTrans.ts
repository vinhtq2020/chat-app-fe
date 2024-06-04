import { useRouter } from "next/router";
import { Locale, localeConfig } from "../utils/resource/locales";
import { usePathname } from "next/navigation";

export default function useTrans() {
  const router = useRouter();
  const pathname = router.pathname;

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
    router.push(redirectedPathname(locale));
  };

  return {
    redirectedPathname,
    currentLanguage,
    changeLanguage,
  };
}
