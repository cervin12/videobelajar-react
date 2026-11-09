import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/setupServer';
import {
  courseService,
  studentService,
  notesService,
  authService,
} from '../api';

describe('API Service Layer (api.ts) - test-plan.md L1 Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // =========================================================================
  // 4.1 SUCCESS PATH (API-S-01 to API-S-15)
  // =========================================================================
  describe('Success Paths (Happy Path)', () => {
    it('[API-S-01] getCourses returns course array with expected properties', async () => {
      const courses = await courseService.getCourses();
      expect(Array.isArray(courses)).toBe(true);
      expect(courses.length).toBeGreaterThan(0);
      expect(courses[0]).toHaveProperty('id');
      expect(courses[0]).toHaveProperty('title');
    });

    it('[API-S-02] getCourseById returns matching course for requested id', async () => {
      const course = await courseService.getCourseById('course-1');
      expect(course).toBeDefined();
      expect(course.id).toBe('course-1');
    });

    it('[API-S-03] getDisciplines, getFeaturedCourse, getQuickStats, getValuePromises resolve non-empty data', async () => {
      const disciplines = await courseService.getDisciplines();
      const featured = await courseService.getFeaturedCourse();
      const quickStats = await courseService.getQuickStats();
      const valuePromises = await courseService.getValuePromises();

      expect(Array.isArray(disciplines)).toBe(true);
      expect(disciplines.length).toBeGreaterThan(0);
      expect(featured).toHaveProperty('title');
      expect(featured).toHaveProperty('instructor');
      expect(Array.isArray(quickStats)).toBe(true);
      expect(quickStats.length).toBeGreaterThan(0);
      expect(Array.isArray(valuePromises)).toBe(true);
      expect(valuePromises.length).toBeGreaterThan(0);
    });

    it('[API-S-04] getNotes() with no params resolves array with seeded notes', async () => {
      const notes = await notesService.getNotes();
      expect(Array.isArray(notes)).toBe(true);
      expect(notes.length).toBeGreaterThan(0);
      expect(notes[0]).toHaveProperty('id');
      expect(notes[0]).toHaveProperty('title');
    });

    it('[API-S-05] getNotes({ q, tag }) builds query string omitting tag=all', async () => {
      let capturedUrl = '';
      server.use(
        http.get('/api/notes', ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json([]);
        })
      );

      await notesService.getNotes({ q: 'blender', tag: '3d' });
      expect(capturedUrl).toContain('q=blender');
      expect(capturedUrl).toContain('tag=3d');

      // Test tag=all omission
      await notesService.getNotes({ q: 'shaders', tag: 'all' });
      expect(capturedUrl).toContain('q=shaders');
      expect(capturedUrl).not.toContain('tag=all');
    });

    it('[API-S-06] createNote sends payload and returns created note with status 201', async () => {
      let requestBody: Record<string, unknown> | null = null;
      server.use(
        http.post('/api/notes', async ({ request }) => {
          requestBody = (await request.json()) as Record<string, unknown>;
          return HttpResponse.json(
            { id: 'note-new-123', ...requestBody },
            { status: 201 }
          );
        })
      );

      const payload = {
        title: 'New Creative Note',
        content: 'Exploring Three.js & WebGL',
        tags: ['#webgl', '#threejs'],
        pinned: false,
        color: 'yellow' as const,
      };

      const result = await notesService.createNote(payload);
      expect(requestBody).toMatchObject(payload);
      expect(result.id).toBe('note-new-123');
    });

    it('[API-S-07] updateNote sends partial payload and returns updated fields', async () => {
      const updateData = { title: 'Updated Title', content: 'Updated Body' };
      const result = await notesService.updateNote('note-1', updateData);
      expect(result).toBeDefined();
      expect(result.id).toBe('note-1');
      expect(result.title).toBe('Updated Title');
      expect(result.content).toBe('Updated Body');
    });

    it('[API-S-08] deleteNote returns deletedId matching input id', async () => {
      const result = await notesService.deleteNote('note-1');
      expect(result).toHaveProperty('deletedId', 'note-1');
    });

    it('[API-S-09] attaches Bearer token from localStorage when present', async () => {
      localStorage.setItem('skillpop_token', 'token-abc-999');
      let capturedAuthHeader: string | null = null;

      server.use(
        http.get('/api/notes', ({ request }) => {
          capturedAuthHeader = request.headers.get('Authorization');
          return HttpResponse.json([]);
        })
      );

      await notesService.getNotes();
      expect(capturedAuthHeader).toBe('Bearer token-abc-999');
    });

    it('[API-S-10] does not attach Authorization header when token is absent', async () => {
      let capturedAuthHeader: string | null = null;

      server.use(
        http.get('/api/notes', ({ request }) => {
          capturedAuthHeader = request.headers.get('Authorization');
          return HttpResponse.json([]);
        })
      );

      await notesService.getNotes();
      expect(capturedAuthHeader).toBeNull();
    });

    it('[API-S-11] studentService calls resolve seeded data for all sections', async () => {
      const profile = await studentService.getProfile();
      const activeCourses = await studentService.getActiveCourses();
      const mentorReview = await studentService.getMentorReview();
      const questBadges = await studentService.getQuestBadges();
      const discordJams = await studentService.getDiscordJams();
      const projectAssets = await studentService.getProjectAssets();

      expect(profile).toHaveProperty('name');
      expect(Array.isArray(activeCourses)).toBe(true);
      expect(mentorReview).toHaveProperty('mentorName');
      expect(Array.isArray(questBadges)).toBe(true);
      expect(Array.isArray(discordJams)).toBe(true);
      expect(Array.isArray(projectAssets)).toBe(true);
    });

    it('[API-S-12] studentService.updateProfile PUT persists changes', async () => {
      const updatedProfile = await studentService.updateProfile({
        name: 'Alex Creative',
        cohort: 'Motion Design 2026',
      });
      expect(updatedProfile.name).toBe('Alex Creative');
      expect(updatedProfile.cohort).toBe('Motion Design 2026');
    });

    it('[API-S-13] authService.login returns token and user data', async () => {
      const result = await authService.login({
        email: 'alex@creator.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('token');
      expect(result.user).toHaveProperty('email', 'alex@creator.com');
      expect(result.user).toHaveProperty('name');
    });

    it('[API-S-14] authService.register returns token and user with status 201', async () => {
      const result = await authService.register({
        fullName: 'Jordan Miles',
        email: 'jordan@creator.com',
        password: 'password123',
        selectedTrack: 'motion',
      });

      expect(result).toHaveProperty('token');
      expect(result.user.name).toBe('Jordan Miles');
      expect(result.user.track).toBe('motion');
    });

    it('[API-S-15] authService.logout clears session keys from localStorage', async () => {
      localStorage.setItem('skillpop_token', 'active-token');
      localStorage.setItem('skillpop_user', JSON.stringify({ id: 'u1' }));
      localStorage.setItem('skillpop_mock_student_profile', JSON.stringify({ name: 'Alex' }));

      await authService.logout();

      expect(localStorage.getItem('skillpop_token')).toBeNull();
      expect(localStorage.getItem('skillpop_user')).toBeNull();
      expect(localStorage.getItem('skillpop_mock_student_profile')).toBeNull();
    });
  });

  // =========================================================================
  // 5.1 ERROR PATH (API-E-01 to API-E-12)
  // =========================================================================
  describe('Error Paths (Failure Path)', () => {
    it('[API-E-01] getNotes 500 with fallback resolves fallback array without throwing', async () => {
      server.use(
        http.get('/api/notes', () => {
          return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        })
      );

      const result = await notesService.getNotes();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('[API-E-02] getNotes network error with fallback resolves fallback data', async () => {
      server.use(
        http.get('/api/notes', () => {
          return HttpResponse.error();
        })
      );

      const result = await notesService.getNotes();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('[API-E-03] createNote 400 with no fallback rejects with server message', async () => {
      server.use(
        http.post('/api/notes', () => {
          return HttpResponse.json({ message: 'Title is required' }, { status: 400 });
        })
      );

      await expect(
        notesService.createNote({
          title: '',
          content: 'No title provided',
          tags: [],
          pinned: false,
          color: 'default',
        })
      ).rejects.toThrow('Title is required');
    });

    it('[API-E-04] createNote non-JSON error rejects with HTTP status text', async () => {
      server.use(
        http.post('/api/notes', () => {
          return new HttpResponse('Bad Gateway', { status: 502, statusText: 'Bad Gateway' });
        })
      );

      await expect(
        notesService.createNote({
          title: 'Valid title',
          content: 'Content',
          tags: [],
          pinned: false,
          color: 'default',
        })
      ).rejects.toThrow(/HTTP error 502/);
    });

    it('[API-E-05] updateNote 404 rejects with server error message', async () => {
      server.use(
        http.put('/api/notes/:id', () => {
          return HttpResponse.json({ message: 'Note not found' }, { status: 404 });
        })
      );

      await expect(
        notesService.updateNote('non-existent-id', { title: 'Updated' })
      ).rejects.toThrow('Note not found');
    });

    it('[API-E-06] deleteNote 404 rejects with Note not found', async () => {
      server.use(
        http.delete('/api/notes/:id', () => {
          return HttpResponse.json({ message: 'Note not found' }, { status: 404 });
        })
      );

      await expect(notesService.deleteNote('unknown-id')).rejects.toThrow('Note not found');
    });

    it('[API-E-07] Auth failure 401 rejects and saves no token to localStorage', async () => {
      server.use(
        http.post('/api/auth/login', () => {
          return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        })
      );

      await expect(
        authService.login({ email: 'bad@email.com', password: 'wrong' })
      ).rejects.toThrow('Invalid credentials');

      expect(localStorage.getItem('skillpop_token')).toBeNull();
    });

    it('[API-E-08] Register failure 500 rejects with no localStorage writes', async () => {
      server.use(
        http.post('/api/auth/register', () => {
          return HttpResponse.json({ message: 'Registration service unavailable' }, { status: 500 });
        })
      );

      await expect(
        authService.register({
          fullName: 'Test User',
          email: 'test@user.com',
          selectedTrack: 'all',
        })
      ).rejects.toThrow('Registration service unavailable');

      expect(localStorage.getItem('skillpop_token')).toBeNull();
    });

    it('[API-E-09] logout still clears localStorage when server is offline or errors', async () => {
      localStorage.setItem('skillpop_token', 'temp-token');
      localStorage.setItem('skillpop_user', JSON.stringify({ id: '99' }));

      server.use(
        http.post('/api/auth/logout', () => {
          return HttpResponse.error();
        })
      );

      await authService.logout();

      expect(localStorage.getItem('skillpop_token')).toBeNull();
      expect(localStorage.getItem('skillpop_user')).toBeNull();
    });

    it('[API-E-10] Malformed JSON success body on endpoint without fallback surfaces parse error', async () => {
      server.use(
        http.post('/api/notes', () => {
          return new HttpResponse('plain-not-json-text', {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        })
      );

      await expect(
        notesService.createNote({
          title: 'Test',
          content: 'Test content',
          tags: [],
          pinned: false,
          color: 'default',
        })
      ).rejects.toThrow();
    });

    it('[API-E-11] 204 No Content resolves empty object without JSON parse error', async () => {
      server.use(
        http.delete('/api/notes/:id', () => {
          return new HttpResponse(null, { status: 204 });
        })
      );

      const result = await notesService.deleteNote('any-id');
      expect(result).toEqual({});
    });

    it('[API-E-12] Empty body with 200 resolves empty object without throwing', async () => {
      server.use(
        http.delete('/api/notes/:id', () => {
          return new HttpResponse('', { status: 200 });
        })
      );

      const result = await notesService.deleteNote('any-id');
      expect(result).toEqual({});
    });
  });
});
