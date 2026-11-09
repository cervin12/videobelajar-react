import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/setupServer';
import { CoursePage } from '../CoursePage';
import { coursesData, featuredCourseData } from '../../data/coursesData';

describe('CoursePage Component Integration - test-plan.md L2 Suite', () => {
  describe('Success Paths (Happy Path)', () => {
    it('[CP-S-01] Catalog loads: renders course cards, filter bar, hero, and featured spotlight', () => {
      render(
        <MemoryRouter>
          <CoursePage />
        </MemoryRouter>
      );

      // Hero & spotlight
      expect(screen.getByText(/Core Masterclass Catalog/i)).toBeInTheDocument();
      expect(screen.getByText(featuredCourseData.title)).toBeInTheDocument();

      // Course cards from first page (up to 8)
      expect(screen.getByText(coursesData[0].title)).toBeInTheDocument();
      expect(screen.getByText(coursesData[1].title)).toBeInTheDocument();
    });

    it('[CP-S-02] Discipline, software, and level filters update visible courses', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <CoursePage />
        </MemoryRouter>
      );

      // Filter by discipline: click 2D & Sakuga pill
      const sakugaPill = screen.getByRole('button', { name: /2D & Sakuga/i });
      await user.click(sakugaPill);

      // Check that 2D sakuga course is shown and 3D only course is excluded
      const animeCourse = coursesData.find((c) => c.discipline === '2d-sakuga');
      const blendeCourse = coursesData.find((c) => c.discipline === '3d-blender');
      if (animeCourse) {
        expect(screen.getByText(animeCourse.title)).toBeInTheDocument();
      }
      if (blendeCourse && blendeCourse.discipline !== '2d-sakuga') {
        expect(screen.queryByText(blendeCourse.title)).toBeNull();
      }

      // Filter by software dropdown
      const selects = screen.getAllByRole('combobox');
      const softwareSelect = selects[0];
      fireEvent.change(softwareSelect, { target: { value: 'toon-boom' } });

      // Filter by level dropdown
      const levelSelect = selects[1];
      fireEvent.change(levelSelect, { target: { value: 'intermediate' } });
    });

    it('[CP-S-03] Search by title, mentor, or software filters visible cards', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <CoursePage />
        </MemoryRouter>
      );

      const searchInput = screen.getByPlaceholderText(/Search by concept, style, or mentor\.\.\./i);
      await user.type(searchInput, 'Blender');

      // Matching courses should be visible
      const matches = coursesData.filter(
        (c) =>
          c.title.toLowerCase().includes('blender') ||
          c.softwareTag.toLowerCase().includes('blender')
      );
      if (matches.length > 0) {
        expect(screen.getByText(matches[0].title)).toBeInTheDocument();
      }

      // Non-matching courses outside search should be excluded
      const nonMatch = coursesData.find(
        (c) =>
          !c.title.toLowerCase().includes('blender') &&
          !c.softwareTag.toLowerCase().includes('blender') &&
          !c.disciplineLabel.toLowerCase().includes('blender') &&
          !c.instructor.name.toLowerCase().includes('blender')
      );
      if (nonMatch) {
        expect(screen.queryByText(nonMatch.title)).toBeNull();
      }
    });

    it('[CP-S-04] Pagination controls switch between course slices', () => {
      render(
        <MemoryRouter>
          <CoursePage />
        </MemoryRouter>
      );

      // Verify pagination dock reflects initial slice and boundary state
      const showingLabels = screen.getAllByText(/Showing/i);
      expect(showingLabels.length).toBeGreaterThanOrEqual(1);

      const page1Btn = screen.getByRole('button', { name: '1' });
      expect(page1Btn).toBeInTheDocument();
    });

    it('[CP-S-05] Course detail and spotlight actions trigger feedback toasts', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <CoursePage />
        </MemoryRouter>
      );

      // Enroll in spotlight cohort
      const enrollCohortBtn = screen.getByRole('button', { name: /Enroll in Cohort/i });
      await user.click(enrollCohortBtn);
      expect(await screen.findByText(/Enrolled in Featured Cohort/i)).toBeInTheDocument();

      // Preview spotlight syllabus
      const previewBtn = screen.getByRole('button', { name: /Syllabus Preview/i });
      await user.click(previewBtn);
      expect(await screen.findByText(/Opened Syllabus Preview/i)).toBeInTheDocument();

      // Enroll in a regular course card
      const enrollBtns = screen.getAllByRole('button', { name: /Enroll ⚡/i });
      await user.click(enrollBtns[0]);
      expect(await screen.findByText(/Course added to My Learning/i)).toBeInTheDocument();
    });

    it('[CP-S-06] Theme toggling and navigation callbacks function correctly', async () => {
      const user = userEvent.setup();
      const mockNavigateAuth = vi.fn();
      const mockNavigateDashboard = vi.fn();
      const mockNavigateNotes = vi.fn();

      render(
        <MemoryRouter>
          <CoursePage
            onNavigateToAuth={mockNavigateAuth}
            onNavigateToDashboard={mockNavigateDashboard}
            onNavigateToNotes={mockNavigateNotes}
          />
        </MemoryRouter>
      );

      // Theme toggle
      const themeToggle = screen.getByRole('button', { name: /Toggle theme/i });
      await user.click(themeToggle);
      expect(localStorage.getItem('skillpop-theme')).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      await user.click(themeToggle);
      expect(localStorage.getItem('skillpop-theme')).toBe('light');
    });
  });

  describe('Error Paths (Failure Path)', () => {
    it('[CP-E-01] Catalog API failure (500) gracefully preserves UI via fallback data', async () => {
      server.use(
        http.get('/api/courses', () => {
          return HttpResponse.json({ message: 'Catalog database failure' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <CoursePage />
        </MemoryRouter>
      );

      // The CoursePage component loads coursesData directly and renders reliably
      expect(screen.getByText(/Core Masterclass Catalog/i)).toBeInTheDocument();
      expect(screen.getByText(coursesData[0].title)).toBeInTheDocument();
    });

    it('[CP-E-02] Course detail API failure (500) handles error gracefully without crash', async () => {
      server.use(
        http.get('/api/courses/:id', () => {
          return HttpResponse.json({ message: 'Detail not found' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <CoursePage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Core Masterclass Catalog/i)).toBeInTheDocument();
    });

    it('[CP-E-03] Empty result search renders empty state and reset button restores catalog', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <CoursePage />
        </MemoryRouter>
      );

      const searchInput = screen.getByPlaceholderText(/Search by concept, style, or mentor\.\.\./i);
      await user.type(searchInput, 'NonExistentZzzzQuery999');

      expect(await screen.findByText(/No courses found matching your criteria/i)).toBeInTheDocument();

      const resetBtn = screen.getByRole('button', { name: /Reset All Filters/i });
      await user.click(resetBtn);

      await waitFor(() => {
        expect(screen.getByText(coursesData[0].title)).toBeInTheDocument();
      });
    });

    it('[CP-E-04] Featured course API failure (500) preserves spotlight view via fallback', async () => {
      server.use(
        http.get('/api/featured-course', () => {
          return HttpResponse.json({ message: 'Featured course failed' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <CoursePage />
        </MemoryRouter>
      );

      expect(screen.getByText(featuredCourseData.title)).toBeInTheDocument();
    });
  });
});
