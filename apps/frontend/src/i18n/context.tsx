import React, { useCallback } from "react";
import { EN, Language, languages } from "./config/languages";
import translations from "./config/translations.json";
import { fetchLocale, getLocaleFromLocalStorage, LS_KEY } from "./helpers";
import { useLastUpdated } from "./useLastUpdated";

interface ContextData {
  [key: string]: string | number;
}

type TranslationKey =
  | keyof typeof translations
  | (string & Record<never, never>);

type TranslateFunction = (key: TranslationKey, data?: ContextData) => string;

interface ProviderState {
  isFetching: boolean;
  currentLanguage: Language;
}

interface ContextApi extends ProviderState {
  setLanguage: (language: Language) => void;
  t: TranslateFunction;
}

const initialState: ProviderState = {
  isFetching: true,
  currentLanguage: EN,
};

//Export the translations directly
const languageMap = new Map<Language["locale"], Record<string, string>>();
languageMap.set(EN.locale, {});

export const LanguageContext = React.createContext<ContextApi | undefined>(
  undefined
);

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { lastUpdated, setLastUpdated: refresh } = useLastUpdated();
  const [state, setState] = React.useState<ProviderState>(() => {
    const codeFromStorage = getLocaleFromLocalStorage();

    return { ...initialState, currentLanguage: languages[codeFromStorage] };
  });

  const { currentLanguage } = state;

  React.useEffect(() => {
    fetchInitialLocales();
  }, []);

  const fetchInitialLocales = async () => {
    const codeFromStorage = localStorage?.getItem(LS_KEY) || EN.locale;

    if (codeFromStorage !== EN.locale) {
      const currentLocale = await fetchLocale(codeFromStorage);

      if (!currentLocale) return;

      languageMap.set(codeFromStorage, currentLocale);
      refresh();
    }

    setState((prev) => ({
      ...prev,
      isFetching: false,
    }));
  };

  const setLanguage = React.useCallback(async (language: Language) => {
    if (languageMap.has(language.locale)) {
      localStorage?.setItem(LS_KEY, language.locale);
      setState((prev) => ({
        ...prev,
        isFetching: false,
        currentLanguage: language,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isFetching: true,
    }));

    const locale = await fetchLocale(language.locale);

    if (!locale) {
      setState((prev) => ({
        ...prev,
        isFetching: false,
      }));
    }

    languageMap.set(language.locale, locale);
    localStorage?.setItem(LS_KEY, language.locale);
    setState((prev) => ({
      ...prev,
      isFetching: false,
      currentLanguage: language,
    }));
  }, []);

  const translate: TranslateFunction = useCallback(
    (key, data) => {
      const translationsSet = languageMap.get(currentLanguage.locale) ?? {};
      const translatedText = translationsSet?.[key] || key;

      return translatedText;
    },
    [currentLanguage, lastUpdated]
  );

  return (
    <LanguageContext.Provider value={{ ...state, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export {};
