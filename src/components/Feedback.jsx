// Gemeinsame Erfolgs-/Fehler-Animation für alle Spielmodi:
// richtig → Häkchen + Funken + „+1" schwebt hoch; falsch → dezentes Wackeln.

import React, { useRef, useState } from 'react'

export function useFeedback() {
  const [fb, setFb] = useState(null)
  const timer = useRef(null)
  const zeige = (ok, punkte = 1) => {
    clearTimeout(timer.current)
    setFb({ ok, punkte, key: Date.now() })
    timer.current = setTimeout(() => setFb(null), ok ? 900 : 500)
  }
  return [fb, zeige]
}

// CSS-Klasse für den Container, der bei Fehlern wackeln soll
export const wackelKlasse = (fb) => (fb && !fb.ok ? 'anim-wackeln' : '')

export function FeedbackOverlay({ fb }) {
  if (!fb || !fb.ok) return null
  return (
    <div key={fb.key} className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden rounded-3xl">
      {/* grüner Erfolgs-Flash über die ganze Karte */}
      <div
        className="absolute inset-0 anim-erfolg-blitz"
        style={{ background: 'radial-gradient(circle at center, rgba(52,211,153,0.30), transparent 68%)' }}
      />
      <div className="relative">
        {/* pulsierender Ring hinter dem Häkchen */}
        <span className="absolute inset-0 -m-1.5 rounded-full border-2 border-ok anim-puls-ring" style={{ animationIterationCount: 1 }} />
        <div className="anim-pop w-20 h-20 rounded-full bg-ok/15 border-2 border-ok flex items-center justify-center text-4xl text-ok">
          ✓
        </div>
        {/* Funken */}
        <span className="anim-funkeln absolute -top-3 -left-3 text-gold text-xl">✦</span>
        <span className="anim-funkeln absolute -top-4 right-0 text-akzent text-lg" style={{ animationDelay: '0.07s' }}>✦</span>
        <span className="anim-funkeln absolute -bottom-3 -right-4 text-gold text-2xl" style={{ animationDelay: '0.14s' }}>✦</span>
        <span className="anim-funkeln absolute -bottom-2 -left-4 text-akzent text-lg" style={{ animationDelay: '0.2s' }}>✦</span>
        <span className="anim-funkeln absolute top-1 -right-6 text-ok text-base" style={{ animationDelay: '0.26s' }}>✦</span>
        {/* schwebende Punkte */}
        <div className="anim-schwebt absolute -top-6 left-1/2 -translate-x-1/2 text-ok font-bold text-xl">
          +{fb.punkte}
        </div>
      </div>
    </div>
  )
}

// Konfetti-Regen für große Erfolge (Boss besiegt, Top-Testergebnis).
// Liegt absolut über dem nächstgelegenen relativ positionierten Container.
export function Konfetti({ anzahl = 18 }) {
  const farben = ['var(--akzent)', 'var(--ok)', 'var(--gold)', 'var(--err)', '#a78bfa']
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {Array.from({ length: anzahl }).map((_, i) => (
        <span
          key={i}
          className="absolute anim-konfetti"
          style={{
            left: `${(i * 53) % 100}%`,
            top: '-12px',
            width: '8px',
            height: '13px',
            borderRadius: '2px',
            background: farben[i % farben.length],
            animationDelay: `${(i % 6) * 0.12}s`,
          }}
        />
      ))}
    </div>
  )
}
