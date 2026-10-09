import { useState, useEffect } from 'react';
import { CoursePage } from './pages/CoursePage';
import { AuthPage } from './pages/AuthPage';

export type AppView = 'courses' | 'auth';

function App() {
  const [currentPage, setCurrentPage] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#auth') return 'auth';
      if (window.location.hash === '#courses') return 'courses';
    }
    return 'courses';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#auth') {
        setCurrentPage('auth');
      } else if (window.location.hash === '#courses') {
        setCurrentPage('courses');
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
      {currentPage === 'courses' && (
        <CoursePage
          onNavigateToAuth={() => navigateTo('auth')}
        />
      )}

      {currentPage === 'auth' && (
        <AuthPage
          onNavigateToCourses={() => navigateTo('courses')}
        />
      )}

      {/* Floating Quick Page Switcher for Easy Review */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center bg-white dark:bg-background-dark p-1.5 rounded-2xl border-2 border-slate-900 dark:border-slate-700 gap-1.5 shadow-[4px_4px_0px_#1A0914] dark:shadow-[4px_4px_0px_#030712]">
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



