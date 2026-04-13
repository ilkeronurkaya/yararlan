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
  name_es: string;
  name_zh?: string;
}

interface PersonaObj {
  id: number;
  slug: string;
  name_tr: string;
  name_en: string;
  name_es: string;
  name_zh?: string;
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
  personas
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
        intent_tags: intents?.map(getTranslatedName).join(',') || '',
        persona_tags: personas?.map(getTranslatedName).join(',') || '',
        destination_domain: url
      });
    }

    // 1. Call POST /api/click
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      });
    } catch (error) {
      console.error('Failed to register click:', error);
    }
    
    // 2. Open external URL in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-surface-container-lowest p-8 rounded-xl group hover:translate-y-[-4px] transition-all duration-300 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center">
          {logo_url ? (
            <img src={logo_url} alt={name} className="w-8 h-8 object-contain" />
          ) : (
            <span className="material-symbols-outlined text-primary">auto_fix</span>
          )}
        </div>
        <div className="flex gap-2">
          {category && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
              {getTranslatedName(category)}
            </span>
          )}
          {intents && intents.length > 0 && (
             <span className="text-[10px] font-bold tracking-widest px-2 py-1 bg-surface-container-high rounded text-on-surface-variant flex items-center">
               <span className="material-symbols-outlined text-[12px] mr-1">campaign</span>
               {getTranslatedName(intents[0])}
             </span>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
        {name}
      </h3>
      
      <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
        {short_description}
      </p>
      
      <div className="flex justify-between items-center mb-6">
        <button 
           onClick={(e) => { e.stopPropagation(); handleClick(e); }}
           className="text-xs font-semibold px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors flex items-center gap-1"
        >
          {t('official_site')} <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        </button>
        <button 
           onClick={(e) => { e.stopPropagation(); }}
           className="text-outline hover:text-primary transition-colors flex items-center justify-center p-2"
           title="Save"
        >
          <span className="material-symbols-outlined text-xl">bookmark_add</span>
        </button>
      </div>

      <div className="pt-5 border-t border-outline-variant/15 flex justify-between items-center text-[10px] font-medium text-outline uppercase tracking-wider">
        <span>{t('purpose')}: {purpose || getTranslatedName(category)}</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">mouse</span>
          {t('total_clicks')}: {click_count > 1000 ? `${(click_count / 1000).toFixed(1)}k` : click_count}
        </span>
      </div>
    </div>
  );
};

export default Card;
