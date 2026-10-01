import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem' }}>🧭</div>
      <h1 style={{ marginTop: 12, color: 'var(--navy)' }}>Page not found</h1>
      <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
        That page doesn't exist, or the listing may have been removed.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>
        Back to Home
      </Link>
    </div>
  )
}
