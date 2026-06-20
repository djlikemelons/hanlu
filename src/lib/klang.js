// Dezente Sound-Effekte für richtig/falsch über die Web Audio API.
// KOSTENLOS & offline – keine Audiodateien nötig, kurze synthetische Töne.
// An/aus wird vom Aufrufer über die Einstellungen gesteuert.

let ctx
function audio() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)()
    } catch {
      ctx = null
    }
  }
  return ctx
}

function ton(freq, dauer, typ = 'sine', vol = 0.06, ab = 0) {
  const a = audio()
  if (!a) return
  const o = a.createOscillator()
  const g = a.createGain()
  o.type = typ
  o.frequency.value = freq
  o.connect(g)
  g.connect(a.destination)
  const t = a.currentTime + ab
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dauer)
  o.start(t)
  o.stop(t + dauer)
}

// kleiner aufsteigender Zweiklang = richtig
export function klingeRichtig() {
  ton(660, 0.12, 'sine', 0.06, 0)
  ton(990, 0.16, 'sine', 0.05, 0.08)
}

// kurzer tiefer Ton = falsch / nochmal
export function klingeFalsch() {
  ton(190, 0.22, 'triangle', 0.05, 0)
}
