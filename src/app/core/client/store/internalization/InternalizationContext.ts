import { Locale, LocaleConfig } from "@/src/app/utils/resource/locales";
import { createContext } from "react";

/**
 * state interface for internalization context
 */
export interface InternalizationState {
    localeConfig: LocaleConfig;
    currentLocale: Locale;
  }
  
  export interface InternalizationContext {
    internalization: InternalizationState;
    changeLanguage: (locale: Locale) => void;
    localize: (key: string, ...val: string[]) => string;
  }
  
  export const InternalizationContext = createContext<
    InternalizationContext | undefined
  >(undefined);