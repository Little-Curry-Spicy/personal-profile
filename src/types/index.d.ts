export type TCommonProps = {
  title?: string;
  name?: string;
  icon?: string;
};

export type TExperience = {
  companyName: string;
  iconBg: string;
  date: string;
  points: string[];
} & Required<Omit<TCommonProps, 'name'>>;

export type TProject = {
  description: string;
  tags: {
    name: string;
  }[];
  images: string[];
  sourceCodeLink: string;
  /** 无线上预览时省略，卡片底部仅展示源码入口 */
  liveSiteLink?: string;
} & Required<Pick<TCommonProps, 'name'>>;

export type TNavLink = {
  id: string;
  /** 若设置则使用独立路由，否则为首页锚点 */
  path?: string;
} & Required<Pick<TCommonProps, 'title'>>;

export type TMotion = {
  direction: 'up' | 'down' | 'left' | 'right' | '';
  type: 'tween' | 'spring' | 'inertia' | 'keyframes' | '';
  delay: number;
  duration: number;
};
