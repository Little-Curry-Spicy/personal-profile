import type { TExperience, TProject } from '@/types';
import { beijing, hangzhou, zhengzhou } from '@/assets';
import { config } from '@/constants/config';

/** 作品卡片配图：与各自仓库 README 中 pic*.png 一致 */
const GH_RAW = 'https://raw.githubusercontent.com/Little-Curry-Spicy';
const aiAssistantRepo = `${GH_RAW}/ai_Personal_Information_Assistant/main`;
const resumeMatcherRepo = `${GH_RAW}/resume-matcher/main`;
const otcFlutterRepo = `${GH_RAW}/OTC-Flutter/main`;

const aiAssistantImages = [
  `${aiAssistantRepo}/pic1.png`,
  `${aiAssistantRepo}/pic2.png`,
  `${aiAssistantRepo}/pic3.png`,
  `${aiAssistantRepo}/pic4.png`,
];

const resumeMatcherImages = [
  `${resumeMatcherRepo}/pic1.png`,
  `${resumeMatcherRepo}/pic2.png`,
  `${resumeMatcherRepo}/pic3.png`,
  `${resumeMatcherRepo}/pic4.png`,
  `${resumeMatcherRepo}/pic5.png`,
];

/** 与仓库根目录 README 预览图 1.png / 2.png 一致 */
const otcFlutterImages = [`${otcFlutterRepo}/1.png`, `${otcFlutterRepo}/2.png`];

import type { Locale } from './translations';

export type { Locale } from './translations';

export type TSkillGroup = {
  title: string;
  icon: string;
  accentColor: string;
  items: { name: string; value: number }[];
};

export type ContactFormField = {
  span: string;
  placeholder: string;
};

export type SiteCatalog = {
  hero: {
    roles: [string, string];
    githubLabel: string;
    wechatLabel: string;
    visitorLabel: string;
  };
  about: { h2: string; content: string; quote: string; quoteAttribution: string };
  experience: { title: string };
  tech: { title: string; groups: TSkillGroup[] };
  works: { title: string; content: string; source: string; preview: string };
  contact: {
    h2: string;
    /** 表单上方快捷联系方式说明 */
    quickLinksIntro: string;
    form: {
      name: ContactFormField;
      email: ContactFormField;
      message: ContactFormField;
    };
    alerts: { noKey: string; success: string; fail: string };
    feedback: {
      dismiss: string;
      titleSuccess: string;
      titleError: string;
      titleConfig: string;
    };
    /** Web3Forms 纯文本邮件里展示的内容（无法用自定义 HTML 模版，只能优化正文结构） */
    emailNotify: {
      fromName: string;
      subjectTemplate: string;
      bodyTemplate: string;
    };
    submit: string;
    submitting: string;
  };
  experiences: TExperience[];
  projects: TProject[];
};

const skillGroupsZh: TSkillGroup[] = [
  {
    title: '前端技术栈',
    icon: '\u{1F5A5}',
    accentColor: '#c96442',
    items: [
      { name: 'React', value: 93 },
      { name: 'Vue3', value: 90 },
      { name: 'TypeScript', value: 92 },
      { name: 'Vite / Webpack', value: 89 },
    ],
  },
  {
    title: '后端协作',
    icon: '\u{1F6E0}',
    accentColor: '#c96442',
    items: [
      { name: 'Node.js / NestJS', value: 86 },
      { name: 'MySQL + Redis', value: 84 },
      { name: 'Prisma', value: 82 },
      { name: 'Docker Delivery', value: 80 },
    ],
  },
  {
    title: 'Web3 开发',
    icon: '\u{26D3}',
    accentColor: '#d97757',
    items: [
      { name: 'Ethers.js / Web3-React', value: 88 },
      { name: 'Solidity', value: 60 },
      { name: 'Hardhat', value: 70 },
      { name: 'IPFS', value: 70 },
    ],
  },
  {
    title: '工程化与架构',
    icon: '\u{1F9E9}',
    accentColor: '#d97757',
    items: [
      { name: 'Monorepo', value: 88 },
      { name: 'SOLID / IoC', value: 86 },
      { name: 'CI / CD', value: 88 },
      { name: 'Design system', value: 85 },
    ],
  },
  {
    title: '性能优化',
    icon: '\u{26A1}',
    accentColor: '#c96442',
    items: [
      { name: 'Core Web Vitals', value: 90 },
      { name: 'WASM Acceleration', value: 87 },
      { name: 'Web Worker Parallelism', value: 88 },
      { name: 'Performance Monitoring', value: 85 },
    ],
  },
  {
    title: '测试与自动化',
    icon: '\u{2705}',
    accentColor: '#d97757',
    items: [
      { name: 'Cypress E2E', value: 84 },
      { name: 'Jest Unit Test', value: 83 },
      { name: 'Hardhat Contract Test', value: 84 },
      { name: 'AI Agent Test Ideas', value: 82 },
    ],
  },
];

