import { en } from "./en";
import { vi } from "./vi";

export interface LocaleConfig {
  defaultLocale: Locale;
  locales: string[];
}

const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

export const localeConfig: LocaleConfig = {
  locales: [...locales],
  defaultLocale: "en",
} as const;

const dictionaries = {
  en: en,
  vi: vi,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
