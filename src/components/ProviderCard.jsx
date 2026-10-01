import { useNavigate } from 'react-router-dom'
import Rating from './Rating'
import Badge from './Badge'

export default function ProviderCard({ provider }) {
  const navigate = useNavigate()
  return (
    <article
      className="service-card"
      onClick={() => navigate(`/provider/${provider.id}`)}
      role="button"
      tabIndex={0}
    >
      <div className="service-card-body" style={{ alignItems: 'center', textAlign: 'center' }}>
        <span className="avatar" style={{ width: 64, height: 64, fontSize: '2rem', margin: '0 auto' }}>
          {provider.avatar}
        </span>
        <h3 className="service-card-title">{provider.name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{provider.tag}</p>
        {provider.verified && <Badge variant="mint">✓ Verified</Badge>}
        <Rating value={provider.rating} count={provider.reviewCount} />
      </div>
    </article>
  )
}
