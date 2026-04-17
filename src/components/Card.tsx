'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';

interface CategoryObj {
  id: number;
  slug: string;
  name_tr: string;
  name_en: string;
  name_es: string;
  name_zh?: string;
}

interface IntentObj {
  id: number;
  slug: string;
  name_tr: string;
  name_en: string;
}

interface PersonaObj {
  id: number;
  slug: string;
  name_tr: string;
  name_en: string;
}

interface CardProps {
  id: number;
  slug: string;
  name: string;
  url: string;
  logo_url?: string;
  short_description: string;
  category?: CategoryObj;
  click_count: number;
  purpose?: string;
  intents?: IntentObj[];
  personas?: PersonaObj[];
  pricing_type?: string;
  rating_score?: number;
  turkish_support?: number;
  monthly_visits?: number;
}

const Card: React.FC<CardProps> = ({
  id,
  slug,
  name,
  url,
  logo_url,
  short_description,
  category,
  click_count,
  purpose,
  intents,
  personas,
  pricing_type = 'Free',
  rating_score = 0.0,
  turkish_support = 0,
  monthly_visits = 0,
}) => {
  const { t, language } = useLanguage();

  const getTranslatedName = (obj: any) => {
    if (!obj) return '';
    return obj[`name_${language}`] || obj.name_tr;
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Telemetry: GA4
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'click_tool_card', {
        tool_id: id,
        tool_name: name,
        primary_category: getTranslatedName(category),
        destination_domain: url
      });
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yararlan-api.ilkeronurkaya.workers.dev';
      fetch(`${API_URL}/api/click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
    } catch (error) {
      console.error('Failed to register click:', error);
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg p-6 rounded-2xl group hover:-translate-y-1 hover:shadow-xl hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white dark:bg-surface-container rounded-xl flex items-center justify-center shadow-sm overflow-hidden border border-outline-variant/30">
            {logo_url ? (
              <img src={logo_url} alt={name} className="w-9 h-9 object-contain" />
            ) : (
              <span className="material-symbols-outlined text-primary text-2xl">auto_fix</span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors text-on-surface">
              {name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold px-2 py-0.5 bg-primary-container text-on-primary-container rounded uppercase tracking-wide">
                {pricing_type}
              </span>
              {turkish_support === 1 && (
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 rounded flex items-center gap-1 font-medium" title="Türkçe Destekli">
                  <span className="material-symbols-outlined text-[12px]">g_translate</span>
                  TR
                </span>
              )}
            </div>
          </div>
        </div>
        
        {rating_score > 0 && (
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-surface ring-1 ring-outline/20 px-2.5 py-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[14px] text-yellow-500 fill-current">star</span>
              <span className="text-sm font-bold text-on-surface">{rating_score.toFixed(1)}</span>
            </div>
          </div>
        )}
      </div>
      
      <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">
        {short_description}
      </p>
      
      {/* Category & Top Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {category && (
          <span className="text-[11px] font-bold tracking-widest px-2 py-1 bg-surface-container rounded text-outline uppercase border border-outline-variant/30">
            {getTranslatedName(category)}
          </span>
        )}
        {intents && intents.length > 0 && (
          <span className="text-[11px] font-bold tracking-widest px-2 py-1 bg-surface-container-high rounded text-on-surface-variant flex items-center uppercase">
            {getTranslatedName(intents[0])}
          </span>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-outline-variant/20 mt-auto">
        <button 
           onClick={(e) => { e.stopPropagation(); handleClick(e); }}
           className="text-sm font-semibold px-5 py-2 bg-primary text-on-primary rounded-full hover:bg-opacity-90 transition-all shadow-sm flex items-center gap-1"
        >
          {t('official_site')} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
        
        <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
          <button 
             onClick={(e) => { e.stopPropagation(); }}
             className="text-outline hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-primary/10"
             title="Compare"
          >
            <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
          </button>
          <button 
             onClick={(e) => { e.stopPropagation(); }}
             className="text-outline hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-primary/10"
             title="Save"
          >
            <span className="material-symbols-outlined text-[20px]">bookmark_add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
