import type { Note } from '../types/notes';

export const initialNotesData: Note[] = [
  {
    id: 'note-1',
    title: 'Blender Lighting Shortcuts',
    content: '',
    checklist: [
      { id: 'c1', text: 'Shift + T: Lock camera to light source', completed: true },
      { id: 'c2', text: 'Alt + D: Instance lights to link power & color', completed: true },
      { id: 'c3', text: 'Numpad .: Frame active area lamp in viewport', completed: true },
    ],
    tags: ['#Blender', '#3D', '#Lighting'],
    pinned: true,
    color: 'yellow',
    createdAt: '10m ago',
  },
  {
    id: 'note-2',
    title: 'Sakuga Timing 24fps',
    content:
      'Hold 2 frames anticipation minimum before high speed whip slash smear. Keep follow-through circular with snappy trailing easing.',
    tags: ['#2DAnimation', '#ClassNotes'],
    pinned: true,
    color: 'green',
    createdAt: 'Yesterday',
  },
  {
    id: 'note-3',
    title: 'Shader Math SDF Ideas',
    content:
      'Raymarching sphere distance function formula: length(p) - s. Test neon rim highlight against specular clamp for stylized anime shader.',
    tags: ['#GLSL', '#Shaders'],
    pinned: false,
    color: 'purple',
    createdAt: '2h ago',
  },
  {
    id: 'note-4',
    title: 'Weekly Sprint Checklist',
    content: '',
    checklist: [
      { id: 'c4', text: 'Export 3 walk-cycle keyframes in Toon Boom', completed: true },
      { id: 'c5', text: 'Set 3-point lighting rig in Blender', completed: true },
      { id: 'c6', text: 'Test neon blue bounce reflection', completed: false },
    ],
    tags: ['#Sprint', '#Checklist'],
    pinned: false,
    color: 'default',
    createdAt: 'Today',
  },
  {
    id: 'note-5',
    title: 'Game UI Color Palette',
    content:
      'Neo-pop contrast pairings for cyberpunk inventory screens and health indicators: #84CC16 (Lime), #4B41E1 (Indigo), #EAB308 (Cyber Yellow).',
    tags: ['#GameUI', '#Palette'],
    pinned: false,
    color: 'orange',
    createdAt: '2 days ago',
  },
  {
    id: 'note-6',
    title: 'Mentor Feedback - Dikshant',
    content:
      'Whip slash arc trajectory needs 1 frame delay on secondary cloth overlap. Check cape collision geometry in frame 32.',
    tags: ['#MentorReview', '#Animation'],
    pinned: false,
    color: 'blue',
    createdAt: '3 days ago',
  },
  {
    id: 'note-7',
    title: 'Rigging Notes for Cyber Character',
    content:
      'Weight paint shoulder pads separately from clavicle. Test extreme squat deformation in frame 40 to avoid mesh penetration.',
    tags: ['#Blender', '#Rigging'],
    pinned: false,
    color: 'default',
    createdAt: 'Oct 12',
  },
];
