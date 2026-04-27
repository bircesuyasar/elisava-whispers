import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/scanner" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
        <span className={styles.icon}>◎</span>
        <span className={styles.label}>Scanner</span>
      </NavLink>
      <NavLink to="/map" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
        <span className={styles.icon}>⊹</span>
        <span className={styles.label}>Map</span>
      </NavLink>
    </nav>
  )
}
