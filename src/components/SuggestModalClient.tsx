'use client';
import { useState } from 'react';
import SuggestModal from './SuggestModal';

export default function SuggestModalClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-32 bg-surface flex flex-col items-center">
        <div className="max-w-xl text-center">
          <h3 className="text-2xl font-bold mb-4">Bir araç mı biliyorsun?</h3>
          <p className="text-on-surface-variant mb-8">Kürasyonumuza katkıda bulunun ve topluluğun büyümesine yardımcı olun.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-12 py-4 border border-outline-variant text-on-surface font-semibold hover:bg-surface-container-low transition-colors duration-300 rounded-xl"
          >
            Araç Öner
          </button>
        </div>
      </section>

      <SuggestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
