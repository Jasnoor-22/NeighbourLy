import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h4>Neighbourly</h4>
          <p>Local skills. Real opportunities. A place for students, hobbyists and local sellers to turn everyday skills into income.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/browse">Browse services</Link>
          <Link to="/become-a-seller">Become a seller</Link>
          <Link to="/">How it works</Link>
        </div>
        <div>
          <h4>Trust & Safety</h4>
          <Link to="/">Verified users</Link>
          <Link to="/">Report a user</Link>
          <Link to="/">Community guidelines</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/profile">Your profile</Link>
          <Link to="/orders">Your orders</Link>
          <Link to="/messages">Messages</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        © 2026 Neighbourly. A student-built MVP, not yet handling real payments.
      </div>
    </footer>
  )
}
