import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { styles } from '../../constants/styles';
import { navLinks } from '../../constants';
import type { TNavLink } from '../../types';
import { logo, menu, close } from '../../assets';
import { config } from '../../constants/config';
import { useI18n } from '@/context/I18nContext';
import { useTheme } from '@/context/ThemeContext';

function IconSun({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={true}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function IconMoon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={true}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const Navbar = () => {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [active, setActive] = useState<string | null>();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    const navbarHighlighter = () => {
      if (!isHome) return;
      const sections = document.querySelectorAll('section[id]');

      sections.forEach(current => {
        const sectionId = current.getAttribute('id');
        const sectionHeight = (current as HTMLElement).offsetHeight;
        const sectionTop = current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener('scroll', navbarHighlighter);
    navbarHighlighter();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', navbarHighlighter);
    };
  }, [isHome]);

  const shellShadow = scrolled
    ? 'shadow-[0_14px_40px_-12px_rgba(0,0,0,0.14)] dark:shadow-[0_18px_44px_-14px_rgba(0,0,0,0.65)]'
    : 'shadow-[0_10px_34px_-14px_rgba(0,0,0,0.1)] dark:shadow-[0_14px_38px_-16px_rgba(0,0,0,0.55)]';

  const linkIsActive = (nav: TNavLink) => {
    if (nav.id === 'home') {
      return location.pathname === '/' && (active ?? '') === '';
    }
    if (nav.path) {
      return location.pathname === nav.path;
    }
    return isHome && active === nav.id;
  };

  return (
    <header className="pointer-events-none fixed top-0 z-20 w-full pt-4 sm:pt-5">
      <nav
        className={`${styles.paddingX} pointer-events-auto mx-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-warm-border bg-warm-elevated/90 py-3 backdrop-blur-md sm:px-6 ${shellShadow}`}
      >
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="h-9 w-9 shrink-0 object-contain" />
          <p className="truncate cursor-pointer text-[18px] font-medium text-warm-fg">{config.html.title}</p>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          <ul className="flex list-none flex-row items-center gap-8">
            {navLinks.map(nav => {
              const label = t(`nav.${nav.id}`);
              const isRoute = Boolean(nav.path);
              const isActive = linkIsActive(nav);
              const className = `${
                isActive ? 'text-warm-fg' : 'text-warm-muted'
              } inline-block text-[18px] font-medium transition hover:text-warm-fg`;
              return (
                <li key={nav.id}>
                  {isRoute ? (
                    <Link
                      to={nav.path!}
                      className={className}
                      onClick={() => {
                        if (nav.id === 'home') window.scrollTo(0, 0);
                      }}
                    >
                      {label}
                    </Link>
                  ) : (
                    <Link to={`/#${nav.id}`} className={className}>
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 border-l border-warm-border pl-6">
            <div
              className="inline-flex h-9 items-stretch overflow-hidden rounded-full border border-warm-border bg-warm-page/70 text-sm"
              role="group"
              aria-label={t('lang.toggleGroup')}
            >
              <button
                type="button"
                onClick={() => setLocale('zh')}
                aria-pressed={locale === 'zh'}
                title={t('lang.switchToZh')}
                className={`min-w-[2.25rem] px-2 font-semibold transition hover:text-warm-fg ${
                  locale === 'zh'
                    ? 'bg-warm-page text-warm-fg'
                    : 'text-warm-muted hover:bg-warm-page/60'
                }`}
              >
                中
              </button>
              <span className="w-px shrink-0 bg-warm-border" aria-hidden />
              <button
                type="button"
                onClick={() => setLocale('en')}
                aria-pressed={locale === 'en'}
                title={t('lang.switchToEn')}
                className={`min-w-[2.25rem] px-2 font-semibold transition hover:text-warm-fg ${
                  locale === 'en'
                    ? 'bg-warm-page text-warm-fg'
                    : 'text-warm-muted hover:bg-warm-page/60'
                }`}
              >
                En
              </button>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-warm-border bg-warm-page/70 text-warm-soft transition hover:border-warm-muted/35 hover:text-warm-fg"
              title={theme === 'light' ? t('theme.useDark') : t('theme.useLight')}
              aria-label={theme === 'light' ? t('theme.useDark') : t('theme.useLight')}
            >
              {theme === 'light' ? (
                <IconMoon className="h-[18px] w-[18px] shrink-0" />
              ) : (
                <IconSun className="h-[18px] w-[18px] shrink-0" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:hidden">
          <div
            className="inline-flex h-10 items-stretch overflow-hidden rounded-full border border-warm-border bg-warm-page/70 text-sm active:opacity-90"
            role="group"
            aria-label={t('lang.toggleGroup')}
          >
            <button
              type="button"
              onClick={() => setLocale('zh')}
              aria-pressed={locale === 'zh'}
              title={t('lang.switchToZh')}
              className={`min-w-[2.5rem] px-2 font-semibold transition hover:text-warm-fg ${
                locale === 'zh'
                  ? 'bg-warm-page text-warm-fg'
                  : 'text-warm-muted hover:bg-warm-page/60'
              }`}
            >
              中
            </button>
            <span className="w-px shrink-0 bg-warm-border" aria-hidden />
            <button
              type="button"
              onClick={() => setLocale('en')}
              aria-pressed={locale === 'en'}
              title={t('lang.switchToEn')}
              className={`min-w-[2.5rem] px-2 font-semibold transition hover:text-warm-fg ${
                locale === 'en'
                  ? 'bg-warm-page text-warm-fg'
                  : 'text-warm-muted hover:bg-warm-page/60'
              }`}
            >
              En
            </button>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-warm-border bg-warm-page/70 text-warm-soft active:opacity-90"
            title={theme === 'light' ? t('theme.useDark') : t('theme.useLight')}
            aria-label={theme === 'light' ? t('theme.useDark') : t('theme.useLight')}
          >
            {theme === 'light' ? (
              <IconMoon className="h-[18px] w-[18px] shrink-0" />
            ) : (
              <IconSun className="h-[18px] w-[18px] shrink-0" />
            )}
          </button>
          <img
            src={toggle ? close : menu}
            alt={t('a11y.menu')}
            className="h-[28px] w-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } absolute right-0 top-[4.5rem] z-10 mx-2 my-2 min-w-[180px] rounded-2xl border border-warm-border bg-warm-elevated p-6 shadow-lg`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map(nav => {
                const label = t(`nav.${nav.id}`);
                const isRoute = Boolean(nav.path);
                const isActive = linkIsActive(nav);
                return (
                  <li
                    key={nav.id}
                    className={`cursor-pointer text-[16px] font-medium ${
                      isActive ? 'text-warm-fg' : 'text-warm-muted'
                    }`}
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  >
                    {isRoute ? (
                      <Link
                        to={nav.path!}
                        onClick={() => {
                          if (nav.id === 'home') window.scrollTo(0, 0);
                        }}
                      >
                        {label}
                      </Link>
                    ) : (
                      <Link to={`/#${nav.id}`}>{label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
