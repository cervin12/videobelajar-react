import { http, HttpResponse, delay as mswDelay } from 'msw';

const isTest =
  typeof globalThis !== 'undefined' &&
  Boolean(
    (globalThis as unknown as { process?: { env?: Record<string, string> } }).process?.env?.VITEST ||
      (globalThis as unknown as { process?: { env?: Record<string, string> } }).process?.env?.NODE_ENV === 'test'
  );
const delay = (ms: number) => (isTest ? Promise.resolve() : mswDelay(ms));

import {
  coursesData,
  disciplinesData,
  featuredCourseData,
  quickStatsData,
  valuePromisesData,
  softwareOptions,
} from '../data/coursesData';
import {
  studentProfileData,
  activeCoursesData,
  mentorReviewData,
  questBadgesData,
  discordJamsData,
  projectAssetsData,
} from '../data/studentDashboardData';
import { initialNotesData } from '../data/notesData';
import type { Note } from '../types/notes';

const generateId = (prefix: string) => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID().substring(0, 8)}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
};

// Seeded state for interactive user data (survives page refresh via localStorage)
const getStoredNotes = (): Note[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('skillpop-notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved notes from localStorage:', e);
      }
    }
  }
  return [...initialNotesData];
};

let dynamicNotes: Note[] = getStoredNotes();

const persistNotes = (notes: Note[]) => {
  dynamicNotes = notes;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('skillpop-notes', JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to sync notes to localStorage:', e);
    }
  }
};

const getStoredProfile = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('skillpop_mock_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved profile from localStorage:', e);
      }
    }
  }
  return { ...studentProfileData };
};

let currentStudentProfile = getStoredProfile();

const persistProfile = (profile: typeof studentProfileData) => {
  currentStudentProfile = profile;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('skillpop_mock_student_profile', JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to sync profile to localStorage:', e);
    }
  }
};

export const resetMockData = () => {
  dynamicNotes = JSON.parse(JSON.stringify(initialNotesData));
  currentStudentProfile = JSON.parse(JSON.stringify(studentProfileData));
  if (typeof window !== 'undefined') {
    localStorage.removeItem('skillpop-notes');
    localStorage.removeItem('skillpop_mock_student_profile');
  }
};

