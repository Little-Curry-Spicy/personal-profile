/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Cloudflare Web Analytics token（dashboard 中复制） */
  readonly VITE_CF_WEB_ANALYTICS_TOKEN?: string;
  /** 站点根 URL，用于 OG / canonical（build 时写入 index.html） */
  readonly VITE_SITE_URL?: string;
  readonly VITE_HTML_TITLE?: string;
  readonly VITE_OG_TITLE?: string;
  readonly VITE_OG_DESCRIPTION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.lottie' {
  const src: string;
  export default src;
}

declare module '*.lottie?url' {
  const src: string;
  export default src;
}
