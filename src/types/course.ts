export type DisciplineId =
  | 'all'
  | '3d-blender'
  | '2d-sakuga'
  | 'motion-design'
  | 'creative-dev'
  | 'game-art'
  | 'generative-ai'
  | 'uiux-spline';

export interface Discipline {
  id: DisciplineId;
  label: string;
  count: number;
  icon?: string;
  hoverColor?: string;
}

export interface Instructor {
  name: string;
  title: string;
  avatar: string;
  verified?: boolean;
}

export interface Course {
  id: string;
  title: string;
  discipline: DisciplineId;
  disciplineLabel: string;
  disciplineIcon?: string;
  software: string;
  softwareTag: string;
  rating: number;
  duration: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
  accentColor: string; // e.g., '#EC4899', '#84CC16', '#FB923C', etc.
  tagBgColor: string;
  tagTextColor: string;
  tagBorderColor: string;
  instructor: Instructor;
  level: 'beginner' | 'intermediate' | 'master';
}

export interface FeaturedCourse {
  title: string;
  category: string;
  rating: number;
  reviewsCount: number;
  description: string;
  cohortDuration: string;
  priceStandalone: number;
  cohortStarts: string;
  imageUrl: string;
  imageAlt: string;
  instructor: Instructor;
  tools: string[];
}

export interface QuickStat {
  icon: string;
  label: string;
  bgColor: string;
}

export interface ValuePromise {
  id: string;
  badge: string;
  badgeBg: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  cardBg: string;
  shadowColor: string;
  rotateClass: string;
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'trending' | 'rating' | 'newest' | 'duration';
export type ThemeMode = 'light' | 'dark';
