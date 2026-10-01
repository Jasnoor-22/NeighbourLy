// A simple reusable confirmation-style modal. Pass isOpen, onClose,
// a title/body, and the action buttons you want rendered as children.
export default function Modal({ isOpen, onClose, title, children, actions }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {title && <h3>{title}</h3>}
        {children}
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  )
}
