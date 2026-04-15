import { GitHubCalendar } from 'react-github-calendar';

import SectionWrapper from './SectionWrapper';
import { Header } from '@/shared/ui';
import { useI18n } from '@/context/I18nContext';

const GithubCalendar = () => {
  const { t } = useI18n();

  return (
    <>
      <Header useMotion={true} h2={t('github.title')} />

      <div className="mt-8 overflow-x-auto rounded-[1.75rem] border border-warm-border bg-warm-elevated p-6 shadow-[0_16px_44px_-28px_rgba(0,0,0,0.1)]">
        <div className="min-w-[760px]">
          <GitHubCalendar
            username="Little-Curry-Spicy"
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            fontSize={14}
          />
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(GithubCalendar, 'github');
