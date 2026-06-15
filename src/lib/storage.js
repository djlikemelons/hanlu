// Lokale Persistenz: Der komplette Lernstand liegt als ein JSON-Objekt
// im localStorage. Kein Backend, kein Account nötig.
//
// ERWEITERUNG: Geräte-Sync – hier könnte statt/zusätzlich zu localStorage
// ein Sync-Backend angebunden werden (z. B. ein kleiner Key-Value-Dienst
// oder WebDAV). Schnittstelle bewusst schmal gehalten: laden() / speichern().

const KEY = 'hanlu-lernstand-v1'

export function laden() {
  try {
    const roh = localStorage.getItem(KEY)
    return roh ? JSON.parse(roh) : null
  } catch {
    return null
  }
}

export function speichern(zustand) {
  try {
    localStorage.setItem(KEY, JSON.stringify(zustand))
  } catch {
    // Speicher voll oder blockiert → still scheitern, App bleibt nutzbar
  }
}

export function leeren() {
  localStorage.removeItem(KEY)
}

// Export als JSON-Datei (Backup / Gerätewechsel)
export function alsDateiExportieren(zustand) {
  const blob = new Blob([JSON.stringify(zustand, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `hanlu-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}
