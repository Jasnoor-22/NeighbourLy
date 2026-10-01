import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

// Keeps a list of favorited service ids in localStorage and shares it
// across every page via React Context, so the heart icon stays in sync
// no matter where you toggle it from (Home, Browse, Service Details...).
const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage('neighbourly_favorites', [])

  function toggleFavorite(serviceId) {
    setFavoriteIds((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    )
  }

  function isFavorite(serviceId) {
    return favoriteIds.includes(serviceId)
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used inside a FavoritesProvider')
  }
  return context
}
