export default function Rating({ value, count }) {
  return (
    <span className="rating">
      <span className="star">★</span>
      {value.toFixed(1)}
      {count !== undefined && <span className="count">({count})</span>}
    </span>
  )
}
