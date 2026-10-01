// Category list used across Home + Browse for filtering.
// "icon" is a short emoji so we don't need an icon library.
export const categories = [
  { id: 'academic', name: 'Academic Support', icon: '📚' },
  { id: 'creative', name: 'Creative & Design', icon: '🎨' },
  { id: 'handmade', name: 'Handmade & Crafts', icon: '🧶' },
  { id: 'tech', name: 'Tech & Digital', icon: '💻' },
  { id: 'home', name: 'Home Help', icon: '🏠' },
  { id: 'events', name: 'Events', icon: '🎉' },
  { id: 'other', name: 'Other', icon: '✨' },
]

export const getCategoryById = (id) => categories.find((c) => c.id === id)
