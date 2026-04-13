# Yararlan CI/CD & Deployment Architecture

Bu doküman, sistemin nasıl deploy edildiğini ve nedenleriyle birlikte kalıcı mimari kararları açıklamaktadır. Projenin bir daha çökmesini engellemek için **bu mimariye kesinlikle sadık kalınmalıdır**.

## 1. Frontend (Next.js - yararlan.com)
Frontend uygulaması **hiçbir GitHub Action olmadan**, doğrudan [Cloudflare Pages Native UI] entegrasyonu kullanılarak otomatik çalışır.

* **Neden GitHub Action Kullanılmıyor?**
  Lokal bilgisayarınızda biriken derlenmiş klasörler (örnek: `.open-next/server-functions`), GitHub sunucularında Mac cihazınızın yolunu arayarak (`/Users/ilkerkaya/...`) modül çökmesine (`ENOENT`) neden olur. Cloudflare Pages bu derleme işini kendi temiz sunucusunda doğrudan Github Reposuna bakarak hatasız yaptığından, buraya müdahale edilmez.
* **Nasıl Tetikleniyor?** Siz `main` dalına (branch) kod pushladığınız anda Cloudflare Pages otomatik algılar ve günceller.

## 2. Backend API (Hono - api.yararlan.com)
Veritabanı (D1) ile iletişim kuran Arka plan API sunucusu **GitHub Actions** üzerinden deploy edilir.

* **Pipeline Dosyası:** `.github/workflows/production-deploy.yml`
* **Neden `npm run deploy:api` kullanıyoruz?**
  Cloudflare'in resmi plugin'i (`cloudflare/wrangler-action@v3`) çalışma dizini olarak kök dizini (root) baz alıp kazara Frontend dosyalarını taramaya çalıştığı (Bug) için, bunu atlatmak adına lokal komut kullandık: `cd api-worker && npm install && npx wrangler deploy`. Bu sayede sadece `api-worker` dizini deploy edilir.

## 3. Ortam Değişkenleri (Environment Variables) & DNS
* **GitHub Secrets:** Actions'ın API'yi güncelleyebilmesi için deponun `Settings` kısmında her zaman `CLOUDFLARE_API_TOKEN` ve `CLOUDFLARE_ACCOUNT_ID` güncel ve geçerli tutulmalıdır. Eğer API güncellenmezse, Frontend hata vermeye (kategoriler boş dönmeye) başlar.
* **API URL Ayarı:** `NEXT_PUBLIC_API_URL` değeri `.env.production` içerisinde sistem çökmesini engellemek için garanti adres olan `https://yararlan-api.ilkeronurkaya.workers.dev` olarak ayarlanmıştır.
* **Custom Domain:** API Worker başarıyla deploy oldukça `api-worker/wrangler.toml` içerisindeki kural sayesinde Cloudflare, `api.yararlan.com` adresini arka planda tazelemeye / yaşatmaya devam eder.

> [!WARNING]
> Frontend deploy işlemini (Next.js sayfalarını) hiçbir şekilde tekrar `production-deploy.yml` içerisine eklemeyin.
