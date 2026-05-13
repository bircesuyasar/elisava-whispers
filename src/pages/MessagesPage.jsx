import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  collection, query, where, orderBy,
  onSnapshot, addDoc, serverTimestamp, Timestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { locations } from '../data/locations'
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
  return 'yesterday'
}

export default function MessagesPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [nickname, setNickname] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  const loc = locations.find((l) => l.id === id || l.slug === id)

  useEffect(() => {
    if (!loc) return
    const cutoff = Timestamp.fromMillis(Date.now() - 24 * 60 * 60 * 1000)
    const q = query(
      collection(db, 'whispers'),
      where('locationId', '==', loc.id),
      where('timestamp', '>', cutoff),
      orderBy('timestamp', 'asc'),
    )
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setError(null)
    }, (err) => {
      console.error('Firestore onSnapshot error:', err.code, err.message, err)
      setError(`Could not load messages. (${err.code ?? err.message})`)
    })
    return unsub
  }, [id, loc])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length])

  if (!loc) {
    navigate('/scanner', { replace: true })
    return null
  }

  async function handleSend() {
    const text = draft.trim()
    if (!text || sending) return
    setSending(true)
    setDraft('')
    try {
      await addDoc(collection(db, 'whispers'), {
        text,
        nickname: nickname.trim(),
        locationId: loc.id,
        timestamp: serverTimestamp(),
      })
    } catch (err) {
      console.error(err)
      setError('Failed to send. Try again.')
      setDraft(text)
    } finally {
      setSending(false)
      inputRef.current?.focus()
    }
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
        {error && <li className={styles.error}>{error}</li>}
        {!error && messages.length === 0 && (
          <li className={styles.empty}>No whispers yet. Be the first.</li>
        )}
        {messages.map((msg) => (
          <li key={msg.id} className={styles.card}>
            <p className={styles.cardText}>{msg.text}</p>
            <div className={styles.cardMeta}>
              <span className={styles.cardAuthor}>
                {msg.nickname?.trim() || 'Anonymous'}
              </span>
              <span className={styles.cardTime}>
                {msg.timestamp ? timeAgo(msg.timestamp.toMillis()) : 'just now'}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.composer}>
        <input
          className={styles.nicknameInput}
          placeholder="Your name (optional)"
          value={nickname}
          maxLength={40}
          onChange={(e) => setNickname(e.target.value)}
          disabled={sending}
        />
        <div className={styles.composerRow}>
          <textarea
            ref={inputRef}
            className={styles.input}
            placeholder="Leave a whisper…"
            value={draft}
            rows={1}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKey}
            disabled={sending}
          />
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={!draft.trim() || sending}
            aria-label="Send"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  )
}
