// pin.x / pin.y are percentages of the SVG viewBox (1252 × 1368)
// Derived from text-label anchor coordinates in floorplan.svg
export const locations = [
  {
    id: 'banana-corner',
    slug: 'banana',
    emoji: '🍌',
    name: 'Banana Zone',
    room: 'Stairs',
    riddle: 'Not a room, not a corridor — just a decision',
    pin: { x: 27, y: 35 },
  },
  {
    id: 'grape-hall',
    slug: 'grape',
    emoji: '🍇',
    name: 'Grape Zone',
    room: 'Agora Exhibition Hall',
    riddle: 'Where the work finally leaves the studio',
    pin: { x: 27, y: 57 },
  },
  {
    id: 'lemon-lab',
    slug: 'lemon',
    emoji: '🍋',
    name: 'Lemon Zone',
    room: 'WC',
    riddle: "You'll find it when you need it the most",
    pin: { x: 18, y: 18 },
  },
  {
    id: 'berry-edge',
    slug: 'berry',
    emoji: '🍓',
    name: 'Berry Zone',
    room: 'Cafe Bar',
    riddle: 'Follow the smell of coffee',
    pin: { x: 63, y: 88 },
  },
  {
    id: 'orange-lounge',
    slug: 'orange',
    emoji: '🍊',
    name: 'Orange Zone',
    room: 'Terrace',
    riddle: "Step outside, you've been inside too long",
    pin: { x: 42, y: 72 },
  },
]
