import { useState } from 'react'
import { conversations as initialConversations } from '../data/messages'
import { getProviderById } from '../data/providers'

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
        <p>Chat with sellers and buyers about your bookings.</p>
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
              >
                <span className="avatar">{provider?.avatar}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4>{provider?.shortName}</h4>
                    <span className="time">{c.time}</span>
                  </div>
                  <p>{c.lastMessage}</p>
                </div>
                {c.unread && <span className="unread-dot" />}
              </div>
            )
          })}
        </div>

        <div className="chat-pane">
          {active ? (
            <>
              <div className="chat-header">
                <span className="avatar">{activeProvider?.avatar}</span>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>{activeProvider?.name}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{activeProvider?.tag}</p>
                </div>
              </div>
              <div className="chat-thread">
                {active.thread.map((msg) => (
                  <div key={msg.id} className={`chat-bubble ${msg.fromMe ? 'mine' : 'theirs'}`}>
                    {msg.text}
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
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="empty-state">Select a conversation to start chatting.</div>
          )}
        </div>
      </div>
    </div>
  )
}
