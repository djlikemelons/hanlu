// Kleine Helfer ohne Abhängigkeiten.

export function mischen(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function stichprobe(arr, n) {
  return mischen(arr).slice(0, n)
}

export function zufall(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const eindeutigeId = () => `k-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`

export const prozent = (teil, ganz) => (ganz ? Math.round((teil / ganz) * 100) : 0)

// Erzeugt n falsche Antwortoptionen aus einem Pool (ohne die richtige).
export function distraktoren(pool, richtig, n = 3, feld = null) {
  const wert = (x) => (feld ? x[feld] : x)
  const kandidaten = pool.filter((x) => wert(x) !== wert(richtig))
  return stichprobe(kandidaten, n)
}
