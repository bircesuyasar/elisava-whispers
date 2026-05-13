import styles from './BadgeScreen.module.css'

export default function BadgeScreen({ onDismiss }) {
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.card}>
        <div className={styles.badgeEmoji}>🏅</div>
        <p className={styles.label}>elisava whispers</p>
        <h2 className={styles.title}>Elisava Explorer</h2>
        <p className={styles.body}>
          You've discovered all five whisper locations across campus.
        </p>
        <button className={styles.btn} onClick={onDismiss}>
          Close
        </button>
      </div>
    </div>
  )
}
