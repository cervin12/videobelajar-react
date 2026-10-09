import type { Course, Discipline, FeaturedCourse, QuickStat, ValuePromise } from '../types/course';

export const disciplinesData: Discipline[] = [
  { id: 'all', label: 'All Courses', count: 86, hoverColor: 'hover:bg-[#A3E635]' },
  { id: '3d-blender', label: '3D & Blender', count: 24, icon: '🎲', hoverColor: 'hover:bg-[#FDE047]' },
  { id: '2d-sakuga', label: '2D & Sakuga', count: 16, icon: '🌸', hoverColor: 'hover:bg-[#F472B6]' },
  { id: 'motion-design', label: 'Motion Design', count: 19, icon: '⚡', hoverColor: 'hover:bg-[#FB923C]' },
  { id: 'creative-dev', label: 'Creative Dev & Shaders', count: 11, icon: '💎', hoverColor: 'hover:bg-[#38BDF8]' },
  { id: 'game-art', label: 'Game Art & Godot', count: 8, icon: '👾', hoverColor: 'hover:bg-[#C084FC]' },
  { id: 'generative-ai', label: 'Generative AI', count: 5, icon: '🤖', hoverColor: 'hover:bg-[#34D399]' },
  { id: 'uiux-spline', label: 'UI/UX & Spline', count: 7, icon: '✨', hoverColor: 'hover:bg-[#FDE047]' },
];

export const quickStatsData: QuickStat[] = [
  { icon: 'play_circle', label: '85+ Production Courses', bgColor: 'bg-[#A3E635]' },
  { icon: 'forum', label: '24/7 Discord Jam Rooms', bgColor: 'bg-[#38BDF8]' },
  { icon: 'video_camera_front', label: '1-on-1 Loom Mentor Feedback', bgColor: 'bg-[#FDE047]' },
];

export const featuredCourseData: FeaturedCourse = {
  title: 'Action & Run Cycles: Traditional 2D Sakuga Masterclass',
  category: 'Sakuga & Dynamic 2D',
  rating: 4.95,
  reviewsCount: 4210,
  description:
    'Master extreme perspective, smear frames, impact explosions, and fluid momentum shifts with anime industry veteran Dikshant Sharma. Includes personal frame-by-frame weekly Loom critiques.',
  cohortDuration: '12 Cohort Weeks',
  priceStandalone: 69,
  cohortStarts: 'Starts Monday',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBp1NSEXrkzm_mDx05ftp_EvLWY_aTe2T0men_H8yIVAiWugCq0fI4o_EY1zwH5Cm-yi0NUqfexJ5yxeI_qVOGXZ4PLrs0g5TNcxo8ekFj7AED9th0avzghXM_TIeiQRsadlrolVKpAbueOyP7xK339jEUZ1DSFpXjuzJ5_FvL_azwxd-whk9HsCLSy3CEPri3B0DCLyE8N9XvhYIG-9mCxkOReWEQ_G1QwDR2Sik5vPGpepJwhypoz4A',
  imageAlt:
    'A vivid cinematic anime frame of a dynamic female protagonist sprinting across glowing rooftop neon tiles during an explosive rainstorm in Tokyo',
  instructor: {
    name: 'Dikshant Sharma',
    title: 'Lead Keyframer @ MAPPA Alumni',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZKa-pZII8c-gLivCyaWpErWfElNkxrPjwcktAD7uzO8eDA7zKovqzjVGnvpQcPwRK9ZXXz9ke449QdAavl0TrGzsEysbwHYy-iG4E0xhwbfX57piDtovsmabiGrjztRkEULUt1g8S1JHnkLlADZIWWeNfx5Ly577Pc0nBSDM2B3RfQpCEEOLk82H37Ei2l4OjQkbycmbYLrnw8MObOhtXqCx1MycmGk1r49WIszU2nXQV62b4TkARPA',
    verified: true,
  },
  tools: ['Toon Boom', 'TVPaint'],
};

