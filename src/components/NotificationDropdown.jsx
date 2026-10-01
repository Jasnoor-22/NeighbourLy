import { notifications } from '../data/notifications'

export default function NotificationDropdown({ onClose }) {
  return (
    <div className="notif-dropdown">
      <div className="notif-header">
        <span>Notifications</span>
        <button className="btn-ghost" onClick={onClose} style={{ background: 'none', border: 'none' }}>
          ✕
        </button>
      </div>
      {notifications.map((n) => (
        <div key={n.id} className={`notif-item${n.read ? ' read' : ''}`}>
          <span className="bullet" />
          <div>
            <p>{n.text}</p>
            <span>{n.time}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
