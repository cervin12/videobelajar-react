import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '../components/organisms/Header';
import { Sidebar } from '../components/organisms/Sidebar';
import { Footer } from '../components/organisms/Footer';
import { RevealOnScroll } from '../components/atoms/RevealOnScroll';
import type { Note, NoteColor, NoteChecklistItem } from '../types/notes';
import { initialNotesData } from '../data/notesData';
import { studentProfileData } from '../data/studentDashboardData';

export interface NotesPageProps {
  onNavigateToCourses?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToAuth?: () => void;
}

interface ToastMessage {
  id: number;
  text: string;
}

const colorBgMap: Record<NoteColor, { light: string; dark: string; border: string }> = {
  yellow: { light: 'bg-[#FEF9C3]', dark: 'dark:bg-[#232014]', border: 'border-background-dark dark:border-[#FEF08A]' },
  green: { light: 'bg-[#DCFCE7]', dark: 'dark:bg-[#122419]', border: 'border-background-dark dark:border-[#86EFAC]' },
  purple: { light: 'bg-[#EDE9FE]', dark: 'dark:bg-[#1E192E]', border: 'border-background-dark dark:border-[#C4B5FD]' },
  orange: { light: 'bg-[#FFEDD5]', dark: 'dark:bg-[#261A12]', border: 'border-background-dark dark:border-[#FDBA74]' },
  blue: { light: 'bg-[#E0F2FE]', dark: 'dark:bg-[#112130]', border: 'border-background-dark dark:border-[#7DD3FC]' },
  default: { light: 'bg-white', dark: 'dark:bg-[#182235]', border: 'border-background-dark dark:border-[#38BDF8]' },
};

