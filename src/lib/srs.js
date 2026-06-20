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

// Abstand in Tagen zwischen zwei ISO-Daten (b − a)
export function tageDazwischen(isoA, isoB) {
  const a = new Date(isoA + 'T12:00:00')
  const b = new Date(isoB + 'T12:00:00')
  return Math.round((b - a) / 86400000)
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

// Bewertungen verändern Intervall, Ease, Wiederholungen und mastery_level.
// mastery_level wird explizit als 0–5-Zähler geführt (±1 je Bewertung).
export function bewerte(karte, wertung) {
  let { intervall = 0, ease = 2.5, wiederholungen = 0, mastery_level = 0 } = karte
  const clampM = (m) => Math.max(0, Math.min(5, m))

  if (wertung === 'nochmal') {
    // Nochmal: heute erneut fällig (< 10 Min), Intervall zurücksetzen,
    // ease −0,2, mastery −1. Wiederholungen NICHT erhöhen → bleibt Lernphase.
    intervall = 0
    ease = Math.max(EASE_MIN, ease - 0.2)
    mastery_level = clampM(mastery_level - 1)
  } else if (wertung === 'schwer') {
    // Nur im 4-Knopf-Modus (Anki): intervall × 1,2, ease −0,15.
    intervall = wiederholungen === 0 || intervall === 0 ? 1 : Math.max(1, Math.round(intervall * 1.2))
    ease = Math.max(EASE_MIN, ease - 0.15)
    wiederholungen += 1
  } else if (wertung === 'gut') {
    // reps 0 → 1 Tag, 1 → 3 Tage, sonst intervall × ease.
    if (wiederholungen === 0) intervall = 1
    else if (wiederholungen === 1) intervall = 3
    else intervall = Math.max(1, Math.round(intervall * ease))
    wiederholungen += 1
    mastery_level = clampM(mastery_level + 1)
  } else if (wertung === 'leicht') {
    // intervall = max(1, intervall) × ease × 1,3 (+1 Tag), ease +0,15.
    intervall = Math.max(1, Math.round(Math.max(1, intervall) * ease * 1.3) + 1)
    ease = Math.min(EASE_MAX, ease + 0.15)
    wiederholungen += 1
    mastery_level = clampM(mastery_level + 1)
  }

  const heute = heuteISO()
  const faelligAm = intervall === 0 ? heute : tageAb(heute, intervall)

  return {
    ...karte,
    intervall,
    ease: Math.round(ease * 100) / 100,
    wiederholungen,
    faelligAm,
    mastery_level,
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
