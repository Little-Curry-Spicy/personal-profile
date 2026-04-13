type TSection = {
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  /** Hero 区社交联系方式（按需改成你的 X / 微信号） */
  links: {
    twitterUrl: string;
    twitterLabel: string;
    /** 微信号（仅 ID，展示文案由 i18n catalog.hero.wechatLabel 按语言拼接） */
    wechatId: string;
  };
  /** 首页右下角助手浮标内嵌的个人信息查询页 */
  personalInfoEmbedUrl: string;
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
};

export const config: TConfig = {
  html: {
    title: 'Tang Shuokun',
    fullName: 'Tang Shuokun',
    email: 'tskwangyi@163.com',
  },
  links: {
    twitterUrl: 'https://x.com/ShuokunT',
    twitterLabel: 'X / @ShuokunT',
    wechatId: 'cc2939117014',
  },
  personalInfoEmbedUrl: 'https://1996tsk.top/info/',
  hero: {
    name: 'Tang Shuokun',
    p: ['前端创作者', 'Web3 产品协作开发者'],
  },
  contact: {
    h2: '联系我.',
    form: {
      name: {
        span: '怎么称呼你',
        placeholder: '留下你的名字',
      },
      email: { span: '邮箱', placeholder: '方便联系的邮箱' },
      message: {
        span: '想说的话',
        placeholder: '你想交流什么，都可以写在这里',
      },
    },
  },
};