export const NotesPage: React.FC<NotesPageProps> = ({
  onNavigateToCourses,
  onNavigateToDashboard,
  onNavigateToAuth,
}) => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('skillpop-theme');
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
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('skillpop-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Layout & Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Notes state
  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('skillpop-notes');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialNotesData;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('skillpop-notes', JSON.stringify(notes));
    } catch (e) {
      console.error(e);
    }
  }, [notes]);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = (text: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Quick creator state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newPinned, setNewPinned] = useState(false);
  const [newColor, setNewColor] = useState<NoteColor>('yellow');
  const [newTags, setNewTags] = useState<string>('#3D, #Blender');
  const [isChecklistMode, setIsChecklistMode] = useState(false);
  const [newChecklistText, setNewChecklistText] = useState('');
  const [newChecklistItems, setNewChecklistItems] = useState<NoteChecklistItem[]>([]);
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Edit Modal State
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // Add checklist item to creator
  const handleAddCreatorChecklistItem = () => {
    if (!newChecklistText.trim()) return;
    setNewChecklistItems((prev) => [
      ...prev,
      { id: `c-${Date.now()}-${Math.random()}`, text: newChecklistText.trim(), completed: false },
    ]);
    setNewChecklistText('');
  };

  // Remove checklist item from creator
  const handleRemoveCreatorChecklistItem = (id: string) => {
    setNewChecklistItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle Save New Note
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() && !newContent.trim() && newChecklistItems.length === 0) {
      showToast('⚠️ Please enter a title or note content.');
      return;
    }

    const parsedTags = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith('#') ? t : `#${t}`));

    const createdNote: Note = {
      id: `note-${Date.now()}`,
      title: newTitle.trim() || 'Untitled Note',
      content: newContent.trim(),
      checklist: isChecklistMode && newChecklistItems.length > 0 ? newChecklistItems : undefined,
      tags: parsedTags.length > 0 ? parsedTags : ['#StudyNotes'],
      pinned: newPinned,
      color: newColor,
      createdAt: 'Just now',
    };

    setNotes((prev) => [createdNote, ...prev]);
    setSaveStatus('Saved just now');
    setTimeout(() => setSaveStatus(''), 2500);

    // Reset inputs
    setNewTitle('');
    setNewContent('');
    setNewPinned(false);
    setNewColor('yellow');
    setNewChecklistItems([]);
    setIsChecklistMode(false);
    showToast(`📝 Note "${createdNote.title}" created successfully!`);
  };

  // Delete note
  const handleDeleteNote = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const noteToDelete = notes.find((n) => n.id === id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    showToast(`🗑️ Note "${noteToDelete?.title || 'Note'}" deleted.`);
  };

  // Toggle pin
  const handleTogglePin = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          const nextPinned = !n.pinned;
          showToast(nextPinned ? '📌 Note pinned to top!' : '📌 Note unpinned.');
          return { ...n, pinned: nextPinned };
        }
        return n;
      })
    );
  };

  // Toggle checklist checkbox
  const handleToggleCheckbox = (noteId: string, checkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId && n.checklist) {
          return {
            ...n,
            checklist: n.checklist.map((item) =>
              item.id === checkId ? { ...item, completed: !item.completed } : item
            ),
          };
        }
        return n;
      })
    );
  };

  // Save edited note
  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote) return;

    setNotes((prev) =>
      prev.map((n) => (n.id === editingNote.id ? { ...editingNote, createdAt: 'Updated just now' } : n))
    );
    showToast(`✅ Note "${editingNote.title}" updated.`);
    setEditingNote(null);
  };

  // Available unique tags for filtering
  const allTags = useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => n.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [notes]);

  // Filtered notes
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = n.title.toLowerCase().includes(q);
        const matchesContent = n.content.toLowerCase().includes(q);
        const matchesTag = n.tags.some((t) => t.toLowerCase().includes(q));
        const matchesChecklist = n.checklist?.some((c) => c.text.toLowerCase().includes(q));
        if (!matchesTitle && !matchesContent && !matchesTag && !matchesChecklist) return false;
      }
      // Tag filter
      if (selectedTag === 'pinned') {
        return n.pinned;
      }
      if (selectedTag !== 'all' && !n.tags.includes(selectedTag)) {
        return false;
      }
      return true;
    });
  }, [notes, searchQuery, selectedTag]);

  const pinnedNotes = useMemo(() => filteredNotes.filter((n) => n.pinned), [filteredNotes]);
  const otherNotes = useMemo(() => filteredNotes.filter((n) => !n.pinned), [filteredNotes]);

  return (
    <div className="bg-[#FFFDF8] dark:bg-[#0B0F19] text-background-dark dark:text-white min-h-screen transition-colors duration-200 pattern-dots flex">
      {/* 1. Sidebar Organism */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activePath="study-notes"
        currentXp={studentProfileData.currentXp}
        onNavigate={(page) => {
          if (page === 'courses' && onNavigateToCourses) {
            onNavigateToCourses();
          } else if (page === 'dashboard' && onNavigateToDashboard) {
            onNavigateToDashboard();
          } else if (page === 'auth' && onNavigateToAuth) {
            onNavigateToAuth();
          }
        }}
      />

      {/* 2. Main Page Layout with offset for Sidebar */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen w-full transition-all duration-300">
        {/* Top Header */}
        <Header
          variant="dashboard"
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          streakDays={studentProfileData.streakDays}
          xp={studentProfileData.currentXp}
          level="Lvl 6"
          isDark={isDark}
          onToggleTheme={toggleTheme}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNavigateToAuth={onNavigateToAuth}
          onNavigateToDashboard={onNavigateToDashboard}
          activeNav="notes"
          onNavigate={(page) => {
            if (page === 'courses' && onNavigateToCourses) {
              onNavigateToCourses();
            } else if (page === 'dashboard' && onNavigateToDashboard) {
              onNavigateToDashboard();
            } else if (page === 'auth' && onNavigateToAuth) {
              onNavigateToAuth();
            }
          }}
        />

        {/* Main Content Area */}
        <main className="w-full pt-24 pb-20 min-h-[calc(100vh-80px)] transition-colors flex-1 bg-[#FAFAFC] dark:bg-[#090D16]">
          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
            
            {/* Top Quick Note Creator (Matches notes.html reference) */}
            <RevealOnScroll variant="fade-down" duration={500}>
              <div className="max-w-2xl mx-auto w-full">
                <form
                  onSubmit={handleSaveNote}
                  className="bg-white dark:bg-[#182235] neo-border rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#0F172A] dark:shadow-[4px_4px_0px_#38BDF8] transition-all space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Title"
                      className="w-full font-black text-base sm:text-lg text-background-dark dark:text-white placeholder:text-slate-400 bg-transparent border-0 focus:outline-none focus:ring-0 p-0"
                    />
                    <button
                      type="button"
                      onClick={() => setNewPinned((prev) => !prev)}
                      className={`p-1.5 rounded-lg neo-border flex items-center justify-center transition-colors cursor-pointer ${
                        newPinned
                          ? 'bg-[#FDE047] text-background-dark'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-background-dark dark:hover:text-white'
                      }`}
                      title={newPinned ? 'Pinned note' : 'Pin note'}
                    >
                      <span className="material-symbols-outlined text-[18px]">push_pin</span>
                    </button>
                  </div>

                  {/* Body Textarea */}
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Take a note..."
                    rows={2}
                    className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 p-0 text-xs sm:text-sm text-background-dark dark:text-slate-200 placeholder:text-slate-400 resize-none font-semibold leading-relaxed"
                  />

                  {/* Checklist Items Creator */}
                  {isChecklistMode && (
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      {newChecklistItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-2 text-xs font-semibold">
                          <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary-dark">check_circle</span>
                            <span className="text-slate-800 dark:text-slate-200">{item.text}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCreatorChecklistItem(item.id)}
                            className="text-slate-400 hover:text-red-500 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                      ))}

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={newChecklistText}
                          onChange={(e) => setNewChecklistText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddCreatorChecklistItem();
                            }
                          }}
                          placeholder="Add checklist item and press Enter..."
                          className="flex-1 text-xs px-2.5 py-1.5 rounded-lg neo-border bg-slate-50 dark:bg-[#111A2E] text-background-dark dark:text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddCreatorChecklistItem}
                          className="px-3 py-1.5 rounded-lg bg-[#A3E635] text-background-dark neo-border text-xs font-black cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bottom Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Toggle Checklist */}
                      <button
                        type="button"
                        onClick={() => setIsChecklistMode((prev) => !prev)}
                        className={`p-1.5 rounded-lg neo-border flex items-center justify-center transition-colors cursor-pointer ${
                          isChecklistMode ? 'bg-[#A3E635] text-background-dark' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                        title="Add checklist"
                      >
                        <span className="material-symbols-outlined text-[18px]">check_box</span>
                      </button>

                      {/* Color Tint Selector */}
                      <div className="flex items-center gap-1 pl-1">
                        {(['yellow', 'green', 'purple', 'orange', 'blue', 'default'] as NoteColor[]).map((c) => {
                          const bg =
                            c === 'yellow'
                              ? 'bg-[#FEF08A]'
                              : c === 'green'
                              ? 'bg-[#86EFAC]'
                              : c === 'purple'
                              ? 'bg-[#C4B5FD]'
                              : c === 'orange'
                              ? 'bg-[#FDBA74]'
                              : c === 'blue'
                              ? 'bg-[#7DD3FC]'
                              : 'bg-white';
                          return (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setNewColor(c)}
                              className={`w-5 h-5 rounded-full border border-background-dark cursor-pointer transition-transform ${bg} ${
                                newColor === c ? 'scale-125 ring-2 ring-slate-900 dark:ring-white' : 'hover:scale-110'
                              }`}
                              title={`${c} color tint`}
                            />
                          );
                        })}
                      </div>

                      {/* Tags quick input */}
                      <input
                        type="text"
                        value={newTags}
                        onChange={(e) => setNewTags(e.target.value)}
                        placeholder="Tags (comma separated)..."
                        className="text-[11px] px-2 py-1 rounded-md neo-border bg-slate-50 dark:bg-[#111A2E] text-slate-700 dark:text-slate-200 w-36 sm:w-44 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      {saveStatus && (
                        <span className="text-[11px] font-bold text-primary-dark flex items-center gap-1 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-dark"></span>
                          <span>{saveStatus}</span>
                        </span>
                      )}
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-xl border-2 border-background-dark bg-[#A3E635] hover:bg-primary-dark text-background-dark font-black text-xs flex items-center gap-1 shadow-[2px_2px_0px_#0F172A] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">check</span>
                        <span>Save Note</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </RevealOnScroll>

            {/* Tags & Search Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-1 border-b-2 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                <button
                  type="button"
                  onClick={() => setSelectedTag('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer neo-border ${
                    selectedTag === 'all'
                      ? 'bg-[#FDE047] text-background-dark shadow-[1.5px_1.5px_0px_#0F172A]'
                      : 'bg-white dark:bg-[#182235] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  All ({notes.length})
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTag('pinned')}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer neo-border flex items-center gap-1 ${
                    selectedTag === 'pinned'
                      ? 'bg-[#FEF08A] text-background-dark shadow-[1.5px_1.5px_0px_#0F172A]'
                      : 'bg-white dark:bg-[#182235] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">push_pin</span>
                  <span>Pinned ({notes.filter((n) => n.pinned).length})</span>
                </button>

                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer neo-border whitespace-nowrap ${
                      selectedTag === tag
                        ? 'bg-[#A3E635] text-background-dark font-black shadow-[1.5px_1.5px_0px_#0F172A]'
                        : 'bg-white dark:bg-[#182235] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="text-xs font-bold text-slate-500">
                Showing {filteredNotes.length} of {notes.length} notes
              </div>
            </div>

            {/* PINNED NOTES SECTION */}
            {pinnedNotes.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[16px] text-[#EAB308]">push_pin</span>
                  <span>PINNED ({pinnedNotes.length})</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {pinnedNotes.map((note) => {
                    const colorStyle = colorBgMap[note.color] || colorBgMap.default;
                    return (
                      <div
                        key={note.id}
                        onClick={() => setEditingNote(note)}
                        className={`group ${colorStyle.light} ${colorStyle.dark} neo-border-3 rounded-2xl p-5 flex flex-col justify-between neo-shadow hover:-translate-y-1 transition-all cursor-pointer relative`}
                      >
                        <div className="space-y-3">
                          {/* Note Header */}
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-black text-base text-background-dark dark:text-white leading-snug">
                              {note.title}
                            </h3>
                            <button
                              type="button"
                              onClick={(e) => handleTogglePin(note.id, e)}
                              className="text-[#EAB308] hover:scale-110 p-0.5 cursor-pointer"
                              title="Unpin note"
                            >
                              <span
                                className="material-symbols-outlined text-[18px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                push_pin
                              </span>
                            </button>
                          </div>

                          {/* Content Paragraph */}
                          {note.content && (
                            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                              {note.content}
                            </p>
                          )}

                          {/* Checklist items */}
                          {note.checklist && note.checklist.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              {note.checklist.map((item) => (
                                <div
                                  key={item.id}
                                  onClick={(e) => handleToggleCheckbox(note.id, item.id, e)}
                                  className="flex items-start gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer select-none"
                                >
                                  <span
                                    className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${
                                      item.completed
                                        ? 'text-[#416900] dark:text-[#A3E635]'
                                        : 'text-slate-400 dark:text-slate-500'
                                    }`}
                                  >
                                    {item.completed ? 'check_circle' : 'radio_button_unchecked'}
                                  </span>
                                  <span className={item.completed ? 'line-through opacity-70' : ''}>
                                    {item.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Tags */}
                          {note.tags && note.tags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-2">
                              {note.tags.map((t) => (
                                <span
                                  key={t}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTag(t);
                                  }}
                                  className="px-2 py-0.5 bg-white/80 dark:bg-black/40 border border-background-dark dark:border-slate-700 rounded-md font-extrabold text-[10px] text-background-dark dark:text-slate-200 hover:bg-[#FDE047] hover:text-slate-900 transition-colors"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Note Footer */}
                        <div className="flex items-center justify-between pt-4 mt-3 border-t border-background-dark/15 dark:border-white/15">
                          <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-400">
                            {note.createdAt}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingNote(note);
                              }}
                              className="p-1 rounded neo-border bg-white dark:bg-[#182235] hover:bg-[#FDE047] text-background-dark dark:text-white hover:text-slate-900 transition-colors cursor-pointer"
                              title="Edit Note"
                            >
                              <span className="material-symbols-outlined text-[15px]">edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleDeleteNote(note.id, e)}
                              className="p-1 rounded neo-border bg-white dark:bg-[#182235] hover:bg-red-500 hover:text-white text-background-dark dark:text-white transition-colors cursor-pointer"
                              title="Delete Note"
                            >
                              <span className="material-symbols-outlined text-[15px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* OTHERS / ALL NOTES SECTION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-[16px]">notes</span>
                <span>
                  {pinnedNotes.length > 0 ? `OTHERS (${otherNotes.length})` : `ALL NOTES (${filteredNotes.length})`}
                </span>
              </div>

              {otherNotes.length === 0 && pinnedNotes.length === 0 ? (
                <div className="p-12 text-center rounded-2xl neo-border bg-white dark:bg-[#182235] space-y-3">
                  <span className="material-symbols-outlined text-5xl text-[#EAB308]">edit_note</span>
                  <h3 className="font-black text-lg text-background-dark dark:text-white">No Notes Found</h3>
                  <p className="text-xs text-slate-500 font-bold max-w-sm mx-auto">
                    No notes matched your search query or tag filter. Try clearing filters or create a new note above!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTag('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#A3E635] text-background-dark font-black text-xs neo-border shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {otherNotes.map((note) => {
                    const colorStyle = colorBgMap[note.color] || colorBgMap.default;
                    return (
                      <div
                        key={note.id}
                        onClick={() => setEditingNote(note)}
                        className={`group ${colorStyle.light} ${colorStyle.dark} neo-border-3 rounded-2xl p-5 flex flex-col justify-between neo-shadow hover:-translate-y-1 transition-all cursor-pointer relative`}
                      >
                        <div className="space-y-3">
                          {/* Note Header */}
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-black text-base text-background-dark dark:text-white leading-snug">
                              {note.title}
                            </h3>
                            <button
                              type="button"
                              onClick={(e) => handleTogglePin(note.id, e)}
                              className="text-slate-400 hover:text-[#EAB308] hover:scale-110 p-0.5 cursor-pointer transition-colors"
                              title="Pin note"
                            >
                              <span className="material-symbols-outlined text-[18px]">push_pin</span>
                            </button>
                          </div>

                          {/* Content Paragraph */}
                          {note.content && (
                            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                              {note.content}
                            </p>
                          )}

                          {/* Checklist items */}
                          {note.checklist && note.checklist.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              {note.checklist.map((item) => (
                                <div
                                  key={item.id}
                                  onClick={(e) => handleToggleCheckbox(note.id, item.id, e)}
                                  className="flex items-start gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer select-none"
                                >
                                  <span
                                    className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${
                                      item.completed
                                        ? 'text-[#416900] dark:text-[#A3E635]'
                                        : 'text-slate-400 dark:text-slate-500'
                                    }`}
                                  >
                                    {item.completed ? 'check_circle' : 'radio_button_unchecked'}
                                  </span>
                                  <span className={item.completed ? 'line-through opacity-70' : ''}>
                                    {item.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Tags */}
                          {note.tags && note.tags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-2">
                              {note.tags.map((t) => (
                                <span
                                  key={t}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTag(t);
                                  }}
                                  className="px-2 py-0.5 bg-white/80 dark:bg-black/40 border border-background-dark dark:border-slate-700 rounded-md font-extrabold text-[10px] text-background-dark dark:text-slate-200 hover:bg-[#FDE047] hover:text-slate-900 transition-colors"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Note Footer */}
                        <div className="flex items-center justify-between pt-4 mt-3 border-t border-background-dark/15 dark:border-white/15">
                          <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-400">
                            {note.createdAt}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingNote(note);
                              }}
                              className="p-1 rounded neo-border bg-white dark:bg-[#182235] hover:bg-[#FDE047] text-background-dark dark:text-white hover:text-slate-900 transition-colors cursor-pointer"
                              title="Edit Note"
                            >
                              <span className="material-symbols-outlined text-[15px]">edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => handleDeleteNote(note.id, e)}
                              className="p-1 rounded neo-border bg-white dark:bg-[#182235] hover:bg-red-500 hover:text-white text-background-dark dark:text-white transition-colors cursor-pointer"
                              title="Delete Note"
                            >
                              <span className="material-symbols-outlined text-[15px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </main>

        {/* 3. Edit Note Modal */}
        {editingNote && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
            onClick={() => setEditingNote(null)}
          >
            <div
              className="bg-white dark:bg-[#182235] rounded-2xl neo-border-3 neo-shadow-lg max-w-lg w-full p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b-2 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-dark text-2xl font-black">edit_note</span>
                  <h3 className="text-lg font-black text-background-dark dark:text-white">Edit Note</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="p-1 rounded-lg neo-border hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <form onSubmit={handleUpdateNote} className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase text-slate-600 dark:text-slate-400 block mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingNote.title}
                    onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                    className="w-full rounded-xl neo-border p-2.5 text-sm font-bold bg-slate-50 dark:bg-[#111A2E] text-background-dark dark:text-white focus:outline-none"
                    placeholder="Note title..."
                  />
                </div>

                <div>
                  <label className="text-xs font-black uppercase text-slate-600 dark:text-slate-400 block mb-1">
                    Content
                  </label>
                  <textarea
                    value={editingNote.content}
                    onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                    rows={4}
                    className="w-full rounded-xl neo-border p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 dark:bg-[#111A2E] text-background-dark dark:text-white focus:outline-none"
                    placeholder="Note content..."
                  />
                </div>

                {/* Checklist editor in modal */}
                {editingNote.checklist && editingNote.checklist.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-600 dark:text-slate-400 block">
                      Checklist Items
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {editingNote.checklist.map((item, idx) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => {
                              const updatedChecklist = editingNote.checklist!.map((c, i) =>
                                i === idx ? { ...c, completed: !c.completed } : c
                              );
                              setEditingNote({ ...editingNote, checklist: updatedChecklist });
                            }}
                            className="w-4 h-4 rounded border-2 border-background-dark text-primary-dark focus:ring-0 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={item.text}
                            onChange={(e) => {
                              const updatedChecklist = editingNote.checklist!.map((c, i) =>
                                i === idx ? { ...c, text: e.target.value } : c
                              );
                              setEditingNote({ ...editingNote, checklist: updatedChecklist });
                            }}
                            className="flex-1 text-xs px-2 py-1 rounded neo-border bg-slate-50 dark:bg-[#111A2E] text-background-dark dark:text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedChecklist = editingNote.checklist!.filter((_, i) => i !== idx);
                              setEditingNote({ ...editingNote, checklist: updatedChecklist });
                            }}
                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color tint & Pin in modal */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-slate-600 dark:text-slate-400">Color:</span>
                    {(['yellow', 'green', 'purple', 'orange', 'blue', 'default'] as NoteColor[]).map((c) => {
                      const bg =
                        c === 'yellow'
                          ? 'bg-[#FEF08A]'
                          : c === 'green'
                          ? 'bg-[#86EFAC]'
                          : c === 'purple'
                          ? 'bg-[#C4B5FD]'
                          : c === 'orange'
                          ? 'bg-[#FDBA74]'
                          : c === 'blue'
                          ? 'bg-[#7DD3FC]'
                          : 'bg-white';
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setEditingNote({ ...editingNote, color: c })}
                          className={`w-6 h-6 rounded-full border border-background-dark cursor-pointer transition-transform ${bg} ${
                            editingNote.color === c ? 'scale-125 ring-2 ring-slate-900 dark:ring-white' : 'hover:scale-110'
                          }`}
                        />
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setEditingNote({ ...editingNote, pinned: !editingNote.pinned })}
                    className={`px-3 py-1.5 rounded-xl neo-border text-xs font-black flex items-center gap-1 cursor-pointer ${
                      editingNote.pinned ? 'bg-[#FDE047] text-background-dark' : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">push_pin</span>
                    <span>{editingNote.pinned ? 'Pinned' : 'Pin Note'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditingNote(null)}
                    className="px-4 py-2 rounded-xl neo-border text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#A3E635] text-background-dark neo-border neo-shadow-sm text-xs font-black hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 4. Toast Notification Container */}
        <div
          id="toastContainer"
          className="fixed top-24 right-6 z-50 flex flex-col gap-2 pointer-events-none"
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="px-4 py-2.5 rounded-xl bg-background-dark text-white dark:bg-white dark:text-background-dark text-xs font-black neo-border shadow-[3px_3px_0px_#A3E635] pointer-events-auto flex items-center gap-2 animate-bounce-short"
            >
              <span>{toast.text}</span>
            </div>
          ))}
        </div>

        {/* 5. Footer */}
        <RevealOnScroll variant="fade-up" duration={600}>
          <Footer />
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default NotesPage;
