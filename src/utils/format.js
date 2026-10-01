// Small formatting helpers kept separate from components so the JSX stays
// readable.

export function formatPrice(price, priceType) {
  const amount = `₹${price}`
  if (priceType === 'hour') return `${amount}/hr`
  if (priceType === 'starting') return `${amount}+`
  return amount
}

export function formatDistance(distanceKm) {
  return `${distanceKm.toFixed(1)} km`
}
