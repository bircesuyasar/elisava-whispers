import { useCallback, useState } from 'react'

const KEY = 'elisava_discovered'

function load() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY)) ?? [])
  } catch {
    return new Set()
  }
}

export function useDiscovered() {
  const [discovered, setDiscovered] = useState(load)

  const discover = useCallback((id) => {
    setDiscovered((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      localStorage.setItem(KEY, JSON.stringify([...next]))
      return next
    })
  }, [])

  return { discovered, discover }
}
