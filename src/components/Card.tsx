'use client';

import React from 'react';

interface CardProps {
  id: number;
  slug: string;
  name: string;
  url: string;
  logo_url?: string;
  short_description: string;
  category: string;
  click_count: number;
  purpose?: string;
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
  purpose
}) => {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
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
        <span className="text-[10px] font-bold uppercase tracking-widest text-outline">
          {category}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
        {name}
      </h3>
      
      <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
        {short_description}
      </p>
      
      <div className="pt-6 border-t border-outline-variant/15 flex justify-between items-center text-[11px] font-medium text-outline uppercase tracking-wider">
        <span>Purpose: {purpose || category}</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">mouse</span>
          Total clicks: {click_count > 1000 ? `${(click_count / 1000).toFixed(1)}k` : click_count}
        </span>
      </div>
    </div>
  );
};

export default Card;
