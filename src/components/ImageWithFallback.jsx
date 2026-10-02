import { useState } from 'react'
import { defaultFallbackImage } from '../data/images'

/**
 * Reusable Image component with progressive loading skeleton and fallback support.
 * Ensures consistent aspect ratios, object-fit handling, and smooth fade-in.
 */
export default function ImageWithFallback({
  src,
  alt = 'Marketplace listing',
  className = '',
  aspectRatio = '16 / 10',
  fallbackSrc = defaultFallbackImage,
  loading = 'lazy',
  style = {},
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const resolvedSrc = hasError || !src ? fallbackSrc : src

  return (
    <div
      className={`media-image-wrapper ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio,
        backgroundColor: 'var(--bg-subtle)',
        ...style,
      }}
    >
      {!isLoaded && !hasError && (
        <div className="skeleton-placeholder" aria-hidden="true" />
      )}

      <img
        src={resolvedSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true)
          setIsLoaded(true)
        }}
        className={`media-image ${isLoaded ? 'loaded' : 'loading'}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.25s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        {...rest}
      />
    </div>
  )
}
