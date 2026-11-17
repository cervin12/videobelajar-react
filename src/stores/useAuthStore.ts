import { create } from 'zustand';
import { authService } from '../services';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  track?: string;
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: { email: string; password?: string }) => Promise<{
    token: string;
    user: AuthUser;
  }>;
  register: (payload: {
    fullName: string;
    email: string;
    password?: string;
    selectedTrack: string;
  }) => Promise<{
    token: string;
    user: AuthUser;
  }>;
  logout: () => Promise<void>;
  clearError: () => void;
  setUser: (user: AuthUser | null) => void;
}

const getInitialUser = (): AuthUser | null => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('skillpop_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
  return null;
};

const getInitialToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('skillpop_token');
  }
  return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(),
  token: getInitialToken(),
  isAuthenticated: !!getInitialToken(),
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authService.login(credentials);
      if (typeof window !== 'undefined') {
        localStorage.setItem('skillpop_token', res.token);
        localStorage.setItem('skillpop_user', JSON.stringify(res.user));
      }
      set({
        user: res.user,
        token: res.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return res;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed. Please check your details.';
      set({ error: msg, isLoading: false });
      throw err;
    }
  },

  register: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authService.register(payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('skillpop_token', res.token);
        localStorage.setItem('skillpop_user', JSON.stringify(res.user));
      }
      set({
        user: res.user,
        token: res.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return res;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please check your details.';
      set({ error: msg, isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
    } finally {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  clearError: () => set({ error: null }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
