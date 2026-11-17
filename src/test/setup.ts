import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './setupServer';
import { resetMockData } from '../mocks/handlers';
import { useThemeStore } from '../stores/useThemeStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useNotesStore } from '../stores/useNotesStore';

const initialThemeState = useThemeStore.getState();
const initialAuthState = useAuthStore.getState();
const initialNotesState = useNotesStore.getState();

// Mock window.matchMedia for JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock window.scrollTo for JSDOM
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});

// Mock IntersectionObserver for JSDOM (used in RevealOnScroll / useScrollAnimation)
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
beforeAll(() => (server.listen as any)({ onUnhandledRequest: 'error' }));
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
  resetMockData();
  useThemeStore.setState(initialThemeState, true);
  useAuthStore.setState(initialAuthState, true);
  useNotesStore.setState(initialNotesState, true);
  document.documentElement.classList.remove('dark');
  if (document.body) {
    document.body.classList.remove('dark');
  }
});
afterAll(() => server.close());