export const handlers = [
  // ----------------------------------------------------------------
  // Authentication (Seed & session state)
  // ----------------------------------------------------------------
  http.post('/api/auth/login', async ({ request }) => {
    await delay(120);
    const body = (await request.json().catch(() => ({}))) as { email?: string; password?: string };

    const email = body.email || 'sarah@creatorlab.io';
    const rawName = email.includes('@') ? email.split('@')[0] : 'Sarah';
    const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    const user = {
      id: 'usr-sarah-1',
      name: displayName,
      email: email,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      track: '3d',
    };

    persistProfile({
      ...currentStudentProfile,
      name: user.name,
    });

    return HttpResponse.json({
      status: 'success',
      message: 'Login successful',
      data: {
        token: 'msw_jwt_mock_token_eyJuYW1lIjoiU2FyYWgiLCJyb2xlIjoic3R1ZGVudCJ9',
        user,
      },
    });
  }),

  http.post('/api/auth/register', async ({ request }) => {
    await delay(150);
    const body = (await request.json().catch(() => ({}))) as {
      fullName?: string;
      email?: string;
      selectedTrack?: string;
    };

    const user = {
      id: generateId('usr'),
      name: body.fullName || 'New Creator',
      email: body.email || 'creator@skillpop.io',
      role: 'student',
      track: body.selectedTrack || '3d',
      trialDaysRemaining: 7,
    };

    const trackLabel = body.selectedTrack
      ? body.selectedTrack === '3d'
        ? '3D & Blender'
        : body.selectedTrack === 'motion'
        ? 'Motion & VFX'
        : body.selectedTrack.toUpperCase()
      : 'Motion & 3D';

    persistProfile({
      ...currentStudentProfile,
      name: user.name,
      cohort: `Cohort 04 • ${trackLabel} Lab`,
    });

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Creator registration successful. 7-Day Pro trial unlocked!',
        data: {
          token: 'msw_jwt_mock_token_register_new_creator',
          user,
        },
      },
      { status: 201 }
    );
  }),

  http.post('/api/auth/logout', async () => {
    await delay(80);
    currentStudentProfile = { ...studentProfileData };
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('skillpop_mock_student_profile');
        localStorage.removeItem('skillpop_token');
        localStorage.removeItem('skillpop_user');
      } catch (e) {
        console.error('Failed to clear mock auth data:', e);
      }
    }
    return HttpResponse.json({
      status: 'success',
      message: 'Logged out successfully',
    });
  }),

  // ----------------------------------------------------------------
  // Course Catalog
  // ----------------------------------------------------------------
  http.get('/api/courses', async ({ request }) => {
    await delay(100);
    const url = new URL(request.url);
    const discipline = url.searchParams.get('discipline');
    const software = url.searchParams.get('software');
    const level = url.searchParams.get('level');
    const search = url.searchParams.get('q')?.toLowerCase();

    let filtered = [...coursesData];

    if (discipline && discipline !== 'all') {
      filtered = filtered.filter((c) => c.discipline === discipline);
    }
    if (software) {
      filtered = filtered.filter((c) => c.software === software);
    }
    if (level) {
      filtered = filtered.filter((c) => c.level === level);
    }
    if (search) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(search) ||
          c.instructor.name.toLowerCase().includes(search) ||
          c.softwareTag.toLowerCase().includes(search)
      );
    }

    return HttpResponse.json({
      status: 'success',
      count: filtered.length,
      data: filtered,
    });
  }),

  http.get('/api/courses/:id', async ({ params }) => {
    await delay(80);
    const { id } = params;
    const course = coursesData.find((c) => c.id === id) || coursesData[0];

    return HttpResponse.json({
      status: 'success',
      data: {
        ...course,
        syllabus: [
          { week: 1, title: 'Foundations & Tool Setup', lessons: 4, duration: '2h 15m' },
          { week: 2, title: 'Keyframing & Smear Breakdown', lessons: 6, duration: '3h 40m' },
          { week: 3, title: 'Weight, Force & Secondary Dynamics', lessons: 5, duration: '3h 10m' },
          { week: 4, title: 'Portfolio Project Critique & Submission', lessons: 3, duration: '2h 00m' },
        ],
      },
    });
  }),

  http.get('/api/disciplines', async () => {
    await delay(60);
    return HttpResponse.json({
      status: 'success',
      data: disciplinesData,
    });
  }),

  http.get('/api/featured-course', async () => {
    await delay(70);
    return HttpResponse.json({
      status: 'success',
      data: featuredCourseData,
    });
  }),

  http.get('/api/quick-stats', async () => {
    await delay(50);
    return HttpResponse.json({
      status: 'success',
      data: quickStatsData,
    });
  }),

  http.get('/api/value-promises', async () => {
    await delay(60);
    return HttpResponse.json({
      status: 'success',
      data: valuePromisesData,
    });
  }),

  http.get('/api/software-options', async () => {
    await delay(40);
    return HttpResponse.json({
      status: 'success',
      data: softwareOptions,
    });
  }),

  // ----------------------------------------------------------------
  // Student Dashboard (Dynamic state seeded from studentProfileData)
  // ----------------------------------------------------------------
  http.get('/api/student/profile', async () => {
    await delay(80);
    return HttpResponse.json({
      status: 'success',
      data: currentStudentProfile,
    });
  }),

  http.put('/api/student/profile', async ({ request }) => {
    await delay(80);
    const body = (await request.json().catch(() => ({}))) as Partial<typeof studentProfileData>;
    persistProfile({
      ...currentStudentProfile,
      ...body,
    });
    return HttpResponse.json({
      status: 'success',
      data: currentStudentProfile,
    });
  }),

  http.get('/api/student/active-courses', async () => {
    await delay(90);
    return HttpResponse.json({
      status: 'success',
      count: activeCoursesData.length,
      data: activeCoursesData,
    });
  }),

  http.get('/api/student/mentor-review', async () => {
    await delay(100);
    return HttpResponse.json({
      status: 'success',
      data: mentorReviewData,
    });
  }),

  http.get('/api/student/quest-badges', async () => {
    await delay(70);
    return HttpResponse.json({
      status: 'success',
      count: questBadgesData.length,
      data: questBadgesData,
    });
  }),

  http.get('/api/student/discord-jams', async () => {
    await delay(80);
    return HttpResponse.json({
      status: 'success',
      count: discordJamsData.length,
      data: discordJamsData,
    });
  }),

  http.get('/api/student/project-assets', async () => {
    await delay(70);
    return HttpResponse.json({
      status: 'success',
      count: projectAssetsData.length,
      data: projectAssetsData,
    });
  }),

  // ----------------------------------------------------------------
  // Notes & Checklists (Full CRUD persisted through MSW)
  // ----------------------------------------------------------------
  http.get('/api/notes', async ({ request }) => {
    await delay(90);
    const url = new URL(request.url);
    const q = url.searchParams.get('q')?.toLowerCase();
    const tag = url.searchParams.get('tag');

    let filtered = [...dynamicNotes];

    if (q) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(q) ||
          note.content.toLowerCase().includes(q) ||
          note.tags.some((t) => t.toLowerCase().includes(q)) ||
          note.checklist?.some((c) => c.text.toLowerCase().includes(q))
      );
    }

    if (tag && tag !== 'all') {
      if (tag === 'pinned') {
        filtered = filtered.filter((note) => note.pinned);
      } else {
        const normalizedTag = tag.startsWith('#') ? tag : `#${tag}`;
        filtered = filtered.filter(
          (note) => note.tags.includes(tag) || note.tags.includes(normalizedTag)
        );
      }
    }

    return HttpResponse.json({
      status: 'success',
      count: filtered.length,
      data: filtered,
    });
  }),

  http.post('/api/notes', async ({ request }) => {
    await delay(120);
    const body = (await request.json().catch(() => ({}))) as Partial<Note>;

    const newNote: Note = {
      id: generateId('note'),
      userId: body.userId,
      title: body.title || 'Untitled Note',
      content: body.content || '',
      checklist: body.checklist || [],
      tags: body.tags || [],
      pinned: Boolean(body.pinned),
      color: body.color || 'default',
      createdAt: 'Just now',
    };

    persistNotes([newNote, ...dynamicNotes]);

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Note created successfully',
        data: newNote,
      },
      { status: 201 }
    );
  }),

  http.put('/api/notes/:id', async ({ params, request }) => {
    await delay(100);
    const { id } = params;
    const body = (await request.json().catch(() => ({}))) as Partial<Note>;

    const index = dynamicNotes.findIndex((n) => n.id === id);
    if (index === -1) {
      return HttpResponse.json({ status: 'error', message: 'Note not found' }, { status: 404 });
    }

    const updatedNotes = [...dynamicNotes];
    updatedNotes[index] = {
      ...updatedNotes[index],
      ...body,
      id: String(id),
    };
    persistNotes(updatedNotes);

    return HttpResponse.json({
      status: 'success',
      message: 'Note updated successfully',
      data: dynamicNotes[index],
    });
  }),

  http.delete('/api/notes/:id', async ({ params }) => {
    await delay(100);
    const { id } = params;
    const initialLen = dynamicNotes.length;
    const remainingNotes = dynamicNotes.filter((n) => n.id !== id);
    persistNotes(remainingNotes);

    if (remainingNotes.length === initialLen) {
      return HttpResponse.json({ status: 'error', message: 'Note not found' }, { status: 404 });
    }

    return HttpResponse.json({
      status: 'success',
      message: `Note with ID ${id} deleted successfully`,
      data: { deletedId: id },
    });
  }),
];

