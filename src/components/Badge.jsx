// Accessible pill badge with clean contrast and subtle borders.
export default function Badge({
  children,
  variant = 'accent', // accent | trust | mint | lavender | neutral | warning | danger
  className = '',
  icon = null,
}) {
  // Normalize legacy variants
  const resolvedVariant = variant === 'mint' ? 'trust' : variant === 'lavender' ? 'accent' : variant

  return (
    <span className={`badge badge-${resolvedVariant} ${className}`}>
      {icon && <span className="badge-icon" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  )
}
