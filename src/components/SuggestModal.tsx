'use client';
import { useState } from 'react';

export default function SuggestModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [websiteName, setWebsiteName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website_name: websiteName }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setWebsiteName('');
          onClose();
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2b3437] dark:text-white tracking-tight">Araç Öner</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-white transition">
            <span className="material-symbols-outlined font-light">close</span>
          </button>
        </div>

        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h3 className="font-semibold text-lg text-[#2b3437] dark:text-white">Talebiniz Kaydedildi!</h3>
            <p className="text-slate-500 text-sm mt-2">Aracı inceleyip Haftanın Seçkilerine ekleyeceğiz.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Bildiğiniz harika bir yapay zeka aracı mı var? Bize adını veya web sitesini iletin, kürasyonumuza dahil edelim.
            </p>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="website" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Web Sitesi Adı / URL'si</label>
              <input
                id="website"
                type="text"
                autoFocus
                placeholder="Örn: https://harika-arac.com"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-white transition-all"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-[#2b3437] dark:bg-white text-white dark:text-[#2b3437] font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
              ) : (
                'Ziyareti Kaydet'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
