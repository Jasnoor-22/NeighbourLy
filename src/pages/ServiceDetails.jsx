import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Rating from '../components/Rating'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import Avatar from '../components/Avatar'
import ImageWithFallback from '../components/ImageWithFallback'
import { getProviderById } from '../data/providers'
import { getReviewsForService } from '../data/reviews'
import { formatPrice, formatDistance } from '../utils/format'
import { useServices } from '../context/ServicesContext'
import { useFavorites } from '../context/FavoritesContext'
import NotFound from './NotFound'

export default function ServiceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { allServices } = useServices()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [bookingOpen, setBookingOpen] = useState(false)
  const [booked, setBooked] = useState(false)

  const service = allServices.find((s) => s.id === id)
  if (!service) return <NotFound />

  const provider = getProviderById(service.providerId)
  const reviews = getReviewsForService(service.id)
  const favorited = isFavorite(service.id)

  return (
    <div className="container" style={{ padding: '32px 24px 60px' }}>
      <Link to="/browse" className="btn-ghost" style={{ display: 'inline-block', marginBottom: 16 }}>
        ← Back to Browse
      </Link>

      <div className="details-grid">
        <div>
          <div className="details-media-container">
            <ImageWithFallback
              src={service.image}
              alt={service.title}
              aspectRatio="16 / 9"
              className="details-hero-img"
            />
          </div>

          <div className="details-card" style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{ fontSize: '1.6rem', color: 'var(--navy)' }}>{service.title}</h1>
                <div className="info-row">
                  <Rating value={service.rating} count={service.reviewCount} />
                  <span>•</span>
                  <span>📍 {service.location} ({formatDistance(service.distanceKm)})</span>
                </div>
              </div>
              <button
                className={`fav-btn-action details-fav-btn ${favorited ? 'favorited' : ''}`}
                aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
                aria-pressed={favorited}
                onClick={() => toggleFavorite(service.id)}
              >
                <svg
                  width="20"
                  height="20"
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

            <p style={{ marginTop: 18, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {service.description}
            </p>

            <div className="tag-row">
              {service.tags.map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>

            <div style={{ marginTop: 20, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--navy)' }}>Availability</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{service.availability}</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--navy)' }}>Delivery</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {service.mode === 'online' && 'Online only'}
                  {service.mode === 'local' && 'Local pickup / in-person'}
                  {service.mode === 'both' && 'Online or local'}
                </p>
              </div>
            </div>
          </div>

          <div className="details-card" style={{ marginTop: 20 }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy)', marginBottom: 8 }}>
              Reviews ({reviews.length})
            </h3>
            {reviews.length === 0 && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No reviews yet.</p>
            )}
            {reviews.map((review) => (
              <div className="review-card" key={review.id}>
                <div className="review-head">
                  <p className="author">{review.author}</p>
                  <Rating value={review.rating} />
                </div>
                <p className="text">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="sidebar-card">
            <p className="sidebar-price">{formatPrice(service.price, service.priceType)}</p>
            <div className="sidebar-actions">
              <button className="btn btn-primary btn-block" onClick={() => setBookingOpen(true)}>
                Book Service
              </button>
              <button className="btn btn-outline btn-block" onClick={() => navigate('/messages')}>
                Message
              </button>
            </div>

            {provider && (
              <div
                className="provider-mini"
                onClick={() => navigate(`/provider/${provider.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/provider/${provider.id}`)
                }}
                aria-label={`View profile for ${provider.name}`}
              >
                <Avatar
                  src={provider.avatarUrl}
                  name={provider.name}
                  size="md"
                  verified={provider.verified}
                />
                <div className="provider-mini-info">
                  <h4 className="provider-mini-name">{provider.name}</h4>
                  <p className="provider-mini-tag">{provider.tag}</p>
                </div>
              </div>
            )}
          </div>

          <div className="safety-banner" style={{ marginTop: 16 }}>
            <span>🛡️</span>
            <span>
              Location shown is approximate for safety. Always meet in public places and check reviews
              before booking. Any interaction involving a minor should include a parent or guardian.
            </span>
          </div>
        </div>
      </div>

      <Modal
        isOpen={bookingOpen}
        onClose={() => {
          setBookingOpen(false)
          setBooked(false)
        }}
        title={booked ? 'Booking requested! 🎉' : 'Confirm booking'}
        actions={
          booked ? (
            <button className="btn btn-primary btn-block" onClick={() => setBookingOpen(false)}>
              Done
            </button>
          ) : (
            <>
              <button className="btn btn-outline" onClick={() => setBookingOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={() => setBooked(true)}>
                Confirm
              </button>
            </>
          )
        }
      >
        {booked ? (
          <p>
            {provider?.shortName || 'The provider'} will confirm your request soon. You can track it from
            your Orders page.
          </p>
        ) : (
          <p>
            You're about to request "{service.title}" for {formatPrice(service.price, service.priceType)}.
            This is a mock booking flow — no real payment is taken yet.
          </p>
        )}
      </Modal>
    </div>
  )
}
