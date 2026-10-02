import { useNavigate } from 'react-router-dom'
import Rating from './Rating'
import Badge from './Badge'
import Avatar from './Avatar'

export default function ProviderCard({ provider }) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/provider/${provider.id}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCardClick()
    }
  }

  return (
    <article
      className="provider-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View profile for ${provider.name}`}
    >
      <div className="provider-card-header">
        <Avatar
          src={provider.avatarUrl}
          name={provider.name}
          size="lg"
          verified={provider.verified}
        />
        <div className="provider-card-identity">
          <div className="provider-card-name-row">
            <h3 className="provider-card-name">{provider.name}</h3>
          </div>
          <p className="provider-card-tag">{provider.tag}</p>
          <div className="provider-card-meta-row">
            <Rating value={provider.rating} count={provider.reviewCount} />
            <span className="meta-separator">•</span>
            <span className="location-text">📍 {provider.location}</span>
          </div>
        </div>
      </div>

      {provider.skills && provider.skills.length > 0 && (
        <div className="provider-card-skills" aria-label="Skills">
          {provider.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="skill-pill">
              {skill}
            </span>
          ))}
          {provider.skills.length > 3 && (
            <span className="skill-pill-more">+{provider.skills.length - 3}</span>
          )}
        </div>
      )}

      <div className="provider-card-footer">
        <span className="completed-stat">
          <strong>{provider.completedServices}</strong> completed jobs
        </span>
        <span className="view-profile-link">View profile →</span>
      </div>
    </article>
  )
}
