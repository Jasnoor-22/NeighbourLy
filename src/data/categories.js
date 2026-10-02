import { categoryImages } from './images'

// Category list used across Home + Browse for filtering and discovery.
// Includes high-quality category imagery while retaining short icon accents.
export const categories = [
  { id: 'academic', name: 'Academic Support', icon: '📚', image: categoryImages.academic },
  { id: 'creative', name: 'Creative & Design', icon: '🎨', image: categoryImages.creative },
  { id: 'handmade', name: 'Handmade & Crafts', icon: '🧶', image: categoryImages.handmade },
  { id: 'tech', name: 'Tech & Digital', icon: '💻', image: categoryImages.tech },
  { id: 'home', name: 'Home Help', icon: '🏠', image: categoryImages.home },
  { id: 'events', name: 'Events', icon: '🎉', image: categoryImages.events },
  { id: 'other', name: 'Other', icon: '✨', image: categoryImages.other },
]

export const getCategoryById = (id) => categories.find((c) => c.id === id)
