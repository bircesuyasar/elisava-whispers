// pin.x / pin.y are percentages of the SVG viewBox (1252 × 1368)
// Derived from text-label anchor coordinates in floorplan.svg
export const locations = [
  {
    id: 'banana-corner',
    emoji: '🍌',
    name: 'Banana Zone',
    room: 'Café-Bar',
    hint: 'Where paths converge and stories begin.',
    pin: { x: 27, y: 35 },
  },
  {
    id: 'grape-hall',
    emoji: '🍇',
    name: 'Grape Zone',
    room: 'Agora Exhibition Hall',
    hint: 'A cluster of minds, sharing the vine.',
    pin: { x: 27, y: 57 },
  },
  {
    id: 'lemon-lab',
    emoji: '🍋',
    name: 'Lemon Zone',
    room: 'Bio Lab',
    hint: 'Sharp ideas squeezed into form.',
    pin: { x: 18, y: 18 },
  },
  {
    id: 'berry-edge',
    emoji: '🍓',
    name: 'Berry Zone',
    room: 'Space Lab',
    hint: 'At the edge where inside meets outside.',
    pin: { x: 63, y: 88 },
  },
  {
    id: 'orange-lounge',
    emoji: '🍊',
    name: 'Orange Zone',
    room: 'Student Lounge',
    hint: 'Warm light, low voices, slow time.',
    pin: { x: 42, y: 72 },
  },
]
