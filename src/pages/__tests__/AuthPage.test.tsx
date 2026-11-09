import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/setupServer';
import AuthPage from '../AuthPage';

describe('AuthPage Component Integration - test-plan.md L2 Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // =========================================================================
  // 4.3 SUCCESS PATH (AP-S-01 to AP-S-08)
  // =========================================================================
  describe('Success Paths (Happy Path)', () => {
    it('[AP-S-01] Register success stores token/user, shows welcome toast, and navigates after timeout', async () => {
      const user = userEvent.setup();
      const mockNavigateDashboard = vi.fn();

      render(
        <MemoryRouter>
          <AuthPage onNavigateToDashboard={mockNavigateDashboard} />
        </MemoryRouter>
      );

      // In register mode by default
      const nameInput = screen.getByPlaceholderText(/What should mentors call you\?/i);
      const emailInput = screen.getByPlaceholderText(/your\.best\.creative@inbox\.com/i);
      const passwordInput = screen.getByPlaceholderText(/8\+ characters with high energy ⚡/i);

      await user.type(nameInput, 'Taylor Creator');
      await user.type(emailInput, 'taylor@creator.com');
      await user.type(passwordInput, 'securepass123');

      const submitButton = screen.getByRole('button', { name: /Claim Your Free Pass/i });
      await user.click(submitButton);

      // Toast appears
      expect(await screen.findByText(/Welcome to SkillPop/i)).toBeInTheDocument();

      // Tokens stored
      expect(localStorage.getItem('skillpop_token')).toBeTruthy();
      expect(localStorage.getItem('skillpop_user')).toContain('taylor@creator.com');

      // Navigation callback called after delay (~700ms)
      await waitFor(
        () => {
          expect(mockNavigateDashboard).toHaveBeenCalled();
        },
        { timeout: 2000 }
      );
    });

    it('[AP-S-02] Login success stores token/user, shows toast, and triggers navigation', async () => {
      const user = userEvent.setup();
      const mockNavigateCourses = vi.fn();

      render(
        <MemoryRouter>
          <AuthPage onNavigateToCourses={mockNavigateCourses} />
        </MemoryRouter>
      );

      // Switch to Login tab
      await user.click(screen.getByRole('button', { name: /Log In/i }));

      const emailInput = screen.getByPlaceholderText(/your\.best\.creative@inbox\.com/i);
      const passwordInput = screen.getByPlaceholderText(/8\+ characters with high energy ⚡/i);

      await user.type(emailInput, 'alex@creator.com');
      await user.type(passwordInput, 'validpass123');

      const submitButton = screen.getByRole('button', { name: /Jump Back In ⚡/i });
      await user.click(submitButton);

      expect(await screen.findByText(/Welcome back/i)).toBeInTheDocument();
      expect(localStorage.getItem('skillpop_token')).toBeTruthy();

      await waitFor(
        () => {
          expect(mockNavigateCourses).toHaveBeenCalled();
        },
        { timeout: 2000 }
      );
    });

    it('[AP-S-03] Mode switching toggles between Sign Up and Log In forms with appropriate button text', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );

      // Initial state is Register
      expect(screen.getByRole('button', { name: /Claim Your Free Pass/i })).toBeInTheDocument();

      // Switch to Login
      await user.click(screen.getByRole('button', { name: /Log In/i }));
      expect(screen.getByRole('button', { name: /Jump Back In ⚡/i })).toBeInTheDocument();

      // Switch back to Register
      await user.click(screen.getByRole('button', { name: /Sign Up \/ Register/i }));
      expect(screen.getByRole('button', { name: /Claim Your Free Pass/i })).toBeInTheDocument();
    });

    it('[AP-S-04] Show/hide password toggles input type between password and text', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );

      const passwordInput = screen.getByPlaceholderText(/8\+ characters with high energy ⚡/i);
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Click visibility toggle
      const toggleVisibilityBtn = screen.getByTitle(/Show password/i);
      await user.click(toggleVisibilityBtn);
      expect(passwordInput).toHaveAttribute('type', 'text');

      // Click again to hide
      const hideVisibilityBtn = screen.getByTitle(/Hide password/i);
      await user.click(hideVisibilityBtn);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('[AP-S-05] Track selection updates selected creative track', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );

      // Select 'Product / UI' track radio option
      const uiTrackLabel = screen.getByText(/Product \/ UI/i);
      await user.click(uiTrackLabel);

      const uiRadio = screen.getByDisplayValue('uiux') as HTMLInputElement;
      expect(uiRadio.checked).toBe(true);
    });

    it('[AP-S-06] Social sign-in simulation buttons show simulated toast', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );

      const googleBtn = screen.getByRole('button', { name: /Google/i });
      await user.click(googleBtn);

      expect(await screen.findByText(/Google Sign-In simulated successfully/i)).toBeInTheDocument();
    });

    it('[AP-S-07] Forgot password in login mode shows reset toast', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );

      // Switch to Login mode
      await user.click(screen.getByRole('button', { name: /Log In/i }));

      const forgotPasswordBtn = screen.getByRole('button', { name: /Forgot password\?/i });
      await user.click(forgotPasswordBtn);

      expect(await screen.findByText(/Password reset instructions sent to your email/i)).toBeInTheDocument();
    });

    it('[AP-S-08] Submitting state disables button and displays processing status', async () => {
      // Intercept with delay
      server.use(
        http.post('/api/auth/register', async () => {
          await new Promise((r) => setTimeout(r, 600));
          return HttpResponse.json(
            { token: 'tk', user: { id: '1', name: 'A', email: 'a@a.com', track: '3d' } },
            { status: 201 }
          );
        })
      );

      const { container } = render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );

      const form = container.querySelector('form')!;
      fireEvent.change(screen.getByPlaceholderText(/What should mentors call you\?/i), {
        target: { value: 'Name' },
      });
      fireEvent.change(screen.getByPlaceholderText(/your\.best\.creative@inbox\.com/i), {
        target: { value: 'test@creator.com' },
      });
      fireEvent.change(screen.getByPlaceholderText(/8\+ characters with high energy ⚡/i), {
        target: { value: 'password123' },
      });

      fireEvent.submit(form);

      // Assert processing state
      expect(screen.getByText(/Processing\.\.\./i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Processing\.\.\./i })).toBeDisabled();
    });
  });

  // =========================================================================
  // 5.3 ERROR PATH (AP-E-01 to AP-E-06)
  // =========================================================================
  describe('Error Paths (Failure Path)', () => {
    it('[AP-E-01] Short password (<6 chars) triggers client validation error without making API request', async () => {
      let apiCalled = false;
      server.use(
        http.post('/api/auth/register', () => {
          apiCalled = true;
          return HttpResponse.json({});
        })
      );

      const { container } = render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );

      const form = container.querySelector('form')!;
      fireEvent.change(screen.getByPlaceholderText(/What should mentors call you\?/i), {
        target: { value: 'Creator' },
      });
      fireEvent.change(screen.getByPlaceholderText(/your\.best\.creative@inbox\.com/i), {
        target: { value: 'short@creator.com' },
      });
      fireEvent.change(screen.getByPlaceholderText(/8\+ characters with high energy ⚡/i), {
        target: { value: '12345' },
      });

      fireEvent.submit(form);

      expect(screen.getByText(/Password must be at least 6 characters long\./i)).toBeInTheDocument();
      expect(apiCalled).toBe(false);
    });

    it('[AP-E-02] Login server error (401) renders error message and re-enables button', async () => {
      const user = userEvent.setup();
      server.use(
        http.post('/api/auth/login', () => {
          return HttpResponse.json({ message: 'Invalid credentials provided' }, { status: 401 });
        })
      );

      render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );

      await user.click(screen.getByRole('button', { name: /Log In/i }));
      await user.type(screen.getByPlaceholderText(/your\.best\.creative@inbox\.com/i), 'wrong@creator.com');
      await user.type(screen.getByPlaceholderText(/8\+ characters with high energy ⚡/i), 'wrongpass');

      await user.click(screen.getByRole('button', { name: /Jump Back In ⚡/i }));

      expect(await screen.findByText('Invalid credentials provided')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Jump Back In ⚡/i })).not.toBeDisabled();
    });

    it('[AP-E-03] Register server error (500) displays error alert and preserves form input', async () => {
      server.use(
        http.post('/api/auth/register', () => {
          return HttpResponse.json({ message: 'Registration server unavailable' }, { status: 500 });
        })
      );

      const { container } = render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );

      const form = container.querySelector('form')!;
      const emailInput = screen.getByPlaceholderText(/your\.best\.creative@inbox\.com/i);
      fireEvent.change(screen.getByPlaceholderText(/What should mentors call you\?/i), {
        target: { value: 'Preserve Name' },
      });
      fireEvent.change(emailInput, { target: { value: 'preserve@creator.com' } });
      fireEvent.change(screen.getByPlaceholderText(/8\+ characters with high energy ⚡/i), {
        target: { value: 'validpass123' },
      });

      fireEvent.submit(form);

      expect(await screen.findByText('Registration server unavailable')).toBeInTheDocument();
      expect(emailInput).toHaveValue('preserve@creator.com');
      expect(localStorage.getItem('skillpop_token')).toBeNull();
    });

    it('[AP-E-04] Network failure shows fallback error without crashing', async () => {
      server.use(
        http.post('/api/auth/register', () => {
          return HttpResponse.error();
        })
      );

      const { container } = render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );

      const form = container.querySelector('form')!;
      fireEvent.change(screen.getByPlaceholderText(/What should mentors call you\?/i), {
        target: { value: 'Network Name' },
      });
      fireEvent.change(screen.getByPlaceholderText(/your\.best\.creative@inbox\.com/i), {
        target: { value: 'network@creator.com' },
      });
      fireEvent.change(screen.getByPlaceholderText(/8\+ characters with high energy ⚡/i), {
        target: { value: 'validpass123' },
      });

      fireEvent.submit(form);

      expect(await screen.findByText(/failed/i)).toBeInTheDocument();
    });

    it('[AP-E-05] Error clears when user resubmits the form', async () => {
      const { container } = render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );

      const form = container.querySelector('form')!;
      const passwordInput = screen.getByPlaceholderText(/8\+ characters with high energy ⚡/i);

      fireEvent.change(screen.getByPlaceholderText(/What should mentors call you\?/i), {
        target: { value: 'Fix User' },
      });
      fireEvent.change(screen.getByPlaceholderText(/your\.best\.creative@inbox\.com/i), {
        target: { value: 'fix@creator.com' },
      });
      fireEvent.change(passwordInput, { target: { value: '123' } });

      // Trigger client error
      fireEvent.submit(form);
      expect(screen.getByText(/Password must be at least 6 characters long\./i)).toBeInTheDocument();

      // Fix error and re-submit
      fireEvent.change(passwordInput, { target: { value: '456789' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.queryByText(/Password must be at least 6 characters long\./i)).toBeNull();
      });
    });

    it('[AP-E-06] HTML5 required validation prevents submission when fields are empty', () => {
      render(
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/your\.best\.creative@inbox\.com/i);
      expect(emailInput).toBeRequired();

      const passwordInput = screen.getByPlaceholderText(/8\+ characters with high energy ⚡/i);
      expect(passwordInput).toBeRequired();

      const termsCheckbox = screen.getByRole('checkbox');
      expect(termsCheckbox).toBeRequired();
    });
  });
});
