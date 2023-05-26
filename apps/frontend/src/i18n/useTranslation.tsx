import React from "react";
import { LanguageContext } from "./context";

const useTranslation = () => {
  const languageContext = React.useContext(LanguageContext);

  if (languageContext === undefined) {
    throw new Error("Language context is undefined");
  }

  return languageContext;
};

export default useTranslation;
