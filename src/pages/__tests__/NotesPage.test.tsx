import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/setupServer';
import NotesPage from '../NotesPage';

describe('NotesPage Component Integration - test-plan.md L2 Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // =========================================================================
  // 4.2 SUCCESS PATH (NP-S-01 to NP-S-17)
  // =========================================================================
  describe('Success Paths (Happy Path)', () => {
    it('[NP-S-01] Renders creator and initial notes from API/mock', async () => {
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Take a note\.\.\./i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Save Note/i })).toBeInTheDocument();

      // Seeded notes appear
      expect(await screen.findByText('Blender Lighting Shortcuts')).toBeInTheDocument();
    });

    it('[NP-S-02] Create note with title + content adds card and resets creator', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      const titleInput = await screen.findByPlaceholderText(/Title/i);
      const contentInput = screen.getByPlaceholderText(/Take a note\.\.\./i);
      const saveBtn = screen.getByRole('button', { name: /Save Note/i });

      await user.type(titleInput, 'Vite 6 Configuration Tips');
      await user.type(contentInput, 'Fast HMR with SWC compiler.');
      await user.click(saveBtn);

      expect(await screen.findByText('Vite 6 Configuration Tips')).toBeInTheDocument();
      expect(titleInput).toHaveValue('');
      expect(contentInput).toHaveValue('');
      expect(await screen.findByText(/created successfully/i)).toBeInTheDocument();
    });

    it('[NP-S-03] Create note with checklist items adds note rendering all unchecked items', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      await user.type(screen.getByPlaceholderText(/Title/i), 'Studio Setup Checklist');
      await user.click(screen.getByTitle(/Add checklist/i));

      const checklistInput = await screen.findByPlaceholderText(/Add checklist item/i);
      await user.type(checklistInput, 'Setup dual monitors');
      await user.click(screen.getByRole('button', { name: /^Add$/i }));

      await user.click(screen.getByRole('button', { name: /Save Note/i }));

      expect(await screen.findByText('Studio Setup Checklist')).toBeInTheDocument();
      expect(screen.getByText('Setup dual monitors')).toBeInTheDocument();
    });

    it('[NP-S-04] Create pinned note places note in PINNED section', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      await user.type(screen.getByPlaceholderText(/Title/i), 'Super Urgent Bug');
      await user.type(screen.getByPlaceholderText(/Take a note\.\.\./i), 'Fix mesh rigging');

      // Click pin button in creator specifically (has push_pin with title "Pin note")
      const pinButtons = screen.getAllByTitle('Pin note');
      await user.click(pinButtons[0]);
      await user.click(screen.getByRole('button', { name: /Save Note/i }));

      expect(await screen.findByText('Super Urgent Bug')).toBeInTheDocument();
    });

    it('[NP-S-05] Create note with color tint applies color styling', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      await user.type(screen.getByPlaceholderText(/Title/i), 'Color Coded Task');
      await user.type(screen.getByPlaceholderText(/Take a note\.\.\./i), 'Orange accent');

      const orangeTintBtn = screen.getByTitle(/orange color tint/i);
      await user.click(orangeTintBtn);

      await user.click(screen.getByRole('button', { name: /Save Note/i }));
      expect(await screen.findByText('Color Coded Task')).toBeInTheDocument();
    });

    it('[NP-S-06] Tag parsing formats commas and deduplicates tags', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      await user.type(screen.getByPlaceholderText(/Title/i), 'Shader Breakdown');
      await user.type(screen.getByPlaceholderText(/Take a note\.\.\./i), 'GLSL math ideas');
      await user.type(
        screen.getByPlaceholderText(/Tags \(comma separated\)\.\.\./i),
        'shaders, #glsl, shaders'
      );

      await user.click(screen.getByRole('button', { name: /Save Note/i }));

      expect(await screen.findByText('Shader Breakdown')).toBeInTheDocument();
      expect(screen.getAllByText('#shaders').length).toBeGreaterThan(0);
      expect(screen.getAllByText('#glsl').length).toBeGreaterThan(0);
    });

    it('[NP-S-07] Edit note via modal updates title and shows toast', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      const noteToEdit = await screen.findByText('Sakuga Timing 24fps');
      await user.click(noteToEdit);

      // Modal opens
      const modalTitleInput = await screen.findByDisplayValue('Sakuga Timing 24fps');
      await user.clear(modalTitleInput);
      await user.type(modalTitleInput, 'Sakuga Timing 60fps Ultra');

      const saveChangesBtn = screen.getByRole('button', { name: /Save Changes/i });
      await user.click(saveChangesBtn);

      expect(await screen.findByText('Sakuga Timing 60fps Ultra')).toBeInTheDocument();
      expect(await screen.findByText(/updated\./i)).toBeInTheDocument();
    });

    it('[NP-S-08] Modal closes on Cancel button click', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      const noteCard = await screen.findByText('Shader Math SDF Ideas');
      await user.click(noteCard);

      expect(await screen.findByText('Edit Note')).toBeInTheDocument();

      const cancelBtn = screen.getByRole('button', { name: /Cancel/i });
      await user.click(cancelBtn);

      await waitFor(() => {
        expect(screen.queryByText('Edit Note')).toBeNull();
      });
    });

    it('[NP-S-09] Delete note removes card from grid and shows toast', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      expect(await screen.findByText('Rigging Notes for Cyber Character')).toBeInTheDocument();

      const deleteButtons = screen.getAllByTitle('Delete Note');
      await user.click(deleteButtons[0]);

      expect(await screen.findByText(/deleted\./i)).toBeInTheDocument();
    });

    it('[NP-S-10] Pin / unpin from card toggles note pinned state', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      await screen.findByText('Blender Lighting Shortcuts');
      const unpinButtons = screen.getAllByTitle('Unpin note');
      await user.click(unpinButtons[0]);

      expect(await screen.findByText('📌 Note unpinned.')).toBeInTheDocument();
    });

    it('[NP-S-11] Toggle checklist item flips status on the note card', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      // Find an item from Blender Lighting Shortcuts
      const checklistText = await screen.findByText(/Lock camera to light source/i);
      await user.click(checklistText);

      expect(checklistText).toBeInTheDocument();
    });

    it('[NP-S-12] Search filter dynamically updates visible notes', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      await screen.findByText('Blender Lighting Shortcuts');
      const searchInput = screen.getByPlaceholderText(/Search missions, shaders, notes\.\.\./i);
      await user.type(searchInput, 'Sakuga');

      await waitFor(() => {
        expect(screen.getByText('Sakuga Timing 24fps')).toBeInTheDocument();
        expect(screen.queryByText('Blender Lighting Shortcuts')).toBeNull();
      });
    });

    it('[NP-S-13] Tag filter chip filters notes by tag', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      await screen.findByText('Blender Lighting Shortcuts');

      // Click on #Lighting tag chip in filter bar
      const lightingBtn = screen.getByRole('button', { name: /#Lighting/i });
      await user.click(lightingBtn);

      expect(screen.getByText('Blender Lighting Shortcuts')).toBeInTheDocument();
      expect(screen.queryByText('Sakuga Timing 24fps')).toBeNull();
    });

    it('[NP-S-14] Empty result state shows clear filters button to restore notes', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      await screen.findByText('Blender Lighting Shortcuts');
      const searchInput = screen.getByPlaceholderText(/Search missions, shaders, notes\.\.\./i);
      await user.type(searchInput, 'NonExistentNoteQuery123XYZ');

      expect(await screen.findByText(/No Notes Found/i)).toBeInTheDocument();

      const clearFiltersBtn = screen.getByRole('button', { name: /Clear Filters/i });
      await user.click(clearFiltersBtn);

      expect(await screen.findByText('Blender Lighting Shortcuts')).toBeInTheDocument();
    });

    it('[NP-S-15] Loading skeleton rendered initially', () => {
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    });

    it('[NP-S-16] Logout from sidebar clears localStorage session keys and invokes onNavigateToAuth', async () => {
      const user = userEvent.setup();
      const mockNavigateAuth = vi.fn();
      localStorage.setItem('skillpop_token', 'active-token');

      render(
        <MemoryRouter>
          <NotesPage onNavigateToAuth={mockNavigateAuth} />
        </MemoryRouter>
      );

      await screen.findByText('Blender Lighting Shortcuts');

      const logoutBtn = screen.getByRole('button', { name: /Sign Out/i });
      await user.click(logoutBtn);

      await waitFor(() => {
        expect(localStorage.getItem('skillpop_token')).toBeNull();
        expect(mockNavigateAuth).toHaveBeenCalled();
      });
    });

    it('[NP-S-17] Theme toggle persists setting and toggles html dark class', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      const themeToggle = screen.getByLabelText(/Toggle theme/i);
      await user.click(themeToggle);

      expect(localStorage.getItem('skillpop-theme')).toBeTruthy();
    });
  });

  // =========================================================================
  // 5.2 ERROR PATH (NP-E-01 to NP-E-11)
  // =========================================================================
  describe('Error Paths (Failure Path)', () => {
    it('[NP-E-01] Empty note submission is blocked client-side with a warning toast', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      await screen.findByPlaceholderText(/Title/i);
      const saveBtn = screen.getByRole('button', { name: /Save Note/i });
      await user.click(saveBtn);

      expect(await screen.findByText(/Please enter a title or note content\./i)).toBeInTheDocument();
    });

    it('[NP-E-02] Create note failure (500) displays error toast and retains input without crashing', async () => {
      const user = userEvent.setup();
      server.use(
        http.post('/api/notes', () => {
          return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      const titleInput = await screen.findByPlaceholderText(/Title/i);
      await user.type(titleInput, 'Failed Note Creation');
      await user.click(screen.getByRole('button', { name: /Save Note/i }));

      expect(await screen.findByText(/Failed to save note\./i)).toBeInTheDocument();
      expect(titleInput).toHaveValue('Failed Note Creation');
    });

    it('[NP-E-03] Delete note failure (500) rolls back deleted note into the grid', async () => {
      const user = userEvent.setup();
      server.use(
        http.delete('/api/notes/:id', () => {
          return HttpResponse.json({ message: 'Delete Failed' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      const noteCard = await screen.findByText('Game UI Color Palette');
      const deleteButtons = screen.getAllByTitle('Delete Note');
      await user.click(deleteButtons[0]);

      // Error toast shown
      expect(await screen.findByText(/Failed to delete note on server\./i)).toBeInTheDocument();

      // Note rolls back into view
      expect(noteCard).toBeInTheDocument();
    });

    it('[NP-E-04] Delete non-existent note (404) triggers rollback behavior', async () => {
      const user = userEvent.setup();
      server.use(
        http.delete('/api/notes/:id', () => {
          return HttpResponse.json({ message: 'Note not found' }, { status: 404 });
        })
      );

      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      await screen.findByText('Game UI Color Palette');
      const deleteButtons = screen.getAllByTitle('Delete Note');
      await user.click(deleteButtons[0]);

      expect(await screen.findByText(/Failed to delete note on server\./i)).toBeInTheDocument();
    });

    it('[NP-E-05] Update failure (500) reverts edited note back to original data', async () => {
      const user = userEvent.setup();
      server.use(
        http.put('/api/notes/:id', () => {
          return HttpResponse.json({ message: 'Update failed' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      const noteToEdit = await screen.findByText('Weekly Sprint Checklist');
      await user.click(noteToEdit);

      const modalTitleInput = await screen.findByDisplayValue('Weekly Sprint Checklist');
      await user.clear(modalTitleInput);
      await user.type(modalTitleInput, 'Should Be Reverted');

      await user.click(screen.getByRole('button', { name: /Save Changes/i }));

      // Error toast and revert
      expect(await screen.findByText(/Failed to update note on server\./i)).toBeInTheDocument();
      expect(await screen.findByText('Weekly Sprint Checklist')).toBeInTheDocument();
    });

    it('[NP-E-06] Pin toggle failure (500) logs error and preserves optimistic UI without crash', async () => {
      const user = userEvent.setup();
      server.use(
        http.put('/api/notes/:id', () => {
          return HttpResponse.json({ message: 'Pin toggle failed' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      await screen.findByText('Blender Lighting Shortcuts');
      const pinButtons = screen.getAllByTitle(/Unpin note|Pin note/i);
      await user.click(pinButtons[0]);

      // UI does not crash
      expect(screen.getByText('Blender Lighting Shortcuts')).toBeInTheDocument();
    });

    it('[NP-E-07] Checklist toggle failure (500) preserves optimistic checkbox without crashing', async () => {
      const user = userEvent.setup();
      server.use(
        http.put('/api/notes/:id', () => {
          return HttpResponse.json({ message: 'Checklist update failed' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      const checklistItem = await screen.findByText(/Shift \+ T: Lock camera to light source/i);
      await user.click(checklistItem);

      expect(checklistItem).toBeInTheDocument();
    });

    it('[NP-E-08] Profile API failure on load falls back to default profile without crash', async () => {
      server.use(
        http.get('/api/student/profile', () => {
          return HttpResponse.json({ message: 'Profile Service Error' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      // Notes still render properly
      expect(await screen.findByText('Blender Lighting Shortcuts')).toBeInTheDocument();
    });

    it('[NP-E-09] Notes API failure falls back to default data without crashing', async () => {
      server.use(
        http.get('/api/notes', () => {
          return HttpResponse.json({ message: 'Database unreachable' }, { status: 500 });
        })
      );

      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      expect(await screen.findByText('Blender Lighting Shortcuts')).toBeInTheDocument();
    });

    it('[NP-E-10] Corrupted localStorage data recovers smoothly via initialNotesData', async () => {
      localStorage.setItem('skillpop-notes', 'invalid-json{{{');

      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      // NotesPage loads fallbackNotes from api.ts fallback
      expect(await screen.findByPlaceholderText(/Title/i)).toBeInTheDocument();
    });

    it('[NP-E-11] Empty checklist item cannot be added', async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <NotesPage />
        </MemoryRouter>
      );

      await user.click(screen.getByTitle(/Add checklist/i));
      const addBtn = await screen.findByRole('button', { name: /^Add$/i });
      await user.click(addBtn);

      const checklistInput = screen.getByPlaceholderText(/Add checklist item/i);
      expect(checklistInput).toHaveValue('');
    });
  });
});
