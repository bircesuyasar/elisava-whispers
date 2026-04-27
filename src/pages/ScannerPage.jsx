import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { locations } from '../data/locations'
import { useDiscovered } from '../hooks/useDiscovered'
import QrScanner from '../components/QrScanner'
import styles from './ScannerPage.module.css'

function extractLocation(text) {
  const urlMatch = text.match(/\/location\/([^/?#\s]+)/)
  const segment = (urlMatch ? urlMatch[1] : text).trim()

  return (
    locations.find((l) => l.slug === segment) ||
    locations.find((l) => l.id === segment) ||
    locations.find((l) => l.id.startsWith(segment)) ||
    null
  )
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
    const loc = extractLocation(text)
    console.log('[handleScan] text:', JSON.stringify(text), '→ loc:', loc?.id ?? null)
    if (loc) {
      discover(loc.id)
      navigate(`/location/${loc.slug}`)
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
