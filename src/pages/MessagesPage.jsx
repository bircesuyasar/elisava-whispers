import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { locations } from '../data/locations'
import { useMessages } from '../context/MessagesContext'
import styles from './MessagesPage.module.css'

function timeAgo(ts) {
  const diff = Date.now() - ts
  const min = 60_000
  const hr = 3_600_000
  const day = 86_400_000
  if (diff < min) return 'just now'
  if (diff < hr) return `${Math.floor(diff / min)} min ago`
  if (diff < 2 * hr) return '1 hour ago'
  if (diff < day) return `${Math.floor(diff / hr)} hours ago`
  if (diff < 2 * day) return 'yesterday'
  return `${Math.floor(diff / day)} days ago`
}

export default function MessagesPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { messages, addMessage } = useMessages()
  const [draft, setDraft] = useState('')
  const listRef = useRef(null)
  const inputRef = useRef(null)

  const loc = locations.find((l) => l.id === id)
  const thread = messages[id] ?? []

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [thread.length])

  if (!loc) {
    navigate('/scanner', { replace: true })
    return null
  }

  function handleSend() {
    const text = draft.trim()
    if (!text) return
    addMessage(id, text)
    setDraft('')
    inputRef.current?.focus()
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.back} onClick={() => navigate(-1)} aria-label="Back">
          ←
        </button>
        <div className={styles.headerCenter}>
          <span className={styles.headerEmoji}>{loc.emoji}</span>
          <span className={styles.headerName}>{loc.name}</span>
        </div>
        <span className={styles.headerSpacer} />
      </header>

      <ul className={styles.list} ref={listRef}>
        {thread.map((msg) => (
          <li key={msg.id} className={styles.card}>
            <p className={styles.cardText}>{msg.text}</p>
            <p className={styles.cardTime}>{timeAgo(msg.ts)}</p>
          </li>
        ))}
        {thread.length === 0 && (
          <li className={styles.empty}>No whispers yet. Be the first.</li>
        )}
      </ul>

      <div className={styles.composer}>
        <textarea
          ref={inputRef}
          className={styles.input}
          placeholder="Leave a whisper…"
          value={draft}
          rows={1}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={!draft.trim()}
          aria-label="Send"
        >
          ↑
        </button>
      </div>
    </div>
  )
}
