import { categories } from '../data/categories'

export default function FilterPanel({ filters, onChange, onReset }) {
  function update(patch) {
    onChange({ ...filters, ...patch })
  }

  const isFiltered =
    filters.category !== 'all' ||
    filters.maxPrice < 2000 ||
    filters.maxDistance < 10 ||
    filters.minRating > 0 ||
    filters.mode !== 'all'

  return (
    <aside className="filter-panel-root" aria-label="Filters">
      <div className="filter-panel-header">
        <h3 className="filter-panel-title">Filters</h3>
        {isFiltered && onReset && (
          <button
            type="button"
            className="filter-reset-btn"
            onClick={onReset}
          >
            Reset all
          </button>
        )}
      </div>

      <div className="filter-group">
        <h4 className="filter-group-title">Category</h4>
        <div className="filter-options-stack">
          <label className={`filter-radio-label ${filters.category === 'all' ? 'active' : ''}`}>
            <input
              type="radio"
              name="category"
              className="filter-radio-input"
              checked={filters.category === 'all'}
              onChange={() => update({ category: 'all' })}
            />
            <span className="radio-text">All categories</span>
          </label>
          {categories.map((c) => (
            <label
              className={`filter-radio-label ${filters.category === c.id ? 'active' : ''}`}
              key={c.id}
            >
              <input
                type="radio"
                name="category"
                className="filter-radio-input"
                checked={filters.category === c.id}
                onChange={() => update({ category: c.id })}
              />
              <span className="radio-icon">{c.icon}</span>
              <span className="radio-text">{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-slider-head">
          <h4 className="filter-group-title">Max Price</h4>
          <span className="filter-slider-value">₹{filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min="100"
          max="2000"
          step="50"
          value={filters.maxPrice}
          onChange={(e) => update({ maxPrice: Number(e.target.value) })}
          className="filter-range-slider"
          aria-label="Maximum price filter"
        />
        <div className="filter-slider-limits">
          <span>₹100</span>
          <span>₹2,000</span>
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-slider-head">
          <h4 className="filter-group-title">Max Distance</h4>
          <span className="filter-slider-value">{filters.maxDistance} km</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={filters.maxDistance}
          onChange={(e) => update({ maxDistance: Number(e.target.value) })}
          className="filter-range-slider"
          aria-label="Maximum distance filter"
        />
        <div className="filter-slider-limits">
          <span>1 km</span>
          <span>10 km</span>
        </div>
      </div>

      <div className="filter-group">
        <h4 className="filter-group-title">Minimum Rating</h4>
        <div className="filter-options-grid">
          {[0, 4, 4.5].map((r) => (
            <label
              className={`filter-chip-option ${filters.minRating === r ? 'active' : ''}`}
              key={r}
            >
              <input
                type="radio"
                name="rating"
                className="filter-radio-input sr-only"
                checked={filters.minRating === r}
                onChange={() => update({ minRating: r })}
              />
              <span>{r === 0 ? 'Any' : `${r}★+`}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4 className="filter-group-title">Delivery Method</h4>
        <div className="filter-options-stack">
          {[
            { id: 'all', label: 'Online & Local' },
            { id: 'online', label: 'Online only' },
            { id: 'local', label: 'In-person / Local pickup' },
          ].map((opt) => (
            <label
              className={`filter-radio-label ${filters.mode === opt.id ? 'active' : ''}`}
              key={opt.id}
            >
              <input
                type="radio"
                name="mode"
                className="filter-radio-input"
                checked={filters.mode === opt.id}
                onChange={() => update({ mode: opt.id })}
              />
              <span className="radio-text">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
