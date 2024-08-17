import { createContext, ReactNode, useState } from "react";

import { InternalizationContext, InternalizationState } from "./InternalizationContext";
import { Sprintf } from "@/src/app/utils/string";
import { getDictionary, Locale, localeConfig } from "@/src/app/utils/resource/locales";

export interface Props {
  children: ReactNode;
}


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
      <InternalizationContext.Provider
        value={{
          internalization: internalization,
          changeLanguage: changeLanguage,
          localize: localize,
        }}
      >
        {props.children}
      </InternalizationContext.Provider>
    </>
  );
}
