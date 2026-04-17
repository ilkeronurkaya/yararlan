'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useLanguage } from './LanguageContext';

export const CATEGORIES = [
  { id: 1, slug: 'icerik-uretimi', tr: 'İçerik Üretimi', en: 'Content Creation', es: 'Creación de Contenido', zh: '内容创作' },
  { id: 2, slug: 'video-reels', tr: 'Video & Reels', en: 'Video & Reels', es: 'Video y Reels', zh: '视频和短卷' },
  { id: 3, slug: 'gorsel-tasarim', tr: 'Görsel Tasarım', en: 'Visual/Design', es: 'Visual/Diseño', zh: '视觉/设计' },
  { id: 4, slug: 'arastirma-analiz', tr: 'Araştırma', en: 'Research & Analysis', es: 'Investigación y Analítica', zh: '研究与分析' },
  { id: 5, slug: 'kodlama', tr: 'Kodlama', en: 'Code & Development', es: 'Código y Desarrollo', zh: '代码与开发' },
  { id: 6, slug: 'veri-dashboard', tr: 'Veri & Dashboard', en: 'Data & Dashboard', es: 'Datos y Tablero', zh: '数据与仪表盘' },
  { id: 7, slug: 'pazarlama', tr: 'Pazarlama', en: 'Marketing & Growth', es: 'Marketing y Crecimiento', zh: '营销与增长' },
  { id: 8, slug: 'otomasyon', tr: 'Otomasyon', en: 'Automation & Agent', es: 'Automatización y Agente', zh: '自动化与代理' },
  { id: 9, slug: 'ses-muzik', tr: 'Ses & Müzik', en: 'Audio & Music', es: 'Audio y Música', zh: '音频与音乐' },
  { id: 10, slug: 'sunum', tr: 'Sunum', en: 'Presentation & Document', es: 'Presentación y Documento', zh: '演示与文档' },
  { id: 11, slug: 'freelancer', tr: 'Freelancer', en: 'Freelancer', es: 'Freelancer', zh: '自由职业者' },
  { id: 12, slug: 'e-ticaret', tr: 'E-ticaret', en: 'E-commerce', es: 'Comercio Electrónico', zh: '电子商务' },
  { id: 13, slug: 'ogrenci', tr: 'Öğrenci', en: 'Student', es: 'Estudiante', zh: '学生' },
  { id: 14, slug: 'para-kazanma', tr: 'Para Kazanma', en: 'Make Money', es: 'Hacer Dinero', zh: '赚钱' }
];

export const INTENTS = [
  { id: 1, slug: 'para-kazan', tr: 'Para Kazan', en: 'Make Money', es: 'Ganar Dinero', zh: '赚钱' },
  { id: 2, slug: 'viral-icerik', tr: 'Viral İçerik', en: 'Viral Content', es: 'Contenido Viral', zh: '病毒式内容' },
  { id: 3, slug: 'zamandan-kazan', tr: 'Zamandan Kazan', en: 'Save Time', es: 'Ahorrar Tiempo', zh: '省时间' },
  { id: 4, slug: 'otomatiklestir', tr: 'Otomatikleştir', en: 'Automate', es: 'Automatizar', zh: '自动化' },
  { id: 5, slug: 'skill-up', tr: 'Skill Up / Öğren', en: 'Skill Up / Learn', es: 'Aprender / Mejorar', zh: '学习/进步' },
  { id: 6, slug: 'growth-hack', tr: 'Growth Hack', en: 'Growth Hack', es: 'Growth Hack', zh: '增长黑客' }
];

export const PERSONAS = [
  { id: 1, slug: 'developer', tr: 'Developer', en: 'Developer', es: 'Desarrollador', zh: '开发人员' },
  { id: 2, slug: 'designer', tr: 'Designer', en: 'Designer', es: 'Diseñador', zh: '设计师' },
  { id: 3, slug: 'content-creator', tr: 'Content Creator', en: 'Content Creator', es: 'Creador de Contenido', zh: '内容创作者' },
  { id: 4, slug: 'founder', tr: 'Founder', en: 'Founder / Entrepreneur', es: 'Fundador / Emprendedor', zh: '创始人/企业家' },
  { id: 5, slug: 'marketer', tr: 'Marketer', en: 'Marketer', es: 'Comercializador', zh: '营销人员' },
  { id: 6, slug: 'ogrenci', tr: 'Öğrenci', en: 'Student', es: 'Estudiante', zh: '学生' }
];

