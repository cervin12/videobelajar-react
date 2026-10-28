export interface ActiveCourse {
  id: string;
  title: string;
  softwareTag: string;
  durationLeft: string;
  moduleLabel: string;
  progressPercentage: number;
  nextLesson: string;
  accentColor: string;
  buttonColor: string;
  imageUrl: string;
  mentor: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface MentorReview {
  id: string;
  mentorName: string;
  mentorRole: string;
  mentorAvatar: string;
  fileName: string;
  status: 'Revision Requested' | 'Approved' | 'In Review';
  quote: string;
  audioTime: string;
  totalAudioTime: string;
}

export interface QuestBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'unlocked' | 'in_progress' | 'locked';
  badgeLabel: string;
  bgColor: string;
  labelBgColor: string;
}

export interface DiscordJam {
  id: string;
  title: string;
  timeTag: string;
  attendees?: string;
  description: string;
  isRsvped?: boolean;
  type: 'discord_stage' | 'calendar_event';
}

export interface ProjectAsset {
  id: string;
  name: string;
  size: string;
  category: string;
  ext: string;
  color: string;
}

export interface StudentProfile {
  name: string;
  cohort: string;
  level: string;
  levelProgress: number;
  currentXp: number;
  xpToNextLevel: number;
  streakDays: number;
  weeklyJamDone: number;
  weeklyJamTotal: number;
  activeRigName: string;
  activeRigSoftware: string;
  activeRigProgress: number;
  mentorSyncCredits: number;
}
