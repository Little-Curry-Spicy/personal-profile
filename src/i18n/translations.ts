export type Locale = 'zh' | 'en';

const zh = {
  nav: {
    home: '首页',
    about: '关于我',
    work: '旅程',
    contact: '联系',
  },
  theme: {
    useLight: '切换到阳光模式',
    useDark: '切换到黑夜模式',
    lightShort: '光',
    darkShort: '夜',
  },
  lang: {
    switchToEn: 'English',
    switchToZh: '中文',
    toggleGroup: '界面语言',
  },
  a11y: {
    openAssistant: '打开个人信息查询',
    menu: '菜单',
  },
  infoEmbed: {
    title: '个人信息查询',
    close: '关闭',
  },
  notFound: {
    title: '页面不存在',
    body: '链接可能已经失效，或页面已被移动。',
    backHome: '回到首页',
  },
  hero: {
    hi: 'Hi，我是',
    hiEn: "Hi, I'm",
  },
};

const en = {
  nav: {
    home: 'Home',
    about: 'About',
    work: 'Journey',
    contact: 'Contact',
  },
  theme: {
    useLight: 'Switch to light mode',
    useDark: 'Switch to dark mode',
    lightShort: 'Light',
    darkShort: 'Dark',
  },
  lang: {
    switchToEn: 'English',
    switchToZh: '中文',
    toggleGroup: 'Language',
  },
  a11y: {
    openAssistant: 'Open personal information',
    menu: 'Menu',
  },
  infoEmbed: {
    title: 'Personal information',
    close: 'Close',
  },
  notFound: {
    title: 'Page not found',
    body: 'This link may be outdated or the page has moved.',
    backHome: 'Back to home',
  },
  hero: {
    hi: 'Hi，我是',
    hiEn: "Hi, I'm",
  },
};

export const translations = { zh, en } as const;
