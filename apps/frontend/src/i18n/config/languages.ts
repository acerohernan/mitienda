export interface Language {
  code: string;
  language: string;
  locale: string;
}

export const ES: Language = {
  locale: "es-ES",
  language: "Español",
  code: "es-ES",
};

export const EN: Language = {
  locale: "en-US",
  language: "English",
  code: "en",
};
export const FR: Language = {
  locale: "fr-FR",
  code: "fr",
  language: "Français",
};

export const languages: Record<string, Language> = {
  "en-US": EN,
  "es-ES": ES,
  "fr-FR": FR,
};

export const laguageList = Object.values(languages);
