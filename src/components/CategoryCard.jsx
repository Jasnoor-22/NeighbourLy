import ImageWithFallback from './ImageWithFallback'

export default function CategoryCard({ category, selected, onClick }) {
  return (
    <button
      type="button"
      className={`category-card-modern ${selected ? 'selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      {category.image && (
        <div className="category-card-image-bg">
          <ImageWithFallback
            src={category.image}
            alt={category.name}
            aspectRatio="16 / 10"
            className="category-cover"
          />
          <div className="category-overlay-scrim" />
        </div>
      )}
      <div className="category-content">
        <span className="category-icon-pill" aria-hidden="true">
          {category.icon}
        </span>
        <span className="category-name">{category.name}</span>
      </div>
    </button>
  )
}
