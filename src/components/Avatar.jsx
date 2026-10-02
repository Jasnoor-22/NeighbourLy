import { useState } from 'react'

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
}

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0 || !parts[0]) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Avatar({
  src,
  name = 'User',
  size = 'md',
  verified = false,
  className = '',
  style = {},
}) {
  const [imgError, setImgError] = useState(false)
  const pixelSize = sizeMap[size] || sizeMap.md

  return (
    <div
      className={`avatar-container avatar-${size} ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: pixelSize,
        height: pixelSize,
        minWidth: pixelSize,
        minHeight: pixelSize,
        borderRadius: '50%',
        backgroundColor: 'var(--brand-accent-soft, #ece7fd)',
        color: 'var(--brand-primary, #1c2340)',
        fontSize: Math.max(10, Math.floor(pixelSize * 0.4)),
        fontWeight: 600,
        overflow: 'visible',
        userSelect: 'none',
        ...style,
      }}
      aria-label={`${name}'s avatar`}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}

      {verified && (
        <span
          className="avatar-verified-badge"
          title="Verified Provider"
          style={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            width: Math.max(14, Math.floor(pixelSize * 0.32)),
            height: Math.max(14, Math.floor(pixelSize * 0.32)),
            borderRadius: '50%',
            backgroundColor: 'var(--trust-green, #15803d)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: Math.max(8, Math.floor(pixelSize * 0.2)),
            border: '2px solid var(--white, #ffffff)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          ✓
        </span>
      )}
    </div>
  )
}
