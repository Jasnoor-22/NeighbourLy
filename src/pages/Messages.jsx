import { useState } from 'react'
import { conversations as initialConversations } from '../data/messages'
import { getProviderById } from '../data/providers'
import Avatar from '../components/Avatar'

export default function Messages() {
  const [conversations, setConversations] = useState(initialConversations)
  const [activeId, setActiveId] = useState(initialConversations[0]?.id)
  const [draft, setDraft] = useState('')

  const active = conversations.find((c) => c.id === activeId)
  const activeProvider = active ? getProviderById(active.providerId) : null

  function selectConversation(id) {
    setActiveId(id)
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: false } : c)))
  }

  function sendMessage(e) {
    e.preventDefault()
    if (!draft.trim()) return
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              lastMessage: draft,
              thread: [...c.thread, { id: Date.now(), fromMe: true, text: draft, time: 'Now' }],
            }
          : c
      )
    )
    setDraft('')
  }

  return (
    <div className="container" style={{ padding: '32px 24px 60px' }}>
      <div className="page-header" style={{ padding: '0 0 20px' }}>
        <h1>Messages</h1>
        <p>Chat with sellers and buyers about your bookings and custom requests.</p>
      </div>

      <div className="messages-layout">
        <div className="conversation-list">
          {conversations.map((c) => {
            const provider = getProviderById(c.providerId)
            return (
              <div
                key={c.id}
                className={`conversation-item${c.id === activeId ? ' active' : ''}`}
                onClick={() => selectConversation(c.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') selectConversation(c.id)
                }}
              >
                <Avatar
                  src={provider?.avatarUrl}
                  name={provider?.name}
                  size="sm"
                  verified={provider?.verified}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h4 className="conversation-name">{provider?.shortName || provider?.name}</h4>
                    <span className="time">{c.time}</span>
                  </div>
                  <p className="conversation-preview">{c.lastMessage}</p>
                </div>
                {c.unread && <span className="unread-dot" aria-label="Unread message" />}
              </div>
            )
          })}
        </div>

        <div className="chat-pane">
          {active ? (
            <>
              <div className="chat-header">
                <Avatar
                  src={activeProvider?.avatarUrl}
                  name={activeProvider?.name}
                  size="md"
                  verified={activeProvider?.verified}
                />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h4 style={{ fontSize: '0.98rem', color: 'var(--navy)' }}>{activeProvider?.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeProvider?.tag}</p>
                </div>
              </div>

              <div className="chat-thread">
                {active.thread.map((msg) => (
                  <div key={msg.id} className={`chat-bubble ${msg.fromMe ? 'mine' : 'theirs'}`}>
                    <div className="bubble-text">{msg.text}</div>
                    <span className="bubble-time">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form className="chat-input-row" onSubmit={sendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="chat-input"
                  aria-label="Message input"
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="empty-state-card" style={{ margin: 'auto' }}>
              <p>Select a conversation to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
