import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories } from '../data/categories'
import { providers } from '../data/providers'
import CategoryCard from '../components/CategoryCard'
import ServiceCard from '../components/ServiceCard'
import ProviderCard from '../components/ProviderCard'
import { useServices } from '../context/ServicesContext'

export default function Home() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Near City Centre')
  const navigate = useNavigate()
  const { allServices } = useServices()

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/browse${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  // "Popular near you" — sorted by rating for the homepage preview.
  const popularServices = [...allServices].sort((a, b) => b.rating - a.rating).slice(0, 6)

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <h1>Local Skills. Real Opportunities.</h1>
          <p className="subhead">
            Find useful services from people around you — or turn your own skills into an opportunity.
          </p>

          <form className="search-panel" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="What are you looking for?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="divider" />
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option>Near City Centre</option>
              <option>Near Main Market</option>
              <option>Near University</option>
              <option>Near Tech Park</option>
              <option>Near Green Park</option>
            </select>
            <button type="submit" className="btn btn-accent">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <h2>Browse by category</h2>
            <p>Find the kind of help you're looking for.</p>
          </div>
        </div>
        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onClick={() => navigate(`/browse?category=${cat.id}`)}
            />
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <h2>Popular Near You</h2>
            <p>Highly-rated services from people in your neighbourhood.</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/browse')}>
            View all
          </button>
        </div>
        <div className="grid">
          {popularServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <h2>Meet local providers</h2>
            <p>Real people from your neighbourhood, ready to help.</p>
          </div>
        </div>
        <div className="grid">
          {providers.slice(0, 3).map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <h2>How Neighbourly works</h2>
            <p>A simple, honest way for the platform to sustain itself — no payments live yet.</p>
          </div>
        </div>
        <div className="how-grid">
          <div className="how-card">
            <span className="emoji">🤝</span>
            <h4>Small commission on completed orders</h4>
            <p>A small percentage is kept only when a service is successfully completed.</p>
          </div>
          <div className="how-card">
            <span className="emoji">⭐</span>
            <h4>Featured & promoted listings</h4>
            <p>Sellers can optionally pay to get extra visibility for a listing.</p>
          </div>
          <div className="how-card">
            <span className="emoji">🚲</span>
            <h4>Optional delivery fees</h4>
            <p>For handmade or physical goods that need drop-off instead of pickup.</p>
          </div>
          <div className="how-card">
            <span className="emoji">🛠️</span>
            <h4>Future premium seller tools</h4>
            <p>Analytics, scheduling and storefront customisation for serious sellers.</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <h2>Not another Fiverr</h2>
            <p>Neighbourly is built around your neighbourhood, not the whole internet.</p>
          </div>
        </div>
        <div className="differentiator-row">
          <div className="diff-card fiverr">
            <h4>Fiverr</h4>
            <p>Global professional freelancing — large projects, remote clients, established freelancers.</p>
          </div>
          <div className="diff-card neighbourly">
            <h4>Neighbourly</h4>
            <p>
              Local discovery with approximate distance, a mix of physical and digital services, small
              everyday jobs, and room for students, hobbyists and beginners — with pickup, delivery or
              in-person options where it makes sense.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
