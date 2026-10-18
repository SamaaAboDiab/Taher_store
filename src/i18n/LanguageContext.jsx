import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { localize } from "../data/products.en";

const STORAGE_KEY = "thour-lang";
const LanguageContext = createContext(null);

function readStoredLang() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ar";
  } catch {
    return "ar";
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    document.title =
      lang === "ar" ? "T Hour | تي هور — ساعات وإكسسوارات" : "T Hour | Luxury Watches & Accessories";
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // التخزين غير متاح — اللغة تفضل شغالة للجلسة الحالية بس
    }
  }, [lang]);

  const toggleLang = useCallback(() => setLang((l) => (l === "ar" ? "en" : "ar")), []);

  const value = useMemo(
    () => ({
      lang,
      isAr: lang === "ar",
      toggleLang,
      // tr("نص عربي", "English text")
      tr: (ar, en) => (lang === "en" ? en : ar),
      // ترجمة بيانات منتج / إكسسوار / سلايد حسب اللغة الحالية
      loc: (item, kind) => localize(item, lang, kind),
      currency: lang === "en" ? "EGP" : "ج.م",
    }),
    [lang, toggleLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
