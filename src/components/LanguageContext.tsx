'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type SupportedLang = 'tr' | 'en' | 'es' | 'zh';

export const LANGUAGES: { code: SupportedLang; name: string; flag: string }[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

const translations: Record<SupportedLang, Record<string, string>> = {
  tr: {
    'purpose': 'Amaç',
    'total_clicks': 'Toplam Ziyaret',
    'free_plan': 'Ücretsiz Plan',
    'official_site': 'Resmi Site',
    'search_placeholder': 'Ne yapmak istiyorsun? (AI ile...)',
    'search_button': 'Bul',
    'directory': 'DİZİN',
    'category_title': 'Tüm Araçlar',
    'featured_title': 'Haftanın Seçkisi',
    'empty_category': 'Bu Filtrelerde Araç Bulunamadı',
    'empty_category_desc': 'Aradığınız kategoride şimdilik bir yapay zeka aracı dizinimize eklenmemiş. Tavsiye eden siz olabilirsiniz.',
    'suggest_cta': 'Araç Öner',
    'intent_badge': 'Neden Önerdik',
  },
  en: {
    'purpose': 'Purpose',
    'total_clicks': 'Total Clicks',
    'free_plan': 'Free Plan',
    'official_site': 'Official Site',
    'search_placeholder': 'What do you want to build? (With AI...)',
    'search_button': 'Find',
    'directory': 'DIRECTORY',
    'category_title': 'All Tools',
    'featured_title': 'Featured of the Week',
    'empty_category': 'No Tools in this Filter',
    'empty_category_desc': 'There are no AI tools indexed here yet. Be the first to suggest one below.',
    'suggest_cta': 'Suggest Tool',
    'intent_badge': 'Why we Curated',
  },
  es: {
    'purpose': 'Propósito',
    'total_clicks': 'Clics Totales',
    'free_plan': 'Plan Gratuito',
    'official_site': 'Sitio Oficial',
    'search_placeholder': '¿Qué quieres hacer? (Con IA...)',
    'search_button': 'Buscar',
    'directory': 'DIRECTORIO',
    'category_title': 'Todas las herramientas',
    'featured_title': 'Destacados',
    'empty_category': 'Sin Resultados',
    'empty_category_desc': 'Aún no hay herramientas listadas aquí. Sé el primero en sugerir una abajo.',
    'suggest_cta': 'Sugerir',
    'intent_badge': 'Por qué lo recomendamos',
  },
  zh: {
    'purpose': '目的',
    'total_clicks': '总点击量',
    'free_plan': '免费计划',
    'official_site': '官方网站',
    'search_placeholder': '你想做什么？（用人工智能...）',
    'search_button': '找',
    'directory': '目录',
    'category_title': '所有工具',
    'featured_title': '每周精选',
    'empty_category': '此过滤器中没有工具',
    'empty_category_desc': '这里还没有索引的人工智能工具。成为第一个在下面提出建议的人。',
    'suggest_cta': '建议工具',
    'intent_badge': '为什么我们策划',
  }
};

interface LanguageContextProps {
  language: SupportedLang;
  setLanguage: (lang: SupportedLang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<SupportedLang>('tr');

  useEffect(() => {
    const saved = localStorage.getItem('yararlan_lang') as SupportedLang;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: SupportedLang) => {
    setLanguageState(lang);
    localStorage.setItem('yararlan_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
