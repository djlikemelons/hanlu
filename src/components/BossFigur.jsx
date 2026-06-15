// Animierte Boss-Figur (SVG statt Emoji): ein Monster mit Hörnern, Augen,
// Maul, Armen und Schwanz. Der `zustand` steuert Mimik und Körpersprache:
//   idle    – atmet, Arme schwingen, Augen blinzeln
//   treffer – Aua-Gesicht (X-Augen, offenes Maul), Arme fliegen hoch
//   angriff – wütende Brauen, gefletschte Zähne, Pranken nach vorn
//   tod     – XX-Augen, Zunge raus, Arme hängen
// Die Welt bestimmt die Farb-Variante (oni / drache / gold).
// ERWEITERUNG: Für „echte" 3D-Modelle wäre hier der Austauschpunkt für Three.js.

import React from 'react'

const VARIANTEN = {
  oni: { koerper: '#e05252', koerper2: '#a32e2e', bauch: '#f2b09a', horn: '#f7ecd2', detail: '#6e1b1b' },
  drache: { koerper: '#41a86c', koerper2: '#27764a', bauch: '#abe8c3', horn: '#f7ecd2', detail: '#174d2e' },
  gold: { koerper: '#dfa63e', koerper2: '#a87420', bauch: '#f6dc96', horn: '#fff4d8', detail: '#6e4a10' },
}

