import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Rating from '../components/Rating'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
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
          <div className="details-media">{service.emoji}</div>

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
                className="icon-btn"
                aria-label="Save to favorites"
                onClick={() => toggleFavorite(service.id)}
              >
                {favorited ? '❤️' : '🤍'}
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
              >
                <span className="avatar">{provider.avatar}</span>
                <div>
                  <h4>
                    {provider.name}{' '}
                    {provider.verified && <Badge variant="mint">✓</Badge>}
                  </h4>
                  <p>{provider.tag}</p>
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
