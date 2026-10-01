import { useNavigate } from 'react-router-dom'
import Rating from './Rating'
import { getProviderById } from '../data/providers'
import { getCategoryById } from '../data/categories'
import { formatPrice, formatDistance } from '../utils/format'
import { useFavorites } from '../context/FavoritesContext'

export default function ServiceCard({ service }) {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const provider = getProviderById(service.providerId)
  const category = getCategoryById(service.category)
  const favorited = isFavorite(service.id)

  return (
    <article className="service-card">
      <div
        className="service-card-media"
        onClick={() => navigate(`/service/${service.id}`)}
        role="button"
        tabIndex={0}
      >
        <span className="cat-chip">{category?.name}</span>
        <button
          type="button"
          className="fav-btn"
          aria-label="Save to favorites"
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(service.id)
          }}
        >
          {favorited ? '❤️' : '🤍'}
        </button>
        {service.emoji}
      </div>

      <div className="service-card-body">
        <h3
          className="service-card-title"
          onClick={() => navigate(`/service/${service.id}`)}
          role="button"
          tabIndex={0}
        >
          {service.title}
        </h3>

        <div className="service-card-meta">
          <Rating value={service.rating} count={service.reviewCount} />
          <span className="dot">•</span>
          <span>{formatDistance(service.distanceKm)}</span>
        </div>

        {provider && (
          <div
            className="service-card-provider"
            onClick={() => navigate(`/provider/${provider.id}`)}
            role="button"
            tabIndex={0}
          >
            <span className="mini-avatar">{provider.avatar}</span>
            <span>{provider.shortName}</span>
          </div>
        )}

        <div className="service-card-footer">
          <span className="service-card-price">{formatPrice(service.price, service.priceType)}</span>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => navigate('/messages')}
          >
            Message
          </button>
        </div>
      </div>
    </article>
  )
}
