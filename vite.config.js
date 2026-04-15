import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL.replace(/\/$/, '');
  const htmlTitle = env.VITE_HTML_TITLE;
  const ogTitle = env.VITE_OG_TITLE;
  const ogDescription = env.VITE_OG_DESCRIPTION;
  const cfWebAnalyticsToken = env.VITE_CF_WEB_ANALYTICS_TOKEN?.trim() ?? '';
  const cfWebAnalyticsScript = cfWebAnalyticsToken
    ? `<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token":"${cfWebAnalyticsToken}"}'></script>`
    : '';

  return {
    /** 小于此大小的资源会内联为 data: URL；DotLottie 对 data: 支持不稳定，故压低阈值让 robo.lottie 始终输出为独立文件 */
    build: {
      assetsInlineLimit: 2000,
    },
    plugins: [
      tailwindcss(),
      react(),
      {
        name: 'html-seo-placeholders',
        transformIndexHtml(html) {
          return html
            .replaceAll('%HTML_TITLE%', htmlTitle)
            .replaceAll('%OG_TITLE%', ogTitle)
            .replaceAll('%OG_DESCRIPTION%', ogDescription)
            .replaceAll('%SITE_URL%', siteUrl)
            .replaceAll('%CF_WEB_ANALYTICS_SCRIPT%', cfWebAnalyticsScript);
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
