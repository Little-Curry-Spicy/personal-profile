import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { getCatalog, type Locale, type SiteCatalog } from '@/i18n/catalog';
import { translations } from '@/i18n/translations';

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  catalog: SiteCatalog;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = 'portfolio-locale';

export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'zh';
  const s = localStorage.getItem(STORAGE_KEY);
  return s === 'en' ? 'en' : 'zh';
}

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split('.');
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as object)) {
      cur = (cur as Record<string, unknown>)[p];
    } else return undefined;
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getStoredLocale());

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
  }, [locale]);

  const catalog = useMemo(() => getCatalog(locale), [locale]);

  const t = useCallback(
    (key: string) => {
      const table = translations[locale] as Record<string, unknown>;
      return getNested(table, key) ?? getNested(translations.zh as Record<string, unknown>, key) ?? key;
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, catalog }),
    [locale, setLocale, t, catalog]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