const skillGroupsEn: TSkillGroup[] = [
  {
    title: 'Frontend',
    icon: skillGroupsZh[0].icon,
    accentColor: '#c96442',
    items: skillGroupsZh[0].items,
  },
  {
    title: 'Engineering & architecture',
    icon: skillGroupsZh[3].icon,
    accentColor: '#d97757',
    items: skillGroupsZh[3].items,
  },
  {
    title: 'Performance',
    icon: skillGroupsZh[4].icon,
    accentColor: '#c96442',
    items: skillGroupsZh[4].items,
  },
  {
    title: 'Web3',
    icon: skillGroupsZh[2].icon,
    accentColor: '#d97757',
    items: skillGroupsZh[2].items,
  },
  {
    title: 'Backend collaboration',
    icon: skillGroupsZh[1].icon,
    accentColor: '#c96442',
    items: skillGroupsZh[1].items,
  },
  {
    title: 'Testing & automation',
    icon: skillGroupsZh[5].icon,
    accentColor: '#d97757',
    items: skillGroupsZh[5].items,
  },
];

const zhCatalog: SiteCatalog = {
  hero: {
    roles: ['全栈 + Web3 + AI 探索者', ''],
    githubLabel: 'GitHub / Little-Curry-Spicy',
    wechatLabel: `微信 · ${config.links.wechatId}`,
    visitorLabel: '访客',
  },
  about: {
    h2: '关于我.',
    content: `我的技术栈以前端为核心：日常主要使用 {{react}}、{{vue3}}、{{typescript}}、{{vite}} 构建可维护、可扩展的业务系统，并通过组件化与分层设计控制复杂度；在需要更强 SSR 能力或更快工具链时，我会引入 {{nextjs}} 与 {{bun}} 做针对性优化。

在工程化与后端协作上，我偏向稳定且可持续演进的方案，长期采用 {{nodejs}} + {{nestjs}}、{{mysql}} + {{redis}}、{{prisma}}、{{docker}}。从接口规范、错误处理到部署流程，我都更关注“可观测、可回滚、可追踪”，确保项目在迭代中保持交付质量与协作效率。

在 Web3 与性能方向，我持续投入 {{ethers}}、{{web3}}、{{solidity}}、{{hardhat}}、{{ipfs}}，并围绕 Core Web Vitals、WASM、Web Worker 与性能监控做长期实践。我的目标不是追求炫技，而是让系统在真实业务压力下依然保持稳定、流畅和可持续演进。`,
    quote: '千里之行，始于足下。',
    quoteAttribution: '——老子《道德经》',
  },
  experience: {
    title: '实践旅程.',
  },
  tech: {
    title: '我的工具箱.',
    groups: skillGroupsZh,
  },
  works: {
    title: '个人作品.',
    content: `可本地 / Docker 部署的开源工具（RAG 助手、简历–JD 匹配），以及 Flutter 跨端的 OTC 客户端示例；截图与说明见各仓库 README，卡片上图可点击放大浏览多张界面图。`,
    source: '源码',
    preview: '预览',
  },
  contact: {
    h2: '联系我.',
    quickLinksIntro: '发邮件之外，也可以直接通过这些方式找到我：',
    form: {
      name: { span: '怎么称呼你', placeholder: '留下你的名字' },
      email: { span: '邮箱', placeholder: '方便联系的邮箱' },
      message: { span: '想说的话', placeholder: '你想交流什么，都可以写在这里' },
    },
    alerts: {
      noKey: '未配置 Web3Forms Access Key，请先设置 VITE_WEB3FORMS_ACCESS_KEY。',
      success:
        '表单已提交成功。\n\n若你在收件箱里没看到通知：先查「垃圾邮件 / 广告邮件」；再到 Web3Forms 后台确认当前 Access Key 绑定的收件邮箱是否正确——官方只会把通知发到「创建密钥时登记的那个邮箱」，并不会按网站代码里 config 的邮箱另行投递。',
      fail: '发送失败了，稍后再试试。',
    },
    feedback: {
      dismiss: '好的',
      titleSuccess: '提交成功',
      titleError: '发送未成功',
      titleConfig: '需要配置密钥',
    },
    emailNotify: {
      fromName: 'Tang Shuokun · 作品集',
      subjectTemplate: '【官网联系】{name}',
      bodyTemplate: `您好，

您在个人作品集网站收到一条新的联系表单提交。

──────────────────
对方希望被称呼为
──────────────────
{name}

──────────────────
回信请使用以下邮箱（Reply-To 已指向此处）
──────────────────
{email}

──────────────────
留言正文
──────────────────
{message}

──────────────────
提交时的页面地址
──────────────────
{pageUrl}

（本通知由 Web3Forms 根据表单自动发送，非直发 HTML 模版。）`,
    },
    submit: '发送消息',
    submitting: '发送中...',
  },
  experiences: [
    {
      title: '北京 · 去中心化教育平台',
      companyName: '用 Next.js + NestJS + Solidity + IPFS 做一次 0-1 落地',
      icon: beijing,
      iconBg: '#E8E6DC',
      date: '2025.05 - 2025.11 · 北京',
      points: [
        '从 0 到 1 搭建去中心化教育平台，技术栈为 Next.js + NestJS + Solidity + IPFS。',
        '独立编写并迭代课程购买、评价等核心合约，持续关注权限、资金与重入风险。',
        '前端封装钱包连接、签名、网络切换与交易状态反馈，降低用户理解成本。',
        '通过批量交易与 Layer2 协同，用户交易成本约下降 40%。',
        '结合 IPFS Gateway + CDN，课程资源加载速度约提升 3 倍。',
      ],
    },
    {
      title: '浙江 · 国资治理 SaaS',
      companyName: '基于 Vue3 + TypeScript + 低代码构建多租户系统',
      icon: hangzhou,
      iconBg: '#E8E6DC',
      date: '2022.05 - 至今 · 浙江',
      points: [
        '参与省属国资治理 SaaS 建设，基于 Vue3 + TypeScript 实现多租户一体化交付。',
        '通过租户配置驱动菜单、路由与组件动态加载，整体维护成本约下降 70%。',
        '搭建低代码流程编排（拖拽表单 + JSON Schema 渲染），定制周期从约 2 周压缩到约 2 天。',
        '落地细粒度 RBAC，并结合路由守卫与 v-permission 完成前后端双重校验。',
        '项目获得国家级优秀应用认可，用户满意度约 95%。',
      ],
    },
    {
      title: '郑州 · OTC 交易系统',
      companyName: '高性能 + 跨端交付的前端架构实践',
      icon: zhengzhou,
      iconBg: '#E8E6DC',
      date: '2020.06 - 2022.05 · 郑州',
      points: [
        '主导 OTC 数字资产交易系统前端架构，覆盖行情、下单、风控、结算等关键链路。',
        '将计算密集逻辑拆分为 TypeScript + WebAssembly + Web Worker 组合，保证高峰期交互流畅。',
        '首屏白屏时间由 3.5s 降至 1.2s，降幅约 66%。',
        '核心加密模块经 WASM 重写后性能约提升 5 倍，TTI 提升约 60%。',
        '建立 Web/Android/iOS 跨端工程体系，代码复用约 85%，迭代效率提升约 50%。',
      ],
    },
  ],
  projects: [
    {
      name: 'TSK 个人信息助手',
      description:
        '面向个人介绍与面试准备的 RAG 应用：上传简历（txt/pdf/docx）、同步 GitHub 公开仓库写入向量库，在聊天里流式追问；Qdrant 双集合隔离简历与 GitHub，后端 NestJS + LangChain Agent。',
      tags: [
        { name: 'React' },
        { name: 'Vite' },
        { name: 'TypeScript' },
        { name: 'NestJS' },
        { name: 'LangChain' },
        { name: 'Qdrant' },
        { name: 'RAG' },
      ],
      images: aiAssistantImages,
      sourceCodeLink: 'https://github.com/Little-Curry-Spicy/ai_Personal_Information_Assistant',
      liveSiteLink: 'https://1996tsk.top/info/',
    },
    {
      name: 'Resume Matcher',
      description:
        '求职场景下简历与岗位 JD 对齐：上传 PDF/DOCX、粘贴 JD，一键得到差距分析、面试题预测与带修订标记的润色稿；Vue3 前端 + NestJS 接口，支持 Docker Compose 与本机草稿恢复。',
      tags: [
        { name: 'Vue3' },
        { name: 'Vite' },
        { name: 'TypeScript' },
        { name: 'NestJS' },
        { name: 'LLM' },
        { name: 'Docker' },
      ],
      images: resumeMatcherImages,
      sourceCodeLink: 'https://github.com/Little-Curry-Spicy/resume-matcher',
      liveSiteLink: 'https://1996tsk.top/resume/',
    },
    {
      name: 'OTC365 · Flutter',
      description:
        '基于 Flutter 的场外交易（OTC / P2P）客户端：资产看板、广告市场、订单与账户管理；Dio 网络层与拦截器、SharedPreferences、统一响应模型；同一套代码可构建 Android、iOS、Web 与桌面端。',
      tags: [
        { name: 'Flutter' },
        { name: 'Dart' },
        { name: 'Dio' },
        { name: 'Material' },
        { name: '跨端' },
      ],
      images: otcFlutterImages,
      sourceCodeLink: 'https://github.com/Little-Curry-Spicy/OTC-Flutter',
    },
  ],
};

