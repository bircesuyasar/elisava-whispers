import { useNavigate } from 'react-router-dom'
import { locations } from '../data/locations'
import styles from './ScannerPage.module.css'

export default function ScannerPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.subtitle}>elisava whispers</p>
        <h1 className={styles.title}>Scanner</h1>
      </header>

      <div className={styles.cameraWrap}>
        <button className={styles.cameraBtn} aria-label="Open camera">
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
        <p className={styles.cameraHint}>Tap to scan a whisper</p>
      </div>

      <div className={styles.shortcuts}>
        <p className={styles.shortcutsLabel}>or jump to a location</p>
        <div className={styles.pills}>
          {locations.map((loc) => (
            <button
              key={loc.id}
              className={styles.pill}
              onClick={() => navigate(`/location/${loc.id}`)}
            >
              <span className={styles.pillEmoji}>{loc.emoji}</span>
              <span className={styles.pillName}>{loc.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
