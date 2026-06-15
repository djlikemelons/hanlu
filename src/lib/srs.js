// Spaced-Repetition-Logik (SM-2-ähnlich, Anki-Stil).
// Bewertungen: nochmal | schwer | gut | leicht

export const heuteISO = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export const gesternISO = () => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function tageAb(isoDatum, tage) {
  const d = new Date(isoDatum + 'T12:00:00')
  d.setDate(d.getDate() + tage)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const EASE_MIN = 1.3
const EASE_MAX = 3.0

// mastery_level 0–5 aus Intervall ableiten (0 = neu, 5 = gemeistert)
export function masteryAusIntervall(intervall, wiederholungen) {
  if (!wiederholungen) return 0
  if (intervall < 3) return 1
  if (intervall < 7) return 2
  if (intervall < 21) return 3
  if (intervall < 60) return 4
  return 5
}

export function bewerte(karte, wertung) {
  let { intervall = 0, ease = 2.5, wiederholungen = 0 } = karte

  if (wertung === 'nochmal') {
    // zurück in die Lernphase, bleibt heute fällig
    intervall = 0
    ease = Math.max(EASE_MIN, ease - 0.2)
  } else if (wiederholungen === 0 || intervall === 0) {
    // Lernphase (neue oder zurückgesetzte Karte)
    if (wertung === 'schwer') { intervall = 1; ease = Math.max(EASE_MIN, ease - 0.05) }
    if (wertung === 'gut') intervall = 1
    if (wertung === 'leicht') intervall = 3
  } else {
    // Wiederholungsphase
    if (wertung === 'schwer') { intervall = Math.max(1, Math.round(intervall * 1.2)); ease = Math.max(EASE_MIN, ease - 0.15) }
    if (wertung === 'gut') intervall = Math.max(1, Math.round(intervall * ease))
    if (wertung === 'leicht') { intervall = Math.max(1, Math.round(intervall * ease * 1.3)); ease = Math.min(EASE_MAX, ease + 0.15) }
  }

  wiederholungen += 1
  const heute = heuteISO()
  const faelligAm = intervall === 0 ? heute : tageAb(heute, intervall)

  return {
    ...karte,
    intervall,
    ease: Math.round(ease * 100) / 100,
    wiederholungen,
    faelligAm,
    mastery_level: masteryAusIntervall(intervall, wiederholungen),
    erstGelernt: karte.erstGelernt || heute,
    zuletztGeuebt: heute,
  }
}

// Vorschau der Intervalle für die Bewertungs-Buttons („gut → 6 Tage")
export function intervallVorschau(karte) {
  const fmt = (t) => (t < 1 ? 'heute' : t === 1 ? '1 Tag' : t < 32 ? `${t} Tage` : `${Math.round(t / 30)} Mon.`)
  const probe = (w) => fmt(bewerte(karte, w).intervall)
  return { nochmal: '< 10 Min', schwer: probe('schwer'), gut: probe('gut'), leicht: probe('leicht') }
}
