import { useParams, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import Badge from '../components/Badge'
import Avatar from '../components/Avatar'
import ImageWithFallback from '../components/ImageWithFallback'
import ServiceCard from '../components/ServiceCard'
import { getProviderById } from '../data/providers'
import { getServicesByProvider } from '../data/services'
import NotFound from './NotFound'

export default function ProviderProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const provider = getProviderById(id)
  if (!provider) return <NotFound />

  const providerServices = getServicesByProvider(provider.id)
  const portfolioList = provider.portfolioImages || []

  return (
    <div className="container" style={{ padding: '32px 24px 60px' }}>
      <div className="profile-header">
        <Avatar
          src={provider.avatarUrl}
          name={provider.name}
          size="xl"
          verified={provider.verified}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
            {provider.name}
            {provider.verified && <Badge variant="trust">✓ Verified</Badge>}
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>{provider.tag} · 📍 {provider.location}</p>
          <p style={{ marginTop: 12, color: 'var(--text-main)', maxWidth: 520, lineHeight: 1.5 }}>
            "{provider.bio}"
          </p>

          <div className="profile-stats">
            <div>
              <strong>{provider.rating.toFixed(1)}★</strong>
              <span>{provider.reviewCount} reviews</span>
            </div>
            <div>
              <strong>{provider.completedServices}</strong>
              <span>Completed</span>
            </div>
            <div>
              <strong>{providerServices.length}</strong>
              <span>Active listings</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate('/messages')}
        >
          Message
        </button>
      </div>

      <div className="section" style={{ paddingBottom: 20 }}>
        <div className="section-head">
          <div>
            <h2 style={{ fontSize: '1.2rem' }}>Skills & Expertise</h2>
          </div>
        </div>
        <div className="tag-row">
          {provider.skills.map((skill) => (
            <span className="tag" key={skill}>{skill}</span>
          ))}
        </div>
      </div>

      <div className="section" style={{ paddingTop: 0, paddingBottom: 20 }}>
        <div className="section-head">
          <h2 style={{ fontSize: '1.2rem' }}>Featured Work & Portfolio</h2>
        </div>
        <div className="portfolio-grid">
          {portfolioList.length > 0 ? (
            portfolioList.map((imgUrl, i) => (
              <div className="portfolio-tile-photo" key={i}>
                <ImageWithFallback
                  src={imgUrl}
                  alt={`${provider.name}'s portfolio sample ${i + 1}`}
                  aspectRatio="1 / 1"
                  className="portfolio-thumb"
                />
              </div>
            ))
          ) : (
            provider.portfolio.map((item, i) => (
              <div className="portfolio-tile" key={i}>{item}</div>
            ))
          )}
        </div>
      </div>

      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 style={{ fontSize: '1.2rem' }}>Services offered ({providerServices.length})</h2>
        </div>
        <div className="grid">
          {providerServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  )
}
