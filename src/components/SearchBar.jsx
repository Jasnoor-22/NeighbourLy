export default function SearchBar({
  value,
  onChange,
  placeholder = 'What are you looking for? (e.g. Maths tutor, Crochet, Video editing...)',
  className = '',
}) {
  return (
    <div className={`searchbar-wrapper ${className}`}>
      <span className="searchbar-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="searchbar-input"
        aria-label="Search services"
      />
      {value && (
        <button
          type="button"
          className="searchbar-clear-btn"
          onClick={() => onChange('')}
          aria-label="Clear search query"
        >
          ✕
        </button>
      )}
    </div>
  )
}
