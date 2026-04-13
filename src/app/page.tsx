import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CardGrid from '@/components/CardGrid';
import Footer from '@/components/Footer';
import SuggestModalClient from '@/components/SuggestModalClient';
import LocalizedString from '@/components/LocalizedString';
import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';

async function getRecommendedTools(apiUrl: string) {
  try {
    const res = await fetch(`${apiUrl}/api/recommended`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`API Warning [Recommended]: Returned status ${res.status}`);
      return [];
    }
    const json = await res.json();
    if (!json || !json.data) {
      console.error('API Warning [Recommended]: No data payload found');
      return [];
    }
    return json.data.slice(0, 3);
  } catch (error) {
    return [];
  }
}

async function getAllTools(apiUrl: string, query?: string, category_id?: string, page?: number, intent_id?: string, persona_id?: string) {
  try {
    const url = new URL(`${apiUrl}/api/websites`);
    if (query) url.searchParams.set('q', query);
    if (category_id) url.searchParams.set('category_id', category_id);
    if (intent_id) url.searchParams.set('intent_id', intent_id);
    if (persona_id) url.searchParams.set('persona_id', persona_id);
    if (page) url.searchParams.set('page', page.toString());
    
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) {
      console.error(`API Warning [All]: Returned status ${res.status}`);
      return [];
    }
    const json = await res.json();
    if (!json || !json.data) {
      return [];
    }
    return json.data || [];
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category_id?: string }> }): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const category_id = resolvedParams?.category_id;

  if (category_id) {
    return {
      title: `Category ${category_id} AI Araçları | Yararlan Kategorisi`,
      description: `Yararlan dizinindeki kürate edilmiş yapay zeka araçlarını listeledik. İhtiyacınıza uygun olanı keşfedin.`,
      alternates: {
        canonical: `https://yararlan.com/?category_id=${encodeURIComponent(category_id)}&page=1`,
      }
    };
  }

  return { alternates: { canonical: 'https://yararlan.com' } };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category_id?: string; page?: string; intent_id?: string; persona_id?: string }> | any;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams?.q;
  const category_id = resolvedParams?.category_id;
  const intent_id = resolvedParams?.intent_id;
  const persona_id = resolvedParams?.persona_id;
  const page = parseInt(resolvedParams?.page || '1', 10);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yararlan-api.ilkeronurkaya.workers.dev';

  const recommendedTools = await getRecommendedTools(API_URL);
  const allTools = await getAllTools(API_URL, q, category_id, page, intent_id, persona_id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': allTools.map((tool: any, index: number) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `https://yararlan.com/?category_id=${encodeURIComponent(tool.category?.id || '')}`
    }))
  };

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
      <Script
        id="schema-item-list"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      
      <main className="flex-grow">
        <section className="max-w-[1440px] mx-auto px-8 pt-24 pb-32 flex flex-col items-center text-center">
          <h1 className="text-[3.5rem] font-extrabold tracking-[-0.02em] text-on-surface mb-6 leading-tight">
            <LocalizedString id="hero_title_1" /><span className="text-primary"><LocalizedString id="hero_title_2" /></span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl text-lg mb-12 leading-relaxed">
            <LocalizedString id="hero_subtitle" />
          </p>
          
          <SearchBar />
        </section>

        {!q && recommendedTools && recommendedTools.length > 0 && (
          <section className="bg-surface-container-low py-24">
            <div className="max-w-[1440px] mx-auto px-8">
              <div className="flex justify-between items-end mb-16">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary mb-3 block"><LocalizedString id="recommended_title" /></span>
                  <h2 className="text-[2rem] font-bold tracking-tight text-on-surface"><LocalizedString id="recommended_title" /></h2>
                </div>
                <button className="text-primary font-medium hover:underline underline-offset-8 transition-all">Tümünü İncele →</button>
              </div>
              
              <CardGrid tools={recommendedTools as any} />
            </div>
          </section>
        )}

        <section id="results" className="py-24 max-w-[1440px] mx-auto px-8 relative">
          <div className="mb-16">
             <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary mb-3 block">{category_id ? <>KATEGORİ</> : <LocalizedString id="directory" />}</span>
             <h2 className="text-[2rem] font-bold tracking-tight text-on-surface">
               {q ? `"${q}" için sonuçlar` : (category_id ? "Kategori Sonuçları" : <LocalizedString id="category_title" />)}
             </h2>
          </div>

          <CardGrid tools={allTools as any} />
          
          <div className="flex justify-center items-center mt-16 gap-3">
            <Link 
              href={`/?${new URLSearchParams({ ...(q && {q}), ...(category_id && {category_id}), page: Math.max(1, page - 1).toString() }).toString()}`}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface hover:bg-surface-container-low transition"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </Link>
            <span className="px-4 py-2 font-medium bg-surface-container-low rounded-xl">
              <LocalizedString id="pagination_page" /> {page}
            </span>
            <Link 
              href={`/?${new URLSearchParams({ ...(q && {q}), ...(category_id && {category_id}), page: (page + 1).toString() }).toString()}`}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface hover:bg-surface-container-low transition"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
          </div>
        </section>

        <SuggestModalClient />
      </main>

      <Footer />
    </div>
  );
}
