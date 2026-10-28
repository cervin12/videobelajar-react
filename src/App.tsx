import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { CoursePage } from './pages/CoursePage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { NotesPage } from './pages/NotesPage';
import { AuthPage } from './pages/AuthPage';

export type AppView = 'landing' | 'courses' | 'dashboard' | 'notes' | 'auth';

function App() {
  const [currentPage, setCurrentPage] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#auth') return 'auth';
      if (window.location.hash === '#notes') return 'notes';
      if (window.location.hash === '#dashboard') return 'dashboard';
      if (window.location.hash === '#courses') return 'courses';
      if (window.location.hash === '#landing') return 'landing';
    }
    return 'landing';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#auth') {
        setCurrentPage('auth');
      } else if (window.location.hash === '#notes') {
        setCurrentPage('notes');
      } else if (window.location.hash === '#dashboard') {
        setCurrentPage('dashboard');
      } else if (window.location.hash === '#courses') {
        setCurrentPage('courses');
      } else if (window.location.hash === '#landing' || !window.location.hash) {
        setCurrentPage('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: AppView) => {
    setCurrentPage(page);
    window.location.hash = `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {currentPage === 'landing' && (
        <LandingPage
          onNavigateToCourses={() => navigateTo('courses')}
          onNavigateToDashboard={() => navigateTo('dashboard')}
          onNavigateToNotes={() => navigateTo('notes')}
          onNavigateToAuth={() => navigateTo('auth')}
        />
      )}

      {currentPage === 'courses' && (
        <CoursePage
          onNavigateToAuth={() => navigateTo('auth')}
          onNavigateToDashboard={() => navigateTo('dashboard')}
          onNavigateToNotes={() => navigateTo('notes')}
        />
      )}

      {currentPage === 'dashboard' && (
        <StudentDashboardPage
          onNavigateToCourses={() => navigateTo('courses')}
          onNavigateToAuth={() => navigateTo('auth')}
          onNavigateToNotes={() => navigateTo('notes')}
        />
      )}

      {currentPage === 'notes' && (
        <NotesPage
          onNavigateToCourses={() => navigateTo('courses')}
          onNavigateToDashboard={() => navigateTo('dashboard')}
          onNavigateToAuth={() => navigateTo('auth')}
        />
      )}

      {currentPage === 'auth' && (
        <AuthPage
          onNavigateToCourses={() => navigateTo('courses')}
        />
      )}

      {/* Floating Quick Page Switcher for Easy Review */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center bg-white dark:bg-[#0B0F19] p-1.5 rounded-2xl border-2 border-slate-900 dark:border-[#38BDF8] gap-1.5 shadow-[4px_4px_0px_#1A0914] dark:shadow-[4px_4px_0px_#38BDF8] flex-wrap max-w-[calc(100vw-2rem)] justify-end">
        <button
          type="button"
          onClick={() => navigateTo('landing')}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            currentPage === 'landing'
              ? 'bg-[#A3E635] text-slate-950 font-black border-2 border-slate-900 dark:border-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          🚀 Landing Page
        </button>
        <button
          type="button"
          onClick={() => navigateTo('courses')}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            currentPage === 'courses'
              ? 'bg-[#fde047] text-slate-950 font-black border-2 border-slate-900 dark:border-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          📚 Course Catalog
        </button>
        <button
          type="button"
          onClick={() => navigateTo('dashboard')}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            currentPage === 'dashboard'
              ? 'bg-[#38BDF8] text-slate-950 font-black border-2 border-slate-900 dark:border-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          🎓 Student Dashboard
        </button>
        <button
          type="button"
          onClick={() => navigateTo('notes')}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            currentPage === 'notes'
              ? 'bg-[#C4B5FD] text-slate-950 font-black border-2 border-slate-900 dark:border-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          📝 Study Notes
        </button>
        <button
          type="button"
          onClick={() => navigateTo('auth')}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            currentPage === 'auth'
              ? 'bg-pop-pink text-[#1A0914] font-black border-2 border-slate-900 dark:border-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          🔐 Auth Page
        </button>
      </div>
    </div>
  );
}

export default App;



