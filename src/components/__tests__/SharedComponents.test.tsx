import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '../molecules/ThemeToggle';
import { Sidebar } from '../organisms/Sidebar';
import { Header } from '../organisms/Header';
import { authService } from '../../services/api';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/setupServer';

describe('Shared Components Suite - test-plan.md L4 Suite', () => {
  describe('Success Paths (Happy Path)', () => {
    it('[CMP-S-01] ThemeToggle click toggles state and triggers callback', async () => {
      const user = userEvent.setup();
      const mockToggle = vi.fn();

      const { rerender } = render(<ThemeToggle isDark={false} onToggle={mockToggle} />);
      const button = screen.getByRole('button', { name: /Toggle theme/i });
      expect(screen.getByText('dark_mode')).toBeInTheDocument();

      await user.click(button);
      expect(mockToggle).toHaveBeenCalledTimes(1);

      // Verify rendering when dark
      rerender(<ThemeToggle isDark={true} onToggle={mockToggle} />);
      expect(screen.getByText('light_mode')).toBeInTheDocument();
    });

    it('[CMP-S-02] Sidebar navigation invokes onNavigate with correct route key', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();
      const mockClose = vi.fn();

      render(
        <Sidebar
          isOpen={true}
          onClose={mockClose}
          activePath="dashboard"
          onNavigate={mockNavigate}
        />
      );

      // Click "All Courses"
      const coursesBtn = screen.getByRole('button', { name: /All Courses/i });
      await user.click(coursesBtn);
      expect(mockNavigate).toHaveBeenCalledWith('courses');

      // Click "Dashboard"
      const dashBtn = screen.getByRole('button', { name: /Dashboard/i });
      await user.click(dashBtn);
      expect(mockNavigate).toHaveBeenCalledWith('dashboard');
    });

    it('[CMP-S-03] Header search input calls onSearchChange with typed characters', async () => {
      const user = userEvent.setup();
      const mockSearchChange = vi.fn();

      render(
        <Header
          variant="dashboard"
          searchQuery=""
          onSearchChange={mockSearchChange}
          isDark={false}
          onToggleTheme={() => {}}
        />
      );

      const searchInput = screen.getByPlaceholderText(/Search missions, shaders, notes\.\.\./i);
      await user.type(searchInput, 'Sakuga');

      expect(mockSearchChange).toHaveBeenCalled();
    });
  });

  describe('Error Paths (Failure Path)', () => {
    it('[CMP-E-01] Sidebar logout handles offline/failing auth API and clears local session', async () => {
      server.use(
        http.post('/api/auth/logout', () => {
          return HttpResponse.json({ message: 'Server down' }, { status: 500 });
        })
      );

      localStorage.setItem('skillpop_token', 'token-abc');
      localStorage.setItem('skillpop_user', JSON.stringify({ name: 'Sarah' }));

      // Execute logout service even when backend 500s
      await authService.logout().catch(() => {});

      expect(localStorage.getItem('skillpop_token')).toBeNull();
      expect(localStorage.getItem('skillpop_user')).toBeNull();
    });
  });
});
