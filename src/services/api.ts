import type { Course, Discipline, FeaturedCourse, QuickStat, ValuePromise } from '../types/course';
import type { StudentProfile, ActiveCourse, MentorReview, QuestBadge, DiscordJam, ProjectAsset } from '../types/studentDashboard';
import type { Note } from '../types/notes';

// Static fallbacks in case mock server is offline
import {
  coursesData as fallbackCourses,
  disciplinesData as fallbackDisciplines,
  featuredCourseData as fallbackFeaturedCourse,
  quickStatsData as fallbackQuickStats,
  valuePromisesData as fallbackValuePromises,
} from '../data/coursesData';
import {
  studentProfileData as fallbackStudentProfile,
  activeCoursesData as fallbackActiveCourses,
  mentorReviewData as fallbackMentorReview,
  questBadgesData as fallbackQuestBadges,
  discordJamsData as fallbackDiscordJams,
  projectAssetsData as fallbackProjectAssets,
} from '../data/studentDashboardData';
import { initialNotesData as fallbackNotes } from '../data/notesData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

function getAuthHeader(): Record<string, string> {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('skillpop_token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

async function fetchJson<T>(endpoint: string, options?: RequestInit, fallback?: T): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      let serverMessage: string | null = null;
      try {
        const errorJson = await res.json();
        serverMessage = errorJson?.message || errorJson?.error || null;
      } catch {
        // Response was not JSON
      }
      throw new Error(serverMessage || `HTTP error ${res.status}: ${res.statusText}`);
    }

    if (res.status === 204) {
      return {} as T;
    }

    const text = await res.text();
    if (!text) {
      return {} as T;
    }

    const json = JSON.parse(text);
    return (json.data !== undefined ? json.data : json) as T;
  } catch (error) {
    if (fallback !== undefined) {
      console.warn(`[API] Mock server offline at ${url}, using local fallback data.`, error);
      return fallback;
    }
    throw error;
  }
}

// -------------------------------------------------------------
// Course Service
// -------------------------------------------------------------
export const courseService = {
  getCourses: () => fetchJson<Course[]>('/courses', undefined, fallbackCourses),
  getCourseById: (id: string) =>
    fetchJson<Course>(`/courses/${id}`, undefined, fallbackCourses.find((c) => c.id === id) || fallbackCourses[0]),
  getDisciplines: () => fetchJson<Discipline[]>('/disciplines', undefined, fallbackDisciplines),
  getFeaturedCourse: () => fetchJson<FeaturedCourse>('/featured-course', undefined, fallbackFeaturedCourse),
  getQuickStats: () => fetchJson<QuickStat[]>('/quick-stats', undefined, fallbackQuickStats),
  getValuePromises: () => fetchJson<ValuePromise[]>('/value-promises', undefined, fallbackValuePromises),
};

// -------------------------------------------------------------
// Student Service
// -------------------------------------------------------------
export const studentService = {
  getProfile: () => fetchJson<StudentProfile>('/student/profile', undefined, fallbackStudentProfile),
  updateProfile: (profile: Partial<StudentProfile>) =>
    fetchJson<StudentProfile>('/student/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    }),
  getActiveCourses: () => fetchJson<ActiveCourse[]>('/student/active-courses', undefined, fallbackActiveCourses),
  getMentorReview: () => fetchJson<MentorReview>('/student/mentor-review', undefined, fallbackMentorReview),
  getQuestBadges: () => fetchJson<QuestBadge[]>('/student/quest-badges', undefined, fallbackQuestBadges),
  getDiscordJams: () => fetchJson<DiscordJam[]>('/student/discord-jams', undefined, fallbackDiscordJams),
  getProjectAssets: () => fetchJson<ProjectAsset[]>('/student/project-assets', undefined, fallbackProjectAssets),
};

// -------------------------------------------------------------
// Notes Service
// -------------------------------------------------------------
export const notesService = {
  getNotes: (params?: { q?: string; tag?: string }) => {
    const query = new URLSearchParams();
    if (params?.q) query.set('q', params.q);
    if (params?.tag && params.tag !== 'all') query.set('tag', params.tag);
    const qs = query.toString();
    const endpoint = qs ? `/notes?${qs}` : '/notes';
    return fetchJson<Note[]>(endpoint, undefined, fallbackNotes);
  },
  createNote: (note: Omit<Note, 'id' | 'createdAt'>) =>
    fetchJson<Note>('/notes', {
      method: 'POST',
      body: JSON.stringify(note),
    }),
  updateNote: (id: string, note: Partial<Note>) =>
    fetchJson<Note>(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(note),
    }),
  deleteNote: (id: string) =>
    fetchJson<{ success: boolean; deletedId: string }>(`/notes/${id}`, {
      method: 'DELETE',
    }),
};

// -------------------------------------------------------------
// Auth Service
// -------------------------------------------------------------
export const authService = {
  login: (credentials: { email: string; password?: string }) =>
    fetchJson<{ token: string; user: { id: string; name: string; email: string; role: string; avatar: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  register: (payload: { fullName: string; email: string; password?: string; selectedTrack: string }) =>
    fetchJson<{ token: string; user: { id: string; name: string; email: string; track: string } }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  logout: async () => {
    try {
      await fetchJson('/auth/logout', { method: 'POST' });
    } catch {
      // In case mock server is offline, proceed with client cleanup
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('skillpop_token');
        localStorage.removeItem('skillpop_user');
        localStorage.removeItem('skillpop_mock_student_profile');
      }
    }
  },
};

