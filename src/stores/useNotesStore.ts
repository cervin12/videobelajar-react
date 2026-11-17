import { create } from 'zustand';
import type { Note, NoteColor, NoteChecklistItem } from '../types/notes';
import { notesService } from '../services';

export interface CreateNoteInput {
  title: string;
  content: string;
  checklist?: NoteChecklistItem[];
  tags: string[];
  pinned: boolean;
  color: NoteColor;
}

export interface NotesState {
  notes: Note[];
  loading: boolean;
  searchQuery: string;
  selectedTag: string;

  // Actions
  fetchNotes: () => Promise<Note[]>;
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string) => void;
  createNote: (payload: CreateNoteInput) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
  togglePin: (id: string) => Promise<boolean>;
  toggleCheckbox: (noteId: string, checkId: string) => Promise<void>;
  updateNote: (id: string, updatedData: Note) => Promise<void>;
  setNotes: (notes: Note[] | ((prev: Note[]) => Note[])) => void;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  loading: true,
  searchQuery: '',
  selectedTag: 'all',

  fetchNotes: async () => {
    set({ loading: true });
    try {
      const fetchedNotes = await notesService.getNotes().catch(() => []);
      set({ notes: fetchedNotes, loading: false });
      return fetchedNotes;
    } catch {
      set({ notes: [], loading: false });
      return [];
    }
  },

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedTag: (selectedTag) => set({ selectedTag }),
  setNotes: (updater) => {
    if (typeof updater === 'function') {
      set((state) => ({ notes: updater(state.notes) }));
    } else {
      set({ notes: updater });
    }
  },

  createNote: async (payload) => {
    const createdNote = await notesService.createNote(payload);
    set((state) => ({ notes: [createdNote, ...state.notes] }));
    return createdNote;
  },

  deleteNote: async (id: string) => {
    const currentNotes = get().notes;
    const noteToDelete = currentNotes.find((n) => n.id === id);
    // 1. Optimistic removal
    set({ notes: currentNotes.filter((n) => n.id !== id) });

    try {
      await notesService.deleteNote(id);
    } catch (err) {
      // 2. Rollback on failure (per NP-E-03 and NP-E-04)
      if (noteToDelete) {
        set({ notes: [noteToDelete, ...get().notes] });
      }
      throw err;
    }
  },

  togglePin: async (id: string) => {
    const currentNotes = get().notes;
    const target = currentNotes.find((n) => n.id === id);
    if (!target) return false;
    const nextPinned = !target.pinned;

    // Optimistic toggle
    set({
      notes: currentNotes.map((n) => (n.id === id ? { ...n, pinned: nextPinned } : n)),
    });

    try {
      await notesService.updateNote(id, { pinned: nextPinned });
    } catch (err) {
      console.error('Failed to update note pin status:', err);
    }
    return nextPinned;
  },

  toggleCheckbox: async (noteId: string, checkId: string) => {
    const currentNotes = get().notes;
    const target = currentNotes.find((n) => n.id === noteId);
    if (!target || !target.checklist) return;

    const nextChecklist = target.checklist.map((item) =>
      item.id === checkId ? { ...item, completed: !item.completed } : item
    );

    // Optimistic toggle
    set({
      notes: currentNotes.map((n) => (n.id === noteId ? { ...n, checklist: nextChecklist } : n)),
    });

    try {
      await notesService.updateNote(noteId, { checklist: nextChecklist });
    } catch (err) {
      console.error('Failed to update checklist item:', err);
    }
  },

  updateNote: async (id: string, updatedData: Note) => {
    const currentNotes = get().notes;
    const previousNote = currentNotes.find((n) => n.id === id);

    // Optimistic update
    set({
      notes: currentNotes.map((n) => (n.id === id ? updatedData : n)),
    });

    try {
      await notesService.updateNote(id, updatedData);
    } catch (err) {
      // Rollback on failure (per NP-E-05)
      if (previousNote) {
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? previousNote : n)),
        }));
      }
      throw err;
    }
  },
}));
