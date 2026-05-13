import { useState, useRef } from 'react'
import { locations } from '../data/locations'
import { useDiscovered } from '../hooks/useDiscovered'
import styles from './ScannerPage.module.css'

export default function ScannerPage() {
  const { discover } = useDiscovered()
  const [popupLoc, setPopupLoc] = useState(null)
  const [showScanPrompt, setShowScanPrompt] = useState(false)
  const cameraRef = useRef(null)

  function closePopup() {
    setPopupLoc(null)
    setShowScanPrompt(false)
  }

  function handleFound() {
    cameraRef.current.click()
  }

  async function handleCapture(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    if ('BarcodeDetector' in window) {
      try {
        const detector = new BarcodeDetector({ formats: ['qr_code'] })
        const bitmap = await createImageBitmap(file)
        const codes = await detector.detect(bitmap)
        if (codes.length > 0) {
          const val = codes[0].rawValue
          const match = locations.find((l) => val.includes(l.id) || val.includes(l.slug))
          discover(match?.id ?? popupLoc.id)
        } else {
          discover(popupLoc.id)
        }
      } catch {
        discover(popupLoc.id)
      }
    } else {
      discover(popupLoc.id)
    }
    setShowScanPrompt(true)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.subtitle}>elisava whispers</p>
        <h1 className={styles.title}>Fruits</h1>
      </header>

      <div className={styles.scanHint}>
        <span className={styles.scanIcon}>📷</span>
        <p className={styles.scanText}>Open your camera app to scan the QR code</p>
      </div>

      <div className={styles.shortcuts}>
        <p className={styles.shortcutsLabel}>find a location</p>
        <div className={styles.pills}>
          {locations.map((loc) => (
            <button
              key={loc.id}
              className={styles.pill}
              onClick={() => { setPopupLoc(loc); setShowScanPrompt(false) }}
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
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={handleCapture}
            />
            {showScanPrompt ? (
              <p className={styles.scanPrompt}>
                Now scan the QR code with your phone camera to unlock whispers.
              </p>
            ) : (
              <>
                <p className={styles.popupRiddle}>"{popupLoc.riddle}"</p>
                <button className={styles.foundBtn} onClick={handleFound}>
                  I found it!
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
