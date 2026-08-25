import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, translations } from '../i18n/translations';
import { Globe } from 'lucide-react';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = 'uniperium_lms_lang_pref';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'en' || saved === 'es') return saved;
      // check browser language
      if (typeof navigator !== 'undefined' && navigator.language?.startsWith('en')) {
        return 'en';
      }
    } catch {
      // fallback
    }
    return 'es';
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

/**
 * Compact, modern bilingual switcher button (ES | EN)
 */
export const LanguageToggle: React.FC<{ variant?: 'header' | 'hero' | 'minimal' }> = ({
  variant = 'header',
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'hero') {
    return (
      <div className="inline-flex items-center p-1 rounded-2xl bg-[#0A0A0A] border border-[#262626] shadow-md">
        <button
          type="button"
          onClick={() => setLanguage('es')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold transition-all cursor-pointer ${
            language === 'es'
              ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Cambiar a Español"
        >
          <span>🇪🇸</span>
          <span>Español</span>
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-[#C5A059] text-black shadow-md shadow-[#C5A059]/20'
              : 'text-neutral-400 hover:text-white'
          }`}
          title="Switch to English"
        >
          <span>🇺🇸</span>
          <span>English</span>
        </button>
      </div>
    );
  }

  return (
    <div
      id="language-selector-toggle"
      className="flex items-center p-0.5 rounded-xl bg-[#0A0A0A] border border-[#262626] hover:border-[#C5A059]/40 transition-colors shadow-xs"
      role="group"
      aria-label="Language selector"
    >
      <div className="pl-2 pr-1 text-neutral-500 hidden sm:flex items-center">
        <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
      </div>
      <button
        type="button"
        id="btn-lang-es"
        onClick={() => setLanguage('es')}
        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-code font-bold transition-all cursor-pointer ${
          language === 'es'
            ? 'bg-[#C5A059] text-black shadow-xs font-black'
            : 'text-neutral-400 hover:text-white hover:bg-[#151515]'
        }`}
        title="Español (Spanish)"
      >
        ES
      </button>
      <button
        type="button"
        id="btn-lang-en"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-code font-bold transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-[#C5A059] text-black shadow-xs font-black'
            : 'text-neutral-400 hover:text-white hover:bg-[#151515]'
        }`}
        title="English (Inglés)"
      >
        EN
      </button>
    </div>
  );
};
