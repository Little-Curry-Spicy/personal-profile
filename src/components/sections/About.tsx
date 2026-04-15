import { motion } from 'framer-motion';

import SectionWrapper from './SectionWrapper';
import { fadeIn } from '@/shared/animations';
import { Header } from '@/shared/ui';
import { useI18n } from '@/context/I18nContext';

type TechBadgeMeta = {
  label: string;
  logo: string;
  color: string;
  logoColor?: string;
};

const TECH_BADGES: Record<string, TechBadgeMeta> = {
  typescript: { label: 'TypeScript', logo: 'typescript', color: '3178C6' },
  react: { label: 'React', logo: 'react', color: '61DAFB', logoColor: '0B1020' },
  vue3: { label: 'Vue3', logo: 'vuedotjs', color: '4FC08D', logoColor: '0B1020' },
  nextjs: { label: 'Next.js', logo: 'nextdotjs', color: '111111' },
  bun: { label: 'Bun', logo: 'bun', color: 'F4EBD0', logoColor: '111111' },
  nodejs: { label: 'Node.js', logo: 'nodedotjs', color: '5FA04E' },
  vite: { label: 'Vite', logo: 'vite', color: '646CFF' },
  nestjs: { label: 'NestJS', logo: 'nestjs', color: 'E0234E' },
  mysql: { label: 'MySQL', logo: 'mysql', color: '4479A1' },
  prisma: { label: 'Prisma', logo: 'prisma', color: '2D3748' },
  docker: { label: 'Docker', logo: 'docker', color: '2496ED' },
  ethers: { label: 'Ethers.js', logo: 'ethereum', color: '3C3C3D' },
  web3: { label: 'Web3-React', logo: 'react', color: '0EA5E9' },
  solidity: { label: 'Solidity', logo: 'solidity', color: '363636' },
  hardhat: { label: 'Hardhat', logo: 'ethereum', color: 'F7DF1E', logoColor: '111111' },
  ipfs: { label: 'IPFS', logo: 'ipfs', color: '65C2CB' },
  rabbitmq: { label: 'RabbitMQ', logo: 'rabbitmq', color: 'FF6600' },
  bullmq: { label: 'BullMQ', logo: 'bullmq', color: 'F15A29' },
  websocket: { label: 'WebSockets', logo: 'socketdotio', color: '4C8EDA' },
  redis: { label: 'Redis', logo: 'redis', color: 'DC382D' },
  postgresql: { label: 'PostgreSQL', logo: 'postgresql', color: '4169E1' },
  mongodb: { label: 'MongoDB', logo: 'mongodb', color: '47A248' },
  ec2: { label: 'EC2', logo: 'amazonec2', color: 'FF9900', logoColor: '111111' },
  s3: { label: 'S3', logo: 'amazons3', color: '569A31' },
  nginx: { label: 'Nginx', logo: 'nginx', color: '009639' },
};

const renderWithTechBadges = (content: string) => {
  const chunks = content.split(/(\{\{[a-z0-9-]+\}\})/gi).filter(Boolean);

  return chunks.map((chunk, index) => {
    const tokenMatch = chunk.match(/^\{\{([a-z0-9-]+)\}\}$/i);
    if (!tokenMatch) return <span key={`text-${index}`}>{chunk}</span>;

    const key = tokenMatch[1].toLowerCase();
    const badge = TECH_BADGES[key];
    if (!badge) return <span key={`text-fallback-${index}`}>{chunk}</span>;

    const badgeSrc = `https://img.shields.io/badge/${encodeURIComponent(
      badge.label
    )}-${badge.color}?style=flat&logo=${badge.logo}&logoColor=${encodeURIComponent(
      badge.logoColor ?? 'white'
    )}`;

    return (
      <img
        key={`badge-${key}-${index}`}
        src={badgeSrc}
        alt={badge.label}
        className="mx-1 inline-block h-7 align-text-bottom"
        loading="lazy"
      />
    );
  });
};

const About = () => {
  const { catalog } = useI18n();
  const paragraphs = catalog.about.content
    .split('\n\n')
    .map(line => line.trim())
    .filter(Boolean);

  return (
    <>
      <Header useMotion={true} h2={catalog.about.h2} />

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_min(100%,300px)] lg:items-start lg:gap-14 xl:min-w-0">
        <motion.div
          variants={fadeIn('', '', 0.1, 1)}
          viewport={{ once: true, amount: 0.6 }}
          className="max-w-3xl space-y-6 text-[17px] leading-[1.75] text-warm-fg"
        >
          {paragraphs.map((paragraph, index) => (
            <p key={`about-paragraph-${index}`} className="whitespace-pre-line">
              {renderWithTechBadges(paragraph)}
            </p>
          ))}
        </motion.div>

        <motion.aside
          variants={fadeIn('left', 'tween', 0.2, 0.75)}
          viewport={{ once: true, amount: 0.35 }}
          className="relative border border-warm-border bg-warm-elevated/90 px-7 py-8 shadow-sm backdrop-blur-sm dark:border-warm-border/50 dark:bg-warm-elevated/70 lg:sticky lg:top-32 lg:px-8 lg:py-9"
          style={{ borderRadius: '1.35rem' }}
        >
          <span
            className="boutique-display pointer-events-none absolute left-5 top-5 select-none text-[4.5rem] leading-none text-warm-accent/20 lg:left-6 lg:top-6"
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote className="boutique-display relative z-10 pt-10 text-[1.35rem] leading-snug text-warm-fg sm:text-[1.4rem] lg:text-[1.45rem]">
            {catalog.about.quote}
          </blockquote>
          <p className="mt-8 border-t border-warm-border/70 pt-5 text-[12px] font-medium tracking-wide text-warm-muted dark:border-warm-border/40">
            <cite className="not-italic">{catalog.about.quoteAttribution}</cite>
          </p>
        </motion.aside>
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
