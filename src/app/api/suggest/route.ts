import { NextResponse } from 'next/server';
import { LinkChecker } from 'linkinator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { website_name } = body;

    if (!website_name) {
      return NextResponse.json({ error: 'URL gereklidir.' }, { status: 400 });
    }
    
    let urlToCheck = website_name;
    if (!/^https?:\/\//i.test(urlToCheck)) {
      urlToCheck = 'https://' + urlToCheck;
    }

    // 1) Linkinator URL Validation
    const checker = new LinkChecker();
    
    // Sadece ana sayfayı kontrol edelim, tüm siteyi taramasın
    const result = await checker.check({
      path: urlToCheck,
      recurse: false,
      timeout: 5000,
    });

    // Ana sayfanın bizzat kendi linkinin durumu
    const rootLink = result.links.find(x => x.url === urlToCheck || x.url === urlToCheck + '/');
    
    // HTTP status of the root domain. 
    // Linkinator adds status 0 if it failed completely (DNS issue, timeout, etc.)
    const isWorking = rootLink?.state === 'OK' || (rootLink?.status && rootLink.status >= 200 && rootLink.status < 400);

    if (!isWorking && result.links.length === 0) {
       // If linkinator couldn't fetch anything at all
       return NextResponse.json({ error: 'Web sitesine ulaşılamıyor (Ölü bağlantı veya erişim reddedildi).' }, { status: 400 });
    }

    // Optionally check if passed is true
    if (!result.passed) {
       // but maybe `passed` also considers internal CSS 404s, so be lenient.
       // We really just care if the host URL responds!
       const brokeMain = result.links.find(x => (x.url === urlToCheck || x.url === urlToCheck + '/') && x.state === 'BROKEN');
       if (brokeMain) {
         return NextResponse.json({ error: 'Web sitesi 404/500 gibi bir hata döndürüyor.' }, { status: 400 });
       }
    }

    // 2) Eğer Cloudflare D1 veritabanına doğrudan kayıt yapmak istersek yapabiliriz
    // API worker'ımızda /api/suggest henüz yok. Sadece mock success dönüyordu.
    // Şimdilik başarılı mock dönüyoruz. İstek D1'e eklenebilir.
    
    return NextResponse.json({ success: true, message: 'URL geçerli, site yayında.', data: result.links.length });
  } catch (error: any) {
    console.error('Suggest API Error:', error);
    return NextResponse.json({ error: 'Sunucu tarafında bir hata oluştu.' }, { status: 500 });
  }
}
