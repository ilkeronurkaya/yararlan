'use client';
import React from 'react';
import Card from './Card';
import { useLanguage } from './LanguageContext';

interface Tool {
  id: number;
  slug: string;
  name: string;
  url: string;
  logo_url?: string;
  short_description: string;
  category?: any;
  click_count: number;
  purpose?: string;
  intents?: any[];
  personas?: any[];
}

interface CardGridProps {
  tools: Tool[];
}

const CardGrid: React.FC<CardGridProps> = ({ tools }) => {
  const { t } = useLanguage();

  if (!tools || tools.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-8 text-center bg-surface-container-lowest border border-outline-variant/30 rounded-3xl animate-in fade-in">
        <span className="material-symbols-outlined text-5xl mb-4 text-outline/50">search_off</span>
        <h3 className="text-2xl font-bold mb-3 text-on-surface">{t('empty_category')}</h3>
        <p className="text-on-surface-variant text-base max-w-md mx-auto">
          {t('empty_category_desc')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tools.map((tool) => (
        <Card key={tool.id} {...tool} />
      ))}
    </div>
  );
};

export default CardGrid;