export const coursesData: Course[] = [
  {
    id: 'course-1',
    title: 'Dynamic Character Action & Sakuga Animation',
    discipline: '2d-sakuga',
    disciplineLabel: 'Sakuga',
    disciplineIcon: '🌸',
    software: 'tvpaint',
    softwareTag: 'Clip Studio & Toon Boom',
    rating: 4.90,
    duration: '18h 40m',
    price: 39,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJAMQNbHF5tuTyqW-lsuDpbXgJKOVYAF-XX2KJBh1sapcgBCLd1M2yH-s5b8l2OyN3Wrh3xDfsjax52dMug_oFmuMmI59cCjqxlMRGriWQ8Sm9I68PwDIEbaB7qm_bqJoV1UjN0lgRN2e63HiYaDO9fC50oc1cDBVbrkx-V_ZT7j5dSQXkOTbSNr9veCiAuLa3r0WGRiKqLhGGkpBGQ86fFuyajy-1bsuiG8sClAFdvNomPskzDtMbEg',
    imageAlt: 'Dynamic 2D anime character performing an acrobatic sword slash with electric particles',
    accentColor: '#EC4899',
    tagBgColor: '#FCE7F3',
    tagTextColor: '#BE185D',
    tagBorderColor: '#BE185D',
    level: 'intermediate',
    instructor: {
      name: 'Dikshant R.',
      title: 'Senior Keyframer',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDcuwDQIZHmO6f-CVDnAlf9-9CW8QFGWHCb1kTzhuSBBpZJx3n9gQ391qLEipFxukvdp1SeKHx8Tj0wGq8ay5Z7BEvEp1nxrLZhRQ1qDiLkpImXn7F4AkxlkX_j5FWf9sHXhRpprFAikpfJRZd7ICKadOLxFXVIYDE6P05IRPRY6kCszcvkCgie3rhfUw36_jXTGu_mqqvQfGsAKlOApTDZmGvJcT8Dh6It4NHVHYA6cXxPEMkCJ-iDUQ',
    },
  },
  {
    id: 'course-2',
    title: 'Cozy Lo-Fi Isometric Worlds in Blender 4.0',
    discipline: '3d-blender',
    disciplineLabel: '3D Modeling',
    disciplineIcon: '🎲',
    software: 'blender',
    softwareTag: 'Blender 4.0 & Cycles',
    rating: 5.0,
    duration: '24h 10m',
    price: 45,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCm71kZNWTznFkDaApQYnZwY4lQlUXQNO7BDizRiJRId2BK6SMTsVW3u-5UHZwZCJSmkj7oS7MjumwuUGx7qN1yf2aScJBNTF0ZNtoaYE9M5VTWpTt_DvZkthgcCcsNAeweNH1XFagK4RIbDsVP4TSGCuhMfRuradl5bSjVTlccjCXLDy-nfpkY2yNJ1gKi4Cqpo6u4lxrlVuIzq2cV82UsHDYRRRDJ7KvEJMdG1a2XWkLDZ1IAEwHKA',
    imageAlt: 'Cozy miniature 3D isometric coffee shop and plant greenhouse bathed in soft warm golden hour lighting',
    accentColor: '#84CC16',
    tagBgColor: '#ECFCCB',
    tagTextColor: '#4D7C0F',
    tagBorderColor: '#4D7C0F',
    level: 'beginner',
    instructor: {
      name: 'Sarah Jenkins',
      title: '3D Worldbuilder',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ9L0exK-j7fvyv-6FZRFhq94uT-ZBrg_AZ0Jxu5GQFTVOktISBt9h8qqFhOhtO0CZsygulSHP85wVGO4amO7UNoef3daW1uilXGUnP2hbNMFZa9vQQtLpIpM_Z1Qah02S-ssbijtT-CikzaRTLQ6A-GtUmaQEzHI_zM8i169LnKlC6IURUZrnhyy70rUzcHSAkPb3nySdRF3m7Sds10nJJ9RmrRt4tncDxYxTTPraS1nxHXWoaaXdyQ',
    },
  },
  {
    id: 'course-3',
    title: 'Kinetic Typography & Pop UI Animations',
    discipline: 'motion-design',
    disciplineLabel: 'Motion',
    disciplineIcon: '⚡',
    software: 'after-effects',
    softwareTag: 'After Effects & Cavalry',
    rating: 4.85,
    duration: '16h 15m',
    price: 34,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlgls2VNBxCzU70Bi6PDB9XxS_M7fNQGZYRjLj8eJgxqXDFsUWBKuGPDjM_Vd-VkAhuAFDSsnsumrSH8v6bXGRWiBAk1CV15v7kLTdN3jRbAT3SqWPs9quouVUQnolS9n55DOe3TNoxvLQ6FXmL6fEI4c2KGy1g-4g1h40jAtvsCWzyT3KKXuZXeXKum0slYjWAiUk6KysAO7ryNfY9ky9h9zCD8anFcXiSz6vRyh7i1uJ7g8ZtT1iag',
    imageAlt: 'Kinetic bold typography poster in motion with expressive distorted experimental neo-brutalist letterforms',
    accentColor: '#FB923C',
    tagBgColor: '#FFEDD5',
    tagTextColor: '#C2410C',
    tagBorderColor: '#C2410C',
    level: 'intermediate',
    instructor: {
      name: 'Kai Takahashi',
      title: 'Brand Motion Lead',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCEsjHT4F-HLqL8TdFAwcNkCgSEDGETgxFm_FFslhYGDzC8S7y8BxmQ7v7-Zs4nLJE60F_iMz2GgmbI4Eg6-BmrQvO87051QBpUejd0wZwZy2LMiYT-NQI1V3ZDuPgHOcPrRVIbGvdRtDDZ9UMMbfnlQTSpWaDQVNCAh5wHcGe14URrZACt-K6BQYwkIi7a6tb0_3HaRvmSa46Kib_FhFuzlXRlYETCZ6MnhJJnj2j-oGK6K_WbQARw8g',
    },
  },
  {
    id: 'course-4',
    title: 'Make Your First 2D Action Platformer in Godot 4',
    discipline: 'game-art',
    disciplineLabel: 'Game Dev',
    disciplineIcon: '👾',
    software: 'godot',
    softwareTag: 'Godot 4 & GDScript',
    rating: 4.92,
    duration: '31h 00m',
    price: 49,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1ENqnfxFxxeHvbt_oneA7sQMXXKva07PDAuPloQLvzTjz8K5ePiS9v07-gvH6fFzqnnJKPXPKfWClg1yJNeCrAlakOXb7HrVjMthPrH5j8GVAXjzz0KgCrsDcJy5Avgqg4aw0KEyq1JhcXNUW409X6WeDR2_pv8N1WaPcjj3CBdiBnEUWT2GQn1GnB5WnlssujHKmQkXZlcuIh9E13uLgU_dePA6XJRDa7u0roVNh_18pTe7dJ4ktBg',
    imageAlt: 'Charming 2D pixel-art platformer level screenshot featuring a hooded hero running across ruined marble columns',
    accentColor: '#A855F7',
    tagBgColor: '#F3E8FF',
    tagTextColor: '#7E22CE',
    tagBorderColor: '#7E22CE',
    level: 'beginner',
    instructor: {
      name: 'Maya Lin',
      title: 'Indie Studio Founder',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBOxbANeEO4rxbboUv7vBF7wwWejbEF50l70aNp1JU3-uAARq-V23Lb2AAV4iCMXSsLk33YiatVV6EAQm5mcdVjRBQjEJg4OcnbVcgyaF4is1ub6aMAJ82aYskloBGDFhzls38pOGTabeKHVL_avNgXjFrdHARe-FclfehjfOYC-cne3ZVS3-YxKbXxobFOvE2XhNf3s5svRnG-6pplPHC8RwgpSqWhjIzGptSmm5h4H1yUkLzDcrO-3g',
    },
  },
  {
    id: 'course-5',
    title: 'Three.js & GLSL Shaders: Interactive Web Experiences',
    discipline: 'creative-dev',
    disciplineLabel: 'Creative Tech',
    disciplineIcon: '💎',
    software: 'threejs',
    softwareTag: 'Three.js, GLSL, WebGL',
    rating: 4.95,
    duration: '22h 30m',
    price: 55,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOk2sbMgdgyu0peHRRJ4gM5rv0-4Hy1ITiPjmInwp0NHZX4PXu6PV2NI91ylqJqsKlB_iDSKOEXnPqMxDd5zH3HZa3r2i54Mhe4ftpmyMRTSLJwKOAkQ_GOYZbiNdzYAKnZE9Sn-i1t6JJEZKtiZqmuvU-m8ztuPVx9lrUuah6g58Q1Kv64dvP7Fq3W0FCOJp-UsAEr_PlLxX3zTyk8rSJMJND_fHVZN2cIY6mFmXy97pkV-hsT6fVKg',
    imageAlt: 'Interactive abstract 3D fluid visualizer with iridescent chrome liquid shaders floating over dark gradient space',
    accentColor: '#06B6D4',
    tagBgColor: '#CFFAFE',
    tagTextColor: '#0891B2',
    tagBorderColor: '#0891B2',
    level: 'master',
    instructor: {
      name: 'Alex Rivera',
      title: 'Creative Tech Lead',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDB3rsV8VyHp7OEmMJEN9dRE02TjSQHsotXOtrUJiMRCdzJVDxttkSShlLR5aSCRjBlSEqCrSbZvIUVaVajmk3lRJl97ziryD7pzjfUwkhUWLFwnfWQ6wDmzuvWiHUHRh9zaa_ckEUVMjAd9ZOUWczGRzsN5FaFzFuzOSu5kCwJKojD1tO7-2KhZdwCaZJJPzeGhiy_W3BjlbpICyyv7e7K2qHA21AO0wuOtwG9kSPbHYCpMsyNx4yKWQ',
    },
  },
  {
    id: 'course-6',
    title: 'Spline 3D + Webflow: Spatial Web Design Systems',
    discipline: 'uiux-spline',
    disciplineLabel: 'UI/UX 3D',
    disciplineIcon: '✨',
    software: 'spline',
    softwareTag: 'Spline 3D & Webflow',
    rating: 4.88,
    duration: '14h 20m',
    price: 39,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCB9cMxiVxdQjPtPk5Tf6ylXgReEMtCjd7BsTL3DyGTEGP9Pia0ODqNmqh7zWEGydzlcrWNv4kFOFMDnQXmq1o7rCbCN0VXeQiS7jplUn_TPGWb5lclor_i-BWk2kAYpeqX6lTWg3ghb24LDRKk2mT_k_Up5stLgX437cMw4CNRlZm5JTX6bdg6AZ6Mp3otEPXsyW_dBLPtPF7nRXnbqZtTM_GZ0yeblcl9DYHWTzJBjAbcJl79XbSohQ',
    imageAlt: 'Interactive 3D glass product mockup in Spline with frosted transparency, neon gradients',
    accentColor: '#EAB308',
    tagBgColor: '#FEF08A',
    tagTextColor: '#A16207',
    tagBorderColor: '#A16207',
    level: 'intermediate',
    instructor: {
      name: 'Chloe Vance',
      title: 'Spatial UI Director',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAUHaoV1wxeWiUIWBEClf8M_Y_mtxgSUVzyNfPdYaoFcRCiDibNH4evuVxahfZD_B-D2_gCcRQ2YWEDfDc2X55P0HoGKNlgkbm33V-4hbk23NW3gOOFDUnMDHV0YfQgpJCmMD19PNoAxcAee1TSc0YBC4qAd8HEJrfPSWHoE11Ce0RA9kLUwNtrMguAibsdwMOmqaoe3P4MyY-6f4OTVX0CxHs6DaRPyXRFL9_1uHXMWS4PFvmGxWeANw',
    },
  },
  {
    id: 'course-7',
    title: 'Generative AI Workflows for Concept Artists',
    discipline: 'generative-ai',
    disciplineLabel: 'Visual Tech',
    disciplineIcon: '🤖',
    software: 'figma',
    softwareTag: 'ComfyUI & Photoshop',
    rating: 4.82,
    duration: '12h 00m',
    price: 42,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCY84WZYf40-GsNYAMsvSlOxEOtZeF_xkp2ap7ffyyDGPf4j1_aM5gW_glIDcWLJLn97a85Ld34rf7y0q_TIyXbkHVQV2VVUkiEtMFKWAFQ3jcGzNYPzEmxU-aWC-pGtKyntAPPWuY6SGT_aMj8Rf6a4RQT3Cfmvfex77S26L2ZG_Wm-6w_l2N0nUquYpywRk330iD81jNG-90fcDJ75dVuVUUtIqSqQtWIdY66chPwJU8tn7HCnd9rPA',
    imageAlt: 'Sci-fi cyberpunk city concept architecture with layered digital brush strokes',
    accentColor: '#10B981',
    tagBgColor: '#D1FAE5',
    tagTextColor: '#059669',
    tagBorderColor: '#059669',
    level: 'intermediate',
    instructor: {
      name: 'Marcus Wu',
      title: 'Principal Concept Artist',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCosdFLEC0ry9oUHdL_2Tpw4xNR67XC0sErhJhOVA0loI1bBOmBPcmjuAqjqdnjJ70I48qflsvgP4QRSuBLiHRyuSAzyePg1p-odO6rfJx9F2OXnRjPt6zgehHHI8-aHRDZYFdHPqRArhf4hPlohxSoQW03zqrk53KDClLut8-B_xEQaF7m6re_3b_S9WcyIMUXgbTg-FeL5Mv4I_0xQzBG2I3UyHL0OFoCSAEOeV7XwCZSNoNX1Rx8dA',
    },
  },
  {
    id: 'course-8',
    title: 'Anime Background Painting & Color Scripting',
    discipline: '2d-sakuga',
    disciplineLabel: 'Illustration',
    disciplineIcon: '🎨',
    software: 'tvpaint',
    softwareTag: 'Photoshop & Procreate',
    rating: 4.91,
    duration: '19h 50m',
    price: 39,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBnYSJYlob_NGH8x17ythnWXRQE5TnWgXDl1R97dpVlhiK8CNUG4_Knqdcy5foZFW_WBX_Ic6Rui7VWcDzobP0LLI_Zvny2T8VozMV6gxoWGq81u7p1Ljo7jRr3FoTc9xt9YNHTTsH48L2oZJ4aPTaIMVU65uNt-pPX92u3rLWyZ0I3mCgpvgPaqmwsZbu_0NqKWbIZlYJYYrDoLbQtQddRSPTZBjHSOEOnX0pSib6GIa-0kkcPcvWMsQ',
    imageAlt: 'Breathtaking anime painted background of a sun-drenched train crossing in suburban Japan',
    accentColor: '#3B82F6',
    tagBgColor: '#DBEAFE',
    tagTextColor: '#1D4ED8',
    tagBorderColor: '#1D4ED8',
    level: 'intermediate',
    instructor: {
      name: 'Elena Rostova',
      title: 'Studio Ghibli Fan Animator',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBEJj8t1WZMwvuaXACGxduzj9YgieUK20Q8kc_USm8DZ1cU4OULzugLDmoW6W8DoZvqm1NA2oykkHUCYqQx7-2JGcxUKWyKMwAsc-hPbN9jcZi64VBNR0rpeLOpfFgPwclhpcMwqnk1xRqTjGnpyfAtbRjoGHbxK32DFshOXIFEw1gBiq4idJosiXCT2z3J1Dt7HRV4kFoayv9h0kRCnLJycXAGAtABKaGlisFiXq5N4ghL5n8PGgC-_w',
    },
  },
];

