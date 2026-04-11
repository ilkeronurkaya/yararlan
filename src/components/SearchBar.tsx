'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchBarInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl relative group">
      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-outline">
        <span className="material-symbols-outlined">search</span>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-16 pr-6 py-6 bg-surface-container-lowest border-none rounded-full text-xl text-on-surface placeholder:text-outline-variant focus:ring-0 focus:outline-none shadow-sm group-hover:shadow-md transition-shadow duration-300"
        placeholder="Ne yapmak istiyorsun? (AI ile...)"
      />
      <div className="absolute right-3 inset-y-3">
        <button
          type="submit"
          className="h-full px-8 bg-primary text-on-primary rounded-full font-semibold hover:bg-primary-dim transition-colors flex items-center gap-2"
        >
          <span>Bul</span>
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
        </button>
      </div>
    </form>
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
