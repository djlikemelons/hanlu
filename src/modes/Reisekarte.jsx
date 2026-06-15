// 中国地图 China-Reisekarte: Jede abgeschlossene Lern-Session bringt dich
// auf der (stilisierten) Karte weiter – von Guangzhou bis Shanghai.
// Freigeschaltete Städte zeigen kleine Kultur- und Essens-Häppchen.

import React, { useState } from 'react'
import { useStore } from '../store.jsx'
import { STATIONEN, SESSIONS_PRO_ETAPPE, CHINA_PFAD } from '../data/reise.js'
import { Panel, BackBar, Fortschritt } from '../components/UI.jsx'

export default function Reisekarte() {
  const { state, geheZu } = useStore()
  const sessions = state.reise.sessions
  const etappe = Math.min(STATIONEN.length - 1, Math.floor(sessions / SESSIONS_PRO_ETAPPE))
  const restSessions = etappe >= STATIONEN.length - 1 ? 0 : SESSIONS_PRO_ETAPPE - (sessions % SESSIONS_PRO_ETAPPE)
  const [gewaehlt, setGewaehlt] = useState(STATIONEN[etappe].id)
  const station = STATIONEN.find((s) => s.id === gewaehlt)
  const gewaehltIndex = STATIONEN.findIndex((s) => s.id === gewaehlt)

  return (
    <div className="space-y-4">
      <BackBar titel="🗺️ China-Reisekarte" onZurueck={() => geheZu('home')} />

      <Panel className="!p-3">
        <svg viewBox="0 0 420 340" className="w-full">
          {/* Landesumriss */}
          <path d={CHINA_PFAD} fill="var(--panel2)" stroke="var(--line)" strokeWidth="2" />
          {/* Route */}
          <polyline
            points={STATIONEN.map((s) => `${s.x},${s.y}`).join(' ')}
            fill="none" stroke="var(--akzent)" strokeWidth="2" strokeDasharray="5 5" opacity="0.5"
          />
          {/* zurückgelegte Route */}
          <polyline
            points={STATIONEN.slice(0, etappe + 1).map((s) => `${s.x},${s.y}`).join(' ')}
            fill="none" stroke="var(--akzent)" strokeWidth="3.5" strokeLinecap="round"
          />
          {/* Stationen */}
          {STATIONEN.map((s, i) => {
            const erreicht = i <= etappe
            const aktuell = i === etappe
            return (
              <g key={s.id} onClick={() => erreicht && setGewaehlt(s.id)} style={{ cursor: erreicht ? 'pointer' : 'default' }}>
                {aktuell && <circle cx={s.x} cy={s.y} r="11" fill="var(--akzent)" opacity="0.4" className="anim-puls-ring" style={{ transformOrigin: `${s.x}px ${s.y}px` }} />}
                <circle
                  cx={s.x} cy={s.y} r={gewaehlt === s.id ? 9 : 7}
                  fill={erreicht ? 'var(--akzent)' : 'var(--panel)'}
                  stroke={erreicht ? 'var(--text)' : 'var(--line)'}
                  strokeWidth="2"
                />
                <text
                  x={s.x} y={s.y - 13} textAnchor="middle" fontSize="13" fontWeight="600"
                  fill={erreicht ? 'var(--text)' : 'var(--muted)'} opacity={erreicht ? 1 : 0.55}
                >
                  {s.name}
                </text>
              </g>
            )
          })}
        </svg>
      </Panel>

      <Panel>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold">
            {station.name} <span className="text-akzent text-sm font-medium">{station.pinyin}</span>
          </h3>
          <span className="text-xs text-matt">Station {gewaehltIndex + 1} / {STATIONEN.length}</span>
        </div>
        <p className="text-sm leading-relaxed text-matt">{station.happen}</p>
      </Panel>

      <Panel className="!py-4">
        {etappe >= STATIONEN.length - 1 ? (
          <p className="text-sm text-center">🎉 Du hast Shanghai erreicht – die ganze Route ist freigeschaltet!</p>
        ) : (
          <>
            <div className="flex justify-between text-xs text-matt mb-2">
              <span>Nächste Stadt: {STATIONEN[etappe + 1].name} {STATIONEN[etappe + 1].pinyin}</span>
              <span>noch {restSessions} Session{restSessions === 1 ? '' : 's'}</span>
            </div>
            <Fortschritt wert={sessions % SESSIONS_PRO_ETAPPE} max={SESSIONS_PRO_ETAPPE} />
          </>
        )}
        <p className="text-xs text-matt mt-3 text-center">
          Jede abgeschlossene Lern-Session ({'>'}0 Karten) bringt dich weiter. Bisher: {sessions} Sessions.
        </p>
      </Panel>
    </div>
  )
}