export const valuePromisesData: ValuePromise[] = [
  {
    id: 'promise-1',
    badge: '24H TURNAROUND',
    badgeBg: 'bg-[#F43F5E]',
    title: 'Human Mentor Feedback',
    description:
      'Submit your work files directly to senior animators and developers. Receive custom annotated Loom video breakdowns within 24 hours.',
    icon: 'rate_review',
    iconBg: 'bg-[#F43F5E]',
    cardBg: 'bg-[#FFE4E6]',
    shadowColor: '',
    rotateClass: '-rotate-6',
  },
  {
    id: 'promise-2',
    badge: 'PRODUCTION READY',
    badgeBg: 'bg-[#0891B2]',
    title: 'Production Project Files',
    description:
      'Full commercial-ready starter kits (.blend, .aep, .fig, and GLSL repositories) updated continuously with each software release.',
    icon: 'folder_zip',
    iconBg: 'bg-[#06B6D4]',
    cardBg: 'bg-[#CFFAFE]',
    shadowColor: '',
    rotateClass: 'rotate-6',
  },
  {
    id: 'promise-3',
    badge: 'ON-CHAIN & GUILD XP',
    badgeBg: 'bg-[#CA8A04]',
    title: 'Gamified Badges & XP',
    description:
      'Earn gamified XP, unlock verified digital creator credentials, and get automatically showcased in the SkillPop talent guild.',
    icon: 'military_tech',
    iconBg: 'bg-[#EAB308]',
    cardBg: 'bg-[#FEF08A]',
    shadowColor: '',
    rotateClass: '-rotate-3',
  },
];

export const softwareOptions = [
  { value: '', label: '🛠️ All Creative Tools' },
  { value: 'blender', label: 'Blender 4.x' },
  { value: 'after-effects', label: 'Adobe After Effects' },
  { value: 'threejs', label: 'Three.js / WebGL' },
  { value: 'godot', label: 'Godot 4 Engine' },
  { value: 'tvpaint', label: 'Toon Boom / TVPaint' },
  { value: 'spline', label: 'Spline 3D' },
  { value: 'figma', label: 'Figma Motion' },
];

export const levelOptions = [
  { value: '', label: '🎯 Any Level' },
  { value: 'beginner', label: 'Beginner Friendly' },
  { value: 'intermediate', label: 'Intermediate Core' },
  { value: 'master', label: 'Studio Masterclass' },
];

export const sortOptions = [
  { value: 'trending', label: '⚡ Trending Now' },
  { value: 'rating', label: '★ Highest Rated' },
  { value: 'newest', label: '✨ New Releases' },
  { value: 'duration', label: '⏱ Duration' },
];
