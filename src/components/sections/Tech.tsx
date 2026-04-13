import SectionWrapper from './SectionWrapper';
import { useI18n } from '@/context/I18nContext';

const Tech = () => {
  const { catalog } = useI18n();

  return (
    <>
      <div className="mb-12">
        <h2
          className="text-[52px] leading-[1.2] text-warm-fg max-sm:text-[38px]"
          style={{ fontFamily: 'Georgia, serif', fontWeight: 500 }}
        >
          {catalog.tech.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {catalog.tech.groups.map(group => (
          <div
            key={group.title}
            className="rounded-2xl border border-warm-border bg-warm-elevated p-6 shadow-[0_0_0_1px_var(--color-subtle)]"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-warm-border bg-warm-page text-lg">
                <span>{group.icon}</span>
              </div>
              <h3 className="text-xl text-warm-fg">{group.title}</h3>
            </div>

            <div className="space-y-5">
              {group.items.map(item => (
                <div key={item.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-warm-muted">{item.name}</span>
                    <span className="font-semibold text-warm-soft">{item.value}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-warm-border">
                    <div
                      className="h-full rounded-full"
                      style={{ backgroundColor: group.accentColor, width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, 'tech');