const SMART_SUGGESTIONS = [
  "Instagram büyütmek",
  "Shopify satış artırmak",
  "Öğrenci için ücretsiz AI",
  "Video oluşturmak",
  "Kod yazdırmak"
];

const SearchBarInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const activeCategoryId = searchParams.get('category_id') || '1';
  const activeIntentIds = searchParams.get('intent_id')?.split(',').filter(Boolean) || [];
  const activePersonaIds = searchParams.get('persona_id')?.split(',').filter(Boolean) || [];

  const toggleArrayParam = (current: string[], value: string) => {
    if (current.includes(value)) return current.filter(v => v !== value);
    return [...current, value];
  };

  const syncTagPush = (key: 'category_id' | 'intent_id' | 'persona_id', value: string | string[]) => {
    // Telemetry: GA4 Category Click
    if (typeof window !== 'undefined' && 'gtag' in window && key === 'category_id') {
      // @ts-ignore
      window.gtag('event', 'category_selected', {
        category_id: value
      });
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); 
    
    if (key === 'category_id') {
      params.set(key, value as string);
    } else {
      const arr = value as string[];
      if (arr.length > 0) params.set(key, arr.join(','));
      else params.delete(key);
    }
    
    router.push(`/?${params.toString()}#results`);
  };

  const executeSearch = (searchQuery: string) => {
    // Telemetry: GA4 Search
    if (typeof window !== 'undefined' && 'gtag' in window && searchQuery) {
      // @ts-ignore
      window.gtag('event', 'search_executed', {
        search_term: searchQuery
      });
    }

    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    router.push(`/?${params.toString()}#results`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const getLocalized = (obj: any) => obj[language] || obj.tr;

  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <form onSubmit={handleSearch} className="w-full relative group z-10">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-outline">
          <span className="material-symbols-outlined">search</span>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-16 pr-6 py-6 bg-white/70 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-xl text-on-surface placeholder:text-outline-variant focus:ring-1 focus:ring-primary focus:outline-none shadow-sm group-hover:shadow-md transition-all duration-300"
          placeholder={t('search_placeholder')}
        />
        <div className="absolute right-3 inset-y-3">
          <button
            type="submit"
            className="h-full px-8 bg-primary text-on-primary rounded-full font-semibold hover:bg-primary-dim transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>{t('search_button')}</span>
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
          </button>
        </div>
      </form>

      {/* Smart Suggestions */}
      {!query && (
         <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-sm text-outline-variant">
           <span className="flex items-center gap-1 font-medium"><span className="material-symbols-outlined text-[16px]">lightbulb</span> Örneğin:</span>
           {SMART_SUGGESTIONS.map((suggestion, i) => (
             <button 
               key={i} 
               onClick={() => { setQuery(suggestion); executeSearch(suggestion); }}
               className="hover:text-primary transition-colors hover:underline underline-offset-4"
             >
               {suggestion}
               {i < SMART_SUGGESTIONS.length - 1 && <span className="no-underline ml-2 opacity-50">·</span>}
             </button>
           ))}
         </div>
      )}

      <div className="w-full mt-8 bg-white/30 dark:bg-black/20 backdrop-blur-sm p-6 rounded-3xl border border-white/20 flex flex-col gap-6 shadow-sm">
        
        {/* Tier 1: Primary Categories */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategoryId === cat.id.toString();
              return (
                <button
                  key={cat.id}
                  onClick={() => syncTagPush('category_id', cat.id.toString())}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    isActive 
                      ? 'bg-primary text-on-primary border-primary shadow-md scale-105' 
                      : 'bg-white/50 dark:bg-surface-container/50 hover:bg-white dark:hover:bg-surface-container border-outline-variant/30 text-on-surface hover:text-primary'
                  }`}
                >
                  {getLocalized(cat)}
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

const SearchBar = () => {
    return (
        <Suspense fallback={<div className="w-full max-w-2xl h-20 bg-surface-container-lowest rounded-full animate-pulse flex items-center px-16">Yükleniyor...</div>}>
            <SearchBarInner />
        </Suspense>
    );
};

export default SearchBar;