const enCatalog: SiteCatalog = {
  hero: {
    roles: ['Full-stack + Web3 + AI Explorer', ''],
    githubLabel: 'GitHub / Little-Curry-Spicy',
    wechatLabel: `WeChat · ${config.links.wechatId}`,
    visitorLabel: 'visitors',
  },
  about: {
    h2: 'About.',
    content: `My core stack is frontend-focused: I build maintainable, scalable products with {{react}}, {{vue3}}, {{typescript}}, and {{vite}}, using component-driven architecture and clear layering to keep complexity under control. When SSR or tooling speed matters, I introduce {{nextjs}} and {{bun}} to optimize delivery.

For engineering and backend collaboration, I prefer stable workflows built on {{nodejs}} + {{nestjs}}, {{mysql}} + {{redis}}, {{prisma}}, and {{docker}}. From API contracts and error handling to CI/CD and deployment, I prioritize observability, rollback safety, and team-wide consistency.

On Web3 and performance work, I actively ship with {{ethers}}, {{web3}}, {{solidity}}, {{hardhat}}, and {{ipfs}}, while continuously improving Core Web Vitals, WASM usage, Web Worker parallelism, and performance monitoring. My focus is practical: build systems that remain reliable, fast, and evolvable under real production pressure.`,
    quote: 'The journey of a thousand miles begins with one step.',
    quoteAttribution: '— Lao Tzu, Tao Te Ching',
  },
  experience: {
    title: 'Journey.',
  },
  tech: {
    title: 'Toolbox.',
    groups: skillGroupsEn,
  },
  works: {
    title: 'Project.',
    content: `Open-source work you can run locally or with Docker (RAG assistant, résumé–JD matcher), plus a Flutter cross-platform OTC client sample. READMEs hold walkthroughs and UI shots—click a card image to browse captures.`,
    source: 'Source',
    preview: 'Live',
  },
  contact: {
    h2: 'Contact.',
    quickLinksIntro: 'Prefer something quicker? You can also reach me here:',
    form: {
      name: { span: 'Your name', placeholder: 'How should I call you?' },
      email: { span: 'Email', placeholder: 'Best email to reach you' },
      message: { span: 'Message', placeholder: 'What would you like to share?' },
    },
    alerts: {
      noKey: 'Web3Forms access key is missing. Set VITE_WEB3FORMS_ACCESS_KEY.',
      success:
        'Your message was submitted successfully.\n\nIf nothing arrives in your inbox: check Spam/Promotions; then open your Web3Forms dashboard and verify which email is linked to this access key—Web3Forms only delivers to that linked address (custom fields in your app do not change the recipient).',
      fail: 'Something went wrong. Please try again later.',
    },
    feedback: {
      dismiss: 'Got it',
      titleSuccess: 'Message sent',
      titleError: 'Could not send',
      titleConfig: 'Setup required',
    },
    emailNotify: {
      fromName: 'Tang Shuokun · Portfolio',
      subjectTemplate: '[Portfolio] Note from {name}',
      bodyTemplate: `Hello,

You have a new contact form submission on your portfolio site.

──────────────────
How they asked to be called
──────────────────
{name}

──────────────────
Reply-To address (use this to respond)
──────────────────
{email}

──────────────────
Message
──────────────────
{message}

──────────────────
Page where the form was sent
──────────────────
{pageUrl}

(This notification is sent by Web3Forms as plain text; custom HTML templates are not available on the form endpoint.)`,
    },
    submit: 'Send',
    submitting: 'Sending...',
  },
  experiences: [
    {
      title: 'Beijing · Decentralized education',
      companyName: '0→1 with Next.js + NestJS + Solidity + IPFS',
      icon: beijing,
      iconBg: '#E8E6DC',
      date: 'May 2025 – Nov 2025 · Beijing',
      points: [
        'Built a decentralized education platform end-to-end: Next.js + NestJS + Solidity + IPFS.',
        'Owned core contracts for purchase, reviews, and iteration; focused on permissions, funds, and reentrancy.',
        'Frontend: wallet connect, signing, network switching, and clear transaction feedback.',
        'Batch transactions + L2 cut user costs ~40%.',
        'IPFS gateway + CDN improved course asset load speed ~3×.',
      ],
    },
    {
      title: 'Zhejiang · State-owned SaaS',
      companyName: 'Vue3 + TypeScript + low-code multi-tenant system',
      icon: hangzhou,
      iconBg: '#E8E6DC',
      date: 'May 2022 – May 2025 · Zhejiang',
      points: [
        'Multi-tenant SOE governance SaaS on Vue3 + TypeScript.',
        'Tenant-driven menus, routes, and dynamic components; maintenance ~70% lower.',
        'Low-code flow builder (drag forms + JSON Schema); customization ~2 weeks → ~2 days.',
        'Fine-grained RBAC with route guards and v-permission for end-to-end checks.',
        'National recognition; ~95% user satisfaction at acceptance.',
      ],
    },
    {
      title: 'Zhengzhou · OTC trading',
      companyName: 'High-performance, cross-platform frontend',
      icon: zhengzhou,
      iconBg: '#E8E6DC',
      date: 'Jun 2020 – May 2022 · Zhengzhou',
      points: [
        'Led OTC trading frontend: quotes, orders, risk, settlement.',
        'TypeScript + WASM + Web Workers for heavy logic under peak load.',
        'First paint 3.5s → 1.2s (~66% improvement).',
        'Crypto hot path in WASM ~5× faster; TTI ~60% better.',
        'Web / Android / iOS shared ~85% code; iteration efficiency ~50% up.',
      ],
    },
  ],
  projects: [
    {
      name: 'TSK personal info assistant',
      description:
        'RAG for intros and interview prep: ingest résumé files (txt/pdf/docx) and public GitHub metadata into Qdrant (split collections), then chat with streaming replies. React + Vite front, NestJS + LangChain agent on the API side.',
      tags: zhCatalog.projects[0].tags,
      images: aiAssistantImages,
      sourceCodeLink: 'https://github.com/Little-Curry-Spicy/ai_Personal_Information_Assistant',
      liveSiteLink: 'https://github.com/Little-Curry-Spicy/ai_Personal_Information_Assistant#readme',
    },
    {
      name: 'Resume Matcher',
      description:
        'Align a résumé with a job description: upload PDF/DOCX, paste the JD, get gap analysis, likely interview questions, and a revision-marked polish pass. Vue3 SPA + NestJS; Docker Compose and local draft restore supported.',
      tags: zhCatalog.projects[1].tags,
      images: resumeMatcherImages,
      sourceCodeLink: 'https://github.com/Little-Curry-Spicy/resume-matcher',
      liveSiteLink: 'https://github.com/Little-Curry-Spicy/resume-matcher#readme',
    },
    {
      name: 'OTC365 · Flutter',
      description:
        'Flutter OTC/P2P client: asset dashboard, ad marketplace, orders, and account flows; Dio with interceptors, SharedPreferences, and a unified response model. One codebase targets Android, iOS, Web, and desktop.',
      tags: [
        { name: 'Flutter' },
        { name: 'Dart' },
        { name: 'Dio' },
        { name: 'Material' },
        { name: 'Multi-platform' },
      ],
      images: otcFlutterImages,
      sourceCodeLink: 'https://github.com/Little-Curry-Spicy/OTC-Flutter',
    },
  ],
};

export function getCatalog(locale: Locale): SiteCatalog {
  return locale === 'en' ? enCatalog : zhCatalog;
}
