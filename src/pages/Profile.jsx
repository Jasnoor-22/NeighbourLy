import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useServices } from '../context/ServicesContext'
import ServiceCard from '../components/ServiceCard'
import { orders } from '../data/orders'

const defaultProfile = {
  name: 'You',
  location: 'Near City Centre',
  bio: 'Add a short bio so people know a bit about you before booking.',
}

export default function Profile() {
  const navigate = useNavigate()
  const { postedServices } = useServices()
  const [profile, setProfile] = useLocalStorage('neighbourly_profile', defaultProfile)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(profile)
  const [view, setView] = useState('overview') // overview | services | orders

  const completedOrders = orders.filter((o) => o.tab === 'completed')
  const earnings = completedOrders.reduce((sum, o) => sum + o.price, 0)

  const completionFields = [profile.name !== 'You', profile.bio.length > 10, postedServices.length > 0]
  const completionPct = Math.round(
    (completionFields.filter(Boolean).length / completionFields.length) * 100
  )

  function saveProfile() {
    setProfile(draft)
    setEditing(false)
  }

  return (
    <div className="container" style={{ padding: '32px 24px 60px' }}>
      <div className="profile-header">
        <span className="avatar" style={{ width: 84, height: 84, fontSize: '2.4rem' }}>🙂</span>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.4rem', color: 'var(--navy)' }}>{profile.name}</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>📍 {profile.location}</p>
          <p style={{ marginTop: 10, maxWidth: 480 }}>{profile.bio}</p>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 14 }}>
            Profile completion — {completionPct}%
          </p>
          <div className="progress-bar" style={{ maxWidth: 260 }}>
            <div style={{ width: `${completionPct}%` }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button className="btn btn-primary btn-sm" onClick={() => { setDraft(profile); setEditing(true) }}>
            Edit Profile
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => setView('services')}>
            My Services
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/orders')}>
            My Orders
          </button>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-stat">
          <strong>{postedServices.length}</strong>
          <span>Services listed</span>
        </div>
        <div className="dash-stat">
          <strong>{orders.length}</strong>
          <span>Total orders</span>
        </div>
        <div className="dash-stat">
          <strong>₹{earnings}</strong>
          <span>Earnings (mock)</span>
        </div>
        <div className="dash-stat">
          <strong>{completedOrders.length}</strong>
          <span>Completed jobs</span>
        </div>
      </div>

      {view === 'services' && (
        <div className="section" style={{ paddingBottom: 0 }}>
          <div className="section-head">
            <h2 style={{ fontSize: '1.2rem' }}>My services</h2>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/become-a-seller')}>
              + Post a service
            </button>
          </div>
          {postedServices.length === 0 ? (
            <div className="empty-state">
              <div className="emoji">🧰</div>
              <p>You haven't posted a service yet.</p>
            </div>
          ) : (
            <div className="grid">
              {postedServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      )}

      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Edit profile</h3>
            <div className="form-field" style={{ marginTop: 14 }}>
              <label>Name</label>
              <input
                type="text"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Location</label>
              <select
                value={draft.location}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
              >
                <option>Near City Centre</option>
                <option>Near Main Market</option>
                <option>Near University</option>
                <option>Near Tech Park</option>
                <option>Near Green Park</option>
              </select>
            </div>
            <div className="form-field">
              <label>Bio</label>
              <textarea value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} />
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setEditing(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveProfile}>Save changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
