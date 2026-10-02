import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import ServiceCard from '../components/ServiceCard'
import { useServices } from '../context/ServicesContext'

const defaultFilters = {
  category: 'all',
  maxPrice: 2000,
  maxDistance: 10,
  minRating: 0,
  mode: 'all',
}

export default function Browse() {
  const { allServices } = useServices()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [sortBy, setSortBy] = useState('recommended')
  const [filters, setFilters] = useState({
    ...defaultFilters,
    category: searchParams.get('category') || 'all',
  })

  const results = useMemo(() => {
    let list = allServices.filter((service) => {
      const matchesQuery =
        query.trim() === '' ||
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))

      const matchesCategory = filters.category === 'all' || service.category === filters.category
      const matchesPrice = service.price <= filters.maxPrice
      const matchesDistance = service.distanceKm <= filters.maxDistance
      const matchesRating = service.rating >= filters.minRating
      const matchesMode =
        filters.mode === 'all' ||
        service.mode === 'both' ||
        service.mode === filters.mode

      return (
        matchesQuery && matchesCategory && matchesPrice && matchesDistance && matchesRating && matchesMode
      )
    })

    if (sortBy === 'closest') list = [...list].sort((a, b) => a.distanceKm - b.distanceKm)
    if (sortBy === 'rated') list = [...list].sort((a, b) => b.rating - a.rating)
    if (sortBy === 'price') list = [...list].sort((a, b) => a.price - b.price)

    return list
  }, [allServices, query, filters, sortBy])

  return (
    <div className="container">
      <div className="page-header">
        <h1>Browse services</h1>
        <p>Discover local skills and services near you.</p>
      </div>

      <div style={{ margin: '20px 0' }}>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="browse-layout">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(defaultFilters)}
        />

        <div>
          <div className="browse-toolbar">
            <span className="result-count">
              <strong>{results.length}</strong> {results.length === 1 ? 'service' : 'services'} found
            </span>
            <div className="sort-wrapper">
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="recommended">Recommended</option>
                <option value="closest">Closest distance</option>
                <option value="rated">Highest rated</option>
                <option value="price">Lowest price</option>
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="empty-state-card">
              <div className="empty-state-icon" aria-hidden="true">🔍</div>
              <h3 className="empty-state-title">No services match your filters</h3>
              <p className="empty-state-desc">Try clearing some filters or searching for broader terms.</p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setQuery('')
                  setFilters(defaultFilters)
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid">
              {results.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
