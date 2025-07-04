export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const GA_ID = runtimeConfig.public.GA_ID;
  const GTM_ID = runtimeConfig.public.GTM_ID;
  const appMode = runtimeConfig.public.appMode;

  if (typeof window === 'undefined') return;
  if (appMode !== "https://app.arrowster.com") return;

  // --- Google Tag Manager ---
  if (GTM_ID) {
    (function(w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      const f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l !== 'dataLayer' ? `&l=${l}` : '';
      j.async = true;
      j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
      f.parentNode?.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', GTM_ID);
  }

  // --- Google Analytics (GA4) ---
  if (GA_ID) {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(gaScript);

    gaScript.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA_ID);
    };
  }
});
