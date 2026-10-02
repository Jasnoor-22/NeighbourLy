import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="container footer-grid">
        <div className="footer-col-brand">
          <div className="footer-brand-title">
            <span className="brand-icon" aria-hidden="true">🌱</span>
            <span>Neighbour<span className="brand-highlight">ly</span></span>
          </div>
          <p className="footer-tagline">
            Local skills. Real opportunities. A trusted community marketplace where neighbors connect to share skills, hire local help, and earn sustainably.
          </p>
          <div className="footer-community-badge">
            <span className="badge-dot" />
            <span>Built for vibrant local neighborhoods</span>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-header">Explore</h4>
          <ul className="footer-links-list">
            <li><Link to="/browse">Browse all services</Link></li>
            <li><Link to="/become-a-seller">Become a provider</Link></li>
            <li><Link to="/browse?category=academic">Academic tutoring</Link></li>
            <li><Link to="/browse?category=handmade">Handmade & crafts</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-header">Community & Trust</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Verified members</Link></li>
            <li><Link to="/">Trust & safety guidelines</Link></li>
            <li><Link to="/">Community standards</Link></li>
            <li><Link to="/">Help & support</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-header">Account</h4>
          <ul className="footer-links-list">
            <li><Link to="/profile">Your profile</Link></li>
            <li><Link to="/orders">Active orders</Link></li>
            <li><Link to="/messages">Conversations</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom-bar">
        <p className="copyright-text">
          © {new Date().getFullYear()} Neighbourly Technologies Inc. All rights reserved.
        </p>
        <p className="disclaimer-text">
          Marketplace prototype. External payment processing and verification will be powered by regulated partners.
        </p>
      </div>
    </footer>
  )
}
