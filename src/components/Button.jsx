// A small wrapper so every button in the app shares the same set of
// look-and-feel variants instead of repeating classNames everywhere.
export default function Button({
  children,
  variant = 'primary', // primary | accent | outline | ghost
  size = 'md', // md | sm
  block = false,
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'sm' ? 'btn-sm' : '',
    block ? 'btn-block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
