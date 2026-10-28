import React, { useState, useEffect, useRef } from 'react';
import { RevealOnScroll, BrandLogo } from '../components/atoms';
import { ThemeToggle } from '../components/molecules';

export interface LandingPageProps {
  onNavigateToCourses?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToNotes?: () => void;
  onNavigateToAuth?: () => void;
}

interface MasterclassCourse {
  id: string;
  title: string;
  category: string;
  level: string;
  instructor: {
    name: string;
    avatar: string;
    role: string;
  };
  duration: string;
  rating: number;
  reviewsCount: string;
  enrolledCount: string;
  price: number;
  originalPrice: number;
  badgeText: string;
  badgeColor: string;
  image: string;
  bgCategoryColor: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToCourses,
  onNavigateToDashboard,
  onNavigateToNotes,
  onNavigateToAuth,
}) => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('skillpop-theme') || localStorage.getItem('theme');
      if (savedTheme !== null) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('skillpop-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('skillpop-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Copy code toast
  const [copiedCode, setCopiedCode] = useState(false);
  const handleCopyCode = () => {
    navigator.clipboard.writeText('SUPER50');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Keyboard shortcut listener for '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement !== searchInputRef.current &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter tab state in courses section
  const [selectedCategory, setSelectedCategory] = useState<string>('All Courses');

  // Video Reel Modal
  const [showReelModal, setShowReelModal] = useState(false);
  const [isPlayingReel, setIsPlayingReel] = useState(true);

  // Quick Enroll / Course Detail Modal
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<MasterclassCourse | null>(null);

  // Free Pass CTA Form state
  const [ctaEmail, setCtaEmail] = useState('');
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  // Masterclass Course Data
  const masterclasses: MasterclassCourse[] = [
    {
      id: 'sakuga-2d',
      title: 'Dynamic Character Action & Sakuga Animation',
      category: '2D Animation',
      level: 'Beginner to Pro',
      instructor: {
        name: 'Dikshant R.',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDTjUJ4CipA6XH5axD6mD7vrS4Rw0O-Cif-fCtuXpSbkJOiPDIWFrizBsyAoCXgU5Hc84L0ODa-blRrn6ZBOlo38bWYGbFQ6ks78pJosVO-SlWqA1fvs-o5E-oXdolwgEWE13KhLbOXyfDtyncN8Tr15zgShExXs96fNeMGPZypQpe8niYJNo8DhOSxDZ-QQn9QQ7DTlPqZnyZRB7aB4oq_fm5QPcrMk6LkqGv_VajGa8GWcu7Y82BWGw',
        role: 'Lead Animator at Studio Trigger Alum',
      },
      duration: '18h 40m',
      rating: 4.9,
      reviewsCount: '4.2k',
      enrolledCount: '6,120 enrolled',
      price: 39,
      originalPrice: 89,
      badgeText: '🔥 BESTSELLER',
      badgeColor: 'bg-pop-yellow text-neutral-900',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCU836jcnnZQdYN0248gO2S2JvHpW5CEJEL4rIdJbUT1FAzd0Y7kp50GRuSxyfYpLYxgytzccu5JQuyGWTVhc0h9x_E1GqK1Cji_5II4Vo0OHiM-3VhSVTLu6dnoAcst5Pr5tNR9scFPZCbW22R-zQLvBjU26H4eA0H05bAtBqJK1H79dKibM0kDt-wPErl-kSCBVbqeSI3faazFohQBWRAXQfVghQErhXH185aSMoabvJjtXp65cVn-Q',
      bgCategoryColor: 'bg-amber-100 dark:bg-amber-950/40',
    },
    {
      id: 'blender-lofi',
      title: 'Cozy Lo-Fi Isometric Worlds in Blender 4.0',
      category: '3D Character Art',
      level: 'Blender 4.0',
      instructor: {
        name: 'Sarah Jenkins',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBT5RAJdDSI3_eyBvOsUfE8Gc6hx7EjamUBgLprNZFMXSzHVTMmX0orGgiqHCfI6yWn5ztFgh2CbW_J5yCGQQY3wJew_K5rq9dTchj4KFwuQLGcVVOzLycUoXI26OuU7-CDYSZ49DvjTzuL0LN4GRlJoC_nNuKTo67AJOExKr2CFSQqcUQEX4C5OAha28dw17qI017-C1SQQ36V1isJFanmAy2_T1ml14ewhay6Z-Gr6G8rW4p10KRo6g',
        role: '3D Environment Concept Artist',
      },
      duration: '24h 10m',
      rating: 5.0,
      reviewsCount: '2.9k',
      enrolledCount: '8,410 enrolled',
      price: 45,
      originalPrice: 95,
      badgeText: '✨ STAFF PICK',
      badgeColor: 'bg-pop-cyan text-neutral-900',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDp-0TTsuNWi0r3ZK4EiLmIltGEAUXtWYVDuyIJAZ6X63kXW9e1hv09cSuvYoixn6NZKfPdirieS1vkVdJDEo-Dtnz-1-YDz0iD_vLVnDupqQApis8nv1DVcZULI6d121WFv2MGeWYJ0m5D7WRnGzuy3pxf_DtUyWDvotvjcDyugO20jZ75uBxmVGEw79Yh-36cThfhsyDPuIB51TqW-DLgHip-e_3Kdl0XJb6rDjMrhN3mL7C_2gKGHQ',
      bgCategoryColor: 'bg-purple-100 dark:bg-purple-950/40',
    },
    {
      id: 'kinetic-typography',
      title: 'Kinetic Typography & Pop UI Animations',
      category: 'Motion Graphics',
      level: 'After Effects',
      instructor: {
        name: 'Kai Takahashi',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDipaiGfpFQJgNpoKp1kQgM1fTU8lUtIp9uI-oIUekB825jfjYmnzVvWEPAQ_7ZoapFxrd-z1JRNDKcWko_m-w3qk9NdD_AxLp5JKnTeJpV8yZXCWWGtJt-40aQukHshRyLY59ETAHlWk91OM2l-r_jpl9LXlXPmlpNC3E_F_uMLvzVdvBVXsgcOuH4mEY2X0rFZGT9ZJjGQ2B8_WYtPbQqw4R-MNhyM753zlItOxq_PsJOd4ofPjfQJg',
        role: 'Motion Director & Brand Designer',
      },
      duration: '14h 15m',
      rating: 4.85,
      reviewsCount: '1.8k',
      enrolledCount: '5,320 enrolled',
      price: 34,
      originalPrice: 79,
      badgeText: '⚡ TRENDING',
      badgeColor: 'bg-pop-pink text-white',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBMtXIVb0SJ1n43cat1sNw2MulRHNWZxi7hM7d-m1t1791hKSDoMPivvW6zmlfJZa69Wu-TxH6yXRtQWvxNKkPDeOL8uu8ALeyedl7ZV-XsYu4N72zSkTZp--tnb1HzjM6b6U8myhtx854lS6JxH07XrbstCHSTPOmPUG-lzVpcPAm-vtTUMl2Ax1RcSW5GiDWPOGcSnOpTI1qa635rfxSNuRv-aAo1yOjLv6HYLpgNaPJpouB8y9ADpw',
      bgCategoryColor: 'bg-rose-100 dark:bg-rose-950/40',
    },
    {
      id: 'godot-action',
      title: 'Make Your First 2D Action Platformer in Godot 4',
      category: 'AI Magic & Code',
      level: 'Godot 4 Engine',
      instructor: {
        name: 'Maya Lin',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuC8clLofM2mv7gdWsSozs8UhE0T_2C9k42L7Fe0Ft40T1JDJExiVcrADxNe4TltlKm8z8QXRlaNooP3i4ptZFC8jp6sHfqWH2PFn-ectkEoLeSkTZ03loZrWLEzomo6GneggXb-ixawVYm8iAeFnsIjwqtF34xOr0sq4ScMTpXQYx61R8L2xrr5f6kyroa1K_JsyK23OyG2sDKMnLFr8YStObshGOAYqtkVzPDP18QO-3CK_IIvS8aSVA',
        role: 'Indie Game Dev & GDScript Guru',
      },
      duration: '31h 00m',
      rating: 4.92,
      reviewsCount: '3.4k',
      enrolledCount: '9,200 enrolled',
      price: 49,
      originalPrice: 109,
      badgeText: '👾 POPULAR',
      badgeColor: 'bg-pop-lime text-neutral-900',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBKm8NTp9EKr2DWiNRAIAWaZ80ZUuxNJHo5hfNmR1cGBZol8mLe3ztT3iyBzI_oeIKee2xC6VxJFXbwDs6qfV4V0OBAx09xYb3WbD9DocEbafLdtB6H0gKe435DVQ9eM34RP3010vIeGTp_PqCMsZkq1J1B96HSbRGZZEtaXtFQ2pQXqicB5pmgtvVOeWcSc676IyRpZVNvdpx4Dqvx2HHbMnr8vhFaWJTgTnuD_XI7ABR1w7Xiq7zUjA',
      bgCategoryColor: 'bg-emerald-100 dark:bg-emerald-950/40',
    },
  ];

  // Filter courses based on tab and query
  const filteredCourses = masterclasses.filter((course) => {
    const matchesCategory =
      selectedCategory === 'All Courses' || course.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ctaEmail.trim()) {
      setCtaSubmitted(true);
    }
  };

  const handleEnrollClick = (course: MasterclassCourse) => {
    setSelectedCourseForEnroll(course);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-neutral-900 dark:text-neutral-100 font-sans antialiased overflow-x-hidden selection:bg-pop-lime selection:text-neutral-900 transition-colors duration-200 min-h-screen">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="shimmer-banner bg-pop-yellow text-neutral-900 font-semibold text-xs sm:text-sm py-2 px-4 border-b-2 border-neutral-900 flex items-center justify-center gap-2 relative z-50">
        <span className="inline-block animate-bounce text-base">⚡</span>
        <span>
          <strong>SUMMER FLASH:</strong> Get 50% OFF Pro Pass with code{' '}
          <button
            type="button"
            onClick={handleCopyCode}
            title="Click to copy code"
            className="inline-flex items-center gap-1 bg-white hover:bg-neutral-100 px-2 py-0.5 rounded border border-neutral-900 font-mono text-xs font-black shadow-[1px_1px_0px_#000] cursor-pointer active:translate-y-0.5 transition-transform"
          >
            <span>SUPER50</span>
            <span className="material-symbols-rounded text-xs">
              {copiedCode ? 'check' : 'content_copy'}
            </span>
          </button>
        </span>
        <span className="hidden sm:inline-block">• Hand-picked courses for designers, coders &amp; animators!</span>
        <span className="inline-block text-base">🎨</span>

        {copiedCode && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-neutral-900 text-pop-lime text-xs font-doodle px-2.5 py-1 rounded-full border border-pop-lime shadow-pop hidden md:inline-flex items-center gap-1 animate-pulse">
            <span>Code Copied!</span>
            <span>🎉</span>
          </span>
        )}
      </div>

      {/* 2. STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b-2 border-neutral-900 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <BrandLogo
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 font-semibold text-sm">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('courses');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer"
            >
              Courses
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('tracks');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer"
            >
              Career Tracks
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('community');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Community</span>
              <span className="bg-pop-pink text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                HOT
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToCourses?.()}
              className="px-4 py-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer"
            >
              Catalog
            </button>
          </nav>

          {/* Header Action elements */}
          <div className="flex items-center gap-3">
            {/* Live Search Bar */}
            <div className="hidden lg:flex items-center bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 rounded-full px-3 py-1.5 w-52 focus-within:w-64 transition-all">
              <span className="material-symbols-rounded text-neutral-500 dark:text-neutral-400 text-lg mr-2">
                search
              </span>
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-transparent border-none text-xs w-full focus:outline-none focus:ring-0 p-0 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400"
                placeholder="Search 3D, Blender, Code..."
                type="text"
              />
              <span className="text-[10px] bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-neutral-600 dark:text-neutral-300 font-mono">
                /
              </span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} id="themeToggle" />

            {/* Start Free / Auth CTA */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateToAuth) {
                  onNavigateToAuth();
                } else {
                  document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-tactile-primary bg-primary hover:bg-primary-dark text-neutral-900 font-doodle font-bold px-4 sm:px-5 py-2.5 rounded-full custom-doodle-border shadow-pop flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <span>Start Free</span>
              <span className="material-symbols-rounded text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:py-24 overflow-hidden bg-background-light dark:bg-background-dark">
        {/* Floating background decorative vectors */}
        <div
          className="absolute top-10 left-8 text-pop-purple opacity-40 select-none pointer-events-none hidden md:block animate-float-alt"
          style={{ ['--rot' as string]: '-8deg' }}
        >
          <svg fill="none" height="48" stroke="currentColor" strokeWidth="3" viewBox="0 0 48 48" width="48">
            <path d="M24 4L27 19L42 24L27 29L24 44L21 29L6 24L21 19L24 4Z" fill="#8B5CF6" fillOpacity="0.2" />
          </svg>
        </div>
        <div
          className="absolute bottom-16 left-1/3 text-pop-yellow opacity-70 select-none pointer-events-none hidden lg:block animate-float-pill"
          style={{ ['--rot' as string]: '12deg' }}
        >
          <svg fill="currentColor" height="36" viewBox="0 0 24 24" width="36">
            <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
          </svg>
        </div>
        <div
          className="absolute top-24 right-10 text-pop-cyan opacity-50 select-none pointer-events-none hidden lg:block animate-float-alt"
          style={{ ['--rot' as string]: '5deg' }}
        >
          <svg fill="none" height="64" stroke="currentColor" strokeLinecap="round" strokeWidth="4" viewBox="0 0 64 64" width="64">
            <path d="M8 12C20 8 44 24 32 40C20 56 48 60 56 48" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <RevealOnScroll variant="fade-up" duration={700}>
                <div
                  className="animate-float-pill inline-flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-600 rounded-full px-4 py-1.5 mb-6 shadow-pop cursor-default"
                  style={{ ['--rot' as string]: '-1deg' }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pop-pink opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pop-pink" />
                  </span>
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    🚀 Hey, Let&apos;s Learn Something DOPE!
                  </span>
                </div>

                <h1 className="font-doodle text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-6">
                  Level Up Your <br className="hidden sm:inline" />
                  <span className="relative inline-block px-2 text-neutral-900 dark:text-neutral-900">
                    <span className="absolute inset-0 bg-primary -rotate-1 rounded-lg custom-doodle-border -z-10 shadow-pop" />
                    Creative &amp; Tech
                  </span>
                  <br />
                  Superpowers.
                </h1>

                <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 font-medium max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                  Ditch dry slides! Master <strong>2D &amp; 3D Animation, Motion Design, Generative AI, Fullstack &amp; Game Dev</strong> through gamified bite-sized projects taught by award-winning indie creators.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateToCourses) {
                        onNavigateToCourses();
                      } else {
                        document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="btn-tactile-primary bg-primary hover:bg-primary-dark text-neutral-900 font-doodle text-lg font-bold px-8 py-4 rounded-full custom-doodle-border shadow-pop-lg flex items-center gap-3 cursor-pointer"
                  >
                    <span className="material-symbols-rounded text-2xl">rocket_launch</span>
                    <span>Explore 200+ Courses</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowReelModal(true)}
                    className="btn-tactile-secondary bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-doodle text-base font-bold px-6 py-4 rounded-full custom-doodle-border shadow-pop flex items-center gap-2.5 cursor-pointer"
                  >
                    <span className="w-8 h-8 rounded-full bg-pop-purple text-white flex items-center justify-center shadow-sm">
                      <span className="material-symbols-rounded text-lg">play_arrow</span>
                    </span>
                    <span>Watch 90s Reel</span>
                  </button>
                </div>

                {/* Social Proof Bar */}
                <div className="pt-6 border-t-2 border-dashed border-neutral-300 dark:border-neutral-700 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  <div className="flex items-center -space-x-3">
                    <img
                      alt="Student avatar 1"
                      className="w-10 h-10 rounded-full border-2 border-neutral-900 object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcXy0X1ASks4vOeJej9P1CkDM9wy_eAVJGGeoYlmGSz54mHfn1QZaevtHLW0rQZj5TYSJH1RSOAnJisr09IQbEGpQ4IZfxsSFvZg0XDgM5e0jZbUMz_0K8l0U5ivXqHrZ_N1c5jdHKfEe_WbVthzP7QHPANoxNe7S1tlty03EyxR4yEp8E3XvI8PBuw1BLAA8GvbX4wVb6kiFAs8Lxm1_FOFgLoOsBj33Mdz83Va397RWuBzhjhmgi4w"
                    />
                    <img
                      alt="Student avatar 2"
                      className="w-10 h-10 rounded-full border-2 border-neutral-900 object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWH1RfB4X7wpOj0WUeQ8vIrUYBtUffea1XSoJcVBidkwsUbxmhdOtpUrMvEoXNM09BDQBDm1XerKs3kKMNZTG0sVJou60JlklP8nRiiVvQXUXnSWxkswWRM4eBk_p5GbBPsUpQ0PQ4Jz8wK4-m5BC5nrZK9OjU6YOoCMFa10FDKxu6Krfj5CY7VstOdch7Zcxe-TXyav2MXPQ-PE3FVr1egr5f-sIUW-trvKFNubNoPaycXsJSxty0HQ"
                    />
                    <img
                      alt="Student avatar 3"
                      className="w-10 h-10 rounded-full border-2 border-neutral-900 object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC30IcC1apKZO3EBdeYl5mVlpYWm7LHwMeh6DaiANNxvDKeBJZKA8zOa1rrfPGdMditV1HJhX2q6z5LQxGtPuGDOsjCaPuZhFntbo8uuuI8NHOKRWrn5x1r4UwoR5FSBR7VNh-rCwQm4Vm2neMXaUHiXRaFTgT4fRLm7qQm4o-yaH9hER5UXHkm-SyVfwPbGd39lxyNaUbbzRPqV0_6-ONg4XRh1bKmV2N7w6-7gn65ISkziC0jkHnoKA"
                    />
                    <div className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-pop-yellow text-neutral-900 font-black text-xs flex items-center justify-center font-doodle">
                      +45k
                    </div>
                  </div>

                  <div className="text-left text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center text-pop-yellow text-base">
                      ★★★★★ <span className="text-neutral-900 dark:text-white font-bold ml-1.5 text-xs">4.9 / 5.0</span>
                    </div>
                    <span>from 18,200+ passionate creators worldwide</span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Column: Hero Interactive Showcase Card */}
            <div className="lg:col-span-5 relative">
              <RevealOnScroll variant="fade-left" delay={150} duration={750}>
                <div className="relative mx-auto max-w-md lg:max-w-none bg-neutral-900 dark:bg-neutral-950 rounded-3xl p-5 custom-doodle-border shadow-pop-lg text-white">
                  {/* Floating pill badge */}
                  <div
                    className="animate-float-pill absolute -top-7 -right-4 bg-pop-cyan text-neutral-950 font-doodle font-bold px-4 py-2 rounded-2xl custom-doodle-border shadow-pop text-xs sm:text-sm z-20 flex items-center gap-1.5"
                    style={{ ['--rot' as string]: '6deg' }}
                  >
                    <span>Interactive 2D/3D Tracks!</span>
                    <span className="text-base">✨</span>
                  </div>

                  <div
                    className="animate-float-alt absolute -top-6 left-6 text-pop-lime font-black text-3xl select-none z-20"
                    style={{ ['--rot' as string]: '-12deg' }}
                  >
                    👑
                  </div>

                  {/* Video / Visual Artwork Showcase */}
                  <div
                    onClick={() => setShowReelModal(true)}
                    className="relative rounded-2xl overflow-hidden bg-neutral-800 border-2 border-neutral-700 aspect-4/3 flex items-center justify-center group cursor-pointer"
                  >
                    <img
                      alt="3D and Motion Graphics Abstract Course Art"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-7xo7S7o76hHMAabQea3HpFhn0oQfh7Hnf35NJsavQ2kuraQGkX9OqAo1_HPGnc81fJoUwX-v5TZvf0w6k19Bbijt63zHKj-zSlOhst_YrfC0GvfeGgeT36h_oPheWA4Zf2BZ5i6Vr_HeRImGOLNvgTsAFcUQ0XB33yCdCGcIHnHhDAYtMcvncDepRk7IGe_zIH-ly1I83w2O7tzgVaO4zyzpwx_iNshmca03eMFdC3ejupxRPR43KA"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        aria-label="Play showreel demo"
                        className="animate-pulse-glow w-16 h-16 rounded-full bg-primary text-neutral-900 flex items-center justify-center custom-doodle-border shadow-pop transform group-hover:scale-110 active:scale-95 transition-transform"
                      >
                        <span className="material-symbols-rounded text-3xl font-black">play_arrow</span>
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div>
                        <span className="bg-pop-pink text-white text-xs font-bold px-2.5 py-1 rounded-md font-doodle uppercase">
                          Featured Live Showreel
                        </span>
                        <h3 className="font-doodle text-lg font-bold text-white mt-1">2D &amp; 3D Motion Masterclass</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-pop-lime font-bold font-mono">12 Cohort Weeks</span>
                      </div>
                    </div>
                  </div>

                  {/* Software tags */}
                  <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs font-bold">
                    <div className="flex items-center gap-1.5 bg-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-colors">
                      <span className="text-blue-400">Ae</span>
                      <span>AfterEffects</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-colors">
                      <span className="text-orange-400">Bl</span>
                      <span>Blender 4.0</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-colors">
                      <span className="text-purple-400">Fi</span>
                      <span>Figma Pro</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-colors">
                      <span className="text-pop-lime">Un</span>
                      <span>Unreal 5</span>
                    </div>
                  </div>

                  {/* Guarantee info */}
                  <div className="mt-4 bg-neutral-800/80 rounded-xl p-3 border border-neutral-700/80 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pop-lime text-neutral-900 font-doodle font-black flex items-center justify-center shrink-0">
                      99%
                    </div>
                    <p className="text-xs text-neutral-300">
                      <span className="font-bold text-white">Project-First Guarantee:</span> Graduate with 4 portfolio-ready showcase animations.
                    </p>
                  </div>
                </div>

                {/* Live badge bottom indicator */}
                <div className="animate-live-badge absolute -bottom-6 -left-6 bg-pop-yellow text-neutral-900 font-doodle font-bold px-3 py-1.5 rounded-xl custom-doodle-border shadow-pop text-xs z-20 flex items-center gap-1 cursor-default">
                  <span className="relative flex h-2 w-2 mr-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                  </span>
                  <span>🔥 24 Live Spots Left</span>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DISCIPLINE / CAREER TRACKS SECTION */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900/40 border-y-2 border-neutral-900 dark:border-neutral-800" id="tracks">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="flex items-center gap-2 text-pop-purple font-doodle font-bold uppercase text-sm tracking-widest mb-1">
                  <span>✦ EXPLORE DISCIPLINES</span>
                </div>
                <h2 className="font-doodle text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
                  Pick Your Creative Playground 🕹️
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-2">
                  No boring lectures. Hands-on learning organized into fast-paced specialty tracks.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToCourses?.()}
                className="inline-flex items-center gap-2 font-doodle font-bold text-neutral-900 dark:text-white hover:text-pop-purple dark:hover:text-pop-lime transition-colors text-sm group cursor-pointer"
              >
                <span>View All 16 Topics</span>
                <span className="material-symbols-rounded transform group-hover:translate-x-1.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {/* 2D Animation */}
            <RevealOnScroll variant="pop" delay={50} className="h-full">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('2D Animation');
                  document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="card-tactile-tilt-pos group bg-white dark:bg-neutral-900 p-5 rounded-2xl custom-doodle-border shadow-pop text-center flex flex-col items-center cursor-pointer w-full h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 border-2 border-neutral-900 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  ✏️
                </div>
                <h3 className="font-doodle font-bold text-neutral-900 dark:text-white text-base">2D Animation</h3>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">34 Courses</span>
                <span className="mt-3 text-[10px] uppercase font-bold bg-amber-200 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded-full border border-neutral-900 group-hover:scale-105 transition-transform">
                  Popular
                </span>
              </button>
            </RevealOnScroll>

            {/* 3D & Blender */}
            <RevealOnScroll variant="pop" delay={100} className="h-full">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('3D Character Art');
                  document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="card-tactile-tilt-neg group bg-white dark:bg-neutral-900 p-5 rounded-2xl custom-doodle-border shadow-pop text-center flex flex-col items-center cursor-pointer w-full h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 border-2 border-neutral-900 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                  🍩
                </div>
                <h3 className="font-doodle font-bold text-neutral-900 dark:text-white text-base">3D &amp; Blender</h3>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">48 Courses</span>
                <span className="mt-3 text-[10px] uppercase font-bold bg-orange-200 dark:bg-orange-950/80 text-orange-900 dark:text-orange-300 px-2 py-0.5 rounded-full border border-neutral-900 group-hover:scale-105 transition-transform">
                  Trending
                </span>
              </button>
            </RevealOnScroll>

            {/* Motion Design */}
            <RevealOnScroll variant="pop" delay={150} className="h-full">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Motion Graphics');
                  document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="card-tactile-tilt-pos group bg-white dark:bg-neutral-900 p-5 rounded-2xl custom-doodle-border shadow-pop text-center flex flex-col items-center cursor-pointer w-full h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 border-2 border-neutral-900 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  ⚡
                </div>
                <h3 className="font-doodle font-bold text-neutral-900 dark:text-white text-base">Motion Design</h3>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">29 Courses</span>
                <span className="mt-3 text-[10px] uppercase font-bold bg-purple-200 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300 px-2 py-0.5 rounded-full border border-neutral-900 group-hover:scale-105 transition-transform">
                  Ae &amp; Rive
                </span>
              </button>
            </RevealOnScroll>

            {/* Game Art & Dev */}
            <RevealOnScroll variant="pop" delay={200} className="h-full">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('AI Magic & Code');
                  document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="card-tactile-tilt-neg group bg-white dark:bg-neutral-900 p-5 rounded-2xl custom-doodle-border shadow-pop text-center flex flex-col items-center cursor-pointer w-full h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 border-2 border-neutral-900 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                  🎮
                </div>
                <h3 className="font-doodle font-bold text-neutral-900 dark:text-white text-base">Game Art &amp; Dev</h3>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">42 Courses</span>
                <span className="mt-3 text-[10px] uppercase font-bold bg-emerald-200 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-neutral-900 group-hover:scale-105 transition-transform">
                  Unity/Godot
                </span>
              </button>
            </RevealOnScroll>

            {/* AI & Visual Tech */}
            <RevealOnScroll variant="pop" delay={250} className="h-full">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('AI Magic & Code');
                  document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="card-tactile-tilt-pos group bg-white dark:bg-neutral-900 p-5 rounded-2xl custom-doodle-border shadow-pop text-center flex flex-col items-center cursor-pointer w-full h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 border-2 border-neutral-900 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  🤖
                </div>
                <h3 className="font-doodle font-bold text-neutral-900 dark:text-white text-base">AI &amp; Visual Tech</h3>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">19 Courses</span>
                <span className="mt-3 text-[10px] uppercase font-bold bg-cyan-200 dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-300 px-2 py-0.5 rounded-full border border-neutral-900 group-hover:scale-105 transition-transform">
                  New Hot
                </span>
              </button>
            </RevealOnScroll>

            {/* UI/UX & Figma */}
            <RevealOnScroll variant="pop" delay={300} className="h-full">
              <button
                type="button"
                onClick={() => onNavigateToCourses?.()}
                className="card-tactile-tilt-neg group bg-white dark:bg-neutral-900 p-5 rounded-2xl custom-doodle-border shadow-pop text-center flex flex-col items-center cursor-pointer w-full h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-900/30 border-2 border-neutral-900 flex items-center justify-center text-3xl mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                  💎
                </div>
                <h3 className="font-doodle font-bold text-neutral-900 dark:text-white text-base">UI/UX &amp; Figma</h3>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">51 Courses</span>
                <span className="mt-3 text-[10px] uppercase font-bold bg-rose-200 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 px-2 py-0.5 rounded-full border border-neutral-900 group-hover:scale-105 transition-transform">
                  Top Rated
                </span>
              </button>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 5. TOP MASTERCLASSES SECTION */}
      <section className="py-20 bg-background-light dark:bg-background-dark relative" id="courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-block bg-pop-pink text-white font-doodle font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-neutral-900 shadow-pop">
                HAND-PICKED MASTERCLASSES
              </span>
              <h2 className="font-doodle text-3xl sm:text-5xl font-bold text-neutral-900 dark:text-white mt-4 mb-3">
                Top Courses with Real Pro Mentors
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
                Every project is built from scratch, reviewed with real instructor feedback, and includes downloadable raw asset files.
              </p>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                {['All Courses', '2D Animation', '3D Character Art', 'Motion Graphics', 'AI Magic & Code'].map(
                  (cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`font-doodle text-sm font-bold px-4 py-2 rounded-full border-2 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 shadow-pop-hover -translate-y-0.5'
                            : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:-translate-y-0.5 border-neutral-900 dark:border-neutral-700'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </RevealOnScroll>

          {/* Masterclasses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <RevealOnScroll
                key={course.id}
                variant="fade-up"
                delay={index * 100}
                className="h-full flex flex-col"
              >
                <div className="course-card-tactile bg-white dark:bg-neutral-900 rounded-3xl border-2 border-neutral-900 dark:border-neutral-700 shadow-pop overflow-hidden flex flex-col group h-full">
                  {/* Course Thumbnail */}
                  <div className={`relative aspect-video overflow-hidden ${course.bgCategoryColor} border-b-2 border-neutral-900 dark:border-neutral-700`}>
                    <img
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={course.image}
                    />
                    <span
                      className={`absolute top-3 left-3 ${course.badgeColor} font-doodle font-bold text-xs px-2.5 py-0.5 rounded-full border border-neutral-900 shadow-sm group-hover:rotate-2 transition-transform`}
                    >
                      {course.badgeText}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-neutral-900/80 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur">
                      {course.duration}
                    </span>
                  </div>

                  {/* Course Details */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
                      <span className="text-pop-purple dark:text-pop-lime font-bold">{course.category}</span>
                      <span>•</span>
                      <span>{course.level}</span>
                    </div>

                    <h3 className="font-doodle text-lg font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-pop-purple dark:group-hover:text-pop-lime transition-colors">
                      {course.title}
                    </h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                      <img
                        alt={course.instructor.name}
                        className="w-7 h-7 rounded-full border border-neutral-900 object-cover"
                        src={course.instructor.avatar}
                      />
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        By <strong>{course.instructor.name}</strong>
                      </span>
                    </div>

                    {/* Rating & Enrollment */}
                    <div className="flex items-center justify-between mt-3 text-xs">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <span>★</span>
                        <span className="text-neutral-900 dark:text-white font-mono">{course.rating}</span>
                        <span className="text-neutral-400">({course.reviewsCount})</span>
                      </div>
                      <span className="text-neutral-500 dark:text-neutral-400 font-mono">
                        {course.enrolledCount}
                      </span>
                    </div>

                    {/* Price & Action */}
                    <div className="mt-5 pt-3 border-t-2 border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-lg font-black font-doodle text-neutral-900 dark:text-white">
                          ${course.price}
                        </span>
                        <span className="text-xs text-neutral-400 line-through ml-1">
                          ${course.originalPrice}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleEnrollClick(course)}
                        className="btn-tactile-primary bg-primary hover:bg-primary-dark text-neutral-900 font-doodle font-bold px-3.5 py-1.5 rounded-full border border-neutral-900 text-xs shadow-pop-hover cursor-pointer"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* CTA under courses */}
          <RevealOnScroll variant="fade-up" delay={150}>
            <div className="text-center mt-12">
              <button
                type="button"
                onClick={() => onNavigateToCourses?.()}
                className="btn-tactile-secondary inline-flex items-center gap-3 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-doodle font-bold px-8 py-3.5 rounded-full custom-doodle-border shadow-pop cursor-pointer"
              >
                <span>Explore All 200+ Masterclasses</span>
                <span className="material-symbols-rounded">arrow_outward</span>
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 6. WHY LEARN WITH SKILLPOP (GAMIFIED FEATURES) */}
      <section className="py-20 bg-neutral-100/70 dark:bg-neutral-900/50 border-t-2 border-neutral-900 dark:border-neutral-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block bg-primary text-neutral-900 font-doodle font-bold text-xs uppercase px-3 py-1 rounded-full border border-neutral-900 shadow-sm mb-3">
                Why Learn With SkillPop?
              </div>
              <h2 className="font-doodle text-3xl sm:text-5xl font-bold text-neutral-900 dark:text-white">
                Learning That Actually Feels Like Playing a Game 🕹️
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-3 text-sm sm:text-base">
                Say goodbye to boring video players and hello to interactive XP points, portfolio milestone sprints, and direct mentor feedback.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <RevealOnScroll variant="fade-up" delay={50} className="h-full">
              <div className="card-tactile-elevate bg-white dark:bg-neutral-900 p-6 rounded-3xl custom-doodle-border shadow-pop relative group h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-pop-lime text-neutral-900 flex items-center justify-center font-bold text-2xl mb-4 custom-doodle-border shadow-sm transform -rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-transform">
                    🎯
                  </div>
                  <h3 className="font-doodle text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    Build Real Portfolio Pieces
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Forget toy projects. Finish every class with a production-ready artwork, game level, or animation reel ready for clients.
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center text-xs font-bold text-pop-purple dark:text-pop-lime font-doodle group-hover:translate-x-1 transition-transform">
                  <span>Client Ready Deliverables →</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Feature 2 */}
            <RevealOnScroll variant="fade-up" delay={150} className="h-full">
              <div className="card-tactile-elevate bg-white dark:bg-neutral-900 p-6 rounded-3xl custom-doodle-border shadow-pop relative group h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-pop-yellow text-neutral-900 flex items-center justify-center font-bold text-2xl mb-4 custom-doodle-border shadow-sm transform rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-transform">
                    💬
                  </div>
                  <h3 className="font-doodle text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    1-on-1 Loom Feedback
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Get screen-recorded video breakdowns on your keyframes, code cleanliness, or render lighting directly from industry pros.
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center text-xs font-bold text-pop-purple dark:text-pop-lime font-doodle group-hover:translate-x-1 transition-transform">
                  <span>Avg response &lt; 24h →</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Feature 3 */}
            <RevealOnScroll variant="fade-up" delay={250} className="h-full">
              <div className="card-tactile-elevate bg-white dark:bg-neutral-900 p-6 rounded-3xl custom-doodle-border shadow-pop relative group h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-pop-pink text-white flex items-center justify-center font-bold text-2xl mb-4 custom-doodle-border shadow-sm transform -rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-transform">
                    🏅
                  </div>
                  <h3 className="font-doodle text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    Earn Rare Collectible Badges
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Level up your creator card, unlock secret animation packs, and show off verifiable certificates on LinkedIn &amp; X.
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center text-xs font-bold text-pop-purple dark:text-pop-lime font-doodle group-hover:translate-x-1 transition-transform">
                  <span>Gamified XP &amp; Streaks →</span>
                </div>
              </div>
            </RevealOnScroll>

            {/* Feature 4 */}
            <RevealOnScroll variant="fade-up" delay={350} className="h-full">
              <div className="card-tactile-elevate bg-white dark:bg-neutral-900 p-6 rounded-3xl custom-doodle-border shadow-pop relative group h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-pop-cyan text-neutral-900 flex items-center justify-center font-bold text-2xl mb-4 custom-doodle-border shadow-sm transform rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-transform">
                    👾
                  </div>
                  <h3 className="font-doodle text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    24/7 Discord Jam Room
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Jump into co-working audio rooms, weekly animation jams, and share project WIPs with friendly peers around the world.
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center text-xs font-bold text-pop-purple dark:text-pop-lime font-doodle group-hover:translate-x-1 transition-transform">
                  <span>Join 45k+ Creators →</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 7. STUDENT SUCCESS & COMMUNITY */}
      <section className="py-20 bg-background-light dark:bg-background-dark border-t-2 border-neutral-900 dark:border-neutral-800" id="community">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Spotlight Story */}
            <div className="lg:col-span-7">
              <RevealOnScroll variant="fade-right" delay={100}>
                <div
                  className="inline-block bg-pop-yellow text-neutral-900 font-doodle font-bold text-xs uppercase px-3 py-1 rounded-full border border-neutral-900 mb-4 shadow-sm animate-float-pill"
                  style={{ ['--rot' as string]: '-2deg' }}
                >
                  ⭐ STUDENT SUCCESS STORY
                </div>

                <h2 className="font-doodle text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                  “SkillPop landed me my dream indie studio gig in 4 months.”
                </h2>

                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 custom-doodle-border shadow-pop-lg relative card-tactile-elevate">
                  <div className="flex items-center gap-1 text-amber-400 text-xl mb-4">
                    ★★★★★ <span className="text-neutral-500 text-xs font-sans font-bold ml-2">Verified Graduate</span>
                  </div>
                  <p className="text-base sm:text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed italic mb-6">
                    “I spent 2 years watching disjointed YouTube tutorials and felt stuck. SkillPop’s 2D character rigging sprint gave me clear feedback every week. The mentor spotted 3 key timing mistakes in my walk cycles within 10 minutes. I updated my showreel and got hired 3 weeks later!”
                  </p>

                  <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-4">
                    <div className="flex items-center gap-3">
                      <img
                        alt="Student Chloe"
                        className="w-12 h-12 rounded-full border-2 border-neutral-900 object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuANKeX6jj53HPyTYxCRC3TT4wur1IzW6qQx_pnujzfOzibvze6XDuZUX-7lsO17VyVd7WtGMXs3OJahxx0JCyYqHDz3hKmdUYbLCzNmZ1iyon5304rMlM8pUOKc8BYg4dnuyjq_UlEncNJgN4WUde8rDCKPSswfb8VlEHh1ac6QybauQwnGTz_5UpD_wImzVylKgkRDnYkySgODFaNphHJB1Onf5XjYMIfCnYBARKcUUbZG0v3ngN-MXg"
                      />
                      <div>
                        <h4 className="font-doodle font-bold text-neutral-900 dark:text-white text-base">
                          Chloe Vance
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Junior 2D Animator at PixelForge Games
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:block text-right">
                      <span className="text-xs font-mono bg-pop-lime text-neutral-900 font-bold px-2 py-1 rounded border border-neutral-900">
                        Course: Action Sakuga 2D
                      </span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Column: Mini Testimonials */}
            <div className="lg:col-span-5 space-y-4">
              <RevealOnScroll variant="fade-left" delay={100}>
                <div className="card-tactile-elevate bg-white dark:bg-neutral-900 p-4 rounded-2xl custom-doodle-border shadow-pop flex items-start gap-3 cursor-pointer">
                  <span className="text-2xl transform hover:scale-125 transition-transform">🔥</span>
                  <div>
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                      “The Blender isometric course alone is worth triple the annual pass. The asset files are pristine!”
                    </p>
                    <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 mt-1 block font-doodle">
                      — Marcus Lee • Freelance 3D Artist
                    </span>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll variant="fade-left" delay={200}>
                <div className="card-tactile-elevate bg-white dark:bg-neutral-900 p-4 rounded-2xl custom-doodle-border shadow-pop flex items-start gap-3 cursor-pointer">
                  <span className="text-2xl transform hover:scale-125 transition-transform">🎨</span>
                  <div>
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                      “Weekly animation challenges keep my skills sharp. Love the friendly feedback culture in the Discord.”
                    </p>
                    <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 mt-1 block font-doodle">
                      — Anita Patel • Motion Designer at Stripe
                    </span>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll variant="fade-left" delay={300}>
                <div className="card-tactile-elevate bg-white dark:bg-neutral-900 p-4 rounded-2xl custom-doodle-border shadow-pop flex items-start gap-3 cursor-pointer">
                  <span className="text-2xl transform hover:scale-125 transition-transform">⚡</span>
                  <div>
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                      “Taught me how to ship real interactive web projects with Spline &amp; Rive. Truly 10/10 content.”
                    </p>
                    <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 mt-1 block font-doodle">
                      — Jonas Holm • Creative Developer
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 7-DAY FREE TRIAL CTA */}
      <section className="py-16 bg-background-light dark:bg-background-dark" id="enroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="zoom-in" duration={750}>
            <div className="relative bg-neutral-900 dark:bg-neutral-950 rounded-3xl p-8 sm:p-14 custom-doodle-border shadow-pop-lg text-white overflow-hidden text-center md:text-left">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-pop-purple rounded-full opacity-30 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary rounded-full opacity-20 blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                <div className="md:col-span-8">
                  <div
                    className="animate-float-pill inline-flex items-center gap-2 bg-pop-lime text-neutral-950 font-doodle font-black text-xs uppercase px-3 py-1 rounded-full border border-neutral-900 mb-4"
                    style={{ ['--rot' as string]: '-1deg' }}
                  >
                    <span>🚀 7 DAYS UNLIMITED PASS</span>
                  </div>
                  <h2 className="font-doodle text-3xl sm:text-5xl font-bold leading-tight mb-4">
                    Ready to create something <br className="hidden sm:inline" />
                    <span className="text-primary underline decoration-wavy decoration-pop-pink underline-offset-8">
                      totally DOPE?
                    </span>
                  </h2>
                  <p className="text-neutral-300 text-sm sm:text-lg max-w-xl">
                    Join 45,000+ creators leveling up today. Instant access to all 200+ courses, private Discord mentors, and project files. Cancel anytime with one click.
                  </p>
                </div>

                <div className="md:col-span-4">
                  <div className="bg-neutral-800/90 p-5 rounded-2xl border-2 border-neutral-700 shadow-pop">
                    {ctaSubmitted ? (
                      <div className="text-center py-6 space-y-3">
                        <div className="w-14 h-14 bg-pop-lime text-neutral-900 rounded-full flex items-center justify-center mx-auto text-2xl font-black custom-doodle-border shadow-pop">
                          ✓
                        </div>
                        <h4 className="font-doodle text-lg font-bold text-white">
                          VIP Pass Activated! 🎉
                        </h4>
                        <p className="text-xs text-neutral-300">
                          Check your inbox at <strong className="text-pop-lime">{ctaEmail}</strong> for instant Discord and course catalog access.
                        </p>
                        <button
                          type="button"
                          onClick={() => onNavigateToCourses?.()}
                          className="btn-tactile-primary w-full bg-primary hover:bg-primary-dark text-neutral-900 font-doodle font-bold py-2.5 rounded-xl border border-neutral-900 text-xs shadow-pop-hover cursor-pointer mt-2"
                        >
                          Enter Course Catalog Now →
                        </button>
                      </div>
                    ) : (
                      <form className="space-y-3" onSubmit={handleCtaSubmit}>
                        <div>
                          <label
                            className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5 font-doodle text-left"
                            htmlFor="cta-email"
                          >
                            Your best email:
                          </label>
                          <input
                            className="w-full bg-neutral-900 border-2 border-neutral-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-primary focus:outline-none transition-colors"
                            id="cta-email"
                            placeholder="creator@studio.com"
                            required
                            type="email"
                            value={ctaEmail}
                            onChange={(e) => setCtaEmail(e.target.value)}
                          />
                        </div>
                        <button
                          className="btn-tactile-primary w-full bg-primary hover:bg-primary-dark text-neutral-900 font-doodle text-base font-bold py-3 px-4 rounded-xl custom-doodle-border shadow-pop flex items-center justify-center gap-2 cursor-pointer"
                          type="submit"
                        >
                          <span>Claim 7 Days Free</span>
                          <span className="material-symbols-rounded text-lg">arrow_forward</span>
                        </button>
                      </form>
                    )}

                    <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-neutral-400">
                      <span>✓ No credit card upfront</span>
                      <span>•</span>
                      <span>✓ Instant Discord invite</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-white dark:bg-neutral-950 border-t-2 border-neutral-900 dark:border-neutral-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="fade-up">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              <div className="col-span-2">
                <BrandLogo
                  href="#top"
                  className="mb-4"
                  showSubtitle={false}
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mb-5 leading-relaxed">
                  The playful learning sanctuary for the next generation of 2D/3D animators, motion designers, creative coders &amp; digital artists.
                </p>
                <div className="flex items-center gap-3 text-neutral-800 dark:text-neutral-200">
                  <button
                    type="button"
                    aria-label="SkillPop on YouTube"
                    className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 flex items-center justify-center hover:bg-pop-lime hover:text-neutral-900 hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-rounded text-sm">smart_display</span>
                  </button>
                  <button
                    type="button"
                    aria-label="SkillPop on Discord"
                    className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 flex items-center justify-center hover:bg-pop-purple hover:text-white hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-rounded text-sm">forum</span>
                  </button>
                  <button
                    type="button"
                    aria-label="SkillPop on Instagram"
                    className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 flex items-center justify-center hover:bg-pop-pink hover:text-white hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-rounded text-sm">photo_camera</span>
                  </button>
                  <button
                    type="button"
                    aria-label="SkillPop on Github"
                    className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 flex items-center justify-center hover:bg-pop-cyan hover:text-neutral-900 hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-rounded text-sm">code</span>
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-doodle font-bold text-sm text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                  Learn
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigateToCourses?.()}
                      className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer"
                    >
                      2D Animation
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigateToCourses?.()}
                      className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer"
                    >
                      3D &amp; Blender
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigateToCourses?.()}
                      className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer"
                    >
                      Motion Design
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigateToCourses?.()}
                      className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer"
                    >
                      Game Development
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigateToCourses?.()}
                      className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer"
                    >
                      UI &amp; Figma
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigateToCourses?.()}
                      className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer"
                    >
                      AI Creative Suite
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-doodle font-bold text-sm text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                  Community
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigateToDashboard?.()}
                      className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer"
                    >
                      Student Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigateToNotes?.()}
                      className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer"
                    >
                      Study Notes &amp; Wiki
                    </button>
                  </li>
                  <li>
                    <span className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer">
                      Discord Server
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer">
                      Weekly Art Jams
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer">
                      Scholarship Fund
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-doodle font-bold text-sm text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                  Company
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                  <li>
                    <span className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer">
                      About Us
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer">
                      Careers (Hiring!)
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer">
                      Press &amp; Brand Kit
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer">
                      Privacy Policy
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-pop-purple dark:hover:text-pop-lime transition-colors cursor-pointer">
                      Terms of Service
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="fade-up" delay={150}>
            <div className="pt-8 border-t-2 border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-4">
              <div>
                © 2026 SkillPop Academy Inc. Crafted with passion • Keep creating awesome things!
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  All Platform Systems Operational
                </span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </footer>

      {/* 10. INTERACTIVE 90s SHOWREEL MODAL */}
      {showReelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-neutral-900 border-3 border-neutral-800 rounded-3xl shadow-pop-xl overflow-hidden text-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-neutral-950 border-b-2 border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <h3 className="font-doodle font-bold text-white text-base ml-2">
                  SkillPop 2026 Student Showreel (90s Highlights)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReelModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video bg-neutral-950 flex items-center justify-center overflow-hidden">
              <img
                alt="Showreel animation scene"
                className="w-full h-full object-cover filter brightness-90"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-7xo7S7o76hHMAabQea3HpFhn0oQfh7Hnf35NJsavQ2kuraQGkX9OqAo1_HPGnc81fJoUwX-v5TZvf0w6k19Bbijt63zHKj-zSlOhst_YrfC0GvfeGgeT36h_oPheWA4Zf2BZ5i6Vr_HeRImGOLNvgTsAFcUQ0XB33yCdCGcIHnHhDAYtMcvncDepRk7IGe_zIH-ly1I83w2O7tzgVaO4zyzpwx_iNshmca03eMFdC3ejupxRPR43KA"
              />

              {/* Overlay controls */}
              <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-transparent opacity-80" />

              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsPlayingReel(!isPlayingReel)}
                  className="w-20 h-20 rounded-full bg-primary/90 text-neutral-900 flex items-center justify-center custom-doodle-border shadow-pop transform hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-rounded text-4xl font-black">
                    {isPlayingReel ? 'pause' : 'play_arrow'}
                  </span>
                </button>
              </div>

              {/* Progress and status */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono font-bold">
                <div className="flex items-center gap-3">
                  <span className="bg-pop-pink text-white px-2 py-0.5 rounded font-doodle">LIVE DEMO</span>
                  <span>00:42 / 01:30</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-pop-lime font-doodle">1080p 60fps</span>
                  <span>🔊 100%</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-5 bg-neutral-900 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">✨</span>
                <p className="text-xs text-neutral-300">
                  Like what you see? All student projects in this reel were built in their first 4 weeks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowReelModal(false);
                  onNavigateToCourses?.();
                }}
                className="btn-tactile-primary bg-primary hover:bg-primary-dark text-neutral-900 font-doodle font-bold px-5 py-2.5 rounded-full custom-doodle-border shadow-pop text-xs sm:text-sm cursor-pointer"
              >
                Start Your Own Project →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. QUICK ENROLL / COURSE PREVIEW MODAL */}
      {selectedCourseForEnroll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border-3 border-neutral-900 dark:border-neutral-700 rounded-3xl shadow-pop-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b-2 border-neutral-900 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
              <div className="flex items-center gap-2">
                <span className="bg-pop-yellow text-neutral-900 font-doodle font-black text-xs px-2.5 py-0.5 rounded-md border border-neutral-900">
                  {selectedCourseForEnroll.badgeText}
                </span>
                <span className="text-xs font-bold text-neutral-500 font-mono">
                  {selectedCourseForEnroll.duration}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourseForEnroll(null)}
                className="w-8 h-8 rounded-full border-2 border-neutral-900 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center justify-center text-sm font-black transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                <img
                  alt={selectedCourseForEnroll.title}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-neutral-900 shrink-0"
                  src={selectedCourseForEnroll.image}
                />
                <div>
                  <span className="text-xs font-bold text-pop-purple font-mono uppercase">
                    {selectedCourseForEnroll.category}
                  </span>
                  <h3 className="font-doodle text-lg font-bold text-neutral-900 dark:text-white leading-snug">
                    {selectedCourseForEnroll.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Instructor: <strong>{selectedCourseForEnroll.instructor.name}</strong> ({selectedCourseForEnroll.instructor.role})
                  </p>
                </div>
              </div>

              <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-2xl border border-neutral-300 dark:border-neutral-700 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Student Satisfaction:</span>
                  <strong className="text-neutral-900 dark:text-white">
                    ★ {selectedCourseForEnroll.rating} ({selectedCourseForEnroll.reviewsCount} reviews)
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Raw Project Files:</span>
                  <strong className="text-pop-lime font-bold">Included (.blend / .aep / .fig)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Mentor Review:</span>
                  <strong className="text-neutral-900 dark:text-white">Weekly Loom Video Check</strong>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs text-neutral-500 block">Total One-Time:</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-doodle text-neutral-900 dark:text-white">
                      ${selectedCourseForEnroll.price}
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                      ${selectedCourseForEnroll.originalPrice}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCourseForEnroll(null);
                      if (onNavigateToAuth) onNavigateToAuth();
                    }}
                    className="btn-tactile-primary bg-primary hover:bg-primary-dark text-neutral-900 font-doodle font-bold px-6 py-3 rounded-full custom-doodle-border shadow-pop text-sm cursor-pointer"
                  >
                    Confirm &amp; Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
