'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useLanguage } from './LanguageContext';

const CATEGORIES = [
  'İçerik Üretimi', 'Video & Reels', 'Görsel/Tasarım', 'Araştırma & Analiz',
  'Kod & Geliştirme', 'Veri & Dashboard', 'Pazarlama & Growth', 
  'Otomasyon & Agent', 'Ses & Müzik', 'Sunum & Doküman'
];

const INTENTS = [
  'Para Kazan', 'Viral İçerik', 'Zamandan Kazan', 
  'Otomatikleştir', 'Skill Up / Öğren', 'Growth Hack'
];

const PERSONAS = [
  'Developer', 'Designer', 'Content Creator', 
  'Founder / Girişimci', 'Marketer', 'Öğrenci'
];

const SearchBarInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const activeCategory = searchParams.get('category') || 'İçerik Üretimi';
  const activeIntents = searchParams.get('intent')?.split(',').filter(Boolean) || [];
  const activePersonas = searchParams.get('persona')?.split(',').filter(Boolean) || [];

  const toggleArrayParam = (current: string[], value: string) => {
    if (current.includes(value)) return current.filter(v => v !== value);
    return [...current, value];
  };

  const syncTagPush = (key: 'category' | 'intent' | 'persona', value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // reset pagination on filter change
    
    if (key === 'category') {
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
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => syncTagPush('category', cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    isActive 
                      ? 'bg-primary text-on-primary border-primary shadow-md scale-105' 
                      : 'bg-surface hover:bg-surface-container border-outline-variant text-on-surface hover:text-primary'
                  }`}
                >
                  {t(cat)}
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
                const isActive = activeIntents.includes(intent);
                return (
                  <button
                    key={intent}
                    onClick={() => syncTagPush('intent', toggleArrayParam(activeIntents, intent))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      isActive 
                        ? 'bg-secondary/10 border-secondary text-secondary' 
                        : 'bg-transparent border-outline-variant text-on-surface-variant hover:border-secondary/50'
                    }`}
                  >
                    {intent}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">{t('search_persona')}</span>
            <div className="flex flex-wrap gap-2">
              {PERSONAS.map((persona) => {
                const isActive = activePersonas.includes(persona);
                return (
                  <button
                    key={persona}
                    onClick={() => syncTagPush('persona', toggleArrayParam(activePersonas, persona))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      isActive 
                        ? 'bg-tertiary/10 border-tertiary text-tertiary' 
                        : 'bg-transparent border-outline-variant text-on-surface-variant hover:border-tertiary/50'
                    }`}
                  >
                    {persona}
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
