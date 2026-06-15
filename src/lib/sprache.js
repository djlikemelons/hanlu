// Sprachausgabe über die Web Speech API (speechSynthesis).
// KOSTENLOS: Die Stimmen sind im Browser/Betriebssystem eingebaut –
// kein API-Key, keine Internetverbindung, keine Kosten.
// macOS/iOS bringen z. B. „Tingting"/„Meijia" mit, Android „zh-CN-Stimmen".

let stimmen = []

function stimmenLaden() {
  if (!('speechSynthesis' in window)) return
  stimmen = window.speechSynthesis.getVoices()
  // Stimmen laden in manchen Browsern asynchron nach
  window.speechSynthesis.onvoiceschanged = () => {
    stimmen = window.speechSynthesis.getVoices()
  }
}
if (typeof window !== 'undefined') stimmenLaden()

export const ttsVerfuegbar = () => typeof window !== 'undefined' && 'speechSynthesis' in window

// Beste verfügbare Chinesisch-Stimme finden (zh-CN bevorzugt)
function chinesischeStimme() {
  if (!stimmen.length) stimmen = window.speechSynthesis.getVoices()
  return (
    stimmen.find((v) => v.lang === 'zh-CN') ||
    stimmen.find((v) => v.lang?.toLowerCase().startsWith('zh')) ||
    null
  )
}

// Text auf Chinesisch vorlesen. rate < 1 = langsamer (z. B. 0.65 zum Üben).
export function sprich(text, rate = 0.9) {
  if (!ttsVerfuegbar()) return false
  window.speechSynthesis.cancel() // laufende Ausgabe stoppen
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'zh-CN'
  u.rate = rate
  const stimme = chinesischeStimme()
  if (stimme) u.voice = stimme
  window.speechSynthesis.speak(u)
  return true
}
