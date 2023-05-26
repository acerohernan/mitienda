import { Language } from "./config/languages";
import translations from "./config/translations.json";

export interface ContextData {
  [key: string]: string | number;
}

export type TranslationKey =
  | keyof typeof translations
  | (string & Record<never, never>);

export type TranslateFunction = (
  key: TranslationKey,
  data?: ContextData
) => string;

export interface ProviderState {
  isFetching: boolean;
  currentLanguage: Language;
}

export interface ContextApi extends ProviderState {
  setLanguage: (language: Language) => void;
  t: TranslateFunction;
}
