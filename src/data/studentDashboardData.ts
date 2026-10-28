import type {
  ActiveCourse,
  MentorReview,
  QuestBadge,
  DiscordJam,
  ProjectAsset,
  StudentProfile,
} from '../types/studentDashboard';

export const studentProfileData: StudentProfile = {
  name: 'Sarah',
  cohort: 'Cohort 04 • Motion & 3D Lab',
  level: 'Level 6 Apprentice',
  levelProgress: 82,
  currentXp: 2840,
  xpToNextLevel: 3500,
  streakDays: 14,
  weeklyJamDone: 3,
  weeklyJamTotal: 5,
  activeRigName: 'Cyber Samurai Character Model',
  activeRigSoftware: 'Blender 4.2',
  activeRigProgress: 68,
  mentorSyncCredits: 2,
};

export const activeCoursesData: ActiveCourse[] = [
  {
    id: 'cyber-samurai',
    title: 'Cyber Samurai: Advanced 3D Character Rigging & Weights',
    softwareTag: 'Blender 4.2',
    durationLeft: '18m left',
    moduleLabel: 'Module 3 • Weight Painting',
    progressPercentage: 68,
    nextLesson: 'Ep 14: Weight Painting Shoulder Topology & Armor Plates',
    accentColor: '#84CC16',
    buttonColor: 'bg-[#A3E635]',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    mentor: {
      name: 'Dikshant M.',
      role: 'Principal 3D Tech',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
  },
  {
    id: 'sakuga-combat',
    title: 'Sakuga Dynamic Combat Animation & Extreme 24fps Timing',
    softwareTag: 'Toon Boom',
    durationLeft: '24m left',
    moduleLabel: 'Module 2 • Anticipation & Smear',
    progressPercentage: 42,
    nextLesson: 'Ep 08: Keyframe Whip Slash Arc Trajectory & Spacing',
    accentColor: '#EAB308',
    buttonColor: 'bg-[#FDE047]',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    mentor: {
      name: 'Kenjiro Sato',
      role: 'Lead Key Animator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
  },
  {
    id: 'glsl-shaders',
    title: 'Stylized Realtime Shaders in GLSL, HLSL & WebGL',
    softwareTag: 'GLSL & Three.js',
    durationLeft: '45m left',
    moduleLabel: 'Module 1 • SDF Basics',
    progressPercentage: 18,
    nextLesson: 'Ep 03: Raymarching Distance Fields & Cel Specular Clamp',
    accentColor: '#0284C7',
    buttonColor: 'bg-[#38BDF8]',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
    mentor: {
      name: 'Elena Rostova',
      role: 'Tech Artist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
  },
];

export const mentorReviewData: MentorReview = {
  id: 'review-1',
  mentorName: 'Dikshant M.',
  mentorRole: 'Mentor',
  mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  fileName: 'Cyberpunk_Alley_Rig_v3.blend',
  status: 'Revision Requested',
  quote:
    '"Awesome work on the shoulder clavicle weighting, Sarah! The cape cloth collision geometry still penetrates the thigh mesh around frame 32 during the crouch-slash anticipation. Check the collision radius modifier."',
  audioTime: '0:48',
  totalAudioTime: '1:12',
};

export const questBadgesData: QuestBadge[] = [
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: '14-Day Streak reached',
    icon: '🔥',
    status: 'unlocked',
    badgeLabel: 'UNLOCKED',
    bgColor: 'bg-[#EF4444]',
    labelBgColor: 'bg-[#A3E635]',
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: '5 Renders in 48 hours',
    icon: '⚡',
    status: 'unlocked',
    badgeLabel: 'UNLOCKED',
    bgColor: 'bg-[#A3E635]',
    labelBgColor: 'bg-[#A3E635]',
  },
  {
    id: 'shader-wizard',
    title: 'Shader Wizard',
    description: '4 of 5 SDF formulas',
    icon: '🔮',
    status: 'in_progress',
    badgeLabel: '80% IN PROGRESS',
    bgColor: 'bg-[#38BDF8]',
    labelBgColor: 'bg-[#FEF08A]',
  },
  {
    id: 'master-sculptor',
    title: 'Master Sculptor',
    description: 'Reach Level 7',
    icon: '🔒',
    status: 'locked',
    badgeLabel: 'LOCKED',
    bgColor: 'bg-slate-300 dark:bg-slate-700',
    labelBgColor: 'bg-slate-300 dark:bg-slate-700',
  },
];

export const discordJamsData: DiscordJam[] = [
  {
    id: 'sakuga-breakdown',
    title: 'Anime Sakuga Fight Choreography Live Breakdown with Kenjiro Sato',
    timeTag: 'Tomorrow • 8:00 PM EST',
    attendees: '142 Registered',
    description: 'Live frame-by-frame critique on camera shakes, smears & explosive keyframe anticipation.',
    type: 'discord_stage',
  },
  {
    id: 'geonodes-showdown',
    title: 'Blender GeoNodes Procedural Anime Shading Showdown',
    timeTag: 'Friday • 6:00 PM EST',
    description: 'Live community shading challenge with procedural halftone textures and outlines.',
    type: 'calendar_event',
  },
];

export const projectAssetsData: ProjectAsset[] = [
  {
    id: 'asset-1',
    name: 'Cyber_Alley_Rig_v3.blend',
    size: '142 MB',
    category: 'Blender 4.2 Asset',
    ext: '.blend',
    color: 'bg-[#A3E635]',
  },
  {
    id: 'asset-2',
    name: 'Kinetic_Typography_Toolkit.aep',
    size: '48 MB',
    category: 'Motion Templates',
    ext: '.aep',
    color: 'bg-[#38BDF8]',
  },
  {
    id: 'asset-3',
    name: 'UI_Design_System_Tokens.fig',
    size: '12 MB',
    category: 'Figma Components',
    ext: '.fig',
    color: 'bg-[#FDE047]',
  },
];
