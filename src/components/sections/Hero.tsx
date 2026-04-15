import { useEffect, useMemo, useState } from 'react';
import { styles } from '../../constants/styles';
import { config } from '../../constants/config';
import { useI18n } from '@/context/I18nContext';

const GOATCOUNTER_ENDPOINT = import.meta.env.VITE_GOATCOUNTER_ENDPOINT?.trim() ?? '';

function getGoatcounterBase(endpoint: string): string {
  return endpoint.replace(/\/count\/?$/, '');
}

function getCounterPathname(pathname: string): string {
  if (pathname === '/') return '//';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

const Hero = () => {
  const { locale, catalog } = useI18n();
  const hiLabel = locale === 'zh' ? 'Hi，我是' : "Hi, I'm";
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const syncVisitorCount = async () => {
      try {
        if (!GOATCOUNTER_ENDPOINT) return;

        const base = getGoatcounterBase(GOATCOUNTER_ENDPOINT);
        const pagePath = getCounterPathname(window.location.pathname);
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 3000);

        const response = await fetch(`${base}/counter${pagePath}.json`, {
          signal: controller.signal,
        });
        window.clearTimeout(timeout);

        if (!response.ok) {
          throw new Error(`GoatCounter request failed: ${response.status}`);
        }

        const payload = (await response.json()) as { count?: unknown };
        if (typeof payload.count === 'number' && !cancelled) {
          setVisitorCount(payload.count);
        }
      } catch (error) {
        console.error('Failed to load goatcounter visitor count', error);
      }
    };

    void syncVisitorCount();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!GOATCOUNTER_ENDPOINT || import.meta.env.DEV) return;
    const id = 'goatcounter-script';
    if (document.getElementById(id)) return;

    const script = document.createElement('script');
    script.id = id;
    script.async = true;
    script.dataset.goatcounter = GOATCOUNTER_ENDPOINT;
    script.src = `${getGoatcounterBase(GOATCOUNTER_ENDPOINT)}/count.js`;
    document.head.appendChild(script);
  }, []);

  const visitorText = useMemo(() => {
    if (visitorCount === null) return '--';
    return `${new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US').format(visitorCount)}+`;
  }, [locale, visitorCount]);

  return (
    <section className="hero-dreamscape relative mx-auto min-h-screen w-full overflow-hidden bg-transparent">
      {/* 压暗边缘、突出中央光束氛围，保证文字对比 */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_18%,transparent_20%,rgba(0,0,0,0.35)_100%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_15%,transparent_15%,rgba(0,0,0,0.5)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/45 via-transparent to-black/30 dark:from-black/55 dark:to-black/45"
        aria-hidden
      />

      <div
        className={`relative z-10 mx-auto flex min-h-[min(100vh,920px)] max-w-4xl flex-col items-center justify-center px-5 pb-24 pt-28 text-center sm:px-12 sm:pt-32 md:px-16 md:pt-36`}
      >
        <p className="hero-dreamscape-sub mb-3 text-[13px] font-medium uppercase tracking-[0.32em] text-warm-muted dark:text-warm-soft/90">
          {locale === 'zh' ? '想象 · 构建 · 交付' : 'Imagine · Build · Ship'}
        </p>

        <h1 className={`${styles.heroHeadText} max-w-[22ch] text-balance`}>
          {hiLabel}{' '}
          <span className="bg-linear-to-r from-warm-accent via-amber-200 to-warm-studio bg-clip-text text-transparent dark:from-amber-200 dark:via-orange-200 dark:to-sky-200">
            {config.hero.name}
          </span>
        </h1>

        <p
          className={`hero-dreamscape-sub ${styles.heroSubText} mt-6 max-w-2xl text-balance text-warm-soft dark:text-warm-soft`}
        >
          {catalog.hero.roles[0]}
          {catalog.hero.roles[1] ? (
            <>
              <br className="hidden sm:block" />
              {catalog.hero.roles[1]}
            </>
          ) : null}
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-warm-border bg-warm-chip/85 px-4 py-2 text-base text-warm-soft shadow-[0_0_0_1px_var(--color-chip-ring)] backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0"
            aria-hidden
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6" />
            <path d="M23 11h-6" />
          </svg>
          <span className="tabular-nums">{visitorText}</span>
          <span>{catalog.hero.visitorLabel}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
