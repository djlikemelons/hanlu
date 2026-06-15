// Mochi, die Lern-Katze – gemeinsame Basis für das dauerhafte Home-Widget
// und die Vollansicht (modes/Katze.jsx). Mochi reagiert live auf den
// Lernfortschritt: Streak, fällige Karten, heutige Session, Level.

import React from 'react'
import { useStore, kartenFuerPool, faelligeKarten } from '../store.jsx'

// Level aus XP: Level n braucht n²·30 XP → langsames, langfristiges Wachstum
export const levelAusXp = (xp) => Math.min(12, Math.floor(Math.sqrt(xp / 30)))
export const xpFuerLevel = (lvl) => lvl * lvl * 30

export function KatzenSvg({ level, groesse = null }) {
  const breite = groesse ?? 120 + level * 8
  return (
    <svg viewBox="0 0 200 190" style={{ width: breite, height: breite * 0.95 }} className="mx-auto">
      {/* Aura ab Level 8 */}
      {level >= 8 && <circle cx="100" cy="105" r="85" fill="var(--gold)" opacity="0.12" />}
      {/* Ohren */}
      <polygon points="55,55 70,15 92,50" fill="var(--akzent2)" />
      <polygon points="145,55 130,15 108,50" fill="var(--akzent2)" />
      <polygon points="62,50 71,27 84,48" fill="var(--bg)" />
      <polygon points="138,50 129,27 116,48" fill="var(--bg)" />
      {/* Kopf */}
      <ellipse cx="100" cy="95" rx="58" ry="52" fill="var(--akzent)" opacity="0.9" />
      {/* Körper */}
      <ellipse cx="100" cy="158" rx="44" ry="28" fill="var(--akzent2)" />
      {/* Augen: ab Level 6 mit Brille */}
      {level >= 6 ? (
        <g stroke="var(--text)" strokeWidth="3" fill="none">
          <circle cx="80" cy="92" r="13" />
          <circle cx="120" cy="92" r="13" />
          <line x1="93" y1="92" x2="107" y2="92" />
          <circle cx="80" cy="92" r="4" fill="var(--text)" stroke="none" />
          <circle cx="120" cy="92" r="4" fill="var(--text)" stroke="none" />
        </g>
      ) : (
        <g fill="var(--bg)">
          <ellipse cx="80" cy="92" rx="6" ry={level >= 1 ? 8 : 5} />
          <ellipse cx="120" cy="92" rx="6" ry={level >= 1 ? 8 : 5} />
        </g>
      )}
      {/* Nase + Mund */}
      <polygon points="96,105 104,105 100,111" fill="var(--bg)" />
      <path d="M 100 111 Q 92 120 84 114 M 100 111 Q 108 120 116 114" stroke="var(--bg)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Schnurrhaare */}
      <g stroke="var(--text)" strokeWidth="1.5" opacity="0.6">
        <line x1="38" y1="98" x2="62" y2="100" /><line x1="38" y1="108" x2="62" y2="106" />
        <line x1="162" y1="98" x2="138" y2="100" /><line x1="162" y1="108" x2="138" y2="106" />
      </g>
      {/* Schal ab Level 2 */}
      {level >= 2 && <path d="M 62 140 Q 100 156 138 140 L 134 152 Q 100 166 66 152 Z" fill="var(--err)" opacity="0.85" />}
      {/* Mütze ab Level 4 */}
      {level >= 4 && (
        <g>
          <path d="M 68 52 Q 100 22 132 52 L 132 44 Q 100 14 68 44 Z" fill="var(--gold)" />
          <circle cx="100" cy="20" r="7" fill="var(--gold)" />
        </g>
      )}
      {/* Stern ab Level 10 */}
      {level >= 10 && <text x="150" y="40" fontSize="26">⭐</text>}
    </svg>
  )
}

// Stimmung & Spruch aus dem aktuellen Lernstand ableiten
export function stimmung(state, faellig) {
  const h = state.stats.heute
  if (h.wdh >= 20) return ['😻', 'Wow, was für eine Lerneinheit heute! Ich bin so stolz auf dich!']
  if (h.wdh > 0 && faellig === 0) return ['😸', 'Alles Fällige gelernt – du verwöhnst mich! 加油！']
  if (h.wdh > 0) return ['😺', `Schön, dass du heute schon ${h.wdh} Karten gelernt hast. Weiter so!`]
  if (state.stats.streak >= 7) return ['😼', `${state.stats.streak} Tage Streak! Lass die Serie heute nicht reißen …`]
  if (faellig > 0) return ['🙀', `${faellig} Karten warten auf dich! Eine kleine Runde? Miau~`]
  return ['😽', 'Schön, dich zu sehen! Eine Runde Vokabeln für einen Katzenkeks? 🍪']
}

// Dauerhaftes Widget für den Home-Bildschirm: Mochi + Sprechblase,
// tippen öffnet die Vollansicht.
export function MochiWidget() {
  const { state, geheZu } = useStore()
  const level = levelAusXp(state.stats.xp)
  const faellig = faelligeKarten(kartenFuerPool(state)).length
  const [emoji, text] = stimmung(state, faellig)
  return (
    <button
      onClick={() => geheZu('spiel', { id: 'katze' })}
      className="w-full flex items-center gap-3 text-left verlauf-panel border border-linie rounded-3xl p-3 pr-4 hover:border-akzent/60 transition active:scale-[0.99]"
      aria-label={`${state.katze.name} öffnen`}
    >
      <div className="anim-mochi-bob shrink-0 -my-1">
        <KatzenSvg level={level} groesse={72} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-matt font-semibold uppercase tracking-wide">
          {state.katze.name} · Level {level}
        </div>
        {/* Sprechblase */}
        <div className="relative mt-1 bg-panel border border-linie rounded-2xl rounded-tl-sm px-3 py-2 text-sm leading-snug">
          {emoji} {text}
        </div>
      </div>
    </button>
  )
}
