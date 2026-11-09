import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

async function prepareApp() {
  const isDev = import.meta.env.DEV;
  const enableMswEnv = import.meta.env.VITE_ENABLE_MSW;
  
  // Enable MSW in dev by default, or in production if VITE_ENABLE_MSW is explicitly true
  // or on static preview deployments (when no real backend URL is specified)
  const shouldStartMsw =
    enableMswEnv === 'true' ||
    (isDev && enableMswEnv !== 'false') ||
    (!isDev && !import.meta.env.VITE_API_BASE_URL && enableMswEnv !== 'false');

  if (shouldStartMsw) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledFrame: 'bypass',
    });
  }
}

prepareApp().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
