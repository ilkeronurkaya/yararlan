import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CardGrid from '@/components/CardGrid';
import Footer from '@/components/Footer';



async function getFeaturedTools(apiUrl: string) {
  try {
    const res = await fetch(`${apiUrl}/api/websites`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`API Warning [Featured]: Returned status ${res.status}`);
      return [];
    }
    const json = await res.json();
    if (!json || !json.data) {
      console.error('API Warning [Featured]: No data payload found');
      return [];
    }
    return json.data.filter((w: any) => w.is_featured === 1).slice(0, 6);
  } catch (error) {
    console.error('API Error [Featured]:', error);
    return [];
  }
}

async function getAllTools(apiUrl: string, query?: string) {
  try {
    const url = new URL(`${apiUrl}/api/websites`);
    if (query) url.searchParams.set('q', query);
    
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) {
      console.error(`API Warning [All]: Returned status ${res.status}`);
      return [];
    }
    const json = await res.json();
    if (!json || !json.data) {
      console.error('API Warning [All]: No data payload found');
      return [];
    }
    return json.data || [];
  } catch (error) {
    console.error('API Error [All]:', error);
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }> | any;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams?.q;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yararlan.com';

  const featuredTools = await getFeaturedTools(API_URL);
  const allTools = await getAllTools(API_URL, q);

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-[1440px] mx-auto px-8 pt-24 pb-32 flex flex-col items-center text-center">
          <h1 className="text-[3.5rem] font-extrabold tracking-[-0.02em] text-on-surface mb-6 leading-tight">
            Her araç için bir <span className="text-primary">rehber.</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl text-lg mb-12 leading-relaxed">
            İnternetin en iyi araçlarını, yapay zeka destekli kürasyonlarla keşfedin. İhtiyacınız olan her şey tek bir noktada.
          </p>
          
          <SearchBar />
        </section>

        {/* Featured Section */}
        {!q && (
          <section className="bg-surface-container-low py-24">
            <div className="max-w-[1440px] mx-auto px-8">
              <div className="flex justify-between items-end mb-16">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary mb-3 block">ÖNE ÇIKANLAR</span>
                  <h2 className="text-[2rem] font-bold tracking-tight text-on-surface">Haftanın Seçkisi</h2>
                </div>
                <button className="text-primary font-medium hover:underline underline-offset-8 transition-all">Tümünü İncele →</button>
              </div>
              
              <CardGrid tools={featuredTools as any} />
            </div>
          </section>
        )}

        {/* Directory Section */}
        <section className="py-24 max-w-[1440px] mx-auto px-8">
          {q && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-on-surface">
                "{q}" için sonuçlar
              </h2>
            </div>
          )}
          
          <div className="mb-16">
             <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary mb-3 block">DİZİN</span>
             <h2 className="text-[2rem] font-bold tracking-tight text-on-surface">Tüm Araçlar</h2>
          </div>

          <CardGrid tools={allTools as any} />
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-surface flex flex-col items-center">
          <div className="max-w-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Bir araç mı biliyorsun?</h3>
            <p className="text-on-surface-variant mb-8">Kürasyonumuza katkıda bulunun ve topluluğun büyümesine yardımcı olun.</p>
            <button className="px-12 py-4 border border-outline-variant text-on-surface font-semibold hover:bg-surface-container-low transition-colors duration-300">
              Araç Gönder
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
