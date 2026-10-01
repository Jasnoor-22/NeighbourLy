import { useState, useEffect } from 'react'

// A small hook that behaves like useState but also persists the value to
// localStorage, so mock data (favorites, posted services, profile edits)
// survives a page refresh.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch (error) {
      console.error(`Could not read localStorage key "${key}":`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Could not write localStorage key "${key}":`, error)
    }
  }, [key, value])

  return [value, setValue]
}
