export default function Rating({ value = 5.0, count, className = '' }) {
  const numericValue = typeof value === 'number' ? value : Number(value) || 0

  return (
    <span
      className={`rating-badge ${className}`}
      aria-label={`Rating: ${numericValue.toFixed(1)} out of 5${count !== undefined ? ` from ${count} reviews` : ''}`}
    >
      <span className="star-icon" aria-hidden="true">★</span>
      <span className="rating-value">{numericValue.toFixed(1)}</span>
      {count !== undefined && (
        <span className="rating-count">({count})</span>
      )}
    </span>
  )
}
