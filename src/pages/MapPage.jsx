import { useRef, useState } from 'react'
import { locations } from '../data/locations'
import styles from './MapPage.module.css'

export default function MapPage() {
  const [active, setActive] = useState(null)
  const mapRef = useRef(null)

  function handlePin(id) {
    setActive(id === active ? null : id)
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) setActive(null)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.subtitle}>elisava whispers</p>
        <h1 className={styles.title}>Map</h1>
      </header>

      <div className={styles.mapContainer} ref={mapRef} onClick={handleBackdrop}>
        <img
          src="/floorplan.svg"
          alt="Elisava campus floor plan"
          className={styles.floorplan}
          draggable={false}
        />

        {locations.map((loc) => {
          const isActive = active === loc.id
          return (
            <button
              key={loc.id}
              className={`${styles.pin} ${isActive ? styles.pinActive : ''}`}
              style={{ left: `${loc.pin.x}%`, top: `${loc.pin.y}%` }}
              onClick={(e) => { e.stopPropagation(); handlePin(loc.id) }}
              aria-label={`${loc.emoji} ${loc.name} — ${loc.room}`}
              aria-pressed={isActive}
            >
              <span className={styles.pinEmoji}>{loc.emoji}</span>

              {isActive && (
                <span className={styles.tooltip}>
                  <span className={styles.tooltipName}>{loc.name}</span>
                  <span className={styles.tooltipRoom}>{loc.room}</span>
                </span>
              )}
            </button>
          )
        })}
      </div>

      <ul className={styles.legend}>
        {locations.map((loc) => (
          <li
            key={loc.id}
            className={`${styles.legendItem} ${active === loc.id ? styles.legendActive : ''}`}
            onClick={() => handlePin(loc.id)}
          >
            <span className={styles.legendEmoji}>{loc.emoji}</span>
            <span className={styles.legendName}>{loc.room}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