export default function BossFigur({ variante = 'oni', zustand = 'idle', className = '' }) {
  const f = VARIANTEN[variante] || VARIANTEN.oni
  const wut = zustand === 'angriff'
  const aua = zustand === 'treffer'
  const tot = zustand === 'tod'

  return (
    <svg viewBox="0 0 140 140" className={`boss-figur ${className}`} aria-label="Boss">
      <defs>
        <linearGradient id={`bf-${variante}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={f.koerper} />
          <stop offset="100%" stopColor={f.koerper2} />
        </linearGradient>
      </defs>

      {/* Schwanz (wedelt im Idle) */}
      <g className="boss-schwanz" style={{ transformOrigin: '108px 96px' }}>
        <path d="M106 98 Q132 92 128 70 Q140 86 124 104 Q114 110 106 98" fill={f.koerper2} />
        <circle cx="127" cy="73" r="5" fill={f.detail} />
      </g>

      {/* Rückenstacheln */}
      <path d="M44 38 L50 24 L57 36 Z" fill={f.detail} />
      <path d="M60 32 L67 17 L75 31 Z" fill={f.detail} />
      <path d="M78 33 L86 21 L92 36 Z" fill={f.detail} />

      {/* Hörner */}
      <path d="M38 42 Q28 24 40 14 Q42 30 50 38 Z" fill={f.horn} stroke={f.detail} strokeWidth="2" />
      <path d="M100 42 Q110 24 98 14 Q96 30 88 38 Z" fill={f.horn} stroke={f.detail} strokeWidth="2" />

      {/* linker Arm (vom Betrachter aus links) */}
      <g className={aua ? 'boss-arm-hoch-l' : wut ? 'boss-arm-attacke-l' : tot ? '' : 'boss-arm-idle-l'} style={{ transformOrigin: '34px 78px' }}>
        <path d="M36 74 Q14 80 12 98 Q24 96 34 90 Z" fill={f.koerper2} />
        <circle cx="14" cy="97" r="6.5" fill={f.koerper} stroke={f.detail} strokeWidth="2" />
        {/* Krallen */}
        <path d="M9 92 L4 88 M8 98 L2 97 M10 103 L5 107" stroke={f.detail} strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
      {/* rechter Arm */}
      <g className={aua ? 'boss-arm-hoch-r' : wut ? 'boss-arm-attacke-r' : tot ? '' : 'boss-arm-idle-r'} style={{ transformOrigin: '104px 78px' }}>
        <path d="M102 74 Q124 80 126 98 Q114 96 104 90 Z" fill={f.koerper2} />
        <circle cx="124" cy="97" r="6.5" fill={f.koerper} stroke={f.detail} strokeWidth="2" />
        <path d="M129 92 L134 88 M130 98 L136 97 M128 103 L133 107" stroke={f.detail} strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>

      {/* Körper (atmet im Idle) */}
      <g className={tot ? '' : 'boss-atmen'} style={{ transformOrigin: '69px 90px' }}>
        <ellipse cx="69" cy="78" rx="38" ry="42" fill={`url(#bf-${variante})`} stroke={f.detail} strokeWidth="2.5" />
        <ellipse cx="69" cy="92" rx="22" ry="20" fill={f.bauch} opacity="0.9" />
        {/* Bauch-Linien */}
        <path d="M53 88 H85 M55 96 H83 M58 104 H80" stroke={f.detail} strokeWidth="1.5" opacity="0.35" fill="none" />

        {/* Augen */}
        {tot ? (
          <g stroke={f.detail} strokeWidth="3.5" strokeLinecap="round">
            <path d="M48 56 L60 68 M60 56 L48 68" />
            <path d="M78 56 L90 68 M90 56 L78 68" />
          </g>
        ) : aua ? (
          <g stroke={f.detail} strokeWidth="3.5" strokeLinecap="round">
            <path d="M49 58 L59 66 M59 58 L49 66" />
            <path d="M79 58 L89 66 M89 58 L79 66" />
          </g>
        ) : (
          <g>
            <ellipse cx="54" cy="61" rx="9" ry={wut ? 8 : 10} fill="#fff" />
            <ellipse cx="84" cy="61" rx="9" ry={wut ? 8 : 10} fill="#fff" />
            <g className="boss-pupillen">
              <circle cx="56" cy="63" r="4.5" fill={wut ? '#c81e1e' : '#1b1b1b'} />
              <circle cx="82" cy="63" r="4.5" fill={wut ? '#c81e1e' : '#1b1b1b'} />
              <circle cx="57.5" cy="61.5" r="1.5" fill="#fff" />
              <circle cx="83.5" cy="61.5" r="1.5" fill="#fff" />
            </g>
            {/* Brauen: im Angriff wütend nach innen gezogen */}
            <path d={wut ? 'M45 50 L63 56' : 'M46 50 L62 49'} stroke={f.detail} strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d={wut ? 'M93 50 L75 56' : 'M92 50 L76 49'} stroke={f.detail} strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* Maul */}
        {tot ? (
          <g>
            <path d="M58 80 Q69 74 80 80" stroke={f.detail} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M72 80 Q76 90 70 94 Q66 90 70 82" fill="#e0697a" stroke={f.detail} strokeWidth="1.5" />
          </g>
        ) : aua ? (
          <g>
            <ellipse cx="69" cy="81" rx="9" ry="11" fill="#5c1313" stroke={f.detail} strokeWidth="2" />
            <ellipse cx="69" cy="86" rx="5" ry="4" fill="#e0697a" />
          </g>
        ) : wut ? (
          <g>
            <path d="M50 76 Q69 92 88 76 Q84 94 69 94 Q54 94 50 76" fill="#5c1313" stroke={f.detail} strokeWidth="2" />
            <path d="M55 79 L59 86 L63 79 Z M75 79 L79 86 L83 79 Z" fill="#fff" />
            <path d="M64 91 L69 85 L74 91 Z" fill="#fff" />
          </g>
        ) : (
          <g>
            <path d="M56 78 Q69 88 82 78" stroke={f.detail} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M58 79 L61 85 L65 80 Z" fill="#fff" stroke={f.detail} strokeWidth="1" />
            <path d="M80 79 L77 85 L73 80 Z" fill="#fff" stroke={f.detail} strokeWidth="1" />
          </g>
        )}
      </g>

      {/* Füße */}
      <ellipse cx="52" cy="120" rx="12" ry="7" fill={f.koerper2} stroke={f.detail} strokeWidth="2" />
      <ellipse cx="86" cy="120" rx="12" ry="7" fill={f.koerper2} stroke={f.detail} strokeWidth="2" />

      {/* Wut-Funken beim Angriff */}
      {wut && (
        <g stroke="#ffb02e" strokeWidth="3" strokeLinecap="round">
          <path d="M22 30 L28 38 M30 24 L33 34" />
          <path d="M118 30 L112 38 M110 24 L107 34" />
        </g>
      )}
    </svg>
  )
}
