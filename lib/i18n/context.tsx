"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

type Lang = "ko" | "en";

const LangContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "ko",
  toggle: () => {}
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("lang");

    if (saved === "ko" || saved === "en") {
      setLang(saved);
    }
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next = prev === "ko" ? "en" : "ko";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
