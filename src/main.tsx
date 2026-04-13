import ReactDOM from 'react-dom/client';

import App from './App';
import { AppProviders } from './context/AppProviders';
import { getStoredLocale } from './context/I18nContext';
import { applyThemeClassToDocument, getStoredTheme } from './context/ThemeContext';
import './globals.css';

applyThemeClassToDocument(getStoredTheme());
document.documentElement.lang = getStoredLocale() === 'zh' ? 'zh-CN' : 'en';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>
);
