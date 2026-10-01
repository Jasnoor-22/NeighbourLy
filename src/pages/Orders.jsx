import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { orders } from '../data/orders'
import { getServiceById } from '../data/services'
import { getProviderById } from '../data/providers'

const tabs = [
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
]

const statusClass = {
  'In Progress': 'status-inprogress',
  Confirmed: 'status-confirmed',
  'Ready for Pickup': 'status-ready',
  Completed: 'status-completed',
  Cancelled: 'status-cancelled',
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState('active')
  const navigate = useNavigate()

  const filteredOrders = orders.filter((o) => o.tab === activeTab)

  return (
    <div className="container" style={{ padding: '32px 24px 60px' }}>
      <div className="page-header" style={{ padding: '0 0 20px' }}>
        <h1>Your orders</h1>
        <p>Track services you've booked, in progress, and completed.</p>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'active' : ''}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="empty-state">
          <div className="emoji">📦</div>
          <p>No {activeTab} orders yet.</p>
        </div>
      ) : (
        filteredOrders.map((order) => {
          const service = getServiceById(order.serviceId)
          const provider = getProviderById(order.providerId)
          if (!service) return null
          return (
            <div className="order-card" key={order.id}>
              <div className="order-media">{service.emoji}</div>
              <div className="order-info">
                <h4>{service.title}</h4>
                <p>{provider?.shortName} · {order.date}</p>
              </div>
              <span className="order-price">₹{order.price}</span>
              <span className={`status-pill ${statusClass[order.status]}`}>{order.status}</span>
              <button className="btn btn-outline btn-sm" onClick={() => navigate('/messages')}>
                Message
              </button>
            </div>
          )
        })
      )}
    </div>
  )
}
