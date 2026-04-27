import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { locations } from '../data/locations'
import { useDiscovered } from '../hooks/useDiscovered'
import QrScanner from '../components/QrScanner'
import styles from './ScannerPage.module.css'

function extractLocationId(text) {
  // Pull the last path segment from a URL, or use the raw text
  const urlMatch = text.match(/\/location\/([^/?#\s]+)/)
  const segment = (urlMatch ? urlMatch[1] : text).trim()

  // 1. Exact match against location id
  const exact = locations.find((l) => l.id === segment)
  if (exact) return exact.id

  // 2. Prefix match: "banana" → "banana-corner"
  const prefix = locations.find((l) => l.id.startsWith(segment))
  if (prefix) return prefix.id

  // 3. Reverse prefix: full id embedded in a longer QR string
  const reverse = locations.find((l) => segment.startsWith(l.id))
  if (reverse) return reverse.id

  return null
}

export default function ScannerPage() {
  const navigate = useNavigate()
  const { discover } = useDiscovered()
  const [popupLoc, setPopupLoc] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [scanError, setScanError] = useState(false)

  function openPopup(loc) {
    setPopupLoc(loc)
    setScanError(false)
  }

  function closePopup() {
    setPopupLoc(null)
    setScanError(false)
  }

  function startScan() {
    setPopupLoc(null)
    setScanError(false)
    setScanning(true)
  }

  function handleScan(text) {
    setScanning(false)
    const id = extractLocationId(text)
    if (id) {
      discover(id)
      navigate(`/location/${id}`)
    } else {
      setScanError(true)
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.subtitle}>elisava whispers</p>
        <h1 className={styles.title}>Grocery Store</h1>
      </header>

      <div className={styles.shortcuts}>
        <p className={styles.shortcutsLabel}>find a location</p>
        <div className={styles.pills}>
          {locations.map((loc) => (
            <button
              key={loc.id}
              className={styles.pill}
              onClick={() => openPopup(loc)}
            >
              <span className={styles.pillEmoji}>{loc.emoji}</span>
              <span className={styles.pillName}>{loc.name}</span>
            </button>
          ))}
        </div>
      </div>

      {popupLoc && (
        <>
          <div className={styles.backdrop} onClick={closePopup} />
          <div className={styles.popup} role="dialog" aria-modal="true">
            <button className={styles.popupClose} onClick={closePopup} aria-label="Close">×</button>
            <span className={styles.popupEmoji}>{popupLoc.emoji}</span>
            <h2 className={styles.popupName}>{popupLoc.name}</h2>
            <p className={styles.popupRiddle}>"{popupLoc.riddle}"</p>
            <button className={styles.foundBtn} onClick={startScan}>
              I found it!
            </button>
          </div>
        </>
      )}

      {scanning && (
        <QrScanner onScan={handleScan} onClose={() => setScanning(false)} />
      )}
    </div>
  )
}
