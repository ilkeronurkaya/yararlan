'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage, LANGUAGES, SupportedLang } from './LanguageContext';

const Header = () => {
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  
  const selectedLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full top-0 sticky bg-[#f8f9fa]/80 dark:bg-slate-900/80 backdrop-blur-xl z-50">
      <nav className="flex justify-between items-center w-full px-8 py-6 max-w-[1440px] mx-auto font-['Inter'] antialiased tracking-tight">
        <Link href="/" className="text-xl font-bold tracking-tighter text-[#2b3437] dark:text-slate-100 cursor-pointer transition-opacity active:opacity-70">
          Yararlan
        </Link>
        
        <div className="flex items-center gap-6 relative" ref={dropdownRef}>
          <button 
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#2b3437] dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <span className="text-lg leading-none">{selectedLang.flag}</span>
            <span>{selectedLang.name}</span>
            <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}>expand_more</span>
          </button>
          
          {langOpen && (
            <div className="absolute top-12 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl py-2 w-40 animate-in fade-in slide-in-from-top-2 origin-top-right">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as SupportedLang);
                    setLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/50 ${selectedLang.code === lang.code ? 'text-primary dark:text-white bg-slate-50 dark:bg-slate-700/30' : 'text-slate-700 dark:text-slate-300'}`}
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
