import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import ThemeSwitch from "../components/theme/switch";
import { LanguageProvider } from "../i18n/context";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <ThemeProvider attribute="class">
        <NextNProgress
          options={{ showSpinner: false }}
          color="#a21caf"
          height={2}
        />
        <Toaster />
        <ThemeSwitch />
        <Component {...pageProps} />
      </ThemeProvider>
    </LanguageProvider>
  );
}
