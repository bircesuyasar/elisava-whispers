import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { locations } from '../data/locations'
import { useDiscovered } from '../hooks/useDiscovered'
import QrScanner from '../components/QrScanner'
import styles from './ScannerPage.module.css'

function extractLocationId(text) {
  const urlMatch = text.match(/\/location\/([^/?#\s]+)/)
  if (urlMatch) {
    const id = urlMatch[1]
    if (locations.find((l) => l.id === id)) return id
  }
  const direct = locations.find((l) => l.id === text.trim())
  if (direct) return direct.id
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
        <h1 className={styles.title}>Scanner</h1>
      </header>

      <div className={styles.cameraWrap}>
        <button className={styles.cameraBtn} onClick={startScan} aria-label="Open camera">
          <span className={styles.cameraRing} />
          <span className={styles.cameraInner}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              />
              <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </button>
        <p className={styles.cameraHint}>Tap to scan a QR code</p>
        {scanError && (
          <p className={styles.scanError}>QR code not recognised. Try again.</p>
        )}
      </div>

      <div className={styles.shortcuts}>
        <p className={styles.shortcutsLabel}>or find a location first</p>
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

      {/* Riddle popup */}
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

      {/* QR scanner overlay */}
      {scanning && (
        <QrScanner onScan={handleScan} onClose={() => setScanning(false)} />
      )}
    </div>
  )
}
