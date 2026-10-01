import { categories } from '../data/categories'

// Controlled filter sidebar for the Browse page. `filters` and
// `onChange` are lifted up to the Browse page so the grid of results
// can react to them.
export default function FilterPanel({ filters, onChange }) {
  function update(patch) {
    onChange({ ...filters, ...patch })
  }

  return (
    <aside className="filter-panel">
      <div className="filter-group">
        <h4>Category</h4>
        <label className="filter-option">
          <input
            type="radio"
            name="category"
            checked={filters.category === 'all'}
            onChange={() => update({ category: 'all' })}
          />
          All categories
        </label>
        {categories.map((c) => (
          <label className="filter-option" key={c.id}>
            <input
              type="radio"
              name="category"
              checked={filters.category === c.id}
              onChange={() => update({ category: c.id })}
            />
            {c.icon} {c.name}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Max price: ₹{filters.maxPrice}</h4>
        <input
          type="range"
          min="100"
          max="2000"
          step="50"
          value={filters.maxPrice}
          onChange={(e) => update({ maxPrice: Number(e.target.value) })}
          style={{ width: '100%', accentColor: 'var(--lavender)' }}
        />
      </div>

      <div className="filter-group">
        <h4>Max distance: {filters.maxDistance} km</h4>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={filters.maxDistance}
          onChange={(e) => update({ maxDistance: Number(e.target.value) })}
          style={{ width: '100%', accentColor: 'var(--lavender)' }}
        />
      </div>

      <div className="filter-group">
        <h4>Minimum rating</h4>
        {[0, 4, 4.5].map((r) => (
          <label className="filter-option" key={r}>
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === r}
              onChange={() => update({ minRating: r })}
            />
            {r === 0 ? 'Any rating' : `${r}★ and up`}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Delivery</h4>
        {[
          { id: 'all', label: 'Online & Local' },
          { id: 'online', label: 'Online only' },
          { id: 'local', label: 'Local only' },
        ].map((opt) => (
          <label className="filter-option" key={opt.id}>
            <input
              type="radio"
              name="mode"
              checked={filters.mode === opt.id}
              onChange={() => update({ mode: opt.id })}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </aside>
  )
}
