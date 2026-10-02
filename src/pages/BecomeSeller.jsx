import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories } from '../data/categories'
import { useServices } from '../context/ServicesContext'
import { categoryImages, defaultFallbackImage } from '../data/images'

const TOTAL_STEPS = 5

const emptyForm = {
  title: '',
  category: '',
  description: '',
  price: '',
  priceType: 'hour',
  skills: [],
  location: 'Near City Centre',
  mode: 'online',
  emoji: '✨',
}

export default function BecomeSeller() {
  const navigate = useNavigate()
  const { addService } = useServices()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(emptyForm)
  const [published, setPublished] = useState(false)

  function update(patch) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  function toggleSkill(skill) {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  function next() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1))
  }

  function handlePublish() {
    const newService = {
      id: `user-${Date.now()}`,
      title: form.title || 'Untitled service',
      category: form.category || 'other',
      providerId: 'me',
      image: categoryImages[form.category] || defaultFallbackImage,
      emoji: form.emoji || '✨',
      price: Number(form.price) || 0,
      priceType: form.priceType,
      rating: 5.0,
      reviewCount: 0,
      distanceKm: 0.5,
      location: form.location,
      mode: form.mode,
      description: form.description || 'No description provided yet.',
      tags: form.skills,
      availability: 'Set by you after publishing',
    }
    addService(newService)
    setPublished(true)
  }

  if (published) {
    return (
      <div className="container" style={{ padding: '60px 24px' }}>
        <div className="form-card success-box">
          <div className="emoji">🎉</div>
          <h2>Your service is live!</h2>
          <p>"{form.title}" is now visible on Browse and your profile.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 24 }}>
            <button className="btn btn-outline" onClick={() => navigate('/browse')}>
              View on Browse
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setForm(emptyForm)
                setStep(1)
                setPublished(false)
              }}
            >
              Post another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '40px 24px 60px' }}>
      <div className="page-header" style={{ textAlign: 'center', padding: '0 0 24px' }}>
        <h1>Become a Seller</h1>
        <p>List a skill or service in a few short steps.</p>
      </div>

      <div className="form-card">
        <div className="stepper">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className={`step${i + 1 <= step ? ' done' : ''}`} />
          ))}
        </div>

        {step === 1 && (
          <>
            <h3 style={{ marginBottom: 16, color: 'var(--navy)' }}>Basic information</h3>
            <div className="form-field">
              <label>Service title</label>
              <input
                type="text"
                placeholder="e.g. Homework & Study Help"
                value={form.title}
                onChange={(e) => update({ title: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Category</label>
              <div className="chip-select">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={form.category === c.id ? 'selected' : ''}
                    onClick={() => update({ category: c.id })}
                  >
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 style={{ marginBottom: 16, color: 'var(--navy)' }}>Service details</h3>
            <div className="form-field">
              <label>Description</label>
              <textarea
                placeholder="Describe what you offer, your experience, and what makes it useful."
                value={form.description}
                onChange={(e) => update({ description: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Skills / tags</label>
              <div className="chip-select">
                {['Reliable', 'Fast Turnaround', 'Beginner Friendly', 'Custom Orders', 'Verified Materials'].map(
                  (skill) => (
                    <button
                      key={skill}
                      type="button"
                      className={form.skills.includes(skill) ? 'selected' : ''}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </button>
                  )
                )}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 style={{ marginBottom: 16, color: 'var(--navy)' }}>Pricing</h3>
            <div className="form-row">
              <div className="form-field">
                <label>Price (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 200"
                  value={form.price}
                  onChange={(e) => update({ price: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label>Pricing type</label>
                <select value={form.priceType} onChange={(e) => update({ priceType: e.target.value })}>
                  <option value="hour">Per hour</option>
                  <option value="starting">Starting price</option>
                  <option value="flat">Flat rate</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Location</label>
                <select value={form.location} onChange={(e) => update({ location: e.target.value })}>
                  <option>Near City Centre</option>
                  <option>Near Main Market</option>
                  <option>Near University</option>
                  <option>Near Tech Park</option>
                  <option>Near Green Park</option>
                </select>
              </div>
              <div className="form-field">
                <label>Delivery</label>
                <select value={form.mode} onChange={(e) => update({ mode: e.target.value })}>
                  <option value="online">Online only</option>
                  <option value="local">Local pickup / in-person</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h3 style={{ marginBottom: 16, color: 'var(--navy)' }}>Images / portfolio</h3>
            <div className="form-field">
              <label>Cover emoji (stand-in for a photo in this MVP)</label>
              <div className="chip-select">
                {['✨', '🎨', '📚', '🧶', '💻', '🎬', '📷', '🎂'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={form.emoji === emoji ? 'selected' : ''}
                    onClick={() => update({ emoji })}
                    style={{ fontSize: '1.2rem' }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div className="image-drop">
              📷 Real photo uploads aren't wired up in this MVP — an emoji stands in as your cover image.
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h3 style={{ marginBottom: 16, color: 'var(--navy)' }}>Review & publish</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 14 }}>
              Here's a quick preview of your listing:
            </p>
            <div className="details-card">
              <div style={{ fontSize: '2rem' }}>{form.emoji}</div>
              <h4 style={{ marginTop: 8, color: 'var(--navy)' }}>{form.title || 'Untitled service'}</h4>
              <p style={{ color: 'var(--text-muted)', marginTop: 6, fontSize: '0.9rem' }}>
                {form.description || 'No description yet.'}
              </p>
              <p style={{ marginTop: 10, fontWeight: 700, color: 'var(--navy)' }}>
                ₹{form.price || 0} {form.priceType === 'hour' ? '/hr' : form.priceType === 'starting' ? '+' : ''}
              </p>
              <div className="tag-row">
                {form.skills.map((s) => (
                  <span className="tag" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="form-nav">
          {step > 1 ? (
            <button className="btn btn-outline" onClick={back}>
              Back
            </button>
          ) : (
            <span />
          )}
          {step < TOTAL_STEPS ? (
            <button className="btn btn-primary" onClick={next}>
              Continue
            </button>
          ) : (
            <button className="btn btn-accent" onClick={handlePublish}>
              Publish listing
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
