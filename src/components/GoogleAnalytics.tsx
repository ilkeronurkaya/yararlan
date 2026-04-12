'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

const GoogleAnalyticsInner = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return;

        const url = pathname + searchParams.toString();
        
        // @ts-ignore
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }, [pathname, searchParams]);

    if (!GA_MEASUREMENT_ID) return null;

    return (
        <>
            <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}

                        // Consent Mode v2 Configuration
                        gtag('consent', 'default', {
                          'ad_storage': 'denied',
                          'ad_user_data': 'denied',
                          'ad_personalization': 'denied',
                          'analytics_storage': 'granted' // Defaults to granted to capture curation interactions organically without block
                        });

                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                            send_page_view: false
                        });
                    `,
                }}
            />
        </>
    );
};

const GoogleAnalytics = () => {
    return (
        <Suspense fallback={null}>
            <GoogleAnalyticsInner />
        </Suspense>
    );
};

export default GoogleAnalytics;
