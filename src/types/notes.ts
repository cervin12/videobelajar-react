export interface NoteChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export type NoteColor = 'yellow' | 'green' | 'purple' | 'orange' | 'blue' | 'default';

export interface Note {
  id: string;
  title: string;
  content: string;
  checklist?: NoteChecklistItem[];
  tags: string[];
  pinned: boolean;
  color: NoteColor;
  createdAt: string;
}
