import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import styles from './QrScanner.module.css'

const ELEMENT_ID = 'qr-reader'

export default function QrScanner({ onScan, onClose }) {
  const [camError, setCamError] = useState(false)
  const onScanRef = useRef(onScan)

  useEffect(() => { onScanRef.current = onScan }, [onScan])

  useEffect(() => {
    const scanner = new Html5Qrcode(ELEMENT_ID)

    scanner.start(
      { facingMode: 'environment' },
      { fps: 12, qrbox: { width: 220, height: 220 } },
      (text) => {
        scanner.stop().catch(() => {}).finally(() => onScanRef.current(text))
      },
      () => {},
    ).catch((err) => {
      console.error('Camera error:', err)
      setCamError(true)
    })

    return () => { scanner.stop().catch(() => {}) }
  }, [])

  return (
    <div className={styles.overlay}>
      <div className={styles.topBar}>
        <button className={styles.cancel} onClick={onClose}>Cancel</button>
        <p className={styles.hint}>Point at a QR code</p>
        <span className={styles.spacer} />
      </div>

      {camError ? (
        <p className={styles.error}>
          Camera access denied.{'\n'}Allow camera access and try again.
        </p>
      ) : (
        <div className={styles.viewfinderWrap}>
          <div id={ELEMENT_ID} className={styles.reader} />
          <div className={styles.corners}>
            <span /><span /><span /><span />
          </div>
        </div>
      )}
    </div>
  )
}
