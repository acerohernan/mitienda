import { EN } from "./config/languages";

export const LS_KEY = "language";

export async function fetchLocale(locale: string) {
  const response = await fetch(`/locales/${locale}.json`);

  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

export function getLocaleFromLocalStorage() {
  try {
    const locale = localStorage.getItem(LS_KEY);

    return locale || EN.locale;
  } catch (e) {
    return EN.locale;
  }
}
