import { styles } from '../../constants/styles';
import { config } from '../../constants/config';
import headerImage from '@/assets/header.png';
import { useI18n } from '@/context/I18nContext';

const Hero = () => {
  const { locale, catalog } = useI18n();
  const hiLabel = locale === 'zh' ? 'Hi，我是' : "Hi, I'm";

  return (
    <section className="relative mx-auto min-h-screen w-full bg-warm-page">
      <div
        className={`mx-auto grid max-w-7xl items-start gap-8 ${styles.paddingX} pt-24 pb-16 sm:pt-28 sm:pb-18 md:items-center md:gap-10 md:pt-36 md:pb-20 md:grid-cols-[1.25fr_1fr]`}
      >
        <div className="order-2 max-w-2xl md:order-1">
          <h1 className={`${styles.heroHeadText}`}>
            {hiLabel} <span className="text-warm-accent">{config.hero.name}</span>
          </h1>
          <p className={`${styles.heroSubText} mt-5`}>
            {catalog.hero.roles[0]} <br className="hidden sm:block" />
            {catalog.hero.roles[1]}
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-warm-border px-4 py-2 text-sm text-warm-soft shadow-[0_0_0_1px_var(--color-subtle)]">
            <span className="h-2 w-2 rounded-full bg-warm-accent" />
            {catalog.hero.badge}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              href="mailto:tskwangyi@163.com"
              className="inline-flex items-center gap-2 rounded-full border border-warm-border bg-warm-elevated px-4 py-2 text-warm-soft transition hover:border-warm-border hover:text-warm-fg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              tskwangyi@163.com
            </a>
            <a
              href="https://github.com/Little-Curry-Spicy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-warm-border bg-warm-elevated px-4 py-2 text-warm-soft transition hover:border-warm-border hover:text-warm-fg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              {catalog.hero.githubLabel}
            </a>
            <a
              href={config.links.twitterUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-warm-border bg-warm-elevated px-4 py-2 text-warm-soft transition hover:border-warm-border hover:text-warm-fg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              {config.links.twitterLabel}
            </a>
            <span
              className="inline-flex items-center gap-2 rounded-full border border-warm-border bg-warm-elevated px-4 py-2 text-warm-soft"
              title={locale === 'zh' ? '加好友请注明来意' : 'Add on WeChat — a short note helps'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.288-8.615-6.288zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 7.105 4.229.896 0 1.74-.104 2.524-.294a.716.716 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
              </svg>
              {config.links.wechatLabel}
            </span>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[320px] md:order-2 md:max-w-[360px]">
          <div className="rounded-[32px] border border-warm-border bg-warm-elevated p-4 shadow-[rgba(0,0,0,0.05)_0px_4px_24px]">
            <div className="rounded-[26px] bg-warm-page">
              <img
                src={headerImage}
                alt={`${config.hero.name} avatar`}
                className="h-[320px] w-full rounded-[22px] object-cover object-[center_14%] sm:h-[340px]"
              />
            </div>
            <p className="mt-4 text-center text-[15px] text-warm-muted">{catalog.hero.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
