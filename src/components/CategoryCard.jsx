export default function CategoryCard({ category, selected, onClick }) {
  return (
    <button
      type="button"
      className={`category-card${selected ? ' selected' : ''}`}
      onClick={onClick}
    >
      <span className="emoji">{category.icon}</span>
      <span>{category.name}</span>
    </button>
  )
}
