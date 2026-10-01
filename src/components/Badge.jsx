// Small pill used for "Verified", categories, statuses, etc.
export default function Badge({ children, variant = 'lavender' }) {
  return <span className={`badge badge-${variant}`}>{children}</span>
}
