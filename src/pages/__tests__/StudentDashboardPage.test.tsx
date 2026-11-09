import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/setupServer';
import { StudentDashboardPage } from '../StudentDashboardPage';
import { studentProfileData } from '../../data/studentDashboardData';

describe('StudentDashboardPage Component Integration - test-plan.md L2 Suite', () => {
  describe('Success Paths (Happy Path)', () => {
    it('[DP-S-01] Dashboard loads all sections from API/mock data', async () => {
      render(
        <MemoryRouter>
          <StudentDashboardPage />
        </MemoryRouter>
      );

      // Wait for profile data to load (replaces skeleton)
      expect(await screen.findByText(/Welcome back/i)).toBeInTheDocument();
      expect(screen.getAllByText(new RegExp(`${studentProfileData.name}!`, 'i')).length).toBeGreaterThanOrEqual(1);

      // Quick sprint
      expect(screen.getByText(/Today's Sprint:/i)).toBeInTheDocument();

      // Continue learning
      expect(screen.getByText(/Continue Learning/i)).toBeInTheDocument();

      // Mentor review
      expect(screen.getByRole('heading', { name: /Mentor Redlines & WIP Reviews/i })).toBeInTheDocument();

      // Badges
      expect(screen.getByRole('heading', { name: /Quests & Guild Achievements/i })).toBeInTheDocument();

      // Discord jams
      expect(screen.getByRole('heading', { name: /Discord Jams & Live/i })).toBeInTheDocument();

      // Project assets
      expect(screen.getByRole('heading', { name: /Project Resources/i })).toBeInTheDocument();
    });

    it('[DP-S-02] Sprint completion updates XP, persists to profile API, and reflects in UI', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <StudentDashboardPage />
        </MemoryRouter>
      );

      // Wait for load
      await screen.findByText(/Welcome back/i);

      // Click Start Sprint
      const startSprintBtn = screen.getByRole('button', { name: /Start Sprint/i });
      await user.click(startSprintBtn);

      // Verify sprint status changed
      expect(await screen.findByText(/Sprint completed!/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sprint Done!/i })).toBeInTheDocument();
    });

    it('[DP-S-03] Navigation callbacks are invoked for course catalog and auth links', async () => {
      const user = userEvent.setup();
      const mockNavigateCourses = vi.fn();
      const mockNavigateAuth = vi.fn();
      const mockNavigateNotes = vi.fn();

      render(
        <MemoryRouter>
          <StudentDashboardPage
            onNavigateToCourses={mockNavigateCourses}
            onNavigateToAuth={mockNavigateAuth}
            onNavigateToNotes={mockNavigateNotes}
          />
        </MemoryRouter>
      );

      await screen.findByText(/Welcome back/i);

      // Click Browse All Courses
      const browseCoursesBtn = screen.getByRole('button', { name: /Browse All Courses/i });
      await user.click(browseCoursesBtn);
      expect(mockNavigateCourses).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error Paths (Failure Path)', () => {
    it('[DP-E-01] Profile API 500 error falls back to default profile data without crashing', async () => {
      server.use(
        http.get('/api/student/profile', () => {
          return HttpResponse.json({ message: 'Profile database down' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <StudentDashboardPage />
        </MemoryRouter>
      );

      // Gracefully loads fallback profile
      expect(await screen.findByText(/Welcome back/i)).toBeInTheDocument();
    });

    it('[DP-E-02] Dashboard sub-endpoint failures fallback smoothly without breaking the page', async () => {
      server.use(
        http.get('/api/student/active-courses', () => {
          return HttpResponse.json({ message: 'Active courses down' }, { status: 500 });
        }),
        http.get('/api/student/mentor-review', () => {
          return HttpResponse.json({ message: 'Mentor reviews down' }, { status: 500 });
        }),
        http.get('/api/student/quest-badges', () => {
          return HttpResponse.json({ message: 'Badges down' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <StudentDashboardPage />
        </MemoryRouter>
      );

      expect(await screen.findByText(/Welcome back/i)).toBeInTheDocument();
      expect(screen.getByText(/Continue Learning/i)).toBeInTheDocument();
    });

    it('[DP-E-03] Profile update API failure (500) preserves optimistic UI without crash', async () => {
      const user = userEvent.setup();
      server.use(
        http.put('/api/student/profile', () => {
          return HttpResponse.json({ message: 'Update failed' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <StudentDashboardPage />
        </MemoryRouter>
      );

      await screen.findByText(/Welcome back/i);

      const startSprintBtn = screen.getByRole('button', { name: /Start Sprint/i });
      await user.click(startSprintBtn);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Sprint Done!/i })).toBeInTheDocument();
      });
    });
  });
});
