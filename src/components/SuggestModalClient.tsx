'use client';
import { useState } from 'react';
import SuggestModal from './SuggestModal';
import { useLanguage } from './LanguageContext';

export default function SuggestModalClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <section className="py-32 bg-surface flex flex-col items-center">
        <div className="max-w-xl text-center">
          <h3 className="text-2xl font-bold mb-4">{t('suggest_title')}</h3>
          <p className="text-on-surface-variant mb-8">{t('suggest_desc')}</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-12 py-4 border border-outline-variant text-on-surface font-semibold hover:bg-surface-container-low transition-colors duration-300 rounded-xl"
          >
            {t('suggest_cta')}
          </button>
        </div>
      </section>

      <SuggestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
