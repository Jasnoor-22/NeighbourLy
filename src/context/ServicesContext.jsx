import { createContext, useContext } from 'react'
import { services as mockServices } from '../data/services'
import { useLocalStorage } from '../hooks/useLocalStorage'

// Combines the built-in mock services with any services the current user
// has posted through "Become a Seller". Posted services are saved to
// localStorage so they survive a page refresh, per the brief.
const ServicesContext = createContext(null)

export function ServicesProvider({ children }) {
  const [postedServices, setPostedServices] = useLocalStorage('neighbourly_posted_services', [])

  function addService(service) {
    setPostedServices((prev) => [service, ...prev])
  }

  const allServices = [...postedServices, ...mockServices]

  return (
    <ServicesContext.Provider value={{ allServices, postedServices, addService }}>
      {children}
    </ServicesContext.Provider>
  )
}

export function useServices() {
  const context = useContext(ServicesContext)
  if (!context) {
    throw new Error('useServices must be used inside a ServicesProvider')
  }
  return context
}
