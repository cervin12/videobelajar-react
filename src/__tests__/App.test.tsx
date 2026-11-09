import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Component Navigation - test-plan.md L3 Suite', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  describe('Success Paths (Happy Path)', () => {
    it('[APP-S-01] Default view: renders LandingPage when hash is empty', () => {
      window.location.hash = '';
      render(<App />);

      expect(screen.getByRole('button', { name: /🚀 Landing Page/i })).toBeInTheDocument();
    });

    it('[APP-S-02] Initial hash routes to corresponding views', () => {
      // Test #auth
      window.location.hash = '#auth';
      const { unmount } = render(<App />);
      expect(screen.getByText(/Sign Up \/ Register/i)).toBeInTheDocument();
      unmount();

      // Test #notes
      window.location.hash = '#notes';
      const { unmount: unmountNotes } = render(<App />);
      expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
      unmountNotes();

      // Test #courses
      window.location.hash = '#courses';
      const { unmount: unmountCourses } = render(<App />);
      expect(screen.getByText(/Core Masterclass Catalog/i)).toBeInTheDocument();
      unmountCourses();
    });

    it('[APP-S-03] Floating switcher buttons switch pages and update hash', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Switch to Course Catalog
      const courseBtn = screen.getByRole('button', { name: /📚 Course Catalog/i });
      await user.click(courseBtn);
      expect(window.location.hash).toBe('#courses');
      expect(screen.getByText(/Core Masterclass Catalog/i)).toBeInTheDocument();

      // Switch to Auth Page
      const authBtn = screen.getByRole('button', { name: /🔐 Auth Page/i });
      await user.click(authBtn);
      expect(window.location.hash).toBe('#auth');
      expect(screen.getByText(/Sign Up \/ Register/i)).toBeInTheDocument();
    });

    it('[APP-S-04] Responds to hashchange window event dynamically', () => {
      render(<App />);

      act(() => {
        window.location.hash = '#auth';
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      });

      expect(screen.getByText(/Sign Up \/ Register/i)).toBeInTheDocument();
    });
  });

  describe('Error Paths (Failure Path)', () => {
    it('[APP-E-01] Unknown hash defaults safely to LandingPage', () => {
      window.location.hash = '#unknown-random-route-404';
      render(<App />);

      // Landing page switcher active button is landing
      const landingBtn = screen.getByRole('button', { name: /🚀 Landing Page/i });
      expect(landingBtn).toHaveClass('bg-[#A3E635]');
    });
  });
});
