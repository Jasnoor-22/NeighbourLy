export default function SearchBar({ value, onChange, placeholder = 'What are you looking for?' }) {
  return (
    <div className="searchbar">
      <span>🔍</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
