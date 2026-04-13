import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';

import SectionWrapper from './SectionWrapper';
import { TExperience } from '../../types';
import { useI18n } from '@/context/I18nContext';

const ExperienceCard: React.FC<TExperience> = experience => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'var(--color-elevated)',
        color: 'var(--color-fg)',
        border: '1px solid var(--color-subtle)',
        boxShadow: '0 0 0 1px var(--color-border)',
      }}
      contentArrowStyle={{ borderRight: '7px solid var(--color-border)' }}
      date={experience.date}
      iconStyle={{
        background: experience.iconBg,
        boxShadow: '0 0 0 4px var(--color-icon-halo), inset 0 0 0 2px var(--color-icon-inset)',
      }}
      icon={
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={experience.icon}
            alt={experience.companyName}
            className="h-[60%] w-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-[24px] text-warm-fg">{experience.title}</h3>
        <p className="text-[16px] font-semibold text-warm-muted" style={{ margin: 0 }}>
          {experience.companyName}
        </p>
      </div>

      <ul className="ml-5 mt-5 list-disc space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="pl-1 text-[14px] tracking-wider text-warm-muted"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { catalog } = useI18n();

  return (
    <>
      <div className="mb-10">
        <h2
          className="text-[52px] leading-[1.2] text-warm-fg max-sm:text-[38px]"
          style={{ fontFamily: 'Georgia, serif', fontWeight: 500 }}
        >
          {catalog.experience.title}
        </h2>
      </div>

      <div className="mt-16 flex flex-col">
        <VerticalTimeline>
          {catalog.experiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
