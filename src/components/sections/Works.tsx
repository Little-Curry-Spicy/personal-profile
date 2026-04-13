import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { styles } from '@/constants/styles';
import SectionWrapper from './SectionWrapper';
import { fadeIn } from '@/shared/animations';
import { TProject } from '../../types';
import { useI18n } from '@/context/I18nContext';

const ProjectCard: React.FC<
  {
    index: number;
    onPreview: (projectName: string, images: string[], startIndex?: number) => void;
    sourceLabel: string;
    previewLabel: string;
  } & TProject
> = ({
  index,
  name,
  description,
  tags,
  images,
  sourceCodeLink,
  liveSiteLink,
  onPreview,
  sourceLabel,
  previewLabel,
}) => {
    const coverImage = images[0];
    return (
      <motion.div variants={fadeIn('up', 'spring', index * 0.25, 0.6)}>
        <div className="group relative flex h-[640px] w-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-warm-border bg-warm-elevated px-4 pt-4 pb-0 shadow-[0_16px_44px_-28px_rgba(0,0,0,0.07)] transition duration-300 hover:-translate-y-2 hover:border-warm-border hover:shadow-[0_22px_48px_-24px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_22px_48px_-20px_rgba(0,0,0,0.5)] md:h-[656px]">
          <div className="relative z-[11] h-[208px] w-full shrink-0 overflow-hidden rounded-2xl leading-none md:h-[216px]">
            <img
              src={coverImage}
              alt={name}
              className="block h-full w-full cursor-zoom-in object-cover transition duration-300 group-hover:scale-[1.04]"
              onClick={() => onPreview(name, images)}
            />
          </div>

          {/* relative z-10：默认叠在 translate 走的详情层之上，避免未 hover 时底层仍盖住 tag 底部 */}
          <div className="relative z-10 mt-4 min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-4">
            <h3 className="boutique-display line-clamp-2 text-[34px] font-medium leading-[1.2] text-warm-fg sm:text-[28px]">
              {name}
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-warm-muted">{description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={tag.name}
                  className="rounded-full border border-warm-tag-border bg-warm-tag px-3 py-1 text-xs text-warm-soft"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-[-50px] z-0 flex translate-y-full flex-col rounded-2xl bg-warm-elevated px-5 pt-5 pb-0 opacity-100 shadow-[0_-14px_30px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pointer-events-auto group-hover:bottom-[56px] group-hover:z-20 group-hover:translate-y-0">
            <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-warm-subtle to-transparent" />
            <div className="mb-3 flex justify-center">
              <span className="h-1.5 w-14 rounded-full bg-warm-border" />
            </div>
            <h4 className="boutique-display text-[28px] font-medium leading-[1.2] text-warm-fg">
              {name}
            </h4>
            <p className="mt-3 flex-1 overflow-y-auto pr-1 text-[15px] leading-7 text-warm-soft">
              {description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={`hover-${tag.name}`}
                  className="rounded-full border border-warm-border bg-warm-page px-3 py-1 text-xs text-warm-soft"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-[30] mx-[-1rem] mt-0 flex min-h-[52px] shrink-0 items-center justify-end gap-5 border-t border-warm-border/60 bg-warm-elevated px-4 py-3 text-warm-muted transition duration-300 group-hover:border-warm-border group-hover:text-warm-fg">
            <button
              type="button"
              onClick={() => window.open(sourceCodeLink, '_blank')}
              className="inline-flex items-center gap-2 text-base transition hover:text-warm-fg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span>{sourceLabel}</span>
            </button>

            {liveSiteLink ? (
              <button
                type="button"
                onClick={() => window.open(liveSiteLink, '_blank')}
                className="inline-flex items-center gap-2 text-base transition hover:text-warm-fg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
                <span>{previewLabel}</span>
              </button>
            ) : null}
          </div>
        </div>
      </motion.div>
    );
  };

const Works = () => {
  const { catalog } = useI18n();
  const [preview, setPreview] = useState<{
    projectName: string;
    images: string[];
    currentIndex: number;
  } | null>(null);

  const currentPreviewImage = useMemo(() => {
    if (!preview) return null;
    return preview.images[preview.currentIndex];
  }, [preview]);

  const openPreview = (projectName: string, images: string[], startIndex = 0) => {
    setPreview({
      projectName,
      images,
      currentIndex: startIndex,
    });
  };

  const closePreview = () => setPreview(null);

  const goNext = () => {
    if (!preview) return;
    setPreview({
      ...preview,
      currentIndex: (preview.currentIndex + 1) % preview.images.length,
    });
  };

  const goPrev = () => {
    if (!preview) return;
    setPreview({
      ...preview,
      currentIndex: (preview.currentIndex - 1 + preview.images.length) % preview.images.length,
    });
  };

  return (
    <>
      <div className="mb-10">
        <h2 className={`${styles.sectionHeadText} font-medium leading-[1.2] max-sm:text-[38px]`}>
          {catalog.works.title}
        </h2>
      </div>

      <div className="flex w-full">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-1 max-w-4xl whitespace-pre-line text-[17px] leading-8 text-warm-muted"
        >
          {catalog.works.content}
        </motion.p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {catalog.projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
            onPreview={openPreview}
            sourceLabel={catalog.works.source}
            previewLabel={catalog.works.preview}
          />
        ))}
      </div>

      {preview && currentPreviewImage ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-warm-fg/75 p-4"
          onClick={closePreview}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl border border-warm-border bg-warm-elevated p-4 shadow-[rgba(0,0,0,0.05)_0px_4px_24px]"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePreview}
              className="absolute right-3 top-3 z-10 rounded-lg bg-warm-border px-3 py-1.5 text-warm-soft shadow-[0_0_0_1px_var(--color-subtle)]"
              aria-label="Close preview"
            >
              {'\u2715'}
            </button>

            <img
              src={currentPreviewImage}
              alt={`${preview.projectName} preview`}
              className="h-[60vh] w-full rounded-xl object-contain"
            />

            {preview.images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-warm-border bg-warm-border text-3xl text-warm-soft shadow-[0_0_0_1px_var(--color-subtle)] transition hover:scale-105"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-warm-border bg-warm-border text-3xl text-warm-soft shadow-[0_0_0_1px_var(--color-subtle)] transition hover:scale-105"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            ) : null}

            <div className="mt-3 flex items-center justify-center gap-2">
              {preview.images.map((img, idx) => (
                <button
                  type="button"
                  key={`${img}-${idx}`}
                  onClick={() => setPreview({ ...preview, currentIndex: idx })}
                  className={`h-2.5 w-2.5 rounded-full ${idx === preview.currentIndex ? 'bg-warm-accent' : 'bg-warm-muted'
                    }`}
                  aria-label={`Preview image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SectionWrapper(Works, '');
