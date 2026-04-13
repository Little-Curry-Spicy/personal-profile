/** 首屏左下角轻装饰：线描云 + 柔和黏土色块（不占交互、低对比） */
const BoutiqueDecor = () => (
  <div
    className="pointer-events-none absolute bottom-8 left-2 z-0 select-none sm:left-8"
    aria-hidden
  >
    <div
      className="absolute -bottom-10 -left-6 h-36 w-36 rounded-[58%_42%_48%_52%/52%_48%_52%_48%] opacity-40 blur-md"
      style={{ background: 'color-mix(in oklab, var(--color-clay-tint) 55%, transparent)' }}
    />
    <svg
      className="relative text-warm-muted/45 dark:text-warm-muted/35"
      width={180}
      height={72}
      viewBox="0 0 180 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 52c0-8 6.5-14.5 14.5-14.5 1.2 0 2.4.15 3.5.45C29 30 38.5 22 50 22c12.2 0 22.3 8.8 24.4 20.3 2.5-.8 5.2-1.3 8-1.3 13.8 0 25 11.2 25 25H8Z"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
      <path
        d="M96 44c0-6.1 5-11 11.2-11 .9 0 1.8.1 2.6.3 2.4-7.8 9.7-13.3 18.2-13.3 9.5 0 17.3 6.9 18.8 16 1.9-.6 4-1 6.1-1 10.5 0 19 8.5 19 19H96Z"
        stroke="currentColor"
        strokeWidth={1.15}
        strokeLinejoin="round"
        opacity={0.85}
      />
    </svg>
  </div>
);

export default BoutiqueDecor;
