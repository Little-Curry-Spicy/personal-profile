import { styles } from '../../constants/styles';
import { config } from '../../constants/config';
import { useI18n } from '@/context/I18nContext';

const Hero = () => {
  const { locale, catalog } = useI18n();
  const hiLabel = locale === 'zh' ? 'Hi，我是' : "Hi, I'm";

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
      </div>
    </section>
  );
};

export default Hero;
