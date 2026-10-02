import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Rating from './Rating'
import Avatar from './Avatar'
import ImageWithFallback from './ImageWithFallback'
import { getProviderById } from '../data/providers'
import { getCategoryById } from '../data/categories'
import { formatPrice, formatDistance } from '../utils/format'
import { useFavorites } from '../context/FavoritesContext'

export default function ServiceCard({ service }) {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [animatingHeart, setAnimatingHeart] = useState(false)

  const provider = getProviderById(service.providerId)
  const category = getCategoryById(service.category)
  const favorited = isFavorite(service.id)

  const handleCardClick = () => {
    navigate(`/service/${service.id}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCardClick()
    }
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    setAnimatingHeart(true)
    toggleFavorite(service.id)
    setTimeout(() => setAnimatingHeart(false), 350)
  }

  return (
    <article
      className="service-card group"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${service.title}`}
    >
      <div className="service-card-media-wrapper">
        <ImageWithFallback
          src={service.image}
          alt={service.title}
          aspectRatio="16 / 10"
          className="service-card-img"
        />

        {category && (
          <span className="cat-chip-overlay" aria-label={`Category: ${category.name}`}>
            {category.name}
          </span>
        )}

        <button
          type="button"
          className={`fav-btn-action ${favorited ? 'favorited' : ''} ${
            animatingHeart ? 'heart-pulse' : ''
          }`}
          aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
          aria-pressed={favorited}
          onClick={handleFavoriteClick}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={favorited ? '#ef4444' : 'none'}
            stroke={favorited ? '#ef4444' : '#19213d'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="service-card-body">
        <div className="service-card-meta-top">
          <Rating value={service.rating} count={service.reviewCount} />
          <span className="meta-separator">•</span>
          <span className="distance-badge">{formatDistance(service.distanceKm)}</span>
        </div>

        <h3 className="service-card-title">{service.title}</h3>

        {provider && (
          <div
            className="service-card-provider"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/provider/${provider.id}`)
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.stopPropagation()
                navigate(`/provider/${provider.id}`)
              }
            }}
            aria-label={`View profile of ${provider.name}`}
          >
            <Avatar
              src={provider.avatarUrl}
              name={provider.name}
              size="xs"
              verified={provider.verified}
            />
            <span className="provider-name">{provider.shortName || provider.name}</span>
          </div>
        )}

        <div className="service-card-footer">
          <div className="price-container">
            <span className="price-label">Price</span>
            <span className="service-card-price">{formatPrice(service.price, service.priceType)}</span>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm action-msg-btn"
            onClick={(e) => {
              e.stopPropagation()
              navigate('/messages')
            }}
          >
            Message
          </button>
        </div>
      </div>
    </article>
  )
}
