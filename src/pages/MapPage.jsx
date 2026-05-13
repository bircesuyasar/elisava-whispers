import { useState, useRef } from 'react'
import { locations } from '../data/locations'
import { useDiscovered } from '../hooks/useDiscovered'
import styles from './MapPage.module.css'

export default function MapPage() {
  const { discovered } = useDiscovered()
  const [active, setActive] = useState(null)
  const [found, setFound] = useState(false)
  const cameraRef = useRef(null)

  const visiblePins = locations.filter((l) => discovered.has(l.id))
  const activeLoc = locations.find((l) => l.id === active)

  function openPin(id) {
    setActive(id)
    setFound(false)
  }

  function closePopup() {
    setActive(null)
    setFound(false)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.subtitle}>elisava whispers</p>
        <h1 className={styles.title}>Map</h1>
      </header>

      <div className={styles.mapContainer}>
        <img
          src="/floorplan.svg"
          alt="Elisava campus floor plan"
          className={styles.floorplan}
          draggable={false}
        />

        {visiblePins.map((loc) => (
          <button
            key={loc.id}
            className={`${styles.pin} ${active === loc.id ? styles.pinActive : ''}`}
            style={{ left: `${loc.pin.x}%`, top: `${loc.pin.y}%` }}
            onClick={() => openPin(loc.id)}
            aria-label={`${loc.emoji} ${loc.name}`}
          >
            <span className={styles.pinEmoji}>{loc.emoji}</span>
          </button>
        ))}

      </div>

      {visiblePins.length === 0 && (
        <div className={styles.emptyMap}>
          <p>Scan QR codes to reveal locations</p>
        </div>
      )}

      {visiblePins.length > 0 && (
        <ul className={styles.legend}>
          {visiblePins.map((loc) => (
            <li
              key={loc.id}
              className={`${styles.legendItem} ${active === loc.id ? styles.legendActive : ''}`}
              onClick={() => openPin(loc.id)}
            >
              <span className={styles.legendEmoji}>{loc.emoji}</span>
              <span className={styles.legendName}>{loc.room}</span>
            </li>
          ))}
        </ul>
      )}

      {activeLoc && (
        <>
          <div className={styles.backdrop} onClick={closePopup} />
          <div className={styles.popup} role="dialog" aria-modal="true">
            <button className={styles.popupClose} onClick={closePopup} aria-label="Close">
              ×
            </button>
            <span className={styles.popupEmoji}>{activeLoc.emoji}</span>
            <h2 className={styles.popupName}>{activeLoc.name}</h2>
            <p className={styles.popupRiddle}>"{activeLoc.riddle}"</p>

            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={() => setFound(true)}
            />
            {!found ? (
              <button className={styles.foundBtn} onClick={() => cameraRef.current.click()}>
                I found it!
              </button>
            ) : (
              <p className={styles.foundMsg}>
                Now scan the QR code to unlock the whispers.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
