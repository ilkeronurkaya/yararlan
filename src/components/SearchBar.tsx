'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useLanguage } from './LanguageContext';

export const CATEGORIES = [
  { id: 1, slug: 'icerik-uretimi', tr: 'İçerik Üretimi', en: 'Content Creation', es: 'Creación de Contenido', zh: '内容创作' },
  { id: 2, slug: 'video-reels', tr: 'Video & Reels', en: 'Video & Reels', es: 'Video y Reels', zh: '视频和短卷' },
  { id: 3, slug: 'gorsel-tasarim', tr: 'Görsel/Tasarım', en: 'Visual/Design', es: 'Visual/Diseño', zh: '视觉/设计' },
  { id: 4, slug: 'arastirma-analiz', tr: 'Araştırma & Analiz', en: 'Research & Analysis', es: 'Investigación y Analítica', zh: '研究与分析' },
  { id: 5, slug: 'kod-gelistirme', tr: 'Kod & Geliştirme', en: 'Code & Development', es: 'Código y Desarrollo', zh: '代码与开发' },
  { id: 6, slug: 'veri-dashboard', tr: 'Veri & Dashboard', en: 'Data & Dashboard', es: 'Datos y Tablero', zh: '数据与仪表盘' },
  { id: 7, slug: 'pazarlama-growth', tr: 'Pazarlama & Growth', en: 'Marketing & Growth', es: 'Marketing y Crecimiento', zh: '营销与增长' },
  { id: 8, slug: 'otomasyon-agent', tr: 'Otomasyon & Agent', en: 'Automation & Agent', es: 'Automatización y Agente', zh: '自动化与代理' },
  { id: 9, slug: 'ses-muzik', tr: 'Ses & Müzik', en: 'Audio & Music', es: 'Audio y Música', zh: '音频与音乐' },
  { id: 10, slug: 'sunum-dokuman', tr: 'Sunum & Doküman', en: 'Presentation & Document', es: 'Presentación y Documento', zh: '演示与文档' }
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
  { id: 4, slug: 'founder', tr: 'Founder / Girişimci', en: 'Founder / Entrepreneur', es: 'Fundador / Emprendedor', zh: '创始人/企业家' },
  { id: 5, slug: 'marketer', tr: 'Marketer', en: 'Marketer', es: 'Comercializador', zh: '营销人员' },
  { id: 6, slug: 'ogrenci', tr: 'Öğrenci', en: 'Student', es: 'Estudiante', zh: '学生' }
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
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // reset pagination on filter change
    
    if (key === 'category_id') {
      params.set(key, value as string);
    } else {
      const arr = value as string[];
      if (arr.length > 0) params.set(key, arr.join(','));
      else params.delete(key);
    }
    
    // Explicit fallback for client side push without reloading natively
    router.push(`/?${params.toString()}#results`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    router.push(`/?${params.toString()}#results`);
  };

  // Helper macro for typescript and dynamic localization
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
          className="w-full pl-16 pr-6 py-6 bg-surface-container-lowest border-none rounded-full text-xl text-on-surface placeholder:text-outline-variant focus:ring-0 focus:outline-none shadow-sm group-hover:shadow-md transition-shadow duration-300"
          placeholder={t('search_placeholder')}
        />
        <div className="absolute right-3 inset-y-3">
          <button
            type="submit"
            className="h-full px-8 bg-primary text-on-primary rounded-full font-semibold hover:bg-primary-dim transition-colors flex items-center gap-2"
          >
            <span>{t('search_button')}</span>
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
          </button>
        </div>
      </form>

      <div className="w-full mt-8 bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 flex flex-col gap-6 shadow-sm">
        
        {/* Tier 1: Primary */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategoryId === cat.id.toString();
              return (
                <button
                  key={cat.id}
                  onClick={() => syncTagPush('category_id', cat.id.toString())}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    isActive 
                      ? 'bg-primary text-on-primary border-primary shadow-md scale-105' 
                      : 'bg-surface hover:bg-surface-container border-outline-variant text-on-surface hover:text-primary'
                  }`}
                >
                  {getLocalized(cat)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier 2 & 3: Intents and Personas */}
        <div className="flex flex-col md:flex-row gap-6 pt-6 border-t border-outline-variant/20">
          <div className="flex-1 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">{t('search_intent')}</span>
            <div className="flex flex-wrap gap-2">
              {INTENTS.map((intent) => {
                const isActive = activeIntentIds.includes(intent.id.toString());
                return (
                  <button
                    key={intent.id}
                    onClick={() => syncTagPush('intent_id', toggleArrayParam(activeIntentIds, intent.id.toString()))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      isActive 
                        ? 'bg-secondary/10 border-secondary text-secondary' 
                        : 'bg-transparent border-outline-variant text-on-surface-variant hover:border-secondary/50'
                    }`}
                  >
                    {getLocalized(intent)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">{t('search_persona')}</span>
            <div className="flex flex-wrap gap-2">
              {PERSONAS.map((persona) => {
                const isActive = activePersonaIds.includes(persona.id.toString());
                return (
                  <button
                    key={persona.id}
                    onClick={() => syncTagPush('persona_id', toggleArrayParam(activePersonaIds, persona.id.toString()))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      isActive 
                        ? 'bg-tertiary/10 border-tertiary text-tertiary' 
                        : 'bg-transparent border-outline-variant text-on-surface-variant hover:border-tertiary/50'
                    }`}
                  >
                    {getLocalized(persona)}
                  </button>
                );
              })}
            </div>
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
