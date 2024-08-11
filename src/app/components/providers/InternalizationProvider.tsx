import { createContext, ReactNode, useState } from "react";
import {
  getDictionary,
  Locale,
  localeConfig,
  LocaleConfig,
} from "../../utils/resource/locales";
import { Sprintf } from "../../utils/string/string";

export interface Props {
  children: ReactNode;
}

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

export const internalizationContext = createContext<
  InternalizationContext | undefined
>(undefined);

export default function InternalizationProvider(props: Props) {
  const [internalization, setInternalization] = useState<InternalizationState>({
    localeConfig: localeConfig,
    currentLocale: localeConfig.defaultLocale,
  });

  const changeLanguage = (locale: Locale) => {
    setInternalization((prev) => ({ ...prev, currentLocale: locale }));
    return null;
  };

  const localize = (key: string, ...val: string[]) => {
    return Sprintf(getDictionary(localeConfig.defaultLocale)[key], ...val);
  };

  return (
    <>
      <internalizationContext.Provider
        value={{
          internalization: internalization,
          changeLanguage: changeLanguage,
          localize: localize,
        }}
      >
        {props.children}
      </internalizationContext.Provider>
    </>
  );
}
