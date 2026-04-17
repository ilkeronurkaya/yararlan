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
    if (!res.ok) console.log("Fetch Error:", error); return [];
    const json = await res.json();
    return json?.data?.slice(0, 3) || [];
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

async function getAllTools(apiUrl: string, query?: string, category_id?: string, page?: number, intent_id?: string, persona_id?: string, pricing_type?: string) {
  try {
    const url = new URL(`${apiUrl}/api/websites`);
    if (query) url.searchParams.set('q', query);
    if (pricing_type) url.searchParams.set('pricing_type', pricing_type);
    if (category_id) url.searchParams.set('category_id', category_id);
    if (intent_id) url.searchParams.set('intent_id', intent_id);
    if (persona_id) url.searchParams.set('persona_id', persona_id);
    if (page) url.searchParams.set('page', page.toString());
    
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) {
      console.error("API response not ok", res.status);
      return [];
    }
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category_id?: string }> }): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const category_id = resolvedParams?.category_id;

  if (category_id) {
    return {
      title: `Category ${category_id} AI Araçları | Yararlan`,
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
  searchParams: Promise<{ q?: string; category_id?: string; page?: string; intent_id?: string; persona_id?: string; pricing_type?: string }> | any;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams?.q;
  const category_id = resolvedParams?.category_id;
  const intent_id = resolvedParams?.intent_id;
  const persona_id = resolvedParams?.persona_id;
  const pricing_type = resolvedParams?.pricing_type;
  const page = parseInt(resolvedParams?.page || '1', 10);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yararlan-api.ilkeronurkaya.workers.dev';

  const recommendedTools = await getRecommendedTools(API_URL);
  const allTools = await getAllTools(API_URL, q, category_id, page, intent_id, persona_id, pricing_type);

  // Derived sections based on Master Plan when no search is active
  const isSearchActive = q || category_id || intent_id || persona_id || pricing_type || page > 1;
  const trendingTools = allTools.slice(0, 6);
  const turkishTools = allTools.filter((t: any) => t.turkish_support === 1).slice(0, 3);
  const freeTools = allTools.filter((t: any) => t.pricing_type === 'Free').slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': allTools.map((tool: any, index: number) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'SoftwareApplication',
        'name': tool.name,
        'url': tool.url,
        'description': tool.short_description || 'AI Tool',
        'applicationCategory': tool.category?.name || 'BusinessApplication',
        'operatingSystem': 'Web',
        'offers': {
          '@type': 'Offer',
          'price': tool.pricing_type === 'Free' ? '0' : '0',
          'priceCurrency': 'USD'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': tool.rating_score || 4.5,
          'reviewCount': tool.click_count || 10
        }
      }
    }))
  };

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <Script
        id="schema-item-list"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      
      <main className="flex-grow z-10">
        <section className="max-w-[1440px] mx-auto px-8 pt-20 pb-16 flex flex-col items-center text-center">
          <h1 className="text-[3.5rem] md:text-[4.5rem] font-extrabold tracking-tight text-on-surface mb-6 leading-[1.1]">
            <LocalizedString id="hero_title_1" />
            <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              <LocalizedString id="hero_title_2" />
            </span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl text-lg md:text-xl mb-12 leading-relaxed font-medium">
            <LocalizedString id="hero_subtitle" />
          </p>
          
          <div className="flex gap-4 mb-8">
            <a href="#results" className="px-6 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-opacity-90 transition-all flex items-center gap-2">
              Araç Keşfet <span className="material-symbols-outlined text-sm">explore</span>
            </a>
            <a href="/?pricing_type=Free" className="px-6 py-3 bg-white dark:bg-surface-container border border-outline-variant/30 text-on-surface font-bold rounded-full hover:shadow-md transition-all">
              Ücretsiz Araçlar
            </a>
          </div>

          <SearchBar />
        </section>

        {isSearchActive ? (
          <section id="results" className="py-12 max-w-[1440px] mx-auto px-8 relative">
            <div className="mb-8">
               <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary mb-3 block">
                 {category_id ? <>KATEGORİ</> : <LocalizedString id="directory" />}
               </span>
               <h2 className="text-[2rem] font-bold tracking-tight text-on-surface">
                 {q ? `"${q}" İçin Arama Sonuçları` : (pricing_type === 'Free' ? "Ücretsiz Yapay Zeka Araçları" : (category_id ? "Kategori Sonuçları" : <LocalizedString id="category_title" />))}
               </h2>
            </div>

            {allTools.length === 0 ? (
              <div className="py-20 text-center text-on-surface-variant">Aradığınız kriterlere uygun araç bulunamadı. Lütfen daha farklı bir kelime ile aramayı deneyin.</div>
            ) : (
              <CardGrid tools={allTools as any} />
            )}
            
            {allTools.length > 0 && (
              <div className="flex justify-center items-center mt-12 gap-3">
                <Link 
                  href={`/?${new URLSearchParams({ ...(q && {q}), ...(category_id && {category_id}), page: Math.max(1, page - 1).toString() }).toString()}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-surface-container border border-outline-variant/50 text-on-surface hover:shadow-md transition"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </Link>
                <span className="px-4 py-2 font-bold bg-white dark:bg-surface-container rounded-xl shadow-sm border border-outline-variant/20">
                  <LocalizedString id="pagination_page" /> {page}
                </span>
                <Link 
                  href={`/?${new URLSearchParams({ ...(q && {q}), ...(category_id && {category_id}), page: (page + 1).toString() }).toString()}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-surface-container border border-outline-variant/50 text-on-surface hover:shadow-md transition"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </Link>
              </div>
            )}
          </section>
        ) : (
          <div className="flex flex-col gap-8 pb-20">
            {/* Trending Section */}
            {trendingTools.length > 0 && (
              <section id="results" className="pt-12 max-w-[1440px] mx-auto px-8 w-full">
                <div className="flex items-center gap-2 mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl">trending_up</span>
                  <h2 className="text-[2rem] font-bold tracking-tight text-on-surface">Bugün Trend Olanlar</h2>
                </div>
                <CardGrid tools={trendingTools as any} />
              </section>
            )}

            {/* Turkish Favorites Section */}
            {turkishTools.length > 0 && (
              <section className="bg-gradient-to-r from-red-500/10 to-transparent py-16 mt-8">
                <div className="max-w-[1440px] mx-auto px-8 w-full">
                  <div className="flex items-center gap-2 mb-8">
                    <span className="text-3xl">🇹🇷</span>
                    <h2 className="text-[2rem] font-bold tracking-tight text-on-surface">Türkiye'nin Favorileri</h2>
                  </div>
                  <CardGrid tools={turkishTools as any} />
                </div>
              </section>
            )}

            {/* Best Free Tools */}
            {freeTools.length > 0 && (
              <section className="pt-12 max-w-[1440px] mx-auto px-8 w-full">
                <div className="flex items-center gap-2 mb-8">
                  <span className="material-symbols-outlined text-green-500 text-3xl">redeem</span>
                  <h2 className="text-[2rem] font-bold tracking-tight text-on-surface">En İyi Ücretsiz Araçlar</h2>
                </div>
                <CardGrid tools={freeTools as any} />
              </section>
            )}
          </div>
        )}

        <SuggestModalClient />
      </main>

      <Footer />
    </div>
  );
}
