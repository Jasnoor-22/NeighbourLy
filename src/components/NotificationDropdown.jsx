import { useEffect, useRef } from 'react'
import { notifications } from '../data/notifications'

export default function NotificationDropdown({ onClose }) {
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      ref={dropdownRef}
      className="notif-dropdown"
      role="region"
      aria-label="Notifications popover"
    >
      <div className="notif-header">
        <h4>Notifications</h4>
        <button
          type="button"
          className="notif-close-btn"
          onClick={onClose}
          aria-label="Close notifications"
        >
          ✕
        </button>
      </div>

      <div className="notif-list">
        {notifications.length === 0 ? (
          <div className="notif-empty">No notifications yet</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`notif-item ${n.read ? 'read' : 'unread'}`}
            >
              <span className="notif-indicator" aria-hidden="true" />
              <div className="notif-body">
                <p className="notif-text">{n.text}</p>
                <span className="notif-time">{n.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
