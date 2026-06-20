// Meilenstein-Siegel (印章) als roter Stempel. Verdiente Siegel leuchten rot,
// noch nicht erreichte sind ausgegraut. SiegelOverlay zeigt frisch verdiente
// Siegel mit Stempel-Animation über dem ganzen Bildschirm.

import React from 'react'
import { useStore } from '../store.jsx'
import { SIEGEL, siegelInfo } from '../lib/siegel.js'
import { Konfetti } from './Feedback.jsx'

const SIEGEL_ROT = '#c0392b'

// Ein einzelnes Siegel. `groesse` in px.
export function Siegel({ info, verdient = true, groesse = 72, animiert = false }) {
  const rot = verdient
  return (
    <div className="flex flex-col items-center gap-1" style={{ width: groesse }}>
      <div
        className={animiert ? 'anim-stempel' : ''}
        style={{
          width: groesse,
          height: groesse,
          borderRadius: groesse * 0.16,
          background: rot ? SIEGEL_ROT : 'transparent',
          border: `${Math.max(2, groesse * 0.05)}px solid ${rot ? SIEGEL_ROT : 'var(--line)'}`,
          boxShadow: rot ? `inset 0 0 0 ${Math.max(2, groesse * 0.04)}px rgba(255,255,255,0.85)` : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: rot ? 1 : 0.45,
          transform: animiert ? undefined : 'rotate(-8deg)',
        }}
      >
        <span
          className="zeichen font-bold leading-none"
          style={{ color: rot ? '#fff' : 'var(--muted)', fontSize: groesse * (info.marke.length > 1 ? 0.3 : 0.5) }}
        >
          {info.marke}
        </span>
      </div>
      <div className="text-[10px] text-matt text-center leading-tight">{info.titel}</div>
    </div>
  )
}

// Sammlung aller Siegel (verdient + gesperrt)
export function SiegelSammlung({ verdienteIds = [] }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {SIEGEL.map((s) => (
        <Siegel key={s.id} info={s} verdient={verdienteIds.includes(s.id)} groesse={64} />
      ))}
    </div>
  )
}

// Vollbild-Overlay beim frischen Verdienen eines Siegels
export function SiegelOverlay() {
  const { state, siegelGesehen } = useStore()
  const id = state.stats.neuesSiegel
  if (!id) return null
  const info = siegelInfo(id)
  if (!info) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60" onClick={siegelGesehen}>
      <Konfetti anzahl={26} />
      <div className="relative text-center px-6">
        <Siegel info={info} verdient groesse={150} animiert />
        <div className="mt-6 text-xl font-bold">Neues Siegel verdient!</div>
        <div className="text-matt mt-1">{info.titel} · {info.hinweis}</div>
        <div className="text-xs text-matt mt-6">Tippen zum Schließen</div>
      </div>
    </div>
  )
}
